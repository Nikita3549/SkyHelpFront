
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, ExternalLink, Check } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type ReferralSectionProps = {
  referralLink: string;
};

const ReferralSection: React.FC<ReferralSectionProps> = ({ referralLink }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "Your referral link is now ready to share.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const testLink = () => {
    window.open(referralLink, "_blank");
    toast({
      title: "Testing referral link",
      description: "Your referral link has been opened in a new tab.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Referral Link</h1>
        <p className="text-muted-foreground">Share your unique link to start earning.</p>
      </div>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Your Unique Referral Link</CardTitle>
          <CardDescription>
            Share this link with potential customers or embed it on your website.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Referral Link with Copy Button */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-grow relative">
              <Input 
                value={referralLink} 
                readOnly 
                className="pr-10" 
              />
            </div>
            <Button 
              onClick={copyToClipboard} 
              className="whitespace-nowrap"
              variant="outline"
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </>
              )}
            </Button>
            <Button variant="outline" onClick={testLink}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Test Link
            </Button>
          </div>
          
          {/* Referral Instructions */}
          <div className="bg-muted rounded-md p-4 space-y-3">
            <h3 className="font-semibold">How to maximize your earnings:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Share your referral link on social media platforms where potential travelers might see it.</li>
              <li>Add the link to your travel blog, website, or newsletter.</li>
              <li>When someone clicks your link and successfully files a claim, you earn a commission.</li>
              <li>Payouts are processed once the threshold of €50 is reached.</li>
            </ol>
          </div>
          
          {/* Performance Tips */}
          <div>
            <h3 className="font-semibold mb-2">Tips for better performance:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary/5 p-4 rounded-md">
                <h4 className="font-medium text-primary mb-1">Be specific</h4>
                <p className="text-sm text-muted-foreground">Explain how CleverClaim helps travelers get compensation for flight disruptions.</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-md">
                <h4 className="font-medium text-primary mb-1">Target travelers</h4>
                <p className="text-sm text-muted-foreground">Focus on people who recently experienced flight issues or travel frequently.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralSection;
