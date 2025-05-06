
import React from "react";
import InfoCardGrid from "@/components/rights/InfoCardGrid";
import { FileTextIcon, PlaneTakeoffIcon, CheckIcon } from "lucide-react";

const Uk261ClaimProcess = () => {
  return (
    <>
      <InfoCardGrid
        columns={3}
        cards={[
          {
            icon: <FileTextIcon className="w-6 h-6" />,
            title: "Gather Documentation",
            description: "Collect boarding passes, ticket receipts, airline communications, and details about the disruption"
          },
          {
            icon: <PlaneTakeoffIcon className="w-6 h-6" />,
            title: "Contact the Airline",
            description: "Submit a claim through the airline's official channels, referencing UK261"
          },
          {
            icon: <CheckIcon className="w-6 h-6" />,
            title: "Escalate if Necessary",
            description: "If rejected, contact ADR schemes, CAA, or consider small claims court"
          }
        ]}
      />
      
      <ol className="list-decimal pl-6 space-y-4 mt-6">
        <li>
          <strong>Gather documentation:</strong>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Boarding passes and ticket receipts</li>
            <li>Any communication from the airline about the disruption</li>
            <li>Details about the length and cause of the disruption</li>
          </ul>
        </li>
        <li>
          <strong>Contact the airline directly:</strong>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Submit a claim through the airline's official channels</li>
            <li>Reference UK261 or "UK Flight Compensation Regulation" in your claim</li>
            <li>Include all relevant flight details and the nature of your claim</li>
          </ul>
        </li>
        <li>
          <strong>If rejected or no response:</strong>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Contact alternative dispute resolution (ADR) schemes if the airline participates in one</li>
            <li>File a complaint with the Civil Aviation Authority (CAA)</li>
            <li>Consider small claims court if necessary</li>
            <li>Seek professional assistance from a company like CleverClaim</li>
          </ul>
        </li>
      </ol>
    </>
  );
};

export default Uk261ClaimProcess;
