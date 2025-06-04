import React from 'react';
import { Helmet } from 'react-helmet';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - SkyHelp</title>
        <meta
          name="description"
          content="Terms and Conditions for SkyHelp flight compensation services"
        />
      </Helmet>

      <div className="container-custom py-16">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">
            Terms and Conditions
          </h1>
          <p className="text-gray-600 mb-8">Last updated: 2025-05-23</p>

          <div className="text-gray-700 leading-relaxed space-y-6">
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              General Terms and Conditions
            </h2>

            <p>
              Unless the context requires otherwise, capitalized terms used in
              these Terms and Conditions ("T&C") have the following meanings:
            </p>

            <p>
              <strong>"Agreement"</strong> means the agreement between the
              Client and SkyHelp SRL (registered in the Republic of Moldova),
              which is concluded when the Client accepts these T&C and signs
              electronically or in writing. Under the Agreement, the Client
              assigns SkyHelp full ownership and legal title to their monetary
              claim pursuant to Regulation (EC) No 261/2004 and any other
              applicable international or national legislation concerning
              passenger rights and compensation.
            </p>

            <p>
              If the assignment is not valid in the jurisdiction or is otherwise
              not enforceable, this Agreement serves as a contract for services
              where SkyHelp manages the Client's claim and organizes and
              finances the necessary procedures.
            </p>

            <p>
              <strong>"Claim"</strong> refers to any monetary claim against an
              airline for compensation due to flight disruption.
            </p>

            <p>
              <strong>"Client"</strong> means any individual who has signed the
              Agreement and seeks compensation through SkyHelp.
            </p>

            <p>
              <strong>"Flight Compensation"</strong> includes any monetary
              amount paid by an airline as compensation, settlement, or
              goodwill.
            </p>

            <p>
              <strong>"Price List"</strong> means the annex to these T&C
              detailing SkyHelp's remuneration.
            </p>

            <p>
              <strong>"Legal Proceedings"</strong> means any court or regulatory
              action initiated to pursue a Claim.
            </p>

            <p>
              <strong>"SkyHelp"</strong> means SkyHelp SRL, registered in
              Moldova.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              1. AGREEMENT
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>
                The Agreement becomes valid upon Client's acceptance of T&C.
              </li>
              <li>
                The Client confirms the right to assign claims and that no
                duplicate agreements exist.
              </li>
              <li>
                The Client provides required information and documents and
                agrees to SkyHelp's management of the Claim.
              </li>
              <li>All compensation must be paid directly to SkyHelp.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              2. CLAIM HANDLING
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>
                Claims may be submitted via the website or other digital
                methods.
              </li>
              <li>SkyHelp evaluates the claim and determines its merit.</li>
              <li>
                If viable, SkyHelp contacts the airline and may initiate legal
                action if necessary.
              </li>
              <li>Legal representatives may act on the Client's behalf.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              3. FINANCIAL TERMS
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>SkyHelp works on a success-based model: no win, no fee.</li>
              <li>
                Upon successful compensation, SkyHelp deducts its fee as per the
                Price List.
              </li>
              <li>
                Bank charges and return costs for incorrect payment info are
                borne by the Client.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              4. CLIENT COOPERATION
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>Clients must provide truthful and complete data.</li>
              <li>
                All related compensation received must be disclosed to SkyHelp.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              5. TERMINATION
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>The Agreement ends upon full performance.</li>
              <li>
                The Client may withdraw within 14 days if no action has been
                taken.
              </li>
              <li>
                SkyHelp may terminate in case of false information or if the
                claim is not viable.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900">
              6. FINAL PROVISIONS
            </h2>

            <ul className="list-disc ml-6 space-y-2">
              <li>
                SkyHelp may update these T&C; the latest version is published on
                the website.
              </li>
              <li>Moldovan law governs the T&C unless otherwise stated.</li>
              <li>
                Disputes are resolved in Moldovan courts unless mandatory law
                states otherwise.
              </li>
            </ul>

            <p className="mt-8">
              By agreeing to these T&C, the Client authorizes SkyHelp to act on
              their behalf in pursuing flight compensation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
