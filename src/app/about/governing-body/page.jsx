import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { UserCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Governing Body | HITM Ranchi',
  description: 'Meet the visionaries leading HITM Ranchi towards excellence.',
};

export default function GoverningBodyPage() {
  const advisoryCouncil = [
    { name: 'Prof. (Dr.) Rakesh Kumar Misra', role: 'Governing Body', desc: 'Professor, Department of Electrical Engineering, IIT (BHU)', photo: 'rakesh.png' },
    { name: 'Prof. (Dr.) Shashank Awasthi', role: 'Governing Body', desc: 'Dean Strategy, G L Bajaj Institute of Technology and Management, Greater Noida, Vice-Chair, IEEE India Council.', photo: 'shash.png' },
    { name: 'Prof. (Dr.) Aqueel Syed', role: 'Governing Body', desc: 'Director, HRDC, Integral University', photo: 'aqueel.png' },
    { name: 'Md. Shakeel Akhter (IPS)', role: 'Governing Body', desc: 'Tamil Nadu Cadre, State Chief Information Commissioner, Tamil Nadu (Retd. DGP, CBCID, Tamil Nadu)', photo: 'shakeel.png' },
    { name: 'Md Noman Ali', role: 'Governing Body', desc: 'Retired Principal District Judge, Hazaribagh', photo: 'noman.png' },
    { name: 'Prof. (Dr.) A. A. Khan', role: 'Governing Body', desc: 'Ex Vice Chancellor, Ranchi University, Ranchi', photo: 'aakhan.png' },
    { name: 'Prof. (Dr.) M. Basheer Ahmed Khan', role: 'Governing Body', desc: 'Former Vice-Chancellor, Sido Kanhu Murmu University, Dumka & Former President, Middle East University, UAE.', photo: 'basheer.png' },
    { name: 'Prof. (Dr.) Firoz Ahmad', role: 'Governing Body', desc: 'Ex Vice Chancellor, NPU Daltonganj, Palamu', photo: 'firoz.png' },
    { name: 'Prof. (Dr.) Khursheed Alam', role: 'Advisory Council', desc: 'Executive Chairman, Academy for Advanced Studies and Training UK International Limited, Middlesex University, London.', photo: 'khursheed.png' },
    { name: 'Mr Najeed Ahmed Khan', role: 'Advisory Council', desc: 'New York University Stern School of Business, Former Principal Director, Ericsson, USA', photo: 'najeed.png' },
    { name: 'Prof. (Dr.) T. J. Kamalanabhan', role: 'Advisory Council', desc: 'IIT, CHENNAI, Department of Management Studies', photo: 'kamlanabhan.png' },
    { name: 'Prof. (Dr.) Mohd Zaheer Khan Yusufzai', role: 'Advisory Council', desc: 'Professor, Department of Mechanical Engineering, IIT (BHU)', photo: 'zaheer.png' },
    { name: 'Prof. (Dr.) Mohammad Jawed', role: 'Advisory Council', desc: 'Professor, Department of Civil Engineering, IIT (Guwahati)', photo: 'jawed.png' },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50 flex flex-col items-center pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
                   
          
          <div className="text-center mb-16 pt-10 border-t border-gray-200">
            <h2 className="text-4xl font-black font-serif text-hitm-navy mb-4 uppercase tracking-tighter italic">Advisory Council</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Our Advisory Council brings together global expertise and strategic vision to guide HITM&apos;s growth and industry integration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advisoryCouncil.map((member, idx) => (
              <Card key={idx} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-hitm-red/5 to-transparent rounded-bl-[100px] -z-0"></div>
                <CardContent className="px-8 pt-10 pb-8 text-center relative z-10">
                  <div className="mx-auto w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 border-4 border-white shadow-md mb-6 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={`/images/${member.photo}`}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-hitm-navy font-semibold text-sm uppercase tracking-wider mb-4">{member.role}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{member.desc}</p>
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
