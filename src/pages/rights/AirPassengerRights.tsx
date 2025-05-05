
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RightsPageLayout from "@/components/rights/RightsPageLayout";

const AirPassengerRights = () => {
  const relatedLinks = [
    { title: "Delayed Flight Compensation", href: "/rights/delayed-flight-compensation" },
    { title: "Cancelled Flight Compensation", href: "/rights/cancelled-flight-compensation" },
    { title: "Denied Boarding Compensation", href: "/rights/denied-boarding-compensation" },
    { title: "Flight Compensation", href: "/rights/flight-compensation" }
  ];

  const tableOfContents = [
    { id: "understanding", title: "Understanding Air Passenger Rights in Europe" },
    { id: "eu-regulation", title: "What is EU Regulation 261/2004?" },
    { id: "when-apply", title: "When Does EU Regulation 261/2004 Apply?" },
    { id: "compensation", title: "What Compensation Are You Entitled To?" },
    { id: "qualifying-situations", title: "What Situations Qualify for Compensation?" },
    { id: "exceptions", title: "Exceptions: 'Extraordinary Circumstances'" },
    { id: "claim-rights", title: "How to Claim Your Rights" }
  ];

  return (
    <RightsPageLayout
      title="Air Passenger Rights"
      description="Everything you need to know about your rights as an air passenger"
      metaTitle="Air Passenger Rights | CleverClaim"
      metaDescription="Learn about your air passenger rights under EU Regulation 261/2004, eligibility for compensation, and how to claim for flight disruptions."
      relatedLinks={relatedLinks}
      tableOfContents={tableOfContents}
    >
      <h2 id="understanding" className="text-2xl font-bold mb-4 scroll-mt-24">Understanding Air Passenger Rights in Europe</h2>
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <p className="text-lg">
          <strong>Quick Summary:</strong> EU Regulation 261/2004 provides significant protection for air passengers in cases of flight delays, 
          cancellations, and denied boarding. Under this regulation, passengers may be entitled to compensation 
          ranging from €250 to €600, depending on the flight distance and circumstances.
        </p>
      </div>
      <p>
        Air travel doesn't always go as planned, but EU law provides robust protection for passengers.
        Under EU Regulation 261/2004, passengers have significant rights and may be entitled to compensation
        when flights are delayed, cancelled, or when they're denied boarding due to overbooking.
      </p>

      <h3 id="eu-regulation" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">What is EU Regulation 261/2004?</h3>
      <p>
        EU Regulation 261/2004 is the cornerstone of passenger protection in Europe. This legislation
        establishes common rules on compensation and assistance to passengers in the event of denied boarding, 
        flight cancellations, or long delays. It applies to all flights departing from an EU airport,
        as well as flights arriving in the EU with an EU-based carrier.
      </p>

      <h3 id="when-apply" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">When Does EU Regulation 261/2004 Apply?</h3>
      <p>The regulation applies if:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Your flight departs from any airport in the EU (including Iceland, Norway, and Switzerland)</li>
        <li>Your flight arrives in the EU and is operated by an EU-based airline</li>
        <li>You have a confirmed reservation and have checked in on time</li>
        <li>You're traveling on a commercial airline (not a private flight)</li>
      </ul>

      <h3 id="compensation" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">What Compensation Are You Entitled To?</h3>
      
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-50">
              <th className="py-3 px-4 border text-left">Flight Distance</th>
              <th className="py-3 px-4 border text-left">Compensation Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4 border">Flights up to 1,500 km</td>
              <td className="py-3 px-4 border font-semibold">€250</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-3 px-4 border">Flights between 1,500 and 3,500 km</td>
              <td className="py-3 px-4 border font-semibold">€400</td>
            </tr>
            <tr>
              <td className="py-3 px-4 border">Flights over 3,500 km</td>
              <td className="py-3 px-4 border font-semibold">€600</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <p>
        The exact amount depends on the distance of your flight and the length of the delay. 
        Additionally, the airline must provide meals, refreshments, accommodation (when necessary),
        and communication facilities while you wait.
      </p>

      <h3 id="qualifying-situations" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">What Situations Qualify for Compensation?</h3>
      
      <h4 className="text-lg font-semibold mt-6 mb-3">Flight Delays</h4>
      <div className="bg-gray-50 p-5 rounded-lg mb-5">
        <p>
          If your flight is delayed by 3 hours or more at your final destination, you may be eligible for compensation.
          The delay is calculated based on the scheduled arrival time versus the actual time the doors of the aircraft are opened.
        </p>
      </div>
      
      <h4 className="text-lg font-semibold mt-6 mb-3">Flight Cancellations</h4>
      <div className="bg-gray-50 p-5 rounded-lg mb-5">
        <p>
          If your flight is cancelled, you may be entitled to compensation unless:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-1">
          <li>You were informed at least 2 weeks before departure</li>
          <li>You were informed between 2 weeks and 7 days before departure and offered re-routing that would get you to your destination within 4 hours of your original arrival time</li>
          <li>You were informed less than 7 days before departure and offered re-routing that would get you to your destination within 2 hours of your original arrival time</li>
        </ul>
      </div>

      <h4 className="text-lg font-semibold mt-6 mb-3">Denied Boarding</h4>
      <div className="bg-gray-50 p-5 rounded-lg mb-5">
        <p>
          If you're denied boarding against your will (usually due to overbooking), you're entitled to immediate compensation,
          as well as the choice between a refund or re-routing to your final destination.
        </p>
      </div>

      <h3 id="exceptions" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">Exceptions: "Extraordinary Circumstances"</h3>
      <p>
        Airlines may avoid paying compensation if the disruption was caused by "extraordinary circumstances" that could not have been avoided even if all reasonable measures had been taken.
        These include:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
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

      <h3 id="claim-rights" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">How to Claim Your Rights</h3>
      <div className="bg-blue-50 p-6 rounded-lg my-6">
        <h4 className="font-bold text-lg mb-3">Step-by-Step Guide to Claiming Compensation:</h4>
        <ol className="list-decimal pl-6 space-y-3">
          <li><strong>Collect evidence:</strong> Keep your boarding pass, booking reference, and document the disruption</li>
          <li><strong>Contact the airline:</strong> Submit a formal complaint to the airline operating the flight</li>
          <li><strong>Be persistent:</strong> Airlines might initially reject your claim</li>
          <li><strong>Consider professional help:</strong> If your claim is rejected, you might want to seek assistance from a specialized company like CleverClaim</li>
        </ol>
      </div>

      <p>
        Remember, under EU law, you have at least 3 years to claim compensation (though this varies by country), 
        so you can still claim for past flights. Don't hesitate to assert your rights and seek the compensation you're entitled to.
      </p>

      <div className="bg-blue-50 p-6 rounded-lg my-8">
        <h3 className="text-xl font-semibold mb-3">Need Help With Your Claim?</h3>
        <p className="mb-4">
          CleverClaim specializes in helping passengers get the compensation they deserve. Our simple process and 
          no-win, no-fee approach means there's no risk to you. Let us handle the complexity of dealing with airlines 
          while you focus on what matters.
        </p>
        <Button asChild>
          <Link to="/claim">Start Your Claim Now</Link>
        </Button>
      </div>
    </RightsPageLayout>
  );
};

export default AirPassengerRights;
