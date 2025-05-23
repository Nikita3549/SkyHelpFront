
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Claim } from "@/lib/supabase";
import FlightInformationCard from "./FlightInformationCard";
import DisruptionDetailsCard from "./DisruptionDetailsCard";
import PassengerDetailsCard from "./PassengerDetailsCard";
import BookingLegalCard from "./BookingLegalCard";
import ActionButtons from "../ActionButtons";

type ComprehensiveDetailsTabProps = {
  claim: Claim;
  onSendEmail: () => void;
  onUpdateStatus: () => void;
  onEdit: () => void;
  onMarkNotEligible: () => void;
  onUpdateClaim?: (updates: Partial<Claim>) => void;
};

const ComprehensiveDetailsTab = ({
  claim,
  onSendEmail,
  onUpdateStatus,
  onEdit,
  onMarkNotEligible,
  onUpdateClaim
}: ComprehensiveDetailsTabProps) => {
  return (
    <div className="space-y-6">
      {/* Flight Information Section */}
      <FlightInformationCard claim={claim} />

      {/* Disruption Details Section */}
      <DisruptionDetailsCard claim={claim} />

      {/* Passenger Details Section */}
      <PassengerDetailsCard claim={claim} />

      {/* Booking & Legal Documents Section */}
      <BookingLegalCard claim={claim} />

      <Separator className="my-6" />

      {/* Action Buttons */}
      <ActionButtons 
        onSendEmail={onSendEmail} 
        onUpdateStatus={onUpdateStatus} 
        onEdit={onEdit}
        onMarkNotEligible={onMarkNotEligible}
      />
    </div>
  );
};

export default ComprehensiveDetailsTab;
