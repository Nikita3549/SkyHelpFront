
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Calendar } from "lucide-react";
import { Claim } from "@/lib/supabase";

type DisruptionDetailsCardProps = {
  claim: Claim;
};

const DisruptionDetailsCard = ({ claim }: DisruptionDetailsCardProps) => {
  // Parse additional disruption details
  let disruptionDetails = {};
  try {
    if (claim.additionalinformation) {
      const additionalInfo = JSON.parse(claim.additionalinformation);
      disruptionDetails = additionalInfo.disruptionDetails || {};
    }
  } catch (e) {
    // Ignore parsing errors
  }

  const getDisruptionTypeDisplay = (type: string) => {
    switch (type) {
      case "delayed": return "Flight was delayed";
      case "canceled": return "Flight was canceled";
      case "overbooking": return "Denied boarding (overbooking)";
      case "missed_connection": return "Missed connecting flight";
      default: return type || "Not specified";
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "delayed": return "secondary";
      case "canceled": return "destructive";
      case "overbooking": return "outline";
      case "missed_connection": return "default";
      default: return "secondary";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Disruption Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-500">What happened?</label>
          <div className="mt-2">
            <Badge variant={getBadgeVariant(claim.flightissue || "")}>
              {getDisruptionTypeDisplay(claim.flightissue || "")}
            </Badge>
          </div>
        </div>

        {claim.flightissue === "delayed" && (
          <div className="space-y-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800">Delay Details</h4>
            
            <div>
              <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <Clock className="h-4 w-4" />
                How many hours late did the client arrive?
              </label>
              <p className="text-sm mt-1">{(disruptionDetails as any).arrivalDelay || "Not specified"}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                How many days before departure were they informed?
              </label>
              <p className="text-sm mt-1">{(disruptionDetails as any).notificationTime || "Not specified"}</p>
            </div>
          </div>
        )}

        {claim.flightissue === "canceled" && (
          <div className="space-y-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-medium text-red-800">Cancellation Details</h4>
            
            <div>
              <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <Clock className="h-4 w-4" />
                How many hours late to final destination?
              </label>
              <p className="text-sm mt-1">{(disruptionDetails as any).arrivalDelay || "Not specified"}</p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                How many days before departure were they informed?
              </label>
              <p className="text-sm mt-1">{(disruptionDetails as any).notificationTime || "Not specified"}</p>
            </div>
          </div>
        )}

        {claim.flightissue === "overbooking" && (
          <div className="space-y-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800">Denied Boarding Details</h4>
            
            <div>
              <label className="text-sm font-medium text-gray-600">Did the client volunteer to give up seat?</label>
              <p className="text-sm mt-1">{(disruptionDetails as any).volunteerDenial || "Not specified"}</p>
            </div>
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-gray-500">Reason Provided by Airline</label>
          <div className="mt-2 space-y-2">
            <p className="text-sm">
              Did airline provide reason: {(disruptionDetails as any).airlineProvidedReason || "Not specified"}
            </p>
            {claim.reasongivenbyairline && (
              <div className="p-2 bg-gray-50 rounded">
                <p className="text-sm"><strong>Reason:</strong> {claim.reasongivenbyairline}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DisruptionDetailsCard;
