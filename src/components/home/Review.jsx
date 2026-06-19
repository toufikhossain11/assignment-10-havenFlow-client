"use client";
import React, { useEffect } from "react";
import { motion, useAnimationControls } from "motion/react";
// HeroUI v3 কম্পোজেবল ইম্পোর্ট
import { Card, Avatar } from "@heroui/react";
// Gravity UI Icon স্টার (Star) রেটিং এর জন্য
import { Star, StarFill } from "@gravity-ui/icons";

export default function Testimonials() {
  
  // image_6370c8.png এর রিয়েল ডেটা
  const reviews = [
    {
      id: 1,
      name: "Rafiq Ahmed",
      time: "2 weeks ago",
      initials: "RA",
      rating: 5,
      comment: "Booking was smooth and the owner responded quickly to every question.",
    },
    {
      id: 2,
      name: "Sumaiya Khan",
      time: "1 month ago",
      initials: "SK",
      rating: 4,
      comment: "Loved how easy it was to filter by location and price.",
    },
    {
      id: 3,
      name: "Tanvir Islam",
      time: "3 weeks ago",
      initials: "TI",
      rating: 5,
      comment: "The dashboard made tracking my booking status really simple.",
    },
    {
      id: 4,
      name: "Nusrat Hossain",
      time: "5 days ago",
      initials: "NH",
      rating: 4,
      comment: "Customer support helped me resolve a payment issue same day.",
    },
  ];

  // ইনফিনিট অ্যানিমেশন লুপকে নিরবচ্ছিন্ন রাখতে ডেটা ডুপ্লিকেট করা হয়েছে
  const duplicatedReviews = [...reviews, ...reviews];

  // অ্যানিমেশন কন্ট্রোলার হ্যান্ডলার
  const controls = useAnimationControls();

  // কম্পোনেন্ট লোড হওয়ার সাথে সাথে অ্যানিমেশন স্টার্ট করার জন্য
  useEffect(() => {
    controls.start({
      x: [0, "-50%"],
      transition: {
        ease: "linear",
        duration: 25, // স্ক্রোলিং স্পিড
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    // সেকশন ব্যাকগ্রাউন্ড পিওর ব্ল্যাক (bg-black)
    <section className="w-full bg-black pb-15 px-4 overflow-hidden relative">
      
      {/* Header Title Section */}
      <div className="max-w-6xl mx-auto space-y-1.5 mb-14 text-left">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          What tenants say
        </h2>
        <p className="text-zinc-500 text-sm font-medium">
          Real experiences from people who found their ideal home through HavenFlow
        </p>
      </div>

      {/* Infinite Scroll Container (Single Line Layout) */}
      <div className="w-full relative flex items-center overflow-x-hidden">
        
        {/* Framer Motion Marquee Loop */}
        <motion.div 
          className="flex gap-6 whitespace-nowrap min-w-full"
          animate={controls}
          // মাউস হোভার করলে অ্যানিমেশন পুরোপুরি স্টপ (Stop) হবে
          onMouseEnter={() => controls.stop()}
          // মাউস সরিয়ে নিলে অ্যানিমেশন আবার স্টার্ট (Start) হবে
          onMouseLeave={() => {
            controls.start({
              x: [0, "-50%"],
              transition: {
                ease: "linear",
                duration: 25,
                repeat: Infinity,
              },
            });
          }}
          style={{ display: "flex", width: "max-content" }}
        >
          {duplicatedReviews.map((review, index) => (
            <div 
              key={`${review.id}-${index}`} 
              className="w-[350px] sm:w-[400px] flex-shrink-0 whitespace-normal"
            >
              {/* HeroUI v3 Card - কালার কোড হুবহু #060807 এবং বর্ডার সিঙ্কড */}
              <Card 
                shadow="none"
                style={{ backgroundColor: "#060807" }}
                className="border border-zinc-900/80 p-6 rounded-2xl flex flex-col justify-between text-left h-[195px] hover:border-[#5dcaa5]/30 transition-all duration-300"
              >
                
                {/* User Info Header Area */}
                <div className="flex items-center gap-3">
                  <Avatar 
                    name={review.initials} 
                    className="bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold text-sm h-10 w-10"
                  />
                  <div>
                    <h4 className="font-bold text-base text-white tracking-tight hover:text-[#5dcaa5] transition-colors">
                      {review.name}
                    </h4>
                    <p className="text-zinc-600 text-xs font-medium">{review.time}</p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-0.5 pt-1">
                  {[...Array(5)].map((_, idx) => (
                    idx < review.rating ? (
                      <StarFill key={idx} size={14} className="text-amber-500" />
                    ) : (
                      <Star key={idx} size={14} className="text-zinc-700" />
                    )
                  ))}
                </div>

                {/* Testimonial Text Content */}
                <div className="pt-2 flex-grow">
                  <p className="text-zinc-400 text-sm font-normal leading-relaxed">
                    {review.comment}
                  </p>
                </div>

              </Card>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}