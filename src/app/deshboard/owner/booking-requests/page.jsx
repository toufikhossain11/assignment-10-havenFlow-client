"use client";
import React, { useState } from "react";
import { Button } from "@heroui/react";

export default function BookingRequests() {
  const [requests, setRequests] = useState([
    { id: 1, tenant: "Rafiq Ahmed", property: "Sunrise residency", amount: "Tk 18,000", initials: "RA" },
    { id: 2, tenant: "Sumaiya Khan", property: "Green valley duplex", amount: "Tk 32,000", initials: "SK" },
    { id: 3, tenant: "Tanvir Islam", property: "Lakeview villa", amount: "Tk 45,000", initials: "TI" },
  ]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-[#040605] text-white rounded-2xl border border-zinc-900 shadow-2xl my-5">
      {/* হেডার */}
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-zinc-100">Booking requests</h1>
      </div>

      {/* টেবিল কনটেইনার */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-900">
              <th className="py-3 text-zinc-500 font-semibold text-xs w-[30%] pl-2">Tenant</th>
              <th className="py-3 text-zinc-500 font-semibold text-xs w-[30%]">Property</th>
              <th className="py-3 text-zinc-500 font-semibold text-xs w-[20%]">Amount</th>
              <th className="py-3 text-zinc-500 font-semibold text-xs text-right w-[20%] pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id} className="border-b border-zinc-900/50 hover:bg-[#080a09]/50 transition-colors duration-200">
                {/* টেন্যান্ট প্রোফাইল */}
                <td className="py-4 pl-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#111c18] border border-[#1a352a] text-[#46cba1] text-xs font-bold flex items-center justify-center">
                      {req.initials}
                    </div>
                    <span className="text-sm font-bold text-zinc-200">{req.tenant}</span>
                  </div>
                </td>
                
                {/* প্রপার্টি নাম */}
                <td className="py-4 text-sm font-medium text-zinc-400">
                  {req.property}
                </td>
                
                {/* অ্যামাউন্ট */}
                <td className="py-4 text-sm font-bold text-zinc-200">
                  {req.amount}
                </td>
                
                {/* অ্যাকশন বাটন সমূহ (পাশাপাশি ফ্লেক্স এবং সমান সাইজ) */}
                <td className="py-4 text-right pr-2">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      size="sm"
                      className="w-24 h-8 bg-[#46cba1] hover:bg-[#3bb38e] text-zinc-950 font-bold text-xs rounded-lg transition-colors"
                    >
                      Approve
                    </Button>
                    <Button 
                      size="sm"
                      className="w-24 h-8 bg-[#221616] hover:bg-[#2d1b1b] border border-[#3d1e1e] text-[#e55c5c] font-bold text-xs rounded-lg transition-colors"
                    >
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}