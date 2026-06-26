"use client";
import React, { useState } from "react";
import { Label, ListBox, Select, TextArea, Input, Button } from "@heroui/react";
import { 
  Wifi, 
  Car, 
  Snowflake, 
  Plus, 
  Image, 
  Sparkles 
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import toast, { Toaster } from "react-hot-toast";

export default function AddProperty() {
  const { data: session } = useSession();
  const user = session?.user;

  // ফর্মের মেইন স্টেট গ্রুপ (আপনার ডাটাবেজ স্কিমা অনুযায়ী ফিল্ডের নাম অ্যাডজাস্ট করা হয়েছে)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    propertyType: "Apartment", 
    rent: "",
    rentType: "Monthly",      
    bedrooms: "",
    bathrooms: "",
    size: "",
    imageUrl: "", // সরাসরি ইমেজ URL ইনপুট নেওয়ার জন্য
    extraFeatures: ""
  });

  // অ্যামেনিটিজ স্টেট
  const [amenities, setAmenities] = useState([
    { id: "WiFi", label: "WiFi", selected: true, icon: <Wifi size={14} /> },
    { id: "Parking", label: "Parking", selected: true, icon: <Car size={14} /> },
    { id: "AC", label: "AC", selected: true, icon: <Snowflake size={14} /> },
    { id: "Lift", label: "Lift", selected: false, icon: <Sparkles size={14} /> },
    { id: "Security", label: "Security", selected: false, icon: <Sparkles size={14} /> },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (id) => {
    setAmenities((prev) =>
      prev.map((item) => item.id === id ? { ...item, selected: !item.selected } : item)
    );
  };

  // ফর্ম সাবমিট এবং সার্ভারে ডাটা পাঠানো
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email) {
      toast.error("You must be logged in to add a property!");
      return;
    }

    // ফিল্টারিং নির্বাচিত অ্যামেনিটিজ
    const selectedAmenities = amenities.filter((item) => item.selected).map((item) => item.id);

    // ডাটাবেজের অবজেক্ট ফরম্যাট তৈরি
    const finalSubmitData = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      propertyType: formData.propertyType,
      rent: Number(formData.rent), // নাম্বারে কনভার্ট
      rentType: formData.rentType,
      bedrooms: Number(formData.bedrooms), // নাম্বারে কনভার্ট
      bathrooms: Number(formData.bathrooms), // নাম্বারে কনভার্ট
      propertySize: `${formData.size} sqft`, // "1500 sqft" ফরম্যাট তৈরি
      amenities: selectedAmenities,
      images: formData.imageUrl || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80", // ডিফল্ট বা ইউজার প্রদত্ত URL
      extraFeatures: formData.extraFeatures,
      ownerName: user?.name || "Anonymous", // সেশন থেকে অটোমেটিক নেম
      ownerEmail: user?.email, // সেশন থেকে অটোমেটিক ইমেইল
      status: "Pending", // ডিফল্ট ভ্যালু Pending
      createdAt: new Date().toISOString().split('T')[0], // "2026-06-21" ফরম্যাট
      rejectionFeedback: "",
      rejectionTitle: ""
    };

    try {
      const response = await fetch("http://localhost:5000/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalSubmitData),
      });

      if (response.ok) {
        toast.success("Property added successfully and is now pending approval!");
        // ফর্ম রিসেট
        setFormData({
          title: "", description: "", location: "", propertyType: "Apartment",
          rent: "", rentType: "Monthly", bedrooms: "", bathrooms: "", size: "",
          imageUrl: "", extraFeatures: ""
        });
      } else {
        toast.error("Failed to add property to the database.");
      }
    } catch (error) {
      console.error("Error saving property:", error);
      toast.error("Something went wrong with the server connection!");
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full p-6 bg-[#040605] text-white min-h-screen rounded-2xl border border-zinc-900 shadow-2xl my-5">
      <Toaster position="top-center" />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold tracking-tight text-zinc-100">Add new property</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Property title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-400">Property title</label>
          <Input
            type="text"
            name="title"
            required
            placeholder="e.g. Sunny Side Apartment"
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
            required
            placeholder="Describe the property"
            value={formData.description}
            onChange={handleInputChange}
            variant="bordered"
            minRows={4}
            classNames={{
              inputWrapper: "border-zinc-800 bg-[#080a09] hover:border-zinc-700 focus-within:!border-[#46cba1] rounded-xl",
              input: "text-zinc-200 placeholder:text-zinc-600 text-sm py-1",
            }}
          />
        </div>

        {/* Location & Property Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400">Location</label>
            <Input
              type="text"
              name="location"
              required
              placeholder="e.g. Moghbazar, Dhaka"
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
                  <ListBox.Item id="Apartment" textValue="Apartment" className="hover:bg-zinc-900 focus:bg-[#46cba1] focus:text-zinc-950 py-2 font-medium rounded-lg">Apartment</ListBox.Item>
                  <ListBox.Item id="Villa" textValue="Villa" className="hover:bg-zinc-900 focus:bg-[#46cba1] focus:text-zinc-950 py-2 font-medium rounded-lg">Villa</ListBox.Item>
                  <ListBox.Item id="Studio" textValue="Studio" className="hover:bg-zinc-900 focus:bg-[#46cba1] focus:text-zinc-950 py-2 font-medium rounded-lg">Studio</ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>

        {/* Rent Price & Rent Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-zinc-400">Rent (price)</label>
            <Input
              type="number"
              name="rent"
              required
              placeholder="Tk"
              value={formData.rent}
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
                  <ListBox.Item id="Monthly" textValue="Monthly" className="hover:bg-zinc-900 focus:bg-[#46cba1] focus:text-zinc-950 py-2 font-medium rounded-lg">Monthly</ListBox.Item>
                  <ListBox.Item id="Weekly" textValue="Weekly" className="hover:bg-zinc-900 focus:bg-[#46cba1] focus:text-zinc-950 py-2 font-medium rounded-lg">Weekly</ListBox.Item>
                  <ListBox.Item id="Daily" textValue="Daily" className="hover:bg-zinc-900 focus:bg-[#46cba1] focus:text-zinc-950 py-2 font-medium rounded-lg">Daily</ListBox.Item>
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
              required
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
              required
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
              required
              placeholder="e.g. 1500"
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

        {/* Extra Features */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-400">Extra Features</label>
          <Input
            type="text"
            name="extraFeatures"
            placeholder="e.g. South facing, 2 minutes from flyover entrance"
            value={formData.extraFeatures}
            onChange={handleInputChange}
            variant="bordered"
            classNames={{
              inputWrapper: "border-zinc-800 bg-[#080a09] hover:border-zinc-700 focus-within:!border-[#46cba1] h-11 rounded-xl",
              input: "text-zinc-200 placeholder:text-zinc-600 text-sm",
            }}
          />
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
          </div>
        </div>

        {/* Image URL Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-zinc-400">Property Image URL</label>
          <Input
            type="url"
            name="imageUrl"
            placeholder="https://example.com/image.jpg"
            value={formData.imageUrl}
            onChange={handleInputChange}
            variant="bordered"
            startContent={<Image size={16} className="text-zinc-500" />}
            classNames={{
              inputWrapper: "border-zinc-800 bg-[#080a09] hover:border-zinc-700 focus-within:!border-[#46cba1] h-11 rounded-xl",
              input: "text-zinc-200 placeholder:text-zinc-600 text-sm pl-1",
            }}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-[#46cba1] text-zinc-950 font-extrabold text-sm h-11 rounded-xl shadow-lg shadow-[#46cba1]/5 transition-transform active:scale-[0.99] mt-2"
        >
          Add property
        </Button>
      </form>
    </div>
  );
}