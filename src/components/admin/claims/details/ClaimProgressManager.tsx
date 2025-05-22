
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Claim } from "@/lib/supabase";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import Timeline from "./progress/Timeline";
import { ClaimStep } from "./progress/types";

export type { ClaimStep };

const DEFAULT_CLAIM_STEPS: ClaimStep[] = [
  {
    id: "step1",
    title: "Claim Received",
    description: "Claim has been submitted and received",
    date: null,
    completed: false,
  },
  {
    id: "step2",
    title: "Documents Verified",
    description: "All required documents have been verified",
    date: null,
    completed: false,
  },
  {
    id: "step3",
    title: "Airline Contacted",
    description: "Airline has been contacted regarding the claim",
    date: null,
    completed: false,
  },
  {
    id: "step4",
    title: "Awaiting Response",
    description: "Waiting for airline's final response",
    date: null,
    completed: false,
  },
  {
    id: "step5",
    title: "Compensation Pending",
    description: "Compensation has been approved and is pending payment",
    date: null,
    completed: false,
  },
  {
    id: "step6",
    title: "Claim Completed",
    description: "Compensation has been paid",
    date: null,
    completed: false,
  },
];

type ClaimProgressManagerProps = {
  claim: Claim;
  onUpdateProgress: (steps: ClaimStep[]) => void;
};

const ClaimProgressManager: React.FC<ClaimProgressManagerProps> = ({ claim, onUpdateProgress }) => {
  // Initialize steps from claim or use defaults
  const initialSteps = React.useMemo(() => {
    try {
      if (claim.progressSteps) {
        return JSON.parse(claim.progressSteps as string) as ClaimStep[];
      }
    } catch (e) {
      console.error("Error parsing progress steps", e);
    }
    return DEFAULT_CLAIM_STEPS;
  }, [claim]);

  const [steps, setSteps] = useState<ClaimStep[]>(initialSteps);
  const [editingStep, setEditingStep] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<"title" | "description" | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleComplete = (stepId: string) => {
    const updatedSteps = steps.map(step => {
      if (step.id === stepId) {
        const completed = !step.completed;
        return {
          ...step,
          completed,
          date: completed && !step.date ? new Date().toISOString().split("T")[0] : step.date,
        };
      }
      return step;
    });
    setSteps(updatedSteps);
    onUpdateProgress(updatedSteps);
  };

  const handleEditStep = (step: ClaimStep, field: "title" | "description") => {
    setEditingStep(step.id);
    setEditingField(field);
    setEditValue(step[field]);
  };

  const handleSaveEdit = () => {
    if (!editingStep || !editingField) return;

    const updatedSteps = steps.map(step => {
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
    setEditValue("");
    onUpdateProgress(updatedSteps);
  };

  const handleCancelEdit = () => {
    setEditingStep(null);
    setEditingField(null);
    setEditValue("");
  };

  const handleDateChange = (stepId: string, date: Date | undefined) => {
    const updatedSteps = steps.map(step => {
      if (step.id === stepId) {
        return {
          ...step,
          date: date ? format(date, "yyyy-MM-dd") : null,
        };
      }
      return step;
    });
    setSteps(updatedSteps);
    onUpdateProgress(updatedSteps);
  };

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex justify-between items-center w-full p-6 text-left">
          <h3 className="text-lg font-semibold">Claim Progress Management</h3>
          <ChevronDown className={cn(
            "h-5 w-5 transition-transform duration-200",
            isOpen && "transform rotate-180"
          )} />
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
