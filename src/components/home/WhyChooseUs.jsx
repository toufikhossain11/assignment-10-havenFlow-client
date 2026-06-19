"use client";
import React from "react";
import { motion } from "motion/react";
// HeroUI v3 কম্পোজেবল ইম্পোর্ট
import { Card } from "@heroui/react";
// Gravity UI এর সঠিক আইকনগুলো
import { ShieldCheck, Headphones, Compass } from "@gravity-ui/icons";

export default function WhyChooseUs() {
  
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
      icon: <Compass size={20} className="text-[#5dcaa5]" />,
    },
    {
      id: 3,
      title: "Always supported",
      description: "Our team helps tenants and owners at every step.",
      icon: <Headphones size={20} className="text-[#5dcaa5]" />,
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
    // সেকশন ব্যাকগ্রাউন্ড পিওর ব্ল্যাক (bg-black)
    <section className="w-full bg-black pb-15 px-4 relative">
      
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

        {/* Grid Layout */}
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
              {/* Card - এখানে আপনার দেওয়া ইমেজের কালার (#060807) লক করা হয়েছে */}
              <Card 
                shadow="none"
                style={{ backgroundColor: "#060807" }} 
                className="border border-zinc-900/80 p-6 rounded-2xl flex flex-col justify-start items-flex-start text-left space-y-5 h-[200px] hover:border-[#5dcaa5]/30 transition-all duration-300 group"
              >
                
                {/* Icon Wrapper - সার্কেল ব্যাকগ্রাউন্ড কালো রেখে ম্যাচ করা হয়েছে */}
                <div className="w-10 h-10 bg-black border border-zinc-900 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
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