"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
// Lucide Icons থেকে ইমেজ অনুযায়ী মানানসই আইকনগুলো নেওয়া হয়েছে
import { Ghost, Home, Building2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-4 text-center select-none">
      <div className="max-w-md mx-auto flex flex-col items-center">
        
        {/* টপ ঘোস্ট (Ghost) আইকন কন্টেইনার */}
        <div className="w-16 h-16 rounded-full bg-[#5dcaa5]/10 border border-[#5dcaa5]/20 flex items-center justify-center mb-6">
          <Ghost className="text-[#5dcaa5]" size={28} />
        </div>

        {/* 404 টেক্সট (ইমেজের মতো কালার) */}
        <h1 className="text-7xl font-extrabold text-[#5dcaa5] tracking-tight mb-4">
          404
        </h1>

        {/* মেইন টাইটেল */}
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide mb-2">
          This page packed up and moved out
        </h2>

        {/* সাবটেক্সট */}
        <p className="text-zinc-500 text-sm max-w-xs md:max-w-sm leading-relaxed mb-8">
          The page your are looking for doesnot exist or may have been removed.
        </p>

        {/* অ্যাকশন বাটন গ্রুপ */}
        <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
          
          <Link
            href="/home"
            className="bg-[#46cba1] text-zinc-950 font-bold text-sm px-5 h-11 rounded-xl flex items-center gap-2 transition-transform active:scale-95"
          >
            <Home size={16} />
            Back to home
          </Link>
          <Link
            href="/deshboard/owner/my-properties" // আপনার প্রজেক্ট অনুযায়ী পাথটি চেঞ্জ করতে পারেন
            className="border-zinc-800 bg-transparent text-white font-bold text-sm px-5 h-11 rounded-xl flex items-center gap-2 hover:bg-zinc-900/40 transition-colors"
          >
            <Building2 size={16} className="text-[#5dcaa5]" />
            Browse properties
          </Link>

        </div>
      </div>
    </div>
  );
}