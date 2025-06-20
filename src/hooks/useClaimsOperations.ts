import { useState } from 'react';
import { toast } from 'sonner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { claimsService } from '@/services/claimsService';
import { Claim } from '@/lib/supabase';
import { MessageEntry } from '@/types/claims';
import { useCommunication } from './useCommunication';
import { useStatusManagement } from './useStatusManagement';
import { useClaimExport } from './useClaimExport';

export function useClaimsOperations() {
  const [isNewClaimModalOpen, setIsNewClaimModalOpen] = useState(false);
  const [isEditClaimModalOpen, setIsEditClaimModalOpen] = useState(false);
  const [selectedClaimForEdit, setSelectedClaimForEdit] =
    useState<Claim | null>(null);

  const queryClient = useQueryClient();

  // const {
  //   data: claimsData = [],
  //   isLoading,
  //   error,
  // } = useQuery(
  //     {
  //   queryKey: ['claims'],
  //   queryFn: claimsService.getClaims,
  // }
  // );

  const isLoading = false;
  const error = false;
  const claimsData: Claim[] = [
    {
      id: 'CLM582394',
      customer: 'John Doe',
      email: 'john.doe@example.com',
      airline: 'Lufthansa',
      flightnumber: 'LH2034',
      date: '2025-05-14',
      status: 'in_progress',
      stage: 'Awaiting airline response',
      amount: '400',
      lastupdated: '2025-06-18T14:30:00Z',
      created_at: '2025-05-15T09:12:00Z',
      phone: '+491234567890',
      address: 'Bismarckstraße 10, 60325 Frankfurt, Germany',
      numberofpassengers: '2',
      departureairport: 'Frankfurt Airport (FRA)',
      arrivalairport: 'Barcelona El Prat (BCN)',
      flightissue: 'Delayed arrival over 3 hours',
      reasongivenbyairline: 'Operational reasons',
      additionalinformation:
        'Flight was initially scheduled at 10:00 but departed at 13:30.',
      paymentmethod: 'Bank transfer',
      paymentdetails: {
        accountName: 'John Doe',
        iban: 'DE89370400440532013000',
        bankName: 'Deutsche Bank',
      },
      communicationlog:
        '2025-05-20: Email sent to airline\n2025-06-01: Follow-up call',
      progressSteps: 'Claim submitted → Under review → Sent to airline',
    },
  ];

  const { handleExportClaims } = useClaimExport();
  const { handleUpdateStatus } = useStatusManagement();
  const { handleSendEmail, addMessageToCommunicationLog } = useCommunication();

  const createClaimMutation = useMutation({
    // mutationFn: (claimData: Omit<Claim, 'created_at'>) =>
    //   claimsService.createClaim(claimData),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['claims'] });
    // },
    // onError: (error) => {
    //   toast.error('Failed to create claim', {
    //     description:
    //       error instanceof Error ? error.message : 'An unknown error occurred',
    //   });
    // },
  });

  const updateClaimMutation = useMutation({
    // mutationFn: ({
    //   claimId,
    //   updates,
    // }: {
    //   claimId: string;
    //   updates: Partial<Claim>;
    // }) => claimsService.updateClaim(claimId, updates),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ['claims'] });
    // },
    // onError: (error) => {
    //   toast.error('Failed to update claim', {
    //     description:
    //       error instanceof Error ? error.message : 'An unknown error occurred',
    //   });
    // },
  });

  const handleNewClaimSubmit = (claimData: any) => {
    createClaimMutation.mutate(claimData);

    toast.success('New claim created', {
      description: `Claim ${claimData.id} has been created successfully`,
    });
  };

  const handleEditClaim = (claim: Claim) => {
    setSelectedClaimForEdit(claim);
    setIsEditClaimModalOpen(true);
  };

  const handleEditClaimSubmit = (claimData: Partial<Claim>) => {
    if (!claimData.id) return;

    updateClaimMutation
      .mutate
      // {
      // claimId: claimData.id,
      // updates: claimData,
      // }
      ();

    toast.success('Claim updated', {
      description: `Claim ${claimData.id} has been updated successfully`,
    });
  };

  // Wrapped versions of imported functions that include necessary context
  const wrappedHandleUpdateStatus = (
    claimId: string,
    newStatus: string,
    reason?: string,
    emailData?: any,
  ) => {
    return handleUpdateStatus(
      claimId,
      newStatus,
      reason,
      emailData,
      claimsData,
    );
  };

  const wrappedAddMessageToCommunicationLog = (
    claimId: string,
    message: MessageEntry,
  ) => {
    return addMessageToCommunicationLog(claimId, message, claimsData);
  };

  const wrappedHandleExportClaims = () => {
    return handleExportClaims(claimsData);
  };

  return {
    claimsData,
    isLoading,
    error,
    isNewClaimModalOpen,
    setIsNewClaimModalOpen,
    isEditClaimModalOpen,
    setIsEditClaimModalOpen,
    selectedClaimForEdit,
    handleSendEmail,
    handleUpdateStatus: wrappedHandleUpdateStatus,
    handleExportClaims: wrappedHandleExportClaims,
    handleNewClaimSubmit,
    handleEditClaim,
    handleEditClaimSubmit,
    addMessageToCommunicationLog: wrappedAddMessageToCommunicationLog,
  };
}

// Exporting type for backwards compatibility
export type { MessageEntry } from '@/types/claims';
