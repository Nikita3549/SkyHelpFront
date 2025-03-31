
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isDisabled: boolean;
  onSubmit: () => void;
}

const SubmitButton = ({ isDisabled, onSubmit }: SubmitButtonProps) => {
  return (
    <div className="flex justify-end">
      <Button
        type="button"
        disabled={isDisabled}
        onClick={onSubmit}
        className="flex items-center gap-2 px-6"
      >
        Send File <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SubmitButton;
