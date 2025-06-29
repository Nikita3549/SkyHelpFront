import React from 'react';

function Ticket() {
  return (
    <>
      <section className="py-16 px-10 bg-white max-md:hidden">
        <div className="rounded-[36px] w-full h-[434px] bg-[#3282f7]">
          <div className="flex flex-col justify-between w-[100px] ml-20 h-[434px] absolute">
            <div className="bg-white w-24 h-24 rounded-full relative top-[-50px]"></div>
            <img
              src="/landing/ticket/line.svg"
              className="absolute ml-[46px] mt-12"
              alt="line"
            />
            <div className="bg-white w-24 h-24 rounded-full relative top-[50px]"></div>
          </div>
          <div className="ml-9 my-auto mt-[72px] absolute">
            <img src="/landing/ticket/qr.svg" alt="qr" />
          </div>
          <img
            src="/landing/ticket/background-earth.svg"
            alt="background"
            className="absolute w-full h-full object-cover left-0"
          />
          <div className="ml-[160px] mr-[160px] w-auto h-full">
            <div className="w-full h-full">
              <div className="flex flex-col align-middle justify-between h-full">
                <div className="flex justify-between gap-8 mt-16">
                  <div className="w-1/4">
                    <h3 className="font-bold text-[36px] leading-[150%] text-white">
                      €600
                    </h3>
                    <p className="font-normal text-[16px] leading-[150%] text-white">
                      Maximum compensation per passenger EU regulation 261/2004
                      entitles you to up to €600 compensation
                    </p>
                  </div>
                  <div className="w-1/4">
                    <h3 className="font-bold text-[36px] leading-[150%] text-white">
                      €2.8M
                    </h3>
                    <p className="font-normal text-[16px] leading-[150%] text-white">
                      Recovered for our customers Helping passengers get the
                      compensation they deserve
                    </p>
                  </div>
                  <div className="w-1/4">
                    <h3 className="font-bold text-[36px] leading-[150%] text-white">
                      AI
                    </h3>
                    <p className="font-normal text-[16px] leading-[150%] text-white">
                      Powered claim processing Advanced algorithms analyze your
                      claim in seconds, not days
                    </p>
                  </div>
                  <div className="w-1/4">
                    <h3 className="font-bold text-[36px] leading-[150%] text-white">
                      94%
                    </h3>
                    <p className="font-normal text-[16px] leading-[150%] text-white">
                      Success rate on valid claims Our expert team handles
                      airline negotiations effectively
                    </p>
                  </div>
                </div>
                <p className="font-bold whitespace-nowrap text-[20px] leading-[240%] tracking-[-0.01em] text-center text-white mb-4 ml-4">
                  Based on our claims data from the past 3 years
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white md:hidden">
        <div className="h-[1120px] bg-[#3282f7] rounded-[36px] relative">
          <div className="absolute w-full h-auto mt-8">
            <img src="/landing/mobile/qr.svg" alt="qr" className="mx-auto" />
          </div>
          <img
            src="/landing/ticket/background-earth.svg"
            alt="background"
            className="absolute w-full h-full object-cover left-0"
          />
          <div className="flex flex-col justify-between w-full max-h-[100vw] h-full absolute rotate-90 overflow-hidden top-[100px]">
            <div className="bg-white w-24 h-24 rounded-full relative top-[-50px]"></div>
            <img
              src="/landing/ticket/line.svg"
              className="absolute h-[100vw] ml-[46px] mt-12"
              alt="line"
            />
            <div className="bg-white w-24 h-24 rounded-full relative top-[50px]"></div>
          </div>
          <div className="px-12 pt-52 flex flex-col justify-center align-middle gap-16">
            <div className="max-w-[350px] w-full mx-auto">
              <h3 className="font-bold text-[36px] leading-[150%] text-white text-center w-full">
                €600
              </h3>
              <p className="font-normal text-[16px] leading-[150%] text-white text-center w-full">
                Maximum compensation per passenger EU regulation 261/2004
                entitles you to up to €600 compensation
              </p>
            </div>
            <div className="max-w-[350px] w-full mx-auto">
              <h3 className="font-bold text-[36px] leading-[150%] text-white text-center w-full">
                €2.8M
              </h3>
              <p className="font-normal text-[16px] leading-[150%] text-white text-center w-full">
                Recovered for our customers Helping passengers get the
                compensation they deserve
              </p>
            </div>
            <div className="max-w-[350px] w-full mx-auto">
              <h3 className="font-bold text-[36px] leading-[150%] text-white text-center w-full">
                AI
              </h3>
              <p className="font-normal text-[16px] leading-[150%] text-white text-center w-full">
                Powered claim processing Advanced algorithms analyze your claim
                in seconds, not days
              </p>
            </div>
            <div className="max-w-[350px] w-full mx-auto">
              <h3 className="font-bold text-[36px] leading-[150%] text-white text-center w-full">
                94%
              </h3>
              <p className="font-normal text-[16px] leading-[150%] text-white text-center w-full">
                Success rate on valid claims Our expert team handles airline
                negotiations effectively
              </p>
            </div>
            <p className="font-bold text-[20px] leading-[240%] tracking-[-0.01em] text-center text-white">
              Based on our claims data from the past 3 years
            </p>
          </div>
        </div>
        {/*<div className="rounded-[36px] w-full h-[434px] bg-[#3282f7]">*/}
        {/*  <div className="flex flex-col justify-between w-[100px] ml-20 h-[434px] absolute">*/}
        {/*    <div className="bg-white w-24 h-24 rounded-full relative top-[-50px]"></div>*/}
        {/*    <img*/}
        {/*      src="/landing/ticket/line.svg"*/}
        {/*      className="absolute ml-[46px] mt-12"*/}
        {/*      alt="line"*/}
        {/*    />*/}
        {/*    <div className="bg-white w-24 h-24 rounded-full relative top-[50px]"></div>*/}
        {/*  </div>*/}

        {/*  <div className="ml-[160px] mr-[160px] w-auto h-full">*/}
        {/*    <div className="w-full h-full">*/}
        {/*      <div className="flex flex-col align-middle justify-between h-full">*/}
        {/*        <div className="flex justify-between gap-8 mt-16">*/}
        {/*          <div className="w-1/4">*/}
        {/*            <h3 className="font-bold text-[36px] leading-[150%] text-white">*/}
        {/*              €600*/}
        {/*            </h3>*/}
        {/*            <p className="font-normal text-[16px] leading-[150%] text-white">*/}
        {/*              Maximum compensation per passenger EU regulation 261/2004*/}
        {/*              entitles you to up to €600 compensation*/}
        {/*            </p>*/}
        {/*          </div>*/}
        {/*          <div className="w-1/4">*/}
        {/*            <h3 className="font-bold text-[36px] leading-[150%] text-white">*/}
        {/*              €2.8M*/}
        {/*            </h3>*/}
        {/*            <p className="font-normal text-[16px] leading-[150%] text-white">*/}
        {/*              Recovered for our customers Helping passengers get the*/}
        {/*              compensation they deserve*/}
        {/*            </p>*/}
        {/*          </div>*/}
        {/*          <div className="w-1/4">*/}
        {/*            <h3 className="font-bold text-[36px] leading-[150%] text-white">*/}
        {/*              AI*/}
        {/*            </h3>*/}
        {/*            <p className="font-normal text-[16px] leading-[150%] text-white">*/}
        {/*              Powered claim processing Advanced algorithms analyze your*/}
        {/*              claim in seconds, not days*/}
        {/*            </p>*/}
        {/*          </div>*/}
        {/*          <div className="w-1/4">*/}
        {/*            <h3 className="font-bold text-[36px] leading-[150%] text-white">*/}
        {/*              94%*/}
        {/*            </h3>*/}
        {/*            <p className="font-normal text-[16px] leading-[150%] text-white">*/}
        {/*              Success rate on valid claims Our expert team handles*/}
        {/*              airline negotiations effectively*/}
        {/*            </p>*/}
        {/*          </div>*/}
        {/*        </div>*/}
        {/*        <p className="font-bold whitespace-nowrap text-[20px] leading-[240%] tracking-[-0.01em] text-center text-white mb-4 ml-4">*/}
        {/*          Based on our claims data from the past 3 years*/}
        {/*        </p>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </section>
    </>
  );
}

export default Ticket;
