import React from 'react';
import RightsPageLayout from '@/components/rights/RightsPageLayout';
import RightsInfoBox from '@/components/rights/RightsInfoBox';
import CompensationTable from '@/components/rights/CompensationTable';
import RightsFaqSection from '@/components/rights/RightsFaqSection';
import RightsCallToAction from '@/components/rights/RightsCallToAction';
import InfoCardGrid from '@/components/rights/InfoCardGrid';
import {
  InfoIcon,
  FileTextIcon,
  AlertTriangleIcon,
  CheckIcon,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Anac400Regulation = () => {
  const relatedLinks = [
    { title: 'Air Passenger Rights', href: '/rights/air-passenger-rights' },
    {
      title: 'EU 261 Flight Compensation',
      href: '/rights/flight-compensation.svg',
    },
    { title: 'SHY Regulation Turkey', href: '/rights/shy-regulation-turkey' },
    {
      title: 'UK 261 Flight Compensation',
      href: '/rights/uk-261-flight-compensation.svg',
    },
  ];

  const tableOfContents = [
    { id: 'what-is-anac', title: 'What is ANAC 400?' },
    { id: 'when-apply', title: 'When Does It Apply?' },
    { id: 'your-rights', title: 'Your Rights Under ANAC 400' },
    { id: 'baggage-rights', title: 'Baggage Rights' },
    { id: 'ticket-refunds', title: 'Ticket Refund Rights' },
    { id: 'how-to-claim', title: 'How to Claim Your Rights' },
    { id: 'unique-features', title: 'Unique Features' },
    { id: 'time-limits', title: 'Time Limits for Claims' },
    { id: 'faq', title: 'FAQ' },
  ];

  // Comparison table data
  const assistanceHeaders = ['Delay Length', 'Assistance Required'];
  const assistanceRows = [
    ['Over 1 hour', 'Communication assistance (internet, phone calls)'],
    ['Over 2 hours', 'Meals appropriate to the time of day (meal vouchers)'],
    [
      'Over 4 hours',
      'Accommodation (if overnight stay necessary) and transportation',
    ],
  ];

  // FAQs data
  const faqs = [
    {
      question:
        'Do I get monetary compensation.svg for delayed flights under ANAC 400?',
      answer:
        "Unlike EU261, ANAC 400 doesn't provide standardized financial compensation.svg for delays. Instead, it focuses on immediate material assistance (communication, meals, accommodation) and offers refund/rebooking options. However, you may still seek compensation.svg through the Brazilian judicial system for damages.",
    },
    {
      question: 'How does ANAC 400 handle.svg flight cancellations?',
      answer:
        'When your flight is cancelled, ANAC 400 requires the airline to offer you a choice between: a full refund of your ticket (including taxes), re-routing on another flight to your destination (with any airline), or rebooking the flight for another date at your convenience. These alternatives must be provided free of charge.',
    },
    {
      question: "What's the time limit for filing claims under ANAC 400?",
      answer:
        "Brazilian law provides different time limits for filing claims: 5 years for claims related to consumer relations under the Brazilian Consumer Protection Code, and 2 years for baggage claims under the Montreal Convention (for international flights). For the most effective results, it's advisable to file claims as soon as possible.",
    },
    {
      question: 'Does ANAC 400 apply to all airlines flying to/from Brazil?',
      answer:
        "ANAC 400 applies to all domestic flights within Brazil, international flights departing from Brazilian airports, and with some limitations, international flights arriving in Brazil. This means that regardless of the airline's nationality, if your flight departs from Brazil or is a domestic flight within Brazil, you are protected by ANAC 400 provisions.",
    },
  ];

  return (
    <RightsPageLayout
      title="ANAC 400 Regulation"
      description="Understanding Brazilian air passenger rights under ANAC 400"
      metaTitle="ANAC 400 Regulation Guide | Brazilian Air Passenger Rights | CleverClaim"
      metaDescription="Learn about your passenger rights for flights to, from, and within Brazil under ANAC 400 Regulation and how to claim compensation for flight disruptions."
      relatedLinks={relatedLinks}
      tableOfContents={tableOfContents}
    >
      <h2 id="understanding" className="text-2xl font-bold mb-4 scroll-mt-24">
        Understanding ANAC 400 Regulation: Air Passenger Rights in Brazil
      </h2>

      <RightsInfoBox type="info" icon={<InfoIcon />}>
        <p className="text-lg">
          <strong>Quick Summary:</strong> ANAC 400 is Brazil's air passenger
          rights regulation that protects travelers on flights to, from, and
          within Brazil. Unlike EU261, it focuses on providing immediate
          material assistance rather than standardized financial compensation.
        </p>
      </RightsInfoBox>

      <p>
        ANAC Resolution 400 is Brazil's comprehensive air passenger rights
        regulation that protects travelers on flights to, from, and within
        Brazil. Established by the Brazilian National Civil Aviation Agency
        (ANAC), this regulation provides important protections for passengers
        experiencing flight disruptions with any airline operating in Brazilian
        airspace.
      </p>

      <h3
        id="what-is-anac"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        What is ANAC 400?
      </h3>
      <p>
        ANAC Resolution 400, which came into effect in March 2017, establishes
        rules regarding the rights and duties of air passengers and airlines
        operating in Brazil. While it shares some similarities with EU
        Regulation 261/2004, ANAC 400 has its own unique approach to passenger
        protections, particularly regarding compensation mechanisms.
      </p>
      <p>The regulation covers various aspects of air travel, including:</p>

      <InfoCardGrid
        columns={3}
        cards={[
          {
            icon: <FileTextIcon className="w-6 h-6" />,
            title: 'Flight Disruptions',
            description:
              'Delays, cancellations, and denied boarding situations',
          },
          {
            icon: <AlertTriangleIcon className="w-6 h-6" />,
            title: 'Baggage Issues',
            description:
              'Lost, damaged, or delayed baggage handling and compensation.svg',
          },
          {
            icon: <CheckIcon className="w-6 h-6" />,
            title: 'Consumer Rights',
            description:
              'Ticket refund policies and passenger assistance requirements',
          },
        ]}
      />

      <h3 id="when-apply" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        When Does ANAC 400 Apply?
      </h3>
      <p>ANAC 400 applies to:</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>All domestic flights within Brazil</li>
        <li>International flights departing from Brazilian airports</li>
        <li>
          International flights arriving in Brazil (with some limitations)
        </li>
      </ul>
      <p>
        This means that regardless of the airline's nationality, if your flight
        departs from Brazil or is a domestic flight within Brazil, you are
        protected by ANAC 400 provisions.
      </p>

      <h3 id="your-rights" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        Your Rights Under ANAC 400: Flight Delays and Cancellations
      </h3>

      <h4 className="text-lg font-semibold mt-6 mb-3">
        Material Assistance Based on Delay Length
      </h4>
      <p>
        Unlike the EU regulation's fixed financial compensation, ANAC 400
        focuses on providing material assistance based on the length of the
        delay:
      </p>

      <CompensationTable
        headers={assistanceHeaders}
        rows={assistanceRows}
        highlightHeader={true}
      />

      <p className="mt-3 mb-4">
        These provisions apply regardless of the reason for the delay, even in
        extraordinary circumstances.
      </p>

      <RightsInfoBox type="warning" icon={<AlertTriangleIcon />}>
        <h4 className="font-semibold mb-2">Key Difference from EU261:</h4>
        <p>
          Unlike EU Regulation 261/2004, ANAC 400 does not provide standardized
          financial compensation for delays or cancellations. Instead, it
          focuses on immediate assistance and offers refund/rebooking options.
          However, this doesn't prevent passengers from seeking financial
          compensation through the Brazilian judicial system for damages caused
          by flight disruptions.
        </p>
      </RightsInfoBox>

      <h4 className="text-lg font-semibold mt-6 mb-3">
        Options for Cancelled Flights or Delays Over 4 Hours
      </h4>
      <p>
        When your flight is cancelled or delayed by more than 4 hours, airlines
        must offer you one of the following options:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="bg-blue-50 p-5 rounded-lg text-center">
          <span className="text-xl font-bold text-primary block mb-2">1</span>
          <h5 className="font-medium mb-2">Full Refund</h5>
          <p className="text-sm">
            Complete refund of your ticket including all taxes and fees
          </p>
        </div>
        <div className="bg-blue-50 p-5 rounded-lg text-center">
          <span className="text-xl font-bold text-primary block mb-2">2</span>
          <h5 className="font-medium mb-2">Re-routing</h5>
          <p className="text-sm">
            Flight on another airline to your destination, at no extra cost
          </p>
        </div>
        <div className="bg-blue-50 p-5 rounded-lg text-center">
          <span className="text-xl font-bold text-primary block mb-2">3</span>
          <h5 className="font-medium mb-2">Rebooking</h5>
          <p className="text-sm">
            Change to a future date at your convenience at no extra cost
          </p>
        </div>
      </div>

      <p className="mb-4">
        These alternatives must be provided free of charge, regardless of the
        ticket fare class.
      </p>

      <Tabs defaultValue="denied" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="denied">Denied Boarding</TabsTrigger>
          <TabsTrigger value="baggage">Baggage Rights</TabsTrigger>
          <TabsTrigger value="refund">Ticket Refunds</TabsTrigger>
        </TabsList>
        <TabsContent value="denied" className="py-4">
          <h3 id="denied-boarding" className="text-xl font-bold mb-4">
            Denied Boarding Rights Under ANAC 400
          </h3>
          <p>
            In case of overbooking or other situations where you're denied
            boarding, ANAC 400 requires airlines to:
          </p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>
              First seek volunteers to give up their seats in exchange for
              benefits negotiated directly with passengers
            </li>
            <li>
              If there aren't enough volunteers, provide you with the same three
              options as for cancelled flights (refund, re-routing, or
              rebooking)
            </li>
            <li>
              Provide all material assistance as required for delays
              (communication, meals, accommodation if necessary)
            </li>
          </ul>
          <p>
            Unlike EU261, ANAC 400 doesn't establish fixed compensation amounts
            for denied boarding. However, Brazilian consumer protection laws
            allow passengers to seek compensation for moral damages through the
            judicial system.
          </p>
        </TabsContent>
        <TabsContent value="baggage" className="py-4">
          <h3 id="baggage-rights" className="text-xl font-bold mb-4">
            Baggage Rights Under ANAC 400
          </h3>
          <p>ANAC 400 also establishes specific rules for baggage:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>
              <strong>Lost baggage:</strong> Airlines must reimburse passengers
              within 7 days for domestic flights and within 21 days for
              international flights
            </li>
            <li>
              <strong>Damaged or violated baggage:</strong> The airline must
              cover repair costs or provide compensation
            </li>
            <li>
              <strong>Delayed baggage:</strong> The airline must locate and
              deliver the baggage as quickly as possible and cover essential
              expenses until the baggage is returned
            </li>
          </ul>
          <p>
            For international flights, the Montreal Convention provisions
            regarding baggage liability limits often apply alongside ANAC 400.
          </p>
        </TabsContent>
        <TabsContent value="refund" className="py-4">
          <h3 id="ticket-refunds" className="text-xl font-bold mb-4">
            Ticket Refund Rights
          </h3>
          <p>ANAC 400 provides specific rights regarding ticket refunds:</p>
          <ul className="list-disc pl-6 my-4 space-y-2">
            <li>
              <strong>24-hour penalty-free cancellation:</strong> You can cancel
              your ticket within 24 hours of purchase without any penalty, as
              long as the purchase was made at least 7 days before departure
            </li>
            <li>
              <strong>Cancellation by passenger:</strong> You can cancel your
              ticket and receive a refund, but airlines may charge a reasonable
              fee
            </li>
            <li>
              <strong>Refund processing time:</strong> Airlines must process
              refunds within 7 days for credit card purchases and 30 days for
              other payment methods
            </li>
          </ul>
        </TabsContent>
      </Tabs>

      <h3
        id="how-to-claim"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        How to Claim Your Rights Under ANAC 400
      </h3>

      <div className="bg-blue-50 p-6 rounded-lg my-6">
        <h4 className="font-semibold mb-4">Steps to Claim Your Rights:</h4>
        <ol className="list-decimal pl-6 space-y-4 mb-4">
          <li>
            <strong>Contact the airline directly:</strong>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>
                Approach airline staff at the airport during the disruption
              </li>
              <li>Keep records of all communications</li>
              <li>
                Be specific about the assistance you require based on ANAC 400
              </li>
            </ul>
          </li>
          <li>
            <strong>Document everything:</strong>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Take screenshots of flight information displays</li>
              <li>Keep boarding passes and tickets</li>
              <li>
                Save all receipts for expenses incurred due to the disruption
              </li>
            </ul>
          </li>
          <li>
            <strong>If the airline doesn't comply:</strong>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>File a complaint with ANAC through their website</li>
              <li>
                Contact Brazilian consumer protection agencies (such as PROCON)
              </li>
              <li>
                Consider the "small claims court" (Juizado Especial) for damages
                up to 40 minimum wages
              </li>
            </ul>
          </li>
        </ol>
      </div>

      <h3
        id="unique-features"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Unique Features of ANAC 400
      </h3>
      <p>Some distinctive elements of the Brazilian regulation include:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="border border-blue-100 p-5 rounded-lg bg-blue-50">
          <h4 className="font-semibold mb-2">
            No Extraordinary Circumstances Exemption
          </h4>
          <p>
            Unlike EU261, assistance must be provided regardless of the cause of
            disruption
          </p>
        </div>
        <div className="border border-blue-100 p-5 rounded-lg bg-blue-50">
          <h4 className="font-semibold mb-2">Re-routing Responsibility</h4>
          <p>
            Airlines must re-route passengers on other carriers if necessary,
            not just on their own flights
          </p>
        </div>
        <div className="border border-blue-100 p-5 rounded-lg bg-blue-50">
          <h4 className="font-semibold mb-2">Real-time Information</h4>
          <p>
            Airlines must keep passengers informed about flight status in
            real-time
          </p>
        </div>
        <div className="border border-blue-100 p-5 rounded-lg bg-blue-50">
          <h4 className="font-semibold mb-2">Accessible Channels</h4>
          <p>
            Airlines must provide multiple accessible channels for passenger
            communication
          </p>
        </div>
      </div>

      <h3 id="time-limits" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        Time Limits for Claims
      </h3>
      <p>Brazilian law provides different time limits for filing claims:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>5 years</strong> for claims related to consumer relations
          under the Brazilian Consumer Protection Code
        </li>
        <li>
          <strong>2 years</strong> for baggage claims under the Montreal
          Convention (for international flights)
        </li>
      </ul>
      <p className="mt-4">
        For the most effective results, it's advisable to file claims as soon as
        possible after the disruption.
      </p>

      <RightsInfoBox type="success" icon={<CheckIcon />} className="my-6">
        <p>
          ANAC 400 provides significant protections for passengers traveling to,
          from, and within Brazil. While its approach differs from the EU's
          financial compensation system, it ensures that passengers receive
          immediate practical assistance during disruptions and maintains their
          right to seek judicial remedies for damages. Understanding these
          rights can help you navigate disruptions effectively when traveling in
          Brazilian airspace.
        </p>
      </RightsInfoBox>

      <RightsFaqSection
        faqs={faqs}
        title="Frequently Asked Questions About ANAC 400"
        className="mt-10"
        id="faq"
      />

      <RightsCallToAction
        title="Need Help With Your ANAC 400 Claim?"
        description="CleverClaim specializes in handling Brazilian flight compensation claims. Our experts understand ANAC 400 and can help you navigate the complex Brazilian aviation regulations to ensure you get the assistance and compensation you're entitled to."
        buttonText="Start Your Brazilian Flight Claim"
        buttonLink="/claim"
        stats={{
          value: '95%',
          label: 'Success rate for Brazilian claims',
        }}
        additionalInfo={[
          'Expert handling of ANAC regulations',
          'Local representatives in Brazil',
        ]}
        className="mt-10"
      />
    </RightsPageLayout>
  );
};

export default Anac400Regulation;
