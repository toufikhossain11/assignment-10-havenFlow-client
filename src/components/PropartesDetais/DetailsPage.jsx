"use client";
import React, { useState, useEffect } from "react";
import { 
  Button, 
  Modal, 
  Surface, 
  TextField, 
  Label, 
  Input 
} from "@heroui/react";
import { 
  Heart, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize, 
  Wifi, 
  Car, 
  Calendar,
  Phone,
  FileText
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import PropertyReviewSection from "./PropertyReviewSection";
import toast, { Toaster } from "react-hot-toast";

export default function DetailsPage({ data }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null); // সার্ভারের তৈরি হওয়া ফেভারিট ডকুমেন্ট আইডি রাখার জন্য
  const { data: session } = useSession();
  const user = session?.user;

  const propertyId = data?._id?.$oid || data?._id || data?.id;

  // ✅ ১. পেজ লোড হলে চেক করবে এই প্রপার্টিটা অলরেডি ফেভারিট লিস্টে আছে কি না
  useEffect(() => {
    if (user?.email && propertyId) {
      fetch(`http://localhost:5000/favorites/check?email=${user.email}&propertyId=${propertyId}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.isFavorite) {
            setIsFavorite(true);
            setFavoriteId(result.favoriteId); // যদি অলরেডি থাকে তার আইডি সেভ করে রাখছি
          }
        })
        .catch((err) => console.error("Error checking favorite status:", err));
    }
  }, [user?.email, propertyId]);

  // ✅ ২. ফেভারিট বাটন টগল হ্যান্ডলার (সার্ভার কানেকশন)
  const handleFavoriteToggle = async () => {
    if (!user) {
      toast.error("Please login first to add favorites!");
      return;
    }

    // অপটিমিস্টিক ইন্টারফেস আপডেট (ইউজার এক্সপেরিয়েন্স ফাস্ট রাখার জন্য)
    const previousState = isFavorite;
    setIsFavorite(!previousState);

    if (!previousState) {
      // ফেভারিট লিস্টে ডেটা যোগ করার JSON স্ট্রাকচার (আপনার দেওয়া স্কিমা অনুযায়ী)
      const favoriteData = {
        userId: user?.id || user?._id || "unknown_id",
        userEmail: user?.email,
        propertyId: propertyId,
        title: data?.title || "Untitled Property",
        location: data?.location || "N/A",
        rent: Number(data?.rent || 0),
        image: data?.images || "",
        ownerId: data?.ownerId || "unknown_owner_id",
        createdAt: new Date().toISOString().split('T')[0] // '2026-06-26' ফরম্যাট
      };

      try {
        const response = await fetch("http://localhost:5000/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(favoriteData),
        });
        const result = await response.json();

        if (result.insertedId) {
          setFavoriteId(result.insertedId);
          toast.success("Added to favorites!");
        } else {
          setIsFavorite(previousState); // ফেইল করলে আগের অবস্থায় ব্যাক করবে
          toast.error("Failed to add to favorites.");
        }
      } catch (error) {
        console.error(error);
        setIsFavorite(previousState);
        toast.error("Something went wrong!");
      }
    } else {
      // অলরেডি ফেভারিট করা থাকলে রিমুভ (DELETE) করার লজিক
      try {
        const response = await fetch(`http://localhost:5000/favorites/${favoriteId || propertyId}?email=${user.email}`, {
          method: "DELETE",
        });
        const result = await response.json();

        if (result.deletedCount > 0) {
          setFavoriteId(null);
          toast.success("Removed from favorites.");
        } else {
          setIsFavorite(previousState);
          toast.error("Failed to remove from favorites.");
        }
      } catch (error) {
        console.error(error);
        setIsFavorite(previousState);
        toast.error("Something went wrong!");
      }
    }
  };

  if (!data) {
    return <div className="text-center text-white p-20">No property data found!</div>;
  }

  const dummyReviews = [
    { 
      id: 1, 
      userName: "Rafiq Ahmed", 
      rating: 5, 
      createdAt: "2 weeks ago", 
      comment: "Booking was smooth and the owner responded quickly to every question." 
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#040605] text-white p-4 md:p-6 flex justify-center items-start">
      {/* নোটিফিকেশন টোস্টার */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: { background: "#0b120f", color: "#fff", border: "1px solid #1b352b" }
        }} 
      />

      <div className="w-full max-w-7xl space-y-8">
        
        {/* ওপরের মূল সেকশন */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start bg-[#040605]">
          
          {/* বাম কলাম: ইমেজ হোল্ডার */}
          <div className="w-full h-fit max-h-[550px] bg-[#0b0e0c] border border-zinc-900 rounded-2xl overflow-hidden relative flex shadow-2xl">
            {data?.images ? (
              <img 
                src={data.images} 
                alt={data.title} 
                className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
              />
            ) : (
              <div className="w-full min-h-[350px] flex items-center justify-center text-zinc-700">
                <span className="text-5xl">🖼️</span>
              </div>
            )}
          </div>

          {/* ডান কলাম: ডিটেইলস সেকশন */}
          <div className="flex flex-col justify-start text-left space-y-5 py-1">
            <div className="space-y-4">
              <div className="flex justify-between items-start w-full">
                <div className="space-y-1">
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-100">{data?.title}</h1>
                  <div className="flex items-center gap-1.5 text-zinc-400 text-lg font-medium">
                    <MapPin size={18} className="text-[#46cba1]" />
                    <span>{data?.location}</span>
                  </div>
                </div>

                {/* ফেভারিট বাটন - হ্যান্ডলার যুক্ত করা হয়েছে */}
                <Button
                  isIconOnly
                  onPress={handleFavoriteToggle}
                  className={`border rounded-xl h-12 w-12 min-w-12 transition-all bg-transparent ${
                    isFavorite ? "border-[#46cba1] text-[#46cba1]" : "border-zinc-800 text-zinc-500 hover:text-white"
                  }`}
                >
                  <Heart size={22} fill={isFavorite ? "#46cba1" : "none"} />
                </Button>
              </div>

              {/* প্রাইস ট্যাগ (Rent) */}
              <div className="text-3xl md:text-4xl font-black">
                <span className="text-[#46cba1]">Tk {data?.rent}</span>
                <span className="text-zinc-500 text-lg font-normal"> / {data?.rentType?.toLowerCase() || "month"}</span>
              </div>

              {/* অ্যামেনিটিজ ব্যাজ */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#09110e] border border-[#1b352b] rounded-xl text-sm font-bold text-[#46cba1]">
                  <Bed size={16} /> {data?.bedrooms} beds
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#09110e] border border-[#1b352b] rounded-xl text-sm font-bold text-[#46cba1]">
                  <Bath size={16} /> {data?.bathrooms} baths
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#09110e] border border-[#1b352b] rounded-xl text-sm font-bold text-[#46cba1]">
                  <Maximize size={16} /> {data?.propertySize}
                </div>
                
                {data?.amenities?.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-[#09110e] border border-[#1b352b] rounded-xl text-sm font-bold text-[#46cba1]">
                    {amenity.toLowerCase() === "wifi" ? <Wifi size={16} /> : amenity.toLowerCase() === "parking" ? <Car size={16} /> : <FileText size={16} />} 
                    {amenity}
                  </div>
                ))}
              </div>

              {/* ডেসক্রিপশন */}
              <p className="text-base md:text-xl text-zinc-300 leading-relaxed font-normal">
                {data?.description}
              </p>
              
              {data?.extraFeatures && (
                <p className="text-sm text-zinc-400 italic">
                  <span className="text-[#46cba1] font-bold">Features:</span> {data.extraFeatures}
                </p>
              )}
            </div>

            {/* ওনার কার্ড ও বাটন */}
            <div className="space-y-4 pt-4">
              <div className="bg-transparent border border-zinc-900 p-4 rounded-2xl flex items-center justify-between w-full shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0b1713] border border-[#1b362c] text-[#46cba1] font-black flex items-center justify-center text-base shadow-inner">
                    {user?.name ? user.name.split(" ").map(n => n[0]).join("") : "OWN"}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-200">{user?.name || data?.ownerName}</h4>
                    <p className="text-sm text-zinc-500 font-medium tracking-wide uppercase">{user?.email || data?.ownerEmail}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold px-6 h-10 rounded-xl text-sm transition-colors"
                >
                  Contact
                </Button>
              </div>

              {/* বুকিং মডাল */}
              <Modal>
                <Button 
                  className="w-full h-14 bg-[#46cba1] hover:bg-[#3bb38e] text-zinc-950 font-black text-lg rounded-2xl transition-all shadow-xl shadow-[#46cba1]/10"
                >
                  Book property
                </Button>
                
                <Modal.Backdrop className="bg-black/80 backdrop-blur-md">
                  <Modal.Container placement="auto">
                    <Modal.Dialog className="bg-[#0b120f] border border-zinc-900 text-white rounded-3xl max-w-md">
                      <Modal.CloseTrigger className="hover:bg-zinc-900/50 text-zinc-500 text-xl top-5 right-5" />
                      <Modal.Header className="p-8 pb-2 text-left">
                        <Modal.Heading className="text-xl font-black text-zinc-100 uppercase tracking-tight">Book this property</Modal.Heading>
                      </Modal.Header>
                      <Modal.Body className="p-8 pt-4">
                        <Surface variant="default" className="bg-transparent border-0 p-0 shadow-none">
                          <form className="flex flex-col gap-5">
                            <TextField className="w-full text-left" name="moveInDate" type="date">
                              <Label className="text-sm font-bold text-zinc-400 flex items-center gap-1.5 mb-2">
                                <Calendar size={14} className="text-[#46cba1]" /> Move-in date
                              </Label>
                              <Input className="bg-black/50 border border-zinc-900 hover:border-zinc-800 focus-within:!border-[#46cba1]/40 rounded-xl h-12 text-zinc-200 text-sm px-4 [color-scheme:dark]" />
                            </TextField>
                            <TextField className="w-full text-left" name="phone" type="tel">
                              <Label className="text-sm font-bold text-zinc-400 flex items-center gap-1.5 mb-2">
                                <Phone size={14} className="text-[#46cba1]" /> Contact number
                              </Label>
                              <Input placeholder="01XXXXXXXXX" className="bg-black/50 border border-zinc-900 hover:border-zinc-800 focus-within:!border-[#46cba1]/40 rounded-xl h-12 text-zinc-200 text-sm px-4" />
                            </TextField>
                            <TextField className="w-full text-left" name="notes" slot="textarea">
                              <Label className="text-sm font-bold text-zinc-400 flex items-center gap-1.5 mb-2">
                                <FileText size={14} className="text-[#46cba1]" /> Additional notes
                              </Label>
                              <Input placeholder="Anything the owner should know..." className="bg-black/50 border border-zinc-900 rounded-xl text-zinc-200 text-sm min-h-[100px] pt-3 px-4" />
                            </TextField>
                          </form>
                        </Surface>
                      </Modal.Body>
                      <Modal.Footer className="p-8 pt-2 flex gap-4">
                        <Button slot="close" className="flex-1 h-12 bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold rounded-xl">Cancel</Button>
                        <Button slot="close" className="flex-1 h-12 bg-[#46cba1] text-zinc-950 font-black rounded-xl">Confirm</Button>
                      </Modal.Footer>
                    </Modal.Dialog>
                  </Modal.Container>
                </Modal.Backdrop>
              </Modal>
            </div>

          </div>
        </div>

        {/* নতুন কাস্টম রিভিউ সেকশন কম্পোনেন্ট */}
        <PropertyReviewSection 
          propertyId={propertyId || "property_001"} 
          initialReviews={dummyReviews} 
        />

      </div>
    </div>
  );
}