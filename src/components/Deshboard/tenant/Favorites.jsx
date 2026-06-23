"use client";
import React, { useState } from "react";
import { Trash2 } from "lucide-react";

// আপনার প্রোভাইড করা স্ট্রাকচার অনুযায়ী ডেমো ডাটা অ্যারে
const demoFavorites = [
  {
    "_id": "fav_001",
    "userId": "user_001",
    "propertyId": "property_001",
    "propertyTitle": "Green valley duplex",
    "location": "Dhanmondi, Dhaka",
    "rent": 32000,
    "image": "https://image-url.com",
    "createdAt": "2026-08-10"
  },
  {
    "_id": "fav_002",
    "userId": "user_001",
    "propertyId": "property_002",
    "propertyTitle": "Downtown office suite",
    "location": "Banani, Dhaka",
    "rent": 60000,
    "image": "https://image-url.com",
    "createdAt": "2026-08-11"
  },
  {
    "_id": "fav_003",
    "userId": "user_001",
    "propertyId": "property_003",
    "propertyTitle": "Hillside cottage",
    "location": "Sreemangal, Sylhet",
    "rent": 14000,
    "image": "https://image-url.com",
    "createdAt": "2026-08-12"
  }
];

export default function Favorites() {
  const [favorites, setFavorites] = useState(demoFavorites);

  // রিমুভ হ্যান্ডলার (আপাতত ফ্রন্টএন্ড স্টেট থেকে ডিলিট করার জন্য)
  const handleRemove = (id) => {
    // পরবর্তীতে এখানে সার্ভারে ডিলিট রিকোয়েস্ট (axios/fetch) পাঠাবেন
    const updatedFavorites = favorites.filter(item => item._id !== id);
    setFavorites(updatedFavorites);
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-black text-white space-y-8">
      {/* হেডার টাইটেল */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
          Favorites
        </h1>
      </div>

      {/* কন্টেইনার এবং মেইন রাউন্ডেড বর্ডার */}
      <div className="w-full overflow-x-auto border border-zinc-900 rounded-2xl bg-[#030704] shadow-2xl">
        <div className="min-w-[850px] w-full">
          
          {/* গ্রিড হেডার (৪ কলাম লেআউট - স্ক্রিনশট অনুযায়ী) */}
          <div className="grid grid-cols-4 gap-4 px-6 py-4 text-zinc-500 font-semibold text-xs uppercase tracking-wider border-b border-zinc-900 bg-zinc-900/10">
            <div>Property</div>
            <div>Location</div>
            <div>Price</div>
            <div className="text-right pr-4">Action</div>
          </div>

          {/* গ্রিড বডি কন্টেন্ট */}
          <div className="divide-y divide-zinc-900/40">
            {favorites.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 font-medium text-sm">
                No favorite properties found.
              </div>
            ) : (
              favorites.map((fav) => (
                <div 
                  key={fav._id} 
                  className="grid grid-cols-4 gap-4 px-6 py-5 items-center hover:bg-zinc-900/20 transition-all duration-200"
                >
                  {/* প্রপার্টি নাম */}
                  <div className="font-bold text-zinc-100 text-base tracking-tight truncate">
                    {fav.propertyTitle}
                  </div>
                  
                  {/* লোকেশন */}
                  <div className="text-zinc-400 font-medium text-sm truncate">
                    {fav.location}
                  </div>
                  
                  {/* প্রাইস/রেন্ট */}
                  <div className="font-bold text-zinc-200 text-sm tracking-wide">
                    Tk {fav.rent?.toLocaleString()}
                  </div>
                  
                  {/* অ্যাকশন বাটন (Remove) */}
                  <div className="text-right pr-2">
                    <button
                      onClick={() => handleRemove(fav._id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#23171a] text-[#b95c64] border border-white/[0.01] hover:bg-[#2d1e22] transition-colors duration-150 group"
                    >
                      <Trash2 size={13} className="text-[#b95c64] group-hover:scale-105 transition-transform" />
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
}