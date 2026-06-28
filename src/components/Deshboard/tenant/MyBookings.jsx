"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";

export default function MyBookings() {
  const { data: session, isPending: sessionLoading } = useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`http://localhost:5000/bookings?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching bookings:", err);
          setLoading(false);
        });
    } else if (!sessionLoading && !user) {
      setLoading(false);
    }
  }, [user?.email, sessionLoading]);

  const getBookingStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-[#11231d] text-[#42ad89]";
      case "pending":
        return "bg-[#251e16] text-[#cc9c4b]";
      case "rejected":
        return "bg-[#23171a] text-[#b95c64]";
      default:
        return "bg-zinc-800 text-zinc-400";
    }
  };

  const getPaymentStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-[#11231d] text-[#42ad89]";
      case "refunded":
        return "bg-[#251e16] text-[#cc9c4b]";
      case "unpaid":
        return "bg-[#23171a] text-[#b95c64]";
      default:
        return "bg-zinc-800 text-zinc-400";
    }
  };

  if (sessionLoading || loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-zinc-400 gap-2">
        <Loader2 className="animate-spin text-[#42ad89]" size={32} />
        <p className="text-sm font-medium">Loading your bookings...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-400">
        <p className="text-lg">Please login first to view your bookings.</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 min-h-screen bg-black text-white space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
          My bookings
        </h1>
      </div>

      {/* রেসপনসিভ কন্টেইনার */}
      <div className="w-full overflow-x-auto border border-zinc-900 rounded-2xl bg-[#030704] shadow-2xl">
        <table className="w-full min-w-[850px] text-left border-collapse">
          
          {/* টেবিল হেডার */}
          <thead>
            <tr className="border-b border-zinc-900 bg-zinc-900/10 text-zinc-500 font-semibold text-xs uppercase tracking-wider">
              <th className="px-6 py-4 w-[40%]">Property</th>
              <th className="px-6 py-4">Move-in Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Booking</th>
              <th className="px-6 py-4">Payment</th>
            </tr>
          </thead>

          {/* টেবিল বডি */}
          <tbody className="divide-y divide-zinc-900/40">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-12 text-zinc-500 font-medium text-sm">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => {
                const id = booking._id?.$oid || booking._id;
                
                return (
                  <tr 
                    key={id} 
                    className="hover:bg-zinc-900/20 transition-all duration-200 align-middle"
                  >
                    {/* প্রপার্টি ইমেজ ও টাইটেল */}
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4 max-w-full">
                        <div className="w-16 h-12 rounded-lg bg-zinc-900 overflow-hidden flex-shrink-0 border border-zinc-800">
                          {booking.propertyImage ? (
                            <img 
                              src={booking.propertyImage} 
                              alt={booking.propertyTitle} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-zinc-600">🏠</div>
                          )}
                        </div>
                        <div className="font-bold text-zinc-100 text-base tracking-tight truncate max-w-[250px] md:max-w-[350px]">
                          {booking.propertyTitle || "Untitled Property"}
                        </div>
                      </div>
                    </td>
                    
                    {/* মুভ-ইন ডেট */}
                    <td className="px-6 py-5 text-zinc-400 font-medium text-sm">
                      {booking.moveInDate}
                    </td>
                    
                    {/* অ্যামাউন্ট */}
                    <td className="px-6 py-5 font-bold text-zinc-200 text-sm tracking-wide">
                      Tk {booking.bookingAmount?.toLocaleString() || 0}
                    </td>
                    
                    {/* বুকিং স্ট্যাটাস */}
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize inline-flex items-center justify-center min-w-[85px] h-7 border border-white/[0.02] ${getBookingStatusStyles(booking.bookingStatus)}`}>
                        {booking.bookingStatus || "Pending"}
                      </span>
                    </td>
                    
                    {/* পেমেন্ট স্ট্যাটাস */}
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize inline-flex items-center justify-center min-w-[75px] h-7 border border-white/[0.02] ${getPaymentStatusStyles(booking.paymentStatus)}`}>
                        {booking.paymentStatus || "Unpaid"}
                      </span>
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