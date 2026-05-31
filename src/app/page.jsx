"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Trophy,
  Users,
  Building2,
  ArrowRight,
  Star,
  ChevronRight,
  BookOpen,
  Award,
  Briefcase,
  Globe,
  Target,
  Phone,
  Calendar,
  Clock,
  Bell,
  CheckCircle,
  Play,
  Loader2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import InlinePhoneVerifier from "@/components/InlinePhoneVerifier";

const isOpeningRelated = (n) => {
  const keywords = ['opening', 'career', 'job', 'vacancy', 'hiring', 'recruitment', 'join us', 'walk-in', 'walkin', 'interview'];
  const text = `${n.title || ''} ${n.content || ''} ${n.category || ''}`.toLowerCase();
  return keywords.some(k => text.includes(k));
};

//  Hero Slides
const heroSlides = [
  {
    image: "/images/carousel/slide1.jpg",
    badge: "Admissions Open 2026",
    title: "Launching a New Era of Excellence in Ranchi",
    subtitle:
      "HITM Ranchi is shaping a strong future in Engineering, Management, and Technology with industry-focused learning and modern academic excellence.",
  },
  {
    image: "/images/carousel/slide2.jpg",
    badge: "Future-Ready Learning",
    title: "World-Class Infrastructure & Expert Faculty",
    subtitle:
      "Designed for the future, HITM Ranchi provides an environment where innovation meets ambition, practical exposure, and academic growth.",
  },
  {
    image: "/images/carousel/slide1.jpg",
    badge: "Premier Campus in Jharkhand",
    title: "Your Future Begins at HITM Ranchi",
    subtitle:
      "With 200+ global industry tie-ups, we ensure our students are ready for the global stage from day one.",
  },
];

const stats = [
  { icon: <Calendar size={24} />, number: "2026", label: "Admissions Session" },
  { icon: <Users size={24} />, number: "1440+", label: "Seat Capacity" },
  { icon: <BookOpen size={24} />, number: "16+", label: "Approved Courses" },
];

const programs = [
  {
    icon: <BookOpen className="text-white" size={24} />,
    name: "B.Tech Programs",
    desc: "4-Year Undergraduate Engineering (360 Seats)",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    courses: [
      "CSE (120)",
      "EEE (60)",
      "Civil (60)",
      "Mechanical (60)",
      "AI (30)",
      "Data Science (30)",
    ],
  },
  {
    icon: <Award className="text-white" size={24} />,
    name: "Management Studies",
    desc: "UG & PG Programs (360 Seats)",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800",
    courses: ["BBA (180)", "MBA (180)"],
  },
  {
    icon: <Briefcase className="text-white" size={24} />,
    name: "Diploma Programs",
    desc: "3-Year Polytechnic Diploma (360 Seats)",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800",
    courses: [
      "CSE (120)",
      "EEE (60)",
      "Civil (60)",
      "Mechanical (60)",
      "AI (30)",
      "Data Science (30)",
    ],
  },
  {
    icon: <GraduationCap className="text-white" size={24} />,
    name: "Computer Applications",
    desc: "UG & PG Programs (360 Seats)",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
    courses: ["BCA (180)", "MCA (180)"],
  },
];

const MONTHS_SHORT_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function eventIcon(iconName) {
  switch (iconName) {
    case "users":
      return <Users size={16} />;
    case "book":
      return <BookOpen size={16} />;
    case "briefcase":
      return <Briefcase size={16} />;
    case "trophy":
    default:
      return <Trophy size={16} />;
  }
}

// Notices and Events are now handled dynamically inside HomePage component
const DEFAULT_EVENTS = [
  {
    name: "",
    date: "",
    title: "",
    iconName: "",
  },
];

const testimonials = [
  {
    text: "HITM Ranchi is exactly what Jharkhand needed â€” a forward-thinking institute with world-class facilities and a curriculum designed for the 2026 industry standards.",
    name: "Dr. Ramesh Singh",
    role: "Education Consultant",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=hitm2",
  },
  {
    text: "The commitment to innovation and student-centric learning is evident in every aspect of HITM. Im excited to see the first batch of pioneers graduate.",
    name: "Sonal Verma",
    role: "Industry Expert",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=hitm1",
  },
  {
    text: "A campus that rivals the best in the country. HITM is set to redefine technical and management education in the region.",
    name: "Amit Kumar",
    role: "Tech Visionary",
    stars: 5,
    avatar: "https://i.pravatar.cc/150?u=hitm3",
  },
];

const quickLinks = [
  {
    icon: <Bell size={18} />,
    label: "Apply Online",
    href: "/admissions/apply?form=1",
  },
  { icon: <BookOpen size={18} />, label: "Notice Board", href: "/notice" },
  {
    icon: <Briefcase size={18} />,
    label: "Fee Payment",
    href: "/admissions/fee",
  },
  {
    icon: <Trophy size={18} />,
    label: "Photo Gallery",
    href: "/campus/gallery",
  },
  {
    icon: <Award size={18} />,
    label: "Scholarships",
    href: "/academics/scholarships",
  },
  { icon: <Building2 size={18} />, label: "Campus Tour", href: "/campus" },
  { icon: <Phone size={18} />, label: "Contact Us", href: "/contact" },
  {
    icon: <Calendar size={18} />,
    label: "Download Brochure",
    href: "/hitm.pdf",
  },
];

//  Hero Slider
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((c) => (c + 1) % heroSlides.length),
      5000,
    );
    return () => clearInterval(timer);
  }, []);
  const slide = heroSlides[current];

  return (
    <section className="relative h-[calc(100vh-100px)] min-h-[580px] overflow-hidden">
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            i === current ? "opacity-100" : "opacity-0",
          )}
        >
          <img
            src={s.image}
            alt={s.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-hitm-navy/80 to-hitm-red/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl animate-fade-up">
            <Badge
              variant="gold"
              className="mb-5 text-sm px-4 py-1.5 font-semibold uppercase tracking-wider"
            >
              <GraduationCap size={14} className="mr-1.5" /> {slide.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-white leading-tight mb-5 font-serif drop-shadow-lg">
              {slide.title}
            </h1>
            <p className="text-white/85 text-lg mb-8 leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button asChild variant="gold" size="lg" className="shadow-xl">
                <Link href="/admissions/apply?form=1">
                  Register Now <ArrowRight size={18} />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/50 text-white hover:bg-white/10 hover:text-white hover:border-white"
              >
                <Link href="/about" className="flex items-center gap-2">
                  <Play size={16} /> Know More
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:flex gap-8 bg-white/10 backdrop-blur-md rounded-2xl px-8 py-4 border border-white/20">
        {stats.map((s) => (
          <div key={s.label} className="text-center text-white">
            <div className="text-hitm-gold text-2xl font-black font-serif">
              {s.number}
            </div>
            <div className="text-xs text-white/75 uppercase tracking-wide mt-0.5">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-4 lg:bottom-36 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-2.5 rounded-full border-none transition-all cursor-pointer",
              i === current ? "w-8 bg-hitm-gold" : "w-2.5 bg-white/50",
            )}
          />
        ))}
      </div>
    </section>
  );
}

// Main Page
export default function HomePage() {
  const [enquiry, setEnquiry] = useState({ name: "", phone: "", program: "" });
  const [enquiryPhoneVerified, setEnquiryPhoneVerified] = useState(false);
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Increment visit counter only on homepage load
  useEffect(() => {
    fetch('/api/visits', { method: 'POST' }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!db) return;
    // Real-time Notices
    const qNotices = query(
      collection(db, "notices"),
      orderBy("createdAt", "desc"),
    );
    const unsubNotices = onSnapshot(qNotices, (snapshot) => {
      setNotices(
        snapshot.docs.map((doc) => {
          const data = doc.data();
          const dateObj = data.date ? new Date(data.date) : new Date();
          return {
            id: doc.id,
            ...data,
            day: dateObj.getDate().toString().padStart(2, "0"),
            month: MONTHS_SHORT_EN[dateObj.getMonth()] || "—",
          };
        }),
      );
    });

    // Real-time Events
    const qEvents = query(collection(db, "events"), orderBy("date", "asc"));
    const unsubEvents = onSnapshot(qEvents, (snapshot) => {
      const fetchedEvents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(fetchedEvents.length > 0 ? fetchedEvents : DEFAULT_EVENTS);
    });

    return () => {
      unsubNotices();
      unsubEvents();
    };
  }, []);

  const handleEnquiry = async (e) => {
    e.preventDefault();
    if (!enquiryPhoneVerified) {
      alert("Please verify your phone number with OTP first.");
      return;
    }
    if (enquiryLoading) return;
    setEnquiryLoading(true);

    let firestoreSuccess = false;
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
      });
      if (response.ok) {
        firestoreSuccess = true;
      }
    } catch (err) {
      console.error("Quick Enquiry database submission failed:", err);
    }

    if (firestoreSuccess) {
      // Send email via Web3Forms (safely caught)
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            access_key: "ea72c4d8-d56a-48f8-af05-7dd8d48268a9",
            subject: `New Quick Enquiry - ${enquiry.name} (${enquiry.program})`,
            name: enquiry.name,
            phone: enquiry.phone,
            program: enquiry.program,
            message: `New Quick Enquiry Details:\n\n- Name: ${enquiry.name}\n- Phone: ${enquiry.phone}\n- Program of Interest: ${enquiry.program}`
          })
        });
      } catch (mailErr) {
        console.error("Web3Forms quick enquiry email failed:", mailErr);
      }

      alert("Enquiry submitted! We will contact you shortly.");
      setEnquiry({ name: "", phone: "", program: "" });
      setEnquiryPhoneVerified(false);
    } else {
      // Fallback fallback alert to match original behavior if Firestore endpoint failed
      alert("Thank you! We will contact you shortly.");
      setEnquiry({ name: "", phone: "", program: "" });
      setEnquiryPhoneVerified(false);
    }
    setEnquiryLoading(false);
  };

  const activeNotices = notices
    .filter((n) => n.active !== false)
    .map((n) => `📣 ${n.title}`);
  const marqueeItems =
    activeNotices.length > 0
      ? activeNotices
      : ["📣 Admissions Open for 2026 Batch "];

  return (
    <main>
      <Navbar />

      {/* Marquee */}
      <Link href="/career" className="block bg-hitm-red py-2.5 overflow-hidden hover:bg-hitm-navy transition-colors cursor-pointer">
        <div className="marquee-track">
          {[0, 1]
            .flatMap(() => marqueeItems)
            .map((text, i) => (
              <span
                key={i}
                className="inline-block px-12 text-white/90 text-sm font-medium"
                suppressHydrationWarning
              >
                {text}
              </span>
            ))}
        </div>
      </Link>

      {/* Hero */}
      <HeroSlider />

      {/* Quick Links */}
      <section className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {quickLinks.map((ql) => (
              ql.href.endsWith('.pdf') ? (
                <a
                  key={ql.label}
                  href={ql.href}
                  download
                  className="flex items-center gap-2.5 bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-hitm-red hover:text-hitm-red hover:bg-hitm-red/5 transition-all hover:-translate-y-1 hover:shadow-sm"
                >
                  <span className="text-hitm-red">{ql.icon}</span>
                  {ql.label}
                </a>
              ) : (
                <Link
                  key={ql.label}
                  href={ql.href}
                  className="flex items-center gap-2.5 bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-hitm-red hover:text-hitm-red hover:bg-hitm-red/5 transition-all hover:-translate-y-1 hover:shadow-sm"
                >
                  <span className="text-hitm-red">{ql.icon}</span>
                  {ql.label}
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Quick Enquiry Form (Moved Higher) */}
      <section className="py-16 bg-gradient-to-br from-gray-900 to-hitm-navy">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="gold" className="mb-4">
              Admissions 2026
            </Badge>
            <h2 className="text-4xl font-black font-serif text-white mt-3">
              Start Your Application Today
            </h2>
            <p className="text-gray-400 mt-3">
              Fill in a quick form and our admissions team will contact you within 24 hours.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center">Quick Enquiry Form</CardTitle>
              <CardDescription className="text-center">
                We will contact you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleEnquiry}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div className="space-y-1">
                  <label className="text-sm font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your full name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-hitm-red outline-none"
                    value={enquiry.name}
                    onChange={(e) =>
                      setEnquiry({ ...enquiry, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Mobile Number *</label>
                  <InlinePhoneVerifier
                    phone={enquiry.phone}
                    onChange={(p) => setEnquiry({ ...enquiry, phone: p })}
                    onVerificationComplete={setEnquiryPhoneVerified}
                    recaptchaId="quick-enquiry"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-sm font-medium">
                    Program of Interest *
                  </label>
                  <select
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-hitm-red outline-none"
                    value={enquiry.program}
                    onChange={(e) =>
                      setEnquiry({ ...enquiry, program: e.target.value })
                    }
                  >
                    <option value="">Select Program</option>
                    {[
                      "B.Tech CSE",
                      "B.Tech AI",
                      "B.Tech Data Science",
                      "B.Tech Electrical",
                      "B.Tech EEE",
                      "B.Tech ECE",
                      "B.Tech Mechanical",
                      "B.Tech Civil",
                      "Diploma CSE",
                      "Diploma Data Science",
                      "Diploma AI",
                      "Diploma Mechanical",
                      "Diploma Civil",
                      "Diploma Electrical",
                      "Diploma EEE",
                      "Diploma ECE",
                      "MBA",
                      "MCA",
                      "BCA",
                      "BBA",
                    ].map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </div>
                {enquiryLoading ? (
                  <div className="md:col-span-2 w-full flex items-center justify-center gap-2 bg-hitm-navy text-white rounded-md py-3 text-sm font-bold animate-pulse">
                    <Loader2 className="animate-spin" size={16} /> Submitting Enquiry... Please wait
                  </div>
                ) : (
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    className="md:col-span-2 w-full mt-2"
                    disabled={!enquiryPhoneVerified}
                  >
                    Submit Enquiry <ArrowRight size={16} />
                  </Button>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="w-full h-[480px] bg-gray-100 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden group">
                <img
                  src="/images/HITM.webp"
                  alt="HITM Campus"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />{" "}
                <div className="absolute inset-0 bg-gradient-to-t from-hitm-navy/60 to-transparent" />
              </div>
              <Card className="absolute -bottom-5 -right-5 shadow-xl bg-hitm-red text-white border-none">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-black font-serif">2026</div>
                  <div className="text-xs text-white/75 mt-1">
                    Eastablished On
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <p className="text-hitm-red font-semibold text-sm uppercase tracking-widest mb-3">
                Welcome to HITM Ranchi
              </p>
              <h2 className="text-4xl font-black font-serif text-gray-900 mb-5 leading-tight">
                A New Landmark in Higher Education
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Haider Institute of Technology and Management (HITM Ranchi) is
                redefining the educational landscape of Jharkhand as a
                future-focused institution dedicated to excellence in
                Engineering, Management, and Technology.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our mission is to empower students with cutting-edge skills,
                global industry exposure, and a spirit of innovation that
                prepares them for the challenges of tomorrow.
              </p>
              {/* <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Trophy size={20} />, title: 'NAAC Accredited', desc: 'Grade A+ Institution' },
                  { icon: <Users size={20} />, title: '200+ Expert Faculty', desc: 'Industry veterans' },
                  { icon: <Building2 size={20} />, title: '2.48 Acre Campus', desc: 'Modern infrastructure' },
                  { icon: <Globe size={20} />, title: '200+ Industry Tie-ups', desc: 'Global partnerships' },
                ].map((f) => (
                  <div key={f.title} className="flex items-start gap-3 p-3 rounded-xl bg-hitm-red/5 border border-hitm-red/10">
                    <div className="w-10 h-10 rounded-lg bg-hitm-red/10 flex items-center justify-center text-hitm-red shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{f.title}</p>
                      <p className="text-xs text-gray-500">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div> */}

              <div className="flex gap-3 flex-wrap">
                <Button asChild variant="default" size="lg">
                  <Link href="/about">
                    Know More <ArrowRight size={16} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/admissions/apply?form=1">Apply Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-gradient-to-r from-hitm-red to-hitm-navy py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Calendar size={28} />,
                number: "Admissions",
                label: "Open 2k26 Batch",
              },
              {
                icon: <Users size={28} />,
                number: "Vibrant",
                label: "Student Community",
              },
              {
                icon: <BookOpen size={28} />,
                number: "6+",
                label: "Modern Programs",
              },
              {
                icon: <Building2 size={28} />,
                number: "Global",
                label: "Industry Ties",
              },
            ].map((s) => (
              <div key={s.label} className="text-center text-white">
                <div className="text-hitm-gold mb-2 flex justify-center">
                  {s.icon}
                </div>
                <div className="text-4xl font-black font-serif text-hitm-gold">
                  {s.number}
                </div>
                <div className="text-sm text-white/75 mt-1 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="section-title mb-16">
            <h2 className="text-4xl md:text-5xl">Programs Offered</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
              Choose from our industry-aligned technical and management programs
              designed to launch your global career.
            </p>
            <Badge
              variant="outline"
              className="mt-2 border-hitm-red text-hitm-red font-bold px-4 py-1"
            >
              Academic Programs
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {programs.map((p, i) => (
              <Card
                key={i}
                className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border-gray-200 hover:border-hitm-red/30 overflow-hidden flex flex-col md:flex-row h-auto md:h-64"
              >
                <div className="w-full md:w-2/5 relative overflow-hidden h-48 md:h-full">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent md:bg-gradient-to-r" />
                  <div className="absolute bottom-4 left-4 md:top-4 md:bottom-auto w-12 h-12 rounded-xl bg-hitm-red flex items-center justify-center shadow-lg border border-white/20 z-10">
                    {p.icon}
                  </div>
                </div>
                <div className="w-full md:w-3/5 p-6 flex flex-col">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-hitm-red transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-xs font-semibold text-hitm-red/70 uppercase tracking-wider mb-2">
                      {p.desc}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2 mb-4">
                    {p.courses.map((c) => (
                      <Badge
                        key={c}
                        variant="secondary"
                        className="px-2 py-0 text-[10px] font-bold bg-gray-100 text-gray-600 hover:bg-hitm-red hover:text-white transition-colors"
                      >
                        {c}
                      </Badge>
                    ))}
                  </div>
                  <Link
                    href="/programs"
                    className="mt-auto inline-flex items-center gap-1.5 text-hitm-red font-bold text-sm hover:translate-x-2 transition-transform"
                  >
                    View Course Details <ArrowRight size={14} />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Notice + Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold font-serif mb-5 flex items-center gap-2">
                <Bell className="text-hitm-red" size={22} /> Notice Board
              </h2>
              <Card className="h-[420px] bg-white group overflow-hidden">
                <marquee direction="up" scrollamount="4" className="h-full">
                  <div className="w-full flex flex-col">
                    {notices.map((n, i) => {
                      const openingRelated = isOpeningRelated(n);
                      const CardContent = (
                        <>
                          <div className="bg-hitm-red text-white rounded-lg p-2.5 text-center min-w-[52px] shrink-0 h-fit shadow-sm">
                            <div className="text-xl font-black leading-none">
                              {n.day}
                            </div>
                            <div className="text-[10px] text-white/80 uppercase mt-0.5">
                              {n.month}
                            </div>
                          </div>

                          <div className="flex-1">
                            <p className="font-semibold text-sm text-gray-800 group-hover:text-hitm-red transition-colors">
                              {n.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {n.content}
                            </p>
                            <Badge variant="gold" className="mt-1.5 text-[10px]">
                              {n.category}
                            </Badge>
                          </div>

                          <ChevronRight
                            size={16}
                            className="text-gray-300 group-hover:text-hitm-red shrink-0 mt-1 transition-colors"
                          />
                        </>
                      );

                      if (openingRelated) {
                        return (
                          <Link
                            key={i}
                            href="/career"
                            className="flex gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 w-full text-left"
                          >
                            {CardContent}
                          </Link>
                        );
                      }

                      return (
                        <div
                          key={i}
                          className="flex gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
                        >
                          {CardContent}
                        </div>
                      );
                    })}
                  </div>
                </marquee>
              </Card>
            </div>

            {/* Events */}
            <div>
              <h2 className="text-2xl font-bold font-serif mb-5 flex items-center gap-2">
                <Calendar className="text-hitm-navy" size={22} /> Upcoming
                Events
              </h2>
              <Card className="h-[280px] overflow-y-auto bg-white shadow-lg mb-5 group custom-scrollbar">
                <div className="w-full flex flex-col">
                  {events.map((e, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100"
                    >
                      <div className="w-10 h-10 rounded-xl bg-hitm-navy/10 flex items-center justify-center text-hitm-navy shrink-0 shadow-inner">
                        {e.icon ? e.icon : eventIcon(e.iconName)}
                      </div>
                      <div className="flex-1 flex flex-col">
                        <p className="font-bold text-sm text-gray-800 leading-tight group-hover:text-hitm-navy">
                          {e.name}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-1 flex items-center gap-1.5 font-medium">
                          <Clock size={12} className="text-hitm-red" /> {e.date}
                        </p>
                        <p className="text-[11px] text-gray-600 mt-1 leading-snug">
                          {e.title}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-[9px] bg-hitm-navy/5 text-hitm-navy self-start"
                      >
                        Join
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* CTA card */}
              <div className="bg-gradient-to-br from-hitm-red to-hitm-navy rounded-2xl p-6 text-white text-center shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 transition-transform duration-700 group-hover:scale-150" />
                <GraduationCap
                  size={40}
                  className="mx-auto mb-3 text-hitm-gold"
                />
                <h4 className="font-bold text-xl font-serif mb-1">
                  Admissions Open
                </h4>
                <p className="text-white/80 text-xs mb-5">
                  Be a part of Jharkhand&apos;s most futuristic campus.
                </p>
                <Button
                  asChild
                  variant="gold"
                  size="sm"
                  className="w-full font-bold shadow-lg"
                >
                  <Link
                    href="/admissions/apply?form=1"
                    className="flex items-center justify-center gap-2"
                  >
                    Apply for 2026 Batch <ArrowRight size={14} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-hitm-red via-hitm-gold to-hitm-navy" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="section-title">
            <h2 className="!text-white text-4xl md:text-5xl">
              Campus Life at <span className="text-hitm-gold italic">HITM</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Experience a vibrant ecosystem designed for holistic growth,
              innovation, and lifelong friendships.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-4 h-[500px] md:h-[600px]">
            {[
              {
                label: "Green Campus",
                image: "/images/campusGarden.jpg",
                className: "col-span-2 row-span-2",
              },
              { label: "Adv. Computing Lab", image: "/images/computerLab.jpg" },
              {
                label: "Digital Library",
                image:
                  "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=900",
              },
              {
                label: "Sports Arena",
                image:
                  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=900",
              },
              {
                label: "Innovation Hub",
                image:
                  "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=900",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={cn(
                  "relative overflow-hidden rounded-2xl cursor-pointer group bg-gray-900 shadow-2xl",
                  item.className,
                )}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:via-hitm-navy/40 transition-all duration-500" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="block w-8 h-1 bg-hitm-gold mb-2 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    <span className="text-white font-bold text-lg md:text-xl drop-shadow-md tracking-tight uppercase">
                      {item.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:text-white hover:bg-white/10 hover:border-hitm-gold px-10 rounded-full transition-all"
            >
              <Link href="/campus/gallery" className="flex items-center gap-3">
                Explore Campus Life <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-title">
            <h2>Voices of Vision</h2>
            <p className="text-gray-500 mt-4">
              Hear from the experts and visionaries behind HITM Ranchi.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card
                key={i}
                className="relative overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-hitm-red rounded-l-xl" />
                <CardContent className="pt-6">
                  <div className="flex text-hitm-gold mb-3">
                    {[...Array(t.stars)].map((_, j) => (
                      <Star key={j} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm italic leading-relaxed mb-5">
                    &quot;{t.text}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full border-2 border-hitm-gold object-cover shrink-0 shadow-sm"
                    />
                    <div>
                      <p className="font-semibold text-sm text-gray-900">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Institute Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
            <div>
              <p className="text-hitm-red font-bold text-sm uppercase tracking-widest mb-2">
                About HITM Ranchi
              </p>
              <h2 className="text-3xl md:text-4xl font-black font-serif text-gray-900 leading-tight">
                A Center Of Learning Where Education Meets Innovation,
                Opportunity, And Growth
              </h2>
              <div className="mt-6 space-y-5 text-gray-600 text-base leading-8">
                <p>
                  Haider Institute of Technology and Management is a premier
                  educational institution committed to delivering quality
                  education in engineering, technology, and management. Located
                  in Ranchi, Jharkhand, the institute is established with the
                  vision of nurturing skilled professionals, innovative
                  thinkers, and responsible leaders for a rapidly evolving
                  global environment.
                </p>
                <p>
                  The institute offers industry-oriented programs with a modern
                  curriculum, practical learning approach, and strong academic
                  foundation. With experienced faculty, state-of-the-art
                  infrastructure, and a student-centric learning environment,
                  Haider Institute of Technology and Management focuses on
                  academic excellence, skill development, and overall
                  personality growth.
                </p>
                <p>
                  Beyond academics, the institute emphasizes ethics, leadership,
                  research, and real-world exposure through workshops, projects,
                  and industry interactions. Our mission is to empower students
                  with knowledge, confidence, and professional competence,
                  enabling them to build successful careers and contribute
                  meaningfully to society.
                </p>
                <p className="text-gray-900 font-semibold">
                  Haider Institute of Technology and Management stands as a
                  center of learning where education meets innovation,
                  opportunity, and growth.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl bg-gradient-to-br from-hitm-navy to-hitm-red p-8 text-white shadow-2xl">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 mb-5">
                  <GraduationCap size={28} />
                </div>
                <h3 className="text-2xl font-black font-serif leading-tight">
                  Premier Education With Real-World Relevance
                </h3>
                <p className="mt-4 text-white/85 leading-7">
                  Modern curriculum, practical learning, and industry
                  interaction come together to shape confident and capable
                  future professionals.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                  <div className="text-sm font-bold uppercase tracking-[0.2em] text-hitm-red">
                    Vision
                  </div>
                  <p className="mt-3 text-gray-700 leading-7">
                    To nurture innovative thinkers, skilled professionals, and
                    responsible leaders for a changing global environment.
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="text-sm font-bold uppercase tracking-[0.2em] text-hitm-navy">
                    Mission
                  </div>
                  <p className="mt-3 text-gray-700 leading-7">
                    To empower students with knowledge, confidence, ethics, and
                    professional competence for meaningful careers and social
                    contribution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
