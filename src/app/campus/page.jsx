'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { MapPin, Camera, Building2, Trees, GraduationCap } from 'lucide-react';

export default function CampusPage() {
  const images = [
    {
      url: "/images/mainLibrary.jpg",
      title: "Main Library",
      desc: "A vast collection of knowledge with modern study spaces."
    },
    {
      url: "/images/HITM.webp",
      title: "Academic Block",
      desc: "State-of-the-art classrooms and lecture halls."
    },
    {
      url: "/images/inovationLab.jpg",
      title: "Innovation Lab",
      desc: "Cutting-edge technology for hands-on learning."
    },
    {
      url: "/images/campusGarden.jpg",
      title: "Campus Garden",
      desc: "Serene green spaces for relaxation and social interaction."
    },
    {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
      title: "Research Center",
      desc: "Where theory meets practice through advanced research."
    }
  ];

  return (
    <main className='flex flex-col min-h-screen bg-white'>
      <Navbar />
      
      {/* Hero Section */}
      <section className='pt-32 pb-16 bg-hitm-navy relative overflow-hidden'>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-hitm-red/10 skew-x-12 translate-x-20" />
        <div className='container mx-auto px-4 relative z-10'>
          <div className="max-w-3xl">
            <Badge variant='gold' className='mb-4'>Life at HITM</Badge>
            <h1 className='text-4xl md:text-6xl font-black text-white font-serif mb-6 uppercase'>
              Our <span className="text-hitm-gold">Campus</span>
            </h1>
            <p className='text-xl text-gray-300 font-light leading-relaxed'>
              Explore the vibrant and modern environment at HITM Ranchi. A perfect blend of nature and technology designed for your growth.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
  <div className="text-3xl font-bold text-hitm-navy mb-1">Modern Campus</div>
  <p className="text-gray-500 text-sm">Designed for a better learning experience</p>
</div>
            <div className="text-center">
              <div className="text-3xl font-bold text-hitm-navy mb-1">6+</div>
              <p className="text-gray-500 text-sm">Laboratories</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-hitm-navy mb-1">1440+</div>
              <p className="text-gray-500 text-sm">Student Capacity</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-hitm-navy mb-1">24/7</div>
              <p className="text-gray-500 text-sm">Wi-Fi Campus</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className='py-20'>
        <div className='container mx-auto px-4'>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* First Large Image */}
            <div className="lg:col-span-2 relative group h-[400px] rounded-2xl overflow-hidden shadow-lg animate-fade-up">
              <Image 
                src={images[0].url}
                alt={images[0].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">{images[0].title}</h3>
                <p className="text-gray-300 text-sm max-w-md">{images[0].desc}</p>
              </div>
            </div>

            {/* Side Image */}
            <div className="relative group h-[400px] rounded-2xl overflow-hidden shadow-lg animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <Image 
                src={images[1].url}
                alt={images[1].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-2xl font-bold mb-2">{images[1].title}</h3>
                <p className="text-gray-300 text-sm">{images[1].desc}</p>
              </div>
            </div>

            {/* Bottom Row */}
            {images.slice(2).map((img, idx) => (
              <div key={idx} className="relative group h-[300px] rounded-2xl overflow-hidden shadow-lg animate-fade-up" style={{ animationDelay: `${(idx + 2) * 0.1}s` }}>
                <Image 
                  src={img.url}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{img.title}</h3>
                  <p className="text-gray-300 text-xs">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-title">
            <h2 className="text-3xl font-serif font-bold">Campus Amenities</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-hitm-red/10 rounded-full flex items-center justify-center mb-6">
                <MapPin className="text-hitm-red" />
              </div>
              <h3 className="text-xl font-bold text-hitm-navy mb-4">Prime Location</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Located in the heart of Ranchi, our campus is easily accessible and surrounded by essential services.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-hitm-gold/10 rounded-full flex items-center justify-center mb-6">
                <Building2 className="text-hitm-gold" />
              </div>
              <h3 className="text-xl font-bold text-hitm-navy mb-4">Modern Infrastructure</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Earthquake-resistant buildings with natural lighting and energy-efficient systems.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-hitm-navy/10 rounded-full flex items-center justify-center mb-6">
                <Trees className="text-hitm-navy" />
              </div>
              <h3 className="text-xl font-bold text-hitm-navy mb-4">Green Campus</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Over 40% of the campus is dedicated to green spaces, gardens, and recreational areas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-hitm-red rounded-3xl p-12 text-center text-white relative overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Experience it yourself</h2>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                  Take a virtual tour or schedule a physical visit to see why HITM is the right place for your future.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button className="px-10 py-4 bg-white text-hitm-red rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">Schedule a Visit</button>
                  <button className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold hover:bg-white/10 transition-colors">Virtual Tour</button>
                </div>
             </div>
             {/* Abstract background elements */}
             <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
             <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  ); 
}
