import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Download, Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const sampleBanners = [
  {
    id: 'banner-1',
    name: 'Flight Delays Banner (728x90)',
    description: 'Leaderboard banner for websites and blogs',
    preview: '/lovable-uploads/5f38c0aa-45f7-4d7f-94c8-a9b7889ec866.png',
    code: '<a href="https://skyhelp.com/ref/user123"><img src="https://skyhelp.com/banners/728x90-flight-delays.png" alt="Get flight compensation.svg with SkyHelp" width="728" height="90"/></a>',
  },
  {
    id: 'banner-2',
    name: 'Flight Cancellation Banner (300x250)',
    description: 'Medium rectangle for sidebars',
    preview: '/lovable-uploads/8dc3d82b-1ecd-4560-83cf-8abbcc702f88.png',
    code: '<a href="https://skyhelp.com/ref/user123"><img src="https://skyhelp.com/banners/300x250-cancellation.png" alt="Claim compensation.svg for cancelled flights" width="300" height="250"/></a>',
  },
  {
    id: 'banner-3',
    name: 'SkyHelp Promo (468x60)',
    description: 'Standard banner for header sections',
    preview: '/lovable-uploads/5b13fe1b-e415-4ceb-8e01-454b5a7b81c8.png',
    code: '<a href="https://skyhelp.com/ref/user123"><img src="https://skyhelp.com/banners/468x60-clever-claim.png" alt="SkyHelp - Flight compensation.svg made easy" width="468" height="60"/></a>',
  },
];

const sampleTextContent = [
  {
    id: 'text-1',
    name: 'Blog Post Template',
    description: 'Ready-to-use blog article about flight compensation.svg',
    content: `# How to Get Compensation for Flight Disruptions

Did you know that you could be entitled to up to €600 in compensation for flight delays, cancellations, or overbookings? Under EU Regulation 261/2004, passengers have rights that many airlines don't readily inform them about.

## Your Rights as a Passenger

If your flight was:
- Delayed by more than 3 hours
- Cancelled without sufficient notice
- Overbooked and you were denied boarding

You may be eligible for compensation ranging from €250 to €600, depending on the flight distance.

## How SkyHelp Can Help

Instead of struggling with complex claim forms and airline resistance, let SkyHelp handle everything for you. Their automated system analyzes your case, prepares the necessary documentation, and fights for your rightful compensation.

[Check if you're eligible for compensation](https://skyhelp.com/ref/user123)`,
  },
  {
    id: 'text-2',
    name: 'Email Newsletter Template',
    description: 'Email content to send to your subscribers',
    content: `Subject: Were You on a Delayed or Cancelled Flight? Get Compensated!

Hello [Name],

I wanted to share a valuable resource with you, especially if you've experienced flight disruptions recently or travel frequently.

**Did you know you could be entitled to up to €600 in compensation?**

Many airlines won't tell you this, but under EU regulations, you have rights when your flight is:
• Delayed by more than 3 hours
• Cancelled without sufficient notice
• Overbooked, resulting in denied boarding

I've discovered SkyHelp, a service that handles the entire compensation process for you. Their technology makes claiming easy and maximizes your chances of success.

Check your eligibility here: https://skyhelp.com/ref/user123

Safe travels!

[Your Name]`,
  },
  {
    id: 'text-3',
    name: 'Social Media Posts',
    description: 'Ready-made posts for social media platforms',
    content: `#1: 
✈️ Flight delayed or cancelled? You could be owed up to €600 in compensation! SkyHelp makes it easy to check your eligibility and claim what you're entitled to. No paperwork hassle, just results! #TravelTip #FlightCompensation
🔗 https://skyhelp.com/ref/user123

#2:
Did you know? Airlines won't volunteer to pay you compensation for delays or cancellations. But EU law requires they do! SkyHelp helps you claim what you deserve with minimal effort. Check if your flight qualifies now!
🔗 https://skyhelp.com/ref/user123

#3:
Vacation ruined by flight problems? Get some money back! ✈️💰 You might be entitled to compensation. SkyHelp's service has already helped thousands of travelers get what they deserve. It only takes 3 minutes to check your flight!
🔗 https://skyhelp.com/ref/user123`,
  },
];

const brandAssets = [
  {
    id: 'brand-1',
    name: 'SkyHelp Logo Package',
    description: 'Various formats and sizes of the company logo',
    preview: '/lovable-uploads/8f6afcb7-d3dd-4758-825f-5b1f287ca7d5.png',
  },
  {
    id: 'brand-2',
    name: 'Brand Style Guide',
    description: 'Complete brand guidelines including colors and typography',
    preview: '/lovable-uploads/bf73855a-db1a-427a-a4ec-334b6150eb21.png',
  },
  {
    id: 'brand-3',
    name: 'Social Media Templates',
    description: 'Ready-made templates for Instagram, Facebook, and Twitter',
    preview: '/lovable-uploads/26442131-787a-4059-8398-0aef3dc143ab.png',
  },
];

const PromoMaterialsSection = () => {
  const [activeTab, setActiveTab] = useState('banners');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      title: 'Copied to clipboard!',
      description: 'You can now paste this content where you need it.',
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Promotional Materials
        </h1>
        <p className="text-muted-foreground">
          Marketing assets to help you promote SkyHelp effectively.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="banners">Banners</TabsTrigger>
          <TabsTrigger value="text">Text Content</TabsTrigger>
          <TabsTrigger value="brand">Brand Assets</TabsTrigger>
        </TabsList>

        {/* Banners Tab */}
        <TabsContent value="banners" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleBanners.map((banner) => (
              <Card key={banner.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle className="text-base">{banner.name}</CardTitle>
                  <CardDescription>{banner.description}</CardDescription>
                </CardHeader>
                <div className="border-y px-4 py-3 flex items-center justify-center bg-muted/30">
                  <img
                    src={banner.preview}
                    alt={banner.name}
                    className="max-w-full h-auto"
                  />
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => copyToClipboard(banner.code, banner.id)}
                      variant="outline"
                      className="w-full"
                    >
                      {copiedId === banner.id ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy HTML Code
                        </>
                      )}
                    </Button>
                    <Button variant="secondary" className="w-full">
                      <Download className="mr-2 h-4 w-4" />
                      Download Image
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Text Content Tab */}
        <TabsContent value="text" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sampleTextContent.map((content) => (
              <Card key={content.id}>
                <CardHeader>
                  <CardTitle>{content.name}</CardTitle>
                  <CardDescription>{content.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-md h-64 overflow-auto whitespace-pre-wrap mb-4 text-sm">
                    {content.content}
                  </div>
                  <Button
                    onClick={() => copyToClipboard(content.content, content.id)}
                    className="w-full"
                    variant="outline"
                  >
                    {copiedId === content.id ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Text
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Brand Assets Tab */}
        <TabsContent value="brand" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brandAssets.map((asset) => (
              <Card key={asset.id}>
                <CardHeader>
                  <CardTitle className="text-base">{asset.name}</CardTitle>
                  <CardDescription>{asset.description}</CardDescription>
                </CardHeader>
                <div className="border-y px-4 py-6 flex items-center justify-center bg-muted/30">
                  <img
                    src={asset.preview}
                    alt={asset.name}
                    className="max-w-full h-auto max-h-40"
                  />
                </div>
                <CardContent className="p-4">
                  <Button variant="default" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Assets
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* Color Palette Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  SkyHelp Color Palette
                </CardTitle>
                <CardDescription>
                  Official brand colors for marketing materials
                </CardDescription>
              </CardHeader>
              <div className="px-4 py-4 border-y">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded bg-primary"></div>
                    <div>
                      <p className="text-sm font-medium">Primary</p>
                      <p className="text-xs text-muted-foreground">#9b87f5</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded bg-blue-600"></div>
                    <div>
                      <p className="text-sm font-medium">Secondary</p>
                      <p className="text-xs text-muted-foreground">#2563eb</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded bg-gray-900"></div>
                    <div>
                      <p className="text-sm font-medium">Dark</p>
                      <p className="text-xs text-muted-foreground">#1A1F2C</p>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Color Specs
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromoMaterialsSection;
