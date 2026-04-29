import { GlobalNavigation } from "@/components/layout/GlobalNavigation";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const p = await params;
  const locale = p.locale as "en" | "ar";
  const isRTL = locale === "ar";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      lang={locale}
      className={`w-full min-h-screen flex flex-col ${isRTL ? "font-[family-name:var(--font-noto-naskh)]" : ""}`}
    >
      <GlobalNavigation locale={locale} />
      {children}
    </div>
  );
}
