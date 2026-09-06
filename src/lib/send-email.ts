interface SendReportEmailParams {
  to: string;
  procedureName: string;
  pdfBuffer: Buffer;
}

export async function sendReportEmail({
  to,
  procedureName,
  pdfBuffer,
}: SendReportEmailParams): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "MedVoyage <reports@medvoyage.co.uk>",
        to: [to],
        subject: `Your MedVoyage Assessment — ${procedureName}`,
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <div style="display: inline-block; width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #2563eb, #14b8a6); margin-bottom: 16px;"></div>
              <h1 style="font-size: 24px; font-weight: 700; color: #0f172a; margin: 0;">MedVoyage</h1>
            </div>
            
            <div style="background: #f8fafc; border-radius: 16px; padding: 32px; border: 1px solid #e2e8f0; margin-bottom: 24px;">
              <h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0 0 8px 0;">
                Your Assessment is Ready! 🎉
              </h2>
              <p style="font-size: 15px; color: #64748b; line-height: 1.6; margin: 0;">
                Thank you for choosing MedVoyage. Your personalised medical tourism assessment
                for <strong style="color: #0f172a;">${procedureName}</strong> is attached to this email as a PDF.
              </p>
            </div>

            <div style="margin-bottom: 24px;">
              <h3 style="font-size: 14px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px 0;">
                Your report includes:
              </h3>
              <ul style="list-style: none; padding: 0; margin: 0;">
                ${[
                  "Estimated medical costs abroad",
                  "Travel & accommodation estimates",
                  "Total cost comparison vs. UK private healthcare",
                  "Potential savings breakdown",
                  "2 recommended JCI-accredited hospitals",
                  "Recovery timeline guidance",
                ]
                  .map(
                    (item) => `
                  <li style="font-size: 14px; color: #334155; padding: 6px 0; display: flex; align-items: center;">
                    <span style="color: #10b981; margin-right: 8px;">✓</span>
                    ${item}
                  </li>
                `
                  )
                  .join("")}
              </ul>
            </div>

            <div style="background: linear-gradient(135deg, #eff6ff, #f0fdfa); border-radius: 12px; padding: 20px; border: 1px solid #bfdbfe; margin-bottom: 24px;">
              <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0;">
                <strong style="color: #1e40af;">Important:</strong> This report provides logistical
                and cost estimates only. It does not constitute medical advice. Please consult a
                qualified healthcare professional before making any medical decisions.
              </p>
            </div>

            <div style="text-align: center; padding: 24px 0; border-top: 1px solid #e2e8f0;">
              <p style="font-size: 12px; color: #94a3b8; margin: 0;">
                © ${new Date().getFullYear()} MedVoyage. All rights reserved.
              </p>
              <p style="font-size: 12px; color: #94a3b8; margin: 4px 0 0 0;">
                This email was sent to ${to}
              </p>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: `MedVoyage_Assessment_${procedureName.replace(/[^a-zA-Z0-9]/g, "_")}.pdf`,
            content: pdfBuffer.toString("base64"),
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Resend API error:", errorData);
      return { success: false, error: errorData };
    }

    const data = await response.json();
    console.log("Email sent successfully:", data);
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
