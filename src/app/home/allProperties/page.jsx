"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // 👈 URL কুয়েরি রিড করার জন্য ইম্পোর্ট করা হলো
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import PropertiesCard from "@/components/PropertiesCard";

const labelStyle = {
  fontSize: "10px",
  fontWeight: "700",
  color: "#5dcaa5",
  letterSpacing: "0.05em",
};

const inputStyle = {
  backgroundColor: "rgba(5, 12, 9, 0.9)",
  border: "1px solid rgba(93,202,165,0.15)",
  borderRadius: "8px",
  padding: "10px 14px",
  color: "#ffffff",
  fontSize: "14px",
  outline: "none",
  width: "100%",
  height: "44px",
};

export default function AllProperties() {
  const searchParams = useSearchParams(); // 👈 কুয়েরি প্যারামিটার হুক ইনিশিয়ালাইজ

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ব্যানার অথবা URL থেকে ডিফল্ট স্টেট ম্যানেজমেন্ট করা হচ্ছে
  const [location, setLocation] = useState(searchParams.get("search") || "");
  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "All");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  
  const [isOpen, setIsOpen] = useState(false);
  const propertyTypes = ["All", "Apartment", "Villa", "Studio", "Duplex"];

  // API থেকে ডেটা ফেচ করার ফাংশন
  const fetchProperties = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        search: location,
        type: selectedType === "All" ? "" : selectedType,
        minPrice,
        maxPrice
      }).toString();

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/properties?${queryParams}`);
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // প্রথমবার পেজ লোড হলে অথবা ব্যানার থেকে URL চেঞ্জ হলে কুয়েরি অনুযায়ী ট্রিগার হবে
  useEffect(() => {
    fetchProperties();
  }, [searchParams]); // 👈 searchParams ডিপেন্ডেন্সি হিসেবে যুক্ত করা হলো

  const handleSearch = () => {
    fetchProperties(); 
  };

  return (
    <div className="w-full min-h-screen bg-[#040605] text-white p-6 md:p-10 space-y-8">
      
      {/* ১. টপ টাইটেল এবং কাউন্টার */}
      <div className="max-w-7xl mx-auto text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">All properties</h1>
        <p className="text-sm text-zinc-500 font-medium mt-1">
          <span className="text-[#5dcaa5] font-bold">{properties.length}</span> properties found
        </p>
      </div>

      {/* ২. সার্চ বার */}
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="w-full"
        >
          <div style={{
            backgroundColor: "rgba(10, 20, 15, 0.80)",
            backdropFilter: "blur(14px)",
            borderRadius: "16px",
            padding: "20px 24px",
            border: "1px solid rgba(93,202,165,0.18)",
            width: "100%",
            position: "relative",
            zIndex: 40,
          }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "flex-end" }}>
              
              {/* Location/Title Search */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 200px" }}>
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
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", position: "relative", flex: "1 1 150px" }}>
                <label style={labelStyle}>PROPERTY TYPE</label>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  style={{
                    ...inputStyle,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    border: "1px solid rgba(93,202,165,0.22)",
                  }}
                >
                  {selectedType}
                  <span style={{ fontSize: "9px", opacity: 0.5 }}>▼</span>
                </button>
                {isOpen && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    left: 0,
                    backgroundColor: "#0a1a12",
                    border: "1px solid rgba(93,202,165,0.2)",
                    borderRadius: "10px",
                    zIndex: 100,
                    width: "100%",
                    minWidth: "150px",
                    overflow: "hidden",
                  }}>
                    {propertyTypes.map((t) => (
                      <button
                        key={t}
                        onClick={() => { setSelectedType(t); setIsOpen(false); }}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "10px 14px",
                          textAlign: "left",
                          color: selectedType === t ? "#5dcaa5" : "#a8d4be",
                          fontSize: "14px",
                          backgroundColor: selectedType === t ? "rgba(93,202,165,0.08)" : "transparent",
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Min Price */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 100px" }}>
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
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 100px" }}>
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
                  padding: "0 28px",
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
      </div>

      {/* ৩. গ্রিড আকারে প্রপার্টি কার্ডসমূহ */}
      <div className="max-w-7xl mx-auto pt-4">
        {loading ? (
          <div className="text-center py-20 text-[#5dcaa5] font-semibold">Loading properties...</div>
        ) : properties.length > 0 ? (
          <PropertiesCard properties={properties} />
        ) : (
          <div className="text-center py-20 text-zinc-500">
            <p className="text-lg font-medium">No properties match your filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}