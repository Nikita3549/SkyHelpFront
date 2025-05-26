import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import ClaimsList from "@/components/dashboard/ClaimsList";
import ClaimDetails from "@/components/dashboard/ClaimDetails";

// Sample claims data
const claims = [
  {
    id: "CLM-1234",
    airline: "Lufthansa",
    flightNumber: "LH1234",
    departureDate: "2023-11-15",
    route: "London (LHR) to Frankfurt (FRA)",
    status: "in_progress",
    statusText: "In Progress",
    compensation: "€400",
    progress: 60,
    lastUpdate: "2023-12-10",
    estimatedCompletion: "2024-01-20",
    disruptionType: "delay",
    passengerName: "John Smith",
    documents: [
      { name: "Boarding Pass", status: "uploaded" },
      { name: "Flight Ticket", status: "uploaded" },
      { name: "ID Document", status: "requested" },
    ],
    messages: [
      {
        date: "2023-12-10",
        content: "We've submitted your claim to Lufthansa and are awaiting their response.",
        isFromTeam: true,
      },
      {
        date: "2023-12-05",
        content: "Your claim has been reviewed and is valid for compensation. We'll now contact the airline.",
        isFromTeam: true,
      },
    ],
  },
  {
    id: "CLM-5678",
    airline: "British Airways",
    flightNumber: "BA2160",
    departureDate: "2023-10-20",
    route: "Madrid (MAD) to London (LHR)",
    status: "completed",
    statusText: "Completed",
    compensation: "€250",
    progress: 100,
    lastUpdate: "2023-11-30",
    paymentDate: "2023-11-30",
    disruptionType: "cancellation",
    passengerName: "Sarah Johnson",
    documents: [
      { name: "Boarding Pass", status: "uploaded" },
      { name: "Flight Ticket", status: "uploaded" },
      { name: "ID Document", status: "uploaded" },
    ],
    messages: [
      {
        date: "2023-11-30",
        content: "Your compensation of €250 has been transferred to your account. Thank you for using our service!",
        isFromTeam: true,
      },
      {
        date: "2023-11-25",
        content: "Good news! British Airways has approved your claim and agreed to pay compensation.",
        isFromTeam: true,
      },
    ],
  },
  {
    id: "CLM-9012",
    airline: "Ryanair",
    flightNumber: "FR8012",
    departureDate: "2023-12-05",
    route: "Barcelona (BCN) to Paris (ORY)",
    status: "review",
    statusText: "Under Review",
    compensation: "€250 (estimated)",
    progress: 30,
    lastUpdate: "2023-12-12",
    estimatedCompletion: "2024-02-15",
    disruptionType: "denied_boarding",
    passengerName: "Michael Brown",
    documents: [
      { name: "Boarding Pass", status: "uploaded" },
      { name: "Flight Ticket", status: "requested" },
      { name: "ID Document", status: "requested" },
    ],
    messages: [
      {
        date: "2023-12-12",
        content: "We need your flight ticket to proceed with the claim. Please upload it as soon as possible.",
        isFromTeam: true,
      },
      {
        date: "2023-12-08",
        content: "Your claim has been received and is currently under initial review.",
        isFromTeam: true,
      },
    ],
  },
];

const Dashboard = () => {
  const [selectedClaimId, setSelectedClaimId] = useState(claims[0].id);
  const [messageText, setMessageText] = useState('');
  const selectedClaim = claims.find((claim) => claim.id === selectedClaimId);

  // Function to generate message
  const generateNewMessage = () => {
    console.log("New message generated");
    // In a real app, this would open a message compose UI
  };

  // Function to upload document
  const uploadDocument = () => {
    console.log("Document upload triggered");
    // In a real app, this would open a file upload UI
  };

  // Function to contact support
  const contactSupport = () => {
    console.log("Contact support clicked");
    // In a real app, this would open a support contact form or chat
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    console.log("Sending message:", messageText);
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
      messages: [...(selectedClaim?.messages || []), newMessage]
    };
    
    setMessageText('');
    
    // Show success feedback
    console.log("Message sent successfully");
  };

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
