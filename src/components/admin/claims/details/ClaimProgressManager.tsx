import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Claim } from '@/lib/supabase';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import Timeline from './progress/Timeline';
import { ClaimStep } from './progress/types';
import api from '@/api/axios.ts';

export type { ClaimStep };

type ClaimProgressManagerProps = {
  claim: Claim;
  onUpdateProgress: (steps: ClaimStep[]) => void;
};

const ClaimProgressManager: React.FC<ClaimProgressManagerProps> = ({
  claim,
}) => {
  // Initialize steps from claim or use defaults

  const progress = (claim as any).progresses.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    date: p.endAt,
    completed: p.status == 'COMPLETED',
  }));
  // const initialSteps = React.useMemo(() => {
  //   try {
  //     if (claim.progressSteps) {
  //       return JSON.parse(claim.progressSteps as string) as ClaimStep[];
  //     }
  //   } catch (e) {
  //     console.error('Error parsing progress steps', e);
  //   }
  //   return progress;
  // }, [claim]);

  const onUpdateProgress = async (stepId: string, steps: ClaimStep[]) => {
    const step = steps.find((s) => s.id == stepId);

    await api.put(`/claims/progress/${stepId}/`, {
      title: step.title,
      description: step.description,
      endAt: step.date,
      status: step.completed ? 'COMPLETED' : 'IN_PROCESS',
    });
  };

  const [steps, setSteps] = useState<ClaimStep[]>(progress);
  const [editingStep, setEditingStep] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<
    'title' | 'description' | null
  >(null);
  const [editValue, setEditValue] = useState('');
  const [isOpen, setIsOpen] = useState(true); // Changed to true so it's expanded by default

  const handleToggleComplete = (stepId: string) => {
    const updatedSteps = steps.map((step) => {
      if (step.id === stepId) {
        const completed = !step.completed;
        return {
          ...step,
          completed,
          date: new Date().toISOString(),
        };
      }
      return step;
    });
    setSteps(updatedSteps);
    onUpdateProgress(stepId, updatedSteps);
  };

  const handleEditStep = (step: ClaimStep, field: 'title' | 'description') => {
    setEditingStep(step.id);
    setEditingField(field);
    setEditValue(step[field]);
  };

  const handleSaveEdit = () => {
    if (!editingStep || !editingField) return;

    const updatedSteps = steps.map((step) => {
      if (step.id === editingStep) {
        return {
          ...step,
          [editingField]: editValue,
        };
      }
      return step;
    });

    setSteps(updatedSteps);
    setEditingStep(null);
    setEditingField(null);
    setEditValue('');
    onUpdateProgress(editingStep, updatedSteps);
  };

  const handleCancelEdit = () => {
    setEditingStep(null);
    setEditingField(null);
    setEditValue('');
  };

  const handleDateChange = (stepId: string, date: Date | undefined) => {
    const updatedSteps = steps.map((step) => {
      if (step.id === stepId) {
        return {
          ...step,
          date: date.toISOString(),
        };
      }
      return step;
    });
    setSteps(updatedSteps);
    onUpdateProgress(stepId, updatedSteps);
  };

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex justify-between items-center w-full p-6 text-left">
          <h3 className="text-lg font-semibold">Claim Progress Management</h3>
          <ChevronDown
            className={cn(
              'h-5 w-5 transition-transform duration-200',
              isOpen && 'transform rotate-180',
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-6 pb-6">
          <Timeline
            steps={steps}
            editingStep={editingStep}
            editingField={editingField}
            editValue={editValue}
            setEditValue={setEditValue}
            onToggleComplete={handleToggleComplete}
            onEditStep={handleEditStep}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
            onDateChange={handleDateChange}
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ClaimProgressManager;
