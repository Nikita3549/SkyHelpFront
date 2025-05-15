
import React, { useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { Mail, Paperclip, Send } from "lucide-react";
import { Claim } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";

type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  body: string;
}

type EmailComposerProps = {
  claim: Claim;
}

// Pre-defined email templates
const emailTemplates: EmailTemplate[] = [
  {
    id: "initial",
    name: "Initial Claim Submission",
    subject: "Flight Compensation Claim - [FLIGHT_NUMBER]",
    body: `Dear [AIRLINE],

We are writing on behalf of our client [PASSENGER_NAME] regarding flight [FLIGHT_NUMBER] on [FLIGHT_DATE] from [DEPARTURE_AIRPORT] to [ARRIVAL_AIRPORT].

Our client experienced [ISSUE_TYPE] and is entitled to compensation of [AMOUNT] under applicable regulations.

Please find attached supporting documentation. We kindly request your review and response within 14 days.

Best regards,
SkyHelp Claims Team`
  },
  {
    id: "followup",
    name: "Follow-up Email #1 (after 7 days)",
    subject: "REMINDER: Flight Compensation Claim - [FLIGHT_NUMBER]",
    body: `Dear [AIRLINE],

We are following up on our previous correspondence regarding flight compensation claim for [PASSENGER_NAME] on flight [FLIGHT_NUMBER] on [FLIGHT_DATE].

We have not received a response to our initial claim sent on [INITIAL_CLAIM_DATE]. Please provide an update on this claim within 7 days.

Best regards,
SkyHelp Claims Team`
  },
  {
    id: "final",
    name: "Final Warning Before Legal Action",
    subject: "URGENT: Final Notice - Flight Compensation Claim [FLIGHT_NUMBER]",
    body: `Dear [AIRLINE],

Despite our previous communications, we have not received a satisfactory response regarding the compensation claim for [PASSENGER_NAME] on flight [FLIGHT_NUMBER].

We must inform you that if no response is received within 7 days, we will be forced to escalate this matter through legal channels.

The compensation amount of [AMOUNT] remains due under applicable regulations.

Best regards,
SkyHelp Claims Team`
  }
];

const EmailComposer = ({ claim }: EmailComposerProps) => {
  const form = useForm({
    defaultValues: {
      template: "",
      recipient: claim.airline + "@airlines.com",
      subject: "",
      message: "",
      attachment: null as File | null,
    }
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleTemplateChange = (templateId: string) => {
    const template = emailTemplates.find(t => t.id === templateId);
    if (!template) return;
    
    // Fill form with template data and replace placeholders
    let subject = template.subject;
    let body = template.body;
    
    // Replace placeholders with actual data from claim
    const replacements: Record<string, string> = {
      "[PASSENGER_NAME]": claim.customer,
      "[FLIGHT_NUMBER]": claim.flightnumber,
      "[AIRLINE]": claim.airline,
      "[FLIGHT_DATE]": claim.date,
      "[DEPARTURE_AIRPORT]": claim.departureairport || "Unknown",
      "[ARRIVAL_AIRPORT]": claim.arrivalairport || "Unknown",
      "[AMOUNT]": claim.amount,
      "[ISSUE_TYPE]": claim.flightissue || "a flight disruption",
      "[INITIAL_CLAIM_DATE]": new Date().toLocaleDateString()
    };
    
    Object.entries(replacements).forEach(([key, value]) => {
      subject = subject.replace(key, value);
      body = body.replace(key, value);
    });
    
    form.setValue("subject", subject);
    form.setValue("message", body);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...newFiles]);
    }
  };
  
  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  const onSubmit = (data: any) => {
    // Here you would implement actual email sending
    console.log("Sending email with data:", data);
    console.log("Attachments:", selectedFiles);
    
    toast({
      title: "Email sent successfully",
      description: `Email sent to ${data.recipient}`,
    });
    
    // Reset form after sending
    form.reset();
    setSelectedFiles([]);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Mail className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-medium">Compose Email</h3>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem className="space-y-2">
              <FormLabel>Email Template</FormLabel>
              <Select 
                onValueChange={handleTemplateChange}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {emailTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
            
            <FormItem className="space-y-2">
              <FormLabel>To</FormLabel>
              <FormControl>
                <Input {...form.register("recipient")} />
              </FormControl>
            </FormItem>
          </div>
          
          <FormItem className="space-y-2">
            <FormLabel>Subject</FormLabel>
            <FormControl>
              <Input {...form.register("subject")} />
            </FormControl>
          </FormItem>
          
          <FormItem className="space-y-2">
            <FormLabel>Message</FormLabel>
            <FormControl>
              <Textarea 
                {...form.register("message")} 
                className="min-h-[200px]" 
              />
            </FormControl>
          </FormItem>
          
          <FormItem>
            <FormLabel>Attachments</FormLabel>
            <div className="mt-1">
              <label className="flex items-center gap-2 p-2 border border-dashed rounded-md hover:bg-gray-50 cursor-pointer">
                <Paperclip className="h-4 w-4" />
                <span className="text-sm">Add attachments</span>
                <Input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  multiple
                />
              </label>
            </div>
            
            {selectedFiles.length > 0 && (
              <div className="mt-2 space-y-2">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-sm truncate">{file.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFile(index)}
                      className="h-6 w-6 p-0"
                    >
                      &times;
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </FormItem>
          
          <div className="flex justify-end">
            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" />
              Send Email to Airline
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EmailComposer;
