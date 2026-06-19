"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
// HeroUI v3 এর লেটেস্ট ফর্ম এবং ইনপুট উপাদানসমূহ
import { Form, Input, Button } from "@heroui/react";
// react-hot-toast নোটিফিকেশনের জন্য
import toast, { Toaster } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
// পাসওয়ার্ড শো/হাইডের জন্য আইকন ইম্পোর্ট
import { Eye, EyeSlash } from "@gravity-ui/icons";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  // পাসওয়ার্ডের ভিজিবিলিটি কন্ট্রোল করার স্টেট
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  // লগইন সাবমিশন হ্যান্ডলার
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    setIsLoading(true);
    try {
      toast.success("Welcome back! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard"); // আপনার ড্যাশবোর্ড রুট অনুযায়ী চেঞ্জ করতে পারেন
      }, 1500);
    } catch (error) {
      toast.error("Invalid credentials, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // গুগল অথেন্টিকেশন হ্যান্ডলার
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      toast.success("Google sign-in successful!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      toast.error("Google sign-in encountered an error.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="w-full min-h-screen bg-black flex items-center justify-center py-10 px-4 overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />

      {/* ম্যাট ডার্ক কন্টেইনার */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ backgroundColor: "#060807" }}
        className="w-full max-w-[400px] border border-zinc-900 rounded-2xl p-6 space-y-4"
      >
        
        {/* Nivasa ব্র্যান্ড হেডার */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-white">
            <div className="w-7 h-7 rounded-lg bg-[#5dcaa5]/10 border border-[#5dcaa5]/20 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-[#5dcaa5]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">Nivasa</span>
          </div>
          
          <div className="pt-1">
            <h1 className="text-xl font-extrabold text-white tracking-tight">Welcome back</h1>
            <p className="text-zinc-500 text-[11px] font-medium">Log in to manage your bookings and listings</p>
          </div>
        </div>

        {/* HeroUI v3 ফর্ম */}
        <Form validationBehavior="native" onSubmit={handleLogin} className="space-y-4 w-full">
          
          {/* Email block */}
          <div className="flex flex-col w-full gap-1.5 text-left">
            <label className="text-zinc-400 text-xs font-bold tracking-wide">Email</label>
            <Input
              required
              name="email"
              type="email"
              placeholder="you@example.com"
              variant="bordered"
              radius="sm"
              classNames={{
                inputWrapper: "bg-transparent border-zinc-800 hover:border-[#5dcaa5]/30 focus-within:!border-[#5dcaa5] h-10 transition-all duration-200 w-full",
                input: "text-white placeholder:text-zinc-600 text-sm",
              }}
            />
          </div>

          {/* Password block (Eye Button সহ) */}
          <div className="flex flex-col w-full gap-1.5 text-left relative">
            <label className="text-zinc-400 text-xs font-bold tracking-wide">Password</label>
            <Input
              required
              name="password"
              type={isVisible ? "text" : "password"}
              placeholder="••••••••"
              variant="bordered"
              radius="sm"
              endContent={
                <button 
                  className="focus:outline-none pr-1 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors" 
                  type="button" 
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlash className="text-xl pointer-events-none" />
                  ) : (
                    <Eye className="text-xl pointer-events-none" />
                  )}
                </button>
              }
              classNames={{
                inputWrapper: "bg-transparent border-zinc-800 hover:border-[#5dcaa5]/30 focus-within:!border-[#5dcaa5] h-10 transition-all duration-200 w-full",
                input: `text-white placeholder:text-zinc-600 text-sm ${!isVisible ? 'tracking-widest' : ''}`,
                innerWrapper: "flex items-center w-full justify-between"
              }}
            />

            {/* Forgot Password লিংক */}
            <div className="text-right pt-1">
              <span 
                onClick={() => router.push("/forgot-password")}
                className="text-[#46cba1] text-xs font-bold cursor-pointer hover:underline"
              >
                Forgot password?
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-full bg-[#46cba1] text-zinc-950 font-bold text-sm h-10 rounded-lg mt-2 hover:bg-[#5dcaa5] transition-all duration-200"
          >
            Log in
          </Button>
        </Form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <div className="h-[1px] bg-zinc-900 flex-grow"></div>
          <span className="text-zinc-600 text-[10px] font-bold tracking-wider uppercase">or continue with</span>
          <div className="h-[1px] bg-zinc-900 flex-grow"></div>
        </div>

        {/* Google Sign-in Button */}
        <Button
          onPress={handleGoogleLogin}
          isLoading={isGoogleLoading}
          variant="bordered"
          className="w-full border-zinc-800 bg-transparent text-white font-bold text-sm h-10 rounded-lg hover:bg-zinc-900/40 hover:border-zinc-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <FaGoogle size={16} className="text-green-800" />
          Continue with Google
        </Button>

        {/* বোটম ফুটার লিংক */}
        <div className="text-center pt-1">
          <p className="text-xs text-zinc-500 font-medium">
            Don't have an account?{" "}
            <span 
              onClick={() => router.push("/register")}
              className="text-[#46cba1] font-bold cursor-pointer hover:underline pl-0.5"
            >
              Register
            </span>
          </p>
        </div>

      </motion.div>
    </main>
  );
}