import React from 'react';
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
import {
  AlertCircle,
  Clock,
  Luggage,
  CheckCircle,
  BaggageClaim,
  AlertTriangle,
  Info,
} from 'lucide-react';
import InfoCard from '@/components/common/InfoCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import AnimatedButton from '@/components/ui-custom/AnimatedButton';

const DelayedBaggageCompensation = () => {
  const relatedLinks = [
    { title: 'Air Passenger Rights', href: '/rights/air-passenger-rights' },
    { title: 'Flight Compensation', href: '/rights/flight-compensation.svg' },
    {
      title: 'Delayed Flight Compensation',
      href: '/rights/delayed-flight-compensation.svg',
    },
    {
      title: 'Cancelled Flight Compensation',
      href: '/rights/cancelled-flight-compensation.svg',
    },
  ];

  const tableOfContents = [
    {
      id: 'legal-framework',
      title: 'Legal Framework: The Montreal Convention',
    },
    { id: 'baggage-issues', title: 'Types of Baggage Issues and Your Rights' },
    { id: 'steps', title: 'Steps to Take When Your Baggage is Mishandled' },
    {
      id: 'compensation.svg-claims',
      title: 'Maximizing Your Compensation Claim',
    },
    { id: 'liability', title: 'Airline Liability Limitations' },
    { id: 'prevention', title: 'Tips for Preventing Baggage Issues' },
  ];

  return (
    <RightsPageLayout
      title="Delayed, Damaged, or Lost Luggage Compensation"
      description="Your rights when an airline mishandles your baggage"
      metaTitle="Delayed, Damaged, or Lost Luggage Compensation Guide | CleverClaim"
      metaDescription="Learn how to claim compensation for delayed, damaged, or lost luggage under the Montreal Convention and your passenger rights for baggage issues."
      relatedLinks={relatedLinks}
      tableOfContents={tableOfContents}
    >
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <p className="text-lg">
          <strong>Quick Summary:</strong> When your baggage is delayed, damaged,
          or lost during air travel, you're entitled to compensation under the
          Montreal Convention. Maximum compensation is approximately 1,288 SDR
          (about €1,500/$1,780) per passenger. You must report damaged baggage
          within 7 days, delayed baggage within 21 days, and any legal claim
          must be filed within 2 years. Always file a Property Irregularity
          Report (PIR) before leaving the airport.
        </p>
      </div>

      <h2>Your Rights When Airlines Mishandle Your Baggage</h2>
      <p>
        Having your luggage delayed, damaged, or lost can significantly impact
        your trip. Fortunately, international agreements protect passengers
        whose baggage is mishandled. This guide explains your rights and how to
        claim compensation for baggage-related issues.
      </p>

      <h3
        id="legal-framework"
        className="text-2xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Legal Framework: The Montreal Convention
      </h3>
      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-2 flex items-center">
            <Info className="w-5 h-5 mr-2 text-primary" />
            Montreal Convention Coverage
          </h4>
          <p>
            Unlike flight delays and cancellations, which are governed by EU
            Regulation 261/2004, baggage issues are primarily covered by the
            Montreal Convention. This international treaty applies to most
            international flights and establishes airline liability for baggage
            problems.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-2 flex items-center">
            <BaggageClaim className="w-5 h-5 mr-2 text-primary" />
            Compensation Limits
          </h4>
          <p>
            Under the Montreal Convention, airlines are liable for delayed,
            damaged, and lost baggage with a maximum compensation of
            approximately 1,288 Special Drawing Rights (SDR) per passenger
            (approximately €1,500 or $1,780, though exact amounts fluctuate with
            exchange rates).
          </p>
        </div>
      </div>

      <h3
        id="baggage-issues"
        className="text-2xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Types of Baggage Issues and Your Rights
      </h3>

      <div className="overflow-x-auto my-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold">Baggage Issue</TableHead>
              <TableHead className="font-semibold">Your Rights</TableHead>
              <TableHead className="font-semibold">Time Limits</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-amber-500" />
                  <span className="font-medium">Delayed Baggage</span>
                </div>
              </TableCell>
              <TableCell>
                <ul className="list-disc list-inside">
                  <li>Reimbursement for essential items</li>
                  <li>Assistance in locating and delivering your baggage</li>
                </ul>
              </TableCell>
              <TableCell>
                Report immediately and file written claim within 21 days
              </TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>
                <div className="flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                  <span className="font-medium">Damaged Baggage</span>
                </div>
              </TableCell>
              <TableCell>
                <ul className="list-disc list-inside">
                  <li>Repair of damaged items</li>
                  <li>Replacement of items that cannot be repaired</li>
                  <li>Compensation for depreciated value</li>
                </ul>
              </TableCell>
              <TableCell>Report within 7 days of receiving baggage</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex items-center">
                  <Luggage className="mr-2 h-5 w-5 text-gray-500" />
                  <span className="font-medium">Lost Baggage</span>
                </div>
              </TableCell>
              <TableCell>
                <ul className="list-disc list-inside">
                  <li>Compensation for value of lost items (up to limit)</li>
                  <li>Reimbursement of baggage fees</li>
                </ul>
              </TableCell>
              <TableCell>Typically declared after 21 days of delay</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg my-6">
        <h4 className="font-semibold mb-2">Important Time Limits:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Damaged baggage: Report within 7 days of receiving your baggage
          </li>
          <li>
            Delayed baggage: Report immediately at the airport and file a
            written claim within 21 days
          </li>
          <li>
            Legal action: Must be initiated within 2 years from the date of
            arrival
          </li>
        </ul>
      </div>

      <h3 id="steps" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">
        Steps to Take When Your Baggage is Mishandled
      </h3>

      <div className="grid md:grid-cols-3 gap-6 my-6">
        <InfoCard
          icon={<Clock className="w-5 h-5" />}
          title="For Delayed Baggage"
          description="Report immediately at the baggage desk, complete a PIR, keep the reference number, save receipts for essential purchases, and follow up regularly."
          className="bg-amber-50"
        />

        <InfoCard
          icon={<AlertCircle className="w-5 h-5" />}
          title="For Damaged Baggage"
          description="Report damage immediately, complete a PIR detailing the damage, take photos as evidence, follow up within 7 days, and provide proof of value."
          className="bg-red-50"
        />

        <InfoCard
          icon={<Luggage className="w-5 h-5" />}
          title="For Lost Baggage"
          description="After 21 days, contact the airline to declare it lost, submit a detailed inventory of contents, provide evidence of value, and submit a formal claim."
          className="bg-gray-50"
        />
      </div>

      <h4 className="text-xl font-bold mt-6 mb-3">For Delayed Baggage:</h4>
      <ol className="list-decimal pl-6 space-y-2 mb-6">
        <li>
          Report the missing baggage immediately at the airline's baggage desk
          before leaving the airport
        </li>
        <li>
          Complete a Property Irregularity Report (PIR) with detailed
          descriptions of your baggage
        </li>
        <li>Get a copy of the PIR and note the reference number</li>
        <li>
          Keep receipts for all essential items you purchase while waiting for
          your baggage
        </li>
        <li>
          Follow up with the airline regularly regarding the status of your
          baggage
        </li>
      </ol>

      <h4 className="text-xl font-bold mt-6 mb-3">For Damaged Baggage:</h4>
      <ol className="list-decimal pl-6 space-y-2 mb-6">
        <li>Report the damage immediately at the airport baggage desk</li>
        <li>
          Complete a Property Irregularity Report (PIR) detailing the damage
        </li>
        <li>Take photographs of the damaged baggage and items</li>
        <li>Follow up with a written claim within 7 days</li>
        <li>
          Provide evidence of the value of damaged items (receipts, photos,
          etc.)
        </li>
      </ol>

      <h4 className="text-xl font-bold mt-6 mb-3">For Lost Baggage:</h4>
      <ol className="list-decimal pl-6 space-y-2 mb-6">
        <li>
          If your baggage hasn't been found after 21 days, contact the airline
          to declare it officially lost
        </li>
        <li>Submit a detailed inventory of the contents of your baggage</li>
        <li>Provide evidence of the value of lost items where possible</li>
        <li>Submit a formal compensation claim to the airline</li>
      </ol>

      <h3
        id="compensation-claims"
        className="text-2xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Maximizing Your Compensation Claim
      </h3>

      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">Documentation Tips</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Keep detailed records of all communications with the airline
            </li>
            <li>Maintain a comprehensive inventory of your baggage contents</li>
            <li>
              Take photographs of your baggage before travel when possible
            </li>
            <li>Keep receipts for valuable items in your luggage</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">Claim Strategies</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Be reasonable in your claims for essential purchases during delays
            </li>
            <li>Submit your claim promptly, within the required timeframes</li>
            <li>
              Follow up persistently if you don't receive a timely response
            </li>
            <li>
              Consider travel insurance that offers additional baggage
              protection
            </li>
          </ul>
        </div>
      </div>

      <h3 id="liability" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">
        Airline Liability Limitations
      </h3>
      <p className="mb-4">
        It's important to understand that there are limitations to airline
        liability:
      </p>

      <div className="overflow-x-auto my-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold">Item Type</TableHead>
              <TableHead className="font-semibold">Liability Status</TableHead>
              <TableHead className="font-semibold">Recommendation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Fragile items</TableCell>
              <TableCell className="text-red-500">
                Limited or no coverage
              </TableCell>
              <TableCell>Carry in cabin baggage</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>Electronics and valuables</TableCell>
              <TableCell className="text-red-500">
                Limited or no coverage
              </TableCell>
              <TableCell>
                Carry in cabin baggage or purchase insurance
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cash and documents</TableCell>
              <TableCell className="text-red-500">
                Usually not covered
              </TableCell>
              <TableCell>Always carry in cabin baggage</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>Regular clothing/items</TableCell>
              <TableCell className="text-amber-500">
                Covered with depreciation applied
              </TableCell>
              <TableCell>Document value before travel</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Any item over SDR limit</TableCell>
              <TableCell className="text-amber-500">
                Only covered up to maximum limit
              </TableCell>
              <TableCell>Consider separate insurance</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center bg-amber-50 p-5 rounded-lg mb-6">
        <AlertCircle className="flex-shrink-0 w-6 h-6 text-amber-500 mr-4" />
        <p>
          For particularly valuable items, consider carrying them in your cabin
          baggage or purchasing additional insurance. Airlines have a maximum
          liability cap of approximately 1,288 SDR per passenger regardless of
          the actual value of your luggage.
        </p>
      </div>

      <h3 id="prevention" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">
        Tips for Preventing Baggage Issues
      </h3>

      <div className="grid md:grid-cols-2 gap-6 my-6">
        <InfoCard
          icon={<CheckCircle className="w-5 h-5" />}
          title="Baggage Identification"
          description="Use distinctive luggage tags, remove old airline tags, and place identification information both inside and outside your luggage."
          className="bg-blue-50"
        />

        <InfoCard
          icon={<CheckCircle className="w-5 h-5" />}
          title="Packing Strategies"
          description="Pack essential items and valuables in your carry-on, take photos of packed luggage, and consider using luggage tracking devices."
          className="bg-green-50"
        />
      </div>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Use distinctive luggage tags and identifiers</li>
        <li>Remove old airline tags from previous flights</li>
        <li>
          Place identification information inside your luggage as well as
          outside
        </li>
        <li>Consider using luggage tracking devices</li>
        <li>Take a photo of your packed luggage before closing it</li>
        <li>
          Arrive at the airport with sufficient time for proper baggage handling
        </li>
        <li>Pack essential items and valuables in your carry-on luggage</li>
      </ul>

      <h3 id="faq" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">
        Frequently Asked Questions
      </h3>
      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-medium">
            What's the difference between delayed and lost baggage?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            Baggage is considered "delayed" when it doesn't arrive with your
            flight but the airline knows where it is and expects to deliver it
            to you. Most airlines consider baggage "lost" if it hasn't been
            found within 21 days. The compensation approach differs: for delayed
            baggage, you can claim essentials while waiting; for lost baggage,
            you claim for the full value of the luggage and its contents.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-medium">
            Can I claim for emotional distress caused by lost luggage?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            Generally, no. The Montreal Convention limits compensation to
            material damages and doesn't provide for compensation for emotional
            distress or inconvenience. Your claim should focus on the actual
            financial losses incurred due to the baggage issue, such as the
            value of lost items or costs of essential purchases while waiting
            for delayed baggage.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-medium">
            What if the airline offers vouchers instead of cash compensation?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            Airlines often try to offer vouchers for future flights instead of
            cash compensation. You are not obligated to accept this offer. Under
            the Montreal Convention, you are entitled to monetary compensation
            for your losses up to the maximum liability limit. If you prefer
            cash compensation, you can insist on this and reject voucher offers.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-medium">
            Does travel insurance cover what airlines don't?
          </AccordionTrigger>
          <AccordionContent className="text-gray-700">
            Yes, comprehensive travel insurance often provides additional
            coverage beyond airline liability limits. Many policies include
            higher compensation limits for baggage and may cover items that
            airlines typically exclude (like electronics or jewelry). They may
            also offer immediate emergency funds for essential purchases without
            waiting for airline reimbursement. Always check your policy details
            before traveling.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="my-8" />

      <div className="grid md:grid-cols-2 gap-8 my-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">
            Need Help With Your Baggage Claim?
          </h3>
          <p className="mb-4">
            Getting proper compensation for baggage issues can be challenging.
            Our experts can help you navigate the process and maximize your
            chances of a successful claim.
          </p>
          <AnimatedButton to="/claim" variant="primary" size="lg">
            Get Expert Help With Your Claim
          </AnimatedButton>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">
            Why Choose CleverClaim?
          </h3>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Specialized expertise in baggage compensation claims</li>
            <li>No win, no fee policy</li>
            <li>We handle all airline communications</li>
            <li>Higher success rate than claiming on your own</li>
            <li>Regular updates on your claim's progress</li>
          </ul>
          <AnimatedButton to="/#how-it-works" variant="secondary" size="md">
            Learn How It Works
          </AnimatedButton>
        </div>
      </div>

      <p>
        While baggage issues can be frustrating, knowing your rights and taking
        prompt action can help ensure you receive appropriate compensation.
        Remember that airlines have a legal obligation to assist you with
        baggage problems, and you have the right to fair compensation for the
        inconvenience and financial impact caused by delayed, damaged, or lost
        luggage.
      </p>
    </RightsPageLayout>
  );
};

export default DelayedBaggageCompensation;
