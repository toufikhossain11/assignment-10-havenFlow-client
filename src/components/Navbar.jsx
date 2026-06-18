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
  
  // একটি কালারফুল (Cyan) আন্ডারলাইন দেওয়ার জন্য একটি কমন ফাংশন তৈরি করা হলো
  const activeClass = (path) => pathname === path 
    ? "text-cyan-400 font-semibold border-b-2 border-cyan-400 pb-1 transition-all duration-300" 
    : "text-zinc-400 hover:text-white transition-colors pb-1";

  return (
    <nav className="w-full bg-black/90 backdrop-blur-md border-b border-zinc-900 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-cyan-400 font-bold text-lg">
              H
            </div>
            <p className="font-bold text-xl tracking-tight text-white">HavenFlow</p>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden sm:flex items-center gap-8">
            <Link href="/" className={activeClass("/")}>Home</Link>
            <Link href="/properties" className={activeClass("/properties")}>All Properties</Link>
          </div>

          {/* Right Action Controls (Colorful Buttons for Auth) */}
          <div className="hidden sm:flex items-center gap-4">
            {user ? (
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name={user.name}
                    size="sm"
                    src={user.photo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat" className="bg-zinc-950 border border-zinc-800 rounded-xl">
                  <DropdownItem key="profile" className="h-14 gap-2 text-white">
                    <p className="font-semibold text-zinc-400">Signed in as</p>
                    <p className="font-semibold text-cyan-400">{user.email}</p>
                  </DropdownItem>
                  <DropdownItem key="dashboard" className="text-zinc-300 hover:text-white">
                    <Link href={`/dashboard/${user.role}`} className="flex items-center gap-2 w-full">
                      <LayoutFooter size={16} /> Dashboard
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={handleLogout} className="text-red-400">
                    <div className="flex items-center gap-2">
                      <ArrowRightFromSquare size={16} /> Log Out
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <>
                <Button as={Link} href="/login" variant="light" className="text-cyan-400 font-semibold hover:bg-zinc-900 transition-colors">
                  Login
                </Button>
                <Button as={Link} href="/register" className="bg-cyan-500 text-black font-bold rounded-medium hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 transition-all">
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Hamburger Menu Icon */}
          <div className="sm:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-white p-2 focus:outline-none"
            >
              {isMenuOpen ? <Xmark size={24} /> : <Bars size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {isMenuOpen && (
        <div className="sm:hidden bg-zinc-950 border-b border-zinc-900 px-4 pt-2 pb-4 space-y-3 flex flex-col">
          <Link href="/" className="text-zinc-300 font-medium py-1 hover:text-cyan-400" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link href="/properties" className="text-zinc-300 font-medium py-1 hover:text-cyan-400" onClick={() => setIsMenuOpen(false)}>All Properties</Link>
          <div className="border-t border-zinc-900 pt-3 flex flex-col gap-2">
            {user ? (
              <>
                <Link href={`/dashboard/${user.role}`} className="text-zinc-300 font-medium py-1" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <Button color="danger" variant="flat" onPress={handleLogout} className="w-full justify-start">Log Out</Button>
              </>
            ) : (
              <>
                <Button as={Link} href="/login" variant="bordered" className="w-full border-cyan-500 text-cyan-400 font-bold" onClick={() => setIsMenuOpen(false)}>Login</Button>
                <Button as={Link} href="/register" className="w-full bg-cyan-500 text-black font-bold" onClick={() => setIsMenuOpen(false)}>Register</Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}