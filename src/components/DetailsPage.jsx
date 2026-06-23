"use client";
import React, { useState } from "react";
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
  Snowflake, 
  Star, 
  Calendar,
  Phone,
  FileText
} from "lucide-react";
import LoadingDetails from "./Deshboard/Owner/LoadingDetails";


export default function DetailsPage({ data, isLoading }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  
  // প্রথম ডামি রিভিউ স্টেট
  const [reviews, setReviews] = useState([
    { id: 1, user: "Rafiq Ahmed", rating: 5, time: "2 weeks ago", text: "Booking was smooth and the owner responded quickly to every question." }
  ]);

  if (isLoading) {
    return <LoadingDetails />;
  }

  if (!data) {
    return <div className="text-center text-white p-20">No property data found!</div>;
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewText.trim() || userRating === 0) return;

    const newReview = {
      id: Date.now(),
      user: "Current User",
      rating: userRating,
      time: "Just now",
      text: reviewText
    };

    setReviews([newReview, ...reviews]);
    setReviewText("");
    setUserRating(0);
  };

  return (
    <div className="w-full min-h-screen bg-[#040605] text-white p-4 md:p-6 flex justify-center items-start">
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
                <Button
                  isIconOnly
                  onPress={() => setIsFavorite(!isFavorite)}
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
                
                {/* ডাইনামিক অ্যামেনিটিজ রেন্ডারিং */}
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
              
              {/* এক্সট্রা ফিচারস (যদি থাকে) */}
              {data?.extraFeatures && (
                <p className="text-sm text-zinc-400 italic">
                  <span className="text-[#46cba1] font-bold">Features:</span> {data.extraFeatures}
                </p>
              )}
            </div>

            {/* বটম সেকশন: ওনার কার্ড ও বাটন */}
            <div className="space-y-4 pt-4">
              <div className="bg-transparent border border-zinc-900 p-4 rounded-2xl flex items-center justify-between w-full shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0b1713] border border-[#1b362c] text-[#46cba1] font-black flex items-center justify-center text-base shadow-inner">
                    {data?.ownerName ? data.ownerName.split(" ").map(n => n[0]).join("") : "OWN"}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-200">{data?.ownerName}</h4>
                    <p className="text-sm text-zinc-500 font-medium tracking-wide uppercase">{data?.ownerEmail}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold px-6 h-10 rounded-xl text-sm transition-colors"
                >
                  Contact
                </Button>
              </div>

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

        {/* নিচের রিভিউ সেকশন */}
        <div className="space-y-6 pt-6 border-t border-zinc-900">
          <Surface variant="default" className="bg-[#050806] border border-zinc-900 p-8 rounded-3xl text-left shadow-lg">
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <h3 className="text-xl font-black text-zinc-200 uppercase tracking-widest">Write a review</h3>
              <div className="space-y-2">
                <label className="text-sm text-zinc-500 font-bold uppercase">Your rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setUserRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="text-zinc-800 hover:scale-110 transition-transform"
                    >
                      <Star size={24} fill={(hoverRating || userRating) >= star ? "#46cba1" : "none"} className={(hoverRating || userRating) >= star ? "text-[#46cba1]" : "text-zinc-800"} />
                    </button>
                  ))}
                </div>
              </div>
              <TextField className="w-full text-left" name="reviewText" slot="textarea">
                <Label className="text-sm text-zinc-500 font-bold uppercase mb-2 block">Your review</Label>
                <Input
                  placeholder="Share your experience with this property..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="bg-black border border-zinc-900 rounded-2xl text-lg text-zinc-200 min-h-[120px] pt-4 px-4 focus-within:border-[#46cba1]/30 transition-all"
                />
              </TextField>
              <Button type="submit" size="lg" className="bg-[#46cba1] hover:bg-[#3bb38e] text-zinc-950 font-black px-8 h-12 rounded-xl text-sm shadow-lg">Submit review</Button>
            </form>
          </Surface>

          {/* রিভিউ লিস্ট */}
          <div className="space-y-4 text-left px-2">
            <h3 className="text-lg font-black text-zinc-400 uppercase tracking-widest">User Reviews</h3>
            <div className="grid grid-cols-1 gap-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="p-6 bg-transparent border border-zinc-900 rounded-2xl space-y-3 hover:border-zinc-800 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      <span className="text-lg font-black text-zinc-200">{rev.user}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} size={14} fill="#46cba1" className="text-[#46cba1]" />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-zinc-600 font-bold uppercase">{rev.time}</span>
                  </div>
                  <p className="text-lg text-zinc-400 font-light leading-relaxed">{rev.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}