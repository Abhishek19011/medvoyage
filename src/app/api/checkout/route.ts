import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { procedure, departureCity, timeline, priority, email } = body;

    // Validate required fields
    if (!procedure || !departureCity || !timeline || !priority || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: "MedVoyage — Personalised Medical Tourism Assessment",
              description: `Custom report for ${procedure.replace(/_/g, " ")} procedure`,
            },
            unit_amount: 3900, // £39.00 in pence
          },
          quantity: 1,
        },
      ],
      metadata: {
        procedure,
        departureCity,
        timeline,
        priority,
        email,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/form`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error("Checkout error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
