import { NextResponse } from "next/server";
import Stripe from "stripe";
import { calculateEstimate } from "@/lib/procedure-data";
import { generatePdfReport } from "@/lib/generate-pdf";
import { sendReportEmail } from "@/lib/send-email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata;

    if (!metadata) {
      console.error("No metadata found in session");
      return NextResponse.json({ received: true });
    }

    const { procedure, departureCity, timeline, priority, email } = metadata;

    console.log("Processing completed checkout for:", email);
    console.log("Procedure:", procedure, "Priority:", priority, "Timeline:", timeline);

    // Calculate customised estimates
    const estimate = calculateEstimate(procedure, priority, timeline);

    if (!estimate) {
      console.error("Could not calculate estimate for procedure:", procedure);
      return NextResponse.json({ received: true });
    }

    try {
      // Generate PDF report
      console.log("Generating PDF report...");
      const pdfBuffer = await generatePdfReport(
        estimate,
        departureCity,
        timeline,
        priority,
        email
      );
      console.log("PDF generated, size:", pdfBuffer.length, "bytes");

      // Send email with PDF attachment
      console.log("Sending email to:", email);
      const emailResult = await sendReportEmail({
        to: email,
        procedureName: estimate.procedureName,
        pdfBuffer,
      });

      if (emailResult.success) {
        console.log("Report email sent successfully to:", email);
      } else {
        console.error("Failed to send email:", emailResult.error);
      }
    } catch (error) {
      console.error("Error processing webhook:", error);
    }
  }

  return NextResponse.json({ received: true });
}
