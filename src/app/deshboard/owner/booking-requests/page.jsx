"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import toast, { Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";

const STATUS_BADGES = {
  pending: "bg-[#251e16] text-[#cc9c4b]",
  approved: "bg-[#11231d] text-[#42ad89]",
  rejected: "bg-[#27161a] text-[#e05263]",
};

const getStatusBadge = (status) => STATUS_BADGES[status?.toLowerCase()] || "bg-zinc-800 text-zinc-400";

const getInitials = (name) =>
  name
    ? name.trim().split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase()
    : "U";

export default function BookingRequests() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  // পেজ লোড হলেই সব ডাটা ফেচ করবে
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => {
        setRequests(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching booking requests:", error);
        toast.error("Failed to load booking requests.");
        setIsLoading(false);
      });
  }, []);

  const handleStatusUpdate = async (bookingId, bookingStatus) => {
    setUpdatingId(bookingId);
    const loadingToast = toast.loading(
      bookingStatus === "Approved" ? "Approving booking..." : "Rejecting booking..."
    );

    try {
      const response = await fetch(`http://localhost:5000/bookings/status/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingStatus }),
      });
      const data = await response.json();

      if (data.modifiedCount > 0) {
        setRequests((prev) =>
          prev.map((req) => {
            const currentId = req._id?.$oid || req._id || req.id;
            return currentId === bookingId ? { ...req, bookingStatus } : req;
          })
        );
        toast.success(
          bookingStatus === "Approved" ? "Booking approved!" : "Booking rejected.",
          { id: loadingToast }
        );
      } else {
        toast.error("Status remains unchanged.", { id: loadingToast });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update booking.", { id: loadingToast });
    } finally {
      setUpdatingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] bg-[#040605] flex flex-col items-center justify-center text-zinc-400 gap-2">
        <Loader2 className="animate-spin text-[#46cba1]" size={32} />
        <p className="text-sm font-medium">Loading booking requests...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-[#040605] text-white rounded-2xl border border-zinc-900 shadow-2xl my-5">
      <Toaster
        position="top-center"
        toastOptions={{ style: { background: "#0b120f", color: "#fff", border: "1px solid #1b352b" } }}
      />

      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-zinc-100">Booking requests</h1>
      </div>

      <div className="overflow-x-auto border border-zinc-900/60 rounded-xl">
        <table className="w-full min-w-[700px] text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-900 bg-zinc-900/20 text-zinc-500 font-semibold text-xs uppercase tracking-wider">
              <th className="py-4 px-4 w-[28%]">Tenant</th>
              <th className="py-4 px-4 w-[26%]">Property</th>
              <th className="py-4 px-4 w-[16%]">Amount</th>
              <th className="py-4 px-4 w-[12%]">Status</th>
              <th className="py-4 px-4 text-right w-[18%]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/40">
            {requests.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-12 text-zinc-500 text-sm font-medium">
                  No booking requests yet.
                </td>
              </tr>
            ) : (
              requests.map((req) => {
                const bookingId = req._id?.$oid || req._id || req.id;
                const isPending = req.bookingStatus?.toLowerCase() === "pending";
                const isUpdating = updatingId === bookingId;

                return (
                  <tr
                    key={bookingId}
                    className="hover:bg-zinc-900/10 transition-colors duration-200 align-middle"
                  >
                    {/* টেন্যান্ট প্রোফাইল */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#111c18] border border-[#1a352a] text-[#46cba1] text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {getInitials(req.tenantName)}
                        </div>
                        <span className="text-sm font-bold text-zinc-200 truncate max-w-[150px]">
                          {req.tenantName || "Unknown"}
                        </span>
                      </div>
                    </td>

                    {/* প্রপার্টি নাম */}
                    <td className="py-4 px-4 text-sm font-medium text-zinc-400 truncate max-w-[180px]">
                      {req.propertyTitle || "Untitled"}
                    </td>

                    {/* অ্যামাউন্ট */}
                    <td className="py-4 px-4 text-sm font-bold text-zinc-200 whitespace-nowrap">
                      Tk {Number(req.bookingAmount || 0).toLocaleString()}
                    </td>

                    {/* স্ট্যাটাস ব্যাজ */}
                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold capitalize ${getStatusBadge(req.bookingStatus)}`}>
                        {req.bookingStatus || "Pending"}
                      </span>
                    </td>

                    {/* অ্যাকশন বাটন */}
                    <td className="py-4 px-4 text-right">
                      {isPending ? (
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            isDisabled={isUpdating}
                            onPress={() => handleStatusUpdate(bookingId, "Approved")}
                            className="w-24 h-8 bg-[#46cba1] hover:bg-[#3bb38e] text-zinc-950 font-bold text-xs rounded-lg transition-colors disabled:opacity-60"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            isDisabled={isUpdating}
                            onPress={() => handleStatusUpdate(bookingId, "Rejected")}
                            className="w-24 h-8 bg-[#221616] hover:bg-[#2d1b1b] border border-[#3d1e1e] text-[#e55c5c] font-bold text-xs rounded-lg transition-colors disabled:opacity-60"
                          >
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xs text-zinc-600 italic pr-2">No action needed</span>
                      )}
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