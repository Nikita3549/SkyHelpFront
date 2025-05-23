
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ChevronRight, ChevronLeft, Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Claim } from "@/lib/supabase";

type ClaimsTableProps = {
  filteredClaims: Claim[];
  totalClaims: number;
  selectedClaim: string | null;
  setSelectedClaim: (id: string | null) => void;
  page: number;
  setPage: (page: number) => void;
  handleSendEmail: (claimId: string) => void;
  handleUpdateStatus: (claimId: string, newStatus: string) => void;
};

const ClaimsTable = ({
  filteredClaims,
  totalClaims,
  selectedClaim,
  setSelectedClaim,
  page,
  setPage,
  handleSendEmail,
  handleUpdateStatus,
}: ClaimsTableProps) => {
  // Add ref to be passed to parent component for scrolling
  const tableRef = useRef<HTMLDivElement>(null);

  // When a claim is selected, notify parent to scroll to details
  useEffect(() => {
    if (selectedClaim) {
      // Use a slight delay to ensure the details section is rendered
      setTimeout(() => {
        // Find the claim details section
        const detailsSection = document.getElementById('claim-details-section');
        if (detailsSection) {
          detailsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [selectedClaim]);

  return (
    <motion.div
      ref={tableRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Flight Details</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClaims.map((claim) => (
                <TableRow key={claim.id} className={selectedClaim === claim.id ? "bg-blue-50" : undefined}>
                  <TableCell className="font-medium">{claim.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{claim.customer}</div>
                      <div className="text-xs text-gray-500">{claim.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{claim.airline}</div>
                      <div className="text-xs text-gray-500">{claim.flightnumber}</div>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(claim.date).toLocaleDateString()}</TableCell>
                  <TableCell>{claim.amount}</TableCell>
                  <TableCell>
                    <StatusBadge status={claim.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setSelectedClaim(claim.id)}
                        className="mr-1"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setSelectedClaim(claim.id)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleUpdateStatus(claim.id, "in_progress")}>
                            Mark as In Progress
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(claim.id, "completed")}>
                            Mark as Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(claim.id, "rejected")}>
                            Mark as Rejected
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUpdateStatus(claim.id, "not_eligible")}>
                            Mark as Not Eligible
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t flex items-center justify-between p-4">
          <div className="text-sm text-gray-500">
            Showing {filteredClaims.length} of {totalClaims} claims
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="px-3">
              Page {page}
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={filteredClaims.length < 10}
              onClick={() => setPage(page + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ClaimsTable;
