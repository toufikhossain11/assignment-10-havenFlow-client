import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Clock } from "lucide-react";

// Stripe session-er metadata theke booking banay ar Express /bookings e pathay.
// /bookings route-ta nijei duplicate check kore, tai page reload/refresh hole
// dui-bar insert hobe na.
async function createBookingRecord(checkoutSession) {
  const m = checkoutSession.metadata || {};
  const amount = (checkoutSession.amount_total || 0) / 100;
  const transactionId =
    typeof checkoutSession.payment_intent === "string"
      ? checkoutSession.payment_intent
      : checkoutSession.payment_intent?.id || checkoutSession.id;

  const payload = {
    propertyId: m.propertyId,
    propertyTitle: m.propertyTitle,
    propertyImage: m.propertyImage,
    ownerId: m.ownerId,
    ownerName: m.ownerName,
    ownerEmail: m.ownerEmail,
    tenantId: m.tenantId,
    tenantName: m.tenantName,
    tenantEmail: m.tenantEmail,
    moveInDate: m.moveInDate,
    contactNumber: m.contactNumber,
    additionalNotes: m.additionalNotes,
    bookingAmount: amount,
    transactionId,
  };

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to save booking after payment:", await res.text());
    }
  } catch (error) {
    console.error("Error calling /bookings:", error);
  }

  return payload;
}

export default async function PaymentSuccessPage({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Missing session_id");
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  if (checkoutSession.status === "open") {
    redirect("/");
  }

  if (checkoutSession.status !== "complete") {
    return (
      <div className="w-full min-h-screen bg-[#040605] flex items-center justify-center text-white p-6">
        <p className="text-zinc-400 text-sm">
          Payment is still processing. Please refresh this page in a moment.
        </p>
      </div>
    );
  }

  const booking = await createBookingRecord(checkoutSession);

  return (
    <div className="w-full min-h-screen bg-[#040605] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0a140f]/40 border border-[#46cba1]/15 rounded-3xl p-10 text-center">

        <div className="w-16 h-16 rounded-full bg-[#46cba1]/15 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-[#46cba1]" />
        </div>

        <h1 className="text-2xl font-black text-zinc-100 mb-2">Payment successful</h1>
        <p className="text-zinc-400 text-sm mb-6">
          Booking submitted successfully for {booking.propertyTitle || "this property"}.
        </p>

        <div className="flex items-center justify-center gap-2 bg-[#251e16] text-[#cc9c4b] text-sm font-semibold px-4 py-2 rounded-xl mb-2">
          <Clock size={15} />
          Booking status: Pending
        </div>
        <p className="text-xs text-zinc-500 mb-8">Waiting for owner approval</p>

        {/* Tomar actual tenant dashboard route diye ei href ta update kore nio */}
        <Link
          href="/deshboard/tenant"
          className="inline-block w-full bg-[#46cba1] text-zinc-950 font-black text-sm py-3 rounded-xl hover:bg-[#3bb38e] transition-colors"
        >
          Go to dashboard
        </Link>

      </div>
    </div>
  );
}