"use client";
import React from "react";
import { Button } from "@heroui/react";
// lucide-react থেকে প্রয়োজনীয় আইকনগুলো ইম্পোর্ট করা হলো
import { 
  Wallet, 
  Building2, 
  CalendarCheck, 
  MoreHorizontal 
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";
import { useSession } from "@/lib/auth-client";

// ১২ মাসের ফেইক ডাটা
const earningsData = [
  { month: "Jul", earnings: 32000 },
  { month: "Aug", earnings: 35000 },
  { month: "Sep", earnings: 33500 },
  { month: "Oct", earnings: 38000 },
  { month: "Nov", earnings: 41000 },
  { month: "Dec", earnings: 43500 },
  { month: "Jan", earnings: 40000 },
  { month: "Feb", earnings: 45500 },
  { month: "Mar", earnings: 47000 },
  { month: "Apr", earnings: 50000 },
  { month: "May", earnings: 46500 },
  { month: "Jun", earnings: 35500 },
];

export default function DashboardHome() {
  const { data: session } = useSession();
    const user = session?.user;
  return (
    <div className="space-y-6 w-full mx-auto p-4">
      {/* হেডার ও অ্যাকশন বাটন */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard home</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Welcome back, {user?.name || "Mahmud"}</p>
        </div>
        <Button isIconOnly variant="light" className="text-zinc-400 border border-zinc-800 rounded-lg min-w-9 h-9">
          <MoreHorizontal size={18} />
        </Button>
      </div>

      {/* স্ট্যাটিক কার্ড সেকশন */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total earnings */}
        <div className="border border-zinc-900 rounded-xl p-5 bg-[#060807] flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-zinc-400 text-xs font-semibold tracking-wide">Total earnings</span>
            <h2 className="text-2xl font-extrabold text-white">Tk 486,500</h2>
          </div>
          <div className="p-2 bg-[#5dcaa5]/5 border border-[#5dcaa5]/10 rounded-lg text-[#5dcaa5]">
            <Wallet size={18} />
          </div>
        </div>

        {/* Total properties */}
        <div className="border border-zinc-900 rounded-xl p-5 bg-[#060807] flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-zinc-400 text-xs font-semibold tracking-wide">Total properties</span>
            <h2 className="text-2xl font-extrabold text-white">8</h2>
          </div>
          <div className="p-2 bg-[#5dcaa5]/5 border border-[#5dcaa5]/10 rounded-lg text-[#5dcaa5]">
            <Building2 size={18} />
          </div>
        </div>

        {/* Total bookings */}
        <div className="border border-zinc-900 rounded-xl p-5 bg-[#060807] flex justify-between items-start">
          <div className="space-y-2">
            <span className="text-zinc-400 text-xs font-semibold tracking-wide">Total bookings</span>
            <h2 className="text-2xl font-extrabold text-white">34</h2>
          </div>
          <div className="p-2 bg-[#5dcaa5]/5 border border-[#5dcaa5]/10 rounded-lg text-[#5dcaa5]">
            <CalendarCheck size={18} />
          </div>
        </div>
      </div>

      {/* Recharts গ্রাফ সেকশন */}
      <div className="space-y-4 pt-2">
        <h3 className="text-sm font-bold text-white tracking-wide">Monthly earnings (last 12 months)</h3>
        <div className="w-full h-[320px] pr-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={earningsData} margin={{ top: 10, right: 10, left: 15, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5dcaa5" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#5dcaa5" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#121413" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#52525b', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#52525b', fontSize: 12 }} 
                domain={[32000, 50000]}
                ticks={[32000, 34000, 36000, 38000, 40000, 42000, 44000, 46000, 48000, 50000]}
                tickFormatter={(value) => `Tk ${value.toLocaleString()}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#060807', borderColor: '#18181b', color: '#fff' }}
                formatter={(value) => [`Tk ${value.toLocaleString()}`, 'Earnings']}
              />
              <Area 
                type="monotone" 
                dataKey="earnings" 
                stroke="#5dcaa5" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#colorEarnings)"
                dot={{ r: 4, fill: "#5dcaa5", strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}