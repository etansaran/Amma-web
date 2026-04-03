"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";
import { useLanguage } from "@/context/LanguageContext";

export default function ServicesSection() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#0D0D0D] to-[#0A1208]">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          sanskritLabel={s.label}
          title={s.title}
          subtitle={s.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {s.list.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
