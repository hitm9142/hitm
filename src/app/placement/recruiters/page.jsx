import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Our Top Recruiters | HITM Ranchi',
  description: 'Meet our corporate partners and top-tier companies recruiting from HITM Ranchi.',
};

export default function RecruitersPage() {
  const recruiters = [
    { name: 'Infosys', logo: 'https://logo.clearbit.com/infosys.com' },
    { name: 'TCS', logo: 'https://logo.clearbit.com/tcs.com' },
    { name: 'Wipro', logo: 'https://logo.clearbit.com/wipro.com' },
    { name: 'HCL', logo: 'https://logo.clearbit.com/hcltech.com' },
    { name: 'Cognizant', logo: 'https://logo.clearbit.com/cognizant.com' },
    { name: 'Capgemini', logo: 'https://logo.clearbit.com/capgemini.com' },
    { name: 'Deloitte', logo: 'https://logo.clearbit.com/deloitte.com' },
    { name: 'Accenture', logo: 'https://logo.clearbit.com/accenture.com' },
    { name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
    { name: 'Flipkart', logo: 'https://logo.clearbit.com/flipkart.com' },
    { name: 'IBM', logo: 'https://logo.clearbit.com/ibm.com' },
    { name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
    { name: 'Tech Mahindra', logo: 'https://logo.clearbit.com/techmahindra.com' },
    { name: 'Oracle', logo: 'https://logo.clearbit.com/oracle.com' },
    { name: 'LTI Mindtree', logo: 'https://logo.clearbit.com/ltimindtree.com' }
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 bg-gray-50 pt-24 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <Badge variant="gold" className="mb-4">Corporate Partners</Badge>
            <h1 className="text-4xl md:text-5xl font-black font-serif text-hitm-navy mb-4">Our Top Recruiters</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              We take pride in our strong corporate relationships. Our alumni are successfully contributing 
              their talents to these world-renowned organizations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {recruiters.map((r, i) => (
              <Card key={i} className="group hover:shadow-xl hover:border-hitm-red/30 transition-all duration-300 overflow-hidden bg-white">
                <CardContent className="p-6 flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all">
                  <div className="h-12 w-full flex items-center justify-center mb-3">
                    <img src={r.logo} alt={r.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <p className="text-sm font-bold text-gray-400 group-hover:text-hitm-navy transition-colors">{r.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-hitm-navy to-gray-950 text-white text-center shadow-2xl">
            <h3 className="text-2xl font-bold mb-4 font-serif">HR & Recruiting Teams</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto uppercase tracking-widest text-xs font-semibold">Invite HITM for campus placement drives</p>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <div>
                <p className="text-hitm-gold font-bold">Training & Placement Officer</p>
                <p>764-496-6461 | info@hitmranchi.ac.in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

