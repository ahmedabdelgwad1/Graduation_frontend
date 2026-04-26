import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const p = await params;
  const locale = p.locale;
  const isRTL = locale === "ar";

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="bg-[var(--color-background)] text-[var(--color-on-surface)] antialiased min-h-screen flex selection:bg-[var(--color-primary)] selection:text-[var(--color-background)]"
    >
      <AdminSidebar locale={locale} />
      <main className={`flex-1 flex flex-col min-h-screen bg-[var(--color-background)] pt-16 ${isRTL ? "mr-0 md:mr-64" : "ml-0 md:ml-64"}`}>
        <AdminHeader locale={locale} />
        {children}
      </main>
    </div>
  );
}

