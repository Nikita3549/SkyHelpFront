
import React from "react";
import RightsPageLayout from "@/components/rights/RightsPageLayout";

const CancelledFlightCompensation = () => {
  const relatedLinks = [
    { title: "Air Passenger Rights", href: "/rights/air-passenger-rights" },
    { title: "Delayed Flight Compensation", href: "/rights/delayed-flight-compensation" },
    { title: "Flight Compensation", href: "/rights/flight-compensation" },
    { title: "Airline Strike Compensation", href: "/rights/airline-strike-compensation" }
  ];

  return (
    <RightsPageLayout
      title="Cancelled Flight Compensation"
      description="Learn how to claim up to €600 for your cancelled flight"
      metaTitle="Cancelled Flight Compensation Guide | CleverClaim"
      metaDescription="Everything you need to know about claiming compensation for cancelled flights under EU Regulation 261/2004 and how to get up to €600 in compensation."
      relatedLinks={relatedLinks}
    >
      <h2>Your Rights When Your Flight is Cancelled</h2>
      <p>
        Having your flight cancelled can be a major disruption to your travel plans. Fortunately, EU Regulation 261/2004 
        provides robust protection for passengers affected by flight cancellations. This guide explains your rights and 
        how to claim the compensation you may be entitled to.
      </p>

      <h3>When Are You Entitled to Compensation?</h3>
      <p>
        Under EU Regulation 261/2004, you may be entitled to compensation for a cancelled flight if:
      </p>
      <ul>
        <li>Your flight was scheduled to depart from an EU airport, or was operated by an EU airline flying into an EU airport</li>
        <li>You were informed of the cancellation less than 14 days before the scheduled departure</li>
        <li>The cancellation was not caused by extraordinary circumstances</li>
      </ul>

      <h3>Compensation Amounts for Cancelled Flights</h3>
      <p>
        If you're eligible, the compensation amounts are:
      </p>
      <ul>
        <li><strong>€250</strong> for flights up to 1,500 km</li>
        <li><strong>€400</strong> for flights between 1,500 and 3,500 km</li>
        <li><strong>€600</strong> for flights over 3,500 km</li>
      </ul>

      <div className="bg-blue-50 p-6 rounded-lg my-4">
        <h4 className="font-semibold mb-2">Notice Period Exceptions:</h4>
        <p>
          You may not be entitled to compensation if the airline:
        </p>
        <ul className="list-disc list-inside">
          <li>Informed you more than 14 days before your scheduled departure date</li>
          <li>Informed you between 7 and 14 days before departure and offered re-routing that departed no more than 2 hours before and arrived less than 4 hours after your original flight</li>
          <li>Informed you less than 7 days before departure and offered re-routing that departed no more than 1 hour before and arrived less than 2 hours after your original flight</li>
        </ul>
      </div>

      <h3>Your Additional Rights When a Flight is Cancelled</h3>
      <p>
        Besides financial compensation, when your flight is cancelled, you have the right to choose between:
      </p>
      <ol>
        <li><strong>Reimbursement</strong> of the full cost of your ticket for the unused parts of your journey</li>
        <li><strong>Re-routing</strong> to your final destination at the earliest opportunity</li>
        <li><strong>Re-routing</strong> at a later date of your convenience, subject to seat availability</li>
      </ol>

      <h3>Right to Care During Cancellations</h3>
      <p>
        While waiting for your re-routed flight, the airline must provide:
      </p>
      <ul>
        <li>Meals and refreshments proportionate to the waiting time</li>
        <li>Two telephone calls, emails, or faxes</li>
        <li>Hotel accommodation if an overnight stay becomes necessary</li>
        <li>Transport between the airport and the hotel</li>
      </ul>
      <p>
        These rights apply regardless of whether you're entitled to compensation or not.
      </p>

      <h3>What Are "Extraordinary Circumstances"?</h3>
      <p>
        Airlines can avoid paying compensation if they can prove the cancellation was caused by "extraordinary circumstances" 
        that could not have been avoided even if all reasonable measures had been taken. These include:
      </p>
      <ul>
        <li>Severe weather conditions (like storms or heavy snowfall)</li>
        <li>Political instability</li>
        <li>Security risks</li>
        <li>Unexpected flight safety shortcomings</li>
        <li>Air traffic control restrictions</li>
        <li>Strikes that affect airport operations (but not airline staff strikes)</li>
      </ul>
      <p>
        Important to note: Technical issues with the aircraft are generally NOT considered extraordinary circumstances following 
        European Court of Justice rulings, as they're considered part of the normal operation of an airline.
      </p>

      <h3>How to Claim Compensation for a Cancelled Flight</h3>
      <ol>
        <li>Gather all documentation related to your flight (booking confirmation, communication about the cancellation)</li>
        <li>Check if you're eligible based on the notice period and circumstances of the cancellation</li>
        <li>Contact the airline directly through their official channels with your claim</li>
        <li>Include details of your flight, the cancellation, and reference the relevant EU regulation</li>
        <li>If rejected, consider escalating to a national enforcement body or seeking professional help</li>
      </ol>

      <h3>Common Questions About Cancelled Flight Compensation</h3>

      <h4>Can I claim if my flight was cancelled due to COVID-19?</h4>
      <p>
        Generally, cancellations due to government travel restrictions related to COVID-19 would likely be considered 
        extraordinary circumstances. However, each case is unique and may have different outcomes.
      </p>

      <h4>What if I accepted a voucher instead of a refund?</h4>
      <p>
        Accepting a voucher for a future flight doesn't necessarily affect your right to claim compensation. However, 
        if you accepted a voucher explicitly as a full settlement for all claims, this might impact your case.
      </p>

      <h4>Can I claim for expenses incurred due to the cancellation?</h4>
      <p>
        EU261 compensation is standardized and doesn't cover additional expenses. However, you might be able to claim for reasonable 
        expenses through your travel insurance or, in some cases, from the airline if they failed to provide the care they were required to.
      </p>

      <p>
        Remember, airlines often reject initial claims or offer vouchers instead of cash compensation. Be persistent and know 
        that you have the right to receive monetary compensation if you're eligible under the regulation.
      </p>
    </RightsPageLayout>
  );
};

export default CancelledFlightCompensation;
