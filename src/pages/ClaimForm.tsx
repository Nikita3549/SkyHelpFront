import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { 
  Plane, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  ArrowLeft,
  AlertCircle,
  Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const flightDetailsSchema = z.object({
  flightNumber: z.string().min(3, "Flight number must be at least 3 characters"),
  airline: z.string().min(2, "Please select an airline"),
  departureDate: z.string().min(1, "Please select a departure date"),
  departureAirport: z.string().min(2, "Please enter the departure airport"),
  arrivalAirport: z.string().min(2, "Please enter the arrival airport"),
  disruptionType: z.enum(["delay", "cancellation", "denied_boarding", "missed_connection"], {
    required_error: "Please select the type of disruption",
  }),
});

const passengerDetailsSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  passengers: z.string().min(1, "Please select the number of passengers"),
  address: z.string().min(5, "Please enter your address"),
});

const disruptionDetailsSchema = z.object({
  delayDuration: z.string().optional(),
  actualDepartureTime: z.string().optional(),
  originalDepartureTime: z.string().optional(),
  reasonGiven: z.string().optional(),
  additionalInfo: z.string().optional(),
});

const paymentDetailsSchema = z.object({
  paymentMethod: z.enum(["bank_transfer", "paypal", "wise"], {
    required_error: "Please select a payment method",
  }),
  bankName: z.string().optional(),
  accountName: z.string().optional(),
  accountNumber: z.string().optional(),
  routingNumber: z.string().optional(),
  iban: z.string().optional(),
  paypalEmail: z.string().email().optional(),
  termsAgreed: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

const airlines = [
  { value: "ryanair", label: "Ryanair" },
  { value: "easyjet", label: "EasyJet" },
  { value: "ba", label: "British Airways" },
  { value: "lufthansa", label: "Lufthansa" },
  { value: "airfrance", label: "Air France" },
  { value: "klm", label: "KLM" },
  { value: "iberia", label: "Iberia" },
  { value: "vueling", label: "Vueling" },
  { value: "wizz", label: "Wizz Air" },
  { value: "norwegian", label: "Norwegian" },
  { value: "other", label: "Other" },
];

const ClaimForm = () => {
  const [step, setStep] = useState(1);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [formData, setFormData] = useState({
    flightDetails: {},
    passengerDetails: {},
    disruptionDetails: {},
    paymentDetails: {},
  });
  const navigate = useNavigate();

  const flightDetailsForm = useForm<z.infer<typeof flightDetailsSchema>>({
    resolver: zodResolver(flightDetailsSchema),
    defaultValues: {
      flightNumber: "",
      airline: "",
      departureDate: "",
      departureAirport: "",
      arrivalAirport: "",
      disruptionType: "delay",
    },
  });

  const passengerDetailsForm = useForm<z.infer<typeof passengerDetailsSchema>>({
    resolver: zodResolver(passengerDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      passengers: "1",
      address: "",
    },
  });

  const disruptionDetailsForm = useForm<z.infer<typeof disruptionDetailsSchema>>({
    resolver: zodResolver(disruptionDetailsSchema),
    defaultValues: {
      delayDuration: "",
      actualDepartureTime: "",
      originalDepartureTime: "",
      reasonGiven: "",
      additionalInfo: "",
    },
  });

  const paymentDetailsForm = useForm<z.infer<typeof paymentDetailsSchema>>({
    resolver: zodResolver(paymentDetailsSchema),
    defaultValues: {
      paymentMethod: "bank_transfer",
      bankName: "",
      accountName: "",
      accountNumber: "",
      routingNumber: "",
      iban: "",
      paypalEmail: "",
      termsAgreed: false,
    },
  });

  const onFlightDetailsSubmit = (data: z.infer<typeof flightDetailsSchema>) => {
    setIsChecking(true);
    setFormData({ ...formData, flightDetails: data });
    
    setTimeout(() => {
      setIsEligible(true);
      setIsChecking(false);
    }, 2000);
  };

  const onPassengerDetailsSubmit = (data: z.infer<typeof passengerDetailsSchema>) => {
    setFormData({ ...formData, passengerDetails: data });
    setStep(3);
  };
  
  const onDisruptionDetailsSubmit = (data: z.infer<typeof disruptionDetailsSchema>) => {
    setFormData({ ...formData, disruptionDetails: data });
    setStep(4);
  };
  
  const onPaymentDetailsSubmit = (data: z.infer<typeof paymentDetailsSchema>) => {
    setFormData({ ...formData, paymentDetails: data });
    
    const claimId = uuidv4();
    
    console.log("Complete form data:", {
      id: claimId,
      ...formData,
      paymentDetails: data,
    });
    
    toast.success("Claim submitted successfully", {
      description: "We'll process your claim and keep you updated.",
    });
    
    navigate("/dashboard");
  };

  const proceedToNextStep = () => {
    setStep(2);
  };

  const transitions = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            key="step1"
            initial={transitions.initial}
            animate={transitions.animate}
            exit={transitions.exit}
            transition={transitions.transition}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Flight Details</h2>
              <p className="text-gray-600">
                Enter your flight information to check eligibility for compensation.
              </p>
            </div>
            
            <Form {...flightDetailsForm}>
              <form onSubmit={flightDetailsForm.handleSubmit(onFlightDetailsSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={flightDetailsForm.control}
                    name="flightNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Flight Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="e.g. BA1234" {...field} />
                            <Plane className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={flightDetailsForm.control}
                    name="airline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Airline</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select airline" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {airlines.map((airline) => (
                              <SelectItem key={airline.value} value={airline.value}>
                                {airline.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={flightDetailsForm.control}
                    name="departureDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departure Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="date" {...field} />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={flightDetailsForm.control}
                    name="departureAirport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departure Airport</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="e.g. LHR" {...field} />
                            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={flightDetailsForm.control}
                    name="arrivalAirport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Arrival Airport</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="e.g. CDG" {...field} />
                            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={flightDetailsForm.control}
                    name="disruptionType"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>What happened to your flight?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
                          >
                            <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                              <RadioGroupItem value="delay" id="delay" />
                              <label htmlFor="delay" className="flex items-center cursor-pointer">
                                <Clock className="h-4 w-4 mr-2 text-primary" />
                                <span>Flight was delayed</span>
                              </label>
                            </div>
                            
                            <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                              <RadioGroupItem value="cancellation" id="cancellation" />
                              <label htmlFor="cancellation" className="flex items-center cursor-pointer">
                                <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                                <span>Flight was cancelled</span>
                              </label>
                            </div>
                            
                            <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                              <RadioGroupItem value="denied_boarding" id="denied_boarding" />
                              <label htmlFor="denied_boarding" className="flex items-center cursor-pointer">
                                <Users className="h-4 w-4 mr-2 text-orange-500" />
                                <span>Denied boarding (overbooking)</span>
                              </label>
                            </div>
                            
                            <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                              <RadioGroupItem value="missed_connection" id="missed_connection" />
                              <label htmlFor="missed_connection" className="flex items-center cursor-pointer">
                                <Plane className="h-4 w-4 mr-2 text-blue-500" />
                                <span>Missed connecting flight</span>
                              </label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto"
                    disabled={isChecking}
                  >
                    {isChecking ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Checking Eligibility
                      </>
                    ) : (
                      <>
                        Check Eligibility
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
            
            {isEligible !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                {isEligible ? (
                  <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-green-800">Good news! You are eligible for compensation</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Based on your flight details, you could be entitled to compensation under EU Regulation 261/2004.</p>
                          <div className="mt-4">
                            <Button onClick={proceedToNextStep} className="bg-green-600 hover:bg-green-700">
                              Continue with your claim
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-yellow-800">We need more information</h3>
                        <div className="mt-2 text-sm text-yellow-700">
                          <p>Based on the information provided, we need additional details to determine your eligibility.</p>
                          <div className="mt-4">
                            <Button onClick={proceedToNextStep} variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                              Continue anyway
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div 
            key="step2"
            initial={transitions.initial}
            animate={transitions.animate}
            exit={transitions.exit}
            transition={transitions.transition}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Passenger Details</h2>
              <p className="text-gray-600">
                Please provide your contact information so we can process your claim.
              </p>
            </div>
            
            <Form {...passengerDetailsForm}>
              <form onSubmit={passengerDetailsForm.handleSubmit(onPassengerDetailsSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={passengerDetailsForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={passengerDetailsForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your last name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={passengerDetailsForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={passengerDetailsForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={passengerDetailsForm.control}
                    name="passengers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Passengers</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select number of passengers" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? 'passenger' : 'passengers'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={passengerDetailsForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter your address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="pt-4 flex justify-between items-center">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep(1)}
                    className="flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  
                  <Button type="submit">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div 
            key="step3"
            initial={transitions.initial}
            animate={transitions.animate}
            exit={transitions.exit}
            transition={transitions.transition}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Disruption Details</h2>
              <p className="text-gray-600">
                Please provide more details about the flight disruption you experienced.
              </p>
            </div>
            
            <Form {...disruptionDetailsForm}>
              <form onSubmit={disruptionDetailsForm.handleSubmit(onDisruptionDetailsSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {flightDetailsForm.getValues().disruptionType === "delay" && (
                    <>
                      <FormField
                        control={disruptionDetailsForm.control}
                        name="delayDuration"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delay Duration (hours)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select delay duration" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {["Less than 2 hours", "2-3 hours", "3-4 hours", "More than 4 hours"].map((duration) => (
                                  <SelectItem key={duration} value={duration}>
                                    {duration}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={disruptionDetailsForm.control}
                        name="actualDepartureTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Actual Departure Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={disruptionDetailsForm.control}
                        name="originalDepartureTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Original Scheduled Departure Time</FormLabel>
                            <FormControl>
                              <Input type="time" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  
                  <FormField
                    control={disruptionDetailsForm.control}
                    name="reasonGiven"
                    render={({ field }) => (
                      <FormItem className={cn(
                        flightDetailsForm.getValues().disruptionType === "delay" ? "md:col-span-1" : "md:col-span-2"
                      )}>
                        <FormLabel>Reason Given by Airline</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Technical issues, weather conditions" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={disruptionDetailsForm.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide any additional details about the disruption that might be relevant to your claim" 
                            {...field} 
                            className="min-h-[120px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="pt-4 flex justify-between items-center">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep(2)}
                    className="flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  
                  <Button type="submit">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        );
      
      case 4:
        return (
          <motion.div 
            key="step4"
            initial={transitions.initial}
            animate={transitions.animate}
            exit={transitions.exit}
            transition={transitions.transition}
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">Payment Details</h2>
              <p className="text-gray-600">
                Please provide your payment details for receiving the compensation.
              </p>
            </div>
            
            <Form {...paymentDetailsForm}>
              <form onSubmit={paymentDetailsForm.handleSubmit(onPaymentDetailsSubmit)} className="space-y-6">
                <FormField
                  control={paymentDetailsForm.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          <div className="flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                              <label htmlFor="bank_transfer" className="cursor-pointer font-medium">Bank Transfer</label>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="paypal" id="paypal" />
                              <label htmlFor="paypal" className="cursor-pointer font-medium">PayPal</label>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="wise" id="wise" />
                              <label htmlFor="wise" className="cursor-pointer font-medium">Wise / TransferWise</label>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {paymentDetailsForm.watch("paymentMethod") === "bank_transfer" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={paymentDetailsForm.control}
                      name="bankName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bank Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter bank name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={paymentDetailsForm.control}
                      name="accountName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Holder Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter account holder name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={paymentDetailsForm.control}
                      name="iban"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>IBAN</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter IBAN" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={paymentDetailsForm.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter account number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                
                {paymentDetailsForm.watch("paymentMethod") === "paypal" && (
                  <FormField
                    control={paymentDetailsForm.control}
                    name="paypalEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PayPal Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter PayPal email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={paymentDetailsForm.control}
                  name="termsAgreed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                      <FormControl>
                        <div className="mt-1">
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                      </FormControl>
                      <div className="leading-tight">
                        <FormLabel className="font-normal text-sm text-gray-700">
                          I agree to the{" "}
                          <a href="#" className="text-primary underline hover:text-blue-600">
                            terms and conditions
                          </a>{" "}
                          and authorize FlightEaseClaim to act on my behalf to claim compensation from the airline.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
                  <p className="font-medium mb-2">Here's what happens next:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>We'll review your claim details and may contact you for additional information.</li>
                    <li>We'll submit your claim to the airline and negotiate on your behalf.</li>
                    <li>Once compensation is received, we'll transfer it to your specified payment method.</li>
                    <li>Our service fee (25% + VAT) will be deducted from the compensation amount.</li>
                  </ul>
                </div>
                
                <div className="pt-4 flex justify-between items-center">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep(3)}
                    className="flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  
                  <Button type="submit">
                    Submit Claim
                    <Check className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-primary">Step {step} of 4</span>
              <span className="text-sm text-gray-500">{Math.round((step / 4) * 100)}% complete</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-in-out rounded-full"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="p-6 md:p-8">
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimForm;
