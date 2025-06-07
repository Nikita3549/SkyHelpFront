import React from 'react';
import RightsPageLayout from '@/components/rights/RightsPageLayout';
import { Separator } from '@/components/ui/separator';
import {
  AlertCircle,
  Clock,
  CheckCircle,
  PlaneTakeoff,
  FileText,
  Info,
  AlertTriangle,
} from 'lucide-react';
import InfoCard from '@/components/common/InfoCard';
import CompensationTable from '@/components/rights/CompensationTable';
import RightsFaqSection, {
  FaqItem,
} from '@/components/rights/RightsFaqSection';
import RightsCallToAction from '@/components/rights/RightsCallToAction';
import InfoCardGrid from '@/components/rights/InfoCardGrid';
import RightsInfoBox from '@/components/rights/RightsInfoBox';
import DisruptionTypesSection from '@/components/rights/DisruptionTypesSection';

const FlightCompensation = () => {
  const relatedLinks = [
    { title: 'Air Passenger Rights', href: '/rights/air-passenger-rights' },
    {
      title: 'Delayed Flight Compensation',
      href: '/rights/delayed-flight-compensation.svg',
    },
    {
      title: 'Cancelled Flight Compensation',
      href: '/rights/cancelled-flight-compensation.svg',
    },
    {
      title: 'Denied Boarding Compensation',
      href: '/rights/denied-boarding-compensation.svg',
    },
    {
      title: 'Missed Connection Compensation',
      href: '/rights/missed-connection-compensation.svg',
    },
  ];

  const tableOfContents = [
    { id: 'eu261', title: 'EU Regulation 261/2004 Explained' },
    { id: 'compensation.svg-amounts', title: 'Flight Compensation Amounts' },
    { id: 'eligibility', title: 'Who Can Claim Flight Compensation' },
    { id: 'disruption-types', title: 'Types of Flight Disruptions' },
    { id: 'claim-process', title: 'How to Claim Compensation' },
    { id: 'time-limits', title: 'Time Limits for Claims' },
    { id: 'extraordinary', title: 'Extraordinary Circumstances' },
  ];

  // FAQs data
  const faqs: FaqItem[] = [
    {
      question:
        'Can I claim compensation.svg for both a delayed and cancelled flight?',
      answer:
        'No, you cannot claim twice for the same disrupted journey. EU261 entitles you to compensation.svg once per disrupted journey, not for each individual issue that occurred. The compensation.svg is calculated based on the total delay at your final destination, regardless of whether it was caused by a delay, cancellation, or combination of issues.',
    },
    {
      question:
        'Am I entitled to compensation.svg if I was offered an alternative flight?',
      answer:
        "Yes, you can still be entitled to compensation.svg even if you accepted an alternative flight. The key factor is how much later you arrived at your final destination compared to your original schedule. If the replacement flight got you there 3+ hours late, you're likely eligible for compensation.svg, even if you accepted the airline's alternative travel arrangements.",
    },
    {
      question: 'What if I was rerouted through a different connecting city?',
      answer:
        "Being rerouted through a different connecting city doesn't affect your right to compensation.svg if you still arrived at your final destination 3+ hours late. The route taken is irrelevant for compensation.svg purposes - only the delay at your final destination matters. If the airline got you there via a completely different path but still late, you maintain your right to compensation.svg.",
    },
    {
      question: 'Can I claim if my flight was part of a package holiday?',
      answer:
        'Yes, flights that are part of package holidays are fully covered by EU261. You have the same rights as any other passenger. However, you may need to direct your claim to the tour operator rather than the airline, depending on your specific booking arrangements. The tour operator is responsible for assisting you with your claim against the airline.',
    },
    {
      question: 'Do I need a lawyer to claim flight compensation.svg?',
      answer:
        "No, you don't need a lawyer to claim flight compensation.svg. You can submit a claim directly to the airline yourself. However, if the airline refuses to pay or ignores your claim, you might consider using a specialized flight compensation.svg company like CleverClaim to handle.svg your case. These services work on a no-win, no-fee basis and have expertise in dealing with resistant airlines.",
    },
  ];

  // Compensation table data
  const compensationTableHeaders = [
    'Flight Distance',
    'Compensation Amount',
    'Conditions',
  ];
  const compensationTableRows = [
    [
      'Up to 1,500 km',
      <span className="font-medium">€250 per passenger</span>,
      'For all qualifying disruptions',
    ],
    [
      'Between 1,500-3,500 km',
      <span className="font-medium">€400 per passenger</span>,
      'For all qualifying disruptions',
    ],
    [
      'Over 3,500 km within EU',
      <span className="font-medium">€400 per passenger</span>,
      'For all qualifying disruptions',
    ],
    [
      'Over 3,500 km outside EU',
      <span className="font-medium">€600 per passenger</span>,
      'For delays 4+ hours (€300 for 3-4 hour delays)',
    ],
  ];

  // Time limits table data
  const timeTableHeaders = ['Time Limit', 'Countries'];
  const timeTableRows = [
    ['1 year', 'Belgium, Poland, Slovakia'],
    [
      '2 years',
      'Croatia, Czech Republic, Denmark, Finland, Latvia, Norway, Portugal, Spain, Switzerland',
    ],
    [
      '3 years',
      'Austria, Germany, Estonia, Greece, Iceland, Netherlands, Romania, Slovenia, Sweden',
    ],
    ['5 years', 'France, Hungary, Italy'],
    ['6 years', 'United Kingdom (5 years in Scotland)'],
  ];

  // Info cards for claim process
  const claimProcessCards = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: '1. Document Everything',
      description:
        'Collect boarding passes, booking confirmations, communications from the airline, and expenses receipts.',
      className: 'bg-blue-50',
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: '2. Calculate Entitlement',
      description:
        'Check flight distance and delay duration to determine your potential compensation.svg amount.',
      className: 'bg-green-50',
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: '3. Submit Your Claim',
      description:
        'Contact the airline directly with all details, referencing EU261, or use a specialized claim company.',
      className: 'bg-amber-50',
    },
  ];

  return (
    <RightsPageLayout
      title="Flight Compensation Guide"
      description="Comprehensive guide to claiming compensation for flight disruptions"
      metaTitle="Flight Compensation Guide | EU261 Compensation | CleverClaim"
      metaDescription="Complete guide to claiming flight compensation under EU Regulation 261/2004 for delays, cancellations, and denied boarding incidents."
      relatedLinks={relatedLinks}
      tableOfContents={tableOfContents}
    >
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <p className="text-lg">
          <strong>Quick Summary:</strong> Under EU Regulation 261/2004,
          passengers may be entitled to compensation of €250 to €600 for flight
          delays of 3+ hours, cancellations, or denied boarding. Eligible
          flights include those departing from EU airports (regardless of
          airline) or arriving at EU airports with EU-based carriers. Claims can
          be filed for flights up to 3-6 years in the past depending on the
          country. Compensation isn't due if disruptions were caused by
          extraordinary circumstances beyond the airline's control.
        </p>
      </div>

      <h2 id="eu261" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">
        EU Regulation 261/2004 Explained
      </h2>
      <p>
        EU Regulation 261/2004 is the cornerstone of passenger rights in Europe.
        It provides standardized rules for compensation and assistance to
        passengers in cases of:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Flight delays of 3 hours or more</li>
        <li>Flight cancellations</li>
        <li>Denied boarding (often due to overbooking)</li>
        <li>Missed connections (when both flights are on the same booking)</li>
      </ul>

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <InfoCard
          icon={<Info className="w-5 h-5" />}
          title="Geographical Coverage"
          description="This regulation protects all passengers departing from any EU airport, as well as passengers arriving at an EU airport on an EU-based carrier."
          className="bg-blue-50"
        />

        <InfoCard
          icon={<PlaneTakeoff className="w-5 h-5" />}
          title="Extended Coverage"
          description="The regulation also applies in Iceland, Norway, Switzerland, and the UK (through UK261 regulations similar to EU261)."
          className="bg-green-50"
        />
      </div>

      <h2
        id="compensation-amounts"
        className="text-2xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Flight Compensation Amounts
      </h2>
      <p className="mb-4">
        Under EU261, compensation amounts are fixed based on the flight
        distance:
      </p>

      <CompensationTable
        headers={compensationTableHeaders}
        rows={compensationTableRows}
      />

      <RightsInfoBox
        type="warning"
        icon={<AlertTriangle className="w-6 h-6" />}
      >
        For long-distance flights (over 3,500 km) between the EU and non-EU
        destinations, if the delay at your final destination is between 3 and 4
        hours, the compensation may be reduced by 50%. However, you'll receive
        the full amount if the delay exceeds 4 hours.
      </RightsInfoBox>

      <h2
        id="eligibility"
        className="text-2xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Who Can Claim Flight Compensation
      </h2>

      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">Eligible Flights</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>All flights departing from an EU airport (any airline)</li>
            <li>
              All flights arriving at an EU airport if operated by an EU-based
              airline
            </li>
            <li>Flights to/from Iceland, Norway, and Switzerland</li>
            <li>Flights to/from the UK (under UK261 regulations)</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">Eligible Passengers</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Passengers with confirmed reservations</li>
            <li>Passengers who checked in on time</li>
            <li>Both leisure and business travelers</li>
            <li>Passengers on standard and discounted tickets</li>
            <li>Connecting flight passengers (if on same booking)</li>
          </ul>
        </div>
      </div>

      <DisruptionTypesSection
        sectionId="disruption-types"
        title="Types of Flight Disruptions"
      />

      <h2
        id="extraordinary"
        className="text-2xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Extraordinary Circumstances
      </h2>
      <p className="mb-4">
        Airlines can avoid paying compensation if the disruption was caused by
        "extraordinary circumstances" that could not have been avoided even if
        all reasonable measures had been taken.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">
            What Qualifies as Extraordinary
          </h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Extreme weather conditions (snowstorms, hurricanes, fog)</li>
            <li>Political instability affecting flight safety</li>
            <li>Security risks and terrorist threats</li>
            <li>Air traffic control restrictions</li>
            <li>Bird strikes requiring aircraft safety checks</li>
            <li>Airport employee strikes (not airline staff)</li>
          </ul>
        </div>

        <div className="bg-red-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">What Does NOT Qualify</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Technical problems during regular maintenance</li>
            <li>Airline staff strikes</li>
            <li>Crew scheduling issues</li>
            <li>Minor weather disturbances</li>
            <li>Most technical problems with the aircraft</li>
            <li>Airport congestion due to high season</li>
          </ul>
        </div>
      </div>

      <RightsInfoBox type="info" icon={<Info className="w-6 h-6" />}>
        <strong>Important:</strong> Following European Court rulings, most
        technical problems are NOT considered extraordinary circumstances, as
        they are deemed part of an airline's normal operations. Airlines often
        reject claims citing technical issues, but courts have consistently
        ruled in passengers' favor in such cases.
      </RightsInfoBox>

      <h2
        id="claim-process"
        className="text-2xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        How to Claim Compensation: Step-by-Step
      </h2>

      <InfoCardGrid cards={claimProcessCards} columns={3} />

      <ol className="list-decimal pl-6 space-y-4 mb-8">
        <li>
          <strong>Gather essential documentation:</strong>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Booking confirmation showing your reservation number</li>
            <li>Boarding passes for all flights</li>
            <li>Any communication from the airline about the disruption</li>
            <li>
              Receipts for any additional expenses incurred due to the
              disruption
            </li>
            <li>
              Photos or evidence of information displays showing
              delays/cancellations
            </li>
          </ul>
        </li>
        <li>
          <strong>Calculate your compensation entitlement:</strong>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>
              Check the flight distance to determine the potential compensation
              amount
            </li>
            <li>
              Verify that the delay at your final destination was 3+ hours (for
              delays)
            </li>
            <li>
              Consider if your case might involve extraordinary circumstances
            </li>
          </ul>
        </li>
        <li>
          <strong>Submit a claim to the airline:</strong>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>
              Use the airline's official claim form if available on their
              website
            </li>
            <li>
              Otherwise, send a formal letter or email to their customer service
              department
            </li>
            <li>
              Include all relevant details and specifically reference EU
              Regulation 261/2004
            </li>
            <li>Attach copies of your documentation as evidence</li>
          </ul>
        </li>
        <li>
          <strong>Be prepared to follow up persistently:</strong>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>
              Airlines often initially reject claims or offer vouchers instead
              of cash
            </li>
            <li>
              Send reminders if you don't receive a response within 6-8 weeks
            </li>
            <li>
              Know your rights and be prepared to challenge incorrect rejections
            </li>
          </ul>
        </li>
        <li>
          <strong>Escalate if necessary:</strong>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>
              Contact the relevant national enforcement body (varies by country)
            </li>
            <li>Consider using alternative dispute resolution services</li>
            <li>
              As a last resort, consider small claims court in your country
            </li>
            <li>
              Or let a specialized claim company like CleverClaim handle the
              process for you
            </li>
          </ul>
        </li>
      </ol>

      <RightsInfoBox type="warning" icon={<AlertCircle className="w-6 h-6" />}>
        <div>
          <p className="font-semibold mb-1">
            Common Airline Tactics to Watch For:
          </p>
          <ul className="list-disc pl-6">
            <li>
              Offering vouchers instead of cash compensation (you're entitled to
              money)
            </li>
            <li>Claiming "technical issues" as extraordinary circumstances</li>
            <li>
              Excessive delays in responding to claims hoping you'll give up
            </li>
            <li>
              Providing minimal information about your rights during disruptions
            </li>
          </ul>
        </div>
      </RightsInfoBox>

      <h2
        id="time-limits"
        className="text-2xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Time Limits for Claims
      </h2>
      <p className="mb-4">
        The time limit for filing compensation claims varies by country. It's
        determined by the departure country's limitation period for contractual
        claims, not by your nationality or the airline's country of origin.
      </p>

      <CompensationTable headers={timeTableHeaders} rows={timeTableRows} />

      <RightsInfoBox type="info" icon={<Info className="w-6 h-6" />}>
        It's advisable to file your claim as soon as possible after the
        disruption, while evidence is still fresh and readily available. Even
        though some countries allow claims for flights from several years ago,
        airlines may have purged their records, making it harder to verify your
        claim details.
      </RightsInfoBox>

      <RightsFaqSection faqs={faqs} />

      <RightsCallToAction
        stats={{
          value: '€600',
          label: 'Maximum compensation.svg per passenger',
        }}
      />

      <p>
        While claiming flight compensation can sometimes be a time-consuming
        process, persistence pays off. EU regulations provide strong protection
        for passengers, and you're entitled to claim what you're legally owed.
        If the process seems daunting, specialized companies like CleverClaim
        can handle your case on a no-win, no-fee basis, ensuring you receive the
        compensation you deserve without the hassle.
      </p>
    </RightsPageLayout>
  );
};

export default FlightCompensation;
