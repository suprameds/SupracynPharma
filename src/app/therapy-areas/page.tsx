import { PageHeader } from "@/components/blocks/page-header";
import { therapyAreas } from "@/data/therapy-areas";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Pill, Activity, Heart, HeartPulse, Microscope } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Therapy Areas | Supracyn Pharma",
  description: "Discover our specialized focus areas across multiple therapeutic branches, ensuring targeted and effective patient care.",
};

export default function TherapyAreasPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PageHeader 
        title="Therapy Areas" 
        subtitle="Our formulations target a wide spectrum of health conditions, supported by rigorous R&D and specialized manufacturing expertise."
        breadcrumbs={[
          { label: "Therapy Areas" }
        ]}
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="space-y-12">
            
            {therapyAreas.map((area, index) => (
              <div 
                key={area.id} 
                id={area.id}
                className={`flex flex-col md:flex-row gap-8 lg:gap-16 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} pt-12 pb-16 border-b border-slate-100 last:border-0`}
              >
                
                <div className="flex-1 space-y-6">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary/10 text-primary mb-2 shadow-sm border border-primary/20">
                    {index === 0 && <Activity className="h-8 w-8" />}
                    {index === 1 && <HeartPulse className="h-8 w-8" />}
                    {index === 2 && <Heart className="h-8 w-8" />}
                    {index === 3 && <Microscope className="h-8 w-8" />}
                    {index > 3 && <Pill className="h-8 w-8" />}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{area.name}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    {area.description}
                  </p>
                  <p className="text-slate-500">
                    We offer a comprehensive selection of generic and specialized formulations within this domain, all manufactured under strict WHO-GMP guidelines to guarantee purity and efficacy.
                  </p>
                  <div className="pt-4">
                    <Link href={`/products?therapy=${area.id}`}>
                      <Button variant="outline" className="group">
                        Explore {area.name} Products
                        <ArrowRight className="ml-2 h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex-1 w-full relative">
                  <div className="aspect-[4/3] bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden relative z-10 shadow-lg">
                    <Image 
                      src="/images/facility_infrastructure.png" 
                      alt={area.name}
                      fill
                      className="object-cover opacity-90 transition-opacity hover:opacity-100 duration-500"
                    />
                  </div>
                  <div className={`absolute top-4 ${index % 2 === 0 ? '-right-4' : '-left-4'} w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10`} />
                </div>
                
              </div>
            ))}
            
          </div>
        </div>
      </section>
      
    </div>
  );
}
