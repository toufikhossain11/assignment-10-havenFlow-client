"use client";
import React, { useState, useEffect } from "react";
import { ListBox, Select } from "@heroui/react";
import toast, { Toaster } from "react-hot-toast";

export default function AllUsersTable({ users: initialUsers }) {
  const [users, setUsers] = useState(initialUsers || []);
  const [isLoading, setIsLoading] = useState(!initialUsers); // প্রপস না আসা পর্যন্ত লোডিং ট্রু থাকবে

  // পেজিনেশন স্টেট
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (initialUsers) {
      setUsers(initialUsers);
      setIsLoading(false);
    }
  }, [initialUsers]);

  const getRoleBadgeStyles = (role) => {
    switch (role?.toLowerCase()) {
      case "tenant":
        return "bg-[#11231d] text-[#42ad89]";
      case "owner":
        return "bg-[#251e16] text-[#cc9c4b]";
      case "admin":
        return "bg-[#0f1e36] text-[#93c5fd] border border-[#1e3a8a]/40"; 
      default:
        return "bg-zinc-800 text-zinc-400";
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    const loadingToast = toast.loading("Updating role...");

    try {
      const response = await fetch(`http://localhost:5000/user/role/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await response.json();

      if (data.modifiedCount > 0) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            (user._id || user.id) === userId ? { ...user, role: newRole } : user
          )
        );
        
        toast.success(`Role updated to ${newRole} successfully!`, {
          id: loadingToast,
          duration: 3000,
        });
      } else {
        toast.error("Role remains unchanged.", { id: loadingToast });
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role. Please try again.", {
        id: loadingToast,
      });
    }
  };

  // পেজিনেশন লজিক (১০টি করে ডাটা স্লাইস করা)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div className="p-6 md:p-10 min-h-screen bg-black text-white space-y-8">
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#fff",
            border: "1px solid #27272a",
          }
        }} 
      />

      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
          All users
        </h1>
      </div>

      <div className="w-full overflow-x-auto border border-zinc-900 rounded-2xl bg-[#030704] shadow-2xl">
        <div className="min-w-[850px] w-full">
          
          {/* গ্রিড হেডার */}
          <div className="grid grid-cols-4 gap-4 px-6 py-4 text-zinc-500 font-semibold text-xs uppercase tracking-wider border-b border-zinc-900 bg-zinc-900/10">
            <div>Name</div>
            <div>Email</div>
            <div>Role</div>
            <div className="text-right pr-12">Actions</div>
          </div>

          {/* গ্রিড বডি কন্টেন্ট */}
          <div className="divide-y divide-zinc-900/40">
            {isLoading ? (
              // ১. ডাটা লোড হওয়ার সময়ের কাস্টম লোডিং অ্যানিমেশন (Skeleton)
              <div className="p-6 space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="grid grid-cols-4 gap-4 items-center animate-pulse">
                    <div className="h-4 bg-zinc-800 rounded w-2/3"></div>
                    <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                    <div className="h-6 bg-zinc-800 rounded w-16"></div>
                    <div className="h-8 bg-zinc-800 rounded w-28 justify-self-end"></div>
                  </div>
                ))}
              </div>
            ) : currentUsers.length === 0 ? (
              <div className="text-center py-12 text-zinc-500 font-medium text-sm">
                No users found.
              </div>
            ) : (
              currentUsers.map((user) => {
                const userId = user._id || user.id;
                const initials = user.name
                  ? user.name.trim().split(/\s+/).slice(0, 2).map(n => n[0]).join("").toUpperCase()
                  : "U";

                return (
                  <div 
                    key={userId} 
                    className="grid grid-cols-4 gap-4 px-6 py-3 items-center hover:bg-zinc-900/20 transition-all duration-200"
                  >
                    {/* নাম এবং অবতার */}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#11231d] border border-[#224438]/30 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-[#42ad89] tracking-wider">
                          {initials}
                        </span>
                      </div>
                      <span className="font-semibold text-zinc-100 truncate">{user.name}</span>
                    </div>

                    {/* ইমেইল */}
                    <div className="text-zinc-400 font-medium text-sm truncate">
                      {user.email}
                    </div>

                    {/* রোল স্ট্যাটাস ব্যাজ */}
                    <div>
                      <span className={`px-3 py-1 rounded-md text-xs font-semibold capitalize ${getRoleBadgeStyles(user.role)}`}>
                        {user.role || "tenant"}
                      </span>
                    </div>

                    {/* Actions - HeroUI Select */}
                    <div className="text-right pr-4">
                      <div className="inline-block w-[160px] text-left">
                        <Select
                          aria-label="Change Role"
                          placeholder="Select role"
                          selectedKey={user.role}
                          onSelectionChange={(key) => handleRoleChange(userId, String(key))}
                          classNames={{
                            base: "w-full max-w-full", 
                            trigger: "bg-[#050505] border border-zinc-800 hover:border-zinc-700 rounded-xl px-4 py-2.5 h-10 min-h-10",
                          }}
                        >
                          <Select.Trigger className="flex items-center justify-between text-sm font-medium text-zinc-200 capitalize w-full">
                            <Select.Value />
                            <Select.Indicator className="text-zinc-500" />
                          </Select.Trigger>
                          
                          <Select.Popover className="bg-[#0a0a0a] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden mt-1 w-[160px]">
                            <ListBox className="p-1 text-zinc-300">
                              <ListBox.Item id="tenant" textValue="Tenant" className="px-3 py-2 text-sm rounded-lg hover:bg-zinc-900 cursor-pointer transition-colors focus:bg-zinc-900 outline-none">Tenant</ListBox.Item>
                              <ListBox.Item id="owner" textValue="Owner" className="px-3 py-2 text-sm rounded-lg hover:bg-zinc-900 cursor-pointer transition-colors focus:bg-zinc-900 outline-none">Owner</ListBox.Item>
                              <ListBox.Item id="admin" textValue="Admin" className="px-3 py-2 text-sm rounded-lg hover:bg-zinc-900 cursor-pointer transition-colors focus:bg-zinc-900 outline-none">Admin</ListBox.Item>
                            </ListBox>
                          </Select.Popover>
                        </Select>
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>

      {/* ২. পেজিনেশন কন্ট্রোল বাটনসমূহ (ডাটা ১০টার বেশি হলে দেখাবে) */}
      {!isLoading && users.length > itemsPerPage && (
        <div className="flex items-center justify-between pt-4 border-t border-zinc-900 text-sm text-zinc-400">
          <div>
            Showing <span className="text-white font-medium">{indexOfFirstItem + 1}</span> to{" "}
            <span className="text-white font-medium">
              {indexOfLastItem > users.length ? users.length : indexOfLastItem}
            </span>{" "}
            of <span className="text-white font-medium">{users.length}</span> users
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
    </div>
  );
}