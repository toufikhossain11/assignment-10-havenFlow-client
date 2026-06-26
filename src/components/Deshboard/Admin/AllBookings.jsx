"use client";
import React, { useState, useEffect } from "react";

// আপনি চাইলে এপিআই কল করার সময় এই ফেক ডাটাটুকু ফেলে দিয়ে সার্ভার ডাটা সেট করতে পারবেন
const fakeBookings = [
  {
    id: "1",
    tenantName: "Rafiq Ahmed",
    propertyName: "Sunrise residency",
    ownerName: "Mahmud Rahman",
    amount: 18000,
    status: "Approved",
    date: "12 Jun",
  },
  {
    id: "2",
    tenantName: "Sumaiya Khan",
    propertyName: "Green valley duplex",
    ownerName: "Mahmud Rahman",
    amount: 32000,
    status: "Pending",
    date: "15 Jun",
  },
  {
    id: "3",
    tenantName: "Tanvir Islam",
    propertyName: "Lakeview villa",
    ownerName: "Mahmud Rahman",
    amount: 45000,
    status: "Rejected",
    date: "9 Jun",
  },
  {
    id: "4",
    tenantName: "Nusrat Hossain",
    propertyName: "Cozy studio loft",
    ownerName: "Nadia Islam",
    amount: 95000,
    status: "Approved",
    date: "2 Jun",
  },
];

export default function AllBookings() {
  const [bookings, setBookings] = useState(fakeBookings);
  const [isLoading, setIsLoading] = useState(false);

  // আপনার আগের প্রজেক্টের স্ট্যাটাস ব্যাজ কালার স্কিম (একদম হুবহু ম্যাচ করা হয়েছে)
  const getStatusBadgeStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-[#251e16] text-[#cc9c4b]"; 
      case "approved":
        return "bg-[#11231d] text-[#42ad89]"; 
      case "rejected":
        return "bg-[#27161a] text-[#e05263]"; 
      default:
        return "bg-zinc-800 text-zinc-400";
    }
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-black text-white space-y-6">
      {/* হেডার সেকশন */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
          All bookings
        </h1>
      </div>

      {/* টেবিল কন্টেইনার লেআউট */}
      <div className="w-full overflow-x-auto border border-zinc-900 rounded-2xl bg-[#030704] shadow-2xl">
        <table className="w-full min-w-[800px] text-left border-collapse table-fixed">
          <thead>
            <tr className="border-b border-zinc-900 bg-zinc-900/10 text-zinc-500 font-semibold text-xs uppercase tracking-wider">
              <th className="w-[20%] px-6 py-4 font-semibold">Tenant</th>
              <th className="w-[25%] px-6 py-4 font-semibold">Property</th>
              <th className="w-[20%] px-6 py-4 font-semibold">Owner</th>
              <th className="w-[15%] px-6 py-4 font-semibold">Amount</th>
              <th className="w-[12%] px-6 py-4 font-semibold">Status</th>
              <th className="w-[8%] px-6 py-4 font-semibold text-right pr-6">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-900/40">
            {isLoading ? (
              // লোডিং অ্যানিমেশন স্কেলিটন
              [...Array(3)].map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-3/4"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-2/3"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-2/3"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-1/2"></div></td>
                  <td className="px-6 py-4"><div className="h-6 bg-zinc-800 rounded w-16"></div></td>
                  <td className="px-6 py-4 text-right pr-6"><div className="h-4 bg-zinc-800 rounded w-10 inline-block"></div></td>
                </tr>
              ))
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-zinc-500 font-medium text-sm">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr 
                  key={booking.id} 
                  className="hover:bg-zinc-900/20 transition-all duration-200 text-sm h-[65px]"
                >
                  {/* Tenant Name */}
                  <td className="px-6 py-3 font-bold text-zinc-100 truncate" title={booking.tenantName}>
                    {booking.tenantName}
                  </td>
                  
                  {/* Property Name */}
                  <td className="px-6 py-3 text-[#5dcaa5] font-medium truncate" title={booking.propertyName}>
                    {booking.propertyName}
                  </td>
                  
                  {/* Owner Name */}
                  <td className="px-6 py-3 text-zinc-400 font-medium truncate" title={booking.ownerName}>
                    {booking.ownerName}
                  </td>
                  
                  {/* Amount */}
                  <td className="px-6 py-3 font-semibold text-zinc-200 whitespace-nowrap">
                    Tk {Number(booking.amount).toLocaleString()}
                  </td>
                  
                  {/* Status Badge */}
                  <td className="px-6 py-3 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-md text-xs font-semibold capitalize inline-block ${getStatusBadgeStyles(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-3 text-right pr-6 text-zinc-400 font-medium whitespace-nowrap">
                    {booking.date}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}