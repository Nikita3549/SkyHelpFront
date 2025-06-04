import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import UsersList from '@/components/user-management/UsersList';
import UserDetailsModal from '@/components/user-management/UserDetailsModal';
import LoadingSpinner from '@/components/user-management/LoadingSpinner';

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
  status: 'ACTIVE' | 'INACTIVE' | 'INVITED';
};

// Mock data to use instead of Supabase
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    created_at: '2023-01-15T10:30:00Z',
    last_sign_in_at: '2023-05-20T14:45:00Z',
    user_metadata: {
      name: 'John Doe',
      avatar_url: null,
    },
    role: 'admin',
    status: 'ACTIVE',
  },
  {
    id: '2',
    email: 'sarah.smith@example.com',
    created_at: '2023-02-10T09:15:00Z',
    last_sign_in_at: '2023-05-19T11:20:00Z',
    user_metadata: {
      name: 'Sarah Smith',
      avatar_url: null,
    },
    role: 'moderator',
    status: 'ACTIVE',
  },
  {
    id: '3',
    email: 'michael.brown@example.com',
    created_at: '2023-03-05T16:45:00Z',
    last_sign_in_at: '2023-05-15T08:30:00Z',
    user_metadata: {
      name: 'Michael Brown',
      avatar_url: null,
    },
    role: 'user',
    status: 'ACTIVE',
  },
  {
    id: '4',
    email: 'emma.wilson@example.com',
    created_at: '2023-03-20T13:10:00Z',
    last_sign_in_at: null,
    user_metadata: {
      name: 'Emma Wilson',
      avatar_url: null,
    },
    role: 'user',
    status: 'INVITED',
  },
  {
    id: '5',
    email: 'james.taylor@example.com',
    created_at: '2023-04-12T11:25:00Z',
    last_sign_in_at: '2023-04-30T16:15:00Z',
    user_metadata: {
      name: 'James Taylor',
      avatar_url: null,
    },
    role: 'user',
    status: 'INACTIVE',
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setUsers(mockUsers);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError('Failed to fetch users. Please try again later.');
      toast({
        title: 'Error',
        description: 'Failed to load users.',
        variant: 'destructive',
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

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.user_metadata.name &&
        user.user_metadata.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    const matchesRole = filterRole === 'all' || user.role === filterRole;

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
