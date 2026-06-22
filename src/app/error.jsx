"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
// Lucide Icons থেকে ইমেজ অনুযায়ী আইকনগুলো নেওয়া হয়েছে
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // কনসোলে এররটি লগ করে রাখার জন্য (ডিবাগিং এর সুবিধার্থে)
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-4 text-center select-none">
      <div className="max-w-md mx-auto flex flex-col items-center">
        
        {/* টপ অ্যালার্ট আইকন কন্টেইনার (ইমেজের মতো লালচে ভাব সহ) */}
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
          <AlertTriangle className="text-red-400" size={26} />
        </div>

        {/* মেইন টাইটেল */}
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide mb-2">
          Something went wrong
        </h2>

        {/* সাবটেক্সট */}
        <p className="text-zinc-500 text-sm max-w-xs md:max-w-sm leading-relaxed mb-8">
          An unexpected error occurred while loading this page. Please try again, or head back home.
        </p>

        {/* অ্যাকশন বাটন গ্রুপ */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          
          {/* Try again বাটন (Solid style - পেজ রিসেট করার জন্য) */}
          <Button
            onClick={() => reset()} // Next.js এর বিল্ট-ইন রিসেট ফাংশন
            className="bg-[#46cba1] text-zinc-950 font-bold text-sm px-5 h-11 rounded-xl flex items-center gap-2 transition-transform active:scale-95"
          >
            <RefreshCw size={16} />
            Try again
          </Button>

          {/* Back to home বাটন (Bordered style) */}
          <Button
            as={Link}
            href="/home"
            variant="bordered"
            className="border-zinc-800 bg-transparent text-white font-bold text-sm px-5 h-11 rounded-xl flex items-center gap-2 hover:bg-zinc-900/40 transition-colors"
          >
            <Home size={16} className="text-[#46cba1]" />
            Back to home
          </Button>

        </div>
      </div>
    </div>
  );
}