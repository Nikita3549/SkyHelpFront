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
        // In a real application, you would fetch from the API
        // Here we're using mock data and filtering by user email
        await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate API delay

        // For this mock version, we'll fetch all claims and filter to the user's email
        // Enhanced mock data with more details to match the design reference
        let mockClaims = [
          {
            id: 'CLM-1234',
            customer: 'John Doe',
            email: 'john.doe@example.com',
            airline: 'Lufthansa',
            flightnumber: 'LH1234',
            date: '10.03.2025',
            status: 'rejected',
            stage: 'processing',
            amount: '€400',
            lastupdated: '25.03.2025',
            created_at: '2023-11-15T00:00:00+00:00',
            phone: '+491234567890',
            address: '123 Main St, Berlin, Germany',
            departureairport: 'Munich (MUC)',
            arrivalairport: 'London (LHR)',
            flightissue: 'Cancellation',
            reasongivenbyairline: 'Technical issues',
            additionalinformation:
              'Flight was cancelled 2 hours before departure with no alternative offered.',
            paymentmethod: 'bank_transfer',
            paymentdetails: {
              bankName: 'Deutsche Bank',
              accountHolderName: 'John Doe',
              iban: 'DE89370400440532013000',
            },
          },
          {
            id: 'CLM-5678',
            customer: 'Jane Smith',
            email: 'jane.smith@example.com',
            airline: 'British Airways',
            flightnumber: 'BA2160',
            date: '20.10.2022',
            status: 'completed',
            stage: 'completed',
            amount: '€250',
            lastupdated: '25.03.2025',
            created_at: '2023-10-20T00:00:00+00:00',
            phone: '+441234567890',
            address: '456 High Street, London, UK',
            departureairport: 'London (LHR)',
            arrivalairport: 'Madrid (MAD)',
            flightissue: 'Delay',
            reasongivenbyairline: 'Air traffic control',
            additionalinformation: 'Flight was delayed for 4 hours.',
            paymentmethod: 'paypal',
            paymentdetails: {
              paypalEmail: 'jane.smith@example.com',
            },
          },
          {
            id: 'CLM-9012',
            customer: 'Mike Brown',
            email: 'mike.brown@example.com',
            airline: 'Ryanair',
            flightnumber: 'FR8012',
            date: '11.03.2025',
            status: 'in_progress',
            stage: 'initial_review',
            amount: '€250 (estimated)',
            lastupdated: '25.03.2025',
            created_at: '2023-12-05T00:00:00+00:00',
            phone: '+44555123456',
            address: '789 Park Lane, Birmingham, UK',
            departureairport: 'Barcelona (BCN)',
            arrivalairport: 'Paris (ORY)',
            flightissue: 'Delay',
            reasongivenbyairline: 'Airport congestion',
            additionalinformation: 'Waiting for more details from airline',
            paymentmethod: 'wise',
            paymentdetails: {
              accountHolderName: 'Mike Brown',
              ibanOrAccount: 'MD20339429034',
              email: 'mike.brown@example.com',
            },
          },
        ] as Claim[];

        // Filter claims for the specific user by email
        // In a real application, you'd query by user ID instead
        const userClaims = mockClaims.filter(
          (claim) => claim.email === userEmail,
        );
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
              <CardTitle className="flex items-center">
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
                    <TableHead className="text-right">Actions</TableHead>
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
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewClaimDetails(claim)}
                        >
                          View Details
                        </Button>
                      </TableCell>
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
