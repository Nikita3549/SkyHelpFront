
import React, { useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { userService } from "@/services/userService";

// Define the form schema
const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  flightNumber: z.string().min(2, "Flight number is required"),
  airline: z.string().min(2, "Airline name is required"),
  departureAirport: z.string().min(2, "Departure airport is required"),
  arrivalAirport: z.string().min(2, "Arrival airport is required"),
  flightDate: z.string().min(2, "Flight date is required"),
  issueType: z.enum(["delay", "cancellation", "overbooking", "other"]),
  issueDetails: z.string().min(10, "Please provide details about the issue"),
});

const ClaimForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState(1);
  const [claimId, setClaimId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      flightNumber: "",
      airline: "",
      departureAirport: "",
      arrivalAirport: "",
      flightDate: "",
      issueType: "delay",
      issueDetails: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      // Step 1: Create the claim ID
      const claimId = `CLM-${Math.floor(1000 + Math.random() * 9000)}`;
      setClaimId(claimId);
      
      // Format data for the database
      const claimData = {
        id: claimId,
        customer: `${values.firstName} ${values.lastName}`, // Will be updated with user ID later
        email: values.email,
        phone: values.phone,
        flightnumber: values.flightNumber,
        airline: values.airline,
        departureairport: values.departureAirport,
        arrivalairport: values.arrivalAirport,
        date: values.flightDate,
        flightissue: values.issueType,
        additionalinformation: values.issueDetails,
        status: "pending",
        stage: "initial_review",
        amount: "€0", // Default amount, will be updated by admin
        lastupdated: format(new Date(), "yyyy-MM-dd"),
      };

      // Step 2: Insert the claim into the database
      const { error: insertError } = await supabase
        .from("claims")
        .insert([claimData]);

      if (insertError) {
        console.error("Error submitting claim:", insertError);
        throw new Error("Failed to submit claim. Please try again.");
      }

      // Step 3: Create a user account for this claim
      try {
        await userService.createUserFromClaim(
          values.email, 
          values.firstName, 
          values.lastName,
          claimId
        );
        
        // Success notification
        toast.success("Claim submitted successfully! Check your email for account details.");
        
        // Move to confirmation step
        setSubmissionStep(2);
      } catch (userError) {
        console.error("Error creating user account:", userError);
        // We still created the claim, so show a partial success
        toast.success("Claim submitted successfully!");
        toast.error("Could not create user account. Please contact support.");
        setSubmissionStep(2);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReturnHome = () => {
    navigate("/");
  };

  // Show claim form or success message based on submission step
  return (
    <div className="container max-w-4xl py-12">
      {submissionStep === 1 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Flight Compensation Claim</CardTitle>
              <CardDescription>
                Submit your flight compensation claim by filling out the form below. We'll analyze
                your case and contact you about the next steps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Your contact details for this claim
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
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
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="john.doe@example.com" {...field} />
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
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 234 567 890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium">Flight Information</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Details about the affected flight
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="airline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Airline</FormLabel>
                            <FormControl>
                              <Input placeholder="British Airways" {...field} />
                            </FormControl>
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
                              <Input placeholder="BA1234" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="departureAirport"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Departure Airport</FormLabel>
                            <FormControl>
                              <Input placeholder="LHR" {...field} />
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
                              <Input placeholder="JFK" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="flightDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Flight Date</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="issueType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Issue Type</FormLabel>
                            <FormControl>
                              <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                {...field}
                              >
                                <option value="delay">Flight Delay</option>
                                <option value="cancellation">Flight Cancellation</option>
                                <option value="overbooking">Overbooking/Denied Boarding</option>
                                <option value="other">Other</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <FormField
                      control={form.control}
                      name="issueDetails"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Details</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please provide details about what happened with your flight..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Include any relevant details that may help us with your claim.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Claim"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600">Claim Submitted Successfully!</CardTitle>
              <CardDescription>
                Your claim reference number: <span className="font-bold">{claimId}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="mb-4">
                  We've created an account for you to track the progress of your claim.
                </p>
                <p className="mb-4">
                  <strong>Please check your email</strong> for your login details and temporary password.
                </p>
                <p>
                  After logging in, you'll be able to view the status of your claim and
                  submit any additional information.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={handleReturnHome}>Return to Home</Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default ClaimForm;
