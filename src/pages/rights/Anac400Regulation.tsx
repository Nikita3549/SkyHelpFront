
import React from "react";
import RightsPageLayout from "@/components/rights/RightsPageLayout";

const Anac400Regulation = () => {
  const relatedLinks = [
    { title: "Air Passenger Rights", href: "/rights/air-passenger-rights" },
    { title: "EU 261 Flight Compensation", href: "/rights/flight-compensation" },
    { title: "SHY Regulation Turkey", href: "/rights/shy-regulation-turkey" },
    { title: "UK 261 Flight Compensation", href: "/rights/uk-261-flight-compensation" }
  ];

  return (
    <RightsPageLayout
      title="ANAC 400 Regulation"
      description="Understanding Brazilian air passenger rights under ANAC 400"
      metaTitle="ANAC 400 Regulation Guide | Brazilian Air Passenger Rights | CleverClaim"
      metaDescription="Learn about your passenger rights for flights to, from, and within Brazil under ANAC 400 Regulation and how to claim compensation for flight disruptions."
      relatedLinks={relatedLinks}
    >
      <h2>Understanding ANAC 400 Regulation: Air Passenger Rights in Brazil</h2>
      <p>
        ANAC Resolution 400 is Brazil's comprehensive air passenger rights regulation that protects travelers on flights to, 
        from, and within Brazil. Established by the Brazilian National Civil Aviation Agency (ANAC), this regulation provides 
        important protections for passengers experiencing flight disruptions with any airline operating in Brazilian airspace.
      </p>

      <h3>What is ANAC 400?</h3>
      <p>
        ANAC Resolution 400, which came into effect in March 2017, establishes rules regarding the rights and duties of air 
        passengers and airlines operating in Brazil. While it shares some similarities with EU Regulation 261/2004, ANAC 400 
        has its own unique approach to passenger protections, particularly regarding compensation mechanisms.
      </p>
      <p>
        The regulation covers various aspects of air travel, including:
      </p>
      <ul>
        <li>Flight delays and cancellations</li>
        <li>Denied boarding situations</li>
        <li>Baggage issues</li>
        <li>Ticket refund policies</li>
        <li>Passenger assistance requirements</li>
      </ul>

      <h3>When Does ANAC 400 Apply?</h3>
      <p>
        ANAC 400 applies to:
      </p>
      <ul>
        <li>All domestic flights within Brazil</li>
        <li>International flights departing from Brazilian airports</li>
        <li>International flights arriving in Brazil (with some limitations)</li>
      </ul>
      <p>
        This means that regardless of the airline's nationality, if your flight departs from Brazil or is a domestic flight within Brazil, 
        you are protected by ANAC 400 provisions.
      </p>

      <h3>Your Rights Under ANAC 400: Flight Delays and Cancellations</h3>

      <h4>Material Assistance Based on Delay Length</h4>
      <p>
        Unlike the EU regulation's fixed financial compensation, ANAC 400 focuses on providing material assistance based on the length of the delay:
      </p>
      <ul>
        <li>
          <strong>Delays over 1 hour:</strong> Communication assistance (internet, phone calls)
        </li>
        <li>
          <strong>Delays over 2 hours:</strong> Meals appropriate to the time of day (meal vouchers)
        </li>
        <li>
          <strong>Delays over 4 hours:</strong> Accommodation (if overnight stay is necessary) and transportation to/from the hotel
        </li>
      </ul>
      <p>
        These provisions apply regardless of the reason for the delay, even in extraordinary circumstances.
      </p>

      <div className="bg-blue-50 p-6 rounded-lg my-4">
        <h4 className="font-semibold mb-2">Key Difference from EU261:</h4>
        <p>
          Unlike EU Regulation 261/2004, ANAC 400 does not provide standardized financial compensation for delays or 
          cancellations. Instead, it focuses on immediate assistance and offers refund/rebooking options. However, 
          this doesn't prevent passengers from seeking financial compensation through the Brazilian judicial system 
          for damages caused by flight disruptions.
        </p>
      </div>

      <h4>Options for Cancelled Flights or Delays Over 4 Hours</h4>
      <p>
        When your flight is cancelled or delayed by more than 4 hours, airlines must offer you one of the following options:
      </p>
      <ol>
        <li><strong>Full refund</strong> of your ticket (including taxes and fees)</li>
        <li><strong>Re-routing</strong> on another flight to your destination (with any airline, not just the original carrier)</li>
        <li><strong>Rebooking</strong> the flight for another date at your convenience</li>
      </ol>
      <p>
        These alternatives must be provided free of charge, regardless of the ticket fare class.
      </p>

      <h3>Denied Boarding Rights Under ANAC 400</h3>
      <p>
        In case of overbooking or other situations where you're denied boarding, ANAC 400 requires airlines to:
      </p>
      <ul>
        <li>First seek volunteers to give up their seats in exchange for benefits negotiated directly with passengers</li>
        <li>If there aren't enough volunteers, provide you with the same three options as for cancelled flights (refund, re-routing, or rebooking)</li>
        <li>Provide all material assistance as required for delays (communication, meals, accommodation if necessary)</li>
      </ul>
      <p>
        Unlike EU261, ANAC 400 doesn't establish fixed compensation amounts for denied boarding. However, Brazilian consumer protection 
        laws allow passengers to seek compensation for moral damages through the judicial system.
      </p>

      <h3>Baggage Rights Under ANAC 400</h3>
      <p>
        ANAC 400 also establishes specific rules for baggage:
      </p>
      <ul>
        <li>
          <strong>Lost baggage:</strong> Airlines must reimburse passengers within 7 days for domestic flights and within 21 days for international flights
        </li>
        <li>
          <strong>Damaged or violated baggage:</strong> The airline must cover repair costs or provide compensation
        </li>
        <li>
          <strong>Delayed baggage:</strong> The airline must locate and deliver the baggage as quickly as possible and cover essential expenses until the baggage is returned
        </li>
      </ul>
      <p>
        For international flights, the Montreal Convention provisions regarding baggage liability limits often apply alongside ANAC 400.
      </p>

      <h3>Ticket Refund Rights</h3>
      <p>
        ANAC 400 provides specific rights regarding ticket refunds:
      </p>
      <ul>
        <li>
          <strong>24-hour penalty-free cancellation:</strong> You can cancel your ticket within 24 hours of purchase without any penalty, as long as the purchase was made at least 7 days before departure
        </li>
        <li>
          <strong>Cancellation by passenger:</strong> You can cancel your ticket and receive a refund, but airlines may charge a reasonable fee
        </li>
        <li>
          <strong>Refund processing time:</strong> Airlines must process refunds within 7 days for credit card purchases and 30 days for other payment methods
        </li>
      </ul>

      <h3>How to Claim Your Rights Under ANAC 400</h3>
      <ol>
        <li>
          <strong>Contact the airline directly:</strong>
          <ul>
            <li>Approach airline staff at the airport during the disruption</li>
            <li>Keep records of all communications</li>
            <li>Be specific about the assistance you require based on ANAC 400</li>
          </ul>
        </li>
        <li>
          <strong>Document everything:</strong>
          <ul>
            <li>Take screenshots of flight information displays</li>
            <li>Keep boarding passes and tickets</li>
            <li>Save all receipts for expenses incurred due to the disruption</li>
          </ul>
        </li>
        <li>
          <strong>If the airline doesn't comply:</strong>
          <ul>
            <li>File a complaint with ANAC through their website</li>
            <li>Contact Brazilian consumer protection agencies (such as PROCON)</li>
            <li>Consider the "small claims court" (Juizado Especial) for damages up to 40 minimum wages</li>
          </ul>
        </li>
      </ol>

      <h3>Unique Features of ANAC 400</h3>
      <p>
        Some distinctive elements of the Brazilian regulation include:
      </p>
      <ul>
        <li>
          <strong>No distinction between "extraordinary circumstances":</strong> Unlike EU261, assistance must be provided regardless of the cause of disruption
        </li>
        <li>
          <strong>Re-routing responsibility:</strong> Airlines must re-route passengers on other carriers if necessary, not just on their own flights
        </li>
        <li>
          <strong>Real-time information:</strong> Airlines must keep passengers informed about flight status in real-time
        </li>
        <li>
          <strong>Accessible channels:</strong> Airlines must provide multiple accessible channels for passenger communication
        </li>
      </ul>

      <h3>Time Limits for Claims</h3>
      <p>
        Brazilian law provides different time limits for filing claims:
      </p>
      <ul>
        <li>
          <strong>5 years</strong> for claims related to consumer relations under the Brazilian Consumer Protection Code
        </li>
        <li>
          <strong>2 years</strong> for baggage claims under the Montreal Convention (for international flights)
        </li>
      </ul>
      <p>
        For the most effective results, it's advisable to file claims as soon as possible after the disruption.
      </p>

      <p>
        ANAC 400 provides significant protections for passengers traveling to, from, and within Brazil. While its approach differs 
        from the EU's financial compensation system, it ensures that passengers receive immediate practical assistance during 
        disruptions and maintains their right to seek judicial remedies for damages. Understanding these rights can help you 
        navigate disruptions effectively when traveling in Brazilian airspace.
      </p>
    </RightsPageLayout>
  );
};

export default Anac400Regulation;
