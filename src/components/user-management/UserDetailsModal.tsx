
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import UserProfileSection from "./UserProfileSection";
import UserRolesSection from "./UserRolesSection";
import UserActivitySection from "./UserActivitySection";
import UserClaimsSection from "./UserClaimsSection";
import type { User } from "@/pages/UserManagement";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUserUpdate: () => void;
}

const UserDetailsModal = ({ isOpen, onClose, user, onUserUpdate }: UserDetailsModalProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDeactivateUser = async () => {
    if (!confirm(`Are you sure you want to deactivate ${user.email}?`)) {
      return;
    }

    setIsUpdating(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "User Deactivated",
        description: `${user.email} has been deactivated successfully.`,
      });
      
      onUserUpdate();
      onClose();
    } catch (error: any) {
      console.error("Error deactivating user:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to deactivate user.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleReactivateUser = async () => {
    setIsUpdating(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "User Reactivated",
        description: `${user.email} has been reactivated successfully.`,
      });
      
      onUserUpdate();
      onClose();
    } catch (error: any) {
      console.error("Error reactivating user:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to reactivate user.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="profile" className="mt-4">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
            <TabsTrigger value="roles" className="flex-1">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="claims" className="flex-1">Claims</TabsTrigger>
            <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <UserProfileSection user={user} onUserUpdate={onUserUpdate} />
          </TabsContent>
          
          <TabsContent value="roles">
            <UserRolesSection user={user} onUserUpdate={onUserUpdate} />
          </TabsContent>
          
          <TabsContent value="claims">
            <UserClaimsSection userId={user.id} userEmail={user.email} />
          </TabsContent>
          
          <TabsContent value="activity">
            <UserActivitySection userId={user.id} />
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="mt-6 gap-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          {user.status === "ACTIVE" ? (
            <Button 
              variant="destructive" 
              onClick={handleDeactivateUser}
              disabled={isUpdating}
            >
              {isUpdating ? "Processing..." : "Deactivate User"}
            </Button>
          ) : (
            <Button 
              variant="default" 
              onClick={handleReactivateUser}
              disabled={isUpdating}
            >
              {isUpdating ? "Processing..." : "Reactivate User"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
