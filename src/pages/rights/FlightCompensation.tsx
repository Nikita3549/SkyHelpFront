
import React from "react";
import RightsPageLayout from "@/components/rights/RightsPageLayout";

const FlightCompensation = () => {
  const relatedLinks = [
    { title: "Air Passenger Rights", href: "/rights/air-passenger-rights" },
    { title: "Delayed Flight Compensation", href: "/rights/delayed-flight-compensation" },
    { title: "Cancelled Flight Compensation", href: "/rights/cancelled-flight-compensation" },
    { title: "Denied Boarding Compensation", href: "/rights/denied-boarding-compensation" }
  ];

  return (
    <RightsPageLayout
      title="Flight Compensation Guide"
      description="Comprehensive guide to claiming compensation for flight disruptions"
      metaTitle="Flight Compensation Guide | EU261 Compensation | CleverClaim"
      metaDescription="Complete guide to claiming flight compensation under EU Regulation 261/2004 for delays, cancellations, and denied boarding incidents."
      relatedLinks={relatedLinks}
    >
      <h2>Your Complete Guide to Flight Compensation</h2>
      <p>
        When your flight doesn't go according to plan, you may be entitled to significant compensation under EU law. 
        This comprehensive guide explains your rights as a passenger, the circumstances under which you can claim, and 
        how to secure the compensation you deserve for various flight disruptions.
      </p>

      <h3>Understanding EU Regulation 261/2004</h3>
      <p>
        EU Regulation 261/2004 is the cornerstone of passenger rights in Europe. It provides standardized rules for 
        compensation and assistance to passengers in cases of:
      </p>
      <ul>
        <li>Flight delays of 3 hours or more</li>
        <li>Flight cancellations</li>
        <li>Denied boarding (often due to overbooking)</li>
        <li>Missed connections (when both flights are on the same booking)</li>
      </ul>
      <p>
        This regulation applies to:
      </p>
      <ul>
        <li>All flights departing from an EU airport, regardless of the airline</li>
        <li>All flights arriving at an EU airport operated by an EU-based airline</li>
        <li>Flights to/from Iceland, Norway, and Switzerland (even though they're not EU members)</li>
      </ul>

      <h3>Compensation Amounts: What You Can Claim</h3>
      <p>
        Under EU261, compensation amounts are fixed based on the flight distance:
      </p>
      <div className="overflow-x-auto my-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-gray-200">Flight Distance</th>
              <th className="py-2 px-4 border border-gray-200">Compensation Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border border-gray-200">Flights up to 1,500 km</td>
              <td className="py-2 px-4 border border-gray-200">€250 (approximately $300)</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-gray-200">Flights between 1,500-3,500 km</td>
              <td className="py-2 px-4 border border-gray-200">€400 (approximately $480)</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border border-gray-200">Flights over 3,500 km</td>
              <td className="py-2 px-4 border border-gray-200">€600 (approximately $720)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        For long-distance flights (over 3,500 km), if the delay at your final destination is between 3 and 4 hours, 
        the compensation may be reduced by 50%.
      </p>

      <h3>Types of Flight Disruptions and Your Entitlements</h3>

      <h4>Flight Delays</h4>
      <p>
        You're entitled to compensation if:
      </p>
      <ul>
        <li>Your flight arrives at the final destination 3 or more hours later than scheduled</li>
        <li>The delay wasn't caused by extraordinary circumstances</li>
      </ul>
      <p>
        For delays of 2 hours or more, the airline must also provide:
      </p>
      <ul>
        <li>Meals and refreshments</li>
        <li>Two phone calls or emails</li>
        <li>Hotel accommodation and transport (if overnight stay is required)</li>
      </ul>

      <h4>Flight Cancellations</h4>
      <p>
        You're entitled to compensation if:
      </p>
      <ul>
        <li>You were informed less than 14 days before departure</li>
        <li>The cancellation wasn't caused by extraordinary circumstances</li>
      </ul>
      <p>
        Additionally, the airline must offer you the choice between:
      </p>
      <ul>
        <li>A full refund of your ticket</li>
        <li>An alternative flight to your destination at the earliest opportunity</li>
        <li>Re-booking at a later date of your convenience</li>
      </ul>

      <h4>Denied Boarding (Overbooking)</h4>
      <p>
        If you're involuntarily denied boarding (typically due to overbooking), you're entitled to:
      </p>
      <ul>
        <li>Immediate compensation (€250-€600 depending on flight distance)</li>
        <li>A choice between refund, re-routing, or rebooking</li>
        <li>Care and assistance (meals, accommodation if necessary)</li>
      </ul>
      <p>
        This doesn't apply if you were denied boarding for reasonable grounds such as health, safety, or inadequate travel documentation.
      </p>

      <div className="bg-blue-50 p-6 rounded-lg my-6">
        <h4 className="font-semibold mb-2">What Are "Extraordinary Circumstances"?</h4>
        <p>
          Airlines can avoid paying compensation if the disruption was caused by "extraordinary circumstances" that 
          could not have been avoided even if all reasonable measures had been taken. These include:
        </p>
        <ul className="list-disc list-inside">
          <li>Extreme weather conditions</li>
          <li>Political instability</li>
          <li>Security risks</li>
          <li>Air traffic control restrictions</li>
          <li>Strikes affecting airport operations (not airline staff strikes)</li>
          <li>Bird strikes that require immediate aircraft checks</li>
        </ul>
        <p className="mt-2">
          Important: Following European Court rulings, most technical problems are NOT considered extraordinary circumstances, 
          as they are deemed part of an airline's normal operations.
        </p>
      </div>

      <h3>How to Claim Your Compensation: Step-by-Step</h3>
      <ol>
        <li>
          <strong>Gather documentation:</strong>
          <ul>
            <li>Booking confirmation</li>
            <li>Boarding passes</li>
            <li>Any communication from the airline about the disruption</li>
            <li>Receipts for additional expenses incurred due to the disruption</li>
          </ul>
        </li>
        <li>
          <strong>Calculate your entitlement:</strong>
          <ul>
            <li>Check the flight distance to determine the potential compensation amount</li>
            <li>Verify that the delay at your final destination was 3+ hours (for delays)</li>
          </ul>
        </li>
        <li>
          <strong>Submit a claim to the airline:</strong>
          <ul>
            <li>Use the airline's official claim form if available</li>
            <li>Otherwise, send a formal letter or email to their customer service</li>
            <li>Include all relevant details and reference EU Regulation 261/2004</li>
          </ul>
        </li>
        <li>
          <strong>Follow up persistently:</strong>
          <ul>
            <li>Airlines often initially reject claims or offer vouchers instead</li>
            <li>Be prepared to send multiple reminders and supporting documentation</li>
          </ul>
        </li>
        <li>
          <strong>Escalate if necessary:</strong>
          <ul>
            <li>Contact the relevant national enforcement body (varies by country)</li>
            <li>Consider using alternative dispute resolution</li>
            <li>As a last resort, consider small claims court</li>
            <li>Or seek professional help from a specialist company like CleverClaim</li>
          </ul>
        </li>
      </ol>

      <h3>Time Limits for Claims</h3>
      <p>
        The time limit for filing a claim depends on the departure country:
      </p>
      <ul>
        <li>Belgium, Poland, Slovakia: 1 year</li>
        <li>Croatia, Czech Republic, Denmark, Finland, Latvia, Norway, Portugal, Spain, Switzerland: 2 years</li>
        <li>Austria, Germany, Estonia, Greece, Iceland, Netherlands, Romania, Slovenia, Sweden: 3 years</li>
        <li>France, Hungary, Italy: 5 years</li>
        <li>United Kingdom: 6 years (5 years in Scotland)</li>
      </ul>
      <p>
        It's advisable to claim as soon as possible after the disruption, while evidence is still fresh and readily available.
      </p>

      <h3>Common Challenges and How to Overcome Them</h3>
      <ul>
        <li>
          <strong>Airline claims "extraordinary circumstances":</strong> Request specific details about the circumstances 
          and research if similar cases have been ruled in passengers' favor.
        </li>
        <li>
          <strong>Airline offers vouchers instead of cash:</strong> You have the right to insist on monetary compensation. 
          Only accept vouchers if their value exceeds your legal entitlement.
        </li>
        <li>
          <strong>Airline doesn't respond:</strong> Follow up with reminders and consider escalating to national enforcement bodies.
        </li>
        <li>
          <strong>Technical difficulties with online claim forms:</strong> Resort to formal emails or letters to the airline's customer service.
        </li>
      </ul>

      <p>
        While claiming flight compensation can sometimes be a time-consuming process, persistence pays off. EU regulations 
        provide strong protection for passengers, and you're entitled to claim what you're legally owed. If the process seems 
        daunting, specialized companies like CleverClaim can handle your case on a no-win, no-fee basis, ensuring you receive 
        the compensation you deserve without the hassle.
      </p>
    </RightsPageLayout>
  );
};

export default FlightCompensation;
