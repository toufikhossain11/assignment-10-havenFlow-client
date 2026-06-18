"use client";
import React from "react";
import Link from "next/link";
import { Envelope, ArrowRight, Handset, MapPin, Globe,LogoFacebook,LogoGithub,LogoLinkedin } from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-950 text-white border-t border-zinc-900 pt-16 pb-8 px-2 transition-all">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16">
          
          {/* Left Column: Brand Bio & Contact Info (Inspired by image_d57260.png) */}
          <div className="md:col-span-4 space-y-5 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center text-cyan-400 font-bold text-xl shadow-lg">
                H
              </div>
              <div>
                <h4 className="font-bold text-lg tracking-tight text-white">HavenFlow</h4>
                <p className="text-xs text-zinc-500">Premium Rental Platform</p>
              </div>
            </div>
            
            <p className="text-zinc-400 text-sm max-w-xs font-normal leading-relaxed">
              Discover, seamlessly book, and securely complete transactions online for top-tier residential properties globally.
            </p>

            {/* Added Contact Information Section */}
            <div className="space-y-2.5 pt-2 text-xs text-zinc-500 font-medium">
              <div className="flex items-center gap-2.5 hover:text-zinc-300 transition-colors">
                <Envelope size={14} className="text-cyan-500" />
                <span>support@havenflow.com</span>
              </div>
              <div className="flex items-center gap-2.5 hover:text-zinc-300 transition-colors">
                <Handset size={14} className="text-cyan-500" />
                <span>+880 1700-000000</span>
              </div>
              <div className="flex items-center gap-2.5 hover:text-zinc-300 transition-colors">
                <MapPin size={14} className="text-cyan-500" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Middle Column 1: Quick Links */}
          <div className="md:col-span-2 space-y-4 text-left">
            <div>
              <h4 className="text-white text-md font-bold tracking-wide">Quick Links</h4>
              <div className="w-8 h-[2px] bg-cyan-400 mt-1.5 rounded-full"></div> {/* Line Inspired by image_d57260.png */}
            </div>
            <ul className="space-y-2.5 text-sm pt-2">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-cyan-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/properties" className="text-zinc-400 hover:text-cyan-400 transition-colors">All Properties</Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-cyan-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-cyan-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Middle Column 2: Dashboard Links */}
          <div className="md:col-span-2 space-y-4 text-left">
            <div>
              <h4 className="text-white text-md font-bold tracking-wide">Workflows</h4>
              <div className="w-8 h-[2px] bg-cyan-400 mt-1.5 rounded-full"></div>
            </div>
            <ul className="space-y-2.5 text-sm pt-2 text-zinc-400">
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Stripe Pay</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">JWT Secured</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">HeroUI v3</li>
              <li className="hover:text-cyan-400 cursor-pointer transition-colors">Privacy Policy</li>
            </ul>
          </div>

          {/* Right Column: Newsletter & Expanded Socials */}
          <div className="md:col-span-4 space-y-5 text-left">
            <div>
              <h4 className="text-white text-md font-bold tracking-wide">Newsletter</h4>
              <div className="w-8 h-[2px] bg-cyan-400 mt-1.5 rounded-full"></div>
            </div>
            
            {/* Minimalist Border-Bottom Input (Inspired by image_d57260.png) */}
            <div className="relative flex items-center border-b border-zinc-800 pb-2 pt-2 max-w-xs group focus-within:border-cyan-400 transition-colors">
              <Envelope size={16} className="text-zinc-500 mr-2" />
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent text-sm text-white placeholder-zinc-600 focus:outline-none w-full"
              />
              <button className="text-zinc-500 hover:text-cyan-400 transition-colors">
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Expanded Circular White Social Links (Inspired by image_d57260.png) */}
            <div className="space-y-2">
              <p className="text-xs text-zinc-500 font-semibold tracking-wider uppercase">Follow Us</p>
              <div className="flex items-center gap-2.5 pt-0.5">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold hover:bg-cyan-400 hover:scale-105 transition-all" aria-label="Facebook">
                    <LogoFacebook size={14} />
                </a>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-black hover:bg-cyan-400 hover:scale-105 transition-all" aria-label="X (Twitter)">
                  𝕏
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold hover:bg-cyan-400 hover:scale-105 transition-all" aria-label="Instagram">
                  ig
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-xs font-bold hover:bg-cyan-400 hover:scale-105 transition-all" aria-label="LinkedIn">
                    <LogoLinkedin size={14} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center text-sm font-bold hover:bg-cyan-400 hover:scale-105 transition-all" aria-label="GitHub">
                    <LogoGithub size={14} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Centered Copyright */}
        <div className="border-t border-zinc-900/60 pt-8 text-center">
          <p className="text-zinc-600 text-xs font-normal">
            &copy; {new Date().getFullYear()} | Made for HavenFlow Platform. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}