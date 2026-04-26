"use client";
import { PageTransition } from "@/components/layout/PageTransition";
import { FloatingAIButton } from "@/components/layout/FloatingAIButton";
import { SectionCard } from "@/components/sections/SectionCard";
import { getDictionary } from "@/lib/dictionaries";
import { use } from "react";
import Link from "next/link";

const sections = [
  { id: 38, nameEn: "Ancient Egyptian Antiquities", nameAr: "الآثار المصرية القديمة", icon: "ankh", count: 60 },
  { id: 39, nameEn: "Greco-Roman Antiquities", nameAr: "الآثار اليونانية والرومانية", icon: "column", count: 20 },
  { id: 40, nameEn: "Islamic Antiquities", nameAr: "الآثار الإسلامية", icon: "crescent", count: 10 },
  { id: 41, nameEn: "Coins Collection", nameAr: "مجموعة العملات", icon: "coin", count: 7 },
];

export default function SectionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const p = use(params);
  const locale = p.locale as "en" | "ar";
  const dict = getDictionary(locale);
  const otherLocale = locale === 'en' ? 'ar' : 'en';
  const otherLocaleLabel = locale === 'en' ? 'عربي' : 'English';

  return (
    <PageTransition>
      <div className="min-h-screen bg-[var(--color-bg-primary)] papyrus-texture w-full flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[var(--color-bg-secondary)]/90 backdrop-blur border-b border-[var(--color-gold)] p-4 flex justify-between items-center">
          <div className={`text-[var(--color-gold)] text-sm tracking-widest ${locale === 'ar' ? 'font-[family-name:var(--font-noto-naskh)] text-base' : 'font-[family-name:var(--font-cinzel)]'}`}>
            {locale === 'ar' ? 'مكتبة الإسكندرية' : 'Bibliotheca Alexandrina'}
          </div>
          <Link href={`/${otherLocale}/sections`} className="text-sm border border-[var(--color-border)] px-3 py-1 rounded hover:border-[var(--color-gold)] text-[var(--color-text-secondary)] hover:text-[var(--color-gold)] transition-colors font-sans">
            {otherLocaleLabel}
          </Link>
        </header>

        <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className={`text-4xl text-[var(--color-text-primary)] mb-4 ${locale === 'ar' ? 'font-[family-name:var(--font-noto-naskh)]' : 'font-[family-name:var(--font-cinzel)]'}`}>
              {dict.sections.title}
            </h1>
            <div className="h-px w-24 bg-[var(--color-gold)] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section) => (
              <SectionCard key={section.id} section={section} locale={locale} />
            ))}
          </div>
        </main>
        
        <FloatingAIButton locale={locale} />
      </div>
    </PageTransition>
  );
}
