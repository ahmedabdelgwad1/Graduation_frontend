"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function ArtifactCard({ artifact, locale }: { artifact: any; locale: "en" | "ar" }) {
  const router = useRouter();
  const name = locale === 'en' ? artifact.artifact_name_en : artifact.artifact_name_ar;
  const hall = locale === 'en' ? artifact.hall_en : artifact.hall_ar;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="relative flex flex-col group cursor-pointer bg-[var(--color-bg-card)] rounded-lg overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-gold)] transition-colors duration-300"
      onClick={() => router.push(`/${locale}/artifacts/${artifact.id}`)}
    >
      <div className="relative h-48 w-full bg-[#12111a] overflow-hidden">
        {artifact.image_url ? (
          <Image 
            src={artifact.image_url} 
            alt={name || ""} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-20">
            <svg viewBox="0 0 100 100" width="40" height="40" fill="var(--color-gold)">
              <path d="M50 20C20 20 5 50 5 50C5 50 20 80 50 80C80 80 95 50 95 50C95 50 80 20 50 20ZM50 70C38.95 70 30 61.05 30 50C30 38.95 38.95 30 50 30C61.05 30 70 38.95 70 50C70 61.05 61.05 70 50 70Z"></path>
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      </div>
      
      <div className={`p-4 bg-[var(--color-bg-card)] flex-1 flex flex-col justify-between ${locale === 'ar' ? 'text-right' : ''}`}>
        <div>
          <h3 className={`text-lg text-[var(--color-text-primary)] mb-1 ${locale === 'ar' ? 'font-[family-name:var(--font-arabic)]' : 'font-[family-name:var(--font-cinzel)]'}`}>
            {name || (locale === 'ar' ? 'قطعة غير معروفة' : 'Unknown Artifact')}
          </h3>
          <p className={`text-sm text-[var(--color-text-secondary)] ${locale === 'ar' ? 'font-[family-name:var(--font-arabic)]' : 'font-sans'}`}>{hall}</p>
        </div>
        <p className="text-sm text-[var(--color-gold)] mt-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-sans">
          {locale === 'en' ? 'View Details →' : '← عرض التفاصيل'}
        </p>
      </div>
    </motion.div>
  );
}
