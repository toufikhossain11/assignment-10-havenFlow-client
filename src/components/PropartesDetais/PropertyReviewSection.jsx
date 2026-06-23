"use client";
import React, { useState } from "react";
import { Button, Surface, TextField, Label, Input } from "@heroui/react";
import { Star } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";


export default function PropertyReviewSection({ propertyId, initialReviews = [] }) {
  const { data: session } = useSession();
  const user = session?.user;

  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState(initialReviews);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    // ১. ইউজার সেশন চেক
    if (!user) {
      toast.error("Please login to write a review!");
      return;
    }

    // ২. রেটিং চেক
    if (userRating === 0) {
      toast.error("Please select a star rating!");
      return;
    }

    // ৩. কমেন্ট টেক্সট চেক
    if (!reviewText || !reviewText.trim()) {
      toast.error("Please write a comment!");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Submitting your review...");

    const reviewData = {
      propertyId: propertyId,
      userId: user?.id || user?._id || "user_unknown",
      userName: user?.name || "Anonymous User",
      userEmail: user?.email || "",
      rating: userRating,
      comment: reviewText.trim(),
      createdAt: new Date().toISOString().split('T')[0], 
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (res.ok) {
        toast.success("Review submitted successfully!", { id: toastId });
        
        // ফ্রন্টএন্ড স্টেট আপডেট
        setReviews([{ ...reviewData, id: Date.now() }, ...reviews]);
        
        // ফর্ম রিসেট
        setReviewText("");
        setUserRating(0);
      } else {
        toast.error("Failed to submit review. Try again.", { id: toastId });
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Something went wrong while connecting to the server.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pt-6 border-t border-zinc-900">
      {/* রিভিউ লিখার ফর্ম */}
      <Surface variant="default" className="bg-[#050806] border border-zinc-900 p-8 rounded-3xl text-left shadow-lg">
        <form onSubmit={handleReviewSubmit} className="space-y-6">
          <h3 className="text-xl font-black text-zinc-200 uppercase tracking-widest">Write a review</h3>
          
          {/* রেটিং স্টার সিলেকশন */}
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
                  <Star 
                    size={24} 
                    fill={(hoverRating || userRating) >= star ? "#46cba1" : "none"} 
                    className={(hoverRating || userRating) >= star ? "text-[#46cba1]" : "text-zinc-800"} 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* HeroUI TextField ফিক্স: onChange সরাসরি Input-এ বা টেক্সটফিল্ডের ইভেন্ট দিয়ে */}
          <TextField className="w-full text-left" name="reviewText">
            <Label className="text-sm text-zinc-500 font-bold uppercase mb-2 block">Your review</Label>
            <Input
              slot="textarea"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience with this property..."
              className="bg-black border border-zinc-900 rounded-2xl text-lg text-zinc-200 min-h-[120px] pt-4 px-4 focus-within:border-[#46cba1]/30 transition-all"
            />
          </TextField>

          <Button 
            type="submit" 
            size="lg" 
            isLoading={isSubmitting}
            className="bg-[#46cba1] hover:bg-[#3bb38e] text-zinc-950 font-black px-8 h-12 rounded-xl text-sm shadow-lg"
          >
            Submit review
          </Button>
        </form>
      </Surface>

      {/* রিভিউ লিস্ট দেখানোর অংশ */}
      <div className="space-y-4 text-left px-2">
        <h3 className="text-lg font-black text-zinc-400 uppercase tracking-widest">User Reviews</h3>
        <div className="grid grid-cols-1 gap-4">
          {reviews.length === 0 ? (
            <p className="text-zinc-500 text-sm">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((rev, index) => (
              <div key={rev.id || index} className="p-6 bg-transparent border border-zinc-900 rounded-2xl space-y-3 hover:border-zinc-800 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-lg font-black text-zinc-200">{rev.userName || rev.user}</span>
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={14} fill="#46cba1" className="text-[#46cba1]" />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-zinc-600 font-bold uppercase">{rev.createdAt || rev.time}</span>
                </div>
                <p className="text-lg text-zinc-400 font-light leading-relaxed">{rev.comment || rev.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}