
import React from "react";
import RightsPageLayout from "@/components/rights/RightsPageLayout";

const DeniedBoardingCompensation = () => {
  const relatedLinks = [
    { title: "Air Passenger Rights", href: "/rights/air-passenger-rights" },
    { title: "Overbooked Flight Compensation", href: "/rights/overbooked-flight-compensation" },
    { title: "Cancelled Flight Compensation", href: "/rights/cancelled-flight-compensation" },
    { title: "Flight Compensation", href: "/rights/flight-compensation" }
  ];

  return (
    <RightsPageLayout
      title="Denied Boarding Compensation"
      description="Your rights when you're denied boarding a flight"
      metaTitle="Denied Boarding Compensation Guide | CleverClaim"
      metaDescription="Learn about your rights and how to claim compensation when denied boarding a flight under EU Regulation 261/2004."
      relatedLinks={relatedLinks}
    >
      <h2>Understanding Denied Boarding and Your Rights to Compensation</h2>
      <p>
        Being denied boarding is a frustrating experience that can severely disrupt your travel plans. Under EU Regulation 261/2004, 
        passengers have specific rights when they're denied boarding against their will. This guide will help you understand when you're 
        eligible for compensation and how to claim it.
      </p>

      <h3>What Qualifies as Denied Boarding?</h3>
      <p>
        Denied boarding occurs when an airline refuses to carry passengers on a flight despite them having:
      </p>
      <ul>
        <li>A valid ticket and booking confirmation</li>
        <li>Checked in on time (or at least within the airline's stated deadline)</li>
        <li>The necessary travel documents (passport, visa, etc.)</li>
      </ul>
      <p>
        The most common reason for denied boarding is overbooking, where airlines sell more tickets than available seats on the flight. 
        However, denied boarding can also occur for other reasons, such as operational changes to aircraft with fewer seats.
      </p>

      <h3>Compensation for Denied Boarding</h3>
      <p>
        If you're involuntarily denied boarding, you're entitled to immediate compensation:
      </p>
      <ul>
        <li><strong>€250</strong> for flights up to 1,500 km</li>
        <li><strong>€400</strong> for flights between 1,500 and 3,500 km</li>
        <li><strong>€600</strong> for flights over 3,500 km</li>
      </ul>

      <h3>Additional Rights When Denied Boarding</h3>
      <p>
        Besides financial compensation, you have the right to choose between:
      </p>
      <ol>
        <li>
          <strong>Reimbursement</strong> of your ticket cost within 7 days (for the part or parts of the journey not made, 
          and for parts already made if the flight no longer serves any purpose in relation to your original travel plan)
        </li>
        <li>
          <strong>Re-routing</strong> to your final destination at the earliest opportunity
        </li>
        <li>
          <strong>Re-routing</strong> at a later date at your convenience, subject to availability of seats
        </li>
      </ol>

      <h3>Right to Care</h3>
      <p>
        While waiting for your re-routed flight, the airline must provide:
      </p>
      <ul>
        <li>Meals and refreshments proportionate to the waiting time</li>
        <li>Two telephone calls, emails, or faxes</li>
        <li>Hotel accommodation if an overnight stay becomes necessary</li>
        <li>Transport between the airport and the hotel</li>
      </ul>

      <div className="bg-blue-50 p-6 rounded-lg my-4">
        <h4 className="font-semibold mb-2">Voluntary vs. Involuntary Denied Boarding:</h4>
        <p>
          When flights are overbooked, airlines typically ask for volunteers to give up their seats in exchange for benefits 
          (like travel vouchers or upgrades). If you <strong>voluntarily</strong> surrender your seat, you're not entitled to the standard 
          denied boarding compensation, but you should still receive assistance and the benefits agreed upon with the airline.
        </p>
        <p className="mt-2">
          Only if you're <strong>involuntarily</strong> denied boarding are you entitled to the full compensation under EU261.
        </p>
      </div>

      <h3>Exceptions - When Denied Boarding is Justified</h3>
      <p>
        You may not be entitled to compensation if you're denied boarding for "reasonable grounds," such as:
      </p>
      <ul>
        <li>Health, safety, or security reasons</li>
        <li>Inadequate travel documentation (missing or invalid passport, visa, etc.)</li>
        <li>Arriving at the gate after it has closed</li>
        <li>Being under the influence of alcohol or drugs</li>
        <li>Demonstrating aggressive or disruptive behavior</li>
      </ul>

      <h3>How to Claim Compensation for Denied Boarding</h3>
      <p>
        If you've been involuntarily denied boarding, follow these steps:
      </p>
      <ol>
        <li>Request written confirmation from the airline stating why you were denied boarding</li>
        <li>Keep all documentation including your boarding pass, ticket, and any communication from the airline</li>
        <li>Take note of the actual timing of events and any alternatives offered</li>
        <li>Contact the airline directly with your claim, referencing EU Regulation 261/2004</li>
        <li>If the airline doesn't respond adequately, consider escalating to a national enforcement body or seeking professional help</li>
      </ol>

      <h3>Tips for Avoiding Denied Boarding</h3>
      <p>
        While you can't prevent overbooking, you can minimize your risk of being selected for denied boarding:
      </p>
      <ul>
        <li>Check in online as early as possible</li>
        <li>Arrive at the airport well before the recommended check-in time</li>
        <li>If you're a frequent flyer with the airline or have elite status, make sure your number is included in your booking</li>
        <li>Consider paying for seat selection if it's important to guarantee your spot</li>
      </ul>

      <h3>Frequently Asked Questions</h3>

      <h4>Can the airline deny me boarding if the flight is overbooked?</h4>
      <p>
        Yes, airlines legally can overbook flights and deny boarding to some passengers. However, they must first ask for volunteers 
        and offer compensation before involuntarily denying boarding. If you're involuntarily denied boarding, you're entitled to 
        immediate compensation under EU law.
      </p>

      <h4>What if I'm traveling as part of a group and only some of us are denied boarding?</h4>
      <p>
        Each passenger denied boarding is individually entitled to compensation and assistance. However, if you're traveling as a family 
        with children, the airline should prioritize keeping your group together.
      </p>

      <p>
        Being denied boarding can be a stressful experience, but knowing your rights can help you navigate the situation confidently 
        and ensure you receive the compensation you're entitled to. Remember, airlines are legally obligated to inform you of your 
        rights when you're denied boarding, and they should provide the compensation immediately at the airport.
      </p>
    </RightsPageLayout>
  );
};

export default DeniedBoardingCompensation;
