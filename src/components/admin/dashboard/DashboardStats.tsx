import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Clock, CheckCircle2, Banknote } from 'lucide-react';

const dashboardStats = [
  {
    title: 'Total Claims',
    value: '156',
    icon: <FileText className="h-5 w-5 text-blue-500" />,
    change: '+12%',
  },
  {
    title: 'Active Claims',
    value: '87',
    icon: <Clock className="h-5 w-5 text-orange-500" />,
    change: '+5%',
  },
  {
    title: 'Successful Claims',
    value: '42',
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    change: '+8%',
  },
  {
    title: 'Total Compensation',
    value: '€53,250',
    icon: <Banknote className="h-5 w-5 text-emerald-500" />,
    change: '+15%',
  },
];

const DashboardStats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {dashboardStats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h4 className="text-2xl font-bold mt-1">{stat.value}</h4>
                <p className="text-xs text-green-600 mt-1">
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-2 rounded-full bg-gray-50">{stat.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
};

export default DashboardStats;
