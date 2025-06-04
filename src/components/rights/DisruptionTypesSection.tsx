import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DisruptionTypeSectionProps {
  sectionId: string;
  title: string;
}

/**
 * Section component for displaying types of flight disruptions and rights
 */
const DisruptionTypesSection = ({
  sectionId,
  title,
}: DisruptionTypeSectionProps) => {
  return (
    <section id={sectionId}>
      <h2 className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">{title}</h2>

      <h3 className="text-xl font-semibold mt-6 mb-3">1. Flight Delays</h3>
      <p className="mb-4">
        You're entitled to compensation if your flight arrives at the final
        destination 3 or more hours later than scheduled and the delay wasn't
        caused by extraordinary circumstances.
      </p>
      <div className="overflow-x-auto my-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold">Delay Length</TableHead>
              <TableHead className="font-semibold">Your Rights</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2+ hours</TableCell>
              <TableCell>
                <ul className="list-disc pl-6">
                  <li>Meals and refreshments</li>
                  <li>Two phone calls, emails, or faxes</li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>3+ hours</TableCell>
              <TableCell>
                <ul className="list-disc pl-6">
                  <li>Financial compensation (€250-€600)</li>
                  <li>All care and assistance from the 2+ hour category</li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>5+ hours</TableCell>
              <TableCell>
                <ul className="list-disc pl-6">
                  <li>Full ticket refund if you decide not to travel</li>
                  <li>Return flight to your departure point if relevant</li>
                  <li>All previous category benefits</li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>Overnight delay</TableCell>
              <TableCell>
                <ul className="list-disc pl-6">
                  <li>Hotel accommodation</li>
                  <li>Transport between airport and hotel</li>
                  <li>All previous category benefits</li>
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">
        2. Flight Cancellations
      </h3>
      <p className="mb-4">
        You're entitled to compensation if your flight was cancelled without
        prior notice and the airline didn't offer an alternative flight that
        arrives close to your original schedule.
      </p>
      <div className="overflow-x-auto my-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold">Notice Period</TableHead>
              <TableHead className="font-semibold">
                Compensation Condition
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Less than 7 days</TableCell>
              <TableCell>
                If rerouting gets you to your destination more than 2 hours
                after your originally scheduled arrival
              </TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>7-14 days</TableCell>
              <TableCell>
                If rerouting gets you to your destination more than 4 hours
                after your originally scheduled arrival
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>More than 14 days</TableCell>
              <TableCell>
                No compensation required, but the airline must offer a refund or
                alternative flight
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">3. Denied Boarding</h3>
      <p className="mb-4">
        If you're involuntarily denied boarding (typically due to overbooking),
        you're entitled to immediate compensation and assistance, regardless of
        when you eventually arrive at your destination.
      </p>
      <p className="mb-4">The airline must offer you the choice between:</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>
          Full ticket refund plus return flight to your departure point if
          necessary
        </li>
        <li>
          Alternative transport to your destination at the earliest opportunity
        </li>
        <li>Rebooking to your destination at a later date of your choosing</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-3">4. Missed Connections</h3>
      <p className="mb-4">
        If you miss a connecting flight due to a delay in your first flight, you
        may be entitled to compensation if:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>
          Both flights were part of the same booking (same reservation number)
        </li>
        <li>
          The delay of the first flight caused you to miss your connection
        </li>
        <li>You arrive at your final destination with a delay of 3+ hours</li>
      </ul>
    </section>
  );
};

export default DisruptionTypesSection;
