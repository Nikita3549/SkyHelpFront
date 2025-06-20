import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import ClaimsList from '@/components/dashboard/ClaimsList';
import ClaimDetails from '@/components/dashboard/ClaimDetails';
import { useDashboardClaims } from '@/hooks/useDashboardClaims.ts';
import api from '@/api/axios.ts';

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { claims, setClaims } = useDashboardClaims(setLoading);
  const [selectedClaimId, setSelectedClaimId] = useState('');
  const [messageText, setMessageText] = useState('');
  const selectedClaim = claims.find((claim) => claim.id === selectedClaimId);

  // Function to generate message
  const generateNewMessage = () => {
    console.log('New message generated');
    // In a real app, this would open a message compose UI
  };

  useEffect(() => {
    console.log(claims.length != 0);
    setSelectedClaimId(claims.length != 0 ? claims[0].id : '');
  }, [claims]);

  // Function to upload document
  const uploadDocument = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.pdf,.jpg,.jpeg,.png';

      input.onchange = async () => {
        if (!input.files || input.files.length === 0) return;

        const formData = new FormData();
        Array.from(input.files).forEach((file) => {
          formData.append('documents', file);
        });

        const res = await api.post(
          `/claims/${selectedClaim.id}/upload`,
          formData,
        );

        if (res.status != 201) {
          console.error('Upload failed');
          return;
        }

        setClaims(
          claims.map((c) => {
            if (c.id != selectedClaim.id) {
              return c;
            }
            return {
              ...c,
              documents: [
                ...c.documents,
                {
                  id: '',
                  status: 'uploaded',
                  name: input.files[0].name,
                },
              ],
            };
          }),
        );
        console.log('Upload successful:');
      };

      input.click();
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  // Function to contact support
  const contactSupport = () => {
    console.log('Contact support clicked');
    // In a real app, this would open a support contact form or chat
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    console.log('Sending message:', messageText);
    // In a real app, this would send the message to the support team

    // Add the message to the claim's messages
    const newMessage = {
      date: new Date().toISOString().split('T')[0],
      content: messageText,
      isFromTeam: false,
    };

    // Update the selected claim's messages (in a real app, this would update the backend)
    const updatedClaim = {
      ...selectedClaim,
      messages: [...(selectedClaim?.messages || []), newMessage],
    };

    setMessageText('');

    console.log('Message sent successfully');
  };
  if (loading) {
    return (
      <div className="w-full min-h-[90vh] flex justify-center align-middle">
        <LoaderCircle
          className="animate-spin mt-auto mb-auto"
          color="#2563eb"
          size={100}
        />
      </div>
    );
  }

  if (claims.length == 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
        <div className="rounded-2xl bg-white p-8 shadow-xl max-w-md w-full text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            No available claims
          </h1>
          <p className="text-gray-600 mb-6">
            It looks like there are no claims available for you at the moment.
            If you believe this is a mistake, please contact our support team.
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition"
          >
            Back to homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">My Claims Dashboard</h1>
            <p className="text-gray-600">
              Track and manage your flight compensation claims
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 md:mt-0"
          >
            <Link to="/claim">
              <Button>
                Start New Claim
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ClaimsList
            claims={claims}
            selectedClaimId={selectedClaimId}
            onClaimSelect={setSelectedClaimId}
          />

          {selectedClaim && (
            <ClaimDetails
              claim={selectedClaim}
              messageText={messageText}
              onMessageChange={setMessageText}
              onSendMessage={handleSendMessage}
              onContactSupport={contactSupport}
              onUploadDocument={uploadDocument}
              onGenerateNewMessage={generateNewMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
