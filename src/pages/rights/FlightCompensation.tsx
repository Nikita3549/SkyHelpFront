
import React from "react";
import RightsPageLayout from "@/components/rights/RightsPageLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Clock, CheckCircle, PlaneTakeoff, FileText, LucideHelp, BaggageClaim, AlertTriangle, Info } from "lucide-react";
import InfoCard from "@/components/common/InfoCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AnimatedButton from "@/components/ui-custom/AnimatedButton";

const FlightCompensation = () => {
  const relatedLinks = [
    { title: "Air Passenger Rights", href: "/rights/air-passenger-rights" },
    { title: "Delayed Flight Compensation", href: "/rights/delayed-flight-compensation" },
    { title: "Cancelled Flight Compensation", href: "/rights/cancelled-flight-compensation" },
    { title: "Denied Boarding Compensation", href: "/rights/denied-boarding-compensation" },
    { title: "Missed Connection Compensation", href: "/rights/missed-connection-compensation" }
  ];

  const tableOfContents = [
    { id: "eu261", title: "EU Regulation 261/2004 Explained" },
    { id: "compensation-amounts", title: "Flight Compensation Amounts" },
    { id: "eligibility", title: "Who Can Claim Flight Compensation" },
    { id: "disruption-types", title: "Types of Flight Disruptions" },
    { id: "claim-process", title: "How to Claim Compensation" },
    { id: "time-limits", title: "Time Limits for Claims" },
    { id: "extraordinary", title: "Extraordinary Circumstances" }
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
          <strong>Quick Summary:</strong> Under EU Regulation 261/2004, passengers may be entitled to compensation 
          of €250 to €600 for flight delays of 3+ hours, cancellations, or denied boarding. Eligible flights include 
          those departing from EU airports (regardless of airline) or arriving at EU airports with EU-based carriers. 
          Claims can be filed for flights up to 3-6 years in the past depending on the country. Compensation isn't due 
          if disruptions were caused by extraordinary circumstances beyond the airline's control.
        </p>
      </div>

      <h2 id="eu261" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">EU Regulation 261/2004 Explained</h2>
      <p>
        EU Regulation 261/2004 is the cornerstone of passenger rights in Europe. It provides standardized rules for 
        compensation and assistance to passengers in cases of:
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

      <h2 id="compensation-amounts" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">Flight Compensation Amounts</h2>
      <p className="mb-4">
        Under EU261, compensation amounts are fixed based on the flight distance:
      </p>
      <div className="overflow-x-auto my-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold">Flight Distance</TableHead>
              <TableHead className="font-semibold">Compensation Amount</TableHead>
              <TableHead className="font-semibold">Conditions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Up to 1,500 km</TableCell>
              <TableCell className="font-medium">€250 per passenger</TableCell>
              <TableCell>For all qualifying disruptions</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>Between 1,500-3,500 km</TableCell>
              <TableCell className="font-medium">€400 per passenger</TableCell>
              <TableCell>For all qualifying disruptions</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Over 3,500 km within EU</TableCell>
              <TableCell className="font-medium">€400 per passenger</TableCell>
              <TableCell>For all qualifying disruptions</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>Over 3,500 km outside EU</TableCell>
              <TableCell className="font-medium">€600 per passenger</TableCell>
              <TableCell>For delays 4+ hours (€300 for 3-4 hour delays)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="bg-amber-50 p-5 rounded-lg mb-6 flex items-start">
        <AlertTriangle className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0 mt-1" />
        <p>
          For long-distance flights (over 3,500 km) between the EU and non-EU destinations, if the delay at your final destination 
          is between 3 and 4 hours, the compensation may be reduced by 50%. However, you'll receive the full amount if the 
          delay exceeds 4 hours.
        </p>
      </div>

      <h2 id="eligibility" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">Who Can Claim Flight Compensation</h2>
      
      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">Eligible Flights</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>All flights departing from an EU airport (any airline)</li>
            <li>All flights arriving at an EU airport if operated by an EU-based airline</li>
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

      <h2 id="disruption-types" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">Types of Flight Disruptions</h2>

      <h3 className="text-xl font-semibold mt-6 mb-3">1. Flight Delays</h3>
      <p className="mb-4">
        You're entitled to compensation if your flight arrives at the final destination 3 or more hours later than scheduled 
        and the delay wasn't caused by extraordinary circumstances.
      </p>
      <div className="overflow-x-auto my-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold">Delay Length</TableHead>
              <TableHead className="font-semibold">Your Rights</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2+ hours</TableCell>
              <TableCell>
                <ul className="list-disc pl-6">
                  <li>Meals and refreshments</li>
                  <li>Two phone calls, emails, or faxes</li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>3+ hours</TableCell>
              <TableCell>
                <ul className="list-disc pl-6">
                  <li>Financial compensation (€250-€600)</li>
                  <li>All care and assistance from the 2+ hour category</li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>5+ hours</TableCell>
              <TableCell>
                <ul className="list-disc pl-6">
                  <li>Full ticket refund if you decide not to travel</li>
                  <li>Return flight to your departure point if relevant</li>
                  <li>All previous category benefits</li>
                </ul>
              </TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>Overnight delay</TableCell>
              <TableCell>
                <ul className="list-disc pl-6">
                  <li>Hotel accommodation</li>
                  <li>Transport between airport and hotel</li>
                  <li>All previous category benefits</li>
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">2. Flight Cancellations</h3>
      <p className="mb-4">
        You're entitled to compensation if your flight was cancelled without prior notice and the airline didn't offer 
        an alternative flight that arrives close to your original schedule.
      </p>
      <div className="overflow-x-auto my-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold">Notice Period</TableHead>
              <TableHead className="font-semibold">Compensation Condition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Less than 7 days</TableCell>
              <TableCell>If rerouting gets you to your destination more than 2 hours after your originally scheduled arrival</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>7-14 days</TableCell>
              <TableCell>If rerouting gets you to your destination more than 4 hours after your originally scheduled arrival</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>More than 14 days</TableCell>
              <TableCell>No compensation required, but the airline must offer a refund or alternative flight</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-3">3. Denied Boarding</h3>
      <p className="mb-4">
        If you're involuntarily denied boarding (typically due to overbooking), you're entitled to immediate compensation 
        and assistance, regardless of when you eventually arrive at your destination.
      </p>
      <p className="mb-4">
        The airline must offer you the choice between:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>Full ticket refund plus return flight to your departure point if necessary</li>
        <li>Alternative transport to your destination at the earliest opportunity</li>
        <li>Rebooking to your destination at a later date of your choosing</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-3">4. Missed Connections</h3>
      <p className="mb-4">
        If you miss a connecting flight due to a delay in your first flight, you may be entitled to compensation if:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Both flights were part of the same booking (same reservation number)</li>
        <li>The delay of the first flight caused you to miss your connection</li>
        <li>You arrive at your final destination with a delay of 3+ hours</li>
      </ul>

      <h2 id="extraordinary" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">Extraordinary Circumstances</h2>
      <p className="mb-4">
        Airlines can avoid paying compensation if the disruption was caused by "extraordinary circumstances" that 
        could not have been avoided even if all reasonable measures had been taken.
      </p>

      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold text-lg mb-3">What Qualifies as Extraordinary</h4>
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

      <div className="bg-blue-50 p-5 rounded-lg mb-6 flex items-start">
        <Info className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
        <p>
          <strong>Important:</strong> Following European Court rulings, most technical problems are NOT considered extraordinary circumstances, 
          as they are deemed part of an airline's normal operations. Airlines often reject claims citing technical issues, but 
          courts have consistently ruled in passengers' favor in such cases.
        </p>
      </div>

      <h2 id="claim-process" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">How to Claim Compensation: Step-by-Step</h2>
      
      <div className="grid md:grid-cols-3 gap-6 my-8">
        <InfoCard 
          icon={<FileText className="w-5 h-5" />}
          title="1. Document Everything" 
          description="Collect boarding passes, booking confirmations, communications from the airline, and expenses receipts."
          className="bg-blue-50"
        />
        
        <InfoCard 
          icon={<Clock className="w-5 h-5" />}
          title="2. Calculate Entitlement" 
          description="Check flight distance and delay duration to determine your potential compensation amount."
          className="bg-green-50"
        />
        
        <InfoCard 
          icon={<CheckCircle className="w-5 h-5" />}
          title="3. Submit Your Claim" 
          description="Contact the airline directly with all details, referencing EU261, or use a specialized claim company."
          className="bg-amber-50"
        />
      </div>

      <ol className="list-decimal pl-6 space-y-4 mb-8">
        <li>
          <strong>Gather essential documentation:</strong>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Booking confirmation showing your reservation number</li>
            <li>Boarding passes for all flights</li>
            <li>Any communication from the airline about the disruption</li>
            <li>Receipts for any additional expenses incurred due to the disruption</li>
            <li>Photos or evidence of information displays showing delays/cancellations</li>
          </ul>
        </li>
        <li>
          <strong>Calculate your compensation entitlement:</strong>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Check the flight distance to determine the potential compensation amount</li>
            <li>Verify that the delay at your final destination was 3+ hours (for delays)</li>
            <li>Consider if your case might involve extraordinary circumstances</li>
          </ul>
        </li>
        <li>
          <strong>Submit a claim to the airline:</strong>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Use the airline's official claim form if available on their website</li>
            <li>Otherwise, send a formal letter or email to their customer service department</li>
            <li>Include all relevant details and specifically reference EU Regulation 261/2004</li>
            <li>Attach copies of your documentation as evidence</li>
          </ul>
        </li>
        <li>
          <strong>Be prepared to follow up persistently:</strong>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Airlines often initially reject claims or offer vouchers instead of cash</li>
            <li>Send reminders if you don't receive a response within 6-8 weeks</li>
            <li>Know your rights and be prepared to challenge incorrect rejections</li>
          </ul>
        </li>
        <li>
          <strong>Escalate if necessary:</strong>
          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li>Contact the relevant national enforcement body (varies by country)</li>
            <li>Consider using alternative dispute resolution services</li>
            <li>As a last resort, consider small claims court in your country</li>
            <li>Or let a specialized claim company like CleverClaim handle the process for you</li>
          </ul>
        </li>
      </ol>

      <div className="bg-amber-50 p-5 rounded-lg mb-6 flex items-start">
        <AlertCircle className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0 mt-1" />
        <div>
          <p className="font-semibold mb-1">Common Airline Tactics to Watch For:</p>
          <ul className="list-disc pl-6">
            <li>Offering vouchers instead of cash compensation (you're entitled to money)</li>
            <li>Claiming "technical issues" as extraordinary circumstances</li>
            <li>Excessive delays in responding to claims hoping you'll give up</li>
            <li>Providing minimal information about your rights during disruptions</li>
          </ul>
        </div>
      </div>

      <h2 id="time-limits" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">Time Limits for Claims</h2>
      <p className="mb-4">
        The time limit for filing compensation claims varies by country. It's determined by the departure country's 
        limitation period for contractual claims, not by your nationality or the airline's country of origin.
      </p>

      <div className="overflow-x-auto my-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold">Time Limit</TableHead>
              <TableHead className="font-semibold">Countries</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>1 year</TableCell>
              <TableCell>Belgium, Poland, Slovakia</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>2 years</TableCell>
              <TableCell>Croatia, Czech Republic, Denmark, Finland, Latvia, Norway, Portugal, Spain, Switzerland</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3 years</TableCell>
              <TableCell>Austria, Germany, Estonia, Greece, Iceland, Netherlands, Romania, Slovenia, Sweden</TableCell>
            </TableRow>
            <TableRow className="bg-gray-50">
              <TableCell>5 years</TableCell>
              <TableCell>France, Hungary, Italy</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>6 years</TableCell>
              <TableCell>United Kingdom (5 years in Scotland)</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="bg-blue-50 p-5 rounded-lg mb-6 flex items-start">
        <Info className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
        <p>
          It's advisable to file your claim as soon as possible after the disruption, while evidence is still fresh and readily available. 
          Even though some countries allow claims for flights from several years ago, airlines may have purged their records, making it 
          harder to verify your claim details.
        </p>
      </div>

      <h2 id="faq" className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="mb-8">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-lg font-medium">Can I claim compensation for both a delayed and cancelled flight?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
            No, you cannot claim twice for the same disrupted journey. EU261 entitles you to compensation once per 
            disrupted journey, not for each individual issue that occurred. The compensation is calculated based on 
            the total delay at your final destination, regardless of whether it was caused by a delay, cancellation, 
            or combination of issues.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-lg font-medium">Am I entitled to compensation if I was offered an alternative flight?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
            Yes, you can still be entitled to compensation even if you accepted an alternative flight. The key factor 
            is how much later you arrived at your final destination compared to your original schedule. If the replacement 
            flight got you there 3+ hours late, you're likely eligible for compensation, even if you accepted the airline's 
            alternative travel arrangements.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-lg font-medium">What if I was rerouted through a different connecting city?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
            Being rerouted through a different connecting city doesn't affect your right to compensation if you still 
            arrived at your final destination 3+ hours late. The route taken is irrelevant for compensation purposes - 
            only the delay at your final destination matters. If the airline got you there via a completely different 
            path but still late, you maintain your right to compensation.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-lg font-medium">Can I claim if my flight was part of a package holiday?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
            Yes, flights that are part of package holidays are fully covered by EU261. You have the same rights as any 
            other passenger. However, you may need to direct your claim to the tour operator rather than the airline, 
            depending on your specific booking arrangements. The tour operator is responsible for assisting you with 
            your claim against the airline.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="text-lg font-medium">Do I need a lawyer to claim flight compensation?</AccordionTrigger>
          <AccordionContent className="text-gray-700">
            No, you don't need a lawyer to claim flight compensation. You can submit a claim directly to the airline 
            yourself. However, if the airline refuses to pay or ignores your claim, you might consider using a specialized 
            flight compensation company like CleverClaim to handle your case. These services work on a no-win, no-fee basis 
            and have expertise in dealing with resistant airlines.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Separator className="my-10" />

      <div className="grid md:grid-cols-2 gap-8 my-10 bg-blue-50 p-8 rounded-xl">
        <div>
          <h3 className="text-2xl font-semibold mb-4">Tired of Fighting Airlines?</h3>
          <p className="mb-6">
            Let our experts handle your flight compensation claim. With our specialized knowledge of air passenger 
            rights and years of experience dealing with resistant airlines, we can maximize your chances of receiving 
            the compensation you deserve.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>No win, no fee policy - we only get paid if you do</li>
            <li>We handle all airline communications and paperwork</li>
            <li>Higher success rate than claiming yourself</li>
            <li>Expert knowledge of case law and precedents</li>
            <li>Regular updates on your claim's progress</li>
          </ul>
          <AnimatedButton to="/claim" variant="primary" size="lg" className="mt-4">
            Start Your Compensation Claim Now
          </AnimatedButton>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-3">€600</div>
            <p className="text-xl">Maximum compensation per passenger</p>
            <p className="text-sm mt-2 text-gray-600">Claim takes just 3 minutes to start</p>
            <p className="text-sm text-gray-600">Most claims resolved within 12 weeks</p>
          </div>
        </div>
      </div>

      <p>
        While claiming flight compensation can sometimes be a time-consuming process, persistence pays off. EU regulations 
        provide strong protection for passengers, and you're entitled to claim what you're legally owed. If the process seems 
        daunting, specialized companies like CleverClaim can handle your case on a no-win, no-fee basis, ensuring you receive 
        the compensation you deserve without the hassle.
      </p>
    </RightsPageLayout>
  );
};

export default FlightCompensation;
