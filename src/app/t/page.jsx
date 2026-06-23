"use client";
import React, { useState } from "react";

// ডেমো ডাটা অ্যারে
const demoBookings = [
  {
    "_id": "booking_001",
    "propertyId": "property_001",
    "propertyTitle": "Sunrise residency",
    "tenantId": "user_001",
    "tenantName": "Toufik Hossain",
    "tenantEmail": "toufik@gmail.com",
    "ownerId": "user_002",
    "ownerName": "Tariqul Islam",
    "ownerEmail": "tariq@gmail.com",
    "moveInDate": "12 Jun 2026",
    "contactNumber": "01914975286",
    "notes": "Need parking facility",
    "amount": 18000,
    "bookingStatus": "Approved", 
    "paymentStatus": "Paid",     
    "transactionId": "txn_123456",
    "createdAt": "2026-08-10"
  },
  {
    "_id": "booking_002",
    "propertyId": "property_002",
    "propertyTitle": "Lakeview villa",
    "tenantId": "user_001",
    "tenantName": "Toufik Hossain",
    "amount": 45000,
    "moveInDate": "5 Jun 2026",
    "bookingStatus": "Pending",
    "paymentStatus": "Paid",
    "createdAt": "2026-08-11"
  },
  {
    "_id": "booking_003",
    "propertyId": "property_003",
    "propertyTitle": "Cozy studio loft",
    "tenantId": "user_001",
    "tenantName": "Toufik Hossain",
    "amount": 95000,
    "moveInDate": "28 May 2026",
    "bookingStatus": "Rejected",
    "paymentStatus": "Refunded",
    "createdAt": "2026-08-12"
  }
];

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState(demoBookings);

  // Booking Status কালার স্কিম
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

  // Payment Status কালার স্কিম
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

  return (
    <div className="p-6 md:p-10 min-h-screen bg-black text-white space-y-8">
      {/* হেডার টাইটেল */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
          My bookings
        </h1>
      </div>

      {/* রেসপনসিভ কন্টেইনার এবং মেইন রাউন্ডেড বর্ডার */}
      <div className="w-full overflow-x-auto border border-zinc-900 rounded-2xl bg-[#030704] shadow-2xl">
        <div className="min-w-[850px] w-full">
          
          {/* সুন্দর গ্রিড হেডার (বর্ডার-বটম এবং স্পেসিং সহ) */}
          <div className="grid grid-cols-5 gap-4 px-6 py-4 text-zinc-500 font-semibold text-xs uppercase tracking-wider border-b border-zinc-900 bg-zinc-900/10">
            <div>Property</div>
            <div>Booking date</div>
            <div>Amount paid</div>
            <div>Booking</div>
            <div>Payment</div>
          </div>

          {/* গ্রিড বডি কন্টেন্ট */}
          <div className="divide-y divide-zinc-900/40">
            {bookings.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 font-medium text-sm">
                No bookings found.
              </div>
            ) : (
              bookings.map((booking) => (
                <div 
                  key={booking._id} 
                  className="grid grid-cols-5 gap-4 px-6 py-5 items-center hover:bg-zinc-900/20 transition-all duration-200"
                >
                  {/* প্রপার্টি নাম */}
                  <div className="font-bold text-zinc-100 text-base tracking-tight truncate">
                    {booking.propertyTitle}
                  </div>
                  
                  {/* বুকিং ডেট */}
                  <div className="text-zinc-400 font-medium text-sm">
                    {booking.moveInDate}
                  </div>
                  
                  {/* অ্যামাউন্ট */}
                  <div className="font-bold text-zinc-200 text-sm tracking-wide">
                    Tk {booking.amount?.toLocaleString()}
                  </div>
                  
                  {/* বুকিং স্ট্যাটাস */}
                  <div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize inline-flex items-center justify-center min-w-[85px] h-7 border border-white/[0.02] ${getBookingStatusStyles(booking.bookingStatus)}`}>
                      {booking.bookingStatus}
                    </span>
                  </div>
                  
                  {/* পেমেন্ট স্ট্যাটাস */}
                  <div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize inline-flex items-center justify-center min-w-[75px] h-7 border border-white/[0.02] ${getPaymentStatusStyles(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}