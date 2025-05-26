
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Search, Filter, Download, PlusCircle, CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

type FilterState = {
  dateFrom?: Date;
  dateTo?: Date;
  amountFrom?: string;
  amountTo?: string;
  airline?: string;
};

type ClaimsTableHeaderProps = {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  handleExportClaims: () => void;
  setIsNewClaimModalOpen: (value: boolean) => void;
  filters?: FilterState;
  setFilters?: (filters: FilterState) => void;
};

const ClaimsTableHeader = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  handleExportClaims,
  setIsNewClaimModalOpen,
  filters = {},
  setFilters = () => {},
}: ClaimsTableHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterState>(filters);

  const handleApplyFilters = () => {
    setFilters(tempFilters);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    const clearedFilters = {};
    setTempFilters(clearedFilters);
    setFilters(clearedFilters);
    setIsFilterOpen(false);
  };

  const hasActiveFilters = Object.keys(filters).some(key => 
    filters[key as keyof FilterState] !== undefined && filters[key as keyof FilterState] !== ""
  );

  const airlines = [
    "Lufthansa", "British Airways", "Ryanair", "EasyJet", "Air France", 
    "KLM", "Turkish Airlines", "Emirates", "Qatar Airways", "Delta"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row gap-4 items-center justify-between"
    >
      <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search claims, customers..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Label htmlFor="status-filter" className="sr-only">
            Status
          </Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status-filter" className="w-full sm:w-36">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-gray-400" />
                <SelectValue placeholder="Filter status" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="not_eligible">Not Eligible</SelectItem>
            </SelectContent>
          </Select>

          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("h-10", hasActiveFilters && "border-blue-500 bg-blue-50")}>
                <Filter className="mr-2 h-4 w-4" />
                Advanced Filters
                {hasActiveFilters && (
                  <div className="ml-2 h-2 w-2 rounded-full bg-blue-500" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-white border shadow-lg z-50" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Advanced Filters</h4>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>

                {/* Date Range Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Date Range</Label>
                  <div className="flex space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !tempFilters.dateFrom && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {tempFilters.dateFrom ? format(tempFilters.dateFrom, "PPP") : "From date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white border shadow-lg z-50" align="start">
                        <Calendar
                          mode="single"
                          selected={tempFilters.dateFrom}
                          onSelect={(date) => setTempFilters(prev => ({ ...prev, dateFrom: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !tempFilters.dateTo && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {tempFilters.dateTo ? format(tempFilters.dateTo, "PPP") : "To date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-white border shadow-lg z-50" align="start">
                        <Calendar
                          mode="single"
                          selected={tempFilters.dateTo}
                          onSelect={(date) => setTempFilters(prev => ({ ...prev, dateTo: date }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Amount Range Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Amount Range (€)</Label>
                  <div className="flex space-x-2">
                    <Input
                      type="number"
                      placeholder="Min amount"
                      value={tempFilters.amountFrom || ""}
                      onChange={(e) => setTempFilters(prev => ({ ...prev, amountFrom: e.target.value }))}
                    />
                    <Input
                      type="number"
                      placeholder="Max amount"
                      value={tempFilters.amountTo || ""}
                      onChange={(e) => setTempFilters(prev => ({ ...prev, amountTo: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Airline Filter */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Airline</Label>
                  <Select
                    value={tempFilters.airline || ""}
                    onValueChange={(value) => setTempFilters(prev => ({ ...prev, airline: value === "all" ? "" : value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select airline" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg">
                      <SelectItem value="all">All Airlines</SelectItem>
                      {airlines.map((airline) => (
                        <SelectItem key={airline} value={airline}>
                          {airline}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button onClick={handleApplyFilters} className="flex-1">
                    Apply Filters
                  </Button>
                  <Button variant="outline" onClick={() => setIsFilterOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex gap-2 w-full sm:w-auto">
        <Button variant="outline" size="sm" onClick={handleExportClaims}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button size="sm" onClick={() => setIsNewClaimModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Claim
        </Button>
      </div>
    </motion.div>
  );
};

export default ClaimsTableHeader;
