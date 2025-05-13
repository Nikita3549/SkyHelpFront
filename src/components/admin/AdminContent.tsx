
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewClaimModal from "@/components/admin/NewClaimModal";
import EditClaimModal from "@/components/admin/EditClaimModal";
import { Claim } from "@/lib/supabase";
import DashboardTab from "@/components/admin/dashboard/DashboardTab";
import ClaimsTab from "@/components/admin/claims/ClaimsTab";
import CommunicationsTab from "@/components/admin/communications/CommunicationsTab";

type AdminContentProps = {
  claimsData: Claim[];
  isNewClaimModalOpen: boolean;
  setIsNewClaimModalOpen: (value: boolean) => void;
  isEditClaimModalOpen: boolean;
  setIsEditClaimModalOpen: (value: boolean) => void;
  selectedClaimForEdit: Claim | null;
  handleSendEmail: (claimId: string) => void;
  handleUpdateStatus: (claimId: string, newStatus: string) => void;
  handleExportClaims: () => void;
  handleNewClaimSubmit: (claimData: any) => void;
  handleEditClaim: (claim: Claim) => void;
  handleEditClaimSubmit: (claimData: Partial<Claim>) => void;
};

const AdminContent = ({
  claimsData,
  isNewClaimModalOpen,
  setIsNewClaimModalOpen,
  isEditClaimModalOpen,
  setIsEditClaimModalOpen,
  selectedClaimForEdit,
  handleSendEmail,
  handleUpdateStatus,
  handleExportClaims,
  handleNewClaimSubmit,
  handleEditClaim,
  handleEditClaimSubmit,
}: AdminContentProps) => {
  return (
    <div className="py-12 md:py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage and process flight compensation claims
          </p>
        </motion.div>

        <Tabs defaultValue="dashboard">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="claims">Claims Management</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab />
          </TabsContent>

          <TabsContent value="claims">
            <ClaimsTab 
              claimsData={claimsData}
              handleSendEmail={handleSendEmail}
              handleUpdateStatus={handleUpdateStatus}
              handleExportClaims={handleExportClaims}
              setIsNewClaimModalOpen={setIsNewClaimModalOpen}
              onEditClaim={handleEditClaim}
            />
          </TabsContent>

          <TabsContent value="communications">
            <CommunicationsTab />
          </TabsContent>
        </Tabs>
      </div>
      
      {isNewClaimModalOpen && (
        <NewClaimModal
          isOpen={isNewClaimModalOpen}
          onClose={() => setIsNewClaimModalOpen(false)}
          onSubmit={handleNewClaimSubmit}
        />
      )}

      {isEditClaimModalOpen && selectedClaimForEdit && (
        <EditClaimModal
          isOpen={isEditClaimModalOpen}
          onClose={() => setIsEditClaimModalOpen(false)}
          onSubmit={handleEditClaimSubmit}
          claim={selectedClaimForEdit}
        />
      )}
    </div>
  );
};

export default AdminContent;
