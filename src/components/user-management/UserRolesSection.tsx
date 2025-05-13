import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, Plus, Shield } from "lucide-react";
import { User } from "@/types/user";

type Role = {
  id: string;
  name: string;
  description: string;
  permissions: string[];
};

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access",
    permissions: ["read:all", "write:all", "delete:all"]
  },
  {
    id: "2",
    name: "Manager",
    description: "Can manage users and content",
    permissions: ["read:all", "write:users", "write:content"]
  },
  {
    id: "3",
    name: "User",
    description: "Standard user access",
    permissions: ["read:content"]
  }
];

interface UserRolesSectionProps {
  users: User[];
}

const UserRolesSection = ({ users }: UserRolesSectionProps) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isCreatingRole, setIsCreatingRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [newRoleDescription, setNewRoleDescription] = useState("");

  const handleRoleChange = (userId: string, roleId: string) => {
    // In a real application, this would update the user's role in your database
    toast.success("Role updated", {
      description: `User role has been updated to ${roles.find(r => r.id === roleId)?.name}`,
    });
  };

  const handleSaveNewRole = () => {
    if (!newRoleName.trim()) {
      toast.error("Role name is required");
      return;
    }
    
    const newRole: Role = {
      id: `${roles.length + 1}`,
      name: newRoleName,
      description: newRoleDescription || "No description provided",
      permissions: []
    };
    
    setRoles([...roles, newRole]);
    setNewRoleName("");
    setNewRoleDescription("");
    setIsCreatingRole(false);
    
    toast.success("Role created", {
      description: `New role "${newRoleName}" has been created`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              User Roles
            </CardTitle>
            <CardDescription>Assign roles to users</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Current Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.slice(0, 5).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role || "User"}</Badge>
                    </TableCell>
                    <TableCell>
                      <Select 
                        onValueChange={(value) => handleRoleChange(user.id, value)}
                        defaultValue={user.role || "3"}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6">
                      No users to display
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {users.length > 5 && (
              <div className="mt-4 text-center">
                <Button variant="link">View all users</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-lg">Role Management</CardTitle>
              <CardDescription>Create and manage roles</CardDescription>
            </div>
            <Button size="sm" onClick={() => setIsCreatingRole(true)}>
              <Plus className="h-4 w-4 mr-1" /> New Role
            </Button>
          </CardHeader>
          <CardContent>
            {isCreatingRole ? (
              <div className="space-y-4 border rounded-md p-4">
                <div>
                  <label className="text-sm font-medium">Role Name</label>
                  <input
                    type="text"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter role name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    value={newRoleDescription}
                    onChange={(e) => setNewRoleDescription(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder="Enter role description"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreatingRole(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveNewRole}>
                    <Check className="h-4 w-4 mr-1" /> Save Role
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {roles.map((role) => (
                  <div key={role.id} className="p-4 border rounded-md">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{role.name}</h4>
                        <p className="text-sm text-gray-500">{role.description}</p>
                      </div>
                      <Button size="sm" variant="outline">Edit</Button>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-1">Permissions:</p>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.map((perm, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserRolesSection;
