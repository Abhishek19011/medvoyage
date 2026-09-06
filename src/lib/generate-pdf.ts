import { ProcedureEstimate } from "./procedure-data";

/**
 * Generates a professional PDF report as a Buffer using raw PDF construction.
 * No external PDF libraries required — builds a valid PDF from scratch.
 */
export async function generatePdfReport(
  estimate: ProcedureEstimate,
  departureCity: string,
  timeline: string,
  priority: string,
  email: string
): Promise<Buffer> {
  const totalAbroad =
    estimate.medicalCostAbroad +
    estimate.travelCost +
    estimate.accommodationCost;
  const savings = estimate.ukPrivateCost - totalAbroad;
  const savingsPercent = Math.round((savings / estimate.ukPrivateCost) * 100);

  const timelineLabel =
    timeline === "1_3_months"
      ? "1–3 months"
      : timeline === "3_6_months"
      ? "3–6 months"
      : "6+ months";

  const priorityLabel =
    priority === "lowest_cost"
      ? "Lowest Cost"
      : priority === "fastest"
      ? "Fastest"
      : "Premium Facility";

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Build PDF content using a stream-like approach
  const lines: string[] = [];
  let yPos = 750;
  const leftMargin = 50;
  const pageWidth = 595.28;
  const contentWidth = pageWidth - 100;

  // We'll use a simplified PDF builder
  const objects: string[] = [];
  let objectCount = 0;

  function addObject(content: string): number {
    objectCount++;
    objects.push(content);
    return objectCount;
  }

  // Object 1: Catalog
  addObject(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj`);

  // Object 2: Pages (will reference page object)
  addObject(`2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj`);

  // Build the content stream
  const contentLines: string[] = [];

  function addText(
    x: number,
    y: number,
    text: string,
    fontSize: number = 11,
    font: string = "/F1",
    r: number = 0.07,
    g: number = 0.09,
    b: number = 0.15
  ) {
    // Escape special PDF characters
    const escaped = text
      .replace(/\\/g, "\\\\")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)");
    contentLines.push(`${r} ${g} ${b} rg`);
    contentLines.push(`BT ${font} ${fontSize} Tf ${x} ${y} Td (${escaped}) Tj ET`);
  }

  function addRect(
    x: number,
    y: number,
    w: number,
    h: number,
    r: number,
    g: number,
    b: number
  ) {
    contentLines.push(`${r} ${g} ${b} rg`);
    contentLines.push(`${x} ${y} ${w} ${h} re f`);
  }

  function addLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    r: number = 0.88,
    g: number = 0.9,
    b: number = 0.92
  ) {
    contentLines.push(`${r} ${g} ${b} RG`);
    contentLines.push(`0.5 w ${x1} ${y1} m ${x2} ${y2} l S`);
  }

  // === HEADER BAR ===
  addRect(0, 780, pageWidth, 62, 0.09, 0.19, 0.42); // Dark blue header
  addText(leftMargin, 805, "MedVoyage", 22, "/F2", 1, 1, 1);
  addText(leftMargin, 790, "Personalised Medical Tourism Assessment", 9, "/F1", 0.85, 0.9, 1);
  addText(400, 800, today, 9, "/F1", 0.8, 0.85, 0.95);

  // === PATIENT INFO ===
  yPos = 755;
  addText(leftMargin, yPos, "ASSESSMENT DETAILS", 10, "/F2", 0.15, 0.38, 0.85);
  yPos -= 20;
  addLine(leftMargin, yPos + 5, pageWidth - leftMargin, yPos + 5);

  const infoItems = [
    ["Procedure:", estimate.procedureName],
    ["Departure City:", departureCity],
    ["Timeline:", timelineLabel],
    ["Priority:", priorityLabel],
    ["Email:", email],
  ];

  for (const [label, value] of infoItems) {
    addText(leftMargin, yPos - 5, label, 10, "/F2", 0.4, 0.45, 0.53);
    addText(200, yPos - 5, value, 10, "/F1", 0.07, 0.09, 0.15);
    yPos -= 18;
  }

  // === COST BREAKDOWN ===
  yPos -= 15;
  addText(leftMargin, yPos, "COST BREAKDOWN", 10, "/F2", 0.15, 0.38, 0.85);
  yPos -= 20;
  addLine(leftMargin, yPos + 5, pageWidth - leftMargin, yPos + 5);

  // Table header
  addRect(leftMargin, yPos - 12, contentWidth, 20, 0.94, 0.96, 0.98);
  addText(leftMargin + 10, yPos - 5, "Item", 9, "/F2", 0.4, 0.45, 0.53);
  addText(400, yPos - 5, "Amount", 9, "/F2", 0.4, 0.45, 0.53);
  yPos -= 25;

  const costRows = [
    ["Estimated Medical Cost", `£${estimate.medicalCostAbroad.toLocaleString()}`],
    ["Travel (Flights)", `£${estimate.travelCost.toLocaleString()}`],
    ["Accommodation (${estimate.stayDays} days)", `£${estimate.accommodationCost.toLocaleString()}`],
  ];

  for (const [item, amount] of costRows) {
    const displayItem = item.replace(
      "${estimate.stayDays}",
      String(estimate.stayDays)
    );
    addText(leftMargin + 10, yPos, displayItem, 10, "/F1", 0.2, 0.24, 0.33);
    addText(400, yPos, amount, 10, "/F1", 0.2, 0.24, 0.33);
    yPos -= 18;
    addLine(leftMargin + 10, yPos + 5, pageWidth - leftMargin - 10, yPos + 5, 0.93, 0.94, 0.96);
  }

  // Total row
  yPos -= 5;
  addRect(leftMargin, yPos - 10, contentWidth, 22, 0.09, 0.19, 0.42);
  addText(leftMargin + 10, yPos - 3, "TOTAL ESTIMATED COST ABROAD", 10, "/F2", 1, 1, 1);
  addText(400, yPos - 3, `£${totalAbroad.toLocaleString()}`, 11, "/F2", 1, 1, 1);

  // === UK COMPARISON ===
  yPos -= 35;
  addText(leftMargin, yPos, "UK PRIVATE COMPARISON", 10, "/F2", 0.15, 0.38, 0.85);
  yPos -= 20;
  addLine(leftMargin, yPos + 5, pageWidth - leftMargin, yPos + 5);

  addText(leftMargin + 10, yPos - 5, "UK Private Cost", 10, "/F1", 0.2, 0.24, 0.33);
  addText(400, yPos - 5, `£${estimate.ukPrivateCost.toLocaleString()}`, 10, "/F1", 0.2, 0.24, 0.33);
  yPos -= 20;

  addText(leftMargin + 10, yPos - 5, "Your Abroad Estimate", 10, "/F1", 0.2, 0.24, 0.33);
  addText(400, yPos - 5, `£${totalAbroad.toLocaleString()}`, 10, "/F1", 0.2, 0.24, 0.33);
  yPos -= 20;

  // Savings highlight
  addRect(leftMargin, yPos - 12, contentWidth, 24, 0.04, 0.45, 0.33);
  addText(
    leftMargin + 10,
    yPos - 4,
    `POTENTIAL SAVINGS: £${savings.toLocaleString()} (${savingsPercent}%)`,
    11,
    "/F2",
    1,
    1,
    1
  );

  // === HOSPITAL RECOMMENDATIONS ===
  yPos -= 40;
  addText(leftMargin, yPos, "RECOMMENDED HOSPITALS", 10, "/F2", 0.15, 0.38, 0.85);
  yPos -= 20;
  addLine(leftMargin, yPos + 5, pageWidth - leftMargin, yPos + 5);

  for (let i = 0; i < estimate.hospitals.length; i++) {
    const h = estimate.hospitals[i];
    yPos -= 5;
    addRect(leftMargin, yPos - 55, contentWidth, 60, 0.97, 0.98, 0.99);
    addText(leftMargin + 10, yPos - 5, `${i + 1}. ${h.name}`, 11, "/F2", 0.07, 0.09, 0.15);
    addText(leftMargin + 10, yPos - 20, `Location: ${h.location}  |  ${h.accreditation}  |  Rating: ${h.rating}`, 9, "/F1", 0.4, 0.45, 0.53);
    addText(leftMargin + 10, yPos - 35, h.specialNotes, 8, "/F1", 0.5, 0.55, 0.6);
    yPos -= 65;
  }

  // === RECOVERY INFO ===
  yPos -= 10;
  addText(leftMargin, yPos, "ADDITIONAL INFORMATION", 10, "/F2", 0.15, 0.38, 0.85);
  yPos -= 20;
  addLine(leftMargin, yPos + 5, pageWidth - leftMargin, yPos + 5);
  addText(leftMargin + 10, yPos - 5, `Estimated Stay: ${estimate.stayDays} days`, 10, "/F1", 0.2, 0.24, 0.33);
  yPos -= 18;
  addText(leftMargin + 10, yPos - 5, `Recovery Period: ${estimate.recoveryWeeks} weeks`, 10, "/F1", 0.2, 0.24, 0.33);

  // === DISCLAIMER ===
  yPos -= 35;
  addRect(leftMargin, yPos - 35, contentWidth, 40, 0.98, 0.97, 0.93);
  addText(
    leftMargin + 10,
    yPos - 8,
    "DISCLAIMER: This report provides logistical and cost estimates only.",
    8,
    "/F2",
    0.6,
    0.5,
    0.3
  );
  addText(
    leftMargin + 10,
    yPos - 20,
    "It does not constitute medical advice. Always consult a qualified healthcare",
    8,
    "/F1",
    0.55,
    0.5,
    0.45
  );
  addText(
    leftMargin + 10,
    yPos - 30,
    "professional before making any medical decisions.",
    8,
    "/F1",
    0.55,
    0.5,
    0.45
  );

  // === FOOTER ===
  addText(
    leftMargin,
    30,
    `MedVoyage | Generated on ${today} | Confidential`,
    7,
    "/F1",
    0.6,
    0.63,
    0.68
  );
  addText(pageWidth - 120, 30, "www.medvoyage.co.uk", 7, "/F1", 0.15, 0.38, 0.85);

  // Build content stream
  const contentStream = contentLines.join("\n");

  // Object 3: Page
  addObject(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} 841.89] /Contents 6 0 R /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> >>\nendobj`
  );

  // Object 4: Font (Helvetica)
  addObject(
    `4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj`
  );

  // Object 5: Font Bold (Helvetica-Bold)
  addObject(
    `5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj`
  );

  // Object 6: Content stream
  const streamBytes = Buffer.from(contentStream, "utf-8");
  addObject(
    `6 0 obj\n<< /Length ${streamBytes.length} >>\nstream\n${contentStream}\nendstream\nendobj`
  );

  // Build PDF
  const header = "%PDF-1.4\n%âãÏÓ\n";
  const offsets: number[] = [];
  let body = "";

  for (let i = 0; i < objects.length; i++) {
    offsets.push(header.length + body.length);
    body += objects[i] + "\n";
  }

  const xrefOffset = header.length + body.length;
  let xref = `xref\n0 ${objectCount + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets) {
    xref += `${String(offset).padStart(10, "0")} 00000 n \n`;
  }

  const trailer = `trailer\n<< /Size ${objectCount + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const pdf = header + body + xref + trailer;
  return Buffer.from(pdf, "binary");
}
