export interface ProcedureEstimate {
  procedureName: string;
  medicalCostAbroad: number;
  travelCost: number;
  accommodationCost: number;
  stayDays: number;
  ukPrivateCost: number;
  recoveryWeeks: number;
  hospitals: {
    name: string;
    location: string;
    accreditation: string;
    rating: string;
    specialNotes: string;
  }[];
}

// Priority multipliers
const PRIORITY_MULTIPLIERS: Record<string, number> = {
  lowest_cost: 0.85,
  fastest: 1.1,
  premium: 1.35,
};

// Timeline adjustments (% off accommodation for longer timelines = better deals)
const TIMELINE_ACCOMMODATION_DISCOUNT: Record<string, number> = {
  "1_3_months": 1.0,
  "3_6_months": 0.9,
  "6_plus_months": 0.8,
};

const BASE_ESTIMATES: Record<string, ProcedureEstimate> = {
  knee_replacement: {
    procedureName: "Knee Replacement",
    medicalCostAbroad: 4500,
    travelCost: 450,
    accommodationCost: 1200,
    stayDays: 10,
    ukPrivateCost: 12000,
    recoveryWeeks: 6,
    hospitals: [
      {
        name: "Liv Hospital",
        location: "Istanbul, Turkey",
        accreditation: "JCI Accredited",
        rating: "4.8 / 5",
        specialNotes:
          "One of Turkey's leading orthopaedic centres with robotic-assisted surgery capabilities.",
      },
      {
        name: "Apollo Hospitals",
        location: "Chennai, India",
        accreditation: "JCI & NABH Accredited",
        rating: "4.7 / 5",
        specialNotes:
          "Asia's largest integrated healthcare network with over 10,000 joint replacements performed.",
      },
    ],
  },
  hip_replacement: {
    procedureName: "Hip Replacement",
    medicalCostAbroad: 5200,
    travelCost: 450,
    accommodationCost: 1400,
    stayDays: 12,
    ukPrivateCost: 13500,
    recoveryWeeks: 8,
    hospitals: [
      {
        name: "Acibadem Healthcare Group",
        location: "Istanbul, Turkey",
        accreditation: "JCI Accredited",
        rating: "4.9 / 5",
        specialNotes:
          "Internationally renowned for orthopaedic surgery with minimally invasive techniques.",
      },
      {
        name: "Bumrungrad International Hospital",
        location: "Bangkok, Thailand",
        accreditation: "JCI Accredited",
        rating: "4.8 / 5",
        specialNotes:
          "Leading medical tourism destination with dedicated international patient centres.",
      },
    ],
  },
  dental: {
    procedureName: "Dental (Implants / Veneers)",
    medicalCostAbroad: 1800,
    travelCost: 300,
    accommodationCost: 600,
    stayDays: 7,
    ukPrivateCost: 6500,
    recoveryWeeks: 2,
    hospitals: [
      {
        name: "DentGroup Clinics",
        location: "Istanbul, Turkey",
        accreditation: "ISO 9001 Certified",
        rating: "4.9 / 5",
        specialNotes:
          "Turkey's premium dental chain with 30+ years experience and same-day implant technology.",
      },
      {
        name: "Dental Departures Partner Clinic",
        location: "Budapest, Hungary",
        accreditation: "ISO Certified",
        rating: "4.7 / 5",
        specialNotes:
          "Hungary is known as the 'Dental Capital of Europe' with EU-standard care at a fraction of the price.",
      },
    ],
  },
  ivf: {
    procedureName: "IVF Treatment",
    medicalCostAbroad: 3200,
    travelCost: 400,
    accommodationCost: 900,
    stayDays: 14,
    ukPrivateCost: 8000,
    recoveryWeeks: 2,
    hospitals: [
      {
        name: "Anadolu Medical Center",
        location: "Istanbul, Turkey",
        accreditation: "JCI Accredited",
        rating: "4.8 / 5",
        specialNotes:
          "Partnership with Johns Hopkins Medicine. High success rates in reproductive medicine.",
      },
      {
        name: "Institut Marquès",
        location: "Barcelona, Spain",
        accreditation: "EU Certified",
        rating: "4.9 / 5",
        specialNotes:
          "World-renowned fertility clinic with pioneering embryo incubation technology.",
      },
    ],
  },
  bariatric: {
    procedureName: "Bariatric Surgery",
    medicalCostAbroad: 3800,
    travelCost: 450,
    accommodationCost: 1100,
    stayDays: 10,
    ukPrivateCost: 10000,
    recoveryWeeks: 4,
    hospitals: [
      {
        name: "Memorial Hospital",
        location: "Istanbul, Turkey",
        accreditation: "JCI Accredited",
        rating: "4.8 / 5",
        specialNotes:
          "Leading bariatric centre with laparoscopic sleeve gastrectomy and gastric bypass expertise.",
      },
      {
        name: "KPJ Healthcare",
        location: "Kuala Lumpur, Malaysia",
        accreditation: "MSQH Accredited",
        rating: "4.6 / 5",
        specialNotes:
          "Malaysia's largest private healthcare network with comprehensive bariatric programmes.",
      },
    ],
  },
};

export function calculateEstimate(
  procedure: string,
  priority: string,
  timeline: string
): ProcedureEstimate | null {
  const base = BASE_ESTIMATES[procedure];
  if (!base) return null;

  const priorityMul = PRIORITY_MULTIPLIERS[priority] ?? 1.0;
  const accomDiscount = TIMELINE_ACCOMMODATION_DISCOUNT[timeline] ?? 1.0;

  return {
    ...base,
    medicalCostAbroad: Math.round(base.medicalCostAbroad * priorityMul),
    accommodationCost: Math.round(
      base.accommodationCost * priorityMul * accomDiscount
    ),
    travelCost: base.travelCost, // travel cost is independent of priority
  };
}
