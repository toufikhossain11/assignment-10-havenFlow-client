"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from "@heroui/react";
// Gravity UI Icons 
import { LayoutFooter, ArrowRightFromSquare, Bars, Xmark } from "@gravity-ui/icons";

export default function AppNavbar({ user, handleLogout }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // আন্ডারলাইনের জন্য ব্র্যান্ড মিন্ট গ্রিন (#5dcaa5) কালার ব্যবহার করা হয়েছে
  const activeClass = (path) => pathname === path 
    ? "text-[#5dcaa5] font-semibold border-b-2 border-[#5dcaa5] pb-1 transition-all duration-300" 
    : "text-zinc-400 hover:text-white transition-colors pb-1";

  return (
    <nav className="w-full bg-black/90 backdrop-blur-md border-b border-[#5dcaa5]/10 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            {/* লোগো বক্সে মিন্ট গ্রিন অ্যাকসেন্ট */}
            <div className="w-8 h-8 bg-[#0a1a12] border border-[#5dcaa5]/30 rounded-lg flex items-center justify-center text-[#5dcaa5] font-bold text-lg shadow-sm">
              H
            </div>
            <p className="font-bold text-xl tracking-tight text-white">HavenFlow</p>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:flex items-center gap-8">
            <Link href="/" className={activeClass("/")}>Home</Link>
            <Link href="/allProperties" className={activeClass("/properties")}>All Properties</Link>
          </div>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-4">
            {user ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform border-[#5dcaa5]"
                    color="success" // গ্রিন থিমের সাথে ম্যাচিং Avatar বর্ডার
                    name={user.name}
                    size="sm"
                    src={user.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat" className="bg-zinc-950 border border-zinc-900 rounded-xl">
                  <DropdownItem key="profile" className="h-14 gap-2 text-white">
                    <p className="font-semibold text-zinc-500 text-xs uppercase tracking-wider">Signed in as</p>
                    <p className="font-semibold text-[#5dcaa5]">{user.email}</p>
                  </DropdownItem>
                  <DropdownItem key="dashboard" className="text-zinc-300 hover:text-[#5dcaa5] transition-colors">
                    <Link href={`/dashboard/${user.role}`} className="flex items-center gap-2 w-full">
                      <LayoutFooter size={16} /> Dashboard
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={handleLogout} className="text-red-400 hover:bg-red-500/10">
                    <div className="flex items-center gap-2">
                      <ArrowRightFromSquare size={16} /> Log Out
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <>
                {/* লাইট লগইন বাটন */}
                <Link  href="/login" variant="light" className="text-[#5dcaa5] font-semibold hover:bg-[#5dcaa5]/10 transition-colors px-3 py-1 rounded-full">
                  Login
                </Link>
                {/* ব্যানার ও ফুটারের সাথে ম্যাচিং সলিড ডার্ক এমারেল্ড (#0f6e56) রেজিস্টার বাটন */}
                <Link 
                  href="/register" 
                  className="bg-[#0f6e56] text-white font-bold rounded-full hover:bg-[#5dcaa5] hover:text-black shadow-md shadow-emerald-950/20 transition-all duration-200 px-3 py-1"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Menu Icon */}
          <div className="sm:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-white p-2 focus:outline-none hover:text-[#5dcaa5] transition-colors"
            >
              {isMenuOpen ? <Xmark size={24} /> : <Bars size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {isMenuOpen && (
        <div className="sm:hidden bg-[#030705]/95 backdrop-blur-md border-b border-zinc-900 px-4 pt-2 pb-5 space-y-3 flex flex-col transition-all">
          <Link href="/" className={`py-1 ${pathname === "/" ? "text-[#5dcaa5]" : "text-zinc-300"}`} onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/properties" className={`py-1 ${pathname === "/properties" ? "text-[#5dcaa5]" : "text-zinc-300"}`} onClick={() => setIsMenuOpen(false)}>All Properties</Link>
          <div className="border-t border-zinc-900/60 pt-3 flex flex-col gap-2.5">
            {user ? (
              <>
                <Link href={`/dashboard/${user.role}`} className="text-zinc-300 font-medium py-1" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <Link href="/logout" className="w-full justify-start bg-red-500/10 text-red-400 rounded-xl py-1">Log Out</Link>
              </>
            ) : (
              <>
                <Link  href="/login" variant="bordered" className="w-full border-[#5dcaa5]/30 text-[#5dcaa5] font-bold rounded-xl" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link  href="/register" className="w-full bg-[#0f6e56] text-white font-bold rounded-xl" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}