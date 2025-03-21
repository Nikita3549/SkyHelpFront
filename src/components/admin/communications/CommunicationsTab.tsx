
import React from "react";
import EmailTemplates from "./EmailTemplates";
import RecentCommunications from "./RecentCommunications";
import NewEmailForm from "./NewEmailForm";

const CommunicationsTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EmailTemplates />
        <RecentCommunications />
      </div>
      <NewEmailForm />
    </div>
  );
};

export default CommunicationsTab;
