
import React from "react";
import { Link } from "react-router-dom";

const DesktopActions: React.FC = () => {
  return (
    <div className="hidden md:flex items-center space-x-4">
      <Link
        to="/dashboard"
        className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
      >
        My Claims
      </Link>
      <Link
        to="/claim"
        className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-blue-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Start Your Claim
      </Link>
    </div>
  );
};

export default DesktopActions;
