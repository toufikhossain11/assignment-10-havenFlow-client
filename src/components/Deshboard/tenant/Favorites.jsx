"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const user = session?.user;

  // ✅ ১. ডাটাবেজ থেকে ডেটা লোড করা
  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/favorites?email=${user.email}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch favorites");
          return res.json();
        })
        .then((data) => {
          setFavorites(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error loading favorites:", err);
          toast.error("Failed to load favorites!");
          setLoading(false);
        });
    } else if (session === null) {
      setLoading(false);
    }
  }, [user?.email, session]);

  // ✅ ২. রিমুভ হ্যান্ডলার
  const handleRemove = async (id) => {
    if (!user?.email) {
      toast.error("You must be logged in to modify favorites.");
      return;
    }

    const previousFavorites = [...favorites];
    const updatedFavorites = favorites.filter((item) => item._id !== id);
    setFavorites(updatedFavorites);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/favorites/${id}?email=${user.email}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (result.deletedCount > 0) {
        toast.success("Property removed from favorites.");
      } else {
        setFavorites(previousFavorites);
        toast.error("Could not remove property.");
      }
    } catch (error) {
      console.error("Error deleting favorite:", error);
      setFavorites(previousFavorites);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="p-6 md:p-10 min-h-screen bg-black text-white space-y-8">
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: { background: "#030704", color: "#fff", border: "1px solid #1b352b" }
        }} 
      />

      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
          Favorites
        </h1>
      </div>

      <div className="w-full overflow-x-auto border border-zinc-900 rounded-2xl bg-[#030704] shadow-2xl">
        <div className="min-w-[950px] w-full">
          
          {/* 🛠️ গ্রিড হেডার: ৫ কলামে বিভক্ত (grid-cols-5) */}
          <div className="grid grid-cols-5 gap-4 px-6 py-4 text-zinc-500 font-semibold text-xs uppercase tracking-wider border-b border-zinc-900 bg-zinc-900/10">
            <div>Image</div>
            <div>Property Title</div>
            <div>Location</div>
            <div>Price</div>
            <div className="text-right pr-4">Action</div>
          </div>

          {/* গ্রিড বডি কন্টেন্ট */}
          <div className="divide-y divide-zinc-900/40">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3 text-zinc-500 text-sm font-medium">
                <Loader2 className="animate-spin text-[#46cba1]" size={24} />
                <span>Loading favorites...</span>
              </div>
            ) : !user ? (
              <div className="text-center py-12 text-zinc-500 font-medium text-sm">
                Please log in to see your favorite properties.
              </div>
            ) : favorites.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 font-medium text-sm">
                No favorite properties found.
              </div>
            ) : (
              favorites.map((fav) => (
                /* 🛠️ রো কন্টেন্ট: ৫ কলামে বিভক্ত (grid-cols-5) */
                <div 
                  key={fav._id} 
                  className="grid grid-cols-5 gap-4 px-6 py-5 items-center hover:bg-zinc-900/20 transition-all duration-200"
                >
                  {/* ১. ইমেজ কলাম */}
                  <div className="flex-shrink-0">
                    {fav.image ? (
                      <img 
                        src={fav.image} 
                        alt={fav.title} 
                        className="w-14 h-14 object-cover rounded-xl border border-zinc-800 bg-zinc-900/40"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg">
                        🏢
                      </div>
                    )}
                  </div>

                  {/* ২. প্রপার্টি টাইটেল কলাম */}
                  <div className="min-w-0">
                    <span className="font-bold text-zinc-100 text-base tracking-tight truncate block">
                      {fav.title || "Luxury Apartment"}
                    </span>
                  </div>
                  
                  {/* ৩. লোকেশন কলাম */}
                  <div className="text-zinc-400 font-medium text-sm truncate">
                    {fav.location}
                  </div>
                  
                  {/* ৪. প্রাইস কলাম */}
                  <div className="font-bold text-zinc-200 text-sm tracking-wide">
                    Tk {fav.rent?.toLocaleString()}
                  </div>
                  
                  {/* ৫. অ্যাকশন বাটন কলাম */}
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