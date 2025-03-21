import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { claimsService } from "@/services/claimsService";
import { userService } from "@/services/userService";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  address: z.string().optional(),
  airline: z.string({ required_error: "Please select an airline." }),
  flightNumber: z.string().min(2, "Please enter a valid flight number."),
  departureAirport: z.string().min(2, "Please enter the departure airport."),
  arrivalAirport: z.string().min(2, "Please enter the arrival airport."),
  date: z.date({
    required_error: "Please select the date of your flight.",
  }),
  flightIssue: z.string({
    required_error: "Please select the issue with your flight.",
  }),
  reasonGivenByAirline: z.string().optional(),
  numberOfPassengers: z.string().min(1, "Please enter the number of passengers."),
  additionalInfo: z.string().optional(),
  paymentMethod: z.string({
    required_error: "Please select a payment method.",
  }),
  bankName: z.string().optional(),
  accountHolderName: z.string().optional(),
  iban: z.string().optional(),
  accountNumber: z.string().optional(),
  paypalEmail: z.string().email("Please enter a valid email address.").optional(),
  wiseAccountHolder: z.string().optional(),
  wiseIbanOrAccount: z.string().optional(),
  wiseEmail: z.string().email("Please enter a valid email address.").optional(),
});

type FormValues = z.infer<typeof formSchema>;

const ClaimForm = () => {
  const [currentTab, setCurrentTab] = useState("1");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: user?.email || "",
      phone: "",
      address: "",
      airline: "",
      flightNumber: "",
      departureAirport: "",
      arrivalAirport: "",
      date: new Date(),
      flightIssue: "",
      reasonGivenByAirline: "",
      numberOfPassengers: "1",
      additionalInfo: "",
      paymentMethod: "",
      bankName: "",
      accountHolderName: "",
      iban: "",
      accountNumber: "",
      paypalEmail: "",
      wiseAccountHolder: "",
      wiseIbanOrAccount: "",
      wiseEmail: "",
    },
  });

  useEffect(() => {
    if (user?.email) {
      form.setValue('email', user.email);
    }
  }, [user, form]);

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    let paymentDetails = {};
    if (data.paymentMethod === "bank_transfer") {
      paymentDetails = {
        bankName: data.bankName,
        accountHolderName: data.accountHolderName,
        iban: data.iban,
        accountNumber: data.accountNumber,
      };
    } else if (data.paymentMethod === "paypal") {
      paymentDetails = {
        paypalEmail: data.paypalEmail,
      };
    } else if (data.paymentMethod === "wise") {
      paymentDetails = {
        accountHolderName: data.wiseAccountHolder,
        ibanOrAccount: data.wiseIbanOrAccount,
        email: data.wiseEmail,
      };
    }

    const claimId = `CLM-${Math.floor(1000 + Math.random() * 9000)}`;
    
    try {
      const claim = await claimsService.createClaim({
        id: claimId,
        customer: user?.id || "pending",
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        airline: data.airline,
        flightnumber: data.flightNumber,
        date: format(data.date, "yyyy-MM-dd"),
        status: "pending",
        stage: "initial_review",
        amount: "€0",
        lastupdated: format(new Date(), "yyyy-MM-dd"),
        numberOfPassengers: data.numberOfPassengers,
        departureAirport: data.departureAirport,
        arrivalAirport: data.arrivalAirport,
        flightIssue: data.flightIssue,
        reasonGivenByAirline: data.reasonGivenByAirline || "",
        additionalInformation: data.additionalInfo || "",
        paymentMethod: data.paymentMethod,
        paymentDetails: paymentDetails,
      });

      if (!user) {
        try {
          await userService.createUserFromClaim(
            data.email,
            data.firstName,
            data.lastName,
            claimId
          );
          
          toast.success(
            "Your claim has been submitted successfully! We've created an account for you and sent login details to your email."
          );
        } catch (error) {
          console.error("Error creating user account:", error);
          toast.success(
            "Your claim has been submitted, but we encountered an issue creating your account. Please contact support."
          );
        }
      } else {
        toast.success("Your claim has been submitted successfully!");
      }
      
      navigate(user ? "/dashboard" : "/");
      
    } catch (error) {
      console.error("Error submitting claim:", error);
      toast.error("There was an error submitting your claim. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (value: string) => {
    const currentTabNum = parseInt(currentTab);
    const nextTabNum = parseInt(value);

    if (nextTabNum > currentTabNum) {
      const fieldsToValidate: (keyof FormValues)[] = [];

      if (currentTabNum === 1) {
        fieldsToValidate.push("firstName", "lastName", "email", "phone", "address");
      } else if (currentTabNum === 2) {
        fieldsToValidate.push("airline", "flightNumber", "departureAirport", "arrivalAirport", "date", "numberOfPassengers");
      } else if (currentTabNum === 3) {
        fieldsToValidate.push("flightIssue", "reasonGivenByAirline");
      }

      const isValid = fieldsToValidate.every(field => {
        const result = form.trigger(field);
        return result;
      });

      if (!isValid) return;
    }

    setCurrentTab(value);
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    form.setValue("paymentMethod", value);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto min-h-screen"
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
            File Your Compensation Claim
          </CardTitle>
          <CardDescription className="text-center mt-2">
            Complete the form below to start your flight compensation claim process.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Tabs
                value={currentTab}
                onValueChange={handleTabChange}
                className="w-full"
              >
                <TabsList className="grid grid-cols-5 mb-8">
                  <TabsTrigger value="1">Personal</TabsTrigger>
                  <TabsTrigger value="2">Flight</TabsTrigger>
                  <TabsTrigger value="3">Issue</TabsTrigger>
                  <TabsTrigger value="4">Payment</TabsTrigger>
                  <TabsTrigger value="5">Review</TabsTrigger>
                </TabsList>

                <TabsContent value="1" className="mt-4 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="John" />
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
                            <Input {...field} placeholder="Doe" />
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
                          <Input
                            {...field}
                            type="email"
                            placeholder="john.doe@example.com"
                            disabled={!!user}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number (Optional)</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="+1 123 456 7890" />
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
                        <FormLabel>Address (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Your full address"
                            className="resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end mt-6">
                    <Button type="button" onClick={() => handleTabChange("2")}>
                      Next Step
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="2" className="mt-4 space-y-6">
                  <FormField
                    control={form.control}
                    name="airline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Airline</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an airline" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Lufthansa">Lufthansa</SelectItem>
                            <SelectItem value="British Airways">
                              British Airways
                            </SelectItem>
                            <SelectItem value="Air France">Air France</SelectItem>
                            <SelectItem value="KLM">KLM</SelectItem>
                            <SelectItem value="Ryanair">Ryanair</SelectItem>
                            <SelectItem value="easyJet">easyJet</SelectItem>
                            <SelectItem value="Vueling">Vueling</SelectItem>
                            <SelectItem value="Iberia">Iberia</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="flightNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Flight Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g. LH1234" />
                        </FormControl>
                        <FormDescription>
                          Enter the flight number as it appears on your ticket or
                          boarding pass.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="departureAirport"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Departure Airport</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g. LHR or London Heathrow" />
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
                            <Input {...field} placeholder="e.g. CDG or Paris Charles de Gaulle" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Flight Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date > new Date()}
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
                      name="numberOfPassengers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Passengers</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select number" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                <SelectItem key={num} value={num.toString()}>
                                  {num}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleTabChange("1")}
                    >
                      Previous Step
                    </Button>
                    <Button type="button" onClick={() => handleTabChange("3")}>
                      Next Step
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="3" className="mt-4 space-y-6">
                  <FormField
                    control={form.control}
                    name="flightIssue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What happened with your flight?</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an issue" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="delay">Flight was delayed</SelectItem>
                            <SelectItem value="cancellation">
                              Flight was cancelled
                            </SelectItem>
                            <SelectItem value="denied_boarding">
                              Denied boarding
                            </SelectItem>
                            <SelectItem value="missed_connection">
                              Missed connection
                            </SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reasonGivenByAirline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          What reason did the airline give? (Optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Please explain the reason given by the airline"
                            className="resize-none min-h-32"
                          />
                        </FormControl>
                        <FormDescription>
                          This helps us understand your case better and improve your
                          chances of compensation.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Additional Information (Optional)
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Any other details you think might be relevant to your claim"
                            className="resize-none min-h-32"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleTabChange("2")}
                    >
                      Previous Step
                    </Button>
                    <Button type="button" onClick={() => handleTabChange("4")}>
                      Next Step
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="4" className="mt-4 space-y-6">
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          How would you like to receive your compensation?
                        </FormLabel>
                        <Select
                          onValueChange={(value) => handlePaymentMethodChange(value)}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="bank_transfer">
                              Bank Transfer
                            </SelectItem>
                            <SelectItem value="paypal">PayPal</SelectItem>
                            <SelectItem value="wise">Wise (TransferWise)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {paymentMethod === "bank_transfer" && (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="bankName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bank Name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="e.g. Bank of America" />
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
                              <Input {...field} placeholder="e.g. John Doe" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="iban"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>IBAN (International)</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="e.g. DE89370400440532013000" />
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
                                <Input {...field} placeholder="Your account number" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <FormField
                      control={form.control}
                      name="paypalEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PayPal Email Address</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="your.email@example.com"
                            />
                          </FormControl>
                          <FormDescription>
                            Make sure this is the email associated with your PayPal
                            account.
                          </FormDescription>
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
                              <Input {...field} placeholder="e.g. John Doe" />
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
                              <Input
                                {...field}
                                placeholder="Your Wise IBAN or account number"
                              />
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
                            <FormLabel>Wise Account Email</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="your.email@example.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleTabChange("3")}
                    >
                      Previous Step
                    </Button>
                    <Button type="button" onClick={() => handleTabChange("5")}>
                      Review Claim
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="5" className="mt-4 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Name:</span>{" "}
                        {form.getValues("firstName")} {form.getValues("lastName")}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span>{" "}
                        {form.getValues("email")}
                      </div>
                      <div>
                        <span className="font-medium">Phone:</span>{" "}
                        {form.getValues("phone") || "Not provided"}
                      </div>
                      <div>
                        <span className="font-medium">Address:</span>{" "}
                        {form.getValues("address") || "Not provided"}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Flight Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Airline:</span>{" "}
                        {form.getValues("airline")}
                      </div>
                      <div>
                        <span className="font-medium">Flight Number:</span>{" "}
                        {form.getValues("flightNumber")}
                      </div>
                      <div>
                        <span className="font-medium">Route:</span>{" "}
                        {form.getValues("departureAirport")} to{" "}
                        {form.getValues("arrivalAirport")}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span>{" "}
                        {form.getValues("date") && format(form.getValues("date"), "PPP")}
                      </div>
                      <div>
                        <span className="font-medium">Passengers:</span>{" "}
                        {form.getValues("numberOfPassengers")}
                      </div>
                      <div>
                        <span className="font-medium">Issue:</span>{" "}
                        {form.getValues("flightIssue") === "delay"
                          ? "Flight was delayed"
                          : form.getValues("flightIssue") === "cancellation"
                          ? "Flight was cancelled"
                          : form.getValues("flightIssue") === "denied_boarding"
                          ? "Denied boarding"
                          : form.getValues("flightIssue") === "missed_connection"
                          ? "Missed connection"
                          : form.getValues("flightIssue")}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <div className="mb-4">
                        <span className="font-medium">Payment Method:</span>{" "}
                        {form.getValues("paymentMethod") === "bank_transfer"
                          ? "Bank Transfer"
                          : form.getValues("paymentMethod") === "paypal"
                          ? "PayPal"
                          : form.getValues("paymentMethod") === "wise"
                          ? "Wise (TransferWise)"
                          : form.getValues("paymentMethod")}
                      </div>

                      {form.getValues("paymentMethod") === "bank_transfer" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <span className="font-medium">Bank Name:</span>{" "}
                            {form.getValues("bankName")}
                          </div>
                          <div>
                            <span className="font-medium">Account Holder:</span>{" "}
                            {form.getValues("accountHolderName")}
                          </div>
                          <div>
                            <span className="font-medium">IBAN:</span>{" "}
                            {form.getValues("iban")}
                          </div>
                          <div>
                            <span className="font-medium">Account Number:</span>{" "}
                            {form.getValues("accountNumber")}
                          </div>
                        </div>
                      )}

                      {form.getValues("paymentMethod") === "paypal" && (
                        <div>
                          <span className="font-medium">PayPal Email:</span>{" "}
                          {form.getValues("paypalEmail")}
                        </div>
                      )}

                      {form.getValues("paymentMethod") === "wise" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <span className="font-medium">Account Holder:</span>{" "}
                            {form.getValues("wiseAccountHolder")}
                          </div>
                          <div>
                            <span className="font-medium">IBAN/Account:</span>{" "}
                            {form.getValues("wiseIbanOrAccount")}
                          </div>
                          <div>
                            <span className="font-medium">Email:</span>{" "}
                            {form.getValues("wiseEmail")}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="flex items-center space-x-2 mt-4">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I agree to the{" "}
                      <a href="#" className="text-primary hover:underline">
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleTabChange("4")}
                    >
                      Previous Step
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Submitting..." : "Submit Claim"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col items-center text-center text-sm text-gray-500 pb-8">
          <p>
            Our team will review your claim and contact you within 24-48 hours.
          </p>
          <p className="mt-2">
            Questions? Contact us at{" "}
            <a
              href="mailto:support@flightclaim.com"
              className="text-primary hover:underline"
            >
              support@flightclaim.com
            </a>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ClaimForm;
