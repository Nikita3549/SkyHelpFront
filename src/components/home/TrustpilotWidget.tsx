
import React, { useEffect } from "react";
import { Star, Shield } from "lucide-react";

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement, force?: boolean) => void;
    };
  }
}

const TrustpilotWidget = () => {
  useEffect(() => {
    // Load the Trustpilot script
    const trustpilotScript = document.createElement("script");
    trustpilotScript.src = "//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js";
    trustpilotScript.async = true;
    document.head.appendChild(trustpilotScript);

    // Initialize the widget when the script is loaded
    trustpilotScript.onload = () => {
      if (window.Trustpilot) {
        const trustBoxElement = document.getElementById("trustpilot-widget-box");
        if (trustBoxElement) {
          window.Trustpilot.loadFromElement(trustBoxElement, true);
        }
      }
    };

    return () => {
      // Cleanup on component unmount
      document.head.removeChild(trustpilotScript);
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Trustpilot Rating Badge */}
      <div className="flex items-center bg-[#00b67a] text-white px-4 py-2 rounded-lg shadow-md">
        <Shield className="h-5 w-5 mr-2" />
        <span className="font-medium">Rated 4.8/5 on Trustpilot!</span>
        <div className="flex ml-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-current"
              fill={i < 4 ? "currentColor" : "none"}
            />
          ))}
        </div>
      </div>

      {/* Trustpilot Widget Container */}
      <div 
        id="trustpilot-widget-box"
        className="trustpilot-widget w-full"
        data-locale="en-US"
        data-template-id="53aa8807dec7e10d38f59f32"
        data-businessunit-id="YOUR_BUSINESS_UNIT_ID"
        data-style-height="130px"
        data-style-width="100%"
        data-theme="light"
        data-stars="4,5"
        data-review-languages="en"
      >
        <a 
          href="https://www.trustpilot.com/review/YOUR_DOMAIN" 
          target="_blank" 
          rel="noopener"
          className="text-primary hover:underline"
        >
          Read our reviews on Trustpilot
        </a>
      </div>
      
      {/* Fallback Message */}
      <p className="text-sm text-gray-500 italic">
        Trusted by thousands of passengers across Europe
      </p>
    </div>
  );
};

export default TrustpilotWidget;
