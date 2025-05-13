import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarClock,
  CheckCircle,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  User as UserIcon,
} from "lucide-react";
import { User } from "@/types/user";

interface UserDetailsModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const UserDetailsModal = ({ user, isOpen, onClose }: UserDetailsModalProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">User Details</DialogTitle>
          <DialogDescription>
            Comprehensive information about this user
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="md:col-span-1">
            <div className="flex flex-col items-center space-y-4">
              <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                <UserIcon className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="font-medium text-lg">{user.email.split('@')[0]}</h3>
              <Badge variant="secondary">{user.role || "User"}</Badge>
              <div className="w-full">
                <Button className="w-full" variant="outline">
                  Reset Password
                </Button>
              </div>
              <div className="w-full">
                <Button className="w-full" variant="destructive">
                  Suspend Account
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium mb-4">Account Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Email:</span>
                    <span className="ml-2 text-sm font-medium">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Role:</span>
                    <span className="ml-2 text-sm font-medium">{user.role || "Standard User"}</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Status:</span>
                    <Badge className="ml-2" variant="outline">Active</Badge>
                  </div>
                  <div className="flex items-center">
                    <CalendarClock className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Created:</span>
                    <span className="ml-2 text-sm">{formatDate(user.created_at)}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarClock className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Last Login:</span>
                    <span className="ml-2 text-sm">{formatDate(user.last_sign_in_at)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium mb-4">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Email:</span>
                    <span className="ml-2 text-sm font-medium">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Phone:</span>
                    <span className="ml-2 text-sm font-medium">Not provided</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Location:</span>
                    <span className="ml-2 text-sm font-medium">Not provided</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-medium mb-4">Security</h4>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Two-factor Authentication:</span>
                    <Badge className="ml-2" variant="outline">Disabled</Badge>
                  </div>
                  <div className="flex items-center">
                    <CalendarClock className="h-4 w-4 mr-2 text-gray-500" />
                    <span className="text-sm">Password Updated:</span>
                    <span className="ml-2 text-sm">Never</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsModal;
