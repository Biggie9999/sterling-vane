"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckCircle2, ChevronRight, Lock } from "lucide-react"

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
    else submitApplication()
  }

  const submitApplication = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1500)
  }

  if (success) {
    return (
      <div className="bg-brand-light min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-10 text-center border border-slate-200 shadow-smooth rounded-2xl">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Application Received</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Our principal team will review your application. If aligned, you will receive an invitation to access the investor portal within 48 hours.
          </p>
          <Link href="/" className="inline-block px-8 py-4 bg-brand-blue text-white rounded-lg font-semibold w-full hover:bg-slate-800 transition-colors shadow-sm">
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-brand-light min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Request Allocation</h1>
          <p className="text-slate-600">Step {step} of 4</p>
          
          <div className="flex justify-center mt-6 space-x-2">
            {[1,2,3,4].map((i) => (
              <div key={i} className={`h-1.5 w-16 rounded-full transition-colors ${i <= step ? 'bg-brand-accent' : 'bg-slate-200'}`}></div>
            ))}
          </div>
        </div>

        {/* Form Box */}
        <div className="bg-white border border-slate-200 p-8 md:p-12 rounded-2xl shadow-smooth relative overflow-hidden">
          
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Personal Information</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-accent rounded-lg text-slate-900" placeholder="James" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-accent rounded-lg text-slate-900" placeholder="Holden" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Corporate Email</label>
                  <input type="email" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-accent rounded-lg text-slate-900" placeholder="james@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                  <input type="tel" className="w-full bg-slate-50 border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-brand-accent rounded-lg text-slate-900" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Investment Profile</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-4">Select Target Allocation</label>
                  <div className="space-y-3">
                    {["$50,000 - $100,000", "$100,000 - $500,000", "$500,000 - $1,000,000", "$1,000,000+"].map((amt, i) => (
                      <label key={i} className="flex items-center p-4 border border-slate-200 cursor-pointer hover:border-brand-blue rounded-lg transition-colors group">
                        <input type="radio" name="amount" className="w-4 h-4 text-brand-blue border-slate-300 focus:ring-brand-blue" />
                        <span className="ml-3 text-slate-900 font-medium group-hover:text-brand-blue transition-colors">{amt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Accreditation Status</h2>
              <p className="text-slate-600 mb-6 text-sm bg-slate-50 p-4 border border-slate-100 rounded-lg flex items-start">
                <Lock className="w-4 h-4 mr-3 mt-0.5 shrink-0 text-slate-400" />
                The Sovereign Collection is a Regulation D Rule 506(c) offering. We are required by the SEC to verify the accredited status of all investors.
              </p>
              <div className="space-y-4">
                <label className="flex items-start p-4 border border-slate-200 cursor-pointer hover:border-brand-blue rounded-lg transition-colors group">
                  <input type="radio" name="accredited" className="w-4 h-4 mt-1 text-brand-blue border-slate-300 focus:ring-brand-blue shrink-0" />
                  <div className="ml-3">
                    <span className="block text-slate-900 font-bold mb-1 group-hover:text-brand-blue transition-colors">Individual Income</span>
                    <span className="text-sm text-slate-500 leading-relaxed">I have an individual net income in excess of $200k (or $300k with spouse) in each of the two most recent years.</span>
                  </div>
                </label>
                <label className="flex items-start p-4 border border-slate-200 cursor-pointer hover:border-brand-blue rounded-lg transition-colors group">
                  <input type="radio" name="accredited" className="w-4 h-4 mt-1 text-brand-blue border-slate-300 focus:ring-brand-blue shrink-0" />
                  <div className="ml-3">
                    <span className="block text-slate-900 font-bold mb-1 group-hover:text-brand-blue transition-colors">Net Worth</span>
                    <span className="text-sm text-slate-500 leading-relaxed">I have an individual net worth (or joint net worth with spouse) that exceeds $1,000,000, excluding primary residence.</span>
                  </div>
                </label>
                <label className="flex items-start p-4 border border-slate-200 cursor-pointer hover:border-brand-blue rounded-lg transition-colors group">
                  <input type="radio" name="accredited" className="w-4 h-4 mt-1 text-brand-blue border-slate-300 focus:ring-brand-blue shrink-0" />
                  <div className="ml-3">
                    <span className="block text-slate-900 font-bold mb-1 group-hover:text-brand-blue transition-colors">Entity / Trust</span>
                    <span className="text-sm text-slate-500 leading-relaxed">I am investing on behalf of an entity with assets exceeding $5,000,000.</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Final Review</h2>
              <div className="bg-slate-50 border border-slate-100 p-6 space-y-4 font-sans text-sm rounded-lg mb-8">
                <div className="flex justify-between border-b border-slate-200 pb-3">
                  <span className="text-slate-500">Applicant</span>
                  <span className="text-slate-900 font-bold">James Holden</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-3">
                  <span className="text-slate-500">Target Allocation</span>
                  <span className="text-slate-900 font-bold">$100,000 - $500,000</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-slate-500">Accreditation</span>
                  <span className="text-slate-900 font-bold">Net Worth {'>'} $1M</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                By submitting this application, I confirm under penalty of perjury that all information provided is accurate and I understand this is not an offer to sell securities.
              </p>
            </div>
          )}

          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center bg-white">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors">
                Back
              </button>
            ) : <div></div>}
            
            <button 
              onClick={handleNext}
              disabled={loading}
              className="px-8 py-3 bg-brand-blue text-white rounded-lg font-bold shadow-sm hover:bg-slate-800 transition-colors flex items-center disabled:opacity-50"
            >
              {loading ? "Processing..." : step === 4 ? "Submit Application" : "Continue"} 
              {step !== 4 && !loading && <ChevronRight className="w-4 h-4 ml-2" />}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
