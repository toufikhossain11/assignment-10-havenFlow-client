import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth"; // tomar Better Auth server config — path tomar project e check kore nio

export async function POST(req) {
  try {
    // Tenant identity SHOMOY-e session theke newa hocche, form/client data theke na —
    // nahole keu request tamper kore onno karo naam/email diye booking korte parto.
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.redirect(new URL("/login", req.url), 303);
    }
    const tenant = session.user;

    const formData = await req.formData();
    const propertyId = formData.get("propertyId");
    const moveInDate = formData.get("moveInDate");
    const contactNumber = formData.get("phone");
    const additionalNotes = (formData.get("notes") || "").toString().slice(0, 450);

    if (!propertyId || !moveInDate || !contactNumber) {
      return NextResponse.json(
        { message: "Missing required booking fields" },
        { status: 400 }
      );
    }

    // Authoritative property + price lookup — client-er kono rent/title kokhono trust kora hoy na,
    // nahole DevTools diye request edit kore keu kom price-e pay korte parto.
    const propertyRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/properties/${propertyId}`,
      { cache: "no-store" }
    );

    if (!propertyRes.ok) {
      return NextResponse.json({ message: "Property not found" }, { status: 404 });
    }

    const property = await propertyRes.json();
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL;

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "bdt",
            unit_amount: Math.round(Number(property.rent) * 100),
            product_data: {
              name: property.title || "Property booking",
              images: property.images ? [property.images] : [],
            },
          },
          quantity: 1,
        },
      ],
      // Booking-er shob info Stripe metadata e store kora hocche, jeta payment-success page e
      // session retrieve korar shomoy ferot pawa jabe — eta MongoDB e abar lekha lagbe na.
      metadata: {
        propertyId: String(propertyId),
        propertyTitle: property.title || "",
        propertyImage: property.images || "",
        ownerId: property.ownerId ? String(property.ownerId) : "",
        ownerName: property.ownerName || "",
        ownerEmail: property.ownerEmail || "",
        tenantId: tenant.id,
        tenantName: tenant.name,
        tenantEmail: tenant.email,
        moveInDate: moveInDate.toString(),
        contactNumber: contactNumber.toString(),
        additionalNotes,
      },
      success_url: `${origin}/home/allProperties/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/home/allProperties/${propertyId}`,
    });

    // Native form POST hoyeche (fetch na), tai redirect 303 e e e browser navigate korbe
    return NextResponse.redirect(checkoutSession.url, 303);
  } catch (error) {
    console.error("Checkout session creation error:", error);
    return NextResponse.json(
      { message: "Failed to start payment. Please try again." },
      { status: 500 }
    );
  }
}