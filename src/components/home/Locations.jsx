"use client";
import React from "react";
import { motion } from "motion/react";
// HeroUI v3 কম্পোজেবল ইম্পোর্ট
import { Card } from "@heroui/react";
// Gravity UI Icons লোকেশন আইকনের জন্য
import { Pin } from "@gravity-ui/icons";

export default function Locations() {
  
  // image_589683.png এর হুবহু ডেটা এবং আইকন অ্যাড করা হয়েছে
  const locations = [
    {
      id: 1,
      name: "Dhaka",
      count: "120 properties",
      icon: <Pin size={24} />,
    },
    {
      id: 2,
      name: "Chattogram",
      count: "64 properties",
      icon: <Pin size={24} />,
    },
    {
      id: 3,
      name: "Sylhet",
      count: "38 properties",
      icon: <Pin size={24} />,
    },
    {
      id: 4,
      name: "Khulna",
      count: "29 properties",
      icon: <Pin size={24} />,
    },
  ];

  // গ্রিড অ্যানিমেশনের জন্য ভ্যারিয়েন্ট
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    // সেকশন ব্যাকগ্রাউন্ড সম্পূর্ণ পিওর ব্ল্যাক (bg-black)
    <section className="w-full bg-black pb-15 px-4 relative">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Title Section */}
        <div className="text-left">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Top locations
          </h2>
        </div>

        {/* Grid Layout - ৪টি কার্ডের জন্য রেস্পন্সিভ গ্রিড */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {locations.map((location) => (
            <motion.div 
              key={location.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="w-full"
            >
              {/* HeroUI v3 Card - প্যাডিং কমিয়ে p-6 করা হয়েছে (আগের কার্ডগুলোর মতো) */}
              <Card 
                shadow="none"
                style={{ backgroundColor: "#060807" }}
                className="border border-zinc-900/80 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 h-[160px] hover:border-[#5dcaa5]/30 transition-all duration-300 group cursor-pointer"
              >
                
                {/* Location Icon - হোভারে ব্র্যান্ড গ্রিন কালার হবে */}
                <div className="text-zinc-500 group-hover:text-[#5dcaa5] transition-colors duration-300">
                  {location.icon}
                </div>

                {/* Content Area */}
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-white tracking-tight">
                    {location.name}
                  </h3>
                  <p className="text-zinc-500 text-sm font-medium">
                    {location.count}
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