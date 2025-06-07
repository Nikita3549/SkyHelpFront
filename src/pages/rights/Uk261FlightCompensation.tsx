import React from 'react';
import RightsPageLayout from '@/components/rights/RightsPageLayout';
import RightsInfoBox from '@/components/rights/RightsInfoBox';
import RightsFaqSection from '@/components/rights/RightsFaqSection';
import RightsCallToAction from '@/components/rights/RightsCallToAction';
import { InfoIcon, CheckIcon } from 'lucide-react';

// Import refactored components
import Uk261CompensationTable from '@/components/rights/uk261/Uk261CompensationTable';
import Uk261RightsTabs from '@/components/rights/uk261/Uk261RightsTabs';
import Uk261ComparisonTable from '@/components/rights/uk261/Uk261ComparisonTable';
import Uk261TravelTips from '@/components/rights/uk261/Uk261TravelTips';
import UK261_FAQS from '@/components/rights/uk261/Uk261Faqs';
import Uk261ExtraordinaryCircumstances from '@/components/rights/uk261/Uk261ExtraordinaryCircumstances';
import Uk261ClaimProcess from '@/components/rights/uk261/Uk261ClaimProcess';

const Uk261FlightCompensation = () => {
  const relatedLinks = [
    { title: 'Air Passenger Rights', href: '/rights/air-passenger-rights' },
    {
      title: 'EU 261 Flight Compensation',
      href: '/rights/flight-compensation.svg',
    },
    { title: 'SHY Regulation Turkey', href: '/rights/shy-regulation-turkey' },
    { title: 'ANAC 400 Regulation', href: '/rights/anac-400-regulation' },
  ];

  const tableOfContents = [
    { id: 'what-is-uk261', title: 'What is UK261?' },
    { id: 'when-apply', title: 'When Does UK261 Apply?' },
    { id: 'compensation', title: 'Compensation Amounts' },
    { id: 'your-rights', title: 'Your Rights Under UK261' },
    { id: 'extraordinary', title: 'Extraordinary Circumstances' },
    { id: 'how-to-claim', title: 'How to Claim' },
    { id: 'time-limits', title: 'Time Limits for Claims' },
    { id: 'differences', title: 'Key Differences from EU261' },
    { id: 'tips', title: 'Tips for Post-Brexit Air Travel' },
  ];

  return (
    <RightsPageLayout
      title="UK 261 Flight Compensation"
      description="Understanding air passenger rights under UK law after Brexit"
      metaTitle="UK 261 Flight Compensation Guide | UK Air Passenger Rights | SkyHelp"
      metaDescription="Learn about your rights under UK air passenger law for flight delays, cancellations, and denied boarding after Brexit, and how to claim compensation."
      relatedLinks={relatedLinks}
      tableOfContents={tableOfContents}
    >
      <h2 className="text-2xl font-bold mb-4 scroll-mt-24">
        UK 261 Flight Compensation: Your Rights Post-Brexit
      </h2>

      <RightsInfoBox type="info" icon={<InfoIcon />}>
        <p className="text-lg">
          <strong>Quick Summary:</strong> UK261 is the UK's version of EU261
          regulation, providing similar protections for passengers on flights to
          and from the UK after Brexit. While largely similar to EU261, there
          are some key differences in applicability and compensation amounts.
        </p>
      </RightsInfoBox>

      <p>
        Following Brexit, the UK incorporated EU Regulation 261/2004 into
        domestic law, creating its own version of passenger protection
        legislation, commonly referred to as "UK261" or "UK Flight Compensation
        Regulation." While largely similar to the EU regulation, there are
        important differences that passengers should be aware of when traveling
        to or from UK airports.
      </p>

      <h3
        id="what-is-uk261"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        What is UK261?
      </h3>
      <p>
        UK261 refers to the retained version of EU Regulation 261/2004 that was
        incorporated into UK law through the European Union (Withdrawal) Act
        2018 and modified by the Air Passenger Rights and Air Travel Organisers'
        Licensing (Amendment) (EU Exit) Regulations 2019. This legislation
        preserves passenger rights for flight disruptions similar to those under
        the EU regulation.
      </p>

      <h3 id="when-apply" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        When Does UK261 Apply?
      </h3>
      <p>UK261 applies in the following situations:</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          Flights departing from airports in the UK (regardless of the airline's
          nationality)
        </li>
        <li>
          Flights arriving at airports in the UK operated by UK or EU carriers
        </li>
        <li>
          Passengers who have a confirmed reservation and have checked in on
          time
        </li>
      </ul>

      <div className="bg-blue-50 p-6 rounded-lg my-4">
        <h4 className="font-semibold mb-2">EU261 vs UK261 Applicability:</h4>
        <p>
          The key difference in applicability is that UK261 protects passengers
          on flights departing from the UK or arriving in the UK on UK carriers,
          while EU261 protects passengers on flights departing from EU airports
          or arriving in the EU on EU carriers. This creates an important
          distinction for flights between the UK and EU.
        </p>
      </div>

      <h3
        id="compensation"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Compensation Amounts Under UK261
      </h3>
      <p>
        UK261 maintains the same compensation amounts as EU261, but denominated
        in British pounds rather than euros:
      </p>

      <Uk261CompensationTable />

      <h3 id="your-rights" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        Your Rights Under UK261
      </h3>

      <Uk261RightsTabs />

      <h3
        id="extraordinary"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Extraordinary Circumstances Under UK261
      </h3>

      <Uk261ExtraordinaryCircumstances />

      <h3
        id="how-to-claim"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        How to Claim Under UK261
      </h3>

      <Uk261ClaimProcess />

      <h3 id="time-limits" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        Time Limits for UK261 Claims
      </h3>
      <p>
        Under UK law, you have up to 6 years from the date of the disrupted
        flight to make a claim in England, Wales, and Northern Ireland. In
        Scotland, the time limit is 5 years. However, it's always advisable to
        submit your claim as soon as possible after the disruption.
      </p>

      <h3 className="text-xl font-bold mt-8 mb-4">
        Potential Future Changes to UK261
      </h3>
      <p>
        It's worth noting that as time passes since Brexit, UK passenger rights
        legislation may begin to diverge from the EU regulation. The UK
        government has indicated it may review passenger rights legislation,
        potentially making changes to the current system. Travelers should stay
        informed about the latest regulations that apply to their journeys.
      </p>

      <h3 id="differences" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        Key Differences Between EU261 and UK261
      </h3>

      <Uk261ComparisonTable />

      <h3 id="tips" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        Tips for Post-Brexit Air Travel Between UK and EU
      </h3>

      <Uk261TravelTips />

      <RightsInfoBox type="success" icon={<CheckIcon />} className="my-6">
        <p>
          Despite Brexit, UK passengers continue to enjoy strong legal
          protections for flight disruptions. UK261 largely mirrors the EU
          regulation, providing significant rights to compensation and
          assistance. Understanding these rights can help you navigate
          disruptions effectively and ensure you receive the compensation you're
          entitled to when traveling to or from UK airports.
        </p>
      </RightsInfoBox>

      <p>
        Despite Brexit, UK passengers continue to enjoy strong legal protections
        for flight disruptions. UK261 largely mirrors the EU regulation,
        providing significant rights to compensation and assistance.
        Understanding these rights can help you navigate disruptions effectively
        and ensure you receive the compensation you're entitled to when
        traveling to or from UK airports.
      </p>

      <RightsFaqSection
        faqs={UK261_FAQS}
        title="Frequently Asked Questions About UK261"
        className="mt-10"
        id="faq"
      />

      <RightsCallToAction
        title="Need Help With Your UK261 Claim?"
        description="SkyHelp specializes in handling UK flight compensation claims. Our experts understand the complexities of post-Brexit aviation regulations and can help you navigate the process to ensure you get the compensation you're entitled to."
        buttonText="Start Your UK Flight Claim"
        buttonLink="/claim"
        stats={{
          value: '93%',
          label: 'Success rate for UK claims',
        }}
        additionalInfo={[
          'Expert handling of UK261 regulations',
          'No win, no fee guarantee',
        ]}
        className="mt-10"
      />
    </RightsPageLayout>
  );
};

export default Uk261FlightCompensation;
