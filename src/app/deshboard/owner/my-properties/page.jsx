"use client";
import React, { useState, useEffect } from "react";
import { Table, Button } from "@heroui/react";
import { Eye, SquarePen, Trash2, ChevronLeft, ChevronRight, X } from "lucide-react";
import EditPropertyModal from "@/components/Deshboard/Owner/EditPropertyModal";
import { useSession } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";

export default function MyProperties() {
  const { data: session } = useSession();
  const user = session?.user;

  // রিয়েল ডাটা স্টেট
  const [allProperties, setAllProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // মডাল ও পেজিনেশন স্টেট গ্রুপ
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  const itemsPerPage = 10;

  // 🔄 ১. ইউজারের ইমেইল অনুযায়ী সার্ভার থেকে ডাটা ফেচ করা
  useEffect(() => {
    if (!user?.email) return;

    const fetchMyProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/my-properties?email=${user.email}`);
        if (response.ok) {
          const data = await response.json();
          setAllProperties(data);
        } else {
          toast.error("Failed to load properties.");
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Network error while loading properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyProperties();
  }, [user?.email]);

  // পেজিনেশন ক্যালকুলেশন
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allProperties.length / itemsPerPage) || 1;

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved": return "bg-[#142e24] text-[#46cba1] border border-[#1d4d3b]";
      case "Pending": return "bg-[#2d2216] text-[#e0a04f] border border-[#44321d]";
      case "Rejected": return "bg-[#2d1919] text-[#e55c5c] border border-[#492222]";
      default: return "bg-zinc-800 text-zinc-400";
    }
  };

  // 👁️ ২. Eye (View) বাটন অ্যাকশন হ্যান্ডলার
  const handleViewRejection = (property) => {
    setSelectedProperty(property);
    setIsViewModalOpen(true);
  };

  // 📝 ৩. Edit বাটন অ্যাকশন হ্যান্ডলার
  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setIsEditModalOpen(true);
  };

  // 💾 ৪. এডিট ফর্ম থেকে আসা ডাটা সেভ করার হ্যান্ডলার (সার্ভার সহ আপডেট)
  const handleSaveChanges = async (updatedFormFields) => {
    // MongoDB এর আইডি পেতে updatedFormFields.id অথবা _id নিশ্চিত করা হলো
    const targetId = updatedFormFields.id || updatedFormFields._id || selectedProperty?._id;

    try {
      const response = await fetch(`http://localhost:5000/property/update/${targetId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormFields),
      });

      if (response.ok) {
        // UI স্টেট আপডেট (ডাটা আপডেট হলে স্ট্যাটাস আবার 'Pending' হয়ে যাবে)
        setAllProperties((prev) =>
          prev.map((item) =>
            item._id === targetId
              ? {
                  ...item,
                  title: updatedFormFields.title,
                  propertyType: updatedFormFields.propertyType,
                  rent: Number(updatedFormFields.price || updatedFormFields.rent),
                  status: "Pending", // এডিট করার পর পুনরায় পেন্ডিং এ যাবে রিভিউ এর জন্য
                }
              : item
          )
        );
        toast.success("Property updated and submitted for review!");
        setIsEditModalOpen(false);
      } else {
        toast.error("Failed to update property.");
      }
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error("Something went wrong!");
    }
  };

  // 🗑️ ৫. ডিলিট বাটন হ্যান্ডলার (সার্ভার থেকে সরাসরি ডিলিট)
  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      const response = await fetch(`http://localhost:5000/properties/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setAllProperties((prev) => prev.filter((item) => item._id !== id));
        toast.success("Property deleted successfully.");
      } else {
        toast.error("Failed to delete the property.");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to connect to the server.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#040605] text-[#46cba1] font-bold">
        Loading your properties...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full bg-[#040605] text-white p-6 min-h-screen rounded-2xl border border-zinc-900 shadow-2xl flex flex-col justify-between my-5 relative">
      <Toaster position="top-center" />
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight text-zinc-100">My properties</h1>
        </div>

        {allProperties.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 font-medium">
            No properties found. Add some properties to see them here!
          </div>
        ) : (
          <Table 
            removeWrapper 
            className="w-full table-fixed"
            classNames={{ base: "bg-[#040605]", table: "bg-[#040605]", thead: "bg-transparent", tbody: "bg-[#040605]" }}
          >
            <Table.ScrollContainer>
              <Table.Content aria-label="My properties list" className="min-w-[650px]">
                <Table.Header>
                  <Table.Column isRowHeader className="bg-[#040605] text-zinc-500 font-semibold text-xs border-b border-zinc-900 pb-3 w-[35%] pl-2">Property</Table.Column>
                  <Table.Column className="bg-[#040605] text-zinc-500 font-semibold text-xs border-b border-zinc-900 pb-3 w-[15%]">Type</Table.Column>
                  <Table.Column className="bg-[#040605] text-zinc-500 font-semibold text-xs border-b border-zinc-900 pb-3 w-[15%]">Rent</Table.Column>
                  <Table.Column className="bg-[#040605] text-zinc-500 font-semibold text-xs border-b border-zinc-900 pb-3 w-[15%]">Status</Table.Column>
                  <Table.Column className="bg-[#040605] text-zinc-500 font-semibold text-xs border-b border-zinc-900 pb-3 text-right pr-6 w-[20%]">Actions</Table.Column>
                </Table.Header>

                <Table.Body>
                  {currentItems.map((property) => (
                    <Table.Row key={property._id} className="border-b border-zinc-900/50 hover:bg-[#080a09]/60 transition-colors duration-200">
                      <Table.Cell className="py-4 text-sm font-bold text-zinc-200 bg-[#040605] truncate pl-2">{property.title}</Table.Cell>
                      <Table.Cell className="py-4 text-sm font-medium text-zinc-400 bg-[#040605] truncate">{property.propertyType}</Table.Cell>
                      <Table.Cell className="py-4 text-sm font-bold text-zinc-200 bg-[#040605] truncate">Tk {property.rent?.toLocaleString()}</Table.Cell>
                      <Table.Cell className="py-4 bg-[#040605]">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide inline-block ${getStatusStyle(property.status)}`}>
                          {property.status}
                        </span>
                      </Table.Cell>
                      <Table.Cell className="py-4 text-right pr-4 bg-[#040605]">
                        <div className="flex items-center justify-end gap-1">
                          {property.status === "Rejected" && (
                            <>
                              {/* রিজেক্টেড হলেই কেবল আই বাটন দেখা যাবে */}
                              <Button isIconOnly variant="light" onClick={() => handleViewRejection(property)} className="text-[#46cba1] hover:bg-zinc-900/40 min-w-8 h-8 rounded-lg">
                                <Eye size={16} />
                              </Button>
                              
                              {/* 🔄 আপনার রিকোয়েস্ট অনুযায়ী: স্ট্যাটাস Rejected থাকলেই কেবল এডিট বাটন কাজ করবে */}
                              <Button isIconOnly variant="light" onClick={() => handleEditClick(property)} className="text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40 min-w-8 h-8 rounded-lg">
                                <SquarePen size={15} />
                              </Button>
                            </>
                          )}

                          {/* এডিট বাটন যদি সব সময় দেখাতে চান কিন্তু রিজেক্টেড ছাড়া বাকি সময় ডিজেবল রাখতে চান, তবে নিচের বাটনটি ব্যবহার করতে পারেন উপরেরটির বদলে: */}
                          {/* <Button isIconOnly variant="light" isDisabled={property.status !== "Rejected"} onClick={() => handleEditClick(property)} ... /> */}

                          <Button isIconOnly variant="light" onClick={() => handleDeleteClick(property._id)} className="text-zinc-500 hover:text-red-400 hover:bg-zinc-900/40 min-w-8 h-8 rounded-lg">
                            <Trash2 size={15} />
                          </Button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        )}
      </div>

      {/* পেজিনেশন কন্ট্রোল */}
      {allProperties.length > 0 && (
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-900/60 bg-[#040605]">
          <span className="text-xs text-zinc-500 font-medium">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, allProperties.length)} of {allProperties.length} properties</span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="bordered" isDisabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className="border-zinc-800 text-zinc-400 text-xs h-9 rounded-xl bg-transparent hover:bg-zinc-900/60 disabled:opacity-40"><ChevronLeft size={14} className="mr-1" /> Previous</Button>
            <Button size="sm" variant="bordered" isDisabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)} className="border-zinc-800 text-zinc-400 text-xs h-9 rounded-xl bg-transparent hover:bg-zinc-900/60 disabled:opacity-40">Next <ChevronRight size={14} className="ml-1" /></Button>
          </div>
        </div>
      )}

      {/* ⚠️ মডাল ১: Rejection details */}
      {isViewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#040605] border border-zinc-800 rounded-2xl p-5 relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setIsViewModalOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300"><X size={18} /></button>
            <div className="mb-4">
              <h3 className="text-base font-bold text-zinc-200">Rejection details</h3>
              <p className="text-xs text-[#e55c5c] font-semibold mt-1">Title: {selectedProperty?.rejectionTitle || "No Title Specified"}</p>
            </div>
            <div className="bg-[#080a09] border border-zinc-900 p-4 rounded-xl">
              <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 block mb-1">Feedback</label>
              <p className="text-sm text-zinc-300 leading-relaxed">{selectedProperty?.rejectionFeedback || "No feedback provided."}</p>
            </div>
          </div>
        </div>
      )}

      {/* 🔄 মডাল ২: Edit Form Dialog */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-xl my-8 animate-in fade-in zoom-in-95 duration-200">
            <EditPropertyModal
              editData={selectedProperty} 
              onClose={() => setIsEditModalOpen(false)} 
              onSave={handleSaveChanges}
            />
          </div>
        </div>
      )}
    </div>
  );
}