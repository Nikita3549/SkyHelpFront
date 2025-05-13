
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import type { User } from "@/pages/UserManagement";

interface UserProfileSectionProps {
  user: User;
  onUserUpdate: () => void;
}

const UserProfileSection = ({ user, onUserUpdate }: UserProfileSectionProps) => {
  const [name, setName] = useState(user.user_metadata.name || "");
  const [email, setEmail] = useState(user.email);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = async () => {
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Validation Error",
        description: "Name and email are required.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);

    try {
      // Update user metadata
      const { error } = await supabase.auth.admin.updateUserById(user.id, {
        email,
        user_metadata: {
          ...user.user_metadata,
          name
        }
      });

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "User information has been updated successfully.",
      });
      
      onUserUpdate();
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
        </div>
        
        <div className="pt-4">
          <Button 
            onClick={handleUpdateProfile} 
            disabled={isUpdating}
            className="w-full md:w-auto"
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileSection;
