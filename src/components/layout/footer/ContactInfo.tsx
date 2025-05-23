
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactInfo: React.FC = () => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase mb-4">
        Contact Us
      </h3>
      <ul className="space-y-3">
        <li className="flex items-start">
          <Mail className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
          <a
            href="mailto:support@skyhelp.md"
            className="text-sm text-gray-500 hover:text-primary transition-colors"
          >
            support@skyhelp.md
          </a>
        </li>
        <li className="flex items-start">
          <Phone className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
          <a
            href="tel:+37379778700"
            className="text-sm text-gray-500 hover:text-primary transition-colors"
          >
            +373 79778700
          </a>
        </li>
        <li className="flex items-start">
          <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-gray-500">
            bd.mosova 16<br />
            Suite 567<br />
            London, UK
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ContactInfo;
