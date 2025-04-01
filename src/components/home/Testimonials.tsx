
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Success Stories
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Thousands of passengers have successfully claimed compensation with our help. Here are some of their stories.
          </motion.p>
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={item} className="glass rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 border-2 border-primary/10">
                <AvatarImage src="/lovable-uploads/d64dd295-d77e-402c-9f5e-d9c765ccd0e5.png" alt="Sophie Martinez" />
                <AvatarFallback className="bg-blue-100 text-primary font-medium">SM</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <h4 className="font-medium">Sophie Martinez</h4>
                <p className="text-sm text-gray-500">Berlin to Madrid</p>
              </div>
            </div>
            <p className="text-gray-600">
              "The airline cancelled my flight just a day before departure. I submitted my claim with CleverClaim and received €600 compensation without any hassle. I'm very impressed!"
            </p>
            <div className="mt-4 flex text-primary">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            </div>
          </motion.div>
          
          <motion.div variants={item} className="glass rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 border-2 border-primary/10">
                <AvatarImage src="/lovable-uploads/8dc3d82b-1ecd-4560-83cf-8abbcc702f88.png" alt="James Davis" />
                <AvatarFallback className="bg-blue-100 text-primary font-medium">JD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <h4 className="font-medium">James Davis</h4>
                <p className="text-sm text-gray-500">London to Rome</p>
              </div>
            </div>
            <p className="text-gray-600">
              "My flight was delayed by 4 hours due to a technical issue. CleverClaim handled everything and I received €400 compensation within 6 weeks. Excellent service!"
            </p>
            <div className="mt-4 flex text-primary">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            </div>
          </motion.div>
          
          <motion.div variants={item} className="glass rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <Avatar className="h-12 w-12 border-2 border-primary/10">
                <AvatarImage src="/lovable-uploads/bf73855a-db1a-427a-a4ec-334b6150eb21.png" alt="Alexander Kruger" />
                <AvatarFallback className="bg-blue-100 text-primary font-medium">AK</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <h4 className="font-medium">Alexander Kruger</h4>
                <p className="text-sm text-gray-500">Paris to Stockholm</p>
              </div>
            </div>
            <p className="text-gray-600">
              "I was denied boarding due to overbooking. The airline initially refused my claim, but CleverClaim managed to get me €400 in compensation after appealing. Great persistence!"
            </p>
            <div className="mt-4 flex text-primary">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
