"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Gravity UI Icons 
import { ArrowRightFromSquare, Bars, Xmark } from "@gravity-ui/icons";
import { signOut, useSession } from "@/lib/auth-client";
import Image from "next/image";

export default function AppNavbar() {
  const { data: session } = useSession();
  const user = session?.user;
// console.log("Navbar session:", user);
  const handlesLogOut = async () => {
    await signOut();
  };

  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeClass = (path) => pathname === path
    ? "text-[#5dcaa5] font-semibold border-b-2 border-[#5dcaa5] pb-1 transition-all duration-300"
    : "text-zinc-400 hover:text-white transition-colors pb-1";

  return (
    <nav className="w-full bg-black/90 backdrop-blur-md border-b border-[#5dcaa5]/10 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0a1a12] border border-[#5dcaa5]/30 rounded-lg flex items-center justify-center text-[#5dcaa5] font-bold text-lg shadow-sm">
              H
            </div>
            <p className="font-bold text-xl tracking-tight text-white">HavenFlow</p>
          </div>

          {/* Desktop Navigation Links */}
          {/* 💡 ইউজার লগইন থাকলে Dashboard লিংকটি সরাসরি এখানে অন্য লিংকগুলোর পাশে দেখাবে */}
          <div className="hidden sm:flex items-center gap-8">
            <Link href="/home" className={activeClass("/home")}>Home</Link>
            <Link href="/home/allProperties" className={activeClass("/home/allProperties")}>All Properties</Link>
            {user && (
              <Link href={`/deshboard/${user.role || "tenant"}`} className={activeClass(`/deshboard/${user.role || "tenant"}`)}>
                Dashboard
              </Link>
            )}
          </div>

          {/* Right Action Controls */}
          {/* 💡 ড্রপডাউন ডিলিট করে এখানে ইমেজ এবং লগআউট বাটন পাশাপাশি রাখা হয়েছে */}
          <div className="hidden sm:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-sm text-zinc-300">Hi, {user.name.split(" ")[0]}!</div>
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-cyan-400/40">
                  {user.image ? (
                    // image থাকলে → image দেখাবে
                    <Image
                      src={user.image}
                      alt={user.name}
                      fill
                      sizes="36px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    // image না থাকলে → নামের প্রথম অক্ষর দেখাবে
                    <div className="flex h-full w-full items-center justify-center bg-cyan-500/10 text-sm font-bold text-cyan-300">
                      {user.name?.[0]?.toUpperCase() || "?"}
                    </div>
                  )}
                </div>

                {/* Log Out Button */}
                <button
                  onClick={handlesLogOut}
                  className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-medium text-sm transition-colors bg-red-500/10 hover:bg-red-500/20 px-3 py-1.5 rounded-full"
                >
                  <ArrowRightFromSquare size={14} /> Log Out
                </button>
              </div>
            ) : (
              <>
                <Link href="/home/login" className="text-[#5dcaa5] font-semibold hover:bg-[#5dcaa5]/10 transition-colors px-3 py-1 rounded-full text-sm">
                  Login
                </Link>
                <Link
                  href="/home/register"
                  className="bg-[#0f6e56] text-white font-bold rounded-full hover:bg-[#5dcaa5] hover:text-black shadow-md shadow-emerald-950/20 transition-all duration-200 px-4 py-1.5 text-sm"
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
          <Link href="/home" className={`py-1 ${pathname === "/home" ? "text-[#5dcaa5]" : "text-zinc-300"}`} onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/home/allProperties" className={`py-1 ${pathname === "/home/allProperties" ? "text-[#5dcaa5]" : "text-zinc-300"}`} onClick={() => setIsMenuOpen(false)}>All Properties</Link>

          <div className="border-t border-zinc-900/60 pt-3 flex flex-col gap-2.5">
            {user ? (
              <>
                <Link href={`/deshboard/${user.role || "tenant"}`} className={`py-1 ${pathname.startsWith("/deshboard") ? "text-[#5dcaa5]" : "text-zinc-300"}`} onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <button onClick={handlesLogOut} className="w-full text-left bg-red-500/10 text-red-400 rounded-xl py-2 px-3 text-sm font-medium">Log Out</button>
              </>
            ) : (
              <>
                <Link href="/home/login" className="w-full border border-[#5dcaa5]/30 text-[#5dcaa5] font-bold rounded-xl py-2 text-center text-sm" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link href="/home/register" className="w-full bg-[#0f6e56] text-white font-bold rounded-xl py-2 text-center text-sm" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}