import React from 'react';
import { FaqItem } from '@/components/rights/RightsFaqSection';

export const UK261_FAQS: FaqItem[] = [
  {
    question: 'Does UK261 apply to all airlines flying to or from the UK?',
    answer:
      'UK261 applies to flights departing from UK airports regardless of the airline, and flights arriving in the UK only if operated by UK or EU carriers. This creates an important distinction from EU261, which covers flights departing from EU airports or arriving in the EU on EU carriers.',
  },
  {
    question:
      'What if my flight is disrupted due to extraordinary circumstances?',
    answer:
      'Like EU261, UK261 exempts airlines from paying compensation if the disruption was caused by extraordinary circumstances that could not have been avoided even if all reasonable measures had been taken. These include severe weather, political instability, security risks, air traffic control restrictions, and unexpected flight safety shortcomings. However, the airline must still provide care and assistance during the disruption.',
  },
  {
    question: 'How soon after a disruption should I file a UK261 claim?',
    answer:
      "While you have up to 6 years in England, Wales, and Northern Ireland (5 years in Scotland) to file a claim, it's advisable to submit your claim as soon as possible. This makes it easier to gather and provide all the necessary documentation and increases your chances of a successful outcome.",
  },
  {
    question: 'Can I claim under both UK261 and EU261 for the same disruption?',
    answer:
      "No, you cannot claim compensation twice for the same disruption. You need to determine which regulation applies to your specific journey. For flights between the UK and EU, either UK261 or EU261 will apply depending on the direction of travel and the airline's nationality.",
  },
];

export default UK261_FAQS;
