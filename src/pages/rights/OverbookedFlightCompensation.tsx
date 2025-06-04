import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import RightsPageLayout from '@/components/rights/RightsPageLayout';

const OverbookedFlightCompensation = () => {
  const relatedLinks = [
    { title: 'Air Passenger Rights', href: '/rights/air-passenger-rights' },
    {
      title: 'Denied Boarding Compensation',
      href: '/rights/denied-boarding-compensation',
    },
    {
      title: 'Cancelled Flight Compensation',
      href: '/rights/cancelled-flight-compensation',
    },
    { title: 'Flight Compensation', href: '/rights/flight-compensation' },
  ];

  const tableOfContents = [
    { id: 'understanding', title: 'Understanding Overbooked Flights' },
    { id: 'what-is', title: 'What is Flight Overbooking?' },
    { id: 'your-rights', title: 'Your Rights When Denied Boarding' },
    {
      id: 'voluntary-vs-involuntary',
      title: 'Voluntary vs. Involuntary Denied Boarding',
    },
    { id: 'exceptions', title: 'Exceptions to Compensation' },
    { id: 'how-to-claim', title: 'How to Claim Compensation' },
    { id: 'time-limits', title: 'Time Limits for Claims' },
    { id: 'maximizing', title: 'Maximizing Your Rights' },
  ];

  return (
    <RightsPageLayout
      title="Overbooked Flight Compensation"
      description="Know your rights when denied boarding due to overbooking"
      metaTitle="Overbooked Flight Compensation Guide | SkyHelp"
      metaDescription="Learn how to claim compensation of up to €600 when you've been denied boarding due to an overbooked flight under EU Regulation 261/2004."
      relatedLinks={relatedLinks}
      tableOfContents={tableOfContents}
    >
      <h2 id="understanding" className="text-2xl font-bold mb-4 scroll-mt-24">
        Understanding Overbooked Flights
      </h2>
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <p className="text-lg">
          <strong>Quick Summary:</strong> When airlines overbook flights and
          you're denied boarding against your will, EU Regulation 261/2004
          entitles you to immediate compensation ranging from €250 to €600, plus
          your choice of a refund or re-routing to your destination.
        </p>
      </div>

      <p>
        Airlines routinely sell more tickets than there are seats available on a
        flight, a practice known as overbooking. They do this based on the
        statistical likelihood that some passengers won't show up. However, when
        all passengers do turn up, the airline must deny boarding to some
        travelers. If you're one of those affected, you have significant rights
        under EU Regulation 261/2004.
      </p>

      <h3 id="what-is" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        What is Flight Overbooking?
      </h3>
      <p>
        Flight overbooking is a common practice where airlines sell more tickets
        than available seats on a flight. Airlines use historical data to
        predict how many passengers will likely miss their flight due to changes
        in travel plans, connections, or other reasons. While this helps
        airlines maximize revenue and reduce empty seats, it can result in some
        passengers being denied boarding when everyone shows up.
      </p>

      <h3 id="your-rights" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        Your Rights When Denied Boarding Due to Overbooking
      </h3>
      <p>
        If you're denied boarding due to an overbooked flight, EU Regulation
        261/2004 provides you with the following rights:
      </p>

      <h4 className="text-lg font-semibold mt-6 mb-3">Right to Compensation</h4>
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-blue-50">
              <th className="py-3 px-4 border text-left">Flight Distance</th>
              <th className="py-3 px-4 border text-left">
                Compensation Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4 border">Flights up to 1,500 km</td>
              <td className="py-3 px-4 border font-semibold">€250</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-3 px-4 border">
                Flights between 1,500 and 3,500 km
              </td>
              <td className="py-3 px-4 border font-semibold">€400</td>
            </tr>
            <tr>
              <td className="py-3 px-4 border">Flights over 3,500 km</td>
              <td className="py-3 px-4 border font-semibold">€600</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h4 className="text-lg font-semibold mt-6 mb-3">
        Right to Choose Between
      </h4>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>
          <strong>Reimbursement</strong> of the full cost of your ticket for the
          unused parts of your journey
        </li>
        <li>
          <strong>Re-routing</strong> to your final destination as soon as
          possible
        </li>
        <li>
          <strong>Re-routing</strong> at a later date of your convenience,
          subject to seat availability
        </li>
      </ul>

      <h4 className="text-lg font-semibold mt-6 mb-3">Right to Care</h4>
      <div className="bg-gray-50 p-5 rounded-lg mb-5">
        <p className="mb-2">
          While waiting for your re-routed flight, you are entitled to:
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Meals and refreshments proportionate to the waiting time</li>
          <li>Two telephone calls, emails, or faxes</li>
          <li>Hotel accommodation if an overnight stay becomes necessary</li>
          <li>Transport between the airport and the hotel</li>
        </ul>
      </div>

      <h3
        id="voluntary-vs-involuntary"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        Voluntary vs. Involuntary Denied Boarding
      </h3>
      <p>When a flight is overbooked, airlines typically:</p>
      <ol className="list-decimal pl-6 mb-6 space-y-3">
        <li>
          <strong>First ask for volunteers</strong> who are willing to give up
          their seats in exchange for benefits (like vouchers, upgrades, or
          cash). If you accept this voluntary offer, you waive your right to the
          standard compensation but should still receive assistance and
          re-routing.
        </li>
        <li>
          <strong>If not enough passengers volunteer</strong>, the airline will
          deny boarding to selected passengers involuntarily. These passengers
          are entitled to the full compensation and rights under EU261.
        </li>
      </ol>

      <div className="bg-blue-50 p-6 rounded-lg my-6">
        <h4 className="font-semibold text-lg mb-2">Important to Know:</h4>
        <p>
          If you're denied boarding involuntarily, the airline must compensate
          you immediately at the airport. Don't accept vouchers unless their
          value exceeds the compensation you're entitled to by law. The
          compensation is your legal right, not a goodwill gesture from the
          airline.
        </p>
      </div>

      <h3 id="exceptions" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        Exceptions to Compensation
      </h3>
      <p>You may not be entitled to compensation if:</p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>You voluntarily gave up your seat in exchange for benefits</li>
        <li>
          You arrived at the check-in counter later than the minimum time
          specified
        </li>
        <li>You don't have the correct travel documentation</li>
        <li>
          There are reasonable grounds to deny boarding, such as health, safety,
          or security reasons
        </li>
      </ul>

      <h3
        id="how-to-claim"
        className="text-xl font-bold mt-8 mb-4 scroll-mt-24"
      >
        How to Claim Compensation for an Overbooked Flight
      </h3>
      <p>
        If you've been denied boarding due to overbooking, follow these steps:
      </p>
      <ol className="list-decimal pl-6 mb-6 space-y-3">
        <li>
          <strong>Collect evidence:</strong> Make sure you get written
          confirmation of why you were denied boarding
        </li>
        <li>
          <strong>Keep all documentation</strong> related to the incident and
          your original booking
        </li>
        <li>
          <strong>Gather evidence</strong> of any additional expenses incurred
          due to the denied boarding
        </li>
        <li>
          <strong>Contact the airline</strong> directly and submit a formal
          claim for compensation
        </li>
        <li>
          <strong>Be persistent:</strong> Airlines might initially reject your
          claim
        </li>
      </ol>

      <div className="bg-gray-50 p-5 rounded-lg my-5">
        <p>
          If the airline refuses to compensate you adequately despite your
          persistent efforts, consider seeking professional help from a
          specialized company like CleverClaim to handle your case.
        </p>
      </div>

      <h3 id="time-limits" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        Time Limits for Making a Claim
      </h3>
      <p>
        The time limit for filing a claim varies depending on the departure
        country:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>1-2 years in some EU countries</li>
        <li>Up to 6 years in the UK</li>
      </ul>
      <p>
        It's advisable to submit your claim as soon as possible while the
        details are fresh and documentation is readily available.
      </p>

      <h3 id="maximizing" className="text-xl font-bold mt-8 mb-4 scroll-mt-24">
        Maximizing Your Rights When Faced with an Overbooked Flight
      </h3>
      <div className="bg-blue-50 p-6 rounded-lg mb-6">
        <h4 className="font-semibold text-lg mb-3">Practical Tips:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Check in online as early as possible to secure your seat</li>
          <li>
            Arrive at the airport well before the recommended check-in time
          </li>
          <li>
            If asked to volunteer, negotiate for benefits beyond the legal
            minimum compensation
          </li>
          <li>
            Keep all documentation related to your booking and the disruption
          </li>
          <li>Be polite but firm when asserting your rights</li>
        </ul>
      </div>

      <p>
        Remember, being denied boarding due to overbooking is not your fault,
        and you have clear rights under EU law. Airlines have a legal obligation
        to inform you of your rights when you're denied boarding and to provide
        the compensation you're entitled to.
      </p>

      <div className="bg-blue-50 p-6 rounded-lg my-8">
        <h3 className="text-xl font-semibold mb-3">
          Need Help With Your Claim?
        </h3>
        <p className="mb-4">
          SkyHelp specializes in helping passengers get the compensation they
          deserve. Our simple process and no-win, no-fee approach means there's
          no risk to you. Let us handle the complexity of dealing with airlines
          while you focus on what matters.
        </p>
        <Button asChild>
          <Link to="/claim">Start Your Claim Now</Link>
        </Button>
      </div>
    </RightsPageLayout>
  );
};

export default OverbookedFlightCompensation;
