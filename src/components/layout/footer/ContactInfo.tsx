import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
        Contact Us
      </h3>
      <ul className="space-y-3">
        <li className="flex items-start">
          <Mail className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
          <a
            href="mailto:support@skyhelp.md"
            className="text-sm text-white hover:text-primary transition-colors"
          >
            contact@skyhelp.md
          </a>
        </li>
        <li className="flex items-start">
          <Phone className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
          <a
            href="tel:+37379778700"
            className="text-sm text-white hover:text-primary transition-colors"
          >
            +373 79778700
          </a>
        </li>
        <li className="flex items-start">
          <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
          <span className="text-sm text-white">
            Strada Mitropolit Gavriil
            <br />
            Bănulescu-Bodoni 59,
            <br />
            Chișinău
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ContactInfo;
