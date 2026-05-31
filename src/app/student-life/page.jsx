'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function StudentLifePage() {
  const facilities = [
    {
      image: "/images/hostel.webp",
      title: "Hostel Facility",
      desc: "Secure, clean, and separate hostels for boys and girls with 24/7 security and warden support.",
    },
    {
      image: "/images/transport.png",
      title: "Transport",
      desc: "Own fleet of buses connecting all major points of Ranchi for safe and timely commute.",
    },
    {
      image: "/images/cafateria.jpg",
      title: "Cafeteria",
      desc: "A modern, hygienic cafeteria serving nutritious meals and a variety of snacks.",
    },
    {
      image: "/images/wifi.png",
      title: "Wi-Fi Campus",
      desc: "High-speed internet connectivity across the campus for research and academic needs.",
    },
    {
      image: "/images/audutorim.jpg",
      title: "Seminar Hall",
      desc: "A state-of-the-art seminar hall for cultural events, seminars, and technical workshops.",
    },
    {
      image: "/images/labs.jpg",
      title: "Labs & Library",
      desc: "Fully equipped modern laboratories and a massive digital library with over 50,000+ books.",
    },
    {
      image: "/common-room.jpg",
      title: "Common Room for Girls & Boys",
      desc: "Spacious, comfortable, and separate common rooms for girls and boys to relax, study, and engage in indoor games.",
    },
    {
      image: "/swimmingpool.jpg",
      title: "Swimming Pool",
      desc: "A clean, well-maintained, semi-Olympic size swimming pool with trained lifeguards and dedicated slots for boys and girls.",
    }
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-1 bg-white pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">

          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Beyond Academics</Badge>
            <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-4">
              Student Life & Facilities
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              At HITM Ranchi, we believe in providing an environment that fosters holistic growth.
              Explore our premium facilities designed for your comfort and success.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((f, i) => (
              <Card
                key={i}
                className="border-none shadow-md hover:shadow-xl transition-all duration-300 bg-gray-50 group overflow-hidden"
              >
                <CardContent className="p-0">

                  {/* Image */}
                  <div className="h-44 w-full overflow-hidden">
                    <Image
                      src={f.image}
                      alt={f.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-hitm-navy mb-3 font-serif uppercase tracking-tight">
                      {f.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {f.desc}
                    </p>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Banner */}
          <div className="mt-20 relative rounded-3xl overflow-hidden h-96 group">
            <Image
              src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1200"
              alt="Campus Life"
              fill
              className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-hitm-navy via-transparent to-transparent flex items-end p-12">
              <div className="text-white max-w-xl">
                <h2 className="text-3xl font-black font-serif italic mb-2 uppercase">
                  Vibrant Campus Culture
                </h2>
                <p className="text-gray-300 font-medium">
                  Join a diverse community of learners and participate in over 20+ clubs,
                  annual fests, and sports meets that define the HITM experience.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}