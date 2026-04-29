import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale: "en" | "ar" = "en"; // Defaulting to english for admin, or can be changed to use next-intl cookies later
  const isRTL = (locale as string) === "ar";

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

