import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatusBadge from './StatusBadge';
import MessageWritingZone from './MessageWritingZone';
import OverviewTab from './OverviewTab';
import DocumentsTab from './DocumentsTab';
import MessagesTab from './MessagesTab';
import { IClaim } from '@/components/claim-form/interfaces/claims.interface.ts';

interface ClaimDetailsProps {
  claim: IClaim;
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
  const [activeTab, setActiveTab] = useState('overview');
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="lg:col-span-2"
    >
      <Card className="shadow-md h-full my-0 py-[15px]">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center">
                Claim #{claim.id}
                <StatusBadge status={claim.status} className="ml-3" />
              </CardTitle>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList className="mx-6 mb-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              {/*<TabsTrigger value="messages">Messages</TabsTrigger>*/}
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

            {/*<TabsContent value="messages" className="p-6 pt-2">*/}
            {/*  <MessagesTab*/}
            {/*    messages={claim.messages}*/}
            {/*    onGenerateNewMessage={onGenerateNewMessage}*/}
            {/*  />*/}
            {/*</TabsContent>*/}
          </Tabs>
        </CardContent>

        {activeTab === 'messages' && (
          <CardFooter className="flex flex-col border-t p-6 space-y-4">
            <MessageWritingZone
              messageText={messageText}
              onMessageChange={onMessageChange}
              onSendMessage={onSendMessage}
            />
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};
export default ClaimDetails;
