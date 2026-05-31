'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Bus, MonitorPlay, BookOpen, Stethoscope, Dumbbell, ShieldCheck, Cpu } from 'lucide-react';

export default function FacilitiesPage() {
  const facilities = [
    { name: 'Hostel & Mess', icon: <Building size={32} />, desc: 'Comfortable, secure, and well-furnished separate hostels for boys and girls with hygienic mess facilities providing nutritious meals.' },
    { name: 'Transport', icon: <Bus size={32} />, desc: 'A dedicated fleet of modern buses ensuring safe and convenient transportation across Ranchi and neighboring areas.' },
    { name: 'High-Tech Labs', icon: <Cpu size={32} />, desc: 'State-of-the-art engineering laboratories and workshops equipped with the latest machinery and instruments for practical learning.' },
    { name: 'Computer Centre', icon: <MonitorPlay size={32} />, desc: 'High-speed Wi-Fi enabled computing centers with modern workstations, advanced software, and a 24/7 learning environment.' },
    { name: 'Central Library', icon: <BookOpen size={32} />, desc: 'An extensive repository of books, digital journals, research papers, and quiet reading halls for uninterrupted study.' },
    { name: 'Medical Facilities', icon: <Stethoscope size={32} />, desc: 'On-campus medical clinic with a dedicated doctor and 24/7 ambulance service for any emergency.' },
    { name: 'Sports & Recreation', icon: <Dumbbell size={32} />, desc: 'Extensive sports grounds for cricket, football, basketball, and indoor games to promote physical well-being.' },
    { name: 'Security & Campus', icon: <ShieldCheck size={32} />, desc: 'A fully secure campus with 24/7 CCTV surveillance, well-trained security personnel, and green, eco-friendly surroundings.' }
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50 flex items-center pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-4">Campus Facilities</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              We provide a holistic, state-of-the-art infrastructure designed to foster academic excellence, 
              safety, and personal growth for every student.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((fac, idx) => (
              <Card key={idx} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden">
                <div className="h-2 w-full bg-hitm-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="text-center pt-8 pb-4 relative">
                  <div className="mx-auto w-20 h-20 bg-hitm-navy/5 rounded-2xl flex items-center justify-center text-hitm-red group-hover:bg-hitm-red group-hover:text-white transition-colors duration-300 shadow-inner mb-2">
                    {fac.icon}
                  </div>
                  <CardTitle className="text-xl font-black text-hitm-navy leading-tight mt-4">{fac.name}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-8 text-center">
                  <p className="text-gray-500 text-sm leading-relaxed">{fac.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
