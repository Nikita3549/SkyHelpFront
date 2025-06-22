import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, UserPlus, Edit2, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { User } from '@/pages/UserManagement';

interface UsersListProps {
  users: User[];
  onUserSelect: (user: User) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterRole: string;
  onFilterChange: (value: string) => void;
}

const UsersList = ({
  users,
  onUserSelect,
  searchTerm,
  onSearchChange,
  filterRole,
  onFilterChange,
}: UsersListProps) => {
  const getRoleBadgeColor = (role: string | undefined) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800';
      case 'MODERATOR':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-red-100 text-red-800';
      case 'INVITED':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-lg shadow overflow-hidden"
    >
      <div className="p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 w-full"
          />
        </div>

        <div className="flex items-center space-x-4 w-full md:w-auto">
          <Select value={filterRole} onValueChange={onFilterChange}>
            <SelectTrigger className="w-full md:w-36">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="MODERATOR">Moderator</SelectItem>
              <SelectItem value="CLIENT">Client</SelectItem>
            </SelectContent>
          </Select>

          {/*<Button className="flex items-center space-x-2">*/}
          {/*  <UserPlus className="h-4 w-4" />*/}
          {/*  <span>Invite User</span>*/}
          {/*</Button>*/}
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Sign In</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center uppercase text-gray-600">
                        {user.user_metadata.name
                          ? user.user_metadata.name.charAt(0)
                          : user.email.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">
                          {user.user_metadata.name || 'Unnamed'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${getRoleBadgeColor(user.role)}`}
                    >
                      {user.role || 'user'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(user.status)}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.created_at)}</TableCell>
                  <TableCell>{formatDate(user.last_sign_in_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onUserSelect(user)}
                        className="mr-1"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      {/*<DropdownMenu>*/}
                      {/*  <DropdownMenuTrigger asChild>*/}
                      {/*    <Button variant="ghost" size="sm">*/}
                      {/*      <MoreHorizontal className="h-4 w-4" />*/}
                      {/*    </Button>*/}
                      {/*  </DropdownMenuTrigger>*/}
                      {/*  <DropdownMenuContent align="end">*/}
                      {/*    <DropdownMenuItem onClick={() => onUserSelect(user)}>*/}
                      {/*      View Details*/}
                      {/*    </DropdownMenuItem>*/}
                      {/*    <DropdownMenuItem>Reset Password</DropdownMenuItem>*/}
                      {/*    <DropdownMenuItem className="text-red-600">*/}
                      {/*      Deactivate Account*/}
                      {/*    </DropdownMenuItem>*/}
                      {/*  </DropdownMenuContent>*/}
                      {/*</DropdownMenu>*/}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
};

export default UsersList;
