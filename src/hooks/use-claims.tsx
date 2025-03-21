
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export type Claim = {
  id: string;
  customer: string;
  email: string;
  airline: string;
  flight_number: string;
  departure_date: string;
  status: 'pending' | 'in_progress' | 'approved' | 'rejected';
  stage: 'initial_review' | 'documentation' | 'airline_submission' | 'negotiation' | 'payment';
  amount: string;
  last_updated: string;
  disruption_type: string;
  departure_airport: string;
  arrival_airport: string;
  notes?: string;
};

export const useClaims = () => {
  const queryClient = useQueryClient();

  // Загрузить все заявки
  const { data: claims, isLoading, error } = useQuery({
    queryKey: ['claims'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('claims')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }
      
      return data as Claim[];
    },
  });

  // Создать новую заявку
  const createClaimMutation = useMutation({
    mutationFn: async (newClaim: Omit<Claim, 'id' | 'created_at' | 'last_updated'>) => {
      const { data, error } = await supabase
        .from('claims')
        .insert({
          ...newClaim,
          status: 'pending',
          stage: 'initial_review',
          last_updated: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as Claim;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
      toast.success('Заявка успешно создана');
    },
    onError: (error) => {
      toast.error(`Ошибка при создании заявки: ${error.message}`);
    },
  });

  // Обновить существующую заявку
  const updateClaimMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Claim> & { id: string }) => {
      const { data, error } = await supabase
        .from('claims')
        .update({ ...updates, last_updated: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as Claim;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
      toast.success('Заявка успешно обновлена');
    },
    onError: (error) => {
      toast.error(`Ошибка при обновлении заявки: ${error.message}`);
    },
  });

  // Удалить заявку
  const deleteClaimMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('claims')
        .delete()
        .eq('id', id);

      if (error) throw new Error(error.message);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
      toast.success('Заявка успешно удалена');
    },
    onError: (error) => {
      toast.error(`Ошибка при удалении заявки: ${error.message}`);
    },
  });

  return {
    claims,
    isLoading,
    error,
    createClaim: createClaimMutation.mutate,
    updateClaim: updateClaimMutation.mutate,
    deleteClaim: deleteClaimMutation.mutate,
    isCreating: createClaimMutation.isPending,
    isUpdating: updateClaimMutation.isPending,
    isDeleting: deleteClaimMutation.isPending,
  };
};
