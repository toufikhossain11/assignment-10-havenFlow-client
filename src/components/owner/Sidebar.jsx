"use client";
import React from "react";
import { Button } from "@heroui/react";
// Gravity Icons
import { 
  LayoutCellsLarge, 
  CirclePlus, 
  House, 
  Calendar, 
  ArrowLeft 
} from "@gravity-ui/icons";

export default function Sidebar({ activeTab, setActiveTab }) {
  // সাইডবার মেনু আইটেম লিস্ট
  const menuItems = [
    { id: "dashboard-home", label: "Dashboard home", icon: <LayoutCellsLarge className="text-xl" /> },
    { id: "add-property", label: "Add property", icon: <CirclePlus className="text-xl" /> },
    { id: "my-properties", label: "My properties", icon: <House className="text-xl" /> },
    { id: "booking-requests", label: "Booking requests", icon: <Calendar className="text-xl" /> },
  ];

  return (
    <aside className="w-[260px] border-r border-zinc-950 p-4 flex flex-col justify-between hidden md:flex shrink-0 min-h-screen bg-black">
      <div className="space-y-6">
        {/* লোগো ব্র্যান্ডিং */}
        <div className="flex items-center gap-2 text-white px-2">
          <div className="w-7 h-7 rounded-lg bg-[#5dcaa5]/10 border border-[#5dcaa5]/20 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-[#5dcaa5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className="font-extrabold text-base tracking-tight">Nivasa</span>
        </div>

        {/* ব্যাক টু হোম বাটন (টেক্সট সাইট text-sm করা হয়েছে) */}
        <Button 
          variant="bordered" 
          className="w-full border-zinc-800 bg-transparent text-white font-semibold text-sm h-10 justify-start gap-2.5 hover:bg-zinc-900/50"
        >
          <ArrowLeft className="text-lg" />
          Back to home
        </Button>

        {/* ওনার ড্যাশবোর্ড নেভিগেশন বাটন্স */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-zinc-600 tracking-wider uppercase px-2 block mb-2">
            Owner dashboard
          </span>
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive 
                      ? "bg-[#46cba1] text-zinc-950" 
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/30"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* সাইডবার ইউজার প্রোফাইল ফুটার */}
      <div className="border-t border-zinc-900 pt-4 flex items-center gap-2.5 px-1">
        <div className="w-8 h-8 rounded-full bg-[#121413] border border-zinc-800 flex items-center justify-center text-[10px] font-bold text-[#46cba1]">
          MR
        </div>
        <span className="text-sm font-bold text-zinc-300 truncate">Mahmud Rahman</span>
      </div>
    </aside>
  );
}