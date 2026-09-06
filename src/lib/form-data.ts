export interface FormData {
  procedure: string;
  departureCity: string;
  timeline: string;
  priority: string;
  email: string;
  disclaimer: boolean;
}

export const PROCEDURES = [
  { value: "knee_replacement", label: "Knee Replacement" },
  { value: "hip_replacement", label: "Hip Replacement" },
  { value: "dental", label: "Dental (Implants / Veneers)" },
  { value: "ivf", label: "IVF Treatment" },
  { value: "bariatric", label: "Bariatric Surgery" },
] as const;

export const TIMELINES = [
  { value: "1_3_months", label: "1 – 3 months" },
  { value: "3_6_months", label: "3 – 6 months" },
  { value: "6_plus_months", label: "6+ months" },
] as const;

export const PRIORITIES = [
  {
    value: "lowest_cost",
    label: "Lowest Cost",
    description: "Maximise savings with quality-verified facilities",
  },
  {
    value: "fastest",
    label: "Fastest",
    description: "Shortest wait time, expedited scheduling",
  },
  {
    value: "premium",
    label: "Premium Facility",
    description: "Top-tier JCI-accredited hospitals",
  },
] as const;
