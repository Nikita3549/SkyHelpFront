import { useState } from 'react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { claimsService } from '@/services/claimsService';
import { Claim } from '@/lib/supabase';
import { MessageEntry } from '@/types/claims';

export function useCommunication() {
  const queryClient = useQueryClient();

  const updateClaimMutation = useMutation({
    mutationFn: ({
      claimId,
      updates,
    }: {
      claimId: string;
      updates: Partial<Claim>;
    }) => claimsService.updateClaim(claimId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
    },
    onError: (error) => {
      toast.error('Failed to update claim', {
        description:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
    },
  });

  const handleSendEmail = (claimId: string) => {
    toast.success('Email sent successfully', {
      description: `Notification email sent for claim ${claimId}`,
    });
  };

  // Function to handle.svg adding messages to the communication log
  const addMessageToCommunicationLog = (
    claimId: string,
    message: MessageEntry,
    claims: Claim[],
  ) => {
    // Find the claim
    const claim = claims.find((c) => c.id === claimId);
    if (!claim) {
      toast.error('Claim not found');
      return;
    }

    // Parse existing communication log or create new one
    let communicationLog = [];
    try {
      if (claim.communicationlog) {
        communicationLog = JSON.parse(claim.communicationlog);
      }
    } catch (e) {
      console.error('Error parsing communication log', e);
    }

    // Add new message to log
    communicationLog.push(message);

    // Update the claim with the new log
    const updates: Partial<Claim> = {
      communicationlog: JSON.stringify(communicationLog),
      lastupdated: new Date().toISOString().split('T')[0],
    };

    updateClaimMutation.mutate({
      claimId,
      updates,
    });

    toast.success('Message added', {
      description: 'Communication log has been updated',
    });
  };

  return {
    handleSendEmail,
    addMessageToCommunicationLog,
    updateClaimMutation,
  };
}
