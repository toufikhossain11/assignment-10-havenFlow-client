"use client";
import React from "react";

export default function LoadingDetails() {
  return (
    <div className="w-full min-h-screen bg-[#040605] text-white p-4 md:p-6 flex justify-center items-start">
      <div className="w-full max-w-7xl space-y-8 animate-pulse">
        
        {/* ─── ওপরের মূল সেকশন (ইমেজ এবং ডিটেইলস গ্রিড) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start bg-[#040605]">
          
          {/* বাম কলাম: ইমেজ স্কেলিটন */}
          <div className="w-full h-[350px] md:h-[500px] bg-zinc-900/60 border border-zinc-900 rounded-2xl" />

          {/* ডান কলাম: ডিটেইলস স্কেলিটন */}
          <div className="flex flex-col justify-start space-y-5 py-1">
            
            <div className="space-y-4">
              {/* টাইটেল এবং হার্ট বাটন */}
              <div className="flex justify-between items-start w-full">
                <div className="space-y-2 w-3/4">
                  <div className="h-10 md:h-12 bg-zinc-900 rounded-xl w-full" />
                  <div className="h-5 bg-zinc-900/70 rounded-lg w-1/2" />
                </div>
                <div className="h-12 w-12 bg-zinc-900 rounded-xl min-w-12" />
              </div>

              {/* প্রাইস ট্যাগ */}
              <div className="h-8 bg-zinc-900 rounded-xl w-1/3" />

              {/* অ্যামেনিটিজ ব্যাজ স্কেলিটন */}
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-9 w-24 bg-zinc-900/80 border border-zinc-900/50 rounded-xl" />
                ))}
              </div>

              {/* ডেসক্রিপশন লাইন্স */}
              <div className="space-y-2.5 pt-2">
                <div className="h-4 bg-zinc-900/70 rounded-md w-full" />
                <div className="h-4 bg-zinc-900/70 rounded-md w-full" />
                <div className="h-4 bg-zinc-900/70 rounded-md w-4/5" />
              </div>
            </div>

            {/* বটম সেকশন: ওনার কার্ড ও বুক বাটন */}
            <div className="space-y-4 pt-4">
              {/* ওনার কার্ড */}
              <div className="border border-zinc-900 p-4 rounded-2xl flex items-center justify-between w-full">
                <div className="flex items-center gap-4 w-1/2">
                  <div className="w-12 h-12 rounded-full bg-zinc-900" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-zinc-900 rounded-md w-3/4" />
                    <div className="h-3 bg-zinc-900/60 rounded-md w-1/2" />
                  </div>
                </div>
                <div className="h-10 w-24 bg-zinc-900 rounded-xl" />
              </div>

              {/* বুক বাটন */}
              <div className="w-full h-14 bg-zinc-900/90 border border-zinc-900/50 rounded-2xl" />
            </div>

          </div>
        </div>

        {/* ─── নিচের রিভিউ সেকশন স্কেলিটন ─── */}
        <div className="space-y-6 pt-6 border-t border-zinc-900">
          {/* রাইট এ রিভিউ ফর্ম */}
          <div className="bg-[#050806] border border-zinc-900 p-8 rounded-3xl space-y-6">
            <div className="h-6 bg-zinc-900 rounded-md w-1/4" />
            <div className="space-y-2">
              <div className="h-4 bg-zinc-900/50 rounded-md w-16" />
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-6 w-6 bg-zinc-900 rounded-md" />
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-zinc-900/50 rounded-md w-20" />
              <div className="h-[120px] bg-zinc-900/40 border border-zinc-900 rounded-2xl w-full" />
            </div>
            <div className="h-12 w-36 bg-zinc-900 rounded-xl" />
          </div>

          {/* ইউজার রিভিউ লিস্ট */}
          <div className="space-y-4 px-2">
            <div className="h-5 bg-zinc-900 rounded-md w-32" />
            <div className="p-6 border border-zinc-900 rounded-2xl space-y-3">
              <div className="flex justify-between items-center">
                <div className="space-y-2 w-1/4">
                  <div className="h-4 bg-zinc-900 rounded-md" />
                  <div className="h-3 bg-zinc-900/60 rounded-md w-1/2" />
                </div>
                <div className="h-4 bg-zinc-900/50 rounded-md w-16" />
              </div>
              <div className="h-4 bg-zinc-900/70 rounded-md w-full" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}