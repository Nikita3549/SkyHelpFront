import React from 'react';
import { Plane } from 'lucide-react';
import HeroTitle from './hero/HeroTitle';
import HeroForm from './hero/HeroForm';
import Texts from '@/components/home/hero/Rate.tsx';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-white to-blue-50 px-4 md:px-8 lg:px-20 z-[1] max-md:top-[-50px]">
      <img
        src="/landing/background-earth.svg"
        className="absolute top-20 left-0 min-h-full max-w-full object-cover z-[10]"
        alt="Earth background"
      />

      <div className="flex justify-between flex-row z-[100] max-md:w-full">
        <div className="w-[50%] h-[586px] min-w-[450px] max-md:w-full max-md:min-w-full max-md:h-full max-md:mr-0 mr-5 flex gap-8 flex-col">
          <Texts />
          <HeroForm />
        </div>

        <div className="hidden md:block w-1/3 h-[650px] border-[8px] border-[#e5e5e5] rounded-full overflow-hidden box-border relative top-[-50px]">
          <img
            src="/landing/img.svg"
            className="w-full h-full object-cover"
            alt="Landing"
          />
        </div>
      </div>

      {/*<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595674617530-78147adbb393?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2670')] bg-cover bg-center opacity-[0.03]"></div>*/}

      {/*<div className="absolute right-0 top-[10%] text-blue-100/20 transform -rotate-12">*/}
      {/*  <Plane size={280} strokeWidth={1} />*/}
      {/*</div>*/}

      {/*<div className="container-custom relative z-10 py-16 md:py-24">*/}
      {/*  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">*/}
      {/*    <HeroTitle />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </section>
  );
};

export default Hero;
