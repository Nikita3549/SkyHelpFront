
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface AdminControlsProps {
  isAdmin: boolean;
}

const AdminControls: React.FC<AdminControlsProps> = ({ isAdmin }) => {
  if (!isAdmin) return null;

  // Get the Supabase project URL for storage
  const storageUrl = "https://supabase.com/dashboard/project/lyxhxlvshcsvoqdicqhm/storage/buckets";

  return (
    <div className="p-4 border-t border-gray-200">
      <h4 className="text-sm font-medium mb-2">Admin Controls</h4>
      <div className="flex items-center gap-4">
        <a 
          href={storageUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Manage Videos in Supabase
          </Button>
        </a>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Upload and manage company videos directly through the Supabase dashboard.
      </p>
    </div>
  );
};

export default AdminControls;
