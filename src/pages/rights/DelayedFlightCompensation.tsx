import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import RightsPageLayout from '@/components/rights/RightsPageLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';

const DelayedFlightCompensation = () => {
  const relatedLinks = [
    { title: 'Air Passenger Rights', href: '/rights/air-passenger-rights' },
    {
      title: 'Cancelled Flight Compensation',
      href: '/rights/cancelled-flight-compensation',
    },
    { title: 'Flight Compensation', href: '/rights/flight-compensation' },
    {
      title: 'Missed Connection Compensation',
      href: '/rights/missed-connection-compensation',
    },
    {
      title: 'Overbooked Flight Compensation',
      href: '/rights/overbooked-flight-compensation',
    },
  ];

  const tableOfContents = [
    { id: 'understanding', title: 'Understanding Flight Delays' },
    { id: 'eligibility', title: 'When Can You Claim Compensation?' },
    {
      id: 'compensation-amount',
      title: 'How Much Compensation Can You Claim?',
    },
    { id: 'additional-rights', title: 'Additional Rights During a Delay' },
    { id: 'extraordinary', title: 'Extraordinary Circumstances' },
    { id: 'how-to-claim', title: 'How To Claim Compensation' },
    { id: 'time-limits', title: 'Time Limits for Claims' },
    { id: 'myths', title: 'Common Myths About Flight Delay Compensation' },
  ];

  return (
    <RightsPageLayout
      title="Delayed Flight Compensation"
      description="Learn how you can claim up to €600 for your delayed flight"
      metaTitle="Delayed Flight Compensation Guide | CleverClaim"
      metaDescription="Comprehensive guide to claiming compensation for delayed flights under EU Regulation 261/2004. Find out if you're eligible for up to €600 in compensation."
      relatedLinks={relatedLinks}
      tableOfContents={tableOfContents}
    >
      <h2 id="understanding" className="text-2xl font-bold mb-4 scroll-mt-24">
        Understanding Flight Delays
      </h2>
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <p className="text-lg">
          <strong>Quick Summary:</strong> Under EU Regulation 261/2004, if your
          flight is delayed by 3 or more hours, you could be entitled to
          compensation of up to €600, depending on the flight distance and as
          long as the delay wasn't caused by extraordinary circumstances.
        </p>
      </div>

      <p>
        Flight delays are frustrating and can significantly impact your travel
        plans. Fortunately, EU Regulation 261/2004 provides passengers with
        rights to compensation when their flights are delayed. This guide will
        help you understand when you're eligible for compensation and how much
        you could receive.
      </p>

      <h3 id="eligibility" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        When Can You Claim Compensation for a Delayed Flight?
      </h3>
      <p>Under EU regulations, you may be entitled to compensation if:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>
          Your flight arrived at your final destination 3 or more hours later
          than planned
        </li>
        <li>The delay was not caused by extraordinary circumstances</li>
        <li>
          Your flight departed from an EU airport, or was operated by an
          EU-based airline arriving at an EU airport
        </li>
        <li>You checked in for your flight on time</li>
        <li>Your booking was confirmed</li>
        <li>
          You've made the claim within the specified time limits (varies by
          country)
        </li>
      </ul>

      <h3
        id="compensation-amount"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        How Much Compensation Can You Claim?
      </h3>
      <p className="mb-4">
        The amount of compensation is determined by the flight distance:
      </p>

      <div className="overflow-x-auto my-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold">Flight Distance</TableHead>
              <TableHead className="font-semibold">Delay Length</TableHead>
              <TableHead className="font-semibold">
                Compensation Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Up to 1,500 km</TableCell>
              <TableCell>3+ hours</TableCell>
              <TableCell className="font-semibold">€250</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>Between 1,500 km and 3,500 km</TableCell>
              <TableCell>3+ hours</TableCell>
              <TableCell className="font-semibold">€400</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Over 3,500 km (within the EU)</TableCell>
              <TableCell>3+ hours</TableCell>
              <TableCell className="font-semibold">€400</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>
                Over 3,500 km (between EU and non-EU airport)
              </TableCell>
              <TableCell>3-4 hours</TableCell>
              <TableCell className="font-semibold">€300</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Over 3,500 km (between EU and non-EU airport)
              </TableCell>
              <TableCell>4+ hours</TableCell>
              <TableCell className="font-semibold">€600</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <p>
        It's important to note that compensation is calculated based on the
        final destination and the total delay time upon arrival.
      </p>

      <h3
        id="additional-rights"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Additional Rights During a Delay
      </h3>
      <p>
        Besides financial compensation, airlines must provide you with care
        during extended delays:
      </p>

      <div className="bg-gray-50 p-5 rounded-lg mb-5">
        <h4 className="font-semibold mb-3">Right to Care</h4>
        <p className="mb-2">During long delays, the airline must provide:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Meals and refreshments proportionate to the waiting time</li>
          <li>Two telephone calls, emails, or faxes</li>
          <li>Hotel accommodation if an overnight stay becomes necessary</li>
          <li>Transport between the airport and the hotel</li>
        </ul>
      </div>

      <p>These rights apply when:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>The delay is 2 hours or more for flights of 1,500 km or less</li>
        <li>
          The delay is 3 hours or more for flights within the EU over 1,500 km
          and all other flights between 1,500-3,500 km
        </li>
        <li>The delay is 4 hours or more for all other flights</li>
      </ul>

      <h3
        id="extraordinary"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        What Are "Extraordinary Circumstances"?
      </h3>
      <p>
        Airlines can avoid paying compensation if they can prove the delay was
        caused by "extraordinary circumstances" beyond their control. These
        include:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Severe weather conditions</li>
        <li>Political instability</li>
        <li>Security risks</li>
        <li>Air traffic control restrictions</li>
        <li>Strikes (except those by airline staff)</li>
        <li>
          Safety issues discovered during pre-flight checks that couldn't have
          been identified during routine maintenance
        </li>
      </ul>

      <div className="bg-blue-50 p-6 rounded-lg my-6">
        <h4 className="font-semibold text-lg mb-2">Important to Know:</h4>
        <p>
          Most technical problems are NOT considered extraordinary circumstances
          following European Court of Justice rulings, as they're considered
          inherent to the normal activity of an airline. Airlines often
          incorrectly claim technical issues as extraordinary circumstances to
          avoid paying compensation.
        </p>
      </div>

      <h3
        id="how-to-claim"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        How To Claim Compensation for a Delayed Flight
      </h3>
      <div className="bg-blue-50 p-6 rounded-lg my-4">
        <h4 className="font-semibold text-lg mb-3">Step by Step Guide:</h4>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Gather all relevant documentation (booking confirmation, boarding
            passes, any communications from the airline)
          </li>
          <li>
            Document the delay (screenshots of the arrival board, communications
            about the delay)
          </li>
          <li>
            Calculate your potential compensation based on flight distance and
            delay time
          </li>
          <li>Submit a claim to the airline through their official channels</li>
          <li>
            If rejected, consider escalating to a national enforcement body or
            through a specialist service like CleverClaim
          </li>
        </ol>
      </div>

      <p>
        When submitting your claim, be clear, concise, and include all relevant
        documentation. Reference EU Regulation 261/2004 specifically and state
        the compensation amount you're entitled to based on the flight distance
        and delay time.
      </p>

      <h3 id="time-limits" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        Time Limits for Claiming Compensation
      </h3>
      <p>The time limit for filing a claim varies by country:</p>
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
              <TableCell>Germany, Switzerland</TableCell>
              <TableCell>3 years</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>France, Italy</TableCell>
              <TableCell>5 years</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>Spain, Portugal</TableCell>
              <TableCell>1 year</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <p>
        It's advisable to submit your claim as soon as possible after the delay
        to ensure all details are fresh and relevant documentation is available.
      </p>

      <h3 id="myths" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        Common Myths About Flight Delay Compensation
      </h3>
      <div className="space-y-4 mb-6">
        <div className="border-b pb-4">
          <p>
            <strong>Myth:</strong> You need to have travel insurance to claim
            compensation.
          </p>
          <p>
            <strong>Fact:</strong> EU261 compensation is a legal right
            independent of any insurance.
          </p>
        </div>
        <div className="border-b pb-4">
          <p>
            <strong>Myth:</strong> You can only claim compensation if your
            flight was booked directly with the airline.
          </p>
          <p>
            <strong>Fact:</strong> You can claim regardless of how you booked
            (directly, via a travel agent, or as part of a package).
          </p>
        </div>
        <div className="border-b pb-4">
          <p>
            <strong>Myth:</strong> Technical issues always qualify as
            extraordinary circumstances.
          </p>
          <p>
            <strong>Fact:</strong> Most technical problems are considered part
            of an airline's normal operations.
          </p>
        </div>
        <div>
          <p>
            <strong>Myth:</strong> Airlines will automatically compensate you if
            your flight is delayed.
          </p>
          <p>
            <strong>Fact:</strong> You almost always need to actively submit a
            claim to receive compensation.
          </p>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="bg-blue-50 p-6 rounded-lg my-8">
        <h3 className="text-xl font-semibold mb-3">
          Need Help With Your Claim?
        </h3>
        <p className="mb-4">
          CleverClaim specializes in helping passengers get the compensation
          they deserve. Our simple process and no-win, no-fee approach means
          there's no risk to you. Let us handle the complexity of dealing with
          airlines while you focus on what matters.
        </p>
        <Button asChild>
          <Link to="/claim">Start Your Claim Now</Link>
        </Button>
      </div>
    </RightsPageLayout>
  );
};

export default DelayedFlightCompensation;
