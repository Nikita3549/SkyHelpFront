
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import { CheckIcon, ExternalLinkIcon } from "lucide-react";

interface RightsPageLayoutProps {
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  children: React.ReactNode;
  relatedLinks?: Array<{
    title: string;
    href: string;
  }>;
  tableOfContents?: Array<{
    id: string;
    title: string;
  }>;
}

const RightsPageLayout = ({
  title,
  description,
  metaTitle,
  metaDescription,
  children,
  relatedLinks = [],
  tableOfContents = [],
}: RightsPageLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Helmet>
      
      <div className="py-12 bg-gradient-to-b from-blue-50 to-white">
        <div className="container-custom pt-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
            <p className="text-xl text-gray-600">{description}</p>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {tableOfContents.length > 0 && (
              <div className="bg-blue-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
                <ul className="space-y-2">
                  {tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a 
                        href={`#${item.id}`} 
                        className="text-primary hover:underline flex items-center"
                      >
                        <CheckIcon className="w-4 h-4 mr-2" />
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <article className="prose prose-lg max-w-none">
              {children}
            </article>

            <div className="mt-12">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-2xl font-bold mb-4">Need help with your claim?</h3>
                  <p className="text-gray-600 mb-6">
                    Our team of experts is ready to help you get the compensation you deserve.
                    Start your claim today and let us handle everything for you.
                  </p>
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link to="/claim">Start Your Claim</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-xl mb-4">Related Information</h3>
                  <ul className="space-y-2">
                    {relatedLinks.map((link, index) => (
                      <li key={index}>
                        <Link 
                          to={link.href} 
                          className="text-primary hover:underline block py-2 border-b border-gray-100 last:border-0 flex items-center"
                        >
                          <ExternalLinkIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-xl mb-4">Check If You're Eligible</h3>
                  <p className="text-gray-600 mb-4">
                    Find out in just a few clicks if you're eligible for compensation.
                  </p>
                  <Button asChild className="w-full">
                    <Link to="/claim">Check Your Eligibility</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightsPageLayout;
