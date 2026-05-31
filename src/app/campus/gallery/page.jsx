'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Eye, Maximize2, Camera, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PhotoGalleryPage() {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Campus', 'Events', 'Labs', 'Sports'];
  
  const images = [
    { title: 'Main Campus Building', cat: 'Campus', url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=800' },
    { title: 'Annual TechFest 2026', cat: 'Events', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800' },
    { title: 'Advanced Computing Lab', cat: 'Labs', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800' },
    { title: 'Inter-College Football', cat: 'Sports', url: '/images/KSS_3840.jpg' },
    { title: 'Library Study Area', cat: 'Campus', url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800' },
    { title: 'Cultural Night Gala', cat: 'Events', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800' },
    { title: 'Robotics Workshop', cat: 'Labs', url: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?auto=format&fit=crop&q=80&w=800' },
    { title: 'Basketball Tournament', cat: 'Sports', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800' },
    { title: 'Student Innovation Center', cat: 'Labs', url: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800' },
  ];

  const filtered = filter === 'All' ? images : images.filter(img => img.cat === filter);

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="bg-hitm-navy pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="bg" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge variant="gold" className="mb-4">Campus Life</Badge>
          <h1 className="text-4xl md:text-5xl font-black font-serif text-white mb-6 uppercase tracking-tight">Photo Gallery</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Glimpse into the vibrant life at HITM Ranchi. From high-tech labs to cultural celebrations and sporting triumphs.
          </p>
        </div>
      </section>

      {/* Gallery Controls */}
      <section className="py-8 border-b border-gray-100 flex-1">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-8 py-2.5 rounded-full text-sm font-bold transition-all",
                  filter === cat ? "bg-hitm-red text-white shadow-lg shadow-hitm-red/20 scale-105" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((img, i) => (
              <div key={i} className="group relative aspect-[4/3] rounded-[32px] overflow-hidden bg-gray-100 border-none animate-fade-in shadow-sm hover:shadow-2xl transition-all duration-500">
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-hitm-navy/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Badge variant="gold" className="w-fit mb-3">{img.cat}</Badge>
                  <h3 className="text-white font-bold text-lg mb-4">{img.title}</h3>
                  <div className="flex gap-4">
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-hitm-red transition-colors">
                      <Maximize2 size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-hitm-red transition-colors">
                      <Camera size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
             <div className="py-20 text-center">
                <Filter className="mx-auto text-gray-200 mb-4" size={48} />
                <p className="text-gray-400">No photos found in this category.</p>
             </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
