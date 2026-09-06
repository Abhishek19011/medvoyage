import Link from "next/link";
import {
  CheckCircle2,
  Mail,
  Clock,
  Globe2,
  ArrowRight,
  Shield,
} from "lucide-react";

export const metadata = {
  title: "Payment Successful — MedVoyage",
  description: "Your payment was successful. Your personalised medical tourism assessment report is being prepared.",
};

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex flex-col">
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
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center py-16 px-6">
        <div className="w-full max-w-lg text-center animate-fade-in">
          {/* Success icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-500/20 mb-8">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>

          <h1
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Payment Successful!
          </h1>

          <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-md mx-auto">
            Thank you for your purchase. Your personalised medical tourism assessment
            is being prepared by our team right now.
          </p>

          {/* Status cards */}
          <div className="space-y-4 mb-10">
            <div className="glass-card rounded-xl p-5 border border-slate-100 flex items-start gap-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">Check Your Inbox</h3>
                <p className="text-sm text-slate-500">
                  Your personalised PDF report will be sent to the email address you provided.
                  Check your spam folder if you don&apos;t see it.
                </p>
              </div>
            </div>

            <div className="glass-card rounded-xl p-5 border border-slate-100 flex items-start gap-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">Delivery Time</h3>
                <p className="text-sm text-slate-500">
                  Most reports are delivered within a few hours. Complex assessments may take
                  up to 24 hours.
                </p>
              </div>
            </div>

            <div className="glass-card rounded-xl p-5 border border-slate-100 flex items-start gap-4 text-left">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1">Your Data is Safe</h3>
                <p className="text-sm text-slate-500">
                  All information is encrypted and handled in accordance with GDPR.
                  We never share your data with third parties.
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors no-underline"
          >
            Return to Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
