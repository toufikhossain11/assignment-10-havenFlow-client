"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Surface,
  TextField,
  Label,
  Input
} from "@heroui/react";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Wifi,
  Car,
  Calendar,
  Phone,
  FileText,
  User,
  Mail,
  Loader2
} from "lucide-react";
import { useSession } from "@/lib/auth-client";
import PropertyReviewSection from "./PropertyReviewSection";
import toast, { Toaster } from "react-hot-toast";
import { useFormStatus } from "react-dom";

// Ei button form-er nijer pending state dekhay (form-er child hote hoy, tai alada component)
function ConfirmBookingButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      isDisabled={pending}
      className="flex-1 h-12 bg-[#46cba1] text-zinc-950 font-black rounded-xl disabled:opacity-60 flex items-center justify-center gap-2"
    >
      {pending ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Redirecting to payment...
        </>
      ) : (
        "Confirm & Pay"
      )}
    </Button>
  );
}

export default function DetailsPage({ data }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const { data: session } = useSession();
  const user = session?.user;

  const propertyId = data?._id?.$oid || data?._id || data?.id;

  useEffect(() => {
    if (user?.email && propertyId) {
      fetch(`http://localhost:5000/favorites/check?email=${user.email}&propertyId=${propertyId}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.isFavorite) {
            setIsFavorite(true);
            setFavoriteId(result.favoriteId);
          }
        })
        .catch((err) => console.error("Error checking favorite status:", err));
    }
  }, [user?.email, propertyId]);

  const handleFavoriteToggle = async () => {
    if (!user) {
      toast.error("Please login first to add favorites!");
      return;
    }

    const previousState = isFavorite;
    setIsFavorite(!previousState);

    if (!previousState) {
      const favoriteData = {
        userId: user?.id || user?._id || "unknown_id",
        userEmail: user?.email,
        propertyId: propertyId,
        title: data?.title || "Untitled Property",
        location: data?.location || "N/A",
        rent: Number(data?.rent || 0),
        image: data?.images || "",
        ownerId: data?.ownerId || "unknown_owner_id",
        createdAt: new Date().toISOString().split('T')[0]
      };

      try {
        const response = await fetch("http://localhost:5000/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(favoriteData),
        });
        const result = await response.json();

        if (result.insertedId) {
          setFavoriteId(result.insertedId);
          toast.success("Added to favorites!");
        } else {
          setIsFavorite(previousState);
          toast.error("Failed to add to favorites.");
        }
      } catch (error) {
        console.error(error);
        setIsFavorite(previousState);
        toast.error("Something went wrong!");
      }
    } else {
      try {
        const response = await fetch(`http://localhost:5000/favorites/${favoriteId || propertyId}?email=${user.email}`, {
          method: "DELETE",
        });
        const result = await response.json();

        if (result.deletedCount > 0) {
          setFavoriteId(null);
          toast.success("Removed from favorites.");
        } else {
          setIsFavorite(previousState);
          toast.error("Failed to remove from favorites.");
        }
      } catch (error) {
        console.error(error);
        setIsFavorite(previousState);
        toast.error("Something went wrong!");
      }
    }
  };

  if (!data) {
    return <div className="text-center text-white p-20">No property data found!</div>;
  }

  const dummyReviews = [
    {
      id: 1,
      userName: "Rafiq Ahmed",
      rating: 5,
      createdAt: "2 weeks ago",
      comment: "Booking was smooth and the owner responded quickly to every question."
    }
  ];

  // Button text nirdharon korar logic
  const getBookingButtonText = () => {
    if (!user) return "Login to book";
    if (user?.role?.toLowerCase() !== "tenant") return "Only Tenants can book";
    return "Book property";
  };

  return (
    <div className="w-full min-h-screen bg-[#040605] text-white p-4 md:p-6 flex justify-center items-start">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "#0b120f", color: "#fff", border: "1px solid #1b352b" }
        }}
      />

      <div className="w-full max-w-7xl space-y-8">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start bg-[#040605]">

          <div className="w-full h-fit max-h-[550px] bg-[#0b0e0c] border border-zinc-900 rounded-2xl overflow-hidden relative flex shadow-2xl">
            {data?.images ? (
              <img
                src={data.images}
                alt={data.title}
                className="w-full h-full object-cover aspect-[4/3] md:aspect-auto"
              />
            ) : (
              <div className="w-full min-h-[350px] flex items-center justify-center text-zinc-700">
                <span className="text-5xl">🖼️</span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-start text-left space-y-5 py-1">
            <div className="space-y-4">
              <div className="flex justify-between items-start w-full">
                <div className="space-y-1">
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-100">{data?.title}</h1>
                  <div className="flex items-center gap-1.5 text-zinc-400 text-lg font-medium">
                    <MapPin size={18} className="text-[#46cba1]" />
                    <span>{data?.location}</span>
                  </div>
                </div>

                <Button
                  isIconOnly
                  onPress={handleFavoriteToggle}
                  className={`border rounded-xl h-12 w-12 min-w-12 transition-all bg-transparent ${isFavorite ? "border-[#46cba1] text-[#46cba1]" : "border-zinc-800 text-zinc-500 hover:text-white"
                    }`}
                >
                  <Heart size={22} fill={isFavorite ? "#46cba1" : "none"} />
                </Button>
              </div>

              <div className="text-3xl md:text-4xl font-black">
                <span className="text-[#46cba1]">Tk {data?.rent}</span>
                <span className="text-zinc-500 text-lg font-normal"> / {data?.rentType?.toLowerCase() || "month"}</span>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#09110e] border border-[#1b352b] rounded-xl text-sm font-bold text-[#46cba1]">
                  <Bed size={16} /> {data?.bedrooms} beds
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#09110e] border border-[#1b352b] rounded-xl text-sm font-bold text-[#46cba1]">
                  <Bath size={16} /> {data?.bathrooms} baths
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[#09110e] border border-[#1b352b] rounded-xl text-sm font-bold text-[#46cba1]">
                  <Maximize size={16} /> {data?.propertySize}
                </div>

                {data?.amenities?.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-[#09110e] border border-[#1b352b] rounded-xl text-sm font-bold text-[#46cba1]">
                    {amenity.toLowerCase() === "wifi" ? <Wifi size={16} /> : amenity.toLowerCase() === "parking" ? <Car size={16} /> : <FileText size={16} />}
                    {amenity}
                  </div>
                ))}
              </div>

              <p className="text-base md:text-xl text-zinc-300 leading-relaxed font-normal">
                {data?.description}
              </p>

              {data?.extraFeatures && (
                <p className="text-sm text-zinc-400 italic">
                  <span className="text-[#46cba1] font-bold">Features:</span> {data.extraFeatures}
                </p>
              )}
            </div>

            <div className="space-y-4 pt-4">
              <div className="bg-transparent border border-zinc-900 p-4 rounded-2xl flex items-center justify-between w-full shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0b1713] border border-[#1b362c] text-[#46cba1] font-black flex items-center justify-center text-base shadow-inner">
                    {data?.ownerName ? data.ownerName.split(" ").map(n => n[0]).join("") : "OWN"}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-200">{data?.ownerName}</h4>
                    <p className="text-sm text-zinc-500 font-medium tracking-wide uppercase">{data?.ownerEmail}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-bold px-6 h-10 rounded-xl text-sm transition-colors"
                >
                  Contact
                </Button>
              </div>

              {/* বুকিং মডাল ট্রিপার বাটন */}
              <Modal>
                <Button
                  onPress={() => {
                    if (!user) {
                      toast.error("Please login first to book a property!");
                    }
                  }}
                  // User login na thakle athaba user er role 'tenant' na hole button disable thakbe
                  isDisabled={!user || user?.role?.toLowerCase() !== "tenant"}
                  className="w-full h-14 bg-[#46cba1] hover:bg-[#3bb38e] text-zinc-950 font-black text-lg rounded-2xl transition-all shadow-xl shadow-[#46cba1]/10 disabled:opacity-40 disabled:hover:bg-[#46cba1]"
                >
                  {getBookingButtonText()}
                </Button>

                <Modal.Backdrop className="bg-black/80 backdrop-blur-md overflow-y-auto py-5">
                  <Modal.Container placement="auto">
                    <Modal.Dialog className="bg-[#0b120f] border border-zinc-900 text-white rounded-3xl max-w-md w-full my-auto max-h-[85vh] overflow-y-auto">
                      <Modal.CloseTrigger className="hover:bg-zinc-900/50 text-zinc-500 text-xl top-4 right-4" />

                      <form action="/api/checkout_sessions" method="POST">
                        <input type="hidden" name="propertyId" value={propertyId || ""} />

                        <Modal.Header className="p-6 pb-2 text-left">
                          <Modal.Heading className="text-lg font-black text-zinc-100 uppercase tracking-tight">Book this property</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="p-6 pt-3">
                          <Surface variant="default" className="bg-transparent border-0 p-0 shadow-none">
                            <div className="flex flex-col gap-4">

                              <div className="grid grid-cols-2 gap-3">
                                <TextField className="w-full text-left" name="moveInDate" type="date" isRequired>
                                  <Label className="text-sm font-bold text-zinc-400 flex items-center gap-1.5 mb-1.5">
                                    <Calendar size={14} className="text-[#46cba1]" /> Move-in date
                                  </Label>
                                  <Input required className="bg-black/50 border border-zinc-900 hover:border-zinc-800 focus-within:!border-[#46cba1]/40 rounded-xl h-11 text-zinc-200 text-sm px-3 [color-scheme:dark]" />
                                </TextField>

                                <TextField className="w-full text-left" name="phone" type="tel" isRequired>
                                  <Label className="text-sm font-bold text-zinc-400 flex items-center gap-1.5 mb-1.5">
                                    <Phone size={14} className="text-[#46cba1]" /> Contact number
                                  </Label>
                                  <Input required placeholder="01XXXXXXXXX" className="bg-black/50 border border-zinc-900 hover:border-zinc-800 focus-within:!border-[#46cba1]/40 rounded-xl h-11 text-zinc-200 text-sm px-3" />
                                </TextField>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-sm font-bold text-zinc-400 flex items-center gap-1.5 mb-1.5">
                                    <User size={14} className="text-[#46cba1]" /> Your name
                                  </Label>
                                  <div className="bg-black/30 border border-zinc-900 rounded-xl h-11 text-zinc-400 text-sm px-3 flex items-center truncate">
                                    {user?.name || "—"}
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-bold text-zinc-400 flex items-center gap-1.5 mb-1.5">
                                    <Mail size={14} className="text-[#46cba1]" /> Your email
                                  </Label>
                                  <div className="bg-black/30 border border-zinc-900 rounded-xl h-11 text-zinc-400 text-sm px-3 flex items-center truncate">
                                    {user?.email || "—"}
                                  </div>
                                </div>
                              </div>

                              <TextField className="w-full text-left" name="notes" slot="textarea">
                                <Label className="text-sm font-bold text-zinc-400 flex items-center gap-1.5 mb-1.5">
                                  <FileText size={14} className="text-[#46cba1]" /> Additional notes
                                </Label>
                                <Input placeholder="Anything the owner should know..." className="bg-black/50 border border-zinc-900 rounded-xl text-zinc-200 text-sm min-h-[56px] pt-2.5 px-3" />
                              </TextField>

                            </div>
                          </Surface>
                        </Modal.Body>

                        <Modal.Footer className="p-6 pt-3 flex gap-3 border-t border-zinc-900">
                          <Button slot="close" type="button" className="flex-1 h-11 bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold rounded-xl">Cancel</Button>
                          <ConfirmBookingButton />
                        </Modal.Footer>
                      </form>

                    </Modal.Dialog>
                  </Modal.Container>
                </Modal.Backdrop>
              </Modal>
            </div>

          </div>
        </div>

        <PropertyReviewSection
          propertyId={propertyId || "property_001"}
          initialReviews={dummyReviews}
        />

      </div>
    </div>
  );
}