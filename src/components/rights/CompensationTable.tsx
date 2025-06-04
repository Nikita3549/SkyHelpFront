import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface CompensationTableProps {
  headers: string[];
  rows: Array<Array<React.ReactNode>>;
  className?: string;
  highlightHeader?: boolean;
}

/**
 * Reusable compensation table component used across rights pages
 */
const CompensationTable = ({
  headers,
  rows,
  className = '',
  highlightHeader = true,
}: CompensationTableProps) => {
  return (
    <div className={`overflow-x-auto my-6 ${className}`}>
      <Table>
        <TableHeader>
          <TableRow className={highlightHeader ? 'bg-blue-50' : ''}>
            {headers.map((header, index) => (
              <TableHead key={index} className="font-semibold">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              className={rowIndex % 2 === 1 ? 'bg-gray-50' : ''}
            >
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompensationTable;
