
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import ClaimsTable from "@/components/admin/ClaimsTable";
import NewClaimModal from "@/components/admin/NewClaimModal";
import ViewClaimModal from "@/components/admin/ViewClaimModal";
import EditClaimModal from "@/components/admin/EditClaimModal";
import { Claim, useClaims } from "@/hooks/use-claims";

const AdminPanel = () => {
  const [isNewClaimModalOpen, setIsNewClaimModalOpen] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const { 
    claims, 
    isLoading,
    createClaim, 
    updateClaim, 
    deleteClaim,
    isCreating,
    isUpdating
  } = useClaims();

  const handleNewClaimSubmit = (claimData: Omit<Claim, 'id' | 'created_at' | 'last_updated' | 'status' | 'stage'>) => {
    createClaim(claimData);
    setIsNewClaimModalOpen(false);
  };

  const handleViewClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setIsViewModalOpen(true);
  };

  const handleEditClaim = (claim: Claim) => {
    setSelectedClaim(claim);
    setIsViewModalOpen(false);
    setIsEditModalOpen(true);
  };

  const handleUpdateClaim = (id: string, updates: Partial<Claim>) => {
    updateClaim({ id, ...updates });
    setIsEditModalOpen(false);
  };

  const handleDeleteClaim = (id: string) => {
    deleteClaim(id);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Управление заявками</h1>
          <p className="text-gray-500 mt-1">
            Управляйте заявками на компенсацию от клиентов
          </p>
        </div>
        <Button 
          onClick={() => setIsNewClaimModalOpen(true)}
          className="flex items-center"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Claim
        </Button>
      </div>

      <ClaimsTable
        claims={claims}
        isLoading={isLoading}
        onDelete={handleDeleteClaim}
        onEdit={handleEditClaim}
        onView={handleViewClaim}
      />

      {/* Модальные окна */}
      <NewClaimModal
        isOpen={isNewClaimModalOpen}
        onClose={() => setIsNewClaimModalOpen(false)}
        onSubmit={handleNewClaimSubmit}
        isSubmitting={isCreating}
      />

      <ViewClaimModal
        claim={selectedClaim}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        onEdit={handleEditClaim}
      />

      <EditClaimModal
        claim={selectedClaim}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateClaim}
        isSubmitting={isUpdating}
      />
    </div>
  );
};

export default AdminPanel;
