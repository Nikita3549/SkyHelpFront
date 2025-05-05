
import React from "react";
import RightsPageLayout from "@/components/rights/RightsPageLayout";

const MissedConnectionCompensation = () => {
  const relatedLinks = [
    { title: "Air Passenger Rights", href: "/rights/air-passenger-rights" },
    { title: "Delayed Flight Compensation", href: "/rights/delayed-flight-compensation" },
    { title: "Flight Compensation", href: "/rights/flight-compensation" },
    { title: "Cancelled Flight Compensation", href: "/rights/cancelled-flight-compensation" }
  ];

  return (
    <RightsPageLayout
      title="Missed Connection Compensation"
      description="Your rights when you miss a connecting flight"
      metaTitle="Missed Connection Compensation Guide | CleverClaim"
      metaDescription="Learn about your passenger rights and how to claim compensation when you miss a connecting flight due to a delay or cancellation under EU Regulation 261/2004."
      relatedLinks={relatedLinks}
    >
      <h2>Understanding Your Rights for Missed Connection Flights</h2>
      <p>
        Missing a connecting flight can be extremely frustrating and disruptive to your travel plans. However, under EU Regulation 261/2004, 
        you may be entitled to compensation if you miss your connection due to a delay or cancellation of your initial flight. 
        This guide explains when you're eligible for compensation and how to claim it.
      </p>

      <h3>When Are You Eligible for Missed Connection Compensation?</h3>
      <p>
        You may be entitled to compensation for a missed connection if:
      </p>
      <ul>
        <li>Both flights were part of the same booking (not separate bookings)</li>
        <li>Your first flight was delayed, causing you to miss your connection</li>
        <li>You arrived at your final destination at least 3 hours later than scheduled</li>
        <li>The delay was not caused by extraordinary circumstances</li>
        <li>The first flight departed from an EU airport, or was operated by an EU airline flying into an EU airport</li>
      </ul>
      <p>
        The key factor is that both flights must be part of the same reservation. If you booked the flights separately, 
        the airline operating the first flight isn't responsible for you making your second flight.
      </p>

      <h3>Compensation Amounts for Missed Connections</h3>
      <p>
        Compensation is calculated based on the total distance of all flight segments to your final destination:
      </p>
      <ul>
        <li><strong>€250</strong> for flights up to 1,500 km</li>
        <li><strong>€400</strong> for flights between 1,500 and 3,500 km</li>
        <li><strong>€600</strong> for flights over 3,500 km</li>
      </ul>
      <p>
        For example, if you're flying from London to Sydney via Dubai and your London to Dubai flight is delayed causing you to miss your 
        connection, the compensation would be calculated based on the total distance from London to Sydney.
      </p>

      <div className="bg-blue-50 p-6 rounded-lg my-6">
        <h4 className="font-semibold mb-2">Important to Know:</h4>
        <p>
          For long-distance flights (over 3,500 km), if the delay at your final destination is between 3 and 4 hours, 
          the compensation may be reduced by 50%. This means you would receive €300 instead of €600.
        </p>
      </div>

      <h3>Additional Rights When Missing a Connection</h3>
      <p>
        Besides financial compensation, when you miss a connection, the airline must offer you:
      </p>
      <ol>
        <li>
          <strong>Re-routing</strong> to your final destination at the earliest opportunity, or
        </li>
        <li>
          <strong>Reimbursement</strong> of the full cost of your ticket and, when relevant, a return flight to your first point of departure
        </li>
      </ol>

      <h3>Right to Care While Waiting</h3>
      <p>
        While waiting for your re-routed flight, the airline must provide:
      </p>
      <ul>
        <li>Meals and refreshments proportionate to the waiting time</li>
        <li>Two telephone calls, emails, or faxes</li>
        <li>Hotel accommodation if an overnight stay becomes necessary</li>
        <li>Transport between the airport and the hotel</li>
      </ul>

      <h3>What Are "Extraordinary Circumstances"?</h3>
      <p>
        Airlines can avoid paying compensation if they can prove the missed connection was caused by "extraordinary circumstances" 
        beyond their control. These include:
      </p>
      <ul>
        <li>Severe weather conditions</li>
        <li>Political instability</li>
        <li>Security risks</li>
        <li>Air traffic control restrictions</li>
        <li>Strikes affecting airport operations (but not airline staff strikes)</li>
        <li>Bird strikes that cause damage requiring immediate aircraft inspection</li>
      </ul>
      <p>
        However, most technical issues, including those discovered during routine maintenance, are NOT considered 
        extraordinary circumstances following European Court of Justice rulings.
      </p>

      <h3>Common Missed Connection Scenarios</h3>

      <h4>Scenario 1: Multiple Flights on Same Booking with Same Airline</h4>
      <p>
        If all your flights are with the same airline and part of the same booking, the process is straightforward. 
        If your first flight is delayed and causes you to miss a connection, you may be eligible for compensation 
        if you arrive at your final destination at least 3 hours late.
      </p>

      <h4>Scenario 2: Different Airlines but Single Booking</h4>
      <p>
        If you booked a journey with connecting flights operated by different airlines but under a single booking 
        (e.g., through an airline alliance), the marketing airline (the one you booked with) is typically responsible 
        for handling your compensation claim.
      </p>

      <h4>Scenario 3: Self-Transfer (Separate Bookings)</h4>
      <p>
        If you booked your flights separately (self-transfer), you generally won't be entitled to missed connection 
        compensation, as each airline is only responsible for their own flight. However, you may still claim for the 
        individual flight if it was delayed or cancelled.
      </p>

      <h3>How to Claim Compensation for a Missed Connection</h3>
      <ol>
        <li>Gather evidence: Keep your boarding passes, booking confirmation, and any communication from the airline</li>
        <li>Document the delay: Take photos of information boards showing delays, keep any written explanations provided by the airline</li>
        <li>Contact the airline: Submit a formal claim to the airline you booked with, referencing EU Regulation 261/2004</li>
        <li>Be precise: Include all relevant flight details, the reason for the missed connection, and how long you were delayed at your final destination</li>
        <li>If rejected, consider escalating: Contact a national enforcement body or seek professional help</li>
      </ol>

      <p>
        Missing a connection can significantly disrupt your travel plans, but EU regulations offer substantial protection to passengers. 
        Don't hesitate to claim the compensation you're entitled to, especially when the disruption causes a significant delay 
        at your final destination.
      </p>
    </RightsPageLayout>
  );
};

export default MissedConnectionCompensation;
