"use client";
import React from "react";
import { motion } from "framer-motion";

export default function LoadingSkeleton() {
  // Framer Motion Variants for Stagger Effect
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="w-full min-h-screen bg-[#040605] text-white p-6 md:p-10 space-y-8 flex flex-col justify-start">
      
      {/* ১. টপ হেডার স্কেলিটন */}
      <div className="max-w-7xl w-full mx-auto text-left space-y-3 animate-pulse">
        <div className="h-8 bg-zinc-900 rounded-lg w-48 md:w-64" />
        <div className="h-4 bg-zinc-900/60 rounded-md w-32" />
      </div>

      {/* ২. বড় সার্চ বার স্কেলিটন (কার্ডগুলোর সমান উইডথ) */}
      <div className="max-w-7xl w-full mx-auto">
        <div className="w-full bg-[#0a140f]/30 backdrop-blur-md border border-[#5dcaa5]/10 rounded-2xl p-5 md:p-6 flex flex-wrap gap-4 items-end animate-pulse">
          <div className="flex-1 min-w-[200px] space-y-2">
            <div className="h-3 bg-zinc-900 rounded w-16" />
            <div className="h-11 bg-zinc-950 border border-zinc-900 rounded-xl w-full" />
          </div>
          <div className="flex-1 min-w-[150px] space-y-2">
            <div className="h-3 bg-zinc-900 rounded w-20" />
            <div className="h-11 bg-zinc-950 border border-zinc-900 rounded-xl w-full" />
          </div>
          <div className="w-24 space-y-2">
            <div className="h-3 bg-zinc-900 rounded w-14" />
            <div className="h-11 bg-zinc-950 border border-zinc-900 rounded-xl w-full" />
          </div>
          <div className="w-24 space-y-2">
            <div className="h-3 bg-zinc-900 rounded w-14" />
            <div className="h-11 bg-zinc-950 border border-zinc-900 rounded-xl w-full" />
          </div>
          <div className="h-11 bg-[#0f6e56]/20 border border-[#0f6e56]/30 rounded-xl w-full md:w-28" />
        </div>
      </div>

      {/* ৩. গ্রিড আকারে ৩টি প্রপার্টি কার্ডের চমৎকার লোডিং স্কেলিটন */}
      <div className="max-w-7xl w-full mx-auto pt-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {[1, 2, 3].map((index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="w-full h-[340px] bg-[#0a140f]/20 backdrop-blur-md border border-zinc-900 rounded-2xl flex flex-col justify-between overflow-hidden p-0"
            >
              {/* ইমেজ কন্টেইনার স্কেলিটন + পালস অ্যানিমেশন */}
              <div className="w-full h-44 bg-zinc-950 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-900/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                {/* সেন্টার আইকন প্লেসহোল্ডার */}
                <div className="w-10 h-10 rounded-xl bg-zinc-900/60 flex items-center justify-center animate-pulse" />
                {/* টপ রাইট ব্যাজ স্কেলিটন */}
                <div className="absolute top-3 right-3 w-16 h-5 bg-zinc-900 rounded-full animate-pulse" />
              </div>

              {/* কনটেন্ট সেকশন স্কেলিটন */}
              <div className="flex-1 flex flex-col justify-between p-4 pt-3 space-y-4 text-left">
                
                {/* টাইটেল এবং লোকেশন */}
                <div className="space-y-2.5 animate-pulse">
                  <div className="h-5 bg-zinc-900 rounded-lg w-[75%]" />
                  <div className="h-3 bg-zinc-900/60 rounded-md w-[45%]" />
                </div>

                {/* বটম ফুটার (প্রাইস এবং বাটন) */}
                <div className="flex justify-between items-center pt-3 border-t border-zinc-900/40 animate-pulse">
                  <div className="space-y-1.5">
                    <div className="h-5 bg-zinc-900 rounded-md w-24" />
                    <div className="h-2 bg-zinc-900/40 rounded w-8" />
                  </div>
                  
                  {/* বাটনের জায়গার স্কেলিটন */}
                  <div className="w-20 h-9 bg-zinc-900 rounded-xl" />
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* গ্লোবাল শিমার অ্যানিমেশন ইফেক্ট এড করার জন্য নিচের ক্লাস্টম CSS টেইলউইন্ডে সাপোর্ট করবে */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>

    </div>
  );
}