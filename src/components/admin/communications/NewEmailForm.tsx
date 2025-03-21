
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail } from "lucide-react";

const NewEmailForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">New Email</CardTitle>
        <CardDescription>Send an email to a customer or airline</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>
            <Input id="recipient" placeholder="Email address" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            <Select>
              <SelectTrigger id="template">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No template</SelectItem>
                <SelectItem value="update">Status Update</SelectItem>
                <SelectItem value="document">Document Request</SelectItem>
                <SelectItem value="compensation">Compensation Info</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="Email subject" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <div className="rounded-md border">
            <div className="p-3 text-sm text-gray-500">
              (Rich text editor would be implemented here)
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-end space-x-2">
        <Button variant="outline">Save Draft</Button>
        <Button>
          <Mail className="mr-2 h-4 w-4" />
          Send Email
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewEmailForm;
