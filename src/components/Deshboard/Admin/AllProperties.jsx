
"use client";
import React, { useState, useEffect } from "react";
import { FiCheck, FiTrash2 } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
// HeroUI v3 কম্পোনেন্টসমূহ
import { Button, Modal, TextField, Label, Input } from "@heroui/react";

export default function AllProperties({ properties: initialProperties }) {
  const [properties, setProperties] = useState(initialProperties || []);
  const [isLoading, setIsLoading] = useState(!initialProperties);

  // পেজিনেশন স্টেট
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // রিজেকশন মোডাল ও ইনপুট স্টেটসমূহ
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [activePropertyId, setActivePropertyId] = useState(null);
  const [rejectionTitle, setRejectionTitle] = useState("");
  const [rejectionFeedback, setRejectionFeedback] = useState("");

  useEffect(() => {
    if (initialProperties) {
      setProperties(initialProperties);
      setIsLoading(false);
    }
  }, [initialProperties]);

  // স্ট্যাটাস কালার ম্যাপ — pending / approved / rejected তিনটার জন্য আলাদা আলাদা রঙ
  const STATUS_COLORS = {
    pending: { badge: "bg-[#251e16] text-[#cc9c4b]", dot: "bg-[#cc9c4b]", icon: "text-[#cc9c4b]" },
    approved: { badge: "bg-[#11231d] text-[#42ad89]", dot: "bg-[#42ad89]", icon: "text-[#42ad89]" },
    rejected: { badge: "bg-[#27161a] text-[#e05263]", dot: "bg-[#e05263]", icon: "text-[#e05263]" },
  };

  const getStatusColors = (status) =>
    STATUS_COLORS[status?.toLowerCase()] || {
      badge: "bg-zinc-800 text-zinc-400",
      dot: "bg-zinc-500",
      icon: "text-zinc-400",
    };

  // স্ট্যাটাস অনুমোদন (Approved) করার হ্যান্ডলার
  const handleApproveStatus = async (propertyId) => {
    const loadingToast = toast.loading("Updating status to Approved...");
    try {
      const response = await fetch(`http://localhost:5000/property/status/${propertyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Approved" }),
      });
      const data = await response.json();

      if (data.modifiedCount > 0) {
        setProperties((prev) =>
          prev.map((prop) => {
            const currentId = prop._id?.$oid || prop._id || prop.id;
            return currentId === propertyId ? { ...prop, status: "Approved" } : prop;
          })
        );
        toast.success("Property approved successfully!", { id: loadingToast, duration: 3000 });
      } else {
        toast.error("Status remains unchanged.", { id: loadingToast });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status.", { id: loadingToast });
    }
  };

  // রিজেকশন মোডাল ওপেন করার ফাংশন — eta shudhu modal open kore, kichu delete kore na
  const openRejectModal = (propertyId) => {
    setActivePropertyId(propertyId);
    setRejectionTitle("");
    setRejectionFeedback("");
    setIsRejectModalOpen(true);
  };

  // রিজেকশন সাবমিট করার হ্যান্ডলার — status "Rejected" set hoy, document delete hoy na
  const handleRejectSubmit = async (title, feedback) => {
    if (!title.trim() || !feedback.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    const loadingToast = toast.loading("Rejecting property...");
    try {
      const response = await fetch(`http://localhost:5000/property/status/${activePropertyId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "Rejected",
          rejectionTitle: title,
          rejectionFeedback: feedback,
        }),
      });
      const data = await response.json();

      if (data.modifiedCount > 0) {
        setProperties((prev) =>
          prev.map((prop) => {
            const currentId = prop._id?.$oid || prop._id || prop.id;
            return currentId === activePropertyId
              ? { ...prop, status: "Rejected", rejectionTitle: title, rejectionFeedback: feedback }
              : prop;
          })
        );
        toast.success("Property rejected successfully!", { id: loadingToast, duration: 3000 });
        setIsRejectModalOpen(false);
      } else {
        toast.error("Failed to update status or no changes made.", { id: loadingToast });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.", { id: loadingToast });
    }
  };

  // পেজিনেশন লজিক
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = properties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-black text-white space-y-8 relative">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#18181b", color: "#fff", border: "1px solid #27272a" },
        }}
      />

      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
          All properties
        </h1>
      </div>

      {/* টেবিল লেআউট */}
      <div className="w-full overflow-x-auto border border-zinc-900 rounded-2xl bg-[#030704] shadow-2xl">
        <table className="w-full min-w-[950px] text-left border-collapse table-fixed">
          <thead>
            <tr className="border-b border-zinc-900 bg-zinc-900/10 text-zinc-500 font-semibold text-xs uppercase tracking-wider">
              <th className="w-[25%] px-6 py-4 font-semibold">Property Title</th>
              <th className="w-[20%] px-6 py-4 font-semibold">Location</th>
              <th className="w-[18%] px-6 py-4 font-semibold">Owner</th>
              <th className="w-[15%] px-6 py-4 font-semibold">Rent</th>
              <th className="w-[12%] px-6 py-4 font-semibold">Status</th>
              <th className="w-[10%] px-6 py-4 font-semibold text-right pr-8">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-900/40">
            {isLoading ? (
              [...Array(3)].map((_, index) => (
                <tr key={index} className="animate-pulse">
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-3/4"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-2/3"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-2/3"></div></td>
                  <td className="px-6 py-4"><div className="h-4 bg-zinc-800 rounded w-1/2"></div></td>
                  <td className="px-6 py-4"><div className="h-6 bg-zinc-800 rounded w-16"></div></td>
                  <td className="px-6 py-4 text-right pr-8"><div className="h-6 bg-zinc-800 rounded w-16 inline-block"></div></td>
                </tr>
              ))
            ) : currentProperties.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-zinc-500 font-medium text-sm">
                  No properties found.
                </td>
              </tr>
            ) : (
              currentProperties.map((property) => {
                const propId = property._id?.$oid || property._id || property.id;
                const colors = getStatusColors(property.status);

                return (
                  <tr key={propId} className="hover:bg-zinc-900/20 transition-all duration-200 text-sm h-[65px]">
                    <td className="px-6 py-3 font-semibold text-zinc-100 truncate" title={property.title}>
                      {property.title || "Untitled Property"}
                    </td>
                    <td className="px-6 py-3 text-zinc-400 font-medium truncate" title={property.location}>
                      {property.location || "N/A"}
                    </td>
                    <td className="px-6 py-3 text-zinc-400 font-medium truncate" title={property.ownerName}>
                      {property.ownerName || "Unknown"}
                    </td>
                    <td className="px-6 py-3 font-semibold text-zinc-200 whitespace-nowrap">
                      Tk {Number(property.rent || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold capitalize ${colors.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                        {property.status || "Pending"}
                      </span>
                    </td>

                    {/* Actions — reject (modal open, kichu delete hoy na), approve */}
                    <td className="px-6 py-3 text-right pr-8 whitespace-nowrap">
                      <div className="flex items-center justify-end gap-4">

                        {/* REJECT — kichu delete hoy na, shudhu status "Rejected" set hoy modal submit korle */}
                        <button
                          onClick={() => openRejectModal(propId)}
                          className={`p-1.5 ${getStatusColors("rejected").icon} hover:opacity-70 transition-opacity`}
                          title="Reject Property"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>

                        {/* APPROVE */}
                        <button
                          onClick={() => handleApproveStatus(propId)}
                          className={`p-1.5 ${getStatusColors("approved").icon} hover:opacity-70 transition-opacity`}
                          title="Approve Property"
                        >
                          <FiCheck className="w-5 h-5 stroke-[2.5]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* পেজিনেশন */}
      {!isLoading && properties.length > itemsPerPage && (
        <div className="flex items-center justify-between pt-4 border-t border-zinc-900 text-sm text-zinc-400">
          <div>
            Showing <span className="text-white font-medium">{indexOfFirstItem + 1}</span> to{" "}
            <span className="text-white font-medium">
              {indexOfLastItem > properties.length ? properties.length : indexOfLastItem}
            </span>{" "}
            of <span className="text-white font-medium">{properties.length}</span> properties
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* রিজেকশন মোডাল */}
      <Modal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)}>
        <Modal.Backdrop>
          <Modal.Container placement="auto">
            <Modal.Dialog className="sm:max-w-xl bg-[#09090b] border border-zinc-800 text-white rounded-2xl shadow-2xl overflow-hidden">
              <Modal.CloseTrigger className="text-zinc-400 hover:text-white" onClick={() => setIsRejectModalOpen(false)} />

              <Modal.Header className="text-center space-y-1 pb-2 pt-6">
                <Modal.Heading className="text-xl font-semibold text-zinc-100 tracking-tight flex justify-center w-full">
                  Reject property
                </Modal.Heading>
                <p className="text-sm text-zinc-400">
                  Give the owner a clear reason so they can fix and resubmit.
                </p>
              </Modal.Header>

              <Modal.Body className="p-6">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const titleValue = formData.get("rejectionTitle");
                    const feedbackValue = formData.get("rejectionFeedback");
                    handleRejectSubmit(titleValue, feedbackValue);
                  }}
                  className="flex flex-col gap-5"
                >
                  {/* Title Field */}
                  <TextField className="w-full flex flex-col gap-2" variant="secondary">
                    <Label className="text-sm font-semibold text-zinc-300">Title</Label>
                    <Input
                      name="rejectionTitle"
                      placeholder="Write rejection title"
                      defaultValue={rejectionTitle}
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#5dcaa5] focus:ring-1 focus:ring-[#5dcaa5] transition-all text-sm"
                      required
                    />
                  </TextField>

                  {/* Rejection Feedback Field */}
                  <TextField className="w-full flex flex-col gap-2" variant="secondary">
                    <Label className="text-sm font-semibold text-zinc-300">Rejection Feedback</Label>
                    <textarea
                      name="rejectionFeedback"
                      placeholder="Write rejection feedback..."
                      defaultValue={rejectionFeedback}
                      rows={4}
                      className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#5dcaa5] focus:ring-1 focus:ring-[#5dcaa5] transition-all text-sm resize-none"
                      required
                    />
                  </TextField>

                  {/* Actions buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-900">
                    <Button
                      type="button"
                      variant="secondary"
                      className="px-4 py-2 text-sm font-medium bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-xl hover:bg-zinc-800 hover:text-white transition-colors"
                      onClick={() => setIsRejectModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      style={{ backgroundColor: "#5dcaa5" }}
                      className="px-5 py-2 text-sm font-semibold text-black rounded-xl hover:opacity-90 transition-opacity"
                    >
                      Confirm rejection
                    </Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}