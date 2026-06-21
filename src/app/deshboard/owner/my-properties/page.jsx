"use client";
import React, { useState } from "react";
import { Table, Button } from "@heroui/react";
import { Eye, SquarePen, Trash2, ChevronLeft, ChevronRight, X } from "lucide-react";
import EditPropertyModal from "@/components/Deshboard/Owner/EditPropertyModal";

export default function MyProperties() {
  // ডামি ডেটা স্টেট (ডেটা আপডেট করার সুবিধার জন্য এটি 'useState' এ রাখা হয়েছে)
  const [allProperties, setAllProperties] = useState([
    { id: 1, name: "Sunrise residency", type: "Apartment", rent: "Tk 18,000", status: "Approved" },
    { id: 2, name: "Lakeview villa", type: "Villa", rent: "Tk 45,000", status: "Pending" },
    { id: 3, name: "Cozy studio loft", type: "Studio", rent: "Tk 9,500", status: "Rejected", rejectionReason: "Documents mismatched and pricing calculation incorrect." },
    { id: 4, name: "Green valley duplex", type: "Duplex", rent: "Tk 32,000", status: "Approved" },
    { id: 5, name: "Ocean view penthouse", type: "Penthouse", rent: "Tk 75,000", status: "Approved" },
    { id: 6, name: "Skyline apartment", type: "Apartment", rent: "Tk 22,000", status: "Pending" },
  ]);

  // ২. মডাল ও পেজিনেশন স্টেট গ্রুপ
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allProperties.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allProperties.length / itemsPerPage);

  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved": return "bg-[#142e24] text-[#46cba1] border border-[#1d4d3b]";
      case "Pending": return "bg-[#2d2216] text-[#e0a04f] border border-[#44321d]";
      case "Rejected": return "bg-[#2d1919] text-[#e55c5c] border border-[#492222]";
      default: return "bg-zinc-800 text-zinc-400";
    }
  };

  // ৩. Eye (View) বাটন অ্যাকশন হ্যান্ডলার
  const handleViewRejection = (property) => {
    setSelectedProperty(property);
    setIsViewModalOpen(true);
  };

  // ৪. Edit বাটন অ্যাকশন হ্যান্ডলার
  const handleEditClick = (property) => {
    setSelectedProperty(property);
    setIsEditModalOpen(true);
  };

  // ৫. এডিট ফর্ম থেকে আসা ডাটা সেভ করার হ্যান্ডলার
  const handleSaveChanges = (updatedFormFields) => {
    setAllProperties((prev) =>
      prev.map((item) =>
        item.id === updatedFormFields.id
          ? {
              ...item,
              name: updatedFormFields.title,
              type: updatedFormFields.propertyType.charAt(0).toUpperCase() + updatedFormFields.propertyType.slice(1),
              rent: `Tk ${Number(updatedFormFields.price).toLocaleString()}`,
            }
          : item
      )
    );
    console.log("Updated row data successfully:", updatedFormFields);
  };

  return (
    <div className="max-w-7xl mx-auto w-full bg-[#040605] text-white p-6 min-h-screen rounded-2xl border border-zinc-900 shadow-2xl flex flex-col justify-between my-5 relative">
      <div>
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight text-zinc-100">My properties</h1>
        </div>

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
                  <Table.Row key={property.id} className="border-b border-zinc-900/50 hover:bg-[#080a09]/60 transition-colors duration-200">
                    <Table.Cell className="py-4 text-sm font-bold text-zinc-200 bg-[#040605] truncate pl-2">{property.name}</Table.Cell>
                    <Table.Cell className="py-4 text-sm font-medium text-zinc-400 bg-[#040605] truncate">{property.type}</Table.Cell>
                    <Table.Cell className="py-4 text-sm font-bold text-zinc-200 bg-[#040605] truncate">{property.rent}</Table.Cell>
                    <Table.Cell className="py-4 bg-[#040605]">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide inline-block ${getStatusStyle(property.status)}`}>
                        {property.status}
                      </span>
                    </Table.Cell>
                    <Table.Cell className="py-4 text-right pr-4 bg-[#040605]">
                      <div className="flex items-center justify-end gap-1">
                        {property.status === "Rejected" && (
                          <Button isIconOnly variant="light" onClick={() => handleViewRejection(property)} className="text-[#46cba1] hover:bg-zinc-900/40 min-w-8 h-8 rounded-lg">
                            <Eye size={16} />
                          </Button>
                        )}
                        {/* 🔄 Edit Button অ্যাক্টিভেটেড */}
                        <Button isIconOnly variant="light" onClick={() => handleEditClick(property)} className="text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40 min-w-8 h-8 rounded-lg">
                          <SquarePen size={15} />
                        </Button>
                        <Button isIconOnly variant="light" className="text-zinc-500 hover:text-red-400 hover:bg-zinc-900/40 min-w-8 h-8 rounded-lg">
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
      </div>

      {/* পেজিনেশন কন্ট্রোল */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-zinc-900/60 bg-[#040605]">
        <span className="text-xs text-zinc-500 font-medium">Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, allProperties.length)} of {allProperties.length} properties</span>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="bordered" isDisabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)} className="border-zinc-800 text-zinc-400 text-xs h-9 rounded-xl bg-transparent hover:bg-zinc-900/60 disabled:opacity-40"><ChevronLeft size={14} className="mr-1" /> Previous</Button>
          <Button size="sm" variant="bordered" isDisabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)} className="border-zinc-800 text-zinc-400 text-xs h-9 rounded-xl bg-transparent hover:bg-zinc-900/60 disabled:opacity-40">Next <ChevronRight size={14} className="ml-1" /></Button>
        </div>
      </div>

      {/* ⚠️ মডাল ১: Rejection details (Eye Button Dialog) */}
      {isViewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#040605] border border-zinc-800 rounded-2xl p-5 relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setIsViewModalOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300"><X size={18} /></button>
            <div className="mb-4">
              <h3 className="text-base font-bold text-zinc-200">Rejection details</h3>
              <p className="text-xs text-[#e55c5c] font-semibold mt-0.5">{selectedProperty?.name}</p>
            </div>
            <div className="bg-[#080a09] border border-zinc-900 p-4 rounded-xl">
              <p className="text-sm text-zinc-300 leading-relaxed">{selectedProperty?.rejectionReason || "No specific reason provided."}</p>
            </div>
          </div>
        </div>
      )}

      {/* 🔄 মডাল ২: Edit Form Dialog (SquarePen Button Dialog) */}
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