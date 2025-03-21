
import React, { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Schema validation for the form
const newClaimSchema = z.object({
  customer: z.string().min(3, "Customer name is required"),
  email: z.string().email("Valid email is required"),
  airline: z.string().min(1, "Airline is required"),
  flightnumber: z.string().min(1, "Flight number is required"), // Changed from flightNumber to flightnumber
  date: z.date(),
  amount: z.string().min(1, "Amount is required"),
});

type NewClaimFormProps = {
  onSubmit: (claimData: any) => void;
  onCancel: () => void;
};

const NewClaimForm = ({ onSubmit, onCancel }: NewClaimFormProps) => {
  const [formData, setFormData] = useState({
    customer: "",
    email: "",
    airline: "",
    flightnumber: "", // Changed from flightNumber to flightnumber
    date: new Date(),
    amount: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when field is edited
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate the data
      newClaimSchema.parse(formData);
      
      // Create ID for the new claim
      const claimId = `CLM-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // Create object with the new claim data
      const newClaim = {
        id: claimId,
        customer: formData.customer,
        email: formData.email,
        airline: formData.airline,
        flightnumber: formData.flightnumber, // Changed from flightNumber to flightnumber
        date: format(formData.date, "yyyy-MM-dd"),
        status: "pending",
        stage: "initial_review",
        amount: formData.amount.startsWith("€") ? formData.amount : `€${formData.amount}`,
        lastupdated: format(new Date(), "yyyy-MM-dd"), // Changed from lastUpdated to lastupdated
      };

      onSubmit(newClaim);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path) {
            newErrors[error.path[0].toString()] = error.message;
          }
        });
        setErrors(newErrors);
        
        toast.error("Please fix the form errors");
      } else {
        toast.error("An error occurred while creating the claim");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="customer">Customer Name</Label>
        <Input
          id="customer"
          value={formData.customer}
          onChange={(e) => handleChange("customer", e.target.value)}
          placeholder="Enter customer name"
        />
        {errors.customer && <p className="text-sm text-red-500">{errors.customer}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="customer@example.com"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="airline">Airline</Label>
          <Select
            value={formData.airline}
            onValueChange={(value) => handleChange("airline", value)}
          >
            <SelectTrigger id="airline">
              <SelectValue placeholder="Select airline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Lufthansa">Lufthansa</SelectItem>
              <SelectItem value="British Airways">British Airways</SelectItem>
              <SelectItem value="Air France">Air France</SelectItem>
              <SelectItem value="Ryanair">Ryanair</SelectItem>
              <SelectItem value="EasyJet">EasyJet</SelectItem>
              <SelectItem value="Eurowings">Eurowings</SelectItem>
              <SelectItem value="KLM">KLM</SelectItem>
            </SelectContent>
          </Select>
          {errors.airline && <p className="text-sm text-red-500">{errors.airline}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="flightnumber">Flight Number</Label>
          <Input
            id="flightnumber"
            value={formData.flightnumber}  // Changed from flightNumber to flightnumber
            onChange={(e) => handleChange("flightnumber", e.target.value)}  // Changed from flightNumber to flightnumber
            placeholder="e.g. LH1234"
          />
          {errors.flightnumber && <p className="text-sm text-red-500">{errors.flightnumber}</p>}  // Changed from flightNumber to flightnumber
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Flight Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => handleChange("date", date || new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amount">Compensation Amount</Label>
          <Input
            id="amount"
            value={formData.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            placeholder="e.g. 400"
          />
          {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Create Claim
        </Button>
      </div>
    </form>
  );
};

export default NewClaimForm;
