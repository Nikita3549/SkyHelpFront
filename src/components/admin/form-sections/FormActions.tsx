import React from 'react';
import { Button } from '@/components/ui/button';

type FormActionsProps = {
  onCancel: () => void;
};

const FormActions = ({ onCancel }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-2 pt-4">
      <Button variant="outline" type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">Create Claim</Button>
    </div>
  );
};

export default FormActions;
