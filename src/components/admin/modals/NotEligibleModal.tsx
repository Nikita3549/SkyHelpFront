import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Edit, Mail, Send, X } from 'lucide-react';

type NotEligibleModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (
    reason: string,
    additionalNotes?: string,
    emailData?: EmailData,
  ) => void;
  claimId: string;
  customerName?: string;
  flightNumber?: string;
  flightDate?: string;
};

export type EmailData = {
  subject: string;
  body: string;
  sendEmail: boolean;
};

const PREDEFINED_REASONS = [
  'Flight outside EU/UK jurisdiction',
  'Extraordinary circumstances (weather, strikes, etc.)',
  'Claim submitted too late (>6 years UK/2 years EU)',
  'Airline already provided compensation',
  'Insufficient documentation provided',
  'Other (please specify)',
];

// Email templates for each reason
const EMAIL_TEMPLATES: Record<string, { subject: string; body: string }> = {
  'Flight outside EU/UK jurisdiction': {
    subject: 'Your compensation claim could not proceed - Jurisdiction',
    body: "Dear [CUSTOMER_NAME],\n\nThank you for submitting your claim regarding flight [FLIGHT_NUMBER] on [FLIGHT_DATE].\n\nAfter reviewing your case, we found that the flight does not fall under EU261 or UK261 jurisdiction, which means compensation rights don't apply in this case.\n\nWe appreciate your understanding.\n\nBest regards,\nSkyHelp Claims Team",
  },
  'Extraordinary circumstances (weather, strikes, etc.)': {
    subject:
      'Your compensation claim could not proceed - Extraordinary circumstances',
    body: 'Dear [CUSTOMER_NAME],\n\nThank you for submitting your claim regarding flight [FLIGHT_NUMBER] on [FLIGHT_DATE].\n\nAfter reviewing your case, we found that the disruption was caused by extraordinary circumstances (such as weather or strikes), which are not eligible under EC261 compensation rules.\n\nWe appreciate your understanding.\n\nBest regards,\nSkyHelp Claims Team',
  },
  'Claim submitted too late (>6 years UK/2 years EU)': {
    subject: 'Your compensation claim could not proceed - Time limitation',
    body: 'Dear [CUSTOMER_NAME],\n\nThank you for submitting your claim regarding flight [FLIGHT_NUMBER] on [FLIGHT_DATE].\n\nUnfortunately, your claim has been submitted outside the legal time limitation (6 years for UK claims, 2 years for EU claims). As a result, we cannot proceed with your compensation request.\n\nWe appreciate your understanding.\n\nBest regards,\nSkyHelp Claims Team',
  },
  'Airline already provided compensation': {
    subject:
      'Your compensation claim could not proceed - Previous compensation',
    body: 'Dear [CUSTOMER_NAME],\n\nThank you for submitting your claim regarding flight [FLIGHT_NUMBER] on [FLIGHT_DATE].\n\nOur records indicate that compensation has already been provided by the airline for this disruption, which means we cannot pursue this claim further.\n\nWe appreciate your understanding.\n\nBest regards,\nSkyHelp Claims Team',
  },
  'Insufficient documentation provided': {
    subject:
      'Your compensation claim could not proceed - Insufficient documentation',
    body: 'Dear [CUSTOMER_NAME],\n\nThank you for submitting your claim regarding flight [FLIGHT_NUMBER] on [FLIGHT_DATE].\n\nDespite our requests, we have not received sufficient documentation to support your claim. Without adequate proof, we cannot pursue compensation from the airline.\n\nWe appreciate your understanding.\n\nBest regards,\nSkyHelp Claims Team',
  },
  'Other (please specify)': {
    subject: 'Your compensation claim could not proceed',
    body: 'Dear [CUSTOMER_NAME],\n\nThank you for submitting your claim regarding flight [FLIGHT_NUMBER] on [FLIGHT_DATE].\n\nAfter reviewing your case, we found that: [CUSTOM_REASON]\n\nWe appreciate your understanding.\n\nBest regards,\nSkyHelp Claims Team',
  },
};

const NotEligibleModal = ({
  isOpen,
  onClose,
  onConfirm,
  claimId,
  customerName = 'Customer',
  flightNumber = '',
  flightDate = '',
}: NotEligibleModalProps) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [otherReason, setOtherReason] = useState<string>('');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  const [currentTab, setCurrentTab] = useState<string>('details');

  // Email preview state
  const [emailSubject, setEmailSubject] = useState<string>('');
  const [emailBody, setEmailBody] = useState<string>('');
  const [sendEmail, setSendEmail] = useState<boolean>(true);

  // Update email preview when reason changes
  useEffect(() => {
    if (!selectedReason) return;

    const template = EMAIL_TEMPLATES[selectedReason];
    if (template) {
      let subject = template.subject;
      let body = template.body;

      // Replace placeholders
      body = body.replace('[CUSTOMER_NAME]', customerName);
      body = body.replace('[FLIGHT_NUMBER]', flightNumber);
      body = body.replace('[FLIGHT_DATE]', flightDate);

      // For custom reason
      if (selectedReason === 'Other (please specify)') {
        body = body.replace('[CUSTOM_REASON]', otherReason);
      }

      setEmailSubject(subject);
      setEmailBody(body);
    }
  }, [selectedReason, otherReason, customerName, flightNumber, flightDate]);

  const handleConfirm = () => {
    const finalReason =
      selectedReason === 'Other (please specify)'
        ? otherReason
        : selectedReason;

    // Prepare email data if sending email
    const emailData: EmailData | undefined = sendEmail
      ? {
          subject: emailSubject,
          body: emailBody,
          sendEmail: true,
        }
      : undefined;

    onConfirm(finalReason, additionalNotes, emailData);
    handleClose();
  };

  const handleClose = () => {
    onClose();
    // Reset the form
    setSelectedReason('');
    setOtherReason('');
    setAdditionalNotes('');
    setCurrentTab('details');
    setEmailSubject('');
    setEmailBody('');
    setSendEmail(true);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Mark Claim as Not Eligible</AlertDialogTitle>
          <AlertDialogDescription>
            Claim {claimId} will be marked as not eligible for compensation.
            Select a reason and review the email that will be sent to the
            customer.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mt-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="email" disabled={!selectedReason}>
              Email Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4 my-4">
            <div className="space-y-2">
              <Label htmlFor="reason" className="text-sm font-medium">
                Reason for ineligibility <span className="text-red-500">*</span>
              </Label>
              <Select
                value={selectedReason}
                onValueChange={(value) => {
                  setSelectedReason(value);
                  // Automatically show email preview when reason is selected
                  if (value) {
                    setCurrentTab('email');
                  }
                }}
              >
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

            {selectedReason === 'Other (please specify)' && (
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
          </TabsContent>

          <TabsContent value="email" className="space-y-4 my-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-blue-500" />
                <h3 className="text-base font-medium">Email to Customer</h3>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentTab('details')}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Details
                </Button>
              </div>
            </div>

            <div className="space-y-4 border rounded-md p-4">
              <div className="space-y-2">
                <Label htmlFor="email-subject">Subject</Label>
                <Input
                  id="email-subject"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-body">Message</Label>
                <Textarea
                  id="email-body"
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="min-h-[200px]"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="send-email"
                  checked={sendEmail}
                  onChange={(e) => setSendEmail(e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <Label htmlFor="send-email" className="text-sm">
                  Send this email to the customer
                </Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={
              (selectedReason === 'Other (please specify)' && !otherReason) ||
              !selectedReason
            }
            className="gap-2"
          >
            {sendEmail ? (
              <>
                <Send className="h-4 w-4" />
                {currentTab === 'email' ? 'Confirm & Send Email' : 'Continue'}
              </>
            ) : (
              'Confirm'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NotEligibleModal;
