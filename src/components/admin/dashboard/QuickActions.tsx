
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mail, FileText, Download } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto py-6 flex flex-col items-center justify-center"
            asChild
          >
            <Link to="/admin/users">
              <Users className="h-5 w-5 mb-2" />
              <span>User Management</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
            <Mail className="h-5 w-5 mb-2" />
            <span>Bulk Email</span>
          </Button>
          <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
            <FileText className="h-5 w-5 mb-2" />
            <span>Generate Reports</span>
          </Button>
          <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
            <Download className="h-5 w-5 mb-2" />
            <span>Export Data</span>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuickActions;
