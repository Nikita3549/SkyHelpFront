
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const faqs = [
  {
    question: "How do I get paid?",
    answer: "You can choose your preferred payment method in the Payouts section. We currently support PayPal, bank transfers (IBAN), and Wise/Revolut. Once you've set up your payment details, we'll automatically process payments when you reach the minimum threshold of €50."
  },
  {
    question: "When are payouts made?",
    answer: "Payments are processed on the 15th and last day of each month for all affiliates who have reached the minimum threshold of €50. If your payout date falls on a weekend or holiday, it will be processed on the next business day."
  },
  {
    question: "How many referrals do I need to get paid?",
    answer: "There's no minimum number of referrals required. What matters is reaching the €50 minimum payout threshold. Depending on the compensation amounts, this could be as few as 1-2 successful claims."
  },
  {
    question: "How much commission do I earn per successful claim?",
    answer: "You earn 15% of SkyHelp's service fee for each successful claim that comes through your referral link. The average payout is approximately €25-35 per successful claim, but this can vary depending on the specific flight disruption case."
  },
  {
    question: "How long do my referral cookies last?",
    answer: "Our tracking cookies have a 60-day attribution window. This means if someone clicks your link and then returns to file a claim within 60 days, you'll still receive credit for the referral."
  },
  {
    question: "Can I track which marketing materials are performing best?",
    answer: "Yes! You can create unique tracking links for different marketing materials by adding UTM parameters to your referral link. For example: skyhelp.com/ref/user123?utm_campaign=email. These will show up in your Statistics section."
  },
  {
    question: "What marketing materials can I use?",
    answer: "We provide a variety of banners, text templates, and brand assets that you can use on your website, social media, or email newsletters. All of these can be found in the Promo Materials section of your affiliate dashboard."
  },
  {
    question: "Is there a limit to how much I can earn?",
    answer: "No, there's no cap on your earning potential. The more successful referrals you bring in, the more commission you'll earn."
  },
];

const SupportFaqSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the support request to an API
    toast({
      title: "Support request submitted",
      description: "We'll get back to you as soon as possible.",
    });
    // Reset form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Support & FAQ</h1>
        <p className="text-muted-foreground">
          Find answers to common questions or contact our support team.
        </p>
      </div>
      
      {/* FAQ Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>
            Quick answers to common questions about the affiliate program
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      
      {/* Support Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span>Contact Support</span>
          </CardTitle>
          <CardDescription>
            Need help with something specific? Our affiliate support team is here to help.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSupportSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <Input
                id="subject"
                placeholder="What is your inquiry about?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea
                id="message"
                placeholder="Please describe your issue or question in detail..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="resize-none"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSupportSubmit}>Submit Support Request</Button>
        </CardFooter>
      </Card>
      
      {/* Additional Help Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <h3 className="font-medium mb-1">Affiliate Program Guide</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Complete documentation on how to maximize your affiliate earnings.
              </p>
              <Button variant="outline" size="sm">Download Guide</Button>
            </div>
            
            <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <h3 className="font-medium mb-1">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Step-by-step videos showing how to use the affiliate dashboard.
              </p>
              <Button variant="outline" size="sm">Watch Tutorials</Button>
            </div>
            
            <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <h3 className="font-medium mb-1">Marketing Tips</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Best practices for promoting SkyHelp to your audience.
              </p>
              <Button variant="outline" size="sm">View Tips</Button>
            </div>
            
            <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <h3 className="font-medium mb-1">Affiliate Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Monthly updates with new features, tips, and top performer insights.
              </p>
              <Button variant="outline" size="sm">Subscribe</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportFaqSection;
