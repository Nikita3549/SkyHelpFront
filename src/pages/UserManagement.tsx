
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import UsersList from "@/components/user-management/UsersList";
import UserDetailsModal from "@/components/user-management/UserDetailsModal";
import LoadingSpinner from "@/components/user-management/LoadingSpinner";

export type User = {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  user_metadata: {
    name?: string;
    avatar_url?: string;
  };
  role?: string;
  status: "ACTIVE" | "INACTIVE" | "INVITED";
};

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: authUsers, error: fetchError } = await supabase.auth.admin.listUsers();
      
      if (fetchError) {
        throw fetchError;
      }

      if (authUsers) {
        // Transform the Supabase user data to our User type
        const transformedUsers: User[] = authUsers.users.map(user => {
          // Determine the status based on banned state, ensuring it's one of the allowed values
          let status: "ACTIVE" | "INACTIVE" | "INVITED" = "ACTIVE";
          if (user.banned) {
            status = "INACTIVE";
          }
          // You could add additional logic here to determine if the user is "INVITED"
          
          return {
            id: user.id,
            email: user.email || "No email",
            created_at: user.created_at,
            last_sign_in_at: user.last_sign_in_at,
            user_metadata: user.user_metadata || {},
            role: "user", // Default role, you might want to fetch actual roles from another table
            status: status
          };
        });
        
        setUsers(transformedUsers);
      } else {
        setUsers([]);
      }
    } catch (err: any) {
      console.error("Error fetching users:", err);
      setError(err.message || "Failed to fetch users. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to load users. You might not have sufficient permissions.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (user.user_metadata.name && 
                          user.user_metadata.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = filterRole === "all" || user.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

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
            View, edit and manage user accounts and permissions
          </p>
        </motion.div>

        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={fetchUsers}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            >
              Try Again
            </button>
          </div>
        ) : (
          <UsersList 
            users={filteredUsers} 
            onUserSelect={handleUserSelect} 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterRole={filterRole}
            onFilterChange={setFilterRole}
          />
        )}
      </div>

      {selectedUser && (
        <UserDetailsModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={selectedUser}
          onUserUpdate={fetchUsers}
        />
      )}
    </div>
  );
};

export default UserManagement;
