"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion"; 
import { Button } from "@heroui/react";

const propertyTypes = ["All", "Apartment", "Villa", "Studio", "Duplex"];

const SLIDES = [
  {
    img: "https://www.ooba.co.za/app/uploads/2019/08/property-prices.webp",
    label: "Dhaka, Gulshan",
  },
  {
    img: "https://ichef.bbci.co.uk/news/800/cpsprodpb/c9ba/live/da2f28f0-bbd4-11f0-a755-ab35484afe82.jpg.webp",
    label: "Chittagong",
  },
];

export default function HeroBanner() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [selectedType, setSelectedType] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location.trim()) params.set("search", location.trim());
    if (selectedType !== "All") params.set("type", selectedType);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    
    router.push(`/home/allProperties?${params.toString()}`);
  };

  const inputStyle = {
    backgroundColor: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(93,202,165,0.22)",
    borderRadius: "8px",
    padding: "11px 14px",
    color: "#e0f0e8",
    fontSize: "14px",
    outline: "none",
    width: "100%",
    height: "44px",
  };

  const labelStyle = {
    color: "#6fa890",
    fontSize: "10px",
    fontWeight: 700,
    letterSpacing: "0.09em",
  };

  return (
    <section
      style={{
        position: "relative",
        minHeight: "520px",
        borderRadius: "0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* ── Sliding Background ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <img
              src={SLIDES[current].img}
              alt={SLIDES[current].label}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(6,14,10,0.85) 0%, rgba(6,14,10,0.6) 60%, rgba(6,14,10,0.3) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          padding: "44px 40px 38px",
          textAlign: "left", // 👈 টেক্সট বামেই থাকবে
        }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          style={{ marginBottom: "16px" }}
        >
          <span
            style={{
              backgroundColor: "rgba(93,202,165,0.14)",
              color: "#5dcaa5",
              fontSize: "12px",
              fontWeight: 600,
              padding: "5px 14px",
              borderRadius: "999px",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              border: "1px solid rgba(93,202,165,0.32)",
            }}
          >
            ✦ Trusted by 12,000+ tenants
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          style={{
            fontSize: "clamp(32px, 4.5vw, 56px)",
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "12px",
            maxWidth: "520px",
            letterSpacing: "-0.5px",
          }}
        >
          Find a place that feels
          <br />
          <span style={{ color: "#5dcaa5" }}>like home.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          style={{
            color: "rgba(255,255,255,0.62)",
            fontSize: "14px",
            marginBottom: "40px",
            lineHeight: 1.65,
            maxWidth: "380px",
          }}
        >
          Browse verified rentals from trusted owners, book online, and move in with confidence.
        </motion.p>

        {/* ── Search bar — Centered & Wider ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          style={{ 
            display: "flex", 
            justifyContent: "center", // 👈 সার্চবারকে স্ক্রিনের সেন্টারে নিয়ে আসার জন্য
            width: "100%",
            zIndex: 50 
          }} 
        >
          <div
            style={{
              backgroundColor: "rgba(10, 20, 15, 0.85)",
              backdropFilter: "blur(16px)",
              borderRadius: "16px",
              padding: "24px 28px",
              border: "1px solid rgba(93,202,165,0.22)",
              width: "100%",
              maxWidth: "920px", // 👈 সাইজ বড় করা হয়েছে (আগে 780px ছিল)
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-end" }}>
              
              {/* Location */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "2 1 220px" }}>
                <label style={labelStyle}>LOCATION / TITLE</label>
                <input
                  type="text"
                  placeholder="City, area or name"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  style={inputStyle}
                />
              </div>

              {/* Property Type */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", position: "relative", flex: "1 1 160px" }}>
                <label style={labelStyle}>PROPERTY TYPE</label>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                  }}
                  style={{
                    ...inputStyle,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                  }}
                >
                  {selectedType}
                  <span style={{ fontSize: "9px", opacity: 0.5 }}>▼</span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 6px)",
                      left: 0,
                      backgroundColor: "#0a1a12",
                      border: "1px solid rgba(93,202,165,0.3)",
                      borderRadius: "10px",
                      zIndex: 999, // কার্ডের উপরে ড্রপডাউন ভেসে থাকবে
                      width: "100%",
                      boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
                      overflow: "hidden",
                    }}
                  >
                    {propertyTypes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => { setSelectedType(t); setIsOpen(false); }}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "12px 14px",
                          textAlign: "left",
                          color: selectedType === t ? "#5dcaa5" : "#a8d4be",
                          fontSize: "14px",
                          backgroundColor: selectedType === t ? "rgba(93,202,165,0.12)" : "transparent",
                          border: "none",
                          cursor: "pointer",
                          transition: "background 0.2s ease",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "rgba(93,202,165,0.06)"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = selectedType === t ? "rgba(93,202,165,0.12)" : "transparent"}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Min Price */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 110px" }}>
                <label style={labelStyle}>MIN PRICE</label>
                <input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Max Price */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 110px" }}>
                <label style={labelStyle}>MAX PRICE</label>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Search Button */}
              <Button
                onPress={handleSearch}
                style={{
                  backgroundColor: "#0f6e56",
                  color: "#ffffff",
                  borderRadius: "8px",
                  padding: "0 32px",
                  fontWeight: 700,
                  fontSize: "15px",
                  cursor: "pointer",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  flex: "1 1 auto",
                  justifyContent: "center"
                }}
              >
                🔍 Search
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Slide Dots */}
        <div style={{ display: "flex", gap: "6px", marginTop: "24px" }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? "22px" : "7px",
                height: "7px",
                borderRadius: "999px",
                backgroundColor: i === current ? "#5dcaa5" : "rgba(255,255,255,0.28)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}