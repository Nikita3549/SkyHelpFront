import React from 'react';
import { cn } from '@/lib/utils';
import Logo from '@/components/ui-custom/Logo';
import SocialLinks from './footer/SocialLinks';
import NavigationLinks from './footer/NavigationLinks';
import ContactInfo from './footer/ContactInfo';
import AirlinesSection from './footer/AirlinesSection';

export type SocialLink = {
  name: string;
  href: string;
  icon: (props: any) => JSX.Element;
};

const Footer = () => {
  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'How It Works', href: '/#how-it-works' },
      { name: 'Start a Claim', href: '/claim' },
      { name: 'FAQ', href: '/#faq' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Affiliate Program', href: '/affiliate' },
      { name: 'Legal Partnership', href: '/legal-partnership' },
      { name: 'B2B Partnership', href: '/b2b-partnership' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    social: [
      {
        name: 'Twitter',
        href: '#',
        icon: (props: any) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        ),
      },
      {
        name: 'Facebook',
        href: '#',
        icon: (props: any) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: 'Instagram',
        href: '#',
        icon: (props: any) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: 'LinkedIn',
        href: '#',
        icon: (props: any) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
    ],
  };

  // Airlines logos data with local image paths
  const airlines = [
    {
      name: 'Wizz Air',
      imgSrc: '/lovable-uploads/cead91f8-e2d2-4c22-8f59-a23cc2d20312.png',
    },
    {
      name: 'Tarom',
      imgSrc: '/lovable-uploads/4812daa1-9593-4874-ac96-312b7529e017.png',
    },
    {
      name: 'Ryanair',
      imgSrc: '/lovable-uploads/3ff3dd0c-2a3a-4309-9bdb-75f4ca774cd8.png',
    },
    {
      name: 'HiSky',
      imgSrc: '/lovable-uploads/efee1862-31c9-4c95-9cdc-ba830c7a7753.png',
    },
    {
      name: 'Lufthansa',
      imgSrc: '/lovable-uploads/ef9590ec-4acf-45bd-9e4f-26cd3a22c318.png',
    },
    {
      name: 'Austrian Airlines',
      imgSrc: '/lovable-uploads/bd2c2e1e-9cb7-4a31-bb7a-476b91c8f6ce.png',
    },
    {
      name: 'Turkish Airlines',
      imgSrc: '/lovable-uploads/08bca47d-16aa-4482-9a00-3e31d4ca38de.png',
    },
    {
      name: 'Qatar Airways',
      imgSrc: '/lovable-uploads/aafcf716-358e-4c11-90f3-3d6de72ed1bc.png',
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 flex flex-col justify-center align-middle">
      {/* Airlines Logos Section */}
      <AirlinesSection airlines={airlines} />

      <div className="container-custom m-0 min-w-[100vw] bg-[#00122d] relative">
        <img
          src="/landing/ticket/background-earth.svg"
          className="absolute left-0 max-h-[538px] min-w-full object-cover z-[10]"
          alt="Earth background"
        />
        <div className="py-12 md:py-16 relative z-[11]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SocialLinks social={navigation.social} />
            <NavigationLinks title="Navigation" links={navigation.main} />
            <NavigationLinks title="Company" links={navigation.company} />
            <ContactInfo />
          </div>
        </div>

        {/* APRA Section */}
        <div className="py-6 ">
          <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-4">
            <p className="text-sm text-white">
              SkyHelp is a part of the Association of Passenger Rights Advocates
              (APRA) whose mission is to promote and protect passengers' rights
            </p>
          </div>
        </div>

        <div className="py-6 ">
          <p className="text-sm text-white text-center">
            &copy; {new Date().getFullYear()} SkyHelp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
