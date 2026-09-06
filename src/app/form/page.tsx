"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import {
  Globe2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Shield,
  Stethoscope,
  MapPin,
  CalendarClock,
  Target,
  Mail,
  FileCheck,
  Loader2,
} from "lucide-react";
import {
  FormData,
  PROCEDURES,
  TIMELINES,
  PRIORITIES,
} from "@/lib/form-data";

const TOTAL_STEPS = 6;

const STEP_META = [
  { icon: Stethoscope, label: "Procedure", title: "What procedure are you considering?" },
  { icon: MapPin, label: "Location", title: "Where will you be departing from?" },
  { icon: CalendarClock, label: "Timeline", title: "What is your ideal timeline?" },
  { icon: Target, label: "Priority", title: "What matters most to you?" },
  { icon: Mail, label: "Email", title: "Where should we send your report?" },
  { icon: FileCheck, label: "Confirm", title: "Review & confirm your details" },
];

export default function IntakeFormPage() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    procedure: "",
    departureCity: "",
    timeline: "",
    priority: "",
    email: "",
    disclaimer: false,
  });

  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const canAdvance = (): boolean => {
    switch (step) {
      case 0:
        return formData.procedure !== "";
      case 1:
        return formData.departureCity.trim().length >= 2;
      case 2:
        return formData.timeline !== "";
      case 3:
        return formData.priority !== "";
      case 4:
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 5:
        return formData.disclaimer;
      default:
        return false;
    }
  };

  const next = () => {
    if (canAdvance() && step < TOTAL_STEPS - 1) setStep((s) => s + 1);
  };

  const prev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    if (!canAdvance()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong. Please try again.");
        setIsSubmitting(false);
      }
    } catch {
      alert("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary-50/30 flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between py-4 px-6">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-600 to-teal-500 flex items-center justify-center">
              <Globe2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              Med<span className="gradient-text">Voyage</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Shield className="w-4 h-4 text-emerald-500" />
            256-bit SSL Encrypted
          </div>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center py-10 px-6">
        <div className="w-full max-w-2xl">
          {/* Step indicators */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              {STEP_META.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === step;
                const isDone = i < step;
                return (
                  <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isDone
                          ? "bg-emerald-500 text-white shadow-md"
                          : isActive
                          ? "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium hidden sm:block ${
                        isActive ? "text-primary-600" : isDone ? "text-emerald-600" : "text-slate-400"
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
            {/* Progress bar */}
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-teal-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Form card */}
          <div className="glass-card rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
            <div className="p-8 sm:p-10">
              <h2
                className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {STEP_META[step].title}
              </h2>
              <p className="text-sm text-slate-400 mb-8">
                Step {step + 1} of {TOTAL_STEPS}
              </p>

              {/* Step content */}
              <div className="min-h-[220px]">
                {step === 0 && (
                  <div className="grid gap-3">
                    {PROCEDURES.map((proc) => (
                      <button
                        key={proc.value}
                        type="button"
                        onClick={() => {
                          updateField("procedure", proc.value);
                        }}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                          formData.procedure === proc.value
                            ? "border-primary-500 bg-primary-50/50 shadow-md"
                            : "border-slate-150 bg-white hover:border-slate-300 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-800">{proc.label}</span>
                          {formData.procedure === proc.value && (
                            <CheckCircle2 className="w-5 h-5 text-primary-500" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <label className="label-text">Departure City</label>
                    <input
                      type="text"
                      className="input-field text-lg"
                      placeholder="e.g. London, Manchester, Birmingham"
                      value={formData.departureCity}
                      onChange={(e) => updateField("departureCity", e.target.value)}
                      autoFocus
                    />
                    <p className="text-xs text-slate-400 mt-3">
                      We&apos;ll use this to estimate flight costs and travel time.
                    </p>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid gap-3">
                    {TIMELINES.map((tl) => (
                      <button
                        key={tl.value}
                        type="button"
                        onClick={() => updateField("timeline", tl.value)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                          formData.timeline === tl.value
                            ? "border-primary-500 bg-primary-50/50 shadow-md"
                            : "border-slate-150 bg-white hover:border-slate-300 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-800">{tl.label}</span>
                          {formData.timeline === tl.value && (
                            <CheckCircle2 className="w-5 h-5 text-primary-500" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {step === 3 && (
                  <div className="grid gap-3">
                    {PRIORITIES.map((p) => (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => updateField("priority", p.value)}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                          formData.priority === p.value
                            ? "border-primary-500 bg-primary-50/50 shadow-md"
                            : "border-slate-150 bg-white hover:border-slate-300 hover:shadow-sm"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-slate-800">{p.label}</span>
                          {formData.priority === p.value && (
                            <CheckCircle2 className="w-5 h-5 text-primary-500" />
                          )}
                        </div>
                        <p className="text-sm text-slate-500">{p.description}</p>
                      </button>
                    ))}
                  </div>
                )}

                {step === 4 && (
                  <div>
                    <label className="label-text">Email Address</label>
                    <input
                      type="email"
                      className="input-field text-lg"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      autoFocus
                    />
                    <p className="text-xs text-slate-400 mt-3">
                      Your personalised report will be delivered to this address. We never share your data.
                    </p>
                  </div>
                )}

                {step === 5 && (
                  <div>
                    {/* Review summary */}
                    <div className="space-y-3 mb-8">
                      {[
                        {
                          label: "Procedure",
                          value: PROCEDURES.find((p) => p.value === formData.procedure)?.label,
                        },
                        { label: "Departure City", value: formData.departureCity },
                        {
                          label: "Timeline",
                          value: TIMELINES.find((t) => t.value === formData.timeline)?.label,
                        },
                        {
                          label: "Priority",
                          value: PRIORITIES.find((p) => p.value === formData.priority)?.label,
                        },
                        { label: "Email", value: formData.email },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 border border-slate-100"
                        >
                          <span className="text-sm text-slate-500">{item.label}</span>
                          <span className="text-sm font-semibold text-slate-800">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Disclaimer checkbox */}
                    <label className="flex items-start gap-3 p-4 rounded-xl border-2 border-slate-200 bg-amber-50/40 cursor-pointer transition-all hover:border-primary-300">
                      <input
                        type="checkbox"
                        checked={formData.disclaimer}
                        onChange={(e) => updateField("disclaimer", e.target.checked)}
                        className="mt-0.5 w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500 accent-primary-600"
                      />
                      <span className="text-sm text-slate-600 leading-relaxed">
                        I understand this is a <strong>logistical estimate</strong>, not medical advice.
                        MedVoyage provides cost and travel assessments only. Always consult a qualified
                        medical professional before making healthcare decisions.
                      </span>
                    </label>

                    {/* Price */}
                    <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary-50 to-teal-50 border border-primary-100 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">One-time assessment fee</p>
                        <p className="text-xs text-slate-400">Delivered to your inbox within hours</p>
                      </div>
                      <p className="text-2xl font-extrabold text-primary-700">£39</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div className="px-8 sm:px-10 py-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={prev}
                disabled={step === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  step === 0
                    ? "text-slate-300 cursor-not-allowed"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {step < TOTAL_STEPS - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  disabled={!canAdvance()}
                  className={`btn-primary !py-2.5 !px-6 !text-sm ${
                    !canAdvance() ? "opacity-50 cursor-not-allowed !transform-none !shadow-none" : ""
                  }`}
                >
                  <span className="flex items-center gap-2">
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canAdvance() || isSubmitting}
                  className={`btn-primary !py-2.5 !px-6 !text-sm ${
                    !canAdvance() || isSubmitting
                      ? "opacity-50 cursor-not-allowed !transform-none !shadow-none"
                      : ""
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        Pay £39 &amp; Get Report
                      </>
                    )}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Trust footer */}
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              Secure payment via Stripe
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              GDPR Compliant
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
