import React from 'react';
import RightsPageLayout from '@/components/rights/RightsPageLayout';
import {
  AlertCircleIcon,
  CheckCircleIcon,
  InfoIcon,
  Clock3Icon,
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import InfoCard from '@/components/common/InfoCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import AnimatedButton from '@/components/ui-custom/AnimatedButton';

const AirlineStrikeCompensation = () => {
  const relatedLinks = [
    { title: 'Air Passenger Rights', href: '/rights/air-passenger-rights' },
    {
      title: 'Cancelled Flight Compensation',
      href: '/rights/cancelled-flight-compensation',
    },
    {
      title: 'Delayed Flight Compensation',
      href: '/rights/delayed-flight-compensation',
    },
    { title: 'Flight Compensation', href: '/rights/flight-compensation' },
    {
      title: 'Missed Connection Compensation',
      href: '/rights/missed-connection-compensation',
    },
  ];

  const tableOfContents = [
    { id: 'strike-types', title: 'Different Types of Airline Strikes' },
    { id: 'eligibility', title: 'When Are You Eligible for Compensation?' },
    { id: 'compensation-amount', title: 'How Much Compensation Can You Get?' },
    { id: 'time-limits', title: 'Time Limits for Strike Compensation Claims' },
    { id: 'extraordinary', title: 'Strikes as Extraordinary Circumstances' },
    { id: 'passenger-rights', title: 'Passenger Rights During Strikes' },
    {
      id: 'claim-process',
      title: 'How to Claim Compensation for Strike Disruptions',
    },
    { id: 'faq', title: 'Frequently Asked Questions' },
  ];

  return (
    <RightsPageLayout
      title="Airline Strike Compensation"
      description="Your rights during airline strikes and how to claim compensation"
      metaTitle="Airline Strike Compensation Guide | CleverClaim"
      metaDescription="Learn about your passenger rights during airline strikes and how to claim compensation for flights disrupted by strike action under EU Regulation 261/2004."
      relatedLinks={relatedLinks}
      tableOfContents={tableOfContents}
    >
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <p className="text-lg">
          <strong>Quick Summary:</strong> Your right to compensation during an
          airline strike depends on who is striking. If it's airline staff
          (pilots, cabin crew), you may be entitled to up to €600 under EU
          Regulation 261/2004. If it's airport staff or air traffic controllers,
          compensation is unlikely as these are considered "extraordinary
          circumstances." Either way, you always have the right to care,
          reimbursement, or re-routing.
        </p>
      </div>

      <h2 id="strike-types" className="text-2xl font-bold mb-4 scroll-mt-24">
        Different Types of Airline Strikes
      </h2>
      <p className="mb-4">
        When it comes to flight disruptions caused by strikes, your compensation
        rights vary significantly depending on who exactly is striking.
        Understanding this distinction is crucial for knowing whether you're
        entitled to financial compensation on top of basic care and assistance.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-2 flex items-center">
            <CheckCircleIcon className="w-5 h-5 mr-2 text-primary" />
            Airline Staff Strikes
          </h4>
          <p>
            Strikes by the airline's own employees (pilots, cabin crew, airline
            ground staff) are generally considered within the airline's control.
            Recent court rulings have established that these are NOT
            extraordinary circumstances, meaning you likely have the right to
            compensation.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-2 flex items-center">
            <AlertCircleIcon className="w-5 h-5 mr-2 text-amber-500" />
            Third-Party Strikes
          </h4>
          <p>
            Strikes by third parties such as air traffic controllers, airport
            security, ground handlers not employed by the airline, or baggage
            handlers are typically considered extraordinary circumstances beyond
            the airline's control, meaning compensation is unlikely in these
            cases.
          </p>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg my-6">
        <h4 className="font-semibold text-lg mb-2">Important Court Ruling:</h4>
        <p>
          In April 2018, the European Court of Justice ruled in the TUIfly case
          (C-195/17) that "wildcat strikes" (spontaneous staff walkouts)
          resulting from sudden company announcements cannot be considered
          "extraordinary circumstances." This landmark decision means airlines
          cannot use internal staff strikes to avoid paying compensation.
        </p>
      </div>

      <h2
        id="eligibility"
        className="text-2xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        When Are You Eligible for Compensation?
      </h2>
      <p className="mb-4">
        You may be entitled to compensation under EU Regulation 261/2004 if all
        of the following conditions are met:
      </p>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>
          Your flight was delayed by 3+ hours, cancelled, or you were denied
          boarding
        </li>
        <li>
          The disruption was caused by a strike of the airline's own staff
        </li>
        <li>
          Your flight was:
          <ul className="list-disc pl-6 mt-2">
            <li>Departing from an EU airport (any airline), or</li>
            <li>Arriving at an EU airport (EU-based airline only)</li>
          </ul>
        </li>
        <li>You were notified less than 14 days before departure</li>
        <li>
          The airline was not able to offer you suitable alternative
          arrangements
        </li>
      </ul>

      <h2
        id="compensation-amount"
        className="text-2xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        How Much Compensation Can You Get?
      </h2>
      <p className="mb-4">
        The compensation amount for flight disruptions caused by airline strikes
        is determined by the flight distance:
      </p>

      <div className="overflow-x-auto my-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold">Flight Distance</TableHead>
              <TableHead className="font-semibold">
                Compensation Amount
              </TableHead>
              <TableHead className="font-semibold">Conditions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Up to 1,500 km</TableCell>
              <TableCell className="font-semibold">€250</TableCell>
              <TableCell>Arrival delay of 3+ hours</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>1,500 km to 3,500 km</TableCell>
              <TableCell className="font-semibold">€400</TableCell>
              <TableCell>Arrival delay of 3+ hours</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Over 3,500 km (within EU)</TableCell>
              <TableCell className="font-semibold">€400</TableCell>
              <TableCell>Arrival delay of 3+ hours</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>Over 3,500 km (non-EU)</TableCell>
              <TableCell className="font-semibold">€600</TableCell>
              <TableCell>Arrival delay of 3+ hours</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Over 3,500 km (non-EU)</TableCell>
              <TableCell className="font-semibold">€300</TableCell>
              <TableCell>Arrival delay of 3-4 hours</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <h2
        id="time-limits"
        className="text-2xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Time Limits for Strike Compensation Claims
      </h2>
      <p className="mb-4">
        Time limits for filing a strike-related compensation claim vary by
        country where the airline is based:
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
              <TableCell>Ireland</TableCell>
              <TableCell>6 years</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Germany</TableCell>
              <TableCell>3 years</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>France</TableCell>
              <TableCell>5 years</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Italy</TableCell>
              <TableCell>2 years</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>Spain</TableCell>
              <TableCell>1 year</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center bg-amber-50 p-4 rounded-lg mb-6">
        <Clock3Icon className="flex-shrink-0 w-5 h-5 text-amber-500 mr-3" />
        <p className="text-sm">
          It's best to submit your claim as soon as possible after the strike
          disruption while details are fresh in your mind.
        </p>
      </div>

      <h2
        id="extraordinary"
        className="text-2xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Strikes as Extraordinary Circumstances
      </h2>
      <p className="mb-4">
        Not all strikes are treated equally under EU passenger rights law. The
        key distinction is whether the strike is considered an "extraordinary
        circumstance":
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-6">
        <InfoCard
          icon={<CheckCircleIcon className="w-5 h-5" />}
          title="NOT Extraordinary Circumstances"
          description="Airline staff strikes (pilots, cabin crew, airline employees) are generally considered within the airline's control, meaning you're likely eligible for compensation."
        />
        <InfoCard
          icon={<AlertCircleIcon className="w-5 h-5" />}
          title="Extraordinary Circumstances"
          description="Air traffic control strikes, airport staff strikes, and security personnel strikes are usually considered extraordinary circumstances beyond the airline's control."
        />
      </div>

      <div className="bg-blue-50 p-6 rounded-lg my-6">
        <h3 className="font-semibold text-lg mb-2">
          The Reasoning Behind This Distinction:
        </h3>
        <p>
          Courts have ruled that airlines have a responsibility to manage labor
          relations with their own staff, making these strikes part of their
          normal operations and not "extraordinary." In contrast, airlines have
          no control over third-party workers or their labor disputes, making
          those truly extraordinary events.
        </p>
      </div>

      <h2
        id="passenger-rights"
        className="text-2xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Passenger Rights During Strikes
      </h2>
      <p className="mb-4">
        Regardless of whether the strike is considered an extraordinary
        circumstance, you always have certain rights during a strike-related
        disruption:
      </p>

      <div className="grid md:grid-cols-3 gap-6 my-6">
        <InfoCard
          icon={<InfoIcon className="w-5 h-5" />}
          title="Right to Care"
          description="Meals, refreshments, communication facilities, and accommodation if necessary (including transport between the airport and hotel)."
          className="bg-gray-50"
        />
        <InfoCard
          icon={<InfoIcon className="w-5 h-5" />}
          title="Right to Reimbursement"
          description="Full refund of your ticket if you choose not to travel, plus a return flight to your first point of departure if needed."
          className="bg-gray-50"
        />
        <InfoCard
          icon={<InfoIcon className="w-5 h-5" />}
          title="Right to Re-routing"
          description="Alternative transportation to your final destination at the earliest opportunity or at a later date of your convenience."
          className="bg-gray-50"
        />
      </div>

      <div className="bg-amber-50 p-6 rounded-lg my-6">
        <h4 className="font-semibold text-lg mb-2 flex items-center">
          <AlertCircleIcon className="w-5 h-5 mr-2 text-amber-500" />
          Important Note:
        </h4>
        <p>
          Airlines sometimes try to minimize their obligations during strikes by
          claiming all strikes are extraordinary circumstances. Remember that
          internal staff strikes often DO qualify for compensation, and you
          should persist with your claim if you believe you're entitled.
        </p>
      </div>

      <h2
        id="claim-process"
        className="text-2xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        How to Claim Compensation for Strike Disruptions
      </h2>
      <ol className="list-decimal pl-6 space-y-3 mb-6">
        <li>
          <strong>Document the disruption</strong> - Save your boarding pass,
          booking confirmation, any communications from the airline about the
          strike, and receipts for any expenses incurred.
        </li>
        <li>
          <strong>Research the strike</strong> - Find out who was striking
          (airline staff vs. third parties) as this will determine your
          compensation eligibility.
        </li>
        <li>
          <strong>Contact the airline</strong> - Submit a formal claim to the
          airline, referencing EU Regulation 261/2004 and specifying that the
          strike was by airline staff (if applicable).
        </li>
        <li>
          <strong>Appeal if rejected</strong> - Airlines often initially reject
          strike-related claims. If this happens, appeal with reference to the
          relevant court rulings (like the TUIfly case).
        </li>
        <li>
          <strong>Contact a National Enforcement Body</strong> - If the airline
          still refuses, you can escalate to the aviation authority in the
          country where the disruption occurred.
        </li>
        <li>
          <strong>Consider using CleverClaim</strong> - If you're facing
          resistance from the airline, our experts can handle your claim on a
          "no win, no fee" basis.
        </li>
      </ol>

      <h2 id="faq" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-medium">
            Can I get compensation for flights disrupted by air traffic control
            strikes?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            Generally, no. Air traffic control strikes are considered
            "extraordinary circumstances" beyond the airline's control, so
            financial compensation typically isn't required. However, you're
            still entitled to care (meals, accommodation) and either a refund or
            re-routing, regardless of the strike cause.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-medium">
            What evidence do I need to support my strike-related claim?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            Gather as much documentation as possible: your boarding pass,
            booking confirmation, communications from the airline about the
            disruption, news articles about the strike (specifying who was
            striking), receipts for any expenses, and documentation of when you
            finally arrived at your destination.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-medium">
            What if I was notified about the strike weeks in advance?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            If the airline notified you more than 14 days before your scheduled
            departure and offered alternative arrangements, you typically won't
            be eligible for compensation. However, you're still entitled to a
            full refund if you choose not to take the alternative flight.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-medium">
            Can airlines refuse care and assistance during strikes?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            No. Regardless of whether the strike is considered an "extraordinary
            circumstance," airlines have a duty of care to passengers during
            disruptions. This includes providing meals, refreshments,
            communication facilities, and accommodation if necessary. This is a
            separate obligation from compensation.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg font-medium">
            What if my flight was re-routed due to a strike but arrived late?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            If your alternative flight arrived at your destination with a delay
            of 3+ hours, and the strike was by airline staff, you may still be
            entitled to compensation. The key factor is the total delay in
            reaching your final destination compared to your original schedule.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="my-8" />

      <div className="grid md:grid-cols-2 gap-8 my-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">
            Uncertain About Your Rights?
          </h3>
          <p className="mb-4">
            Our free eligibility check can instantly tell you if your
            strike-disrupted flight qualifies for compensation. It takes just a
            minute and there's no obligation.
          </p>
          <AnimatedButton to="/claim" variant="primary" size="lg">
            Check Your Eligibility Now
          </AnimatedButton>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">
            Why Choose CleverClaim?
          </h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>No win, no fee policy</li>
            <li>Success rate of 98% on valid claims</li>
            <li>Expert knowledge of airline strike compensation</li>
            <li>We handle all communication with the airline</li>
            <li>Regular updates on your claim's progress</li>
          </ul>
          <AnimatedButton to="/#how-it-works" variant="secondary" size="md">
            Learn How It Works
          </AnimatedButton>
        </div>
      </div>
    </RightsPageLayout>
  );
};

export default AirlineStrikeCompensation;
