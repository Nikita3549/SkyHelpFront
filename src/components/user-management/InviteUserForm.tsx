
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Mail, Send } from "lucide-react";

interface InviteUserFormProps {
  onInvite: (email: string) => void;
}

const InviteUserForm = ({ onInvite }: InviteUserFormProps) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [sendEmail, setSendEmail] = useState(true);
  const [invitationHistory, setInvitationHistory] = useState<{
    email: string;
    role: string;
    date: string;
    status: "pending" | "accepted" | "expired";
  }[]>([
    {
      email: "john.doe@example.com",
      role: "Admin",
      date: "2023-05-15",
      status: "accepted"
    },
    {
      email: "jane.smith@example.com",
      role: "Manager",
      date: "2023-05-18",
      status: "pending"
    },
    {
      email: "mark.wilson@example.com",
      role: "User",
      date: "2023-05-10",
      status: "expired"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    onInvite(email);
    
    // Add to invitation history
    setInvitationHistory([
      {
        email,
        role: role === "admin" ? "Admin" : role === "manager" ? "Manager" : "User",
        date: new Date().toISOString().split("T")[0],
        status: "pending"
      },
      ...invitationHistory
    ]);
    
    // Reset form
    setEmail("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "accepted":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Accepted</Badge>;
      case "expired":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Mail className="h-5 w-5 mr-2" />
            Invite New User
          </CardTitle>
          <CardDescription>Send invitations to join your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="sendEmail" checked={sendEmail} onCheckedChange={() => setSendEmail(!sendEmail)} />
              <label htmlFor="sendEmail" className="text-sm text-gray-700">
                Send invitation email
              </label>
            </div>
            
            <Button type="submit" className="w-full md:w-auto">
              <Send className="h-4 w-4 mr-2" />
              Send Invitation
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Invitations</CardTitle>
          <CardDescription>Track the status of sent invitations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date Sent</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invitationHistory.map((invitation, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{invitation.email}</TableCell>
                  <TableCell>{invitation.role}</TableCell>
                  <TableCell>{invitation.date}</TableCell>
                  <TableCell>{getStatusBadge(invitation.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteUserForm;
