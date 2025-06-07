import React from 'react';
import RightsPageLayout from '@/components/rights/RightsPageLayout';
import RightsInfoBox from '@/components/rights/RightsInfoBox';
import CompensationTable from '@/components/rights/CompensationTable';
import RightsFaqSection from '@/components/rights/RightsFaqSection';
import RightsCallToAction from '@/components/rights/RightsCallToAction';
import InfoCardGrid from '@/components/rights/InfoCardGrid';
import {
  InfoIcon,
  BanknoteIcon,
  ShieldIcon,
  AlertTriangleIcon,
} from 'lucide-react';

const ShyRegulationTurkey = () => {
  const relatedLinks = [
    { title: 'Air Passenger Rights', href: '/rights/air-passenger-rights' },
    {
      title: 'EU 261 Flight Compensation',
      href: '/rights/flight-compensation.svg',
    },
    { title: 'ANAC 400 Regulation', href: '/rights/anac-400-regulation' },
    {
      title: 'UK 261 Flight Compensation',
      href: '/rights/uk-261-flight-compensation.svg',
    },
  ];

  const tableOfContents = [
    { id: 'understanding', title: 'Understanding SHY Regulation' },
    { id: 'what-is-shy', title: 'What is SHY Regulation?' },
    { id: 'when-apply', title: 'When Does SHY Regulation Apply?' },
    { id: 'compensation', title: 'Compensation Under SHY Regulation' },
    { id: 'rights', title: 'Your Rights Under SHY Regulation' },
    { id: 'claim', title: 'How to Claim Under SHY Regulation' },
    { id: 'faq', title: 'Frequently Asked Questions' },
  ];

  // FAQs data
  const faqs = [
    {
      question: 'What is the difference between SHY Regulation and EU261?',
      answer:
        'While similar in structure, SHY Regulation offers lower compensation.svg amounts (100-300 EUR vs. 250-600 EUR under EU261) and requires only 10 days notice for cancellations to avoid compensation.svg (vs. 14 days under EU261). Technical issues are also more likely to be considered extraordinary circumstances under Turkish regulations.',
    },
    {
      question:
        'Can I claim under both EU261 and SHY Regulation for the same flight?',
      answer:
        'No, you can choose which regulation to claim under based on which is more favorable to your situation, but you cannot claim under both simultaneously for the same flight disruption.',
    },
    {
      question: 'How long do I have to make a claim under SHY Regulation?',
      answer:
        'The time limit for filing claims under SHY Regulation is generally 1 year from the date of the flight, compared to 3-6 years under EU261 (depending on the country).',
    },
    {
      question: 'Does SHY Regulation cover flights to or from any country?',
      answer:
        "SHY Regulation covers flights departing from airports in Turkey (regardless of the airline's nationality) and flights arriving at airports in Turkey operated by Turkish carriers.",
    },
  ];

  // Compensation table data
  const compensationHeaders = [
    'Flight Distance',
    'SHY Regulation',
    'EU Regulation 261',
  ];
  const compensationRows = [
    ['Up to 1,500 km', '100 EUR', '250 EUR'],
    ['Between 1,500 and 3,500 km', '200 EUR', '400 EUR'],
    ['Over 3,500 km', '300 EUR', '600 EUR'],
  ];

  return (
    <RightsPageLayout
      title="SHY Regulation Turkey"
      description="Understanding passenger rights under Turkish aviation regulations"
      metaTitle="SHY Regulation Flight Compensation Guide | Turkish Air Passenger Rights | CleverClaim"
      metaDescription="Learn about your passenger rights for flights to and from Turkey under SHY Regulation and how to claim compensation for flight disruptions with Turkish airlines."
      relatedLinks={relatedLinks}
      tableOfContents={tableOfContents}
    >
      <h2 id="understanding" className="text-2xl font-bold mb-4 scroll-mt-24">
        Understanding SHY Regulation: Air Passenger Rights in Turkey
      </h2>

      <RightsInfoBox type="info" icon={<InfoIcon />}>
        <p className="text-lg">
          <strong>Quick Summary:</strong> SHY Regulation is Turkey's equivalent
          to EU Regulation 261/2004, providing compensation for flight
          disruptions to and from Turkish airports. Compensation ranges from 100
          to 300 EUR depending on flight distance, which is lower than EU261
          amounts but follows similar principles.
        </p>
      </RightsInfoBox>

      <p>
        The SHY Regulation (SHY-PASSENGER) is Turkey's equivalent to EU
        Regulation 261/2004, governing air passenger rights for flights to,
        from, and within Turkey. This regulation provides important protections
        for passengers experiencing flight disruptions with Turkish airlines or
        on flights to and from Turkish airports.
      </p>

      <h3 id="what-is-shy" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        What is SHY Regulation?
      </h3>
      <p>
        SHY Regulation, officially known as "Regulation on Air Passenger Rights"
        (SHY-PASSENGER), was established by the Turkish Directorate General of
        Civil Aviation (DGCA). It closely mirrors EU Regulation 261/2004 but has
        some important differences. The regulation establishes rules for
        compensation and assistance to passengers in the event of:
      </p>

      <InfoCardGrid
        columns={2}
        cards={[
          {
            icon: <ShieldIcon className="w-6 h-6" />,
            title: 'Passenger Protection',
            description:
              'Covers denied boarding, flight cancellations, long delays, and baggage-related issues for flights connected to Turkish airports.',
          },
          {
            icon: <BanknoteIcon className="w-6 h-6" />,
            title: 'Financial Compensation',
            description:
              'Provides standardized compensation.svg amounts from 100 to 300 EUR based on flight distance, typically paid in Turkish lira.',
          },
        ]}
      />

      <h3 id="when-apply" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        When Does SHY Regulation Apply?
      </h3>
      <p>The regulation applies to:</p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>
          Flights departing from airports in Turkey (regardless of the airline's
          nationality)
        </li>
        <li>
          Flights arriving at airports in Turkey operated by Turkish carriers
        </li>
        <li>All scheduled and non-scheduled commercial passenger services</li>
      </ul>

      <RightsInfoBox type="warning" icon={<AlertTriangleIcon />}>
        <p>
          <strong>Important Note:</strong> When both EU261 and SHY regulations
          could apply to a flight, passengers can choose which regulation to
          claim under, but cannot claim under both simultaneously. This
          typically happens for flights between Turkey and EU countries on
          Turkish carriers.
        </p>
      </RightsInfoBox>

      <h3
        id="compensation"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Compensation Under SHY Regulation
      </h3>
      <p>
        Similar to EU261, SHY regulation provides standardized compensation
        amounts based on flight distance:
      </p>

      <CompensationTable
        headers={compensationHeaders}
        rows={compensationRows}
        highlightHeader={true}
      />

      <p className="mt-4">
        Note that these amounts are lower than the EU261 compensation.
        Compensation is typically paid in Turkish lira at the exchange rate on
        the date of payment.
      </p>

      <h3 id="rights" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        Your Rights Under SHY Regulation
      </h3>

      <h4 className="text-lg font-semibold mt-6 mb-3">Flight Delays</h4>
      <div className="bg-gray-50 p-5 rounded-lg mb-5">
        <p>
          For delays, your rights depend on the length of the delay and the
          flight distance:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>
            <strong>Delays of 2 hours or more</strong> (flights up to 1,500 km):
            Right to meals, refreshments, and communication
          </li>
          <li>
            <strong>Delays of 3 hours or more</strong> (flights 1,500-3,500 km):
            Right to meals, refreshments, and communication
          </li>
          <li>
            <strong>Delays of 4 hours or more</strong> (flights over 3,500 km):
            Right to meals, refreshments, and communication
          </li>
          <li>
            <strong>Delays of 5 hours or more</strong> (any distance): Right to
            a refund if you decide not to travel
          </li>
          <li>
            <strong>Delays requiring an overnight stay</strong>: Right to hotel
            accommodation and transport
          </li>
        </ul>
        <p className="mt-3">
          Financial compensation is provided when the delay at final destination
          is 3 hours or more, similar to EU261.
        </p>
      </div>

      <h4 className="text-lg font-semibold mt-6 mb-3">Flight Cancellations</h4>
      <div className="bg-gray-50 p-5 rounded-lg mb-5">
        <p>When your flight is cancelled, you are entitled to:</p>
        <ul className="list-disc pl-6 mt-3">
          <li>
            <strong>A choice between</strong>:
            <ul className="list-circle pl-6 mt-2 space-y-1">
              <li>Refund of the ticket cost</li>
              <li>
                Re-routing to your final destination at the earliest opportunity
              </li>
              <li>Re-routing at a later date of your convenience</li>
            </ul>
          </li>
          <li className="mt-2">
            <strong>Care and assistance</strong> (meals, accommodation if
            necessary)
          </li>
          <li>
            <strong>Financial compensation</strong> (unless you were informed of
            the cancellation at least 10 days before departure or extraordinary
            circumstances apply)
          </li>
        </ul>
        <p className="mt-3">
          Note that SHY Regulation requires airlines to inform passengers about
          cancellations at least 10 days in advance to avoid compensation
          (compared to 14 days under EU261).
        </p>
      </div>

      <h4 className="text-lg font-semibold mt-6 mb-3">Denied Boarding</h4>
      <div className="bg-gray-50 p-5 rounded-lg mb-5">
        <p>
          If you're denied boarding against your will (usually due to
          overbooking), you're entitled to:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Immediate compensation</li>
          <li>A refund of your ticket or re-routing</li>
          <li>Care and assistance as outlined above</li>
        </ul>
      </div>

      <h4 className="text-lg font-semibold mt-6 mb-3">Baggage Issues</h4>
      <div className="bg-gray-50 p-5 rounded-lg mb-5">
        <p>SHY Regulation also covers baggage issues, providing:</p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>
            Compensation of up to 1000 Special Drawing Rights (SDR) for lost,
            damaged, or delayed baggage
          </li>
          <li>
            Requirement for airlines to inform passengers about their rights
            regarding baggage claims
          </li>
        </ul>
      </div>

      <h3 id="claim" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        How to Claim Under SHY Regulation
      </h3>
      <ol className="list-decimal pl-6 space-y-4 mb-6">
        <li>
          <strong>Gather documentation</strong>:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Boarding passes and ticket receipts</li>
            <li>Communication from the airline regarding the disruption</li>
            <li>Receipts for additional expenses incurred</li>
          </ul>
        </li>
        <li>
          <strong>Contact the airline directly</strong>:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Submit a claim through the airline's official channels</li>
            <li>Reference SHY-PASSENGER regulation in your claim</li>
            <li>
              Include all relevant flight details and describe the disruption
            </li>
          </ul>
        </li>
        <li>
          <strong>If rejected or no response</strong>:
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>
              File a complaint with the Turkish DGCA (Directorate General of
              Civil Aviation)
            </li>
            <li>
              Consider seeking professional assistance from a company like
              CleverClaim
            </li>
          </ul>
        </li>
      </ol>

      <h4 className="text-lg font-semibold mt-6 mb-3">
        Time Limits for Filing Claims
      </h4>
      <p className="mb-4">
        Under SHY Regulation, the time limit for filing claims is generally 1
        year from the date of the flight. However, it's always best to submit
        your claim as soon as possible after the disruption.
      </p>

      <h4 className="text-lg font-semibold mt-6 mb-3">
        Extraordinary Circumstances
      </h4>
      <p className="mb-4">
        Like EU261, SHY Regulation exempts airlines from paying compensation if
        the disruption was caused by "extraordinary circumstances" that could
        not have been avoided even if all reasonable measures had been taken.
        These include:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Severe weather conditions</li>
        <li>Political instability</li>
        <li>Security risks</li>
        <li>Unexpected flight safety shortcomings</li>
        <li>Air traffic management decisions</li>
        <li>Strikes affecting the operation of an airline</li>
      </ul>

      <RightsInfoBox type="info" className="mt-6" icon={<InfoIcon />}>
        <p>
          The interpretation of "extraordinary circumstances" under SHY
          Regulation may differ slightly from EU261, particularly regarding
          technical issues, which are more often accepted as extraordinary
          circumstances under Turkish regulation.
        </p>
      </RightsInfoBox>

      <p className="mt-6">
        Understanding SHY Regulation is essential for passengers traveling to,
        from, or within Turkey. While similar to EU261, the differences in
        compensation amounts and certain other provisions can significantly
        impact your rights. For complex cases or when airlines are unresponsive,
        seeking professional help from specialists who understand both EU and
        Turkish regulations can significantly increase your chances of receiving
        the compensation you're entitled to.
      </p>

      <RightsFaqSection
        faqs={faqs}
        title="Frequently Asked Questions About SHY Regulation"
        className="mt-10"
      />

      <RightsCallToAction
        title="Need Help With Your SHY Regulation Claim?"
        description="CleverClaim specializes in handling Turkish flight compensation claims under SHY Regulation. Our experts understand the nuances between EU261 and Turkish regulations to maximize your chances of successful compensation."
        buttonText="Start Your SHY Claim"
        buttonLink="/claim"
        stats={{
          value: '92%',
          label: 'Success rate for SHY claims',
        }}
        additionalInfo={[
          'Average claim takes just 3 minutes to start',
          'Expert handling of Turkish airlines communication',
        ]}
      />
    </RightsPageLayout>
  );
};

export default ShyRegulationTurkey;
