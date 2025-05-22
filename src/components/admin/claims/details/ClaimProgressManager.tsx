
import React, { useState } from "react";
import { Check, Edit, Calendar, Save, X, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Claim } from "@/lib/supabase";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export type ClaimStep = {
  id: string;
  title: string;
  description: string;
  date: string | null;
  completed: boolean;
};

type ClaimProgressManagerProps = {
  claim: Claim;
  onUpdateProgress: (steps: ClaimStep[]) => void;
};

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
          <div className="space-y-0">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Connecting line between timeline points */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-3.5 top-7 h-full w-0.5",
                      step.completed
                        ? "bg-primary"
                        : "bg-gray-200"
                    )}
                  />
                )}

                <div className="relative flex items-start pt-2 pb-5">
                  {/* Timeline icon/checkbox */}
                  <button
                    onClick={() => handleToggleComplete(step.id)}
                    className={cn(
                      "z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                      step.completed
                        ? "bg-primary border-primary text-white"
                        : "bg-white border-gray-300 text-gray-400"
                    )}
                    aria-label={step.completed ? "Mark as incomplete" : "Mark as complete"}
                  >
                    {step.completed && <Check className="h-4 w-4" />}
                  </button>

                  {/* Timeline content */}
                  <div className="ml-4 flex-1">
                    <div className="flex items-center gap-2">
                      {editingStep === step.id && editingField === "title" ? (
                        <div className="flex items-center gap-2">
                          <Input
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="h-8"
                            autoFocus
                          />
                          <Button size="sm" variant="ghost" onClick={handleSaveEdit}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <h4
                            className={cn(
                              "font-medium",
                              step.completed ? "text-gray-900" : "text-gray-500"
                            )}
                          >
                            {step.title}
                          </h4>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditStep(step, "title")}
                            className="h-6 w-6 p-0"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </>
                      )}
                    </div>

                    {editingStep === step.id && editingField === "description" ? (
                      <div className="flex items-center gap-2 mt-1">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="h-8"
                          autoFocus
                        />
                        <Button size="sm" variant="ghost" onClick={handleSaveEdit}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditStep(step, "description")}
                          className="h-6 w-6 p-0 mt-1"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    )}

                    <div className="mt-1 flex items-center gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className={cn(
                              "h-7 px-2 text-xs",
                              !step.date && "text-gray-400"
                            )}
                          >
                            <Calendar className="mr-2 h-3 w-3" />
                            {step.date ? format(new Date(step.date), "MMM dd, yyyy") : "Set date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={step.date ? new Date(step.date) : undefined}
                            onSelect={(date) => handleDateChange(step.id, date)}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      
                      {step.date && (
                        <span className="text-xs text-gray-400">
                          {format(new Date(step.date), "MMM dd, yyyy")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ClaimProgressManager;
