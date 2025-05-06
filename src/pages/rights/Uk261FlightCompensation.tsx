
import React from "react";
import RightsPageLayout from "@/components/rights/RightsPageLayout";
import RightsInfoBox from "@/components/rights/RightsInfoBox";
import CompensationTable from "@/components/rights/CompensationTable";
import RightsFaqSection from "@/components/rights/RightsFaqSection";
import RightsCallToAction from "@/components/rights/RightsCallToAction";
import InfoCardGrid from "@/components/rights/InfoCardGrid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoIcon, PlaneTakeoffIcon, AlertTriangleIcon, CheckIcon, FileTextIcon } from "lucide-react";

const Uk261FlightCompensation = () => {
  const relatedLinks = [
    { title: "Air Passenger Rights", href: "/rights/air-passenger-rights" },
    { title: "EU 261 Flight Compensation", href: "/rights/flight-compensation" },
    { title: "SHY Regulation Turkey", href: "/rights/shy-regulation-turkey" },
    { title: "ANAC 400 Regulation", href: "/rights/anac-400-regulation" }
  ];

  const tableOfContents = [
    { id: "what-is-uk261", title: "What is UK261?" },
    { id: "when-apply", title: "When Does UK261 Apply?" },
    { id: "compensation", title: "Compensation Amounts" },
    { id: "your-rights", title: "Your Rights Under UK261" },
    { id: "extraordinary", title: "Extraordinary Circumstances" },
    { id: "how-to-claim", title: "How to Claim" },
    { id: "time-limits", title: "Time Limits for Claims" },
    { id: "differences", title: "Key Differences from EU261" },
    { id: "tips", title: "Tips for Post-Brexit Air Travel" }
  ];

  // Compensation table data
  const compensationHeaders = ["Flight Distance", "Compensation Amount"];
  const compensationRows = [
    ["Up to 1,500 km", "£220 (approx. €250)"],
    ["Between 1,500 and 3,500 km", "£350 (approx. €400)"],
    ["Over 3,500 km", "£520 (approx. €600)*"]
  ];

  // FAQ data
  const faqs = [
    {
      question: "Does UK261 apply to all airlines flying to or from the UK?",
      answer: "UK261 applies to flights departing from UK airports regardless of the airline, and flights arriving in the UK only if operated by UK or EU carriers. This creates an important distinction from EU261, which covers flights departing from EU airports or arriving in the EU on EU carriers."
    },
    {
      question: "What if my flight is disrupted due to extraordinary circumstances?",
      answer: "Like EU261, UK261 exempts airlines from paying compensation if the disruption was caused by extraordinary circumstances that could not have been avoided even if all reasonable measures had been taken. These include severe weather, political instability, security risks, air traffic control restrictions, and unexpected flight safety shortcomings. However, the airline must still provide care and assistance during the disruption."
    },
    {
      question: "How soon after a disruption should I file a UK261 claim?",
      answer: "While you have up to 6 years in England, Wales, and Northern Ireland (5 years in Scotland) to file a claim, it's advisable to submit your claim as soon as possible. This makes it easier to gather and provide all the necessary documentation and increases your chances of a successful outcome."
    },
    {
      question: "Can I claim under both UK261 and EU261 for the same disruption?",
      answer: "No, you cannot claim compensation twice for the same disruption. You need to determine which regulation applies to your specific journey. For flights between the UK and EU, either UK261 or EU261 will apply depending on the direction of travel and the airline's nationality."
    }
  ];

  return (
    <RightsPageLayout
      title="UK 261 Flight Compensation"
      description="Understanding air passenger rights under UK law after Brexit"
      metaTitle="UK 261 Flight Compensation Guide | UK Air Passenger Rights | CleverClaim"
      metaDescription="Learn about your rights under UK air passenger law for flight delays, cancellations, and denied boarding after Brexit, and how to claim compensation."
      relatedLinks={relatedLinks}
      tableOfContents={tableOfContents}
    >
      <h2 className="text-2xl font-bold mb-4 scroll-mt-24">UK 261 Flight Compensation: Your Rights Post-Brexit</h2>
      
      <RightsInfoBox 
        type="info" 
        icon={<InfoIcon />}
      >
        <p className="text-lg">
          <strong>Quick Summary:</strong> UK261 is the UK's version of EU261 regulation, providing similar 
          protections for passengers on flights to and from the UK after Brexit. While largely similar to EU261, 
          there are some key differences in applicability and compensation amounts.
        </p>
      </RightsInfoBox>
      
      <p>
        Following Brexit, the UK incorporated EU Regulation 261/2004 into domestic law, creating its own version of passenger 
        protection legislation, commonly referred to as "UK261" or "UK Flight Compensation Regulation." While largely similar to 
        the EU regulation, there are important differences that passengers should be aware of when traveling to or from UK airports.
      </p>

      <h3 id="what-is-uk261" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">What is UK261?</h3>
      <p>
        UK261 refers to the retained version of EU Regulation 261/2004 that was incorporated into UK law through the European Union 
        (Withdrawal) Act 2018 and modified by the Air Passenger Rights and Air Travel Organisers' Licensing (Amendment) (EU Exit) 
        Regulations 2019. This legislation preserves passenger rights for flight disruptions similar to those under the EU regulation.
      </p>

      <h3 id="when-apply" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">When Does UK261 Apply?</h3>
      <p>
        UK261 applies in the following situations:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Flights departing from airports in the UK (regardless of the airline's nationality)</li>
        <li>Flights arriving at airports in the UK operated by UK or EU carriers</li>
        <li>Passengers who have a confirmed reservation and have checked in on time</li>
      </ul>

      <div className="bg-blue-50 p-6 rounded-lg my-4">
        <h4 className="font-semibold mb-2">EU261 vs UK261 Applicability:</h4>
        <p>
          The key difference in applicability is that UK261 protects passengers on flights departing from the UK or arriving 
          in the UK on UK carriers, while EU261 protects passengers on flights departing from EU airports or arriving in the 
          EU on EU carriers. This creates an important distinction for flights between the UK and EU.
        </p>
      </div>

      <h3 id="compensation" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">Compensation Amounts Under UK261</h3>
      <p>
        UK261 maintains the same compensation amounts as EU261, but denominated in British pounds rather than euros:
      </p>
      
      <CompensationTable 
        headers={compensationHeaders}
        rows={compensationRows}
        highlightHeader={true}
      />
      
      <p className="text-sm italic mt-2 mb-6">
        * For long-distance flights (over 3,500 km), if the delay at the final destination is between 3 and 4 hours, 
        the compensation may be reduced by 50% (to £260).
      </p>

      <h3 id="your-rights" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">Your Rights Under UK261</h3>

      <Tabs defaultValue="delays" className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="delays">Flight Delays</TabsTrigger>
          <TabsTrigger value="cancellations">Cancellations</TabsTrigger>
          <TabsTrigger value="denied">Denied Boarding</TabsTrigger>
        </TabsList>
        <TabsContent value="delays" className="pt-4">
          <p>
            You may be entitled to compensation if:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Your flight arrives at your final destination 3 or more hours later than scheduled</li>
            <li>The delay wasn't caused by extraordinary circumstances</li>
            <li>Your flight falls under the scope of UK261 as described above</li>
          </ul>
          <p>
            During a delay, you're also entitled to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Delays of 2+ hours (short flights), 3+ hours (medium flights), or 4+ hours (long flights):</strong> Meals, refreshments, and communication</li>
            <li><strong>Delays requiring an overnight stay:</strong> Hotel accommodation and transport</li>
            <li><strong>Delays of 5+ hours:</strong> A refund of your ticket if you choose not to travel</li>
          </ul>
        </TabsContent>
        <TabsContent value="cancellations" className="pt-4">
          <p>
            You may be entitled to compensation if:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Your flight was cancelled less than 14 days before departure</li>
            <li>The cancellation wasn't caused by extraordinary circumstances</li>
            <li>Any replacement flight offered causes a significant delay in arrival at your final destination</li>
          </ul>
          <p>
            When your flight is cancelled, you always have the right to choose between:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A full refund of your ticket</li>
            <li>Re-routing to your destination at the earliest opportunity</li>
            <li>Re-routing at a later date of your convenience</li>
          </ul>
        </TabsContent>
        <TabsContent value="denied" className="pt-4">
          <p>
            If you're involuntarily denied boarding (typically due to overbooking), you're entitled to:
          </p>
          <ul className="list-disc pl-6 space-y-2 my-4">
            <li>Immediate compensation (£220-£520 depending on flight distance)</li>
            <li>A choice between refund or re-routing</li>
            <li>Care and assistance (meals, accommodation if necessary)</li>
          </ul>
        </TabsContent>
      </Tabs>

      <h3 id="extraordinary" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">Extraordinary Circumstances Under UK261</h3>
      
      <RightsInfoBox 
        type="warning" 
        icon={<AlertTriangleIcon />}
      >
        <p>
          Airlines may avoid paying compensation if the disruption was caused by "extraordinary circumstances" 
          beyond their control. However, they must still provide care and assistance to affected passengers.
        </p>
      </RightsInfoBox>
      
      <p>
        Like EU261, UK261 allows airlines to avoid paying compensation if the disruption was caused by "extraordinary circumstances." 
        These include:
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Severe weather conditions</li>
        <li>Political instability</li>
        <li>Security risks</li>
        <li>Air traffic control restrictions</li>
        <li>Unexpected flight safety shortcomings</li>
        <li>Strikes affecting airport operations (but generally not airline staff strikes)</li>
      </ul>
      <p>
        UK courts have generally followed similar interpretations as EU courts regarding what constitutes extraordinary circumstances, 
        particularly ruling that most technical problems are not extraordinary circumstances as they are part of the normal operation of an airline.
      </p>

      <h3 id="how-to-claim" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">How to Claim Under UK261</h3>
      
      <InfoCardGrid
        columns={3}
        cards={[
          {
            icon: <FileTextIcon className="w-6 h-6" />,
            title: "Gather Documentation",
            description: "Collect boarding passes, ticket receipts, airline communications, and details about the disruption"
          },
          {
            icon: <PlaneTakeoffIcon className="w-6 h-6" />,
            title: "Contact the Airline",
            description: "Submit a claim through the airline's official channels, referencing UK261"
          },
          {
            icon: <CheckIcon className="w-6 h-6" />,
            title: "Escalate if Necessary",
            description: "If rejected, contact ADR schemes, CAA, or consider small claims court"
          }
        ]}
      />
      
      <ol className="list-decimal pl-6 space-y-4 mt-6">
        <li>
          <strong>Gather documentation:</strong>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Boarding passes and ticket receipts</li>
            <li>Any communication from the airline about the disruption</li>
            <li>Details about the length and cause of the disruption</li>
          </ul>
        </li>
        <li>
          <strong>Contact the airline directly:</strong>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Submit a claim through the airline's official channels</li>
            <li>Reference UK261 or "UK Flight Compensation Regulation" in your claim</li>
            <li>Include all relevant flight details and the nature of your claim</li>
          </ul>
        </li>
        <li>
          <strong>If rejected or no response:</strong>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Contact alternative dispute resolution (ADR) schemes if the airline participates in one</li>
            <li>File a complaint with the Civil Aviation Authority (CAA)</li>
            <li>Consider small claims court if necessary</li>
            <li>Seek professional assistance from a company like CleverClaim</li>
          </ul>
        </li>
      </ol>

      <h3 id="time-limits" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">Time Limits for UK261 Claims</h3>
      <p>
        Under UK law, you have up to 6 years from the date of the disrupted flight to make a claim in England, Wales, and 
        Northern Ireland. In Scotland, the time limit is 5 years. However, it's always advisable to submit your claim as 
        soon as possible after the disruption.
      </p>

      <h3 className="text-xl font-bold mt-8 mb-4">Potential Future Changes to UK261</h3>
      <p>
        It's worth noting that as time passes since Brexit, UK passenger rights legislation may begin to diverge from the EU regulation. 
        The UK government has indicated it may review passenger rights legislation, potentially making changes to the current system. 
        Travelers should stay informed about the latest regulations that apply to their journeys.
      </p>

      <h3 id="differences" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">Key Differences Between EU261 and UK261</h3>
      <table className="min-w-full bg-white my-6 border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border border-gray-200">Aspect</th>
            <th className="py-2 px-4 border border-gray-200">EU261</th>
            <th className="py-2 px-4 border border-gray-200">UK261</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4 border border-gray-200">Applicability</td>
            <td className="py-2 px-4 border border-gray-200">Flights departing from EU or arriving in EU on EU carriers</td>
            <td className="py-2 px-4 border border-gray-200">Flights departing from UK or arriving in UK on UK/EU carriers</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border border-gray-200">Compensation (short flights)</td>
            <td className="py-2 px-4 border border-gray-200">€250</td>
            <td className="py-2 px-4 border border-gray-200">£220</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border border-gray-200">Enforcement body</td>
            <td className="py-2 px-4 border border-gray-200">National enforcement bodies in each EU country</td>
            <td className="py-2 px-4 border border-gray-200">UK Civil Aviation Authority (CAA)</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border border-gray-200">Time limits</td>
            <td className="py-2 px-4 border border-gray-200">Varies by country (1-10 years)</td>
            <td className="py-2 px-4 border border-gray-200">6 years (5 in Scotland)</td>
          </tr>
        </tbody>
      </table>

      <h3 id="tips" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">Tips for Post-Brexit Air Travel Between UK and EU</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong>Check which regulation applies:</strong> For flights between the UK and EU, determine whether UK261 or EU261 applies to your journey
        </li>
        <li>
          <strong>Keep all documentation:</strong> Boarding passes, communications from airlines, and receipts for expenses incurred
        </li>
        <li>
          <strong>Be aware of duplicate claims:</strong> You cannot claim under both UK261 and EU261 for the same disruption
        </li>
        <li>
          <strong>Stay informed:</strong> Both UK and EU passenger rights may evolve independently over time
        </li>
      </ul>

      <RightsInfoBox 
        type="success" 
        icon={<CheckIcon />}
        className="my-6"
      >
        <p>
          Despite Brexit, UK passengers continue to enjoy strong legal protections for flight disruptions. UK261 largely mirrors 
          the EU regulation, providing significant rights to compensation and assistance. Understanding these rights can help 
          you navigate disruptions effectively and ensure you receive the compensation you're entitled to when traveling to or 
          from UK airports.
        </p>
      </RightsInfoBox>

      <p>
        Despite Brexit, UK passengers continue to enjoy strong legal protections for flight disruptions. UK261 largely mirrors 
        the EU regulation, providing significant rights to compensation and assistance. Understanding these rights can help 
        you navigate disruptions effectively and ensure you receive the compensation you're entitled to when traveling to or 
        from UK airports.
      </p>

      <RightsFaqSection 
        faqs={faqs}
        title="Frequently Asked Questions About UK261"
        className="mt-10"
        id="faq"
      />

      <RightsCallToAction 
        title="Need Help With Your UK261 Claim?"
        description="CleverClaim specializes in handling UK flight compensation claims. Our experts understand the complexities of post-Brexit aviation regulations and can help you navigate the process to ensure you get the compensation you're entitled to."
        buttonText="Start Your UK Flight Claim"
        buttonLink="/claim"
        stats={{
          value: "93%",
          label: "Success rate for UK claims"
        }}
        additionalInfo={["Expert handling of UK261 regulations", "No win, no fee guarantee"]}
        className="mt-10"
      />
    </RightsPageLayout>
  );
};

export default Uk261FlightCompensation;
