
import React from "react";
import Timeline from "@/components/claim-form/Timeline";

interface ClaimFormTimelineProps {
  step: number;
  showBoardingPassUpload: boolean;
}

const ClaimFormTimeline: React.FC<ClaimFormTimelineProps> = ({ 
  step, 
  showBoardingPassUpload 
}) => {
  // Mapping step numbers to timeline status
  const getTimelineItems = () => {
    if (showBoardingPassUpload) {
      return [
        {
          label: "Boarding Pass",
          status: step > 0 ? "completed" as const : "active" as const
        },
        {
          label: "Flight Details",
          status: step > 2 ? "completed" as const : step === 2 ? "active" as const : "pending" as const
        },
        {
          label: "Disruption Type",
          status: step > 2.5 ? "completed" as const : step === 2.5 ? "active" as const : "pending" as const
        },
        {
          label: "Passenger Details",
          status: step > 3 ? "completed" as const : step === 3 ? "active" as const : "pending" as const
        },
        {
          label: "Disruption Details",
          status: step > 4 ? "completed" as const : step === 4 ? "active" as const : "pending" as const
        },
        {
          label: "Payment",
          status: step === 5 ? "active" as const : "pending" as const
        }
      ];
    }
    
    return [
      {
        label: "Flight Route",
        status: step > 1 ? "completed" as const : step === 1 ? "active" as const : "pending" as const
      },
      {
        label: "Flight Details",
        status: step > 2 ? "completed" as const : step === 2 ? "active" as const : "pending" as const
      },
      {
        label: "Disruption Type",
        status: step > 2.5 ? "completed" as const : step === 2.5 ? "active" as const : "pending" as const
      },
      {
        label: "Passenger Details",
        status: step > 3 ? "completed" as const : step === 3 ? "active" as const : "pending" as const
      },
      {
        label: "Disruption Details",
        status: step > 4 ? "completed" as const : step === 4 ? "active" as const : "pending" as const
      },
      {
        label: "Payment",
        status: step === 5 ? "active" as const : "pending" as const
      }
    ];
  };

  return <Timeline items={getTimelineItems()} />;
};

export default ClaimFormTimeline;
