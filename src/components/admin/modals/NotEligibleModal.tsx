
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type NotEligibleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string, additionalNotes?: string) => void;
  claimId: string;
};

const PREDEFINED_REASONS = [
  "Flight outside EU/UK jurisdiction",
  "Extraordinary circumstances (weather, strikes, etc.)",
  "Claim submitted too late (>6 years UK/2 years EU)",
  "Airline already provided compensation",
  "Insufficient documentation provided",
  "Other (please specify)"
];

const NotEligibleModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  claimId 
}: NotEligibleModalProps) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [otherReason, setOtherReason] = useState<string>("");
  const [additionalNotes, setAdditionalNotes] = useState<string>("");

  const handleConfirm = () => {
    const finalReason = selectedReason === "Other (please specify)" 
      ? otherReason 
      : selectedReason;
      
    onConfirm(finalReason, additionalNotes);
    onClose();
    
    // Reset the form
    setSelectedReason("");
    setOtherReason("");
    setAdditionalNotes("");
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Mark Claim as Not Eligible</AlertDialogTitle>
          <AlertDialogDescription>
            Claim {claimId} will be marked as not eligible for compensation.
            This will notify the customer that their claim does not qualify.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-medium">
              Reason for ineligibility <span className="text-red-500">*</span>
            </Label>
            <Select value={selectedReason} onValueChange={setSelectedReason}>
              <SelectTrigger id="reason" className="w-full">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {PREDEFINED_REASONS.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedReason === "Other (please specify)" && (
            <div className="space-y-2">
              <Label htmlFor="other-reason" className="text-sm font-medium">
                Specify reason <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="other-reason"
                placeholder="Enter the reason for ineligibility"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="resize-none"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="additional-notes" className="text-sm font-medium">
              Internal notes (optional)
            </Label>
            <Textarea
              id="additional-notes"
              placeholder="Add any internal notes about this decision"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              className="resize-none"
            />
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            disabled={(selectedReason === "Other (please specify)" && !otherReason) || !selectedReason}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NotEligibleModal;
