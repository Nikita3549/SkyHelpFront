
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Download,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import MessageWritingZone from "./MessageWritingZone";
import OverviewTab from "./OverviewTab";
import DocumentsTab from "./DocumentsTab";
import MessagesTab from "./MessagesTab";

interface Claim {
  id: string;
  airline: string;
  flightNumber: string;
  departureDate: string;
  route: string;
  status: string;
  statusText: string;
  compensation: string;
  progress: number;
  lastUpdate: string;
  estimatedCompletion?: string;
  paymentDate?: string;
  documents: Array<{ name: string; status: string }>;
  messages: Array<{ date: string; content: string; isFromTeam: boolean }>;
}

interface ClaimDetailsProps {
  claim: Claim;
  messageText: string;
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
  onContactSupport: () => void;
  onUploadDocument: () => void;
  onGenerateNewMessage: () => void;
}

const ClaimDetails = ({
  claim,
  messageText,
  onMessageChange,
  onSendMessage,
  onContactSupport,
  onUploadDocument,
  onGenerateNewMessage,
}: ClaimDetailsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-2"
    >
      <Card className="shadow-md h-full">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center">
                Claim {claim.id}
                <StatusBadge status={claim.status} className="ml-3" />
              </CardTitle>
              <CardDescription className="mt-1">
                {claim.airline} · {claim.flightNumber} · {new Date(claim.departureDate).toLocaleDateString()}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Download className="mr-2 h-4 w-4" /> Export claim details
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={onContactSupport}>
                  <MessageSquare className="mr-2 h-4 w-4" /> Contact support
                </DropdownMenuItem>
                {claim.status !== "completed" && (
                  <DropdownMenuItem className="cursor-pointer text-destructive">
                    <AlertCircle className="mr-2 h-4 w-4" /> Cancel claim
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs defaultValue="overview">
            <TabsList className="mx-6 mb-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="px-6 pt-2 pb-6">
              <OverviewTab
                claim={claim}
                onUploadDocument={onUploadDocument}
                onContactSupport={onContactSupport}
              />
            </TabsContent>
            
            <TabsContent value="documents" className="p-6 pt-2">
              <DocumentsTab
                documents={claim.documents}
                onUploadDocument={onUploadDocument}
              />
            </TabsContent>
            
            <TabsContent value="messages" className="p-6 pt-2">
              <MessagesTab
                messages={claim.messages}
                onGenerateNewMessage={onGenerateNewMessage}
              />
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex flex-col border-t p-6 space-y-4">
          <MessageWritingZone
            messageText={messageText}
            onMessageChange={onMessageChange}
            onSendMessage={onSendMessage}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ClaimDetails;
