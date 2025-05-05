
import React from "react";
import RightsPageLayout from "@/components/rights/RightsPageLayout";

const DelayedBaggageCompensation = () => {
  const relatedLinks = [
    { title: "Air Passenger Rights", href: "/rights/air-passenger-rights" },
    { title: "Flight Compensation", href: "/rights/flight-compensation" },
    { title: "Delayed Flight Compensation", href: "/rights/delayed-flight-compensation" },
    { title: "Cancelled Flight Compensation", href: "/rights/cancelled-flight-compensation" }
  ];

  return (
    <RightsPageLayout
      title="Delayed, Damaged, or Lost Luggage Compensation"
      description="Your rights when an airline mishandles your baggage"
      metaTitle="Delayed, Damaged, or Lost Luggage Compensation Guide | CleverClaim"
      metaDescription="Learn how to claim compensation for delayed, damaged, or lost luggage under the Montreal Convention and your passenger rights for baggage issues."
      relatedLinks={relatedLinks}
    >
      <h2>Your Rights When Airlines Mishandle Your Baggage</h2>
      <p>
        Having your luggage delayed, damaged, or lost can significantly impact your trip. Fortunately, international 
        agreements protect passengers whose baggage is mishandled. This guide explains your rights and how to claim 
        compensation for baggage-related issues.
      </p>

      <h3>Legal Framework: The Montreal Convention</h3>
      <p>
        Unlike flight delays and cancellations, which are governed by EU Regulation 261/2004, baggage issues are primarily 
        covered by the Montreal Convention. This international treaty applies to most international flights and establishes 
        airline liability for baggage problems.
      </p>
      <p>
        Under the Montreal Convention, airlines are liable for:
      </p>
      <ul>
        <li>Delayed baggage</li>
        <li>Damaged baggage</li>
        <li>Lost baggage</li>
      </ul>
      <p>
        The maximum compensation is currently set at approximately 1,288 Special Drawing Rights (SDR) per passenger 
        (approximately €1,500 or $1,780, though exact amounts fluctuate with exchange rates).
      </p>

      <h3>Types of Baggage Issues and Your Rights</h3>

      <h4>1. Delayed Baggage</h4>
      <p>
        If your baggage doesn't arrive with your flight, you're entitled to:
      </p>
      <ul>
        <li>Reimbursement for essential items (toiletries, clothing, etc.) that you need to purchase while waiting for your luggage</li>
        <li>Assistance from the airline in locating and delivering your baggage</li>
      </ul>
      <p>
        Most airlines consider baggage "delayed" for up to 21 days. After this period, it's typically declared "lost."
      </p>

      <h4>2. Damaged Baggage</h4>
      <p>
        If your baggage or its contents are damaged during transport, you're entitled to:
      </p>
      <ul>
        <li>Repair of the damaged items</li>
        <li>Replacement of items that cannot be repaired</li>
        <li>Compensation for the depreciated value of damaged items</li>
      </ul>
      <p>
        Important: You must report damaged baggage within 7 days of receiving it.
      </p>

      <h4>3. Lost Baggage</h4>
      <p>
        If your baggage is declared lost (typically after 21 days), you're entitled to:
      </p>
      <ul>
        <li>Compensation for the value of your lost baggage and its contents (up to the convention limits)</li>
        <li>Reimbursement of any baggage fees you paid</li>
      </ul>

      <div className="bg-blue-50 p-6 rounded-lg my-4">
        <h4 className="font-semibold mb-2">Important Time Limits:</h4>
        <ul className="list-disc list-inside">
          <li>Damaged baggage: Report within 7 days of receiving your baggage</li>
          <li>Delayed baggage: Report immediately at the airport and file a written claim within 21 days</li>
          <li>Legal action: Must be initiated within 2 years from the date of arrival</li>
        </ul>
      </div>

      <h3>Steps to Take When Your Baggage is Mishandled</h3>

      <h4>For Delayed Baggage:</h4>
      <ol>
        <li>Report the missing baggage immediately at the airline's baggage desk before leaving the airport</li>
        <li>Complete a Property Irregularity Report (PIR) with detailed descriptions of your baggage</li>
        <li>Get a copy of the PIR and note the reference number</li>
        <li>Keep receipts for all essential items you purchase while waiting for your baggage</li>
        <li>Follow up with the airline regularly regarding the status of your baggage</li>
      </ol>

      <h4>For Damaged Baggage:</h4>
      <ol>
        <li>Report the damage immediately at the airport baggage desk</li>
        <li>Complete a Property Irregularity Report (PIR) detailing the damage</li>
        <li>Take photographs of the damaged baggage and items</li>
        <li>Follow up with a written claim within 7 days</li>
        <li>Provide evidence of the value of damaged items (receipts, photos, etc.)</li>
      </ol>

      <h4>For Lost Baggage:</h4>
      <ol>
        <li>If your baggage hasn't been found after 21 days, contact the airline to declare it officially lost</li>
        <li>Submit a detailed inventory of the contents of your baggage</li>
        <li>Provide evidence of the value of lost items where possible</li>
        <li>Submit a formal compensation claim to the airline</li>
      </ol>

      <h3>Maximizing Your Compensation Claim</h3>
      <p>
        To ensure you receive fair compensation:
      </p>
      <ul>
        <li>Keep detailed records of all communications with the airline</li>
        <li>Maintain a comprehensive inventory of your baggage contents, especially valuable items</li>
        <li>Take photographs of your baggage before travel when possible</li>
        <li>Keep receipts for valuable items in your luggage</li>
        <li>Be reasonable in your claims for essential purchases during delays</li>
        <li>Consider travel insurance that offers additional baggage protection</li>
      </ul>

      <h3>Airline Liability Limitations</h3>
      <p>
        It's important to understand that there are limitations to airline liability:
      </p>
      <ul>
        <li>Airlines typically won't compensate for fragile or perishable items</li>
        <li>High-value items like electronics, jewelry, or cash may not be fully covered</li>
        <li>Airlines often apply depreciation to the value of items</li>
        <li>There's a maximum liability cap (approximately 1,288 SDR)</li>
      </ul>
      <p>
        For particularly valuable items, consider carrying them in your cabin baggage or purchasing additional insurance.
      </p>

      <h3>Tips for Preventing Baggage Issues</h3>
      <ul>
        <li>Use distinctive luggage tags and identifiers</li>
        <li>Remove old airline tags from previous flights</li>
        <li>Place identification information inside your luggage as well as outside</li>
        <li>Consider using luggage tracking devices</li>
        <li>Take a photo of your packed luggage before closing it</li>
        <li>Arrive at the airport with sufficient time for proper baggage handling</li>
        <li>Pack essential items and valuables in your carry-on luggage</li>
      </ul>

      <p>
        While baggage issues can be frustrating, knowing your rights and taking prompt action can help ensure you receive
        appropriate compensation. Remember that airlines have a legal obligation to assist you with baggage problems, and
        you have the right to fair compensation for the inconvenience and financial impact caused by delayed, damaged, or lost luggage.
      </p>
    </RightsPageLayout>
  );
};

export default DelayedBaggageCompensation;
