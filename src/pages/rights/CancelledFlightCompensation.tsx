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

const CancelledFlightCompensation = () => {
  const relatedLinks = [
    { title: 'Air Passenger Rights', href: '/rights/air-passenger-rights' },
    {
      title: 'Delayed Flight Compensation',
      href: '/rights/delayed-flight-compensation.svg',
    },
    { title: 'Flight Compensation', href: '/rights/flight-compensation.svg' },
    {
      title: 'Missed Connection Compensation',
      href: '/rights/missed-connection-compensation.svg',
    },
    {
      title: 'Airline Strike Compensation',
      href: '/rights/airline-strike-compensation.svg',
    },
  ];

  const tableOfContents = [
    { id: 'understanding', title: 'Understanding Flight Cancellations' },
    { id: 'eligibility', title: 'When Can You Claim Compensation?' },
    {
      id: 'compensation.svg-amount',
      title: 'How Much Compensation Can You Claim?',
    },
    {
      id: 'additional-rights',
      title: 'Additional Rights During Cancellations',
    },
    { id: 'extraordinary', title: 'Extraordinary Circumstances' },
    { id: 'how-to-claim', title: 'How To Claim Compensation' },
    { id: 'time-limits', title: 'Time Limits for Claims' },
    { id: 'faq', title: 'Frequently Asked Questions' },
  ];

  return (
    <RightsPageLayout
      title="Cancelled Flight Compensation"
      description="Learn how to claim up to €600 for your cancelled flight"
      metaTitle="Cancelled Flight Compensation Guide | CleverClaim"
      metaDescription="Everything you need to know about claiming compensation for cancelled flights under EU Regulation 261/2004 and how to get up to €600 in compensation."
      relatedLinks={relatedLinks}
      tableOfContents={tableOfContents}
    >
      <h2 id="understanding" className="text-2xl font-bold mb-4 scroll-mt-24">
        Understanding Flight Cancellations
      </h2>
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <p className="text-lg">
          <strong>Quick Summary:</strong> Under EU Regulation 261/2004, if your
          flight is cancelled and you were informed less than 14 days before
          departure, you could be entitled to compensation of up to €600, unless
          the cancellation was caused by extraordinary circumstances.
        </p>
      </div>

      <p>
        Having your flight cancelled can be a major disruption to your travel
        plans. Fortunately, EU Regulation 261/2004 provides robust protection
        for passengers affected by flight cancellations. This guide explains
        your rights and how to claim the compensation you may be entitled to.
      </p>

      <h3 id="eligibility" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        When Can You Claim Compensation for a Cancelled Flight?
      </h3>
      <p>
        Under EU Regulation 261/2004, you may be entitled to compensation for a
        cancelled flight if:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>
          Your flight was scheduled to depart from an EU airport, or was
          operated by an EU airline flying into an EU airport
        </li>
        <li>
          You were informed of the cancellation less than 14 days before the
          scheduled departure
        </li>
        <li>The cancellation was not caused by extraordinary circumstances</li>
        <li>
          You checked in for your flight on time (or would have if the flight
          hadn't been cancelled)
        </li>
      </ul>

      <div className="bg-gray-50 p-5 rounded-lg mb-6">
        <h4 className="font-semibold mb-3">Notice Period Exceptions:</h4>
        <p className="mb-2">
          You may not be entitled to compensation if the airline:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Informed you more than 14 days before your scheduled departure date
          </li>
          <li>
            Informed you between 7 and 14 days before departure and offered
            re-routing that departed no more than 2 hours before and arrived
            less than 4 hours after your original flight
          </li>
          <li>
            Informed you less than 7 days before departure and offered
            re-routing that departed no more than 1 hour before and arrived less
            than 2 hours after your original flight
          </li>
        </ul>
      </div>

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
              <TableHead className="font-semibold">
                Compensation Amount
              </TableHead>
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
              <TableCell>Over 3,500 km (within the EU)</TableCell>
              <TableCell className="font-semibold">€400</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>
                Over 3,500 km (between EU and non-EU airport)
              </TableCell>
              <TableCell className="font-semibold">€600</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <p>
        It's important to note that compensation is calculated based on the
        scheduled flight's route and distance, not the alternative flight you
        may have been offered.
      </p>

      <h3
        id="additional-rights"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Additional Rights During Cancellations
      </h3>
      <p>
        Besides financial compensation, when your flight is cancelled, you have
        the right to choose between:
      </p>

      <div className="bg-gray-50 p-5 rounded-lg mb-5">
        <h4 className="font-semibold mb-3">Your Options</h4>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Reimbursement</strong> of the full cost of your ticket for
            the unused parts of your journey
          </li>
          <li>
            <strong>Re-routing</strong> to your final destination at the
            earliest opportunity
          </li>
          <li>
            <strong>Re-routing</strong> at a later date of your convenience,
            subject to seat availability
          </li>
        </ol>
      </div>

      <div className="bg-gray-50 p-5 rounded-lg mb-5">
        <h4 className="font-semibold mb-3">Right to Care</h4>
        <p className="mb-2">
          While waiting for your re-routed flight, the airline must provide:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Meals and refreshments proportionate to the waiting time</li>
          <li>Two telephone calls, emails, or faxes</li>
          <li>Hotel accommodation if an overnight stay becomes necessary</li>
          <li>Transport between the airport and the hotel</li>
        </ul>
      </div>

      <p>
        These rights apply regardless of whether you're entitled to compensation
        or not.
      </p>

      <h3
        id="extraordinary"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        What Are "Extraordinary Circumstances"?
      </h3>
      <p>
        Airlines can avoid paying compensation if they can prove the
        cancellation was caused by "extraordinary circumstances" that could not
        have been avoided even if all reasonable measures had been taken. These
        include:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Severe weather conditions (like storms or heavy snowfall)</li>
        <li>Political instability</li>
        <li>Security risks</li>
        <li>Unexpected flight safety shortcomings</li>
        <li>Air traffic control restrictions</li>
        <li>
          Strikes that affect airport operations (but not airline staff strikes)
        </li>
      </ul>

      <div className="bg-blue-50 p-6 rounded-lg my-6">
        <h4 className="font-semibold text-lg mb-2">Important to Know:</h4>
        <p>
          Technical issues with the aircraft are generally NOT considered
          extraordinary circumstances following European Court of Justice
          rulings, as they're considered part of the normal operation of an
          airline. Airlines often incorrectly claim technical issues as
          extraordinary circumstances to avoid paying compensation.
        </p>
      </div>

      <h3
        id="how-to-claim"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        How To Claim Compensation for a Cancelled Flight
      </h3>
      <div className="bg-blue-50 p-6 rounded-lg my-4">
        <h4 className="font-semibold text-lg mb-3">Step by Step Guide:</h4>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Gather all relevant documentation (booking confirmation,
            communication about the cancellation)
          </li>
          <li>
            Check if you're eligible based on the notice period and
            circumstances of the cancellation
          </li>
          <li>
            Calculate your potential compensation based on flight distance
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
        the compensation amount you're entitled to based on the flight distance.
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
        It's advisable to submit your claim as soon as possible after the
        cancellation to ensure all details are fresh and relevant documentation
        is available.
      </p>

      <h3 id="faq" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        Frequently Asked Questions
      </h3>
      <div className="space-y-4 mb-6">
        <div className="border-b pb-4">
          <p>
            <strong>
              Can I claim if my flight was cancelled due to COVID-19?
            </strong>
          </p>
          <p>
            Generally, cancellations due to government travel restrictions
            related to COVID-19 would likely be considered extraordinary
            circumstances. However, each case is unique and may have different
            outcomes.
          </p>
        </div>
        <div className="border-b pb-4">
          <p>
            <strong>What if I accepted a voucher instead of a refund?</strong>
          </p>
          <p>
            Accepting a voucher for a future flight doesn't necessarily affect
            your right to claim compensation. However, if you accepted a voucher
            explicitly as a full settlement for all claims, this might impact
            your case.
          </p>
        </div>
        <div className="border-b pb-4">
          <p>
            <strong>
              Can I claim for expenses incurred due to the cancellation?
            </strong>
          </p>
          <p>
            EU261 compensation is standardized and doesn't cover additional
            expenses. However, you might be able to claim for reasonable
            expenses through your travel insurance or, in some cases, from the
            airline if they failed to provide the care they were required to.
          </p>
        </div>
        <div>
          <p>
            <strong>What if my connecting flight was cancelled?</strong>
          </p>
          <p>
            If your journey involved connecting flights booked as a single
            reservation and one leg was cancelled, you may be entitled to
            compensation based on the total distance of the journey to the final
            destination.
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

export default CancelledFlightCompensation;
