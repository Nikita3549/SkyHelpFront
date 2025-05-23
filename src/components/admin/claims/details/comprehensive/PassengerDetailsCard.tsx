
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { Claim } from "@/lib/supabase";

type PassengerDetailsCardProps = {
  claim: Claim;
};

const PassengerDetailsCard = ({ claim }: PassengerDetailsCardProps) => {
  // Parse address information
  let addressInfo = {};
  try {
    if (claim.additionalinformation) {
      const additionalInfo = JSON.parse(claim.additionalinformation);
      addressInfo = additionalInfo.addressInfo || {};
    }
  } catch (e) {
    // Ignore parsing errors
  }

  // Split customer name into first and last name
  const nameParts = claim.customer.split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Passenger Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">First Name</label>
            <p className="text-sm font-medium">{firstName || "Not provided"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Last Name</label>
            <p className="text-sm font-medium">{lastName || "Not provided"}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-400" />
            <div>
              <label className="text-sm font-medium text-gray-500">Email Address</label>
              <p className="text-sm font-medium">{claim.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <div>
              <label className="text-sm font-medium text-gray-500">Phone Number</label>
              <p className="text-sm font-medium">{claim.phone || "Not provided"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <label className="text-sm font-medium text-gray-500">Address</label>
          </div>
          <div className="pl-6 space-y-1">
            <p className="text-sm">{claim.address || "Not provided"}</p>
            <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
              <span>{(addressInfo as any).city || "City not provided"}</span>
              <span>{(addressInfo as any).postalCode || "Postal code not provided"}</span>
              <span>{(addressInfo as any).state || "State not provided"}</span>
            </div>
            <p className="text-sm font-medium">{(addressInfo as any).country || "Country not provided"}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-gray-400" />
          <div>
            <label className="text-sm font-medium text-gray-500">WhatsApp Notifications</label>
            <div className="mt-1">
              <Badge variant={(addressInfo as any).whatsappNotifications === "yes" ? "default" : "secondary"}>
                {(addressInfo as any).whatsappNotifications === "yes" ? "YES" : "NO"}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PassengerDetailsCard;
