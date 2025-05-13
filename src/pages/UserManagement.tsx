
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import UsersList from "@/components/user-management/UsersList";
import UserRolesSection from "@/components/user-management/UserRolesSection";
import InviteUserForm from "@/components/user-management/InviteUserForm";
import LoadingState from "@/components/admin/LoadingState";
import ErrorState from "@/components/admin/ErrorState";
import { User } from "@/types/user";

const UserManagement = () => {
  const [selectedTab, setSelectedTab] = useState("users");

  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase.auth.admin.listUsers();
      if (error) throw error;
      
      // Transform Supabase users to our custom User type
      return data.users.map(user => ({
        id: user.id,
        email: user.email || '', // Ensure email is always a string
        role: user.user_metadata?.role || 'User',
        last_sign_in_at: user.last_sign_in_at,
        created_at: user.created_at
      })) as User[];
    },
  });

  const handleInviteUser = async (email: string) => {
    try {
      // This is a placeholder - in a real app you'd integrate with Supabase's invite functionality
      // or implement your own invite system
      toast.success("Invitation sent", {
        description: `An invitation has been sent to ${email}`,
      });
    } catch (error) {
      toast.error("Failed to send invitation", {
        description: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="py-12 md:py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-gray-600">
            Manage users, roles, and permissions for your application
          </p>
        </motion.div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="invitations">Invitations</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UsersList 
              users={users || []} 
              onRefresh={() => refetch()} 
            />
          </TabsContent>

          <TabsContent value="roles">
            <UserRolesSection users={users || []} />
          </TabsContent>

          <TabsContent value="invitations">
            <InviteUserForm onInvite={handleInviteUser} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserManagement;
