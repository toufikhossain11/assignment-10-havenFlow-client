"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, Button } from "@heroui/react";
import { MapPin } from "lucide-react";

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
  const [location, setLocation] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const propertyTypes = ["All", "Apartment", "Villa", "Studio", "Duplex"];

  // ডেমো ডেটা উইথ হাই-কোয়ালিটি রিয়েল এস্টেট ইমেজেস
  const [demoProperties] = useState([
    { id: 1, title: "Sunrise residency", type: "Apartment", location: "Mirpur, Dhaka", price: "Tk 18,000", numericPrice: 18000, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80" },
    { id: 2, title: "Lakeview villa", type: "Villa", location: "Gulshan, Dhaka", price: "Tk 45,000", numericPrice: 45000, image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80" },
    { id: 3, title: "Cozy studio loft", type: "Studio", location: "Dhanmondi, Dhaka", price: "Tk 9,500", numericPrice: 9500, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80" },
    { id: 4, title: "Green valley duplex", type: "Duplex", location: "Uttara, Dhaka", price: "Tk 32,000", numericPrice: 32000, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" },
    { id: 5, title: "Blue sky apartment", type: "Apartment", location: "Banani, Dhaka", price: "Tk 25,000", numericPrice: 25000, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80" },
  ]);

  const [filteredProperties, setFilteredProperties] = useState(demoProperties);

  const handleSearch = () => {
    let result = demoProperties.filter((property) => {
      const matchLocation = property.location.toLowerCase().includes(location.toLowerCase()) ||
                            property.title.toLowerCase().includes(location.toLowerCase());
      const matchType = selectedType === "All" || property.type === selectedType;
      const matchMinPrice = minPrice === "" || property.numericPrice >= Number(minPrice);
      const matchMaxPrice = maxPrice === "" || property.numericPrice <= Number(maxPrice);

      return matchLocation && matchType && matchMinPrice && matchMaxPrice;
    });
    setFilteredProperties(result);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="w-full min-h-screen bg-[#040605] text-white p-6 md:p-10 space-y-8">
      
      {/* ১. টপ টাইটেল এবং কাউন্টার */}
      <div className="max-w-7xl mx-auto text-left">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">All properties</h1>
        <p className="text-sm text-zinc-500 font-medium mt-1">
          <span className="text-[#5dcaa5] font-bold">{filteredProperties.length}</span> properties found
        </p>
      </div>

      {/* ২. সার্চ বার (কার্ডগুলোর সমান চওড়া করা হয়েছে - max-w-7xl) */}
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="w-full"
        >
          <div
            style={{
              backgroundColor: "rgba(10, 20, 15, 0.80)",
              backdropFilter: "blur(14px)",
              borderRadius: "16px",
              padding: "20px 24px",
              border: "1px solid rgba(93,202,165,0.18)",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                alignItems: "flex-end",
              }}
            >
              {/* Location */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: "1 1 200px" }}>
                <label style={labelStyle}>LOCATION</label>
                <input
                  type="text"
                  placeholder="City or area"
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
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 4px)",
                      left: 0,
                      backgroundColor: "#0a1a12",
                      border: "1px solid rgba(93,202,165,0.2)",
                      borderRadius: "10px",
                      zIndex: 50,
                      width: "100%",
                      minWidth: "150px",
                      overflow: "hidden",
                    }}
                  >
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
                  placeholder="5000"
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
                  border: "none",
                  cursor: "pointer",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  flexShrink: 0,
                  letterSpacing: "0.02em",
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
        {filteredProperties.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filteredProperties.map((property) => (
              <motion.div 
                key={property.id} 
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full"
              >
                {/* HeroUI Composable Card */}
                <Card className="bg-[#0a140f]/40 backdrop-blur-md border border-[#5dcaa5]/15 rounded-2xl hover:border-[#5dcaa5]/40 hover:shadow-[0_0_25px_rgba(93,202,165,0.12)] transition-all duration-300 h-[340px] flex flex-col justify-between group overflow-hidden p-0">
                  
                  {/* Image Container */}
                  <div className="w-full h-44 bg-zinc-950 overflow-hidden relative flex items-center justify-center">
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    
                    {/* ইমেজ এর ওপর টাইপ ব্যাজ */}
                    <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-black/70 backdrop-blur-md border border-[#5dcaa5]/30 text-[#5dcaa5] rounded-full text-[10px] font-bold tracking-wide shadow-sm">
                      {property.type}
                    </span>
                  </div>

                  {/* Content Container */}
                  <div className="flex-1 flex flex-col justify-between p-4 pt-3">
                    
                    {/* Title & Location */}
                    <div className="space-y-1 text-left">
                      <h3 className="font-bold text-base md:text-lg text-white group-hover:text-[#5dcaa5] transition-colors tracking-tight line-clamp-1">
                        {property.title}
                      </h3>
                      
                      {/* Location Row */}
                      <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
                        <MapPin size={12} className="text-zinc-600 group-hover:text-emerald-500/50 transition-colors" />
                        <span className="line-clamp-1">{property.location}</span>
                      </div>
                    </div>

                    {/* Bottom Footer Section */}
                    <div className="flex justify-between items-center pt-3 border-t border-zinc-900/60">
                      <div className="text-left">
                        <span className="font-extrabold text-white text-base md:text-lg">
                          {property.price}
                        </span>
                        <span className="text-zinc-600 text-xs font-medium">/mo</span>
                      </div>
                      
                      <Button 
                        size="sm"
                        className="bg-[#0f6e56] text-white font-bold px-4 h-9 rounded-xl border border-[#0f6e56] hover:bg-[#5dcaa5] hover:text-black hover:border-[#5dcaa5] transition-all shadow-md"
                      >
                        Details
                      </Button>
                    </div>

                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 text-zinc-500">
            <p className="text-lg font-medium">No properties match your filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}