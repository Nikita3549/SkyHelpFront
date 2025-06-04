import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Uk261RightsTabs = () => {
  return (
    <Tabs defaultValue="delays" className="mt-6">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="delays">Flight Delays</TabsTrigger>
        <TabsTrigger value="cancellations">Cancellations</TabsTrigger>
        <TabsTrigger value="denied">Denied Boarding</TabsTrigger>
      </TabsList>
      <TabsContent value="delays" className="pt-4">
        <p>You may be entitled to compensation if:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Your flight arrives at your final destination 3 or more hours later
            than scheduled
          </li>
          <li>The delay wasn't caused by extraordinary circumstances</li>
          <li>Your flight falls under the scope of UK261 as described above</li>
        </ul>
        <p>During a delay, you're also entitled to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>
              Delays of 2+ hours (short flights), 3+ hours (medium flights), or
              4+ hours (long flights):
            </strong>{' '}
            Meals, refreshments, and communication
          </li>
          <li>
            <strong>Delays requiring an overnight stay:</strong> Hotel
            accommodation and transport
          </li>
          <li>
            <strong>Delays of 5+ hours:</strong> A refund of your ticket if you
            choose not to travel
          </li>
        </ul>
      </TabsContent>
      <TabsContent value="cancellations" className="pt-4">
        <p>You may be entitled to compensation if:</p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>Your flight was cancelled less than 14 days before departure</li>
          <li>The cancellation wasn't caused by extraordinary circumstances</li>
          <li>
            Any replacement flight offered causes a significant delay in arrival
            at your final destination
          </li>
        </ul>
        <p>
          When your flight is cancelled, you always have the right to choose
          between:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>A full refund of your ticket</li>
          <li>Re-routing to your destination at the earliest opportunity</li>
          <li>Re-routing at a later date of your convenience</li>
        </ul>
      </TabsContent>
      <TabsContent value="denied" className="pt-4">
        <p>
          If you're involuntarily denied boarding (typically due to
          overbooking), you're entitled to:
        </p>
        <ul className="list-disc pl-6 space-y-2 my-4">
          <li>
            Immediate compensation (£220-£520 depending on flight distance)
          </li>
          <li>A choice between refund or re-routing</li>
          <li>Care and assistance (meals, accommodation if necessary)</li>
        </ul>
      </TabsContent>
    </Tabs>
  );
};

export default Uk261RightsTabs;
