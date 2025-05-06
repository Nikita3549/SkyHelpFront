
import React from "react";
import RightsInfoBox from "@/components/rights/RightsInfoBox";
import { AlertTriangleIcon } from "lucide-react";

const Uk261ExtraordinaryCircumstances = () => {
  return (
    <>
      <RightsInfoBox 
        type="warning" 
        icon={<AlertTriangleIcon />}
      >
        <p>
          Airlines may avoid paying compensation if the disruption was caused by "extraordinary circumstances" 
          beyond their control. However, they must still provide care and assistance to affected passengers.
        </p>
      </RightsInfoBox>
      
      <p>
        Like EU261, UK261 allows airlines to avoid paying compensation if the disruption was caused by "extraordinary circumstances." 
        These include:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Severe weather conditions</li>
        <li>Political instability</li>
        <li>Security risks</li>
        <li>Air traffic control restrictions</li>
        <li>Unexpected flight safety shortcomings</li>
        <li>Strikes affecting airport operations (but generally not airline staff strikes)</li>
      </ul>
      <p>
        UK courts have generally followed similar interpretations as EU courts regarding what constitutes extraordinary circumstances, 
        particularly ruling that most technical problems are not extraordinary circumstances as they are part of the normal operation of an airline.
      </p>
    </>
  );
};

export default Uk261ExtraordinaryCircumstances;
