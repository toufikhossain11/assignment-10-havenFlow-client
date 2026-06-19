"use client";

import Link from "next/link";
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaImage } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


const RegisterForm = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const name     = e.target.name.value;
    const email    = e.target.email.value;
    const image    = e.target.image.value;
    const password = e.target.password.value;

    const { error } = await authClient.signUp.email(
      { name, email, password, image },
      {
        onRequest: () => {},
        onSuccess: () => toast.success("Registration successful!"),
        onError: (ctx) => alert(ctx.error.message),
      }
    );
    if (!error) router.push("/login");
  };

  const handleGoogleRegister = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: "/login" });
  };

  const fieldClass = "flex h-11 items-center gap-2 rounded-xl border border-cyan-400/20 bg-[#0F172A]/70 px-3 backdrop-blur-xl transition-all focus-within:border-cyan-400 hover:border-cyan-400/40";
  const inputClass = "w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500";
  const labelClass = "text-xs text-slate-300";

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0B1120] px-4">
      <div className="w-full max-w-sm rounded-3xl border border-cyan-400/20 bg-[#111827]/70 p-6 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl">

        {/* Header */}
        <div className="mb-5 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            <p className="text-xs font-medium tracking-wide text-cyan-300">CREATE ACCOUNT</p>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Register</h1>
          <p className="mt-2 text-xs text-slate-400">Create your account to book appointments easily.</p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-3">

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Name</label>
            <div className={fieldClass}>
              <FaUser size={12} className="shrink-0 text-cyan-300" />
              <input name="name" type="text" required placeholder="Enter your name" className={inputClass} />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Email</label>
            <div className={fieldClass}>
              <FaEnvelope size={12} className="shrink-0 text-cyan-300" />
              <input name="email" type="email" required placeholder="john@example.com" className={inputClass} />
            </div>
          </div>

          {/* Photo URL */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Photo URL</label>
            <div className={fieldClass}>
              <FaImage size={12} className="shrink-0 text-cyan-300" />
              <input name="image" type="text" required placeholder="Enter photo url" className={inputClass} />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Password</label>
            <div className={fieldClass}>
              <FaLock size={12} className="shrink-0 text-cyan-300" />
              <input name="password" type="password" required placeholder="Enter your password" className={inputClass} />
            </div>
            <p className="text-xs text-slate-500">• Min 6 characters  • 1 uppercase  • 1 lowercase</p>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="h-11 w-full rounded-xl bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-[1.02]"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <p className="text-xs text-slate-500">OR CONTINUE WITH</p>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleRegister}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-[#0F172A]/70 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-500/10"
        >
          <FaGoogle size={13} className="text-cyan-300" />
          Continue with Google
        </button>

        <p className="mt-5 text-center text-xs text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-cyan-300 hover:text-cyan-200 transition-all duration-300">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterForm;