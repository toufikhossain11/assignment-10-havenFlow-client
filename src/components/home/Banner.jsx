"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Select, SelectItem } from "@heroui/react";
// Gravity UI Icons
import { Magnifier, MapPin, House, CurrencyDollar } from "@gravity-ui/icons";

export default function HeroBanner({ onSearch }) {
  const [searchFilters, setSearchFilters] = useState({
    location: "",
    propertyType: "",
    minPrice: "",
    maxPrice: ""
  });

  const propertyTypes = ["Apartment", "House", "Studio", "Villa", "Cabin"];

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black py-20 px-4">
      {/* Background Subtle Mesh Effect */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Glow Effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-zinc-800 rounded-full blur-[120px] opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          <span className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 font-medium text-xs tracking-wider uppercase rounded-full">
            Elevate Your Living Standard
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Find Your Next Luxury <br />
            <span className="text-zinc-500">Rental Escape.</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-xl font-normal leading-relaxed">
            Discover, seamlessly book, and securely complete transactions online for top-tier residential properties globally.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 hidden lg:block h-[420px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
            alt="Modern Property Asset" 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </div>

      {/* Floating Dark Search Bar Container */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-4 left-4 right-4 md:bottom-8 max-w-6xl mx-auto w-full bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-4 md:p-6 shadow-2xl"
      >
        <form onSubmit={(e) => { e.preventDefault(); onSearch(searchFilters); }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          
          <Input
            type="text"
            label="Location"
            placeholder="City, State..."
            labelPlacement="outside"
            classNames={{
              inputWrapper: "bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-white",
              label: "text-zinc-400"
            }}
            startContent={<MapPin size={16} className="text-zinc-500" />}
            onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
          />

          <Select 
            label="Property Type" 
            placeholder="Select Type"
            labelPlacement="outside"
            classNames={{
              trigger: "bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-white",
              label: "text-zinc-400"
            }}
            startContent={<House size={16} className="text-zinc-500" />}
            onChange={(e) => setSearchFilters({...searchFilters, propertyType: e.target.value})}
          >
            {propertyTypes.map((type) => (
              <SelectItem key={type} value={type.toLowerCase()} className="text-black">{type}</SelectItem>
            ))}
          </Select>

          <Input
            type="number"
            label="Min Price ($)"
            placeholder="0"
            labelPlacement="outside"
            classNames={{
              inputWrapper: "bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-white",
              label: "text-zinc-400"
            }}
            startContent={<CurrencyDollar size={16} className="text-zinc-500" />}
            onChange={(e) => setSearchFilters({...searchFilters, minPrice: e.target.value})}
          />

          <Input
            type="number"
            label="Max Price ($)"
            placeholder="10000"
            labelPlacement="outside"
            classNames={{
              inputWrapper: "bg-zinc-900 border-zinc-800 hover:border-zinc-700 text-white",
              label: "text-zinc-400"
            }}
            startContent={<CurrencyDollar size={16} className="text-zinc-500" />}
            onChange={(e) => setSearchFilters({...searchFilters, maxPrice: e.target.value})}
          />

          {/* Accent Button (Electric Cyan/Blue) */}
          <Button type="submit" className="w-full bg-cyan-500 text-black h-12 font-bold rounded-medium hover:bg-cyan-400 shadow-lg shadow-cyan-500/20 transition-all">
            <Magnifier size={18} className="mr-2" /> Explore
          </Button>

        </form>
      </motion.div>
    </div>
  );
}