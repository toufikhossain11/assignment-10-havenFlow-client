"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // সার্ভার থেকে ডাটা লোড করার ইফেক্ট
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/transactions")
      .then((res) => res.json())
      .then((data) => {
        setTransactions(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading transactions:", err);
        setIsLoading(false);
      });
  }, []);

  // ISO ডেট ফরম্যাট থেকে পঠিত ডেট (যেমন: 28 Jun) কনভার্ট করার ফাংশন
  const formatTransactionDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { day: "numeric", month: "short" });
    } catch {
      return dateString;
    }
  };

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
        <table className="w-full min-w-[850px] text-left border-collapse table-fixed">
          <thead>
            <tr className="border-b border-zinc-900 bg-zinc-900/10 text-zinc-500 font-semibold text-xs uppercase tracking-wider">
              <th className="w-[18%] px-6 py-4 font-semibold">Txn ID</th>
              <th className="w-[24%] px-6 py-4 font-semibold">Property</th>
              <th className="w-[18%] px-6 py-4 font-semibold">Tenant</th>
              <th className="w-[18%] px-6 py-4 font-semibold">Owner</th>
              <th className="w-[14%] px-6 py-4 font-semibold">Amount</th>
              <th className="w-[8%] px-6 py-4 font-semibold text-right pr-6">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-900/40">
            {isLoading ? (
              // লোডিং ডাটা ইন্ডিকেটর
              <tr>
                <td colSpan="6" className="text-center py-12 text-zinc-400">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin text-[#5dcaa5]" size={20} />
                    <span className="text-sm font-medium">Loading transaction records...</span>
                  </div>
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-zinc-500 font-medium text-sm">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((txn) => {
                // MongoDB অবজেক্ট আইডি সেইফটি চেক
                const id = txn._id?.$oid || txn._id || txn.id;

                return (
                  <tr 
                    key={id} 
                    className="hover:bg-zinc-900/20 transition-all duration-200 text-sm h-[65px] align-middle"
                  >
                    {/* Transaction ID */}
                    <td className="px-6 py-3 text-zinc-400 font-medium tracking-wide truncate" title={txn.transactionId}>
                      {txn.transactionId ? txn.transactionId.replace("pi_", "") : "N/A"} 
                    </td>
                    
                    {/* Property Name */}
                    <td className="px-6 py-3 font-bold text-zinc-100 truncate" title={txn.propertyTitle}>
                      {txn.propertyTitle || "Untitled Property"}
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
                      Tk {Number(txn.amount || 0).toLocaleString()}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-3 text-right pr-6 text-zinc-400 font-medium whitespace-nowrap">
                      {formatTransactionDate(txn.paymentDate)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}