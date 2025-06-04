import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Plane } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface Claim {
  id: string;
  airline: string;
  flightNumber: string;
  departureDate: string;
  route: string;
  status: string;
  statusText: string;
  compensation: string;
  progress: number;
  lastUpdate: string;
  estimatedCompletion?: string;
  paymentDate?: string;
  documents: Array<{ name: string; status: string }>;
  messages: Array<{ date: string; content: string; isFromTeam: boolean }>;
}

interface ClaimsListProps {
  claims: Claim[];
  selectedClaimId: string;
  onClaimSelect: (claimId: string) => void;
}

const ClaimsList = ({
  claims,
  selectedClaimId,
  onClaimSelect,
}: ClaimsListProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-1"
    >
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>My Claims</CardTitle>
          <CardDescription>
            {claims.length} {claims.length === 1 ? 'claim' : 'claims'} in total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {claims.map((claim) => (
              <motion.div
                key={claim.id}
                variants={item}
                transition={{ duration: 0.3 }}
              >
                <Card
                  className={`cursor-pointer hover:shadow-md transition-shadow ${
                    selectedClaimId === claim.id
                      ? 'border-primary shadow-md'
                      : ''
                  }`}
                  onClick={() => onClaimSelect(claim.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <Plane className="h-4 w-4 text-primary mr-2" />
                        <span className="font-medium">{claim.airline}</span>
                      </div>
                      <StatusBadge status={claim.status} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Flight</span>
                        <span className="text-sm font-medium">
                          {claim.flightNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Date</span>
                        <span className="text-sm font-medium">
                          {new Date(claim.departureDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">
                          Compensation
                        </span>
                        <span className="text-sm font-medium">
                          {claim.compensation}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{claim.progress}%</span>
                      </div>
                      <Progress value={claim.progress} className="h-1.5" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ClaimsList;
