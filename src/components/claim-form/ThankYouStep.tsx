import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  FileText,
  Send,
  MessageSquare,
  Scale,
  BanknoteIcon,
  Copy,
  Info,
  ExternalLink,
  ClipboardCheck,
} from 'lucide-react';
import { AnimationTransitions } from '@/components/claim-form/types';
import { useNavigate } from 'react-router-dom';

interface ThankYouStepProps {
  transitions: AnimationTransitions;
  claimId: string;
  airlineName: string;
}

const ThankYouStep: React.FC<ThankYouStepProps> = ({
  transitions,
  claimId,
  airlineName,
}) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Generate a claim URL
  const claimUrl = `${window.location.origin}/claims/${claimId}`;

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(claimUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // View claim status
  const handleViewStatus = () => {
    navigate(`/dashboard?claim=${claimId}`);
  };

  return (
    <motion.div
      key="thank-you-step"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">
          Thank you, your claim has been submitted!
        </h1>
        {/*<p className="text-lg text-gray-700">*/}
        {/*  Your unique claim number is <strong>#{claimId}</strong>.*/}
        {/*</p>*/}
      </div>

      <Card className="bg-blue-50 p-6">
        <h2 className="text-xl font-bold mb-6">What happens next:</h2>

        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="bg-blue-600 p-2 rounded-lg h-fit">
              <FileText className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                We investigate what happened
              </h3>
              <p className="text-gray-700">
                Our experienced team will verify your documents, find flight
                reports, check weather conditions, and more to confirm your
                compensation.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-600 p-2 rounded-lg h-fit">
              <Send className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">We handle the paperwork</h3>
              <p className="text-gray-700">
                We put together a solid case for compensation and deliver it to{' '}
                {airlineName}.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-600 p-2 rounded-lg h-fit">
              <MessageSquare className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">The negotiations begin</h3>
              <p className="text-gray-700">
                It can take up to 3 months to get a decision. We'll keep you
                updated along the way.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-600 p-2 rounded-lg h-fit">
              <Scale className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                If the airline won't cooperate
              </h3>
              <p className="text-gray-700">
                Should {airlineName} reject or ignore the claim, we'll get
                specialist lawyers to take stronger action.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="bg-blue-600 p-2 rounded-lg h-fit">
              <BanknoteIcon className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">We send you the money</h3>
              <p className="text-gray-700">
                The moment the airline pays, we'll request your payment details
                and transfer your money.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/*<div className="mt-8">*/}
      {/*  <p className="mb-3">*/}
      {/*    Feel free to copy your claim's link, save it, or bookmark it for*/}
      {/*    later:*/}
      {/*  </p>*/}
      {/*  <div className="flex">*/}
      {/*    <Input readOnly value={claimUrl} className="rounded-r-none" />*/}
      {/*    <Button onClick={handleCopy} className="rounded-l-none">*/}
      {/*      {copied ? (*/}
      {/*        <ClipboardCheck className="mr-2 h-4 w-4" />*/}
      {/*      ) : (*/}
      {/*        <Copy className="mr-2 h-4 w-4" />*/}
      {/*      )}*/}
      {/*      {copied ? 'Copied!' : 'Copy'}*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*</div>*/}

      <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-2 mt-4">
        <Info className="text-blue-600 h-5 w-5 mt-0.5 flex-shrink-0" />
        <p className="text-gray-700">
          If you have any further questions, please visit the{' '}
          <a href="/help" className="text-blue-600 hover:underline">
            Help section
          </a>
          .
        </p>
      </div>

      <div className="flex justify-center pt-10">
        <Button onClick={handleViewStatus} size="lg" className="px-8">
          View Your Claim Status
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default ThankYouStep;
