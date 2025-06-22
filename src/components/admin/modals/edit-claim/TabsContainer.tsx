import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Claim } from '@/lib/supabase';
import DetailsTab from './tabs/DetailsTab';
import CommunicationTab from '../../claims/details/CommunicationTab';
import ProgressTab from './tabs/ProgressTab';

type TabsContainerProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  claim: Claim;
  onSendEmail: () => void;
  onUpdateStatus: () => void;
  onEdit: () => void;
  onMarkNotEligible: () => void;
  onUpdateClaim?: (updates: Partial<Claim>) => void;
};

const TabsContainer = ({
  activeTab,
  setActiveTab,
  claim,
  onSendEmail,
  onUpdateStatus,
  onEdit,
  onMarkNotEligible,
  onUpdateClaim,
}: TabsContainerProps) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full mt-4"
    >
      <TabsList className="grid w-full grid-cols-4">
        {/*<TabsTrigger value="details">Claim Details</TabsTrigger>*/}
        {/*<TabsTrigger value="communication">Communication</TabsTrigger>*/}
        {/*<TabsTrigger value="progress">Progress</TabsTrigger>*/}
        {/*<TabsTrigger value="documents">Documents</TabsTrigger>*/}
      </TabsList>

      <TabsContent value="details" className="mt-6">
        <DetailsTab
          claim={claim}
          onSendEmail={onSendEmail}
          onUpdateStatus={onUpdateStatus}
          onEdit={onEdit}
          onMarkNotEligible={onMarkNotEligible}
          onUpdateClaim={onUpdateClaim}
        />
      </TabsContent>

      <TabsContent value="communication" className="mt-6">
        <CommunicationTab claim={claim} />
      </TabsContent>

      <TabsContent value="progress" className="mt-6">
        <ProgressTab claim={claim} onUpdateClaim={onUpdateClaim} />
      </TabsContent>

      <TabsContent value="documents" className="mt-6">
        <div className="p-4 text-center text-gray-500">
          Document management features will be added soon.
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default TabsContainer;
