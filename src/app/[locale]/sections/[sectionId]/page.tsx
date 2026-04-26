import { PageTransition } from "@/components/layout/PageTransition";
import { FloatingAIButton } from "@/components/layout/FloatingAIButton";
import { ArtifactCard } from "@/components/artifacts/ArtifactCard";
import { getDictionary } from "@/lib/dictionaries";
import { getArtifacts } from "@/lib/api";
import Link from "next/link";
import { Search } from "lucide-react";

// Map section IDs → localized names & icons
const SECTION_META: Record<string, { en: string; ar: string; icon: string }> = {
  "38": { en: "Ancient Egyptian Antiquities", ar: "الآثار المصرية القديمة",      icon: "🏺" },
  "39": { en: "Greco-Roman Antiquities",      ar: "الآثار اليونانية والرومانية", icon: "🏛️" },
  "40": { en: "Islamic Antiquities",           ar: "الآثار الإسلامية",            icon: "🕌" },
  "41": { en: "Coins Collection",             ar: "مجموعة العملات",              icon: "🪙" },
};

export default async function ArtifactsPage({
  params,
}: {
  params: Promise<{ locale: string; sectionId: string }>;
}) {
  const p = await params;
  const locale = p.locale as "en" | "ar";
  const sectionId = p.sectionId;
  const dict = getDictionary(locale);
  const isAr = locale === "ar";

  const meta = SECTION_META[sectionId] ?? {
    en: `Collection ${sectionId}`,
    ar: `المجموعة ${sectionId}`,
    icon: "🏛️",
  };
  const sectionName = isAr ? meta.ar : meta.en;

  let artifacts: any[] = [];
  try {
    artifacts = await getArtifacts(parseInt(sectionId));
  } catch (e) {
    console.error(e);
  }

  if (artifacts.length === 0) {
    artifacts = Array.from({ length: 8 }).map((_, i) => ({
      id: `${i}`,
      section_number: parseInt(sectionId),
      artifact_name_en: `Artifact ${i + 1}`,
      artifact_name_ar: `القطعة ${i + 1}`,
      hall_en: "Main Hall",
      hall_ar: "القاعة الرئيسية",
    }));
  }

  return (
    <PageTransition>
      <div
        dir={isAr ? "rtl" : "ltr"}
        className="min-h-screen bg-[var(--color-bg-primary)] papyrus-texture w-full flex flex-col"
      >
        {/* Header */}
        <header className="sticky top-0 z-40 bg-[var(--color-bg-secondary)]/90 backdrop-blur border-b border-[var(--color-gold)] p-4 flex items-center">
          <Link
            href={`/${locale}/sections`}
            className={`text-[var(--color-gold)] hover:text-[var(--color-gold-light)] flex items-center gap-2 text-sm ${isAr ? "font-[family-name:var(--font-arabic)] flex-row-reverse" : "font-sans"}`}
          >
            {dict.artifacts.backToCollections}
          </Link>
        </header>

        <main className="flex-1 max-w-[1280px] w-full mx-auto px-6 py-8">
          {/* Section Title */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 mx-auto bg-[var(--color-bg-card)] rounded-full flex items-center justify-center border border-[var(--color-gold)] mb-4 shadow-[0_0_15px_rgba(201,168,76,0.15)]">
              <span className="text-2xl">{meta.icon}</span>
            </div>
            <h1
              className={`text-3xl text-[var(--color-text-primary)] mb-4 ${isAr ? "font-[family-name:var(--font-arabic)]" : "font-[family-name:var(--font-cinzel)]"}`}
            >
              {sectionName}
            </h1>
            <div className="h-px w-32 bg-[var(--color-gold)] mx-auto opacity-50" />
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12 relative group">
            <Search
              className={`absolute ${isAr ? "right-4" : "left-4"} top-1/2 -translate-y-1/2 text-[var(--color-gold)] w-5 h-5`}
            />
            <input
              type="text"
              placeholder={dict.artifacts.searchPlaceholder}
              dir={isAr ? "rtl" : "ltr"}
              className={`w-full bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full py-3 ${isAr ? "pr-12 pl-4 font-[family-name:var(--font-arabic)] text-right" : "pl-12 pr-4"} text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-gold)] transition-colors group-hover:shadow-[0_0_15px_rgba(201,168,76,0.1)]`}
            />
          </div>

          {/* Artifacts Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artifacts.map((art: any) => (
              <ArtifactCard key={art.id} artifact={art} locale={locale} />
            ))}
          </div>
        </main>

        <FloatingAIButton locale={locale} />
      </div>
    </PageTransition>
  );
}
