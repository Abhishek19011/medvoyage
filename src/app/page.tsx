"use client";

import React from "react";
import {
  Shield,
  Clock,
  FileText,
  Globe2,
  ArrowRight,
  CheckCircle2,
  Star,
  Heart,
  TrendingDown,
  Plane,
  BadgeCheck,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";

/* ─────────────── Navbar ─────────────── */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-slate-100/60">
      <div className="container-narrow flex items-center justify-between py-4 px-6">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-teal-500 flex items-center justify-center shadow-md">
            <Globe2 className="w-5 h-5 text-white" />
          </div>
          <span
            className="text-xl font-bold tracking-tight text-slate-900"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Med<span className="gradient-text">Voyage</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#how-it-works" className="hover:text-primary-600 transition-colors">
            How It Works
          </a>
          <a href="#whats-included" className="hover:text-primary-600 transition-colors">
            What&apos;s Included
          </a>
          <a href="#pricing" className="hover:text-primary-600 transition-colors">
            Pricing
          </a>
        </div>
        <Link
          href="/form"
          className="btn-primary !py-2.5 !px-5 !text-sm !rounded-lg !shadow-md"
        >
          <span className="flex items-center gap-1.5">
            Get Started <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>
    </nav>
  );
}

/* ─────────────── Hero ─────────────── */
function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-primary-100/40 via-teal-50/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-teal-100/30 via-primary-50/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-radial from-primary-50/20 to-transparent rounded-full" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="container-narrow px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left content */}
        <div className="animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-6">
            <BadgeCheck className="w-4 h-4" />
            Trusted by 2,400+ patients across the UK
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-slate-900 mb-6 text-balance"
            style={{ fontFamily: "var(--font-display)" }}
          >
            World-Class Surgery.{" "}
            <span className="gradient-text">A Fraction of the Cost.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 leading-relaxed mb-8 max-w-lg">
            Get a personalised, data-driven assessment of your medical tourism
            options — including costs, timelines, and top-rated facilities
            abroad.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Link href="/form" className="btn-primary text-lg !px-8 !py-4 no-underline">
              <span className="flex items-center gap-2">
                Get Your Assessment
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
            <a
              href="#how-it-works"
              className="btn-secondary text-lg !px-8 !py-4 no-underline"
            >
              <span className="flex items-center gap-2">
                Learn More
                <ChevronDown className="w-5 h-5" />
              </span>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-500" />
              <span>Report in &lt; 24 hrs</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400" />
              <span>4.9/5 Rating</span>
            </div>
          </div>
        </div>

        {/* Right side — floating stats card */}
        <div className="relative animate-slide-up hidden lg:block">
          <div className="relative z-10">
            {/* Main card */}
            <div className="glass-card rounded-2xl p-8 shadow-xl border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Average Savings</p>
                  <p className="text-2xl font-bold text-slate-900">Up to 70%</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { procedure: "Knee Replacement", ukCost: "£12,000", abroad: "£4,500", saving: "63%" },
                  { procedure: "Dental Implants", ukCost: "£6,500", abroad: "£1,800", saving: "72%" },
                  { procedure: "IVF Treatment", ukCost: "£8,000", abroad: "£3,200", saving: "60%" },
                ].map((item) => (
                  <div
                    key={item.procedure}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50/80 border border-slate-100"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {item.procedure}
                      </p>
                      <p className="text-xs text-slate-400">
                        UK Private: {item.ukCost}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-600">
                        {item.abroad}
                      </p>
                      <p className="text-xs font-medium text-emerald-500">
                        Save {item.saving}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 glass-card rounded-xl px-4 py-3 shadow-lg border border-slate-100 animate-float">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                <span className="text-sm font-semibold text-slate-700">
                  JCI Accredited
                </span>
              </div>
            </div>

            {/* Floating badge 2 */}
            <div
              className="absolute -bottom-4 -left-4 glass-card rounded-xl px-4 py-3 shadow-lg border border-slate-100 animate-float"
              style={{ animationDelay: "2s" }}
            >
              <div className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-primary-500" />
                <span className="text-sm font-semibold text-slate-700">
                  Travel Included
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── How It Works ─────────────── */
function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Tell Us Your Needs",
      description:
        "Complete our simple intake form with your procedure, timeline, and priorities.",
      icon: FileText,
      color: "from-primary-500 to-primary-600",
    },
    {
      step: "02",
      title: "Secure Payment",
      description:
        "Pay a one-time fee of £39 — fully encrypted with Stripe. No subscriptions, no hidden costs.",
      icon: Shield,
      color: "from-teal-500 to-emerald-500",
    },
    {
      step: "03",
      title: "Receive Your Report",
      description:
        "Get a personalised PDF report sent to your inbox within hours, packed with data-driven insights.",
      icon: FileText,
      color: "from-primary-600 to-teal-500",
    },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-slate-50/50">
      <div className="container-narrow px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary-600 tracking-wide uppercase mb-3">
            Simple Process
          </p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How It Works
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Three simple steps to your personalised medical tourism assessment
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <div
              key={item.step}
              className="relative group"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="glass-card rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-xs font-bold text-primary-400 tracking-widest uppercase mb-2">
                  Step {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-slate-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── What's Included ─────────────── */
function WhatsIncluded() {
  const features = [
    {
      title: "Estimated Medical Costs",
      description:
        "Procedure-specific pricing from verified international hospitals and clinics.",
      icon: TrendingDown,
    },
    {
      title: "Travel & Accommodation",
      description:
        "Flight estimates, nearby hotel options, and local transport guidance.",
      icon: Plane,
    },
    {
      title: "Total Cost Comparison",
      description:
        "Side-by-side comparison of going abroad versus UK private healthcare costs.",
      icon: FileText,
    },
    {
      title: "Hospital Recommendations",
      description:
        "2 hand-picked, JCI-accredited hospitals with quality ratings and speciality info.",
      icon: Heart,
    },
    {
      title: "Timeline & Recovery",
      description:
        "Suggested travel dates, procedure duration, and recovery period estimates.",
      icon: Clock,
    },
    {
      title: "Potential Savings Report",
      description:
        "Exact savings breakdown showing how much you could save compared to UK private costs.",
      icon: BadgeCheck,
    },
  ];

  return (
    <section id="whats-included" className="section-padding">
      <div className="container-narrow px-6">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-teal-600 tracking-wide uppercase mb-3">
            Comprehensive Report
          </p>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What&apos;s Included in Your £39 Report
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            A detailed, personalised PDF covering everything you need to make an
            informed decision
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div
              key={feat.title}
              className="group relative glass-card rounded-2xl p-7 border border-slate-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-teal-50 border border-primary-100 flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110">
                <feat.icon className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {feat.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Pricing CTA ─────────────── */
function PricingCTA() {
  return (
    <section id="pricing" className="section-padding bg-slate-50/50">
      <div className="container-narrow px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 p-10 sm:p-16 text-center">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-teal-300 text-sm font-medium mb-6 backdrop-blur-sm">
              <Star className="w-4 h-4" />
              One-Time Payment — No Subscription
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Your Assessment, Just{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-primary-300">
                £39
              </span>
            </h2>

            <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
              One report. All the data. No ongoing charges, no hidden fees. Just
              a straightforward, personalised assessment delivered to your inbox.
            </p>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 text-sm text-slate-300">
              {[
                "Personalised PDF report",
                "Cost comparison vs UK",
                "2 hospital recommendations",
                "Travel & stay estimates",
                "Delivered in < 24 hours",
                "100% confidential",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" />
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/form"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-slate-900 bg-gradient-to-r from-teal-300 to-primary-300 rounded-xl shadow-2xl shadow-teal-500/20 transition-all duration-300 hover:shadow-teal-500/40 hover:-translate-y-1 no-underline"
            >
              Get Your Assessment Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Footer ─────────────── */
function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="container-narrow px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-600 to-teal-500 flex items-center justify-center">
              <Globe2 className="w-4 h-4 text-white" />
            </div>
            <span
              className="text-lg font-bold text-slate-900"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Med<span className="gradient-text">Voyage</span>
            </span>
          </div>

          <p className="text-sm text-slate-400 text-center">
            © {new Date().getFullYear()} MedVoyage. All rights reserved. This
            service provides logistical estimates, not medical advice.
          </p>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-slate-600 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-slate-600 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-slate-600 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── Landing Page ─────────────── */
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <WhatsIncluded />
        <PricingCTA />
      </main>
      <Footer />
    </>
  );
}
