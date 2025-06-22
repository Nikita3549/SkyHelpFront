import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Clock, CheckCircle2, Banknote } from 'lucide-react';
import api from '@/api/axios.ts';
import { ClaimResponse } from '@/components/admin/dashboard/interfaces/claim.response.ts';

interface DashboardStatsProps {
  total: number;
  active: number;
  successful: number;
  compensation: number;
}

const DashboardStats = ({
  active,
  total,
  successful,
  compensation,
}: DashboardStatsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Claims</p>
              <h4 className="text-2xl font-bold mt-1">{total}</h4>
              {/*<p className="text-xs text-green-600 mt-1">*/}
              {/*  {stat.change} from last month*/}
              {/*</p>*/}
            </div>
            <div className="p-2 rounded-full bg-gray-50">
              <FileText className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Active Claims</p>
              <h4 className="text-2xl font-bold mt-1">{active}</h4>
              {/*<p className="text-xs text-green-600 mt-1">*/}
              {/*  {stat.change} from last month*/}
              {/*</p>*/}
            </div>
            <div className="p-2 rounded-full bg-gray-50">
              <Clock className="h-5 w-5 text-orange-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Successful Claims</p>
              <h4 className="text-2xl font-bold mt-1">{successful}</h4>
              {/*<p className="text-xs text-green-600 mt-1">*/}
              {/*  {stat.change} from last month*/}
              {/*</p>*/}
            </div>
            <div className="p-2 rounded-full bg-gray-50">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Compensation</p>
              <h4 className="text-2xl font-bold mt-1">€{compensation}</h4>
              {/*<p className="text-xs text-green-600 mt-1">*/}
              {/*  {stat.change} from last month*/}
              {/*</p>*/}
            </div>
            <div className="p-2 rounded-full bg-gray-50">
              <Banknote className="h-5 w-5 text-emerald-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardStats;
