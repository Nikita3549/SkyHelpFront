
import React from "react";
import RightsPageLayout from "@/components/rights/RightsPageLayout";

const ShyRegulationTurkey = () => {
  const relatedLinks = [
    { title: "Air Passenger Rights", href: "/rights/air-passenger-rights" },
    { title: "EU 261 Flight Compensation", href: "/rights/flight-compensation" },
    { title: "ANAC 400 Regulation", href: "/rights/anac-400-regulation" },
    { title: "UK 261 Flight Compensation", href: "/rights/uk-261-flight-compensation" }
  ];

  return (
    <RightsPageLayout
      title="SHY Regulation Turkey"
      description="Understanding passenger rights under Turkish aviation regulations"
      metaTitle="SHY Regulation Flight Compensation Guide | Turkish Air Passenger Rights | CleverClaim"
      metaDescription="Learn about your passenger rights for flights to and from Turkey under SHY Regulation and how to claim compensation for flight disruptions with Turkish airlines."
      relatedLinks={relatedLinks}
    >
      <h2>Understanding SHY Regulation: Air Passenger Rights in Turkey</h2>
      <p>
        The SHY Regulation (SHY-PASSENGER) is Turkey's equivalent to EU Regulation 261/2004, governing air passenger rights
        for flights to, from, and within Turkey. This regulation provides important protections for passengers experiencing
        flight disruptions with Turkish airlines or on flights to and from Turkish airports.
      </p>

      <h3>What is SHY Regulation?</h3>
      <p>
        SHY Regulation, officially known as "Regulation on Air Passenger Rights" (SHY-PASSENGER), was established by the 
        Turkish Directorate General of Civil Aviation (DGCA). It closely mirrors EU Regulation 261/2004 but has some 
        important differences. The regulation establishes rules for compensation and assistance to passengers in the event of:
      </p>
      <ul>
        <li>Denied boarding</li>
        <li>Flight cancellations</li>
        <li>Long delays</li>
        <li>Luggage-related issues</li>
      </ul>

      <h3>When Does SHY Regulation Apply?</h3>
      <p>
        The regulation applies to:
      </p>
      <ul>
        <li>Flights departing from airports in Turkey (regardless of the airline's nationality)</li>
        <li>Flights arriving at airports in Turkey operated by Turkish carriers</li>
        <li>All scheduled and non-scheduled commercial passenger services</li>
      </ul>
      <p>
        It's important to note that when both EU261 and SHY regulations could apply to a flight, passengers can choose 
        which regulation to claim under, but cannot claim under both simultaneously.
      </p>

      <h3>Compensation Under SHY Regulation</h3>
      <p>
        Similar to EU261, SHY regulation provides standardized compensation amounts based on flight distance:
      </p>
      <ul>
        <li><strong>100 EUR</strong> for flights up to 1,500 km</li>
        <li><strong>200 EUR</strong> for flights between 1,500 and 3,500 km</li>
        <li><strong>300 EUR</strong> for flights over 3,500 km</li>
      </ul>
      <p>
        Note that these amounts are lower than the EU261 compensation (which ranges from €250 to €600). Compensation is 
        typically paid in Turkish lira at the exchange rate on the date of payment.
      </p>

      <div className="bg-blue-50 p-6 rounded-lg my-4">
        <h4 className="font-semibold mb-2">Comparison: SHY vs. EU261 Compensation</h4>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Flight Distance</th>
              <th className="py-2 px-4 border-b">SHY Regulation</th>
              <th className="py-2 px-4 border-b">EU Regulation 261</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">Up to 1,500 km</td>
              <td className="py-2 px-4 border-b">100 EUR</td>
              <td className="py-2 px-4 border-b">250 EUR</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">1,500 - 3,500 km</td>
              <td className="py-2 px-4 border-b">200 EUR</td>
              <td className="py-2 px-4 border-b">400 EUR</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Over 3,500 km</td>
              <td className="py-2 px-4 border-b">300 EUR</td>
              <td className="py-2 px-4 border-b">600 EUR</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Your Rights Under SHY Regulation</h3>

      <h4>Flight Delays</h4>
      <p>
        For delays, your rights depend on the length of the delay and the flight distance:
      </p>
      <ul>
        <li>
          <strong>Delays of 2 hours or more</strong> (flights up to 1,500 km): Right to meals, refreshments, and communication
        </li>
        <li>
          <strong>Delays of 3 hours or more</strong> (flights 1,500-3,500 km): Right to meals, refreshments, and communication
        </li>
        <li>
          <strong>Delays of 4 hours or more</strong> (flights over 3,500 km): Right to meals, refreshments, and communication
        </li>
        <li>
          <strong>Delays of 5 hours or more</strong> (any distance): Right to a refund if you decide not to travel
        </li>
        <li>
          <strong>Delays requiring an overnight stay</strong>: Right to hotel accommodation and transport
        </li>
      </ul>
      <p>
        Financial compensation is provided when the delay at final destination is 3 hours or more, similar to EU261.
      </p>

      <h4>Flight Cancellations</h4>
      <p>
        When your flight is cancelled, you are entitled to:
      </p>
      <ul>
        <li>
          <strong>A choice between</strong>:
          <ul>
            <li>Refund of the ticket cost</li>
            <li>Re-routing to your final destination at the earliest opportunity</li>
            <li>Re-routing at a later date of your convenience</li>
          </ul>
        </li>
        <li>
          <strong>Care and assistance</strong> (meals, accommodation if necessary)
        </li>
        <li>
          <strong>Financial compensation</strong> (unless you were informed of the cancellation at least 10 days before departure or extraordinary circumstances apply)
        </li>
      </ul>
      <p>
        Note that SHY Regulation requires airlines to inform passengers about cancellations at least 10 days in advance to avoid 
        compensation (compared to 14 days under EU261).
      </p>

      <h4>Denied Boarding</h4>
      <p>
        If you're denied boarding against your will (usually due to overbooking), you're entitled to:
      </p>
      <ul>
        <li>Immediate compensation</li>
        <li>A refund of your ticket or re-routing</li>
        <li>Care and assistance as outlined above</li>
      </ul>

      <h4>Baggage Issues</h4>
      <p>
        SHY Regulation also covers baggage issues, providing:
      </p>
      <ul>
        <li>Compensation of up to 1000 Special Drawing Rights (SDR) for lost, damaged, or delayed baggage</li>
        <li>Requirement for airlines to inform passengers about their rights regarding baggage claims</li>
      </ul>

      <h3>How to Claim Under SHY Regulation</h3>
      <ol>
        <li>
          <strong>Gather documentation</strong>:
          <ul>
            <li>Boarding passes and ticket receipts</li>
            <li>Communication from the airline regarding the disruption</li>
            <li>Receipts for additional expenses incurred</li>
          </ul>
        </li>
        <li>
          <strong>Contact the airline directly</strong>:
          <ul>
            <li>Submit a claim through the airline's official channels</li>
            <li>Reference SHY-PASSENGER regulation in your claim</li>
            <li>Include all relevant flight details and describe the disruption</li>
          </ul>
        </li>
        <li>
          <strong>If rejected or no response</strong>:
          <ul>
            <li>File a complaint with the Turkish DGCA (Directorate General of Civil Aviation)</li>
            <li>Consider seeking professional assistance from a company like CleverClaim</li>
          </ul>
        </li>
      </ol>

      <h3>Time Limits for Filing Claims</h3>
      <p>
        Under SHY Regulation, the time limit for filing claims is generally 1 year from the date of the flight. However, it's always 
        best to submit your claim as soon as possible after the disruption.
      </p>

      <h3>Extraordinary Circumstances</h3>
      <p>
        Like EU261, SHY Regulation exempts airlines from paying compensation if the disruption was caused by "extraordinary circumstances" 
        that could not have been avoided even if all reasonable measures had been taken. These include:
      </p>
      <ul>
        <li>Severe weather conditions</li>
        <li>Political instability</li>
        <li>Security risks</li>
        <li>Unexpected flight safety shortcomings</li>
        <li>Air traffic management decisions</li>
        <li>Strikes affecting the operation of an airline</li>
      </ul>
      <p>
        The interpretation of "extraordinary circumstances" under SHY Regulation may differ slightly from EU261, particularly regarding 
        technical issues, which are more often accepted as extraordinary circumstances under Turkish regulation.
      </p>

      <p>
        Understanding SHY Regulation is essential for passengers traveling to, from, or within Turkey. While similar to EU261, the 
        differences in compensation amounts and certain other provisions can significantly impact your rights. For complex cases or 
        when airlines are unresponsive, seeking professional help from specialists who understand both EU and Turkish regulations 
        can significantly increase your chances of receiving the compensation you're entitled to.
      </p>
    </RightsPageLayout>
  );
};

export default ShyRegulationTurkey;
