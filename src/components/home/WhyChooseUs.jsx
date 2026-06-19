"use client";
import React from "react";
import { motion } from "motion/react";
// HeroUI v3 কম্পোজেবল ইম্পোর্ট
import { Card } from "@heroui/react";
// Gravity UI Icons (ডিজাইন অনুযায়ী ম্যাচিং আইকন)
import { ShieldCheck, CardCreditHardcopy, PersonHeadphones } from "@gravity-ui/icons";

export default function WhyChooseUs() {
  
  // image_63f40c.png এর কন্টেন্ট অনুযায়ী ডেটা স্ট্রাকচার
  const features = [
    {
      id: 1,
      title: "Verified owners",
      description: "Every listing is checked by our team before it goes live.",
      icon: <ShieldCheck size={20} className="text-[#5dcaa5]" />,
    },
    {
      id: 2,
      title: "Secure payments",
      description: "Pay booking fees safely online through Stripe.",
      icon: <CardCreditHardcopy size={20} className="text-[#5dcaa5]" />,
    },
    {
      id: 3,
      title: "Always supported",
      description: "Our team helps tenants and owners at every step.",
      icon: <PersonHeadphones size={20} className="text-[#5dcaa5]" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="w-full bg-[#020503] py-24 px-4 relative overflow-hidden">
      
      {/* এক্সট্রা ডিজাইন টাচ: ব্যাকগ্রাউন্ডে মৃদু এমারেল্ড গ্লো */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#5dcaa5]/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-left space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Why choose us
          </h2>
          <p className="text-zinc-500 text-sm font-medium">
            Our commitments to making your rental experience smooth and secure
          </p>
        </div>

        {/* Grid Layout - কার্ডের রেস্পন্সিভনেস এবং গ্যাপ একদম পারফেক্ট রাখা হয়েছে */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="w-full"
            >
              {/* HeroUI v3 Composable Card - থিম কালার অনুযায়ী রি-ডিজাইন করা */}
              <Card className="bg-[#0a140f]/40 backdrop-blur-md border border-[#5dcaa5]/15 p-6 rounded-2xl flex flex-col justify-start items-flex-start text-left space-y-5 h-[200px] hover:border-[#5dcaa5]/30 hover:shadow-[0_0_30px_rgba(93,202,165,0.08)] transition-all duration-300 group">
                
                {/* Icon Wrapper - image_63f40c.png এর মতো সার্কুলার ব্যাকগ্রাউন্ড তবে থিম কালার শেডে */}
                <div className="w-10 h-10 bg-[#0a1a12] border border-[#5dcaa5]/20 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>

                {/* Content Area */}
                <div className="space-y-1.5">
                  <h3 className="font-bold text-lg text-white group-hover:text-[#5dcaa5] transition-colors tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400 text-sm font-normal leading-relaxed">
                    {feature.description}
                  </p>
                </div>

              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}