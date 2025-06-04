import React, { useState } from 'react';
import { Check, Edit, Calendar, Save, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { ClaimStep } from './types';

type TimelineStepProps = {
  step: ClaimStep;
  index: number;
  totalSteps: number;
  onToggleComplete: (stepId: string) => void;
  onEditStep: (step: ClaimStep, field: 'title' | 'description') => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onDateChange: (stepId: string, date: Date | undefined) => void;
  editingStep: string | null;
  editingField: 'title' | 'description' | null;
  editValue: string;
  setEditValue: (value: string) => void;
};

const TimelineStep: React.FC<TimelineStepProps> = ({
  step,
  index,
  totalSteps,
  onToggleComplete,
  onEditStep,
  onSaveEdit,
  onCancelEdit,
  onDateChange,
  editingStep,
  editingField,
  editValue,
  setEditValue,
}) => {
  return (
    <div key={step.id} className="relative">
      {/* Connecting line between timeline points */}
      {index < totalSteps - 1 && (
        <div
          className={cn(
            'absolute left-3.5 top-7 h-full w-0.5',
            step.completed ? 'bg-primary' : 'bg-gray-200',
          )}
        />
      )}

      <div className="relative flex items-start pt-2 pb-5">
        {/* Timeline icon/checkbox */}
        <button
          onClick={() => onToggleComplete(step.id)}
          className={cn(
            'z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
            step.completed
              ? 'bg-primary border-primary text-white'
              : 'bg-white border-gray-300 text-gray-400',
          )}
          aria-label={
            step.completed ? 'Mark as incomplete' : 'Mark as complete'
          }
        >
          {step.completed && <Check className="h-4 w-4" />}
        </button>

        {/* Timeline content */}
        <div className="ml-4 flex-1">
          <div className="flex items-center gap-2">
            {editingStep === step.id && editingField === 'title' ? (
              <div className="flex items-center gap-2">
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="h-8"
                  autoFocus
                />
                <Button size="sm" variant="ghost" onClick={onSaveEdit}>
                  <Save className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={onCancelEdit}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <h4
                  className={cn(
                    'font-medium',
                    step.completed ? 'text-gray-900' : 'text-gray-500',
                  )}
                >
                  {step.title}
                </h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onEditStep(step, 'title')}
                  className="h-6 w-6 p-0"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>

          {editingStep === step.id && editingField === 'description' ? (
            <div className="flex items-center gap-2 mt-1">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="h-8"
                autoFocus
              />
              <Button size="sm" variant="ghost" onClick={onSaveEdit}>
                <Save className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={onCancelEdit}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <p className="mt-1 text-sm text-gray-600">{step.description}</p>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEditStep(step, 'description')}
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
                    'h-7 px-2 text-xs',
                    !step.date && 'text-gray-400',
                  )}
                >
                  <Calendar className="mr-2 h-3 w-3" />
                  {step.date
                    ? format(new Date(step.date), 'MMM dd, yyyy')
                    : 'Set date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={step.date ? new Date(step.date) : undefined}
                  onSelect={(date) => onDateChange(step.id, date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {step.date && (
              <span className="text-xs text-gray-400">
                {format(new Date(step.date), 'MMM dd, yyyy')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineStep;
