import React from 'react';

function Rate() {
  return (
    <div className="flex flex-col max-md:items-center gap-5">
      <div className="flex flex-wrap items-center gap-2 font-sans font-bold text-sm leading-[1.5] tracking-[-0.02em] text-black">
        <p>Excellent</p>
        <img
          src="/landing/rate.svg"
          alt="rate"
          className="h-[1em] inline-block"
        />
        <p className="whitespace-nowrap">2228 reviews on Trustpilot</p>
      </div>

      <h1 className="font-bold text-6xl max-md:text-4xl leading-[112%] tracking-[0em] max-md:text-center text-black">
        Get up to <span className="text-[#3282f7]">€600</span> for your delayed
        flight
      </h1>
      <p className="text-base font-normal leading-[150%] text-[#393939] max-md:text-center">
        No paperwork. No hassle. We handle your flight compensation claim from
        start to finish on a no-win, no-fee basis.
      </p>
      <div className="flex max-md:flex-col gap-3.5">
        <div className="h-6 flex gap-2">
          <img src="/landing/tick.svg" alt="tick" />
          <p className="font-normal text-[16px] leading-[150%] text-black">
            Claim old flights up to 3 years
          </p>
        </div>
        <div className="h-6 flex gap-2">
          <img src="/landing/tick.svg" alt="tick" />
          <p className="font-normal text-[16px] leading-[150%] text-black">
            Quick and free eligibility check
          </p>
        </div>
      </div>
    </div>
  );
}

export default Rate;
