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
import { CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import InfoCard from '@/components/common/InfoCard';

const DeniedBoardingCompensation = () => {
  const relatedLinks = [
    { title: 'Air Passenger Rights', href: '/rights/air-passenger-rights' },
    {
      title: 'Overbooked Flight Compensation',
      href: '/rights/overbooked-flight-compensation',
    },
    {
      title: 'Cancelled Flight Compensation',
      href: '/rights/cancelled-flight-compensation',
    },
    { title: 'Flight Compensation', href: '/rights/flight-compensation' },
  ];

  const tableOfContents = [
    { id: 'understanding', title: 'Understanding Denied Boarding' },
    { id: 'eligibility', title: 'When Are You Eligible for Compensation?' },
    { id: 'compensation-amount', title: 'How Much Compensation Can You Get?' },
    {
      id: 'additional-rights',
      title: 'Additional Rights When Denied Boarding',
    },
    {
      id: 'voluntary-vs-involuntary',
      title: 'Voluntary vs. Involuntary Denied Boarding',
    },
    { id: 'exceptions', title: 'Exceptions to Compensation' },
    { id: 'how-to-claim', title: 'How to Claim Compensation' },
    { id: 'faq', title: 'Frequently Asked Questions' },
  ];

  return (
    <RightsPageLayout
      title="Denied Boarding Compensation"
      description="Your rights when you're denied boarding a flight"
      metaTitle="Denied Boarding Compensation Guide | CleverClaim"
      metaDescription="Learn about your rights and how to claim compensation when denied boarding a flight under EU Regulation 261/2004."
      relatedLinks={relatedLinks}
      tableOfContents={tableOfContents}
    >
      <h2 id="understanding" className="text-2xl font-bold mb-4 scroll-mt-24">
        Understanding Denied Boarding
      </h2>
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <p className="text-lg">
          <strong>Quick Summary:</strong> Under EU Regulation 261/2004, if
          you're denied boarding against your will on a flight for which you
          have a valid reservation and have checked in on time, you could be
          entitled to compensation of up to €600, immediate assistance, and the
          choice between a refund or re-routing.
        </p>
      </div>

      <p>
        Being denied boarding is a frustrating experience that can severely
        disrupt your travel plans. This most commonly happens due to
        overbooking, where airlines sell more tickets than available seats on
        the flight. Under EU Regulation 261/2004, passengers have specific
        rights when they're denied boarding against their will.
      </p>

      <h3 id="eligibility" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        When Are You Eligible for Compensation?
      </h3>
      <p>You may be entitled to compensation for denied boarding if:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>You have a valid ticket and booking confirmation</li>
        <li>
          You checked in on time (or at least within the airline's stated
          deadline)
        </li>
        <li>You have the necessary travel documents (passport, visa, etc.)</li>
        <li>You were denied boarding against your will (not voluntarily)</li>
        <li>
          The flight was scheduled to depart from an EU airport, or was operated
          by an EU airline flying into an EU airport
        </li>
      </ul>

      <h3
        id="compensation-amount"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        How Much Compensation Can You Get?
      </h3>
      <p className="mb-4">
        If you're involuntarily denied boarding, you're entitled to immediate
        compensation based on the flight distance:
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
              <TableCell>Over 3,500 km</TableCell>
              <TableCell className="font-semibold">€600</TableCell>
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
          This compensation must be paid immediately at the airport, in cash, by
          electronic bank transfer, or by check. Airlines may offer travel
          vouchers, but you have the right to demand payment in one of these
          forms instead.
        </p>
      </div>

      <h3
        id="additional-rights"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Additional Rights When Denied Boarding
      </h3>
      <p>
        Besides financial compensation, you have the right to choose between:
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-6">
        <InfoCard
          title="Reimbursement"
          description="Full refund of your ticket cost within 7 days (for the unused parts of your journey)"
          className="md:col-span-1"
        />
        <InfoCard
          title="Re-routing (Option 1)"
          description="To your final destination at the earliest opportunity under comparable transport conditions"
          className="md:col-span-1"
        />
        <InfoCard
          title="Re-routing (Option 2)"
          description="To your final destination at a later date at your convenience, subject to seat availability"
          className="md:col-span-1"
        />
      </div>

      <h4 className="text-lg font-semibold mt-6 mb-3">Right to Care</h4>
      <p className="mb-4">
        While waiting for your re-routed flight, the airline must provide:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Meals and refreshments proportionate to the waiting time</li>
        <li>Two telephone calls, emails, or faxes</li>
        <li>Hotel accommodation if an overnight stay becomes necessary</li>
        <li>Transport between the airport and the hotel</li>
      </ul>

      <h3
        id="voluntary-vs-involuntary"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Voluntary vs. Involuntary Denied Boarding
      </h3>
      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">Voluntary</h4>
          <p>
            When a flight is overbooked, airlines typically ask for volunteers
            to give up their seats in exchange for benefits (like travel
            vouchers or upgrades). If you <strong>voluntarily</strong> surrender
            your seat, you're not entitled to the standard compensation, but you
            should still receive the benefits agreed upon with the airline.
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">Involuntary</h4>
          <p>
            If not enough passengers volunteer and you're{' '}
            <strong>involuntarily</strong> denied boarding, you're entitled to
            the full compensation under EU261, assistance, and your choice of
            reimbursement or re-routing.
          </p>
        </div>
      </div>

      <h3 id="exceptions" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        Exceptions to Compensation
      </h3>
      <p>
        You may not be entitled to compensation if you're denied boarding for
        "reasonable grounds," such as:
      </p>
      <div className="bg-gray-50 p-5 rounded-lg mb-6">
        <ul className="list-disc pl-6 space-y-2">
          <li>Health, safety, or security reasons</li>
          <li>
            Inadequate travel documentation (missing or invalid passport, visa,
            etc.)
          </li>
          <li>Arriving at the gate after it has closed</li>
          <li>Being under the influence of alcohol or drugs</li>
          <li>Demonstrating aggressive or disruptive behavior</li>
        </ul>
      </div>

      <h3
        id="how-to-claim"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        How to Claim Compensation for Denied Boarding
      </h3>
      <div className="bg-blue-50 p-6 rounded-lg my-4">
        <h4 className="font-semibold text-lg mb-3">Step by Step Guide:</h4>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Request written confirmation from the airline stating why you were
            denied boarding
          </li>
          <li>
            Keep all documentation including your boarding pass, ticket, and any
            communication from the airline
          </li>
          <li>
            Take note of the actual timing of events and any alternatives
            offered
          </li>
          <li>
            Contact the airline directly with your claim, referencing EU
            Regulation 261/2004
          </li>
          <li>
            If the airline doesn't respond adequately, consider escalating to a
            national enforcement body or seeking professional help
          </li>
        </ol>
      </div>

      <div className="my-8">
        <h4 className="font-semibold text-lg mb-3">Time Limits for Claims</h4>
        <p className="mb-4">
          The time limit for filing a denied boarding compensation claim varies
          by country:
        </p>
        <div className="overflow-x-auto">
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
            </TableBody>
          </Table>
        </div>
      </div>

      <h3 id="faq" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        Frequently Asked Questions
      </h3>
      <div className="space-y-4 mb-6">
        <div className="border-b pb-4">
          <p>
            <strong>Can airlines legally overbook flights?</strong>
          </p>
          <p>
            Yes, airlines legally can overbook flights. However, they must first
            ask for volunteers before involuntarily denying boarding to
            passengers.
          </p>
        </div>
        <div className="border-b pb-4">
          <p>
            <strong>
              What if I'm traveling as part of a group and only some of us are
              denied boarding?
            </strong>
          </p>
          <p>
            Each passenger denied boarding is individually entitled to
            compensation. However, if you're traveling as a family with
            children, the airline should prioritize keeping your group together.
          </p>
        </div>
        <div className="border-b pb-4">
          <p>
            <strong>
              Can I claim compensation if I voluntarily gave up my seat?
            </strong>
          </p>
          <p>
            If you voluntarily surrendered your seat in exchange for benefits
            offered by the airline, you're not entitled to the standard
            compensation under EU261. The benefits you receive are determined by
            your agreement with the airline.
          </p>
        </div>
        <div className="border-b pb-4">
          <p>
            <strong>
              What if the airline offers me a voucher instead of cash
              compensation?
            </strong>
          </p>
          <p>
            Airlines may offer vouchers, but you have the right to demand
            payment in cash, by electronic bank transfer, or by check instead.
            Only accept a voucher if its value exceeds the compensation you're
            entitled to by law.
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

export default DeniedBoardingCompensation;
