
import React from "react";
import RightsPageLayout from "@/components/rights/RightsPageLayout";

const AirlineStrikeCompensation = () => {
  const relatedLinks = [
    { title: "Air Passenger Rights", href: "/rights/air-passenger-rights" },
    { title: "Cancelled Flight Compensation", href: "/rights/cancelled-flight-compensation" },
    { title: "Delayed Flight Compensation", href: "/rights/delayed-flight-compensation" },
    { title: "Flight Compensation", href: "/rights/flight-compensation" }
  ];

  return (
    <RightsPageLayout
      title="Airline Strike Compensation"
      description="Your rights during airline strikes and how to claim compensation"
      metaTitle="Airline Strike Compensation Guide | CleverClaim"
      metaDescription="Learn about your passenger rights during airline strikes and how to claim compensation for flights disrupted by strike action under EU Regulation 261/2004."
      relatedLinks={relatedLinks}
    >
      <h2>Understanding Compensation for Flights Disrupted by Strikes</h2>
      <p>
        Airline strikes can cause significant disruption to travel plans, resulting in delays and cancellations. 
        Understanding your rights during such events is crucial. This guide explains when you might be entitled to 
        compensation for flight disruptions caused by strikes and how to claim it.
      </p>

      <h3>Types of Strikes Affecting Air Travel</h3>
      <p>
        Different types of strikes can affect your flight, and your eligibility for compensation varies accordingly:
      </p>
      <ul>
        <li>
          <strong>Airline Staff Strikes</strong> (pilots, cabin crew, airline employees): These strikes are generally 
          considered within the airline's control, and you may be entitled to compensation.
        </li>
        <li>
          <strong>Third-Party Strikes</strong> (air traffic controllers, airport staff, security personnel): These are typically 
          considered outside the airline's control ("extraordinary circumstances"), and compensation may not be applicable.
        </li>
      </ul>

      <div className="bg-blue-50 p-6 rounded-lg my-4">
        <h4 className="font-semibold mb-2">Recent Court Rulings:</h4>
        <p>
          In April 2018, the European Court of Justice ruled that "wildcat strikes" by airline staff following 
          surprising restructuring announcements cannot be considered "extraordinary circumstances." This important ruling 
          means airlines cannot use such strikes as an excuse to avoid paying compensation.
        </p>
      </div>

      <h3>When Can You Claim Compensation for Strikes?</h3>
      <p>
        You may be entitled to compensation under EU Regulation 261/2004 if:
      </p>
      <ul>
        <li>Your flight was cancelled or delayed by more than 3 hours due to an airline staff strike</li>
        <li>You received less than 14 days' notice of the cancellation</li>
        <li>Your flight was departing from an EU airport, or was operated by an EU airline flying to an EU airport</li>
        <li>The strike is considered within the airline's control</li>
      </ul>

      <h3>Compensation Amounts for Strike-Related Disruptions</h3>
      <p>
        If eligible, you could receive:
      </p>
      <ul>
        <li><strong>€250</strong> for flights up to 1,500 km</li>
        <li><strong>€400</strong> for flights between 1,500 and 3,500 km</li>
        <li><strong>€600</strong> for flights over 3,500 km</li>
      </ul>

      <h3>Your Right to Care During Strikes</h3>
      <p>
        Regardless of whether you're entitled to compensation, airlines have a "duty of care" during strikes. This means they should provide:
      </p>
      <ul>
        <li>Meals and refreshments for delays proportionate to the waiting time</li>
        <li>Two telephone calls, emails, or faxes</li>
        <li>Hotel accommodation if an overnight stay becomes necessary</li>
        <li>Transport between the airport and the hotel</li>
      </ul>
      <p>
        This duty of care applies even during strikes considered "extraordinary circumstances."
      </p>

      <h3>Your Right to Reimbursement or Re-routing</h3>
      <p>
        If your flight is cancelled due to a strike, you always have the right to choose between:
      </p>
      <ol>
        <li><strong>Reimbursement</strong> of your ticket cost within 7 days</li>
        <li><strong>Re-routing</strong> to your final destination at the earliest opportunity</li>
        <li><strong>Re-routing</strong> at a later date of your convenience, subject to seat availability</li>
      </ol>

      <h3>How to Claim Compensation for Strike-Related Disruptions</h3>
      <ol>
        <li>Gather evidence: Keep your booking confirmation, any communication about the disruption, and boarding passes</li>
        <li>Determine the cause: Research the specific strike that affected your flight to understand if it was airline staff or third-party</li>
        <li>Contact the airline: Submit a formal claim to the airline, referencing EU Regulation 261/2004</li>
        <li>Be specific: Include all flight details, how long you were delayed, and any relevant information about the strike</li>
        <li>Be persistent: Airlines often initially reject claims related to strikes, claiming extraordinary circumstances</li>
      </ol>

      <h3>Common Scenarios and Their Outcomes</h3>

      <h4>Scenario 1: Pilot Strike at Your Airline</h4>
      <p>
        If your flight is cancelled due to your airline's pilots going on strike, you would typically be entitled to compensation, 
        as this is considered within the airline's control. Recent court rulings support this position.
      </p>

      <h4>Scenario 2: Air Traffic Control Strike</h4>
      <p>
        If your flight is disrupted due to an air traffic control strike, this would generally be considered outside the 
        airline's control. You would still be entitled to care and assistance, but not financial compensation under EU261.
      </p>

      <h4>Scenario 3: Airport Staff Strike</h4>
      <p>
        Strikes by airport staff (security, ground handlers, etc.) are typically considered extraordinary circumstances. 
        While you wouldn't be entitled to compensation, you should still receive care and assistance during the disruption.
      </p>

      <h3>Tips for Dealing with Strike-Related Disruptions</h3>
      <ul>
        <li>Stay informed: Sign up for flight status alerts and monitor your airline's communication channels</li>
        <li>Be proactive: If you know about a strike in advance, contact your airline to discuss options</li>
        <li>Keep receipts: If you incur expenses due to the disruption, keep all receipts for potential reimbursement</li>
        <li>Be flexible: Sometimes accepting an alternative flight or route might be more practical than waiting for the strike to end</li>
        <li>Consider travel insurance: Some policies cover strike-related disruptions, which can provide additional protection</li>
      </ul>

      <p>
        While strikes can be particularly frustrating due to their unpredictable nature, passengers do have rights. 
        The key factor in determining compensation eligibility is whether the strike involves the airline's own staff or 
        third parties. Keep in mind that even if you're not entitled to compensation, you should always receive appropriate 
        care and assistance during the disruption.
      </p>
    </RightsPageLayout>
  );
};

export default AirlineStrikeCompensation;
