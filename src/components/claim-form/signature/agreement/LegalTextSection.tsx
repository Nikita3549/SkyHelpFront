
import React from 'react';

interface LegalTextSectionProps {
  companyAddress: string;
}

const LegalTextSection: React.FC<LegalTextSectionProps> = ({ companyAddress }) => {
  return (
    <div className="legal-text">
      <p>
        In accordance with the Privacy Policy and General Terms & Conditions provided in UAB SkyHelp.com, legal entity code 304423851, registered address at {companyAddress} ("SkyHelp"), webpage www.skyhelp.md, which were confirmed by the Client after he/she got acquainted with them, by this assignment form ("Assignment Form") the Client assigns to SkyHelp and SkyHelp accepts from the Client full ownership and legal title to monetary claim pursuant to Regulation (EC) No 261/2004 of the European Parliament and of the Council of 11 February 2004 or under any other international or national regulation applicable in respect of the Client in another country establishing common rules on compensation and assistance to passengers in the event of denied boarding and of cancellation or long delay of flights, including all the amounts in relation to the above specified flight as well as taxes and other amounts, when passengers are not able to fly or their flight was disrupted and, any other monetary compensation for lost or damaged baggage ("Assignment").
      </p>
      
      <p>
        The Client understands that by concluding this Assignment Form he cannot engage into any direct contact or receive payment from the flight operating carrier.
      </p>
      
      <p>
        If this Assignment Form cannot be considered valid in the particular country (jurisdiction) or when the parties agree on the provision of services by a separate agreement, this agreement shall be considered as a contract for services according to which SkyHelp administers Client's Assignment and undertakes to organize and finance the collection of the Assignment and to carry out all actions related thereto including but not limited to:
      </p>
      
      <ul className="bullet-list">
        <li className="bullet-item">
          Instituting proceedings in the Client's name;
        </li>
        <li className="bullet-item">
          Organizing and financing legal representation of the Client before all third parties and institutions in relation to the Assignment, conducting communication with the flight operating carrier on all issues regarding the Assignment and carrying out all other related actions;
        </li>
        <li className="bullet-item">
          Collecting and receiving payments in relation to the Assignment on the Client's behalf and settling with the Client in accordance with the agreed terms and conditions provided in SkyHelp's webpage www.skyhelp.md.
        </li>
      </ul>
      
      <p>
        This agreement is terminated immediately if within 14 days since the conclusion of the agreement, the Client submits a withdrawal notice by email support@skyhelp.md. The right to terminate the agreement on this ground ends prematurely if the agreement is fully performed until the expiration of the above-mentioned time limit.
      </p>
      
      <p>
        The Client confirms that he is aware that SkyHelp will commence respective works with the Assignment right after the conclusion of the agreement and that may impact termination of the agreement.
      </p>
      
      <p>
        Privacy Policy and General Terms & Conditions provided in SkyHelp's webpage www.skyhelp.md apply when signing this Assignment Form.
      </p>
    </div>
  );
};

export default LegalTextSection;

