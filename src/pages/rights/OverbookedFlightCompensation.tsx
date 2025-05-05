
import React from "react";
import RightsPageLayout from "@/components/rights/RightsPageLayout";

const OverbookedFlightCompensation = () => {
  const relatedLinks = [
    { title: "Air Passenger Rights", href: "/rights/air-passenger-rights" },
    { title: "Denied Boarding Compensation", href: "/rights/denied-boarding-compensation" },
    { title: "Cancelled Flight Compensation", href: "/rights/cancelled-flight-compensation" },
    { title: "Flight Compensation", href: "/rights/flight-compensation" }
  ];

  return (
    <RightsPageLayout
      title="Overbooked Flight Compensation"
      description="Know your rights when denied boarding due to overbooking"
      metaTitle="Overbooked Flight Compensation Guide | CleverClaim"
      metaDescription="Learn how to claim compensation of up to €600 when you've been denied boarding due to an overbooked flight under EU Regulation 261/2004."
      relatedLinks={relatedLinks}
    >
      <h2>Understanding Overbooked Flights and Your Rights</h2>
      <p>
        Airlines routinely sell more tickets than there are seats available on a flight, a practice known as overbooking. 
        They do this based on the statistical likelihood that some passengers won't show up. However, when all passengers do 
        turn up, the airline must deny boarding to some travelers. If you're one of those affected, you have significant rights 
        under EU Regulation 261/2004.
      </p>

      <h3>What is Flight Overbooking?</h3>
      <p>
        Flight overbooking is a common practice where airlines sell more tickets than available seats on a flight. Airlines use 
        historical data to predict how many passengers will likely miss their flight due to changes in travel plans, connections, 
        or other reasons. While this helps airlines maximize revenue and reduce empty seats, it can result in some passengers being 
        denied boarding when everyone shows up.
      </p>

      <h3>Your Rights When Denied Boarding Due to Overbooking</h3>
      <p>
        If you're denied boarding due to an overbooked flight, EU Regulation 261/2004 provides you with the following rights:
      </p>

      <h4>Right to Compensation</h4>
      <p>
        You are entitled to immediate financial compensation:
      </p>
      <ul>
        <li><strong>€250</strong> for flights up to 1,500 km</li>
        <li><strong>€400</strong> for flights between 1,500 and 3,500 km</li>
        <li><strong>€600</strong> for flights over 3,500 km</li>
      </ul>

      <h4>Right to Choose Between</h4>
      <ul>
        <li><strong>Reimbursement</strong> of the full cost of your ticket for the unused parts of your journey</li>
        <li><strong>Re-routing</strong> to your final destination as soon as possible</li>
        <li><strong>Re-routing</strong> at a later date of your convenience, subject to seat availability</li>
      </ul>

      <h4>Right to Care</h4>
      <p>
        While waiting for your re-routed flight, you are entitled to:
      </p>
      <ul>
        <li>Meals and refreshments proportionate to the waiting time</li>
        <li>Two telephone calls, emails, or faxes</li>
        <li>Hotel accommodation if an overnight stay becomes necessary</li>
        <li>Transport between the airport and the hotel</li>
      </ul>

      <h3>Voluntary vs. Involuntary Denied Boarding</h3>
      <p>
        When a flight is overbooked, airlines typically:
      </p>
      <ol>
        <li>
          <strong>First ask for volunteers</strong> who are willing to give up their seats in exchange for benefits 
          (like vouchers, upgrades, or cash). If you accept this voluntary offer, you waive your right to the standard 
          compensation but should still receive assistance and re-routing.
        </li>
        <li>
          <strong>If not enough passengers volunteer</strong>, the airline will deny boarding to selected passengers involuntarily. 
          These passengers are entitled to the full compensation and rights under EU261.
        </li>
      </ol>

      <div className="bg-blue-50 p-6 rounded-lg my-6">
        <h4 className="font-semibold text-lg mb-2">Important to Know:</h4>
        <p>
          If you're denied boarding involuntarily, the airline must compensate you immediately at the airport. Don't accept vouchers 
          unless their value exceeds the compensation you're entitled to by law. The compensation is your legal right, not a goodwill 
          gesture from the airline.
        </p>
      </div>

      <h3>Exceptions to Compensation</h3>
      <p>
        You may not be entitled to compensation if:
      </p>
      <ul>
        <li>You voluntarily gave up your seat in exchange for benefits</li>
        <li>You arrived at the check-in counter later than the minimum time specified</li>
        <li>You don't have the correct travel documentation</li>
        <li>There are reasonable grounds to deny boarding, such as health, safety, or security reasons</li>
      </ul>

      <h3>How to Claim Compensation for an Overbooked Flight</h3>
      <p>
        If you've been denied boarding due to overbooking, follow these steps:
      </p>
      <ol>
        <li>Make sure you get written confirmation of why you were denied boarding</li>
        <li>Keep all documentation related to the incident and your original booking</li>
        <li>Gather evidence of any additional expenses incurred due to the denied boarding</li>
        <li>Contact the airline directly and submit a formal claim for compensation</li>
        <li>If the airline refuses to compensate you adequately, consider seeking professional help</li>
      </ol>

      <h3>Time Limits for Making a Claim</h3>
      <p>
        The time limit for filing a claim varies depending on the departure country:
      </p>
      <ul>
        <li>1-2 years in some EU countries</li>
        <li>Up to 6 years in the UK</li>
      </ul>
      <p>
        It's advisable to submit your claim as soon as possible while the details are fresh and documentation is readily available.
      </p>

      <h3>Maximizing Your Rights When Faced with an Overbooked Flight</h3>
      <p>
        Here are some practical tips:
      </p>
      <ul>
        <li>Check in online as early as possible to secure your seat</li>
        <li>Arrive at the airport well before the recommended check-in time</li>
        <li>If asked to volunteer, negotiate for benefits beyond the legal minimum compensation</li>
        <li>Keep all documentation related to your booking and the disruption</li>
        <li>Be polite but firm when asserting your rights</li>
      </ul>

      <p>
        Remember, being denied boarding due to overbooking is not your fault, and you have clear rights under EU law. 
        Airlines have a legal obligation to inform you of your rights when you're denied boarding and to provide 
        the compensation you're entitled to.
      </p>
    </RightsPageLayout>
  );
};

export default OverbookedFlightCompensation;
