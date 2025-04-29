
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Building, Briefcase, Shield, BadgeDollarSign, Link } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const partnerTypes = [
  {
    title: "Travel agencies and tour operators",
    icon: <Plane className="h-10 w-10" />,
    delay: 0.1
  },
  {
    title: "Airline ticket sellers and OTAs",
    icon: <Building className="h-10 w-10" />,
    delay: 0.2
  },
  {
    title: "Business travel platforms",
    icon: <Briefcase className="h-10 w-10" />,
    delay: 0.3
  },
  {
    title: "Travel insurance companies",
    icon: <Shield className="h-10 w-10" />,
    delay: 0.4
  },
  {
    title: "Loyalty programs and cashback platforms",
    icon: <BadgeDollarSign className="h-10 w-10" />,
    delay: 0.5
  },
  {
    title: "Large content or service platforms in travel",
    icon: <Link className="h-10 w-10" />,
    delay: 0.6
  }
];

const galleryImages = [
  {
    src: "/lovable-uploads/03593731-0f02-44d7-8eec-15d47af60109.png",
    alt: "Claims Analytics Dashboard",
    title: "Claims Analytics Dashboard",
    caption: "Detailed Claims Analytics",
    subcaption: "Monitor claim status distribution and compensation by airline"
  },
  {
    src: "/lovable-uploads/ad264c4c-e6f4-4084-b38a-ae8a7a9df2c8.png",
    alt: "Flight Import System",
    title: "Flight Data Import Tool",
    caption: "Flight Data Import Tool",
    subcaption: "Easily upload and analyze thousands of passenger flights to detect eligible claims."
  },
  {
    src: "/lovable-uploads/4620b240-fdab-47bc-9fde-6928b0d952ea.png",
    alt: "Partner Dashboard Analytics",
    title: "Partner Analytics Dashboard",
    caption: "Partner Analytics Dashboard",
    subcaption: "Track your agency's commissions, payouts, and claim activity in real time."
  }
];

const PartnerTypesSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const selectedImageData = selectedImage 
    ? galleryImages.find(img => img.src === selectedImage) 
    : null;
  
  return (
    <section className="py-16 md:py-24 bg-blue-50">
      <div className="container-custom">
        {/* Image Gallery Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Visual Highlights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="aspect-video relative">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-gray-900">{image.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Original Content - Who Can Partner With Us */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Who Can Partner With Us?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            CleverClaim works with a variety of businesses in the travel industry and beyond.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {partnerTypes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.delay }}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-blue-100 rounded-full p-4 mb-4 text-primary">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Image Modal/Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <div className="bg-white rounded-lg overflow-hidden">
            <img 
              src={selectedImage || ''} 
              alt="Enlarged view" 
              className="w-full h-auto"
            />
            {selectedImageData?.caption && (
              <div className="px-6 py-4 text-center">
                <h3 className="font-bold text-lg text-gray-900 mt-2">
                  {selectedImageData.caption}
                </h3>
                {selectedImageData.subcaption && (
                  <p className="text-gray-600 text-sm mt-1">
                    {selectedImageData.subcaption}
                  </p>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PartnerTypesSection;
