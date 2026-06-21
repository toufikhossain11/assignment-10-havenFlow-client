"use client";
import React, { useState, useRef, useEffect } from "react";
import { Label, ListBox, Select, TextArea, Input, Button } from "@heroui/react";
import { Wifi, Car, Snowflake, Plus, UploadCloud } from "lucide-react";

export default function EditPropertyModal({ editData, onClose, onSave }) {
  // ফর্মের মেইন স্টেট গ্রপ (editData থাকলে সেটি দিয়ে ইনিশিয়ালাইজ হবে)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    propertyType: "apartment", 
    price: "",
    rentType: "monthly",      
    bedrooms: "0",
    bathrooms: "0",
    size: "0",
  });

  // অ্যামেনিটিজ এর জন্য স্টেট 
  const [amenities, setAmenities] = useState([
    { id: "wifi", label: "Wifi", selected: true, icon: <Wifi size={14} /> },
    { id: "parking", label: "Parking", selected: true, icon: <Car size={14} /> },
    { id: "ac", label: "AC", selected: true, icon: <Snowflake size={14} /> },
  ]);

  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  // টেবিল থেকে আসা ডেটা ফর্মে সেট করার ইফেক্ট
  useEffect(() => {
    if (editData) {
      // রেন্ট টেক্সট থেকে শুধু নাম্বার আলাদা করার লজিক (Tk 18,000 -> 18000)
      const numericPrice = editData.rent ? editData.rent.replace(/[^0-9]/g, "") : "";
      
      setFormData({
        title: editData.name || "",
        description: editData.description || `Beautiful ${editData.type} available for rent.`,
        location: editData.location || "Dhaka, Bangladesh",
        propertyType: editData.type ? editData.type.toLowerCase() : "apartment",
        price: numericPrice,
        rentType: "monthly",
        bedrooms: editData.bedrooms || "3",
        bathrooms: editData.bathrooms || "2",
        size: editData.size || "1250",
      });
    }
  }, [editData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (id) => {
    setAmenities((prev) =>
      prev.map((item) => item.id === id ? { ...item, selected: !item.selected } : item)
    );
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedAmenities = amenities.filter((item) => item.selected).map((item) => item.id);
    const finalSubmitData = { 
      id: editData?.id, 
      ...formData, 
      amenities: selectedAmenities, 
      images,
      status: editData?.status || "Pending" 
    };
    
    // মেইন টেবিলে ডেটা আপডেট করার কলব্যাক ফাংশন
    onSave(finalSubmitData);
    onClose();
  };

  return (
    <div className="w-full max-w-xl bg-[#040605] text-white p-6 rounded-2xl border border-zinc-900 shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar">
      {/* হেডার */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold tracking-tight text-zinc-100">Edit property details</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Property title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-400">Property title</label>
          <Input
            type="text"
            name="title"
            placeholder="e.g. Sunrise residency"
            value={formData.title}
            onChange={handleInputChange}
            variant="bordered"
            classNames={{
              inputWrapper: "border-zinc-800 bg-[#080a09] hover:border-zinc-700 focus-within:!border-[#46cba1] h-11 rounded-xl",
              input: "text-zinc-200 placeholder:text-zinc-600 text-sm",
            }}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-400">Description</label>
          <TextArea
            name="description"
            placeholder="Describe the property"
            value={formData.description}
            onChange={handleInputChange}
            variant="bordered"
            minRows={3}
            classNames={{
              inputWrapper: "border-zinc-800 bg-[#080a09] hover:border-zinc-700 focus-within:!border-[#46cba1] rounded-xl",
              input: "text-zinc-200 placeholder:text-zinc-600 text-sm py-1",
            }}
          />
        </div>

        {/* Location & Property Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400">Location</label>
            <Input
              type="text"
              name="location"
              placeholder="Area, city"
              value={formData.location}
              onChange={handleInputChange}
              variant="bordered"
              classNames={{
                inputWrapper: "border-zinc-800 bg-[#080a09] hover:border-zinc-700 focus-within:!border-[#46cba1] h-11 rounded-xl",
                input: "text-zinc-200 placeholder:text-zinc-600 text-sm",
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Select 
              className="w-full" 
              selectedKeys={[formData.propertyType]}
              onSelectionChange={(keys) => setFormData(prev => ({ ...prev, propertyType: Array.from(keys)[0] }))}
              classNames={{
                trigger: "border-zinc-800 bg-[#080a09] hover:border-zinc-700 data-[open=true]:!border-[#46cba1] h-11 rounded-xl text-zinc-200",
                value: "text-zinc-200 text-sm font-semibold",
                popoverContent: "bg-[#0b0d0c] border border-zinc-800 text-zinc-200 rounded-xl",
              }}
            >
              <Label className="text-xs font-semibold text-zinc-400 mb-1.5 block">Property type</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="apartment" textValue="Apartment" className="hover:bg-zinc-900 focus:bg-[#46cba1] focus:text-zinc-950 py-2 font-medium rounded-lg">Apartment</ListBox.Item>
                  <ListBox.Item id="villa" textValue="Villa" className="hover:bg-zinc-900 focus:bg-[#46cba1] focus:text-zinc-950 py-2 font-medium rounded-lg">Villa</ListBox.Item>
                  <ListBox.Item id="studio" textValue="Studio" className="hover:bg-zinc-900 focus:bg-[#46cba1] focus:text-zinc-950 py-2 font-medium rounded-lg">Studio</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>

        {/* Rent Price & Rent Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400">Rent (price)</label>
            <Input
              type="number"
              name="price"
              placeholder="Tk"
              value={formData.price}
              onChange={handleInputChange}
              variant="bordered"
              classNames={{
                inputWrapper: "border-zinc-800 bg-[#080a09] hover:border-zinc-700 focus-within:!border-[#46cba1] h-11 rounded-xl",
                input: "text-zinc-200 placeholder:text-zinc-600 text-sm",
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Select 
              className="w-full"
              selectedKeys={[formData.rentType]}
              onSelectionChange={(keys) => setFormData(prev => ({ ...prev, rentType: Array.from(keys)[0] }))}
              classNames={{
                trigger: "border-zinc-800 bg-[#080a09] hover:border-zinc-700 data-[open=true]:!border-[#46cba1] h-11 rounded-xl text-zinc-200",
                value: "text-zinc-200 text-sm font-semibold",
                popoverContent: "bg-[#0b0d0c] border border-zinc-800 text-zinc-200 rounded-xl",
              }}
            >
              <Label className="text-xs font-semibold text-zinc-400 mb-1.5 block">Rent type</Label>
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="monthly" textValue="Monthly" className="hover:bg-zinc-900 focus:bg-[#46cba1] focus:text-zinc-950 py-2 font-medium rounded-lg">Monthly</ListBox.Item>
                  <ListBox.Item id="weekly" textValue="Weekly" className="hover:bg-zinc-900 focus:bg-[#46cba1] focus:text-zinc-950 py-2 font-medium rounded-lg">Weekly</ListBox.Item>
                  <ListBox.Item id="daily" textValue="Daily" className="hover:bg-zinc-900 focus:bg-[#46cba1] focus:text-zinc-950 py-2 font-medium rounded-lg">Daily</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>

        {/* Bedrooms, Bathrooms, Size */}
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400">Bedrooms</label>
            <Input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              variant="bordered"
              classNames={{
                inputWrapper: "border-zinc-800 bg-[#080a09] hover:border-zinc-700 focus-within:!border-[#46cba1] h-11 rounded-xl",
                input: "text-zinc-200 text-sm",
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400">Bathrooms</label>
            <Input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              variant="bordered"
              classNames={{
                inputWrapper: "border-zinc-800 bg-[#080a09] hover:border-zinc-700 focus-within:!border-[#46cba1] h-11 rounded-xl",
                input: "text-zinc-200 text-sm",
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400">Size (sqft)</label>
            <Input
              type="number"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              variant="bordered"
              classNames={{
                inputWrapper: "border-zinc-800 bg-[#080a09] hover:border-zinc-700 focus-within:!border-[#46cba1] h-11 rounded-xl",
                input: "text-zinc-200 text-sm",
              }}
            />
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-zinc-400 block">Amenities</label>
          <div className="flex flex-wrap items-center gap-2">
            {amenities.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => toggleAmenity(item.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
                  item.selected
                    ? "bg-[#142e24] text-[#46cba1] border-[#1d4d3b]"
                    : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-zinc-800 text-zinc-400 hover:bg-zinc-900/50 transition-all"
            >
              <Plus size={14} /> Add more
            </button>
          </div>
        </div>

        {/* Images Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-zinc-400 block">Images</label>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
            accept="image/*"
          />
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border border-dashed border-[#1d493a] bg-[#050706] rounded-xl p-5 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-zinc-900/20 transition-all"
          >
            <UploadCloud className="text-[#46cba1]" size={20} />
            <span className="text-xs text-zinc-400 font-medium">Click to upload property images</span>
            {images.length > 0 && (
              <span className="text-[11px] text-[#46cba1] font-bold mt-1 bg-[#142e24] px-2 py-0.5 rounded-md border border-[#1d4d3b]">
                {images.length} file(s) selected
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="button"
            onClick={onClose}
            className="w-1/3 bg-transparent hover:bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold text-sm h-11 rounded-xl transition-all"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-2/3 bg-[#46cba1] text-zinc-950 font-extrabold text-sm h-11 rounded-xl shadow-lg shadow-[#46cba1]/5 transition-transform active:scale-[0.99]"
          >
            Save changes
          </Button>
        </div>
      </form>
    </div>
  );
}