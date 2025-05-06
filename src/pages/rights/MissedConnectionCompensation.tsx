
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import RightsPageLayout from "@/components/rights/RightsPageLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { CheckCircleIcon, AlertCircleIcon } from "lucide-react";
import InfoCard from "@/components/common/InfoCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MissedConnectionCompensation = () => {
  const relatedLinks = [
    { title: "Air Passenger Rights", href: "/rights/air-passenger-rights" },
    { title: "Delayed Flight Compensation", href: "/rights/delayed-flight-compensation" },
    { title: "Flight Compensation", href: "/rights/flight-compensation" },
    { title: "Cancelled Flight Compensation", href: "/rights/cancelled-flight-compensation" },
    { title: "Denied Boarding Compensation", href: "/rights/denied-boarding-compensation" }
  ];

  const tableOfContents = [
    { id: "what-are", title: "What are Missed Connections?" },
    { id: "eligibility", title: "When Are You Eligible for Compensation?" },
    { id: "compensation-amount", title: "How Much Compensation Can You Get?" },
    { id: "time-limits", title: "Time Limits for Missed Connection Claims" },
    { id: "additional-rights", title: "Additional Rights for Missed Connections" },
    { id: "extraordinary", title: "Extraordinary Circumstances" },
    { id: "how-to-claim", title: "How to Claim for a Missed Connection" },
    { id: "faq", title: "Frequently Asked Questions" }
  ];

  return (
    <RightsPageLayout
      title="Missed Connection Compensation"
      description="Your rights when you miss a connecting flight"
      metaTitle="Missed Connection Compensation Guide | CleverClaim"
      metaDescription="Learn about your passenger rights and how to claim compensation when you miss a connecting flight due to a delay or cancellation under EU Regulation 261/2004."
      relatedLinks={relatedLinks}
      tableOfContents={tableOfContents}
    >
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <p className="text-lg">
          <strong>Quick Summary:</strong> Under EU Regulation 261/2004, if you miss a connecting flight due to a delay or cancellation 
          of your first flight, and both flights were part of the same booking, you could be entitled to compensation of up to €600, 
          plus assistance with meals, accommodation, and alternative transportation.
        </p>
      </div>

      <h2 id="what-are" className="text-2xl font-bold mb-4 scroll-mt-24">What are Missed Connections?</h2>
      <p className="mb-4">
        Missed connections occur when a delay or cancellation of your first flight causes you to miss your connecting flight. 
        This disruption can significantly affect your travel plans, especially if you have subsequent flights or important commitments 
        at your final destination.
      </p>
      <p className="mb-4">
        Under EU Regulation 261/2004, passengers have specific rights when they miss their connections due to the airline's fault, 
        provided both flights were part of the same booking. These rights include financial compensation and assistance.
      </p>

      <h2 id="eligibility" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">When Are You Eligible for Compensation?</h2>
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-2">You may be eligible for compensation if:</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Both flights were part of the same booking (not separate bookings)</li>
          <li>Your first flight was delayed, causing you to miss your connection</li>
          <li>You arrived at your final destination at least 3 hours later than scheduled</li>
          <li>The delay was not caused by extraordinary circumstances beyond the airline's control</li>
          <li>The first flight departed from an EU airport, or was operated by an EU airline flying into an EU airport</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-6 my-6">
        <InfoCard 
          title="Same Booking Requirement" 
          description="The connecting flights must be part of the same booking/reservation. Separate bookings are considered separate contracts, even if with the same airline."
        />
        <InfoCard 
          title="Calculate Total Delay" 
          description="You're entitled to compensation based on the delay at your final destination, not just the delay of individual flights."
        />
      </div>

      <h2 id="compensation-amount" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">How Much Compensation Can You Get?</h2>
      <p className="mb-4">
        The compensation amount for missed connections is determined by the total flight distance to your final destination:
      </p>

      <div className="overflow-x-auto my-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold">Flight Distance</TableHead>
              <TableHead className="font-semibold">Compensation Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Up to 1,500 km</TableCell>
              <TableCell className="font-semibold">€250</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>Between 1,500 km and 3,500 km</TableCell>
              <TableCell className="font-semibold">€400</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Over 3,500 km</TableCell>
              <TableCell className="font-semibold">€600</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>Over 3,500 km (with delay between 3 and 4 hours)</TableCell>
              <TableCell className="font-semibold">€300 (50% reduction)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg my-6">
        <h4 className="font-semibold text-lg mb-2 flex items-center">
          <CheckCircleIcon className="w-5 h-5 mr-2 text-primary" />
          Important to Know:
        </h4>
        <p>
          For calculation purposes, the total distance includes all flight segments from your departure point to your final destination, 
          not just the missed connection segment.
        </p>
      </div>

      <h2 id="time-limits" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">Time Limits for Missed Connection Claims</h2>
      <p className="mb-4">
        Time limits for filing a missed connection claim vary by country. Here's when you need to submit your claim:
      </p>

      <div className="overflow-x-auto my-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold">Country</TableHead>
              <TableHead className="font-semibold">Time Limit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>United Kingdom</TableCell>
              <TableCell>6 years</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>Germany</TableCell>
              <TableCell>3 years</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>France</TableCell>
              <TableCell>5 years</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>Spain</TableCell>
              <TableCell>1 year</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Italy</TableCell>
              <TableCell>2 years</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <p className="mb-4">
        Note: It's always best to submit your claim as soon as possible after the incident to ensure you have all necessary 
        documentation and details fresh in your mind.
      </p>

      <h2 id="additional-rights" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">Additional Rights for Missed Connections</h2>
      <p className="mb-4">
        Besides financial compensation, when you miss a connecting flight due to a delay or cancellation, the airline must provide you with:
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-6">
        <InfoCard 
          title="Re-routing" 
          description="Alternative transportation to your final destination at the earliest opportunity"
        />
        <InfoCard 
          title="Reimbursement" 
          description="Full refund of your ticket if you choose not to travel, plus a return flight to your departure point if needed"
        />
        <InfoCard 
          title="Care and Assistance" 
          description="Meals, refreshments, communication facilities, and accommodation if necessary"
        />
      </div>

      <div className="bg-gray-50 p-6 rounded-lg my-6">
        <h4 className="font-semibold text-lg mb-2">Right to Care While Waiting</h4>
        <p className="mb-4">
          While waiting for your re-routed flight, the airline must provide:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Meals and refreshments proportionate to the waiting time</li>
          <li>Two telephone calls, emails, or faxes</li>
          <li>Hotel accommodation if an overnight stay becomes necessary</li>
          <li>Transport between the airport and the hotel</li>
        </ul>
      </div>

      <h2 id="extraordinary" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">Extraordinary Circumstances</h2>
      <p className="mb-4">
        Airlines can be exempted from paying compensation if they can prove that the missed connection was caused by 
        "extraordinary circumstances" beyond their control. These include:
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-2">Examples of Extraordinary Circumstances:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Severe weather conditions (like hurricanes or heavy snowfall)</li>
            <li>Political instability affecting flight operations</li>
            <li>Security risks or threats</li>
            <li>Air traffic control restrictions</li>
            <li>Airport staff strikes (but not airline staff strikes)</li>
            <li>Bird strikes causing safety inspections</li>
          </ul>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-2">NOT Considered Extraordinary:</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Technical problems discovered during routine maintenance</li>
            <li>Airline staff strikes</li>
            <li>Most mechanical issues</li>
            <li>Airline scheduling issues</li>
            <li>Crew availability problems</li>
            <li>Minor weather disruptions within normal operating conditions</li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg my-6">
        <h4 className="font-semibold text-lg mb-2 flex items-center">
          <AlertCircleIcon className="w-5 h-5 mr-2 text-amber-500" />
          Important Note:
        </h4>
        <p>
          Even if extraordinary circumstances exempt the airline from paying compensation, they must still provide care and assistance 
          (meals, refreshments, accommodation) and offer you a choice between rerouting or a refund.
        </p>
      </div>

      <h2 id="how-to-claim" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">How to Claim for a Missed Connection</h2>
      <ol className="list-decimal pl-6 space-y-3 mb-6">
        <li>
          <strong>Collect evidence</strong> - Keep all boarding passes, booking confirmations, and any written statements from the airline 
          about the reason for the delay.
        </li>
        <li>
          <strong>Document the disruption</strong> - Take photos of information boards showing delays, keep receipts for any expenses 
          incurred, and note down exact times of scheduled and actual departures/arrivals.
        </li>
        <li>
          <strong>Contact the airline directly</strong> - Submit a formal claim to the airline you booked with, referencing EU Regulation 261/2004.
        </li>
        <li>
          <strong>Be persistent</strong> - Airlines may initially reject valid claims. Don't be discouraged; follow up on your claim.
        </li>
        <li>
          <strong>Seek help if needed</strong> - If your claim is rejected or you don't receive a response within 6 weeks, consider using 
          a claim service like CleverClaim or contacting the national enforcement body in the relevant country.
        </li>
      </ol>

      <h2 id="faq" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="mb-6">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-medium">Am I entitled to compensation if I miss my connection due to long security lines?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
            No, security lines are the responsibility of the airport, not the airline. You're only entitled to compensation when the 
            missed connection is due to an airline-related issue, like a delay or cancellation of your first flight.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-medium">What if I booked my flights separately?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
            If you booked separate tickets for each flight (even with the same airline), they're considered separate contracts. 
            If your first flight is delayed and you miss your second flight, the airline operating the second flight has no obligation 
            to rebook you or provide compensation, as they fulfilled their contract.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-medium">Does the minimum connection time affect my compensation rights?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
            When booking a single reservation with connecting flights, airlines are responsible for providing sufficient connection time. 
            If the connection time meets the airline's minimum requirement but you still miss your connection due to a delay, 
            you're still eligible for compensation, regardless of how short the connection time was.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-medium">What happens if my rerouted flight also gets delayed or cancelled?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
            If your rerouted flight also gets delayed or cancelled, your rights apply again. You could be entitled to additional 
            compensation if the total delay at your final destination exceeds 3 hours and isn't due to extraordinary circumstances.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg font-medium">Can I claim compensation if the delay was caused by a previous flight?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
            Yes, the "knock-on effect" where delays from previous flights affect your journey is not considered an extraordinary 
            circumstance. Airlines are responsible for planning sufficient buffer time in their schedules to minimize such effects.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="my-8" />

      <div className="grid md:grid-cols-2 gap-8 my-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Not Sure If You're Eligible?</h3>
          <p className="mb-4">
            Our free eligibility check only takes a minute. Find out instantly if you're entitled to compensation for your missed connection.
          </p>
          <Button asChild>
            <Link to="/claim">Check Your Eligibility</Link>
          </Button>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Why Choose CleverClaim?</h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>No win, no fee policy</li>
            <li>98% success rate on valid claims</li>
            <li>Quick and simple process</li>
            <li>Experts in EU flight compensation</li>
          </ul>
          <Button variant="outline" asChild>
            <Link to="/#how-it-works">Learn How It Works</Link>
          </Button>
        </div>
      </div>
    </RightsPageLayout>
  );
};

export default MissedConnectionCompensation;
