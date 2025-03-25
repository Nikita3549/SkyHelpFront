
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AssistantWidgetProps {
  name?: string;
  role?: string;
  avatarSrc?: string;
}

const AssistantWidget: React.FC<AssistantWidgetProps> = ({
  name = "Alex",
  role = "Your CleverClaim Assistant",
  avatarSrc = "/lovable-uploads/8f6afcb7-d3dd-4758-825f-5b1f287ca7d5.png"
}) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-6">
      <Avatar className="h-14 w-14 mr-4">
        <AvatarImage src={avatarSrc} alt={name} />
        <AvatarFallback className="bg-primary/10 text-primary font-medium">
          {name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-lg font-semibold text-blue-900">{name}</h3>
        <p className="text-sm text-gray-600">{role}</p>
      </div>
    </div>
  );
};

export default AssistantWidget;
