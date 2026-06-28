"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // কোনো ইমেইল ফিল্টার ছাড়া সরাসরি সার্ভার থেকে সব ডাটা নিয়ে আসবে
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching all bookings:", err);
        setIsLoading(false);
      });
  }, []);

  // স্ট্যাটাস ব্যাজ কালার স্কিম
  const getStatusBadgeStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-[#251e16] text-[#cc9c4b]"; 
      case "approved":
        return "bg-[#11231d] text-[#42ad89]"; 
      case "rejected":
        return "bg-[#2c1517] text-[#ef4444]"; // রেড ব্যাকগ্রাউন্ড ও টেক্সট টোন
      default:
        return "bg-zinc-800 text-zinc-400";
    }
  };

  // ডাটাবেজের ISO ডেটকে পঠিত ডেটে (যেমন: 28 Jun) কনভার্ট করার ফাংশন
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
    } catch {
      return dateString;
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
              // লোডিং অ্যানিমেশন স্কেলিটন বা স্পিনার
              <tr>
                <td colSpan="6" className="text-center py-12 text-zinc-400">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin text-[#42ad89]" size={20} />
                    <span className="text-sm font-medium">Fetching bookings from server...</span>
                  </div>
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-zinc-500 font-medium text-sm">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => {
                // MongoDB ও অবজেক্ট আইডি সেইফটি চেক
                const id = booking._id?.$oid || booking._id || booking.id;

                return (
                  <tr 
                    key={id} 
                    className="hover:bg-zinc-900/20 transition-all duration-200 text-sm h-[65px]"
                  >
                    {/* Tenant Name */}
                    <td className="px-6 py-3 font-bold text-zinc-100 truncate" title={booking.tenantName}>
                      {booking.tenantName || "Unknown Tenant"}
                    </td>
                    
                    {/* Property Title */}
                    <td className="px-6 py-3 text-[#5dcaa5] font-medium truncate" title={booking.propertyTitle}>
                      {booking.propertyTitle || "Untitled Property"}
                    </td>
                    
                    {/* Owner Name */}
                    <td className="px-6 py-3 text-zinc-400 font-medium truncate" title={booking.ownerName}>
                      {booking.ownerName || "Unknown Owner"}
                    </td>
                    
                    {/* Booking Amount */}
                    <td className="px-6 py-3 font-semibold text-zinc-200 whitespace-nowrap">
                      Tk {Number(booking.bookingAmount || 0).toLocaleString()}
                    </td>
                    
                    {/* Status Badge */}
                    <td className="px-6 py-3 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-md text-xs font-semibold capitalize inline-block ${getStatusBadgeStyles(booking.bookingStatus)}`}>
                        {booking.bookingStatus || "Pending"}
                      </span>
                    </td>

                    {/* Booking Date */}
                    <td className="px-6 py-3 text-right pr-6 text-zinc-400 font-medium whitespace-nowrap">
                      {formatDate(booking.bookingDate)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}