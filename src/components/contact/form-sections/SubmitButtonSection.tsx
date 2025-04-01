
import React from "react";
import { Button } from "@/components/ui/button";

const SubmitButtonSection: React.FC = () => {
  return (
    <Button 
      type="submit" 
      className="w-full md:w-auto md:ml-auto md:block bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-md font-medium"
    >
      Send your message
    </Button>
  );
};

export default SubmitButtonSection;
