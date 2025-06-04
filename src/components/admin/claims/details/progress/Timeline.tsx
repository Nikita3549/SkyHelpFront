import React from 'react';
import TimelineStep from './TimelineStep';
import { ClaimStep } from './types';

type TimelineProps = {
  steps: ClaimStep[];
  editingStep: string | null;
  editingField: 'title' | 'description' | null;
  editValue: string;
  setEditValue: (value: string) => void;
  onToggleComplete: (stepId: string) => void;
  onEditStep: (step: ClaimStep, field: 'title' | 'description') => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDateChange: (stepId: string, date: Date | undefined) => void;
};

const Timeline: React.FC<TimelineProps> = ({
  steps,
  editingStep,
  editingField,
  editValue,
  setEditValue,
  onToggleComplete,
  onEditStep,
  onSaveEdit,
  onCancelEdit,
  onDateChange,
}) => {
  return (
    <div className="space-y-0">
      {steps.map((step, index) => (
        <TimelineStep
          key={step.id}
          step={step}
          index={index}
          totalSteps={steps.length}
          onToggleComplete={onToggleComplete}
          onEditStep={onEditStep}
          onSaveEdit={onSaveEdit}
          onCancelEdit={onCancelEdit}
          onDateChange={onDateChange}
          editingStep={editingStep}
          editingField={editingField}
          editValue={editValue}
          setEditValue={setEditValue}
        />
      ))}
    </div>
  );
};

export default Timeline;
