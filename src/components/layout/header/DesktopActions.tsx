
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "./LanguageSelector";

const DesktopActions = () => {
  const navigate = useNavigate();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <LanguageSelector />
      <Button 
        variant="outline" 
        onClick={() => navigate("/dashboard")}
        className="border-primary text-primary hover:bg-primary hover:text-white"
      >
        My Claims
      </Button>
    </div>
  );
};

export default DesktopActions;
