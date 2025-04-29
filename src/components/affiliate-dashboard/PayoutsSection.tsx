
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { CreditCard, ChevronsUpDown, FileText } from "lucide-react";

// Define the types for the payouts data
type PayoutsData = {
  id: number;
  amount: number;
  date: string;
  status: string;
}[];

type UserData = {
  name: string;
  email: string;
  paymentMethod: string;
  paymentDetails: string;
};

type PayoutsSectionProps = {
  payoutsData: PayoutsData;
  userData: UserData;
};

const PayoutsSection: React.FC<PayoutsSectionProps> = ({ payoutsData, userData }) => {
  const [paymentMethod, setPaymentMethod] = useState(userData.paymentMethod);
  const [paymentDetails, setPaymentDetails] = useState(userData.paymentDetails);
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };
  
  // Function to get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "processing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const handlePaymentSave = () => {
    // In a real app, this would make an API call to update the user's payment details
    toast({
      title: "Payment details updated",
      description: "Your payment preferences have been saved successfully.",
    });
  };

  // Calculate totals
  const totalPaid = payoutsData
    .filter(payout => payout.status.toLowerCase() === "paid")
    .reduce((sum, payout) => sum + payout.amount, 0);
  
  const totalPending = payoutsData
    .filter(payout => payout.status.toLowerCase() !== "paid")
    .reduce((sum, payout) => sum + payout.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payouts</h1>
        <p className="text-muted-foreground">
          Manage your payment history and preferences.
        </p>
      </div>
      
      {/* Payment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Payout Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Paid</span>
                <span className="font-medium">€{totalPaid}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pending Payouts</span>
                <span className="font-medium">€{totalPending}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span>Total Earnings</span>
                  <span className="font-bold">€{totalPaid + totalPending}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-md">
              <div className="flex items-start gap-3">
                <CreditCard className="text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium">Payment Threshold</h4>
                  <p className="text-sm text-muted-foreground">Payouts are processed automatically when your balance reaches €50.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Payment Method Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Choose how you want to receive your earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="PayPal" id="payment-paypal" />
                <Label htmlFor="payment-paypal">PayPal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="IBAN" id="payment-iban" />
                <Label htmlFor="payment-iban">Bank Transfer (IBAN)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Wise" id="payment-wise" />
                <Label htmlFor="payment-wise">Wise / Revolut</Label>
              </div>
            </RadioGroup>
            
            <div className="mt-4">
              <Label htmlFor="payment-details">Payment Details</Label>
              <Input 
                id="payment-details"
                value={paymentDetails}
                onChange={(e) => setPaymentDetails(e.target.value)}
                placeholder={
                  paymentMethod === "PayPal" ? "PayPal email address" : 
                  paymentMethod === "IBAN" ? "IBAN number" : 
                  "Wise/Revolut email or account ID"
                }
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {paymentMethod === "PayPal" ? "Enter the email address associated with your PayPal account." : 
                paymentMethod === "IBAN" ? "Enter your full IBAN number for bank transfers." : 
                "Enter your Wise or Revolut email or account ID."}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handlePaymentSave}>Save Payment Details</Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Payout History Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Payout History</span>
            <Button variant="outline" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payoutsData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                    No payment history available yet.
                  </TableCell>
                </TableRow>
              ) : (
                payoutsData.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell>{formatDate(payout.date)}</TableCell>
                    <TableCell>€{payout.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusBadgeColor(payout.status)}>
                        {payout.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayoutsSection;
