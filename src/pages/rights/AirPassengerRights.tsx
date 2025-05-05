
import React from "react";
import RightsPageLayout from "@/components/rights/RightsPageLayout";

const AirPassengerRights = () => {
  const relatedLinks = [
    { title: "Delayed Flight Compensation", href: "/rights/delayed-flight-compensation" },
    { title: "Cancelled Flight Compensation", href: "/rights/cancelled-flight-compensation" },
    { title: "Denied Boarding Compensation", href: "/rights/denied-boarding-compensation" },
    { title: "Flight Compensation", href: "/rights/flight-compensation" }
  ];

  return (
    <RightsPageLayout
      title="Air Passenger Rights"
      description="Everything you need to know about your rights as an air passenger"
      metaTitle="Air Passenger Rights | CleverClaim"
      metaDescription="Learn about your air passenger rights under EU Regulation 261/2004, eligibility for compensation, and how to claim for flight disruptions."
      relatedLinks={relatedLinks}
    >
      <h2>Understanding Air Passenger Rights in Europe</h2>
      <p>
        Air travel doesn't always go as planned, but EU law provides robust protection for passengers.
        Under EU Regulation 261/2004, passengers have significant rights and may be entitled to compensation
        when flights are delayed, cancelled, or when they're denied boarding due to overbooking.
      </p>

      <h3>What is EU Regulation 261/2004?</h3>
      <p>
        EU Regulation 261/2004 is the cornerstone of passenger protection in Europe. This legislation
        establishes common rules on compensation and assistance to passengers in the event of denied boarding, 
        flight cancellations, or long delays. It applies to all flights departing from an EU airport,
        as well as flights arriving in the EU with an EU-based carrier.
      </p>

      <h3>When Does EU Regulation 261/2004 Apply?</h3>
      <p>The regulation applies if:</p>
      <ul>
        <li>Your flight departs from any airport in the EU (including Iceland, Norway, and Switzerland)</li>
        <li>Your flight arrives in the EU and is operated by an EU-based airline</li>
        <li>You have a confirmed reservation and have checked in on time</li>
        <li>You're traveling on a commercial airline (not a private flight)</li>
      </ul>

      <h3>What Compensation Are You Entitled To?</h3>
      <p>
        Under EU Regulation 261/2004, you may be entitled to:
      </p>
      <ul>
        <li>€250 for flights up to 1,500 km</li>
        <li>€400 for flights between 1,500 and 3,500 km</li>
        <li>€600 for flights over 3,500 km</li>
      </ul>
      <p>
        The exact amount depends on the distance of your flight and the length of the delay. 
        Additionally, the airline must provide meals, refreshments, accommodation (when necessary),
        and communication facilities while you wait.
      </p>

      <h3>What Situations Qualify for Compensation?</h3>
      <h4>Flight Delays</h4>
      <p>
        If your flight is delayed by 3 hours or more at your final destination, you may be eligible for compensation.
        The delay is calculated based on the scheduled arrival time versus the actual time the doors of the aircraft are opened.
      </p>
      
      <h4>Flight Cancellations</h4>
      <p>
        If your flight is cancelled, you may be entitled to compensation unless:
      </p>
      <ul>
        <li>You were informed at least 2 weeks before departure</li>
        <li>You were informed between 2 weeks and 7 days before departure and offered re-routing that would get you to your destination within 4 hours of your original arrival time</li>
        <li>You were informed less than 7 days before departure and offered re-routing that would get you to your destination within 2 hours of your original arrival time</li>
      </ul>

      <h4>Denied Boarding</h4>
      <p>
        If you're denied boarding against your will (usually due to overbooking), you're entitled to immediate compensation,
        as well as the choice between a refund or re-routing to your final destination.
      </p>

      <h3>Exceptions: "Extraordinary Circumstances"</h3>
      <p>
        Airlines may avoid paying compensation if the disruption was caused by "extraordinary circumstances" that could not have been avoided even if all reasonable measures had been taken.
        These include:
      </p>
      <ul>
        <li>Political instability</li>
        <li>Extreme weather conditions</li>
        <li>Security risks</li>
        <li>Unexpected flight safety shortcomings</li>
        <li>Air traffic management decisions</li>
        <li>Strikes affecting the operation of an airline</li>
      </ul>
      <p>
        However, technical issues with the aircraft generally do not qualify as extraordinary circumstances, following recent court rulings.
      </p>

      <h3>How to Claim Your Rights</h3>
      <p>
        If you believe you're entitled to compensation:
      </p>
      <ol>
        <li>Collect evidence: Keep your boarding pass, booking reference, and document the disruption</li>
        <li>Contact the airline: Submit a formal complaint to the airline operating the flight</li>
        <li>Be persistent: Airlines might initially reject your claim</li>
        <li>Consider professional help: If your claim is rejected, you might want to seek assistance from a specialized company like CleverClaim</li>
      </ol>

      <p>
        Remember, under EU law, you have at least 3 years to claim compensation (though this varies by country), 
        so you can still claim for past flights. Don't hesitate to assert your rights and seek the compensation you're entitled to.
      </p>

      <div className="bg-blue-50 p-6 rounded-lg my-8">
        <h3 className="text-xl font-semibold mb-3">Need Help With Your Claim?</h3>
        <p>
          CleverClaim specializes in helping passengers get the compensation they deserve. Our simple process and 
          no-win, no-fee approach means there's no risk to you. Let us handle the complexity of dealing with airlines 
          while you focus on what matters.
        </p>
      </div>
    </RightsPageLayout>
  );
};

export default AirPassengerRights;
