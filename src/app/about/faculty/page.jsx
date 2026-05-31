import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { UserCircle } from 'lucide-react';

export const metadata = {
  title: 'Our Faculty | HITM Ranchi',
  description: 'Meet our esteemed faculty members and academic leaders at HITM Ranchi.',
};

export default function FacultyPage() {
  const departments = [
    
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50 flex items-center pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-4">Our Faculty</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Our esteemed faculty members are industry experts, researchers, and academic leaders committed to providing 
              top-tier education and shaping the innovators of tomorrow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept, idx) => (
              <Card key={idx} className="bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-hitm-navy group-hover:bg-hitm-red transition-colors"></div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-hitm-red/10 group-hover:text-hitm-red transition-colors shrink-0">
                      <UserCircle size={32} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-tight">{dept.head}</h4>
                      <p className="text-hitm-navy font-semibold text-xs mt-1">{dept.role}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <p className="font-medium text-sm text-gray-600 uppercase tracking-widest leading-relaxed">
                      {dept.name}
                    </p>
                  </div>
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
