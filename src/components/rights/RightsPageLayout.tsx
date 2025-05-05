
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

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
}

const RightsPageLayout = ({
  title,
  description,
  metaTitle,
  metaDescription,
  children,
  relatedLinks = [],
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
            <div className="sticky top-24">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-xl mb-4">Related Information</h3>
                  <ul className="space-y-2">
                    {relatedLinks.map((link, index) => (
                      <li key={index}>
                        <Link 
                          to={link.href} 
                          className="text-primary hover:underline block py-2 border-b border-gray-100 last:border-0"
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
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
