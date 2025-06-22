import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { FileText, Search } from 'lucide-react';
import { Claim } from '@/lib/supabase';
import EditClaimModal from '@/components/admin/EditClaimModal';
import api from '@/api/axios';
import { IClaimBackend } from '@/components/claim-form/interfaces/claim-back.interface.ts';

interface UserClaimsSectionProps {
  userId: string;
  userEmail: string;
}

const UserClaimsSection = ({ userId, userEmail }: UserClaimsSectionProps) => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserClaims = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const res = await api.get<IClaimBackend[]>(
          `/claims/admin/all?page=1&userId=${userId}`,
        );

        const userClaims = res.data.map((c) => ({
          id: c.id,
          customer: `${c.customer.firstName} ${c.customer.lastName}`,
          email: c.customer.email,
          bookingRef: c.details.bookingRef,
          airline: c.details.airlines.name,
          flightnumber: c.details.flightNumber,
          date: c.details.date.slice(0, 10),
          status: c.state.status.toLowerCase() as
            | 'completed'
            | 'rejected'
            | 'in_progress'
            | 'pending'
            | 'escalated'
            | 'not_eligible',
          stage: 'processing',
          amount: `€${c.state.amount}`,
          lastupdated: c.updatedAt.slice(0, 10),
          created_at: c.createdAt,
          phone: c.customer.phone,
          address: c.customer.address,
          departureairport: '-',
          arrivalairport: '-',
          flightissue: c.issue.disruptionType,
          reasongivenbyairline: c.issue.airlineReason,
          additionalinformation: c.issue.additionalInfo,
          paymentmethod: '-',
          paymentdetails: {
            bankName: '-',
            accountHolderName: '-',
            iban: '-',
          },
          routes: c.details.routes,
          documents: c.documents.map((d) => ({
            ...d,
            title: d.name,
            status: 'uploaded',
          })),
          airlineIcao: c.details.airlines.icao,
          progresses: c.state.progress,
        }));

        setClaims(userClaims);
      } catch (err) {
        console.error('Error fetching user claims:', err);
        setError('Failed to load claims data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserClaims();
  }, [userId, userEmail]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleViewClaimDetails = (claim: Claim) => {
    setSelectedClaim(claim);
    setIsClaimModalOpen(true);
  };

  const filteredClaims = claims.filter(
    (claim) =>
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.flightnumber.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center mb-2">
                <FileText className="h-5 w-5 mr-2" />
                Claims History
              </CardTitle>
              <CardDescription>
                View all flight compensation claims submitted by this user
              </CardDescription>
            </div>

            {claims.length > 0 && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search claims..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 py-2 pr-3 border rounded-md w-full md:w-64"
                />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              <p className="mb-2 font-semibold">{error}</p>
              <button
                onClick={() => setClaims([])} // In real app, this would retry the fetch
                className="text-sm text-blue-600 hover:underline"
              >
                Try again
              </button>
            </div>
          ) : claims.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No claims found</p>
              <p className="text-sm mt-1">
                This user hasn't submitted any claims yet
              </p>
            </div>
          ) : filteredClaims.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No matching claims</p>
              <p className="text-sm mt-1">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Flight</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    {/*<TableHead className="text-right">Actions</TableHead>*/}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims.map((claim) => (
                    <TableRow
                      key={claim.id}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>
                        {claim.airline} {claim.flightnumber}
                      </TableCell>
                      <TableCell>{claim.date}</TableCell>
                      <TableCell>{claim.amount}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${getStatusBadgeColor(claim.status)} capitalize`}
                        >
                          {claim.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      {/*<TableCell className="text-right">*/}
                      {/*  <Button*/}
                      {/*    variant="ghost"*/}
                      {/*    size="sm"*/}
                      {/*    onClick={() => handleViewClaimDetails(claim)}*/}
                      {/*  >*/}
                      {/*    View Details*/}
                      {/*  </Button>*/}
                      {/*</TableCell>*/}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedClaim && (
        <EditClaimModal
          isOpen={isClaimModalOpen}
          onClose={() => setIsClaimModalOpen(false)}
          claim={selectedClaim}
        />
      )}
    </>
  );
};

export default UserClaimsSection;
