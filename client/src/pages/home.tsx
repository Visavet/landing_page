import { Link, useLocation } from "wouter";
import { 
  Battery, 
  Signal, 
  Wifi, 
  CheckCircle2, 
  ShieldCheck, 
  Download,
  Info,
  Menu,
  X as XIcon,
  User
} from "lucide-react";
import logoImg from "@assets/Pink_Black_and_White_Pixelated_Pixel_Dust_Marketing_Agency_Log_1766923995371.png";
import xLogo from "@assets/X_logo_1766920324567.png";
import linkedInLogo from "@assets/LinkedIn_logo_1766920324568.png";
import instagramLogo from "@assets/1_1766923167507.png";
import redditLogo from "@assets/2_1766923167508.png";
import facebookLogo from "@assets/3_1766923167509.png";
import planeImage from "@assets/download_(24)_1766925695539.jpg";
import reportOverview from "@assets/88b3d51f-8147-4e27-9864-d93b0e1c8ef8_1766964196577.png";
import instagramReport from "@assets/Screenshot_2025-12-29_044603_1766964207637.png";
import sampleReportPdf from "@assets/Visavet_demo_report_1766969533815.pdf";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect, useRef } from "react";

const faqData = [
  {
    question: "Is this an AI-generated report?",
    answer: "No. We use technology to surface patterns such as sentiment signals, keyword clusters, timeline overlaps, and cross-platform inconsistencies.\n\nEvery surfaced signal is then reviewed by a human analyst who evaluates context, intent, and how the content may be interpreted without your explanation.\n\nThe final report is written manually and reflects judgment — not automation."
  },
  {
    question: "What exactly do you analyze?",
    answer: "We analyze your publicly visible digital presence across declared platforms, including posts, bios, interactions, timelines, and cross-platform consistency.\n\nThis includes both signal detection (what stands out) and narrative alignment (how your online story reads as a whole)."
  },
  {
    question: "How long does the review take?",
    answer: "Most reports are delivered within 4–5 hours.\n\nThis allows sufficient time for both technology-assisted analysis and careful human evaluation, without rushing or auto-generating results."
  },
  {
    question: "Is this a one-time payment?",
    answer: "Yes. VisaVet is a one-time payment.\n\nAfter your report is delivered, you can return to the portal to request clarifications, follow-up analysis, or future reviews without paying again."
  },
  {
    question: "Can I use this service again in the future?",
    answer: "Yes. Your access remains open.\n\nIf your online presence changes or you apply for another visa later, you can request an updated analysis through the same portal."
  },
  {
    question: "Will this guarantee my visa approval?",
    answer: "No service can guarantee visa outcomes.\n\nVisaVet helps reduce uncertainty by identifying how your public digital presence may be interpreted during modern visa screening."
  },
  {
    question: "Do you access private messages or private accounts?",
    answer: "No. We do not access private messages, DMs, locked profiles, or anything not publicly visible.\n\nOnly public information and profiles you voluntarily disclose are reviewed."
  },
  {
    question: "Should I delete content before using VisaVet?",
    answer: "We generally advise against sudden deletions.\n\nThe report focuses on interpretive risk and preparation — helping you understand what may require explanation rather than prompting reactive changes."
  }
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative z-20 py-20 w-full bg-gradient-to-b from-[#050511] via-[#080818] to-[#050511]">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-16 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index 
                  ? 'bg-[#0d1025] shadow-[0_0_30px_rgba(59,130,246,0.15)]' 
                  : 'bg-white/5 hover:bg-white/8'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center gap-4"
              >
                <span className={`text-base md:text-lg font-semibold transition-colors duration-300 ${
                  openIndex === index ? 'text-white' : 'text-gray-200'
                }`}>
                  {faq.question}
                </span>
                <span className={`text-2xl text-gray-400 transition-transform duration-500 ease-in-out ${
                  openIndex === index ? 'rotate-45' : ''
                }`}>
                  +
                </span>
              </button>
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-8 pb-8 text-gray-400 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [counts, setCounts] = useState({ profiles: 0, years: 0, detection: 0 });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const duration = 2000;
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCounts({
        profiles: Math.floor(easeOutQuart * 1000),
        years: Math.floor(easeOutQuart * 50),
        detection: Math.floor(easeOutQuart * 92)
      });

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCounts({ profiles: 1000, years: 50, detection: 92 });
        setIsComplete(true);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted]);

  return (
    <section className="relative z-20 py-20 w-full bg-[#050511]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div 
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
        >
          {/* Metric 1 */}
          <div className="text-center">
            <div className={`text-5xl md:text-6xl font-bold text-white mb-3 transition-all duration-500 ${isComplete ? 'drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]' : ''}`}>
              {counts.profiles.toLocaleString()}+
            </div>
            <div className="text-lg font-semibold text-white mb-2">Profiles Reviewed</div>
            <p className={`text-gray-400 text-sm transition-opacity duration-700 ${isComplete ? 'opacity-100' : 'opacity-0'}`}>
              Across student, visitor, and employment-based visa categories
            </p>
          </div>

          {/* Metric 2 */}
          <div className="text-center">
            <div className={`text-5xl md:text-6xl font-bold text-white mb-3 transition-all duration-500 ${isComplete ? 'drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]' : ''}`}>
              {counts.years}+
            </div>
            <div className="text-lg font-semibold text-white mb-2">Years of Digital History Analyzed</div>
            <p className={`text-gray-400 text-sm transition-opacity duration-700 ${isComplete ? 'opacity-100' : 'opacity-0'}`}>
              Per applicant, across platforms and timelines
            </p>
          </div>

          {/* Metric 3 */}
          <div className="text-center">
            <div className={`text-5xl md:text-6xl font-bold text-white mb-3 transition-all duration-500 ${isComplete ? 'drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]' : ''}`}>
              {counts.detection}%
            </div>
            <div className="text-lg font-semibold text-white mb-2">Issue Detection Rate</div>
            <p className={`text-gray-400 text-sm transition-opacity duration-700 ${isComplete ? 'opacity-100' : 'opacity-0'}`}>
              Applicants discovered at least one clarification-worthy signal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PDFViewerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      <div 
        className="relative bg-[#0a0a18] border border-white/10 rounded-2xl w-full max-w-5xl h-[90vh] shadow-2xl animate-in zoom-in-95 duration-300 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">Sample Report</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors text-2xl leading-none"
          >
            &times;
          </button>
        </div>
        
        <div className="flex-1 p-4">
          <iframe
            src={sampleReportPdf}
            className="w-full h-full rounded-lg"
            title="Sample Report PDF"
          />
        </div>
      </div>
    </div>
  );
}

function WaitlistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      await fetch('https://formspree.io/f/mqekydzp', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      <div 
        className="relative bg-[#0a0a18] border border-white/10 rounded-2xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl leading-none z-10"
        >
          &times;
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-600/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">You're on the list.</h3>
            <p className="text-gray-400">We'll reach out with next steps.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-white mb-2">Join the Waitlist</h3>
            <p className="text-gray-400 text-sm mb-8">Get early access to your digital presence review.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Visa Type</label>
                <select
                  name="visa_type"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#0a0a18]">Select visa type</option>
                  <option value="B1/B2" className="bg-[#0a0a18]">B1/B2</option>
                  <option value="F1" className="bg-[#0a0a18]">F1</option>
                  <option value="H-1B/H-4" className="bg-[#0a0a18]">H-1B/H-4</option>
                  <option value="Other" className="bg-[#0a0a18]">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Primary Social Platform</label>
                <select
                  name="platform"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-[#0a0a18]">Select platform</option>
                  <option value="Instagram" className="bg-[#0a0a18]">Instagram</option>
                  <option value="LinkedIn" className="bg-[#0a0a18]">LinkedIn</option>
                  <option value="X/Twitter" className="bg-[#0a0a18]">X/Twitter</option>
                  <option value="Reddit" className="bg-[#0a0a18]">Reddit</option>
                  <option value="Multiple" className="bg-[#0a0a18]">Multiple</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Additional Context (optional)</label>
                <textarea
                  name="context"
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                  placeholder="Any specific concerns or timeline?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                data-testid="button-submit-waitlist"
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white py-4 rounded-lg font-semibold transition-colors mt-8 mb-2"
              >
                {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [location, setLocation] = useLocation();
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [openReview, setOpenReview] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const reviewItems = [
    { 
      title: "Public Posts & Content", 
      desc: "Visible posts, captions, and shared content that contribute to your public narrative.",
      detail: "We review publicly visible posts, captions, shared media, and text content across disclosed platforms. The focus is not on volume or frequency, but on the overall narrative created by what is visible.\n\nThis includes how topics, tone, and themes appear when viewed together rather than in isolation. Content is interpreted in context, accounting for time, platform norms, and relevance to your stated background.\n\nThe goal is to identify whether your public content presents a clear, neutral, and coherent public presence when reviewed at face value."
    },
    { 
      title: "Profile Bios & Descriptions", 
      desc: "How your self-descriptions align across platforms and with your application story.",
      detail: "We examine profile bios, headlines, and self-descriptions across platforms to assess how consistently you describe yourself publicly.\n\nThis includes education, professional identity, affiliations, and role descriptions, and whether these align with each other and with the information typically presented in visa applications.\n\nInconsistencies are not treated as errors by default, but are noted where they could create ambiguity or confusion in a formal review setting."
    },
    { 
      title: "Timeline Consistency", 
      desc: "Public activity patterns that align with stated education, work, and travel history.",
      detail: "We assess whether publicly visible activity patterns align broadly with your stated education, work history, and travel timeline.\n\nThis does not involve assumptions about private activity. Instead, we look at whether public signals create a reasonable and internally consistent timeline when viewed externally.\n\nThis step helps identify areas where additional clarification or context may be useful."
    },
    { 
      title: "Platform Cross-Alignment", 
      desc: "Whether different platforms tell a coherent and consistent story.",
      detail: "Different platforms often serve different purposes. We review how your presence appears when platforms are viewed together, rather than individually.\n\nThis includes differences in tone, identity presentation, and level of formality, and whether these variations still form a coherent overall profile.\n\nThe aim is not uniformity, but recognizability and consistency at a high level."
    },
    { 
      title: "Visible Affiliations", 
      desc: "Publicly visible groups, pages, or interests you are associated with.",
      detail: "We review publicly visible groups, pages, follows, and stated interests where accessible.\n\nThis review focuses on visibility and association, not private beliefs or intent. Affiliations are considered in context and without inference beyond what is publicly displayed.\n\nOnly clearly visible, public associations are included in this assessment."
    },
    { 
      title: "Interaction Patterns", 
      desc: "How public comments, reactions, and engagements appear in context.",
      detail: "We examine publicly visible comments, reactions, and engagements to understand how interactions appear when viewed collectively.\n\nThis includes tone, frequency, and context, without attempting to interpret private meaning or intent.\n\nThe purpose is to assess whether public interactions contribute to a stable and professional outward presence."
    },
    { 
      title: "Name & Identity Signals", 
      desc: "Username choices, naming consistency, and recognizability across platforms.",
      detail: "We review usernames, display names, and profile identifiers to understand how easily your identity can be recognized and linked across platforms.\n\nThis includes name consistency, recognizability, and whether profiles clearly appear to belong to the same individual.\n\nThis step helps assess clarity of public identity, not exposure level."
    },
    { 
      title: "Overall Public Visibility", 
      desc: "The level and nature of what is publicly accessible at the time of review.",
      detail: "We assess the overall level of public exposure at the time of review — what is visible, how easily accessible it is, and how it appears when viewed as a whole.\n\nThis is not a judgment of privacy choices. Instead, it documents the scope of publicly accessible information and how it presents externally.\n\nThe outcome is a neutral visibility snapshot rather than a score or label."
    },
  ];

  return (
    <div className="min-h-screen relative flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto w-full backdrop-blur-sm bg-[#050511]/90 md:bg-[#050511]/50 md:backdrop-blur-sm border-b border-white/5 md:border-none transition-all duration-300">
        <div className="flex items-center gap-8 hidden md:flex">
          <button onClick={() => scrollToSection('how-it-works')} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">How It Works</button>
          <button onClick={() => scrollToSection('what-we-review')} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">What We Review</button>
          <button onClick={() => scrollToSection('sample-report')} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Sample Report</button>
          <button onClick={() => scrollToSection('reviews')} className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Client Reviews</button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden text-gray-300 cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <XIcon size={24} /> : <Menu size={24} />}
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={logoImg} alt="VisaVet Logo" className="w-10 h-10 object-contain rounded-md" />
          <span className="font-bold text-lg tracking-tight hidden md:block">VisaVet</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setWaitlistOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all shadow-lg shadow-blue-900/20"
          >
            Request Review
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050511] pt-24 px-6 md:hidden animate-in slide-in-from-top-10 duration-200">
           <div className="flex flex-col gap-6 text-lg">
              <button onClick={() => scrollToSection('how-it-works')} className="text-left text-gray-300 hover:text-white border-b border-white/10 pb-4">How It Works</button>
              <button onClick={() => scrollToSection('what-we-review')} className="text-left text-gray-300 hover:text-white border-b border-white/10 pb-4">What We Review</button>
              <button onClick={() => scrollToSection('sample-report')} className="text-left text-gray-300 hover:text-white border-b border-white/10 pb-4">Sample Report</button>
              <button onClick={() => scrollToSection('reviews')} className="text-left text-gray-300 hover:text-white border-b border-white/10 pb-4">Client Reviews</button>
           </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center pt-32 pb-24 relative z-10 px-4 w-full min-h-[90vh]">
        {/* Hero Text */}
        <div className="text-center max-w-4xl mx-auto mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 z-30 relative">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            See What Your<br />
            Online Presence Signals<br />
            for your <span className="text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]">VISA.</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
            A professional review of your public online presence
            to understand how it may be viewed during your US visa screening
            and identify any signals that could raise questions.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button 
              onClick={() => setWaitlistOpen(true)}
              className="bg-white text-black px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
            >
              Request Review
            </button>
            <button 
              onClick={() => setPdfViewerOpen(true)}
              className="glass text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-white/10 transition-colors"
            >
              View Sample
            </button>
          </div>
        </div>

        {/* Phone Mockup */}
        <div id="sample-report" className="relative mt-4 z-20 w-[300px] md:w-[340px] animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-200">
          {/* Phone Frame */}
          <div className="bg-[#0a0a16] rounded-[3.5rem] p-3 border-[6px] border-[#2a2a40] shadow-2xl relative overflow-hidden ring-1 ring-white/10">
            {/* Screen */}
            <div className="bg-[#0f172a] h-[640px] rounded-[2.8rem] relative overflow-hidden flex flex-col">
              
              {/* Internal Screen Background - Deep Blue Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-[#0f172a] to-[#0f172a] z-0"></div>
              
              {/* Status Bar */}
              <div className="relative z-10 px-6 pt-5 flex justify-between items-center text-white text-xs font-medium">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <Signal size={14} />
                  <Wifi size={14} />
                  <Battery size={14} />
                </div>
              </div>

              {/* App Content */}
              <div className="relative z-10 p-5 mt-4 space-y-4 flex flex-col h-full">
                
                {/* Header Card */}
                <div className="bg-blue-600 rounded-2xl p-4 text-white shadow-lg shadow-blue-900/20 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-3 opacity-10">
                     <ShieldCheck size={64} />
                   </div>
                   <div className="relative z-10">
                     <div className="text-xs text-blue-200 uppercase tracking-wider font-semibold mb-1">Status: Completed</div>
                     <div className="font-mono text-sm opacity-80 mb-2">Applicant ID: VV-1047</div>
                     <div className="text-xs text-blue-100">Review Period: Last 5 years</div>
                   </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-2 gap-3">
                   {/* Coverage Metric */}
                   <div className="glass-card rounded-2xl p-3 flex flex-col justify-between border border-white/5">
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Public Content</div>
                      <div className="mt-2">
                        <div className="text-2xl font-bold text-white">5</div>
                        <div className="text-[10px] text-blue-300">Platforms found</div>
                      </div>
                      <div className="mt-2 flex gap-1">
                        <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                        <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                        <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                      </div>
                   </div>

                   {/* Risk Metric */}
                   <div className="glass-card rounded-2xl p-3 flex flex-col justify-between border border-white/5">
                      <div className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">Risk Signals</div>
                      <div className="mt-2">
                        <div className="text-2xl font-bold text-green-400">Low</div>
                        <div className="text-[10px] text-gray-400">Observed</div>
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-[10px] text-green-400">
                        <CheckCircle2 size={10} />
                        <span>Clear</span>
                      </div>
                   </div>
                </div>

                {/* Profile Consistency Card */}
                <div className="glass-card rounded-2xl p-4 border border-white/5">
                   <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xs font-semibold text-gray-200">Profile Consistency</h3>
                      <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">94% Match</span>
                   </div>
                   <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Biographical Data</span>
                        <div className="flex gap-0.5">
                           {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-1 bg-blue-500 rounded-sm"></div>)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Employment History</span>
                         <div className="flex gap-0.5">
                           {[1,2,3,4].map(i => <div key={i} className="w-4 h-1 bg-blue-500 rounded-sm"></div>)}
                           <div className="w-4 h-1 bg-gray-700 rounded-sm"></div>
                        </div>
                      </div>
                   </div>
                </div>

                 {/* Platforms Strip */}
                <div className="glass-card rounded-2xl p-3 border border-white/5 flex items-center justify-between">
                   <div className="text-[10px] text-gray-400 font-medium rotate-180" style={{writingMode: 'vertical-rl'}}>INCLUDED</div>
                   <div className="h-8 w-[1px] bg-white/10 mx-1"></div>
                   <div className="flex-1 flex justify-around items-center px-1">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden bg-black p-0.5">
                        <img src={xLogo} alt="X" className="w-full h-full object-contain invert" />
                      </div>
                      <div className="w-6 h-6 rounded-md flex items-center justify-center overflow-hidden">
                        <img src={instagramLogo} alt="Instagram" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-6 h-6 rounded-sm flex items-center justify-center overflow-hidden">
                        <img src={linkedInLogo} alt="LinkedIn" className="w-full h-full object-contain" />
                      </div>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden">
                        <img src={facebookLogo} alt="Facebook" className="w-full h-full object-cover" />
                      </div>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden">
                         <img src={redditLogo} alt="Reddit" className="w-full h-full object-cover transform scale-110" />
                      </div>
                   </div>
                </div>

                {/* Download Button */}
                <div className="mt-auto pb-8">
                  <button className="w-full bg-white text-black py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-lg">
                    <Download size={16} />
                    Download Full Review (PDF)
                  </button>
                </div>

              </div>

              {/* Bottom Nav on Phone */}
              <div className="absolute bottom-2 left-0 right-0 px-8 flex justify-center items-center text-white/50 pb-2">
                 <div className="w-32 h-1 bg-white/20 rounded-full"></div>
              </div>

            </div>
             {/* Notch */}
             <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-[#0a0a16] rounded-b-2xl z-20 flex items-end justify-center pb-1">
                <div className="w-16 h-1 bg-gray-800/50 rounded-full"></div>
             </div>
          </div>
        </div>

        {/* Giant Background Text */}
        <div className="fixed bottom-[-6vw] left-0 right-0 text-center pointer-events-none z-0 select-none w-full flex justify-center">
          <h1 className="text-[26vw] font-bold text-white leading-none tracking-tighter opacity-100 whitespace-nowrap">
            VisaVet
          </h1>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-[#050511] relative z-20 py-12 md:py-16 w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] md:aspect-[4/5] w-full max-w-md mx-auto md:mx-0">
               <img 
                 src={planeImage} 
                 alt="Plane flying between buildings" 
                 className="absolute inset-0 w-full h-full object-cover grayscale opacity-90 hover:opacity-100 transition-opacity duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050511] via-transparent to-transparent opacity-30"></div>
            </div>

            {/* Right Column: Text Steps */}
            <div className="relative">
              {/* Ambient Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-900/10 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="relative z-10 space-y-16">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    How VisaVet Works
                  </h2>
                  <p className="text-blue-400 text-sm md:text-base font-medium mb-4">
                    Not an automated scan or AI summary.
                  </p>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed opacity-0 animate-in slide-in-from-left-3 fade-in duration-700 fill-mode-forwards" style={{ animationDelay: '150ms' }}>
                    Each review combines technology-assisted analysis with careful human evaluation, reflecting how modern visa screening interprets public digital signals.
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Step 1 */}
                  <Dialog open={openStep === 1} onOpenChange={(open) => setOpenStep(open ? 1 : null)}>
                    <DialogTrigger asChild>
                      <div className="group cursor-pointer rounded-xl p-6 transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] border border-transparent hover:border-white/10">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Tell Us Your Context</h3>
                          <p className="text-gray-400 text-base leading-relaxed max-w-sm group-hover:text-gray-300 transition-colors">
                            You share your background, visa type, and public profiles — the same way an officer sees your case.
                          </p>
                          <div className="pt-2 flex items-center text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                             <Info size={14} className="mr-2" /> Learn more
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-white text-black border-none max-w-lg p-8 rounded-2xl">
                      <div className="space-y-6">
                         <h3 className="text-2xl font-bold">Tell Us Your Context</h3>
                         
                         <div className="space-y-4">
                            <div>
                              <h4 className="font-bold text-sm uppercase tracking-wider text-blue-600 mb-2">Why this matters</h4>
                              <p className="text-gray-700 leading-relaxed">Visa screening is contextual. The same online activity can be interpreted very differently depending on visa category, travel history, and stated intent.</p>
                            </div>
                            
                            <div>
                              <h4 className="font-bold text-sm uppercase tracking-wider text-blue-600 mb-2">What you provide</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                <li>Visa category you’re applying for</li>
                                <li>High-level purpose of travel</li>
                                <li>Public social media platforms used</li>
                                <li>Optional context you would otherwise explain in an interview</li>
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-bold text-sm uppercase tracking-wider text-blue-600 mb-2">How this is used</h4>
                              <p className="text-gray-700 leading-relaxed">This information frames how your public digital presence is interpreted — not judged in isolation.</p>
                            </div>
                         </div>
                         
                         <div className="pt-4 flex justify-end">
                            <button onClick={() => setOpenStep(null)} className="text-sm font-semibold text-gray-500 hover:text-black transition-colors">Close</button>
                         </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Step 2 */}
                  <Dialog open={openStep === 2} onOpenChange={(open) => setOpenStep(open ? 2 : null)}>
                    <DialogTrigger asChild>
                      <div className="group cursor-pointer rounded-xl p-6 transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] border border-transparent hover:border-white/10">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Structured Digital Review</h3>
                          <p className="text-gray-400 text-base leading-relaxed max-w-sm group-hover:text-gray-300 transition-colors">
                            Your public online presence is reviewed the way modern screening systems interpret it.
                          </p>
                           <div className="pt-2 flex items-center text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                             <Info size={14} className="mr-2" /> Learn more
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-white text-black border-none max-w-lg p-8 rounded-2xl">
                       <div className="space-y-6">
                         <h3 className="text-2xl font-bold">Structured Digital Review</h3>
                         
                         <div className="space-y-4">
                            <div>
                              <h4 className="font-bold text-sm uppercase tracking-wider text-blue-600 mb-2">How the review is done</h4>
                              <p className="text-gray-700 leading-relaxed">We combine automated pattern analysis with human evaluation to review your publicly visible digital footprint.</p>
                            </div>
                            
                            <div>
                              <h4 className="font-bold text-sm uppercase tracking-wider text-blue-600 mb-2">What is examined</h4>
                              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                <li>Consistency across platforms</li>
                                <li>Public biographical signals</li>
                                <li>Timeline alignment</li>
                                <li>Language tone and associations</li>
                                <li>Public visibility and discoverability</li>
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-bold text-sm uppercase tracking-wider text-blue-600 mb-2">What this is not</h4>
                              <p className="text-gray-700 leading-relaxed">This is not keyword hunting, sentiment scoring, or automated flagging. Context and interpretation matter.</p>
                            </div>
                         </div>
                         
                         <div className="pt-4 flex justify-end">
                            <button onClick={() => setOpenStep(null)} className="text-sm font-semibold text-gray-500 hover:text-black transition-colors">Close</button>
                         </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Step 3 */}
                  <Dialog open={openStep === 3} onOpenChange={(open) => setOpenStep(open ? 3 : null)}>
                    <DialogTrigger asChild>
                      <div className="group cursor-pointer rounded-xl p-6 transition-all duration-300 hover:bg-white/5 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] border border-transparent hover:border-white/10">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Receive a Human-Written Report</h3>
                          <p className="text-gray-400 text-base leading-relaxed max-w-sm group-hover:text-gray-300 transition-colors">
                            You receive a written report — clear, calm, and actionable.
                          </p>
                           <div className="pt-2 flex items-center text-blue-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                             <Info size={14} className="mr-2" /> Learn more
                          </div>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-white text-black border-none max-w-lg p-8 rounded-2xl">
                       <div className="space-y-6">
                         <h3 className="text-2xl font-bold">Receive a Human-Written Report</h3>
                         
                         <div className="space-y-4">
                            <div>
                              <h4 className="font-bold text-sm uppercase tracking-wider text-blue-600 mb-2">What you receive</h4>
                              <p className="text-gray-700 leading-relaxed mb-2">A structured report outlining:</p>
                              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                                <li>Observations (what is visible)</li>
                                <li>Consistency checks (what aligns or conflicts)</li>
                                <li>Advisory notes (what to be mindful of)</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-bold text-sm uppercase tracking-wider text-blue-600 mb-2">How it helps</h4>
                              <p className="text-gray-700 leading-relaxed">The report helps you understand how your public presence may appear during visa screening — before it’s evaluated officially.</p>
                            </div>

                            <div>
                              <h4 className="font-bold text-sm uppercase tracking-wider text-blue-600 mb-2">What we don’t do</h4>
                              <p className="text-gray-700 leading-relaxed">We don’t predict outcomes, assign scores, or promise approvals.</p>
                            </div>
                         </div>
                         
                         <div className="pt-4 flex justify-end">
                            <button onClick={() => setOpenStep(null)} className="text-sm font-semibold text-gray-500 hover:text-black transition-colors">Close</button>
                         </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Sample Report Preview Section */}
      <section id="sample-report-preview" className="relative z-20 py-8 w-full bg-[#050511] overflow-hidden">
        <div className="relative max-w-5xl mx-auto h-[550px] flex justify-center items-center px-4">
          {/* Back Image (Instagram Review) - more visible */}
          <img
             src={instagramReport}
             alt="Instagram Deep-Dive Review"
             className="absolute w-[75%] max-w-[700px] rounded-lg shadow-2xl transform -rotate-8 translate-x-24 md:translate-x-32 -translate-y-8 opacity-80"
          />
          {/* Front Image (Overview) */}
          <img
             src={reportOverview}
             alt="Public Digital Presence Assessment Report"
             className="absolute w-[75%] max-w-[700px] rounded-lg shadow-2xl transform rotate-2 -translate-x-16 md:-translate-x-24 translate-y-4 z-10"
          />

          {/* Gradient Blur Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050511] via-[#050511]/70 to-transparent z-20 flex items-end justify-center pb-16">
             <a 
               href={sampleReportPdf}
               download="VisaVet_Sample_Report.pdf"
               className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2"
             >
               <Download size={18} />
               Download sample report
             </a>
          </div>
        </div>
      </section>

      {/* What We Review Section */}
      <section id="what-we-review" className="relative z-20 py-16 w-full bg-gradient-to-b from-[#050511] via-[#0a0f2e] to-[#050511]">
         <div className="max-w-7xl mx-auto px-6 md:px-12">
           <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-12 text-center md:text-left">
             What We Review
           </h2>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviewItems.map((item, index) => (
                <Dialog key={index} open={openReview === index} onOpenChange={(open) => setOpenReview(open ? index : null)}>
                  <DialogTrigger asChild>
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-[0_0_25px_rgba(59,130,246,0.25)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-500 cursor-pointer min-h-[160px] flex flex-col justify-center border border-blue-400/20">
                      <h3 className="text-black font-bold text-sm mb-3">{item.title}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-white text-black border-none max-w-lg p-8 rounded-2xl">
                     <div className="space-y-4">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                          {item.detail}
                        </div>
                        <div className="pt-4 flex justify-end">
                          <button onClick={() => setOpenReview(null)} className="text-sm font-semibold text-gray-500 hover:text-black transition-colors">Close</button>
                        </div>
                     </div>
                  </DialogContent>
                </Dialog>
              ))}
           </div>
         </div>
      </section>

      {/* Metrics Section */}
      <MetricsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Client Reviews Section */}
      <section id="reviews" className="relative z-20 py-16 w-full bg-[#050511] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
           <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white text-center md:text-left">
             Client Reviews
           </h2>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
           <div className="flex animate-marquee hover:[animation-play-state:paused] w-max gap-8 px-8">
              {[
                { quote: "The process felt thoughtful and measured. The report didn’t rush to conclusions, which made it easier to trust.", name: "Ananya R.", role: "F-1 Applicant" },
                { quote: "What stood out was the context. It wasn’t just about posts, but how everything fits together.", name: "Divesh K.", role: "H-1B Renewal" },
                { quote: "This felt closer to an advisory service than a tool. That mattered to us.", name: "Rohit A.", role: "Parent of Graduate Student" },
                { quote: "Professional and discreet. They found an old account I had completely forgotten about.", name: "Sarah M.", role: "O-1 Applicant" },
                { quote: "Clear, actionable advice. I feel much more prepared for my interview now.", name: "Michael T.", role: "B1/B2 Visitor" },
                { quote: "The process felt thoughtful and measured. The report didn’t rush to conclusions, which made it easier to trust.", name: "Ananya R.", role: "F-1 Applicant" },
                { quote: "What stood out was the context. It wasn’t just about posts, but how everything fits together.", name: "Divesh K.", role: "H-1B Renewal" },
                { quote: "This felt closer to an advisory service than a tool. That mattered to us.", name: "Rohit A.", role: "Parent of Graduate Student" },
              ].map((review, i) => (
                <div key={i} className="bg-blue-600 border border-blue-500/30 shadow-[0_0_30px_rgba(255,255,255,0.15)] rounded-xl p-8 w-[450px] flex-shrink-0 transition-transform hover:scale-[1.01]">
                   <p className="text-white text-base leading-relaxed mb-6 font-medium">"{review.quote}"</p>
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/50 flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">{review.name}</div>
                        <div className="text-blue-200 text-xs uppercase tracking-wider">{review.role}</div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />

      {/* PDF Viewer Modal */}
      <PDFViewerModal isOpen={pdfViewerOpen} onClose={() => setPdfViewerOpen(false)} />

    </div>
  );
}