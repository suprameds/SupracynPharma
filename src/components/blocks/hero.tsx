"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imagePlaceholder?: boolean;
}

export function Hero({
  title,
  subtitle,
  primaryCtaText = "Partner Inquiry",
  primaryCtaLink = "/partnerships",
  secondaryCtaText = "Explore Portfolio",
  secondaryCtaLink = "/products",
  imagePlaceholder = true,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed">
                {subtitle}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={primaryCtaLink}>
                <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                  {primaryCtaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={secondaryCtaLink}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 px-8">
                  {secondaryCtaText}
                </Button>
              </Link>
            </div>
          </motion.div>

          {imagePlaceholder && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/3] rounded-2xl bg-slate-100 border overflow-hidden relative shadow-xl">
                <Image 
                  src="/images/hero_corporate.png" 
                  alt="Supracyn Corporate Facility" 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Optional decor element */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute -z-10 -top-6 -left-6 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
            </motion.div>
          )}
          
        </div>
      </div>
    </section>
  );
}
