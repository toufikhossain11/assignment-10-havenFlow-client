"use client";
import React from "react";
import Link from "next/link";
import { Envelope, ArrowRight, Handset, MapPin, LogoFacebook, LogoGithub, LogoLinkedin } from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="w-full bg-[#020503] text-white border-t border-[#5dcaa5]/10 pt-16 pb-6 px-4 relative overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ড গ্লো */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[150px] bg-[#5dcaa5]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 pb-12">
          
          {/* Left Column: Brand Bio & Contact Info */}
          <div className="md:col-span-4 space-y-6 text-left">
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#0a1a12] border border-[#5dcaa5]/30 rounded-xl flex items-center justify-center text-[#5dcaa5] font-extrabold text-xl shadow-lg transition-transform duration-300 group-hover:rotate-6">
                H
              </div>
              <div>
                <h4 className="font-extrabold text-xl tracking-tight text-white">HavenFlow</h4>
                <p className="text-[11px] text-zinc-500 font-medium tracking-wider uppercase">Premium Rental Platform</p>
              </div>
            </div>
            
            <p className="text-zinc-400 text-sm max-w-xs font-normal leading-relaxed">
              Discover, seamlessly book, and securely complete transactions online for top-tier residential properties globally.
            </p>

            {/* কন্টাক্ট ইনফরমেশনের ফন্ট সাইজ text-xs থেকে বাড়িয়ে text-sm (বড়) করা হয়েছে */}
            <div className="space-y-3 pt-2 text-sm text-zinc-400 font-medium">
              <div className="flex items-center gap-3 hover:text-[#5dcaa5] transition-colors group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-900 flex items-center justify-center group-hover:border-[#5dcaa5]/30 transition-colors">
                  <Envelope size={14} className="text-[#5dcaa5]" />
                </div>
                <span>support@havenflow.com</span>
              </div>
              <div className="flex items-center gap-3 hover:text-[#5dcaa5] transition-colors group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-900 flex items-center justify-center group-hover:border-[#5dcaa5]/30 transition-colors">
                  <Handset size={14} className="text-[#5dcaa5]" />
                </div>
                <span>+880 1700-000000</span>
              </div>
              <div className="flex items-center gap-3 hover:text-[#5dcaa5] transition-colors group cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-900 flex items-center justify-center group-hover:border-[#5dcaa5]/30 transition-colors">
                  <MapPin size={14} className="text-[#5dcaa5]" />
                </div>
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Middle Column 1: Quick Links */}
          <div className="md:col-span-2 space-y-4 text-left">
            <div>
              <h4 className="text-white text-sm font-bold tracking-wider uppercase">Quick Links</h4>
              <div className="w-6 h-[2px] bg-[#5dcaa5] mt-2 rounded-full"></div> 
            </div>
            <ul className="space-y-3 text-sm pt-2">
              <li>
                <Link href="/home" className="text-zinc-400 hover:text-[#5dcaa5] inline-flex items-center transition-all duration-200 hover:translate-x-1">Home</Link>
              </li>
              <li>
                <Link href="/properties" className="text-zinc-400 hover:text-[#5dcaa5] inline-flex items-center transition-all duration-200 hover:translate-x-1">All Properties</Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-[#5dcaa5] inline-flex items-center transition-all duration-200 hover:translate-x-1">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-[#5dcaa5] inline-flex items-center transition-all duration-200 hover:translate-x-1">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Middle Column 2: Dashboard Links */}
          <div className="md:col-span-2 space-y-4 text-left">
            <div>
              <h4 className="text-white text-sm font-bold tracking-wider uppercase">Workflows</h4>
              <div className="w-6 h-[2px] bg-[#5dcaa5] mt-2 rounded-full"></div>
            </div>
            <ul className="space-y-3 text-sm pt-2 text-zinc-400">
              <li className="hover:text-[#5dcaa5] cursor-pointer transition-all duration-200 hover:translate-x-1">Stripe Pay</li>
              <li className="hover:text-[#5dcaa5] cursor-pointer transition-all duration-200 hover:translate-x-1">JWT Secured</li>
              <li className="hover:text-[#5dcaa5] cursor-pointer transition-all duration-200 hover:translate-x-1">HeroUI v3</li>
              <li className="hover:text-[#5dcaa5] cursor-pointer transition-all duration-200 hover:translate-x-1">Privacy Policy</li>
            </ul>
          </div>

          {/* Right Column: Newsletter & Expanded Socials */}
          <div className="md:col-span-4 space-y-6 text-left">
            <div>
              <h4 className="text-white text-sm font-bold tracking-wider uppercase">Newsletter</h4>
              <div className="w-6 h-[2px] bg-[#5dcaa5] mt-2 rounded-full"></div>
            </div>
            
            {/* ইনপুট ফিল্ড */}
            <div className="relative flex items-center bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-2.5 max-w-xs group focus-within:border-[#5dcaa5]/40 transition-all duration-300">
              <Envelope size={16} className="text-zinc-600 mr-2.5 group-focus-within:text-[#5dcaa5] transition-colors" />
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-transparent text-sm text-white placeholder-zinc-700 focus:outline-none w-full"
              />
              <button className="w-7 h-7 rounded-lg bg-[#0f6e56] text-white flex items-center justify-center hover:bg-[#5dcaa5] hover:text-black transition-all duration-200">
                <ArrowRight size={14} />
              </button>
            </div>

            {/* সোশ্যাল বাটন সেকশন (আইকন কালার নরমাল অবস্থায় মেইন গ্রিন থাকবে) */}
            <div className="space-y-2.5">
              <p className="text-[11px] text-zinc-600 font-bold tracking-wider uppercase">Follow Our Journey</p>
              <div className="flex items-center gap-2.5">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-zinc-950 text-[#5dcaa5] rounded-xl border border-[#5dcaa5]/20 flex items-center justify-center text-sm hover:bg-[#5dcaa5] hover:text-black hover:border-[#5dcaa5] hover:shadow-[0_0_15px_rgba(93,202,165,0.2)] hover:-translate-y-0.5 transition-all duration-300" aria-label="Facebook">
                    <LogoFacebook size={15} />
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-zinc-950 text-[#5dcaa5] rounded-xl border border-[#5dcaa5]/20 flex items-center justify-center text-sm font-black hover:bg-[#5dcaa5] hover:text-black hover:border-[#5dcaa5] hover:shadow-[0_0_15px_rgba(93,202,165,0.2)] hover:-translate-y-0.5 transition-all duration-300" aria-label="X (Twitter)">
                  𝕏
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-zinc-950 text-[#5dcaa5] rounded-xl border border-[#5dcaa5]/20 flex items-center justify-center text-sm hover:bg-[#5dcaa5] hover:text-black hover:border-[#5dcaa5] hover:shadow-[0_0_15px_rgba(93,202,165,0.2)] hover:-translate-y-0.5 transition-all duration-300" aria-label="LinkedIn">
                    <LogoLinkedin size={15} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-zinc-950 text-[#5dcaa5] rounded-xl border border-[#5dcaa5]/20 flex items-center justify-center text-sm hover:bg-[#5dcaa5] hover:text-black hover:border-[#5dcaa5] hover:shadow-[0_0_15px_rgba(93,202,165,0.2)] hover:-translate-y-0.5 transition-all duration-300" aria-label="GitHub">
                    <LogoGithub size={15} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Centered Copyright - pt-4 এবং pb-0 করে প্যাডিং কমানো হয়েছে */}
        <div className="border-t border-zinc-900/60 pt-4 pb-1 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
          <p className="text-zinc-600 text-xs font-normal">
            &copy; {new Date().getFullYear()} HavenFlow Platform. All Rights Reserved.
          </p>
          <div className="flex gap-5 text-zinc-600 text-xs">
            <span className="hover:text-[#5dcaa5] cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-[#5dcaa5] cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-[#5dcaa5] cursor-pointer transition-colors">Cookies</span>
          </div>
        </div>

      </div>
    </footer>
  );
}