import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const reviews = [
  {
    name: 'Sophie Martinez',
    initials: 'SM',
    avatar: '/lovable-uploads/d64dd295-d77e-402c-9f5e-d9c765ccd0e5.png',
    text: "The airline cancelled my flight just a day before departure. I submitted my claim with SkyHelp and received €600 compensation without any hassle. I'm very impressed!",
  },
  {
    name: 'James Davis',
    initials: 'JD',
    avatar: '/lovable-uploads/8dc3d82b-1ecd-4560-83cf-8abbcc702f88.png',
    text: 'My flight was delayed by 4 hours due to a technical issue. SkyHelp handled everything and I received €400 compensation within 6 weeks. Excellent service!',
  },
  {
    name: 'Alexander Kruger',
    initials: 'AK',
    avatar: '/lovable-uploads/bf73855a-db1a-427a-a4ec-334b6150eb21.png',
    text: 'I was denied boarding due to overbooking. The airline initially refused my claim, but SkyHelp managed to get me €400 in compensation after appealing. Great persistence!',
  },
];

const Testimonials = () => {
  // Animation variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const child = container.children[index] as HTMLElement;
    if (child) {
      container.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft / width);
    setActiveIndex(newIndex);
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  return (
    <section className="py-20 px-20 max-md:px-4 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            97% of Travelers Recommend{' '}
            <span className="text-[#3282f7]">Sky</span>
            Help
          </motion.h2>
          {/*<motion.p*/}
          {/*  initial={{ opacity: 0 }}*/}
          {/*  whileInView={{ opacity: 1 }}*/}
          {/*  viewport={{ once: true }}*/}
          {/*  transition={{ duration: 0.5, delay: 0.2 }}*/}
          {/*  className="text-lg text-gray-600"*/}
          {/*>*/}
          {/*  Thousands of passengers have successfully claimed compensation with*/}
          {/*  our help. Here are some of their stories.*/}
          {/*</motion.p>*/}
          <div className="flex flex-col items-center">
            <img
              alt="rate"
              src="/landing/rate.svg"
              className="w-[222px] h-[42px] mb-4"
            />
            <h6 className="font-bold text-[14px] leading-[171%] tracking-[-0.02em] text-center text-black">
              Excellent, Rated 4.9 out of 5. Based on 2228 reviews on Trustpilot
            </h6>
          </div>
        </div>
      </div>
      <div>
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="flex justify-between max-md:overflow-x-auto max-md:flex-nowrap max-md:gap-4 max-md:px-4 max-md:-mx-4 max-md:pb-4 max-md:scroll-smooth max-md:snap-x max-md:snap-mandatory"
        >
          {reviews.map((review, i) => (
            <div
              key={i}
              className="w-1/4 flex-shrink-0 flex flex-col items-center gap-2 justify-center max-md:w-full max-md:min-w-full max-md:snap-center"
            >
              <div className="h-16 w-16 border-2 border-primary/10 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center text-primary font-medium text-xl">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  review.initials
                )}
              </div>
              <h4 className="font-extrabold text-[16px] leading-[150%] tracking-[-0.02em] text-center text-black">
                {review.name}
              </h4>
              <img
                alt="rate"
                src="/landing/rate.svg"
                className="w-[126px] h-[24px]"
              />
              <p className="font-normal text-[14px] leading-[171%] tracking-[-0.02em] text-center text-black px-2">
                “{review.text}”
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-4 md:hidden">
          {reviews.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full ${
                activeIndex === i ? 'bg-blue-600' : 'border border-blue-600'
              }`}
              onClick={() => scrollToIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
