"use client";
import React, { useState } from "react";

// সার্ভার ডাটা কানেক্ট করার জন্য ফেক ডাটা স্ট্রাকচার
const fakeTransactions = [
  {
    id: "1",
    txnId: "TXN10231",
    propertyName: "Sunrise residency",
    tenantName: "Rafiq Ahmed",
    ownerName: "Mahmud Rahman",
    amount: 18000,
    date: "12 Jun",
  },
  {
    id: "2",
    txnId: "TXN10245",
    propertyName: "Cozy studio loft",
    tenantName: "Nusrat Hossain",
    ownerName: "Nadia Islam",
    amount: 9500,
    date: "2 Jun",
  },
  {
    id: "3",
    txnId: "TXN10198",
    propertyName: "Downtown office suite",
    tenantName: "Tanvir Islam",
    ownerName: "Mahmud Rahman",
    amount: 60000,
    date: "28 May",
  },
];

export default function Transactions() {
  const [transactions, setTransactions] = useState(fakeTransactions);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-black text-white space-y-6">
      {/* হেডার সেকশন */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
          Transactions
        </h1>
      </div>

      {/* টেবিল কন্টেইনার লেআউট */}
      <div className="w-full overflow-x-auto border border-zinc-900 rounded-2xl bg-[#030704] shadow-2xl">
        <table className="w-full min-w-[800px] text-left border-collapse table-fixed">
          <thead>
            <tr className="border-b border-zinc-900 bg-zinc-900/10 text-zinc-500 font-semibold text-xs uppercase tracking-wider">
              <th className="w-[15%] px-6 py-4 font-semibold">Txn ID</th>
              <th className="w-[25%] px-6 py-4 font-semibold">Property</th>
              <th className="w-[20%] px-6 py-4 font-semibold">Tenant</th>
              <th className="w-[20%] px-6 py-4 font-semibold">Owner</th>
              <th className="w-[12%] px-6 py-4 font-semibold">Amount</th>
              <th className="w-[8%] px-6 py-4 font-semibold text-right pr-6">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-900/40">
            {isLoading ? (
              // লোডিং অ্যানিমেশন স্কেলিটন
              [...Array(3)].map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-3/4"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-2/3"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-2/3"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-1/2"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-16"></div></td>
                  <td className="px-6 py-4 text-right pr-6"><div className="h-4 bg-zinc-800 rounded w-10 inline-block"></div></td>
                </tr>
              ))
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-zinc-500 font-medium text-sm">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((txn) => (
                <tr 
                  key={txn.id} 
                  className="hover:bg-zinc-900/20 transition-all duration-200 text-sm h-[65px]"
                >
                  {/* Transaction ID */}
                  <td className="px-6 py-3 text-zinc-400 font-medium uppercase tracking-wide whitespace-nowrap">
                    {txn.txnId}
                  </td>
                  
                  {/* Property Name */}
                  <td className="px-6 py-3 font-bold text-zinc-100 truncate" title={txn.propertyName}>
                    {txn.propertyName}
                  </td>
                  
                  {/* Tenant Name */}
                  <td className="px-6 py-3 text-[#5dcaa5] font-medium truncate" title={txn.tenantName}>
                    {txn.tenantName}
                  </td>
                  
                  {/* Owner Name */}
                  <td className="px-6 py-3 text-zinc-400 font-medium truncate" title={txn.ownerName}>
                    {txn.ownerName}
                  </td>
                  
                  {/* Amount */}
                  <td className="px-6 py-3 font-semibold text-zinc-200 whitespace-nowrap">
                    Tk {Number(txn.amount).toLocaleString()}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-3 text-right pr-6 text-zinc-400 font-medium whitespace-nowrap">
                    {txn.date}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}