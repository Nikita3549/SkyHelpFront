
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Claim } from "@/lib/supabase";
import EmailComposer from "./communication/EmailComposer";
import EmailLog from "./communication/EmailLog";

type CommunicationTabProps = {
  claim: Claim;
}

const CommunicationTab = ({ claim }: CommunicationTabProps) => {
  return (
    <Card className="p-4">
      <Tabs defaultValue="compose" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="compose">Compose Email</TabsTrigger>
          <TabsTrigger value="log">Communication Log</TabsTrigger>
        </TabsList>
        
        <TabsContent value="compose" className="space-y-4">
          <EmailComposer claim={claim} />
        </TabsContent>
        
        <TabsContent value="log" className="space-y-4">
          <EmailLog claim={claim} />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default CommunicationTab;
