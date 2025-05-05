
import React from "react";
import RightsPageLayout from "@/components/rights/RightsPageLayout";

const DelayedFlightCompensation = () => {
  const relatedLinks = [
    { title: "Air Passenger Rights", href: "/rights/air-passenger-rights" },
    { title: "Cancelled Flight Compensation", href: "/rights/cancelled-flight-compensation" },
    { title: "Flight Compensation", href: "/rights/flight-compensation" },
    { title: "Missed Connection Compensation", href: "/rights/missed-connection-compensation" }
  ];

  return (
    <RightsPageLayout
      title="Delayed Flight Compensation"
      description="Learn how you can claim up to €600 for your delayed flight"
      metaTitle="Delayed Flight Compensation Guide | CleverClaim"
      metaDescription="Comprehensive guide to claiming compensation for delayed flights under EU Regulation 261/2004. Find out if you're eligible for up to €600 in compensation."
      relatedLinks={relatedLinks}
    >
      <h2>Your Rights When Flights Are Delayed</h2>
      <p>
        Flight delays are frustrating and can significantly impact your travel plans. Fortunately, EU Regulation 261/2004 
        provides passengers with rights to compensation when their flights are delayed. This guide will help you understand 
        when you're eligible for compensation and how much you could receive.
      </p>

      <h3>When Can You Claim Compensation for a Delayed Flight?</h3>
      <p>
        Under EU regulations, you may be entitled to compensation if:
      </p>
      <ul>
        <li>Your flight arrived at your final destination 3 or more hours later than planned</li>
        <li>The delay was not caused by extraordinary circumstances</li>
        <li>Your flight departed from an EU airport, or was operated by an EU-based airline arriving at an EU airport</li>
        <li>You checked in for your flight on time</li>
      </ul>

      <h3>How Much Compensation Can You Claim?</h3>
      <p>
        The amount of compensation is determined by the flight distance:
      </p>
      <ul>
        <li><strong>€250</strong> for flights up to 1,500 km</li>
        <li><strong>€400</strong> for flights between 1,500 and 3,500 km</li>
        <li><strong>€600</strong> for flights over 3,500 km</li>
      </ul>
      <p>
        It's important to note that compensation is calculated based on the final destination and the total delay time upon arrival.
      </p>

      <h3>What Additional Rights Do You Have During a Delay?</h3>
      <p>
        Besides financial compensation, airlines must provide you with care during extended delays:
      </p>
      <ul>
        <li><strong>Meals and refreshments</strong> proportionate to the waiting time</li>
        <li><strong>Two telephone calls, emails, or faxes</strong></li>
        <li><strong>Hotel accommodation</strong> if an overnight stay becomes necessary</li>
        <li><strong>Transport</strong> between the airport and the hotel</li>
      </ul>
      <p>
        These rights apply when:
      </p>
      <ul>
        <li>The delay is 2 hours or more for flights of 1,500 km or less</li>
        <li>The delay is 3 hours or more for flights within the EU over 1,500 km and all other flights between 1,500-3,500 km</li>
        <li>The delay is 4 hours or more for all other flights</li>
      </ul>

      <h3>What Are "Extraordinary Circumstances"?</h3>
      <p>
        Airlines can avoid paying compensation if they can prove the delay was caused by "extraordinary circumstances" beyond their control. These include:
      </p>
      <ul>
        <li>Severe weather conditions</li>
        <li>Political instability</li>
        <li>Security risks</li>
        <li>Air traffic control restrictions</li>
        <li>Strikes (except those by airline staff)</li>
        <li>Safety issues discovered during pre-flight checks that couldn't have been identified during routine maintenance</li>
      </ul>
      <p>
        Importantly, most technical problems are NOT considered extraordinary circumstances following European Court of Justice rulings,
        as they're considered inherent to the normal activity of an airline.
      </p>

      <h3>How To Claim Compensation for a Delayed Flight</h3>
      <div className="bg-blue-50 p-6 rounded-lg my-4">
        <h4 className="font-semibold">Step by Step Guide:</h4>
        <ol className="list-decimal list-inside space-y-2">
          <li>Gather all relevant documentation (booking confirmation, boarding passes, any communications from the airline)</li>
          <li>Document the delay (screenshots of the arrival board, communications about the delay)</li>
          <li>Calculate your potential compensation based on flight distance and delay time</li>
          <li>Submit a claim to the airline through their official channels</li>
          <li>If rejected, consider escalating to a national enforcement body or through a specialist service like CleverClaim</li>
        </ol>
      </div>

      <h3>Time Limits for Claiming Compensation</h3>
      <p>
        The time limit for filing a claim varies by country:
      </p>
      <ul>
        <li>United Kingdom: 6 years</li>
        <li>Germany, Switzerland: 3 years</li>
        <li>France, Italy: 5 years</li>
        <li>Spain, Portugal: 1 year</li>
      </ul>
      <p>
        It's advisable to submit your claim as soon as possible after the delay to ensure all details are fresh and relevant documentation is available.
      </p>

      <h3>Common Myths About Flight Delay Compensation</h3>
      <ul>
        <li><strong>Myth:</strong> You need to have travel insurance to claim compensation.<br /><strong>Fact:</strong> EU261 compensation is a legal right independent of any insurance.</li>
        <li><strong>Myth:</strong> You can only claim compensation if your flight was booked directly with the airline.<br /><strong>Fact:</strong> You can claim regardless of how you booked (directly, via a travel agent, or as part of a package).</li>
        <li><strong>Myth:</strong> Technical issues always qualify as extraordinary circumstances.<br /><strong>Fact:</strong> Most technical problems are considered part of an airline's normal operations.</li>
      </ul>

      <p>
        If you've experienced a flight delay, don't hesitate to assert your rights. Airlines often reject claims initially, 
        hoping passengers will give up. Being persistent or seeking professional help can significantly increase your chances 
        of receiving the compensation you're entitled to.
      </p>
    </RightsPageLayout>
  );
};

export default DelayedFlightCompensation;
