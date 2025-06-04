import React from 'react';
import { Plane } from 'lucide-react';
import HeroTitle from './hero/HeroTitle';
import HeroForm from './hero/HeroForm';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-white to-blue-50">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595674617530-78147adbb393?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2670')] bg-cover bg-center opacity-[0.03]"></div>

      <div className="absolute right-0 top-[10%] text-blue-100/20 transform -rotate-12">
        <Plane size={280} strokeWidth={1} />
      </div>

      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <HeroTitle />
          <HeroForm />
        </div>
      </div>
    </section>
  );
};

export default Hero;
