
import React, { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Claim } from "@/lib/supabase";
import { Download, Eye, Mail, Paperclip, Clock, AlertTriangle } from "lucide-react";
import { EmailAttachmentDialog } from "./EmailAttachmentDialog";

type EmailLogProps = {
  claim: Claim;
}

type EmailLogEntry = {
  id: string;
  date: string;
  direction: "incoming" | "outgoing";
  from: string;
  to: string;
  subject: string;
  summary: string;
  content?: string;
  attachments?: string[];
  isOverdue?: boolean;
}

// Mock data - in a real application, this would come from an API
const mockEmails: EmailLogEntry[] = [
  {
    id: "email1",
    date: "2025-05-15",
    direction: "outgoing",
    from: "SkyHelp",
    to: "Ryanair",
    subject: "Initial Claim Submission",
    summary: "Initial claim for flight compensation",
    content: `Dear Ryanair,

We are writing on behalf of our client John Smith regarding flight FR1234 on 10/05/2025 from London to Madrid.

Our client experienced a flight cancellation and is entitled to compensation of €600 under EU261 regulations.

Please find attached supporting documentation. We kindly request your review and response within 14 days.

Best regards,
SkyHelp Claims Team`,
    attachments: ["boarding_pass.pdf"]
  },
  {
    id: "email2",
    date: "2025-05-20",
    direction: "incoming",
    from: "Ryanair",
    to: "SkyHelp",
    subject: "RE: Flight Compensation Claim - FR1234",
    summary: "Request for more documents",
    content: `Dear SkyHelp,

Thank you for your email regarding the compensation claim for John Smith.

We require additional documentation to process this claim. Please provide:
1. Proof of identity
2. Original booking confirmation

Regards,
Ryanair Customer Service`,
    attachments: ["request_form.pdf"]
  },
  {
    id: "email3",
    date: "2025-05-25",
    direction: "outgoing",
    from: "SkyHelp",
    to: "Ryanair",
    subject: "RE: Flight Compensation Claim - FR1234",
    summary: "Reminder Email",
    content: `Dear Ryanair,

We are following up on our previous correspondence and have attached the requested documents.

Please process the compensation claim within 7 days.

Best regards,
SkyHelp Claims Team`,
    attachments: ["id_proof.pdf", "booking_confirmation.pdf"],
    isOverdue: true
  }
];

const EmailLog = ({ claim }: EmailLogProps) => {
  const [selectedEmail, setSelectedEmail] = useState<EmailLogEntry | null>(null);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isAttachDialogOpen, setIsAttachDialogOpen] = useState(false);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  const handleViewEmail = (email: EmailLogEntry) => {
    setSelectedEmail(email);
    setIsEmailDialogOpen(true);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Mail className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-medium">Communication Log</h3>
        </div>
        
        <EmailAttachmentDialog claim={claim} />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead className="w-[120px]">Direction</TableHead>
              <TableHead className="w-[200px]">From → To</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockEmails.map((email) => (
              <TableRow key={email.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {email.isOverdue && (
                      <AlertTriangle size={16} className="text-amber-500" />
                    )}
                    {formatDate(email.date)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={email.direction === "outgoing" ? "default" : "secondary"}>
                    {email.direction === "outgoing" ? "Outgoing" : "Incoming"}
                  </Badge>
                </TableCell>
                <TableCell>{email.from} → {email.to}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {email.subject}
                    {email.attachments && email.attachments.length > 0 && (
                      <Paperclip size={14} className="text-gray-400" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleViewEmail(email)}
                      title="View Email"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {email.attachments && email.attachments.length > 0 && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        title="Download Attachments"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Email View Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedEmail?.subject}</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <div>
                <span className="font-semibold">From:</span> {selectedEmail?.from}
              </div>
              <div>
                <span className="font-semibold">Date:</span> {selectedEmail && formatDate(selectedEmail.date)}
              </div>
            </div>
            <div className="text-sm text-gray-500 mb-4">
              <span className="font-semibold">To:</span> {selectedEmail?.to}
            </div>
            
            <div className="border rounded-md p-4 whitespace-pre-line">
              {selectedEmail?.content}
            </div>
            
            {selectedEmail?.attachments && selectedEmail.attachments.length > 0 && (
              <div className="mt-4">
                <div className="font-semibold mb-2">Attachments:</div>
                <div className="space-y-2">
                  {selectedEmail.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      <Paperclip className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{attachment}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="ml-auto"
                        title="Download Attachment"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmailLog;
