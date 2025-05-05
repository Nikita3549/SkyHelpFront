
import React from "react";
import RightsPageLayout from "@/components/rights/RightsPageLayout";

const Uk261FlightCompensation = () => {
  const relatedLinks = [
    { title: "Air Passenger Rights", href: "/rights/air-passenger-rights" },
    { title: "EU 261 Flight Compensation", href: "/rights/flight-compensation" },
    { title: "SHY Regulation Turkey", href: "/rights/shy-regulation-turkey" },
    { title: "ANAC 400 Regulation", href: "/rights/anac-400-regulation" }
  ];

  return (
    <RightsPageLayout
      title="UK 261 Flight Compensation"
      description="Understanding air passenger rights under UK law after Brexit"
      metaTitle="UK 261 Flight Compensation Guide | UK Air Passenger Rights | CleverClaim"
      metaDescription="Learn about your rights under UK air passenger law for flight delays, cancellations, and denied boarding after Brexit, and how to claim compensation."
      relatedLinks={relatedLinks}
    >
      <h2>UK 261 Flight Compensation: Your Rights Post-Brexit</h2>
      <p>
        Following Brexit, the UK incorporated EU Regulation 261/2004 into domestic law, creating its own version of passenger 
        protection legislation, commonly referred to as "UK261" or "UK Flight Compensation Regulation." While largely similar to 
        the EU regulation, there are important differences that passengers should be aware of when traveling to or from UK airports.
      </p>

      <h3>What is UK261?</h3>
      <p>
        UK261 refers to the retained version of EU Regulation 261/2004 that was incorporated into UK law through the European Union 
        (Withdrawal) Act 2018 and modified by the Air Passenger Rights and Air Travel Organisers' Licensing (Amendment) (EU Exit) 
        Regulations 2019. This legislation preserves passenger rights for flight disruptions similar to those under the EU regulation.
      </p>

      <h3>When Does UK261 Apply?</h3>
      <p>
        UK261 applies in the following situations:
      </p>
      <ul>
        <li>Flights departing from airports in the UK (regardless of the airline's nationality)</li>
        <li>Flights arriving at airports in the UK operated by UK or EU carriers</li>
        <li>Passengers who have a confirmed reservation and have checked in on time</li>
      </ul>

      <div className="bg-blue-50 p-6 rounded-lg my-4">
        <h4 className="font-semibold mb-2">EU261 vs UK261 Applicability:</h4>
        <p>
          The key difference in applicability is that UK261 protects passengers on flights departing from the UK or arriving 
          in the UK on UK carriers, while EU261 protects passengers on flights departing from EU airports or arriving in the 
          EU on EU carriers. This creates an important distinction for flights between the UK and EU.
        </p>
      </div>

      <h3>Compensation Amounts Under UK261</h3>
      <p>
        UK261 maintains the same compensation amounts as EU261, but denominated in British pounds rather than euros:
      </p>
      <ul>
        <li><strong>£220</strong> for flights up to 1,500 km (approximately €250)</li>
        <li><strong>£350</strong> for flights between 1,500 and 3,500 km (approximately €400)</li>
        <li><strong>£520</strong> for flights over 3,500 km (approximately €600)</li>
      </ul>
      <p>
        For long-distance flights (over 3,500 km), if the delay at the final destination is between 3 and 4 hours, 
        the compensation may be reduced by 50% (to £260).
      </p>

      <h3>Your Rights Under UK261</h3>

      <h4>Flight Delays</h4>
      <p>
        You may be entitled to compensation if:
      </p>
      <ul>
        <li>Your flight arrives at your final destination 3 or more hours later than scheduled</li>
        <li>The delay wasn't caused by extraordinary circumstances</li>
        <li>Your flight falls under the scope of UK261 as described above</li>
      </ul>
      <p>
        During a delay, you're also entitled to:
      </p>
      <ul>
        <li><strong>Delays of 2+ hours (short flights), 3+ hours (medium flights), or 4+ hours (long flights):</strong> Meals, refreshments, and communication</li>
        <li><strong>Delays requiring an overnight stay:</strong> Hotel accommodation and transport</li>
        <li><strong>Delays of 5+ hours:</strong> A refund of your ticket if you choose not to travel</li>
      </ul>

      <h4>Flight Cancellations</h4>
      <p>
        You may be entitled to compensation if:
      </p>
      <ul>
        <li>Your flight was cancelled less than 14 days before departure</li>
        <li>The cancellation wasn't caused by extraordinary circumstances</li>
        <li>Any replacement flight offered causes a significant delay in arrival at your final destination</li>
      </ul>
      <p>
        When your flight is cancelled, you always have the right to choose between:
      </p>
      <ul>
        <li>A full refund of your ticket</li>
        <li>Re-routing to your destination at the earliest opportunity</li>
        <li>Re-routing at a later date of your convenience</li>
      </ul>

      <h4>Denied Boarding</h4>
      <p>
        If you're involuntarily denied boarding (typically due to overbooking), you're entitled to:
      </p>
      <ul>
        <li>Immediate compensation (£220-£520 depending on flight distance)</li>
        <li>A choice between refund or re-routing</li>
        <li>Care and assistance (meals, accommodation if necessary)</li>
      </ul>

      <h3>Extraordinary Circumstances Under UK261</h3>
      <p>
        Like EU261, UK261 allows airlines to avoid paying compensation if the disruption was caused by "extraordinary circumstances." 
        These include:
      </p>
      <ul>
        <li>Severe weather conditions</li>
        <li>Political instability</li>
        <li>Security risks</li>
        <li>Air traffic control restrictions</li>
        <li>Unexpected flight safety shortcomings</li>
        <li>Strikes affecting airport operations (but generally not airline staff strikes)</li>
      </ul>
      <p>
        UK courts have generally followed similar interpretations as EU courts regarding what constitutes extraordinary circumstances, 
        particularly ruling that most technical problems are not extraordinary circumstances as they are part of the normal operation of an airline.
      </p>

      <h3>How to Claim Under UK261</h3>
      <ol>
        <li>
          <strong>Gather documentation:</strong>
          <ul>
            <li>Boarding passes and ticket receipts</li>
            <li>Any communication from the airline about the disruption</li>
            <li>Details about the length and cause of the disruption</li>
          </ul>
        </li>
        <li>
          <strong>Contact the airline directly:</strong>
          <ul>
            <li>Submit a claim through the airline's official channels</li>
            <li>Reference UK261 or "UK Flight Compensation Regulation" in your claim</li>
            <li>Include all relevant flight details and the nature of your claim</li>
          </ul>
        </li>
        <li>
          <strong>If rejected or no response:</strong>
          <ul>
            <li>Contact alternative dispute resolution (ADR) schemes if the airline participates in one</li>
            <li>File a complaint with the Civil Aviation Authority (CAA)</li>
            <li>Consider small claims court if necessary</li>
            <li>Seek professional assistance from a company like CleverClaim</li>
          </ul>
        </li>
      </ol>

      <h3>Time Limits for UK261 Claims</h3>
      <p>
        Under UK law, you have up to 6 years from the date of the disrupted flight to make a claim in England, Wales, and 
        Northern Ireland. In Scotland, the time limit is 5 years. However, it's always advisable to submit your claim as 
        soon as possible after the disruption.
      </p>

      <h3>Potential Future Changes to UK261</h3>
      <p>
        It's worth noting that as time passes since Brexit, UK passenger rights legislation may begin to diverge from the EU regulation. 
        The UK government has indicated it may review passenger rights legislation, potentially making changes to the current system. 
        Travelers should stay informed about the latest regulations that apply to their journeys.
      </p>

      <h3>Key Differences Between EU261 and UK261</h3>
      <table className="min-w-full bg-white my-4 border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border border-gray-200">Aspect</th>
            <th className="py-2 px-4 border border-gray-200">EU261</th>
            <th className="py-2 px-4 border border-gray-200">UK261</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border border-gray-200">Applicability</td>
            <td className="py-2 px-4 border border-gray-200">Flights departing from EU or arriving in EU on EU carriers</td>
            <td className="py-2 px-4 border border-gray-200">Flights departing from UK or arriving in UK on UK/EU carriers</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border border-gray-200">Compensation (short flights)</td>
            <td className="py-2 px-4 border border-gray-200">€250</td>
            <td className="py-2 px-4 border border-gray-200">£220</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border border-gray-200">Enforcement body</td>
            <td className="py-2 px-4 border border-gray-200">National enforcement bodies in each EU country</td>
            <td className="py-2 px-4 border border-gray-200">UK Civil Aviation Authority (CAA)</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border border-gray-200">Time limits</td>
            <td className="py-2 px-4 border border-gray-200">Varies by country (1-10 years)</td>
            <td className="py-2 px-4 border border-gray-200">6 years (5 in Scotland)</td>
          </tr>
        </tbody>
      </table>

      <h3>Tips for Post-Brexit Air Travel Between UK and EU</h3>
      <ul>
        <li>
          <strong>Check which regulation applies:</strong> For flights between the UK and EU, determine whether UK261 or EU261 applies to your journey
        </li>
        <li>
          <strong>Keep all documentation:</strong> Boarding passes, communications from airlines, and receipts for expenses incurred
        </li>
        <li>
          <strong>Be aware of duplicate claims:</strong> You cannot claim under both UK261 and EU261 for the same disruption
        </li>
        <li>
          <strong>Stay informed:</strong> Both UK and EU passenger rights may evolve independently over time
        </li>
      </ul>

      <p>
        Despite Brexit, UK passengers continue to enjoy strong legal protections for flight disruptions. UK261 largely mirrors 
        the EU regulation, providing significant rights to compensation and assistance. Understanding these rights can help 
        you navigate disruptions effectively and ensure you receive the compensation you're entitled to when traveling to or 
        from UK airports.
      </p>
    </RightsPageLayout>
  );
};

export default Uk261FlightCompensation;
