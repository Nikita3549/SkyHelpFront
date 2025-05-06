
import React from "react";

const Uk261ComparisonTable = () => {
  return (
    <table className="min-w-full bg-white my-6 border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 border border-gray-200">Aspect</th>
          <th className="py-2 px-4 border border-gray-200">EU261</th>
          <th className="py-2 px-4 border border-gray-200">UK261</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="py-2 px-4 border border-gray-200">Applicability</td>
          <td className="py-2 px-4 border border-gray-200">Flights departing from EU or arriving in EU on EU carriers</td>
          <td className="py-2 px-4 border border-gray-200">Flights departing from UK or arriving in UK on UK/EU carriers</td>
        </tr>
        <tr>
          <td className="py-2 px-4 border border-gray-200">Compensation (short flights)</td>
          <td className="py-2 px-4 border border-gray-200">€250</td>
          <td className="py-2 px-4 border border-gray-200">£220</td>
        </tr>
        <tr>
          <td className="py-2 px-4 border border-gray-200">Enforcement body</td>
          <td className="py-2 px-4 border border-gray-200">National enforcement bodies in each EU country</td>
          <td className="py-2 px-4 border border-gray-200">UK Civil Aviation Authority (CAA)</td>
        </tr>
        <tr>
          <td className="py-2 px-4 border border-gray-200">Time limits</td>
          <td className="py-2 px-4 border border-gray-200">Varies by country (1-10 years)</td>
          <td className="py-2 px-4 border border-gray-200">6 years (5 in Scotland)</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Uk261ComparisonTable;
