"use client";
import React from "react";
import { motion } from "motion/react";
// HeroUI v3 কম্পোজেবল ইম্পোর্ট
import { Button, Card } from "@heroui/react";
import { House, Smartphone, Compass, MapPin } from "@gravity-ui/icons";

export default function FeaturedProperties() {
  
  const demoProperties = [
    {
      id: 1,
      title: "Sunrise residency",
      type: "Apartment",
      location: "Gulshan, Dhaka",
      price: "Tk 18,000",
      icon: <House size={20} />,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      title: "Lakeview villa",
      type: "Villa",
      location: "Khulshi, Chattogram",
      price: "Tk 45,000",
      icon: <Compass size={20} />,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      title: "Cozy studio loft",
      type: "Studio",
      location: "Zindabazar, Sylhet",
      price: "Tk 9,500",
      icon: <Smartphone size={20} />,
      image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      title: "Green valley duplex",
      type: "Duplex",
      location: "Dhanmondi, Dhaka",
      price: "Tk 32,000",
      icon: <House size={20} />,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      title: "Downtown office suite",
      type: "Office",
      location: "Banani, Dhaka",
      price: "Tk 60,000",
      icon: <Compass size={20} />,
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      title: "Hillside cottage",
      type: "Cottage",
      location: "Sreemangal, Sylhet",
      price: "Tk 14,000",
      icon: <Smartphone size={20} />,
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="w-full bg-black py-20 px-4">
      {/* max-w-7xl এর জায়গায় max-w-6xl বা max-w-5xl করে পুরো সেকশনের উইথ আরেকটু টাইট করা হয়েছে */}
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-left space-y-2">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Featured properties
          </h2>
          <p className="text-zinc-500 text-sm font-medium">
            A few approved listings picked for you
          </p>
        </div>

        {/* Grid Container - gap এবং উইথ অ্যাডজাস্ট করা হয়েছে */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {demoProperties.map((property) => (
            <motion.div 
              key={property.id} 
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full" // ফিক্সড max-w বাদ দিয়ে ফুল উইথ দেওয়া হয়েছে যেন গ্যাপ ফিক্সড থাকে
            >
              
              {/* HeroUI v3 Composable Card */}
              <Card className="bg-[#0a140f]/40 backdrop-blur-md border border-[#5dcaa5]/15 rounded-2xl hover:border-[#5dcaa5]/40 hover:shadow-[0_0_25px_rgba(93,202,165,0.12)] transition-all duration-300 h-[340px] flex flex-col justify-between group overflow-hidden p-0">
                
                {/* Image Container */}
                <div className="w-full h-44 bg-zinc-950 overflow-hidden relative flex items-center justify-center">
                  {property.image ? (
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="text-zinc-600 group-hover:text-[#5dcaa5] transition-colors">
                      {property.icon}
                    </div>
                  )}
                  
                  {/* ইমেজ এর ওপর টাইপ ব্যাজ */}
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-black/70 backdrop-blur-md border border-[#5dcaa5]/30 text-[#5dcaa5] rounded-full text-[10px] font-bold tracking-wide shadow-sm">
                    {property.type}
                  </span>
                </div>

                {/* Content Container */}
                <div className="flex-1 flex flex-col justify-between p-4 pt-3">
                  
                  {/* Title & Location */}
                  <div className="space-y-1 text-left">
                    <h3 className="font-bold text-base md:text-lg text-white group-hover:text-[#5dcaa5] transition-colors tracking-tight line-clamp-1">
                      {property.title}
                    </h3>
                    
                    {/* Location Row */}
                    <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                      <MapPin size={12} className="text-zinc-600 group-hover:text-emerald-500/50 transition-colors" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                  </div>

                  {/* Bottom Footer Section */}
                  <div className="flex justify-between items-center pt-3 border-t border-zinc-900/60">
                    <div className="text-left">
                      <span className="font-extrabold text-white text-base md:text-lg">
                        {property.price}
                      </span>
                      <span className="text-zinc-600 text-xs font-medium">/mo</span>
                    </div>
                    
                    <Button 
                      size="sm"
                      className="bg-[#0f6e56] text-white font-bold px-4 h-9 rounded-xl border border-[#0f6e56] hover:bg-[#5dcaa5] hover:text-black hover:border-[#5dcaa5] transition-all shadow-md"
                    >
                      Details
                    </Button>
                  </div>

                </div>

              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}