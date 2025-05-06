
import React from "react";
import CompensationTable from "@/components/rights/CompensationTable";

const Uk261CompensationTable = () => {
  const compensationHeaders = ["Flight Distance", "Compensation Amount"];
  const compensationRows = [
    ["Up to 1,500 km", "£220 (approx. €250)"],
    ["Between 1,500 and 3,500 km", "£350 (approx. €400)"],
    ["Over 3,500 km", "£520 (approx. €600)*"]
  ];

  return (
    <>
      <CompensationTable 
        headers={compensationHeaders}
        rows={compensationRows}
        highlightHeader={true}
      />
      
      <p className="text-sm italic mt-2 mb-6">
        * For long-distance flights (over 3,500 km), if the delay at the final destination is between 3 and 4 hours, 
        the compensation may be reduced by 50% (to £260).
      </p>
    </>
  );
};

export default Uk261CompensationTable;
