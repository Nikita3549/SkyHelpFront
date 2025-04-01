
import React from "react";
import { Button } from "@/components/ui/button";

const SubmitButtonSection: React.FC = () => {
  const handleSubmit = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Form submission is handled by the parent component
  };

  return (
    <Button 
      type="submit" 
      className="w-full md:w-auto md:ml-auto md:block bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-md font-medium"
      onClick={handleSubmit}
    >
      Send your message
    </Button>
  );
};

export default SubmitButtonSection;
