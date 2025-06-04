import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import type { User } from '@/pages/UserManagement';

interface UserRolesSectionProps {
  user: User;
  onUserUpdate: () => void;
}

const UserRolesSection = ({ user, onUserUpdate }: UserRolesSectionProps) => {
  const [selectedRole, setSelectedRole] = useState(user.role || 'user');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleRoleChange = async () => {
    if (selectedRole === user.role) {
      toast({
        title: 'No changes',
        description: 'The selected role is the same as the current role.',
      });
      return;
    }

    setIsUpdating(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Role Updated',
        description: `${user.email}'s role has been changed to ${selectedRole}.`,
      });

      // Update the user object with the new role
      user.role = selectedRole;

      onUserUpdate();
    } catch (error: any) {
      console.error('Error updating role:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update role.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Role</CardTitle>
        <CardDescription>
          Assign a role to determine user access levels and permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedRole}
          onValueChange={setSelectedRole}
          className="space-y-4"
        >
          <div className="flex items-start space-x-3 border border-gray-200 p-4 rounded-md">
            <RadioGroupItem value="admin" id="admin" className="mt-1" />
            <div>
              <Label htmlFor="admin" className="font-semibold">
                Administrator
              </Label>
              <p className="text-sm text-gray-500">
                Full access to all areas of the system, including user
                management and critical settings.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 border border-gray-200 p-4 rounded-md">
            <RadioGroupItem value="moderator" id="moderator" className="mt-1" />
            <div>
              <Label htmlFor="moderator" className="font-semibold">
                Moderator
              </Label>
              <p className="text-sm text-gray-500">
                Can manage claims and communications, but has limited access to
                system settings.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 border border-gray-200 p-4 rounded-md">
            <RadioGroupItem value="user" id="user" className="mt-1" />
            <div>
              <Label htmlFor="user" className="font-semibold">
                Standard User
              </Label>
              <p className="text-sm text-gray-500">
                Basic access for submitting and managing their own claims.
              </p>
            </div>
          </div>
        </RadioGroup>

        <Separator className="my-6" />

        <div>
          <Button
            onClick={handleRoleChange}
            disabled={isUpdating || selectedRole === user.role}
          >
            {isUpdating ? 'Updating...' : 'Update Role'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRolesSection;
