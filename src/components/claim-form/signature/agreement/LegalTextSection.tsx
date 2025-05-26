
import React from 'react';

interface LegalTextSectionProps {
  companyAddress: string;
}

const LegalTextSection: React.FC<LegalTextSectionProps> = ({ companyAddress }) => {
  return (
    <div className="legal-text">
      <p className="section-title">ASSIGNMENT OF RIGHTS</p>
      
      <p>
        In accordance with the Privacy Policy and General Terms & Conditions provided by UAB SkyHelp.com, legal entity code 304423851, registered address at {companyAddress} ("SkyHelp"), webpage www.skyhelp.md, which were confirmed by the Client after he/she got acquainted with them, by this assignment form ("Assignment Agreement") the Client assigns to SkyHelp and SkyHelp accepts from the Client full ownership and legal title to monetary claim pursuant to:
      </p>
      
      <ol className="numbered-list">
        <li className="numbered-item">
          Regulation (EC) No 261/2004 of the European Parliament and of the Council of 11 February 2004 establishing common rules on compensation and assistance to passengers in the event of denied boarding and of cancellation or long delay of flights;
        </li>
        <li className="numbered-item">
          Any other international or national regulation applicable in respect of the Client in another country establishing compensation rights for air passengers;
        </li>
        <li className="numbered-item">
          All amounts in relation to the above specified flight as well as taxes, fees, and other monetary compensation;
        </li>
        <li className="numbered-item">
          Any other monetary compensation for lost, delayed, or damaged baggage in connection with the specified flight.
        </li>
      </ol>
      
      <p className="section-title">SCOPE OF ASSIGNMENT</p>
      
      <p>
        The Client understands and acknowledges that by concluding this Assignment Agreement:
      </p>
      
      <ol className="numbered-list">
        <li className="numbered-item">
          The Client cannot engage in any direct contact or receive payment from the flight operating carrier regarding the assigned claim;
        </li>
        <li className="numbered-item">
          SkyHelp becomes the sole legal representative for all matters related to the compensation claim;
        </li>
        <li className="numbered-item">
          All communication with airlines, authorities, and legal proceedings will be conducted exclusively by SkyHelp.
        </li>
      </ol>
      
      <p className="section-title">SERVICES PROVIDED BY SKYHELP</p>
      
      <p>
        If this Assignment Agreement cannot be considered valid in the particular country (jurisdiction) or when the parties agree on the provision of services by a separate agreement, this agreement shall be considered as a contract for services according to which SkyHelp administers Client's Assignment and undertakes to organize and finance the collection of the Assignment and to carry out all actions related thereto including but not limited to:
      </p>
      
      <ol className="numbered-list">
        <li className="numbered-item">
          Instituting legal proceedings in the Client's name before competent courts and authorities;
        </li>
        <li className="numbered-item">
          Organizing and financing legal representation of the Client before all third parties and institutions in relation to the Assignment;
        </li>
        <li className="numbered-item">
          Conducting all communication with the flight operating carrier on all issues regarding the Assignment;
        </li>
        <li className="numbered-item">
          Collecting and receiving payments in relation to the Assignment on the Client's behalf;
        </li>
        <li className="numbered-item">
          Settling with the Client in accordance with the agreed terms and conditions provided on SkyHelp's webpage www.skyhelp.md;
        </li>
        <li className="numbered-item">
          Providing regular updates on the progress of the claim to the Client.
        </li>
      </ol>
      
      <p className="section-title">TERMINATION AND WITHDRAWAL RIGHTS</p>
      
      <p>
        This agreement is terminated immediately if within 14 (fourteen) days since the conclusion of the agreement, the Client submits a withdrawal notice by email to support@skyhelp.md. The right to terminate the agreement on this ground ends prematurely if the agreement is fully performed until the expiration of the above-mentioned time limit.
      </p>
      
      <p>
        The Client confirms that he/she is aware that SkyHelp will commence respective works with the Assignment right after the conclusion of the agreement and that may impact termination of the agreement.
      </p>
      
      <p className="section-title">GOVERNING LAW AND JURISDICTION</p>
      
      <p>
        This Assignment Agreement shall be governed by and construed in accordance with the laws of the Republic of Moldova. Any disputes arising from this agreement shall be subject to the exclusive jurisdiction of the courts of the Republic of Moldova.
      </p>
      
      <p className="section-title">FINAL PROVISIONS</p>
      
      <p>
        Privacy Policy and General Terms & Conditions provided on SkyHelp's webpage www.skyhelp.md apply when signing this Assignment Agreement. The Client confirms having read, understood, and agreed to all terms and conditions.
      </p>
      
      <p>
        By signing below, both parties acknowledge they have read, understood, and agree to be bound by all terms of this Assignment Agreement.
      </p>
    </div>
  );
};

export default LegalTextSection;
