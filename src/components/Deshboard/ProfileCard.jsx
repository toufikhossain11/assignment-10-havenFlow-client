"use client";
import React, { useState } from "react";
import { Mail, Shield, Check, Building2 } from "lucide-react";
import { useSession } from "@/lib/auth-client"; // Better Auth client hook

export default function ProfileCard() {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  
  // ইমেজ লোড হতে ব্যর্থ হলে এই স্টেটটি true হবে
  const [imgError, setImgError] = useState(false);

  // মডার্ন অ্যানিমেটেড স্কেলেটন লোডিং স্টেট
  if (isPending || !user) {
    return (
      <div className="w-full flex items-center justify-center p-10 animate-pulse">
        <div className="w-[440px] bg-[#0a140f]/20 border border-[#5dcaa5]/5 rounded-[22px] overflow-hidden">
          {/* Cover Banner Skeleton */}
          <div className="h-[130px] bg-[#5dcaa5]/5 relative" />
          
          <div className="px-10 pb-11 text-center -mt-[70px] flex flex-col items-center">
            {/* Avatar Skeleton */}
            <div className="w-[140px] h-[140px] rounded-full bg-[#07100c] border-4 border-[#07100c] mb-6">
              <div className="w-full h-full rounded-full bg-[#5dcaa5]/5 border border-[#5dcaa5]/10" />
            </div>

            {/* Name Skeleton */}
            <div className="h-7 w-48 bg-zinc-800 rounded-lg mb-3" />

            {/* Email Skeleton */}
            <div className="h-4 w-36 bg-zinc-900 rounded-md mb-7" />

            <div className="w-full h-px bg-[#5dcaa5]/5 mb-6" />

            {/* Badge Skeleton */}
            <div className="h-10 w-28 bg-[#5dcaa5]/5 border border-[#5dcaa5]/10 rounded-[10px]" />
          </div>
        </div>
      </div>
    );
  }

  // নামের প্রথম ২টি শব্দের প্রথম অক্ষর নেওয়ার লজিক
  const initials = user.name
    ? user.name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
    : "U";

  const role = user.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Tenant";

  return (
    <div className="w-full flex items-center justify-center p-10">
      <div className="w-[440px] bg-[#0a140f]/40 border border-[#5dcaa5]/15 rounded-[22px] overflow-hidden">

        {/* Cover banner */}
        <div className="h-[130px] bg-[#5dcaa5]/10 relative">
          <Building2 size={48} className="absolute top-5 right-6 text-[#5dcaa5]/20" />
        </div>

        <div className="px-10 pb-11 text-center -mt-[70px]">

          {/* Avatar + verified badge */}
          <div className="relative w-[140px] h-[140px] mx-auto mb-6">
            <div className="w-full h-full rounded-full bg-[#07100c] border-4 border-[#07100c] flex items-center justify-center box-border">
              <div className="w-full h-full rounded-full bg-[#5dcaa5]/15 border-2 border-[#5dcaa5]/30 flex items-center justify-center overflow-hidden">
                {/* ইমেজ যদি থাকে এবং তাতে কোনো এরর না আসে */}
                {user.image && !imgError ? (
                  <img 
                    src={user.image} 
                    alt={user.name} 
                    className="w-full h-full object-cover" 
                    onError={() => setImgError(true)} // ইমেজ লিঙ্ক ব্রোকেন হলে এই ফাংশনটি রান করবে
                  />
                ) : (
                  <span className="text-[46px] font-medium text-[#5dcaa5] tracking-wider">{initials}</span>
                )}
              </div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-10 h-10 rounded-full bg-[#5dcaa5] border-4 border-[#07100c] flex items-center justify-center box-border">
              <Check size={19} className="text-[#04342c]" />
            </div>
          </div>

          {/* Name */}
          <p className="text-[26px] font-medium text-zinc-100 mb-2">{user.name}</p>

          {/* Email */}
          <p className="text-base text-zinc-500 mb-6 flex items-center justify-center gap-2">
            <Mail size={16} className="text-zinc-500" />
            {user.email}
          </p>

          <div className="h-px bg-[#5dcaa5]/10 mb-6" />

          {/* Role badge */}
          <span className="inline-flex items-center gap-2 bg-[#5dcaa5]/15 text-[#5dcaa5] text-[15px] font-medium px-6 py-[9px] rounded-[10px]">
            <Shield size={17} />
            {role}
          </span>

        </div>
      </div>
    </div>
  );
}