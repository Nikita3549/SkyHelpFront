
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { claimsService } from "@/services/claimsService";
import { newClaimSchema, ClaimFormData } from "@/utils/formValidation";

const airlineOptions = [
  { label: "Lufthansa", value: "lufthansa" },
  { label: "British Airways", value: "british_airways" },
  { label: "Air France", value: "air_france" },
  { label: "KLM", value: "klm" },
  { label: "Ryanair", value: "ryanair" },
  { label: "EasyJet", value: "easyjet" },
  { label: "Vueling", value: "vueling" },
  { label: "Iberia", value: "iberia" },
  { label: "Wizz Air", value: "wizz_air" },
  { label: "Turkish Airlines", value: "turkish_airlines" },
];

const flightIssueOptions = [
  { label: "Flight was delayed", value: "delayed" },
  { label: "Flight was cancelled", value: "cancelled" },
  { label: "I was denied boarding", value: "denied_boarding" },
  { label: "Flight was overbooked", value: "overbooked" },
  { label: "I missed a connecting flight", value: "missed_connection" },
  { label: "My luggage was lost/damaged", value: "luggage_issue" },
  { label: "Flight was diverted to another airport", value: "diverted" },
  { label: "Other issue", value: "other" },
];

const steps = [
  {
    id: "Step 1",
    name: "Personal Information",
    fields: ["firstName", "lastName", "email", "phone", "address"]
  },
  {
    id: "Step 2",
    name: "Flight Details",
    fields: ["airline", "flightnumber", "departureAirport", "arrivalAirport", "flightIssue", "reasonGivenByAirline", "numberOfPassengers"]
  },
  {
    id: "Step 3",
    name: "Claim Details",
    fields: ["date", "amount", "additionalInformation"]
  },
  {
    id: "Step 4",
    name: "Payment Information",
    fields: ["paymentMethod", "bankName", "accountHolderName", "iban", "accountNumber", "paypalEmail", "wiseAccountHolder", "wiseIbanOrAccount", "wiseEmail"]
  }
];

const ClaimForm = () => {
  const navigate = useNavigate();
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ClaimFormData>({
    resolver: zodResolver(newClaimSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      airline: "",
      flightnumber: "",
      departureAirport: "",
      arrivalAirport: "",
      flightIssue: "",
      reasonGivenByAirline: "",
      numberOfPassengers: "",
      date: new Date(),
      amount: "",
      additionalInformation: "",
      paymentMethod: "",
      // Bank Transfer fields
      bankName: "",
      accountHolderName: "",
      iban: "",
      accountNumber: "",
      // PayPal field
      paypalEmail: "",
      // Wise fields
      wiseAccountHolder: "",
      wiseIbanOrAccount: "",
      wiseEmail: "",
    },
  });
  
  const { trigger, getValues, setValue, watch } = form;
  
  const paymentMethod = watch("paymentMethod");
  
  // Check if the fields in the current step are valid
  const processStep = async (direction: "next" | "previous") => {
    if (direction === "next") {
      const fields = steps[currentStep].fields;
      const output = await trigger(fields as any, { shouldFocus: true });
      
      if (!output) return;
      
      if (currentStep < steps.length - 1) {
        setPreviousStep(currentStep);
        setCurrentStep(step => step + 1);
      }
    } else {
      setPreviousStep(currentStep);
      setCurrentStep(step => step - 1);
    }
  };
  
  // Animation variants for step transitions
  const variants = {
    rightToLeft: {
      initial: { x: 50, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -50, opacity: 0 }
    },
    leftToRight: {
      initial: { x: -50, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 50, opacity: 0 }
    }
  };
  
  // Determine which animation to use based on step direction
  const getAnimationVariant = () => {
    if (previousStep < currentStep) {
      return variants.rightToLeft;
    }
    return variants.leftToRight;
  };
  
  // Submit the form
  const onSubmit = async (data: ClaimFormData) => {
    setIsSubmitting(true);
    
    try {
      console.log("Form data submitted:", data);
      
      // Format and prepare the claim data
      const claimId = uuidv4();
      const today = new Date().toISOString().split('T')[0];
      
      const formattedDate = format(data.date, "yyyy-MM-dd");
      
      // Prepare payment details based on the selected payment method
      let paymentDetails: any = {};
      
      if (data.paymentMethod === "bank_transfer") {
        paymentDetails = {
          bankName: data.bankName,
          accountHolderName: data.accountHolderName,
          iban: data.iban,
          accountNumber: data.accountNumber
        };
      } else if (data.paymentMethod === "paypal") {
        paymentDetails = {
          paypalEmail: data.paypalEmail
        };
      } else if (data.paymentMethod === "wise") {
        paymentDetails = {
          accountHolderName: data.wiseAccountHolder,
          ibanOrAccount: data.wiseIbanOrAccount,
          email: data.wiseEmail
        };
      }
      
      // Create the claim object
      const claimData = {
        id: claimId,
        customer: `${data.firstName} ${data.lastName}`,
        email: data.email,
        airline: data.airline,
        flightnumber: data.flightnumber,
        date: formattedDate,
        status: 'pending' as const,
        stage: 'documentation_collection',
        amount: data.amount,
        lastupdated: today,
        
        // Additional fields
        phone: data.phone,
        address: data.address,
        numberOfPassengers: data.numberOfPassengers,
        departureAirport: data.departureAirport,
        arrivalAirport: data.arrivalAirport,
        flightIssue: data.flightIssue,
        reasonGivenByAirline: data.reasonGivenByAirline,
        additionalInformation: data.additionalInformation,
        paymentMethod: data.paymentMethod,
        paymentDetails: paymentDetails
      };
      
      console.log("Prepared claim data:", claimData);
      
      // Submit the claim to the database
      await claimsService.createClaim(claimData);
      
      // Create or sign-in user with the provided email
      await claimsService.createOrSignInUser(data.email);
      
      // Show success message
      toast.success("Claim submitted successfully!", {
        description: "We've sent you an email with your login details to track your claim.",
        duration: 5000,
      });
      
      // Redirect to confirmation page or dashboard login
      navigate("/login", { 
        state: { 
          message: "Your claim has been submitted! Please check your email for a login link to track your claim." 
        } 
      });
      
    } catch (error) {
      console.error("Error submitting claim:", error);
      toast.error("There was an error submitting your claim", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="py-12 md:py-20 bg-gray-50 min-h-screen">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-2">Submit Your Claim</h1>
          <p className="text-gray-600">
            We'll help you get the compensation you deserve for your flight disruption
          </p>
        </div>
        
        {/* Progress Steps */}
        <nav aria-label="Progress" className="mb-8">
          <ol role="list" className="flex items-center">
            {steps.map((step, index) => (
              <li key={step.id} className={cn(
                "relative flex items-center justify-center flex-1",
                index !== steps.length - 1 ? "pr-8" : "",
                index !== 0 ? "pl-8" : ""
              )}>
                {index < currentStep ? (
                  // Completed step
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-primary"></div>
                    </div>
                    <div 
                      className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                      <Check className="h-5 w-5 text-white" aria-hidden="true" />
                      <span className="sr-only">{step.name}</span>
                    </div>
                  </>
                ) : index === currentStep ? (
                  // Current step
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-gray-200"></div>
                    </div>
                    <div
                      className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white"
                      aria-current="step"
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true"></span>
                      <span className="sr-only">{step.name}</span>
                    </div>
                  </>
                ) : (
                  // Upcoming step
                  <>
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="h-0.5 w-full bg-gray-200"></div>
                    </div>
                    <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent" aria-hidden="true"></span>
                      <span className="sr-only">{step.name}</span>
                    </div>
                  </>
                )}
                
                <div className={cn(
                  "hidden absolute mt-16 text-sm font-medium sm:block",
                  index === currentStep ? "text-primary" : "text-gray-500"
                )}>
                  {step.name}
                </div>
              </li>
            ))}
          </ol>
        </nav>
        
        {/* Form */}
        <motion.div
          className="bg-white p-6 md:p-8 rounded-lg shadow-sm"
          initial={getAnimationVariant().initial}
          animate={getAnimationVariant().animate}
          exit={getAnimationVariant().exit}
          transition={{ duration: 0.3 }}
        >
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          We'll use this to send you updates about your claim
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter your full address" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              {/* Step 2: Flight Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Flight Details</h2>
                  
                  <FormField
                    control={form.control}
                    name="airline"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Airline</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? airlineOptions.find(
                                      (airline) => airline.value === field.value
                                    )?.label
                                  : "Select airline"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search airline..." />
                              <CommandEmpty>No airline found.</CommandEmpty>
                              <CommandGroup>
                                {airlineOptions.map((airline) => (
                                  <CommandItem
                                    value={airline.label}
                                    key={airline.value}
                                    onSelect={() => {
                                      setValue("airline", airline.value)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        airline.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {airline.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="flightnumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Flight Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. LH1234" {...field} />
                        </FormControl>
                        <FormDescription>
                          Usually a combination of letters and numbers (e.g. LH1234)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="departureAirport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Departure Airport</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. LHR" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="arrivalAirport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Arrival Airport</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. JFK" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="numberOfPassengers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Passengers</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="flightIssue"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>What happened with your flight?</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? flightIssueOptions.find(
                                      (issue) => issue.value === field.value
                                    )?.label
                                  : "Select issue"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search issues..." />
                              <CommandEmpty>No issue found.</CommandEmpty>
                              <CommandGroup>
                                {flightIssueOptions.map((issue) => (
                                  <CommandItem
                                    value={issue.label}
                                    key={issue.value}
                                    onSelect={() => {
                                      setValue("flightIssue", issue.value)
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        issue.value === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {issue.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="reasonGivenByAirline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason Given by Airline (if any)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What explanation did the airline provide?" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              {/* Step 3: Claim Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Claim Details</h2>
                  
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Flight</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Claim Amount (€)</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="e.g. 250" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the amount you're claiming in Euros
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="additionalInformation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any other details that might help your claim" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              {/* Step 4: Payment Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Payment Information</h2>
                  <p className="text-gray-600 mb-4">
                    Let us know how you would like to receive your compensation
                  </p>
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Payment Method</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="bank_transfer" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Bank Transfer
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="paypal" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                PayPal
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="wise" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Wise Transfer
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Conditional fields based on payment method */}
                  {paymentMethod === "bank_transfer" && (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="bankName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bank Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="accountHolderName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Holder Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="iban"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>IBAN</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="accountNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  {paymentMethod === "paypal" && (
                    <FormField
                      control={form.control}
                      name="paypalEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PayPal Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  {paymentMethod === "wise" && (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="wiseAccountHolder"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Holder Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="wiseIbanOrAccount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>IBAN or Account Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="wiseEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              )}
              
              {/* Navigation buttons */}
              <div className="mt-8 flex justify-between">
                <Button
                  type="button"
                  onClick={() => processStep("previous")}
                  disabled={currentStep === 0}
                  variant="outline"
                >
                  Previous
                </Button>
                
                {currentStep < steps.length - 1 ? (
                  <Button type="button" onClick={() => processStep("next")}>
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>Submit Claim</>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </FormProvider>
        </motion.div>
      </div>
    </div>
  );
};

export default ClaimForm;
