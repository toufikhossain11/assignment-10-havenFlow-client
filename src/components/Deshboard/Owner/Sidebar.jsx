"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { 
  LayoutDashboard, 
  PlusCircle, 
  Building2, 
  Calendar, 
  ArrowLeft,
  Users,
  CreditCard,
  User,
  Heart
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const role = user?.role?.toLowerCase() || "tenant"; // কোনো রোল না থাকলে ডিফল্ট tenant

  // ১. ওনার (Owner) মেনু আইটেমস — My Profile সহ
  const ownerItems = [
    { label: "Dashboard home", icon: <LayoutDashboard size={20} />, href: "/deshboard/owner" },
    { label: "Add property", icon: <PlusCircle size={20} />, href: "/deshboard/owner/add-property" },
    { label: "My properties", icon: <Building2 size={20} />, href: "/deshboard/owner/my-properties" },
    { label: "Booking requests", icon: <Calendar size={20} />, href: "/deshboard/owner/booking-requests" },
    { label: "My profile", icon: <User size={20} />, href: "/deshboard/owner/my-profile" }, 
  ];

  // ২. অ্যাডমিন (Admin) মেনু আইটেমস
  const adminItems = [
    // { label: "Dashboard home", icon: <LayoutDashboard size={20} />, href: "/deshboard/admin" },
    { label: "All users", icon: <Users size={20} />, href: "/deshboard/admin" },
    { label: "All properties", icon: <Building2 size={20} />, href: "/deshboard/admin/all-properties" },
    { label: "All bookings", icon: <Calendar size={20} />, href: "/deshboard/admin/all-bookings" },
    { label: "Transactions", icon: <CreditCard size={20} />, href: "/deshboard/admin/transactions" },
    { label: "My profile", icon: <User size={20} />, href: "/deshboard/admin/my-profile" },
  ];

  // ৩. টেন্যান্ট (Tenant) মেনু আইটেমস
  const tenantItems = [
    { label: "My Bookings", icon: <LayoutDashboard size={20} />, href: "/deshboard/tenant" },
    { label: "Favorites", icon: <Heart size={20} />, href: "/deshboard/tenant/favorites" },
    { label: "My profile", icon: <User size={20} />, href: "/deshboard/tenant/my-profile" },
  ];

  // কারেন্ট রোল অনুযায়ী কোন মেনু দেখাবে তা নির্ধারণ করা
  let menuItems = tenantItems;
  if (role === "admin") menuItems = adminItems;
  if (role === "owner") menuItems = ownerItems;

  // ইউজারের নামের প্রথম ২ অক্ষরের ইনিশিয়াল জেনারেট করার ফাংশন
  const getUserInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    // এখানে bg-black পরিবর্তন করে bg-[#0a140f] যুক্ত করা হয়েছে
    <aside className="w-[260px] border-r border-zinc-950 p-4 flex flex-col justify-between hidden md:flex shrink-0 min-h-screen bg-[#0a140f]">
      <div className="space-y-6">
        {/* লোগো ব্র্যান্ডিং */}
        {/* <div className="flex items-center gap-2 text-white px-2">
          <div className="w-7 h-7 rounded-lg bg-[#5dcaa5]/10 border border-[#5dcaa5]/20 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-[#5dcaa5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <span className="font-extrabold text-base tracking-tight">Nivasa</span>
        </div> */}
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0a1a12] border border-[#5dcaa5]/30 rounded-lg flex items-center justify-center text-[#5dcaa5] font-bold text-lg shadow-sm">
              H
            </div>
            <p className="font-bold text-xl tracking-tight text-white">HavenFlow</p>
          </div>

        {/* ব্যাক টু হোম বাটন */}
        <Link 
          href="/home"
          className="px-3 rounded-3xl w-full flex items-center gap-2.5 border-zinc-800 bg-transparent text-white font-semibold text-sm h-10 justify-start hover:bg-zinc-900/50"
        >
          <ArrowLeft size={18} />
          Back to home
        </Link>

        {/* ডাইনামিক ড্যাশবোর্ড নেভিগেশন */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-zinc-600 tracking-wider uppercase px-2 block mb-2">
            {role} dashboard
          </span>
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href; 
              
              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className="w-full block"
                >
                  <button
                    className={`w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-bold transition-all duration-200 ${
                      isActive 
                        ? "bg-[#46cba1] text-zinc-950 shadow-lg shadow-[#46cba1]/10" 
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900/30"
                    }`}
                  >
                    <span className={isActive ? "text-zinc-950" : "text-zinc-400"}>
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ডাইনামিক সাইডবার ইউজার প্রোফাইল ফুটার */}
      <div className="border-t border-zinc-900 pt-4 flex items-center gap-2.5 px-1">
        <div className="w-8 h-8 rounded-full bg-[#121413] border border-zinc-800 flex items-center justify-center text-[10px] font-bold text-[#46cba1] uppercase">
          {getUserInitials(user?.name)}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-bold text-zinc-300 truncate">
            {user?.name || "Guest User"}
          </span>
          <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
            {role}
          </span>
        </div>
      </div>
    </aside>
  );
}