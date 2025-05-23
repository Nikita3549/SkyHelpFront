
import React from "react";
import { motion } from "framer-motion";
import { Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const AffiliateRegister = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Registration submitted",
      description: "We'll review your application and get back to you shortly.",
    });
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-block p-3 bg-[#D3E4FD] rounded-full mb-4">
              <Share className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Become a SkyHelp Affiliate Partner</h1>
            <p className="text-lg text-gray-600">
              Fill out this form to join our affiliate program and start earning commissions.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Affiliate Registration</CardTitle>
                <CardDescription>
                  Please provide your information to join the SkyHelp affiliate program.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="website">Website or Social Media Profile (optional)</Label>
                    <Input id="website" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="audience">Tell us about your audience</Label>
                    <textarea
                      id="audience"
                      className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="How many followers do you have? What channels do you use to reach them? etc."
                    ></textarea>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="referral">How did you hear about us?</Label>
                    <Input id="referral" />
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                    </Label>
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Submit Application
                  </Button>
                  
                  <p className="text-center text-sm text-gray-500 mt-4">
                    We'll review your application and get back to you within 1-2 business days.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AffiliateRegister;
