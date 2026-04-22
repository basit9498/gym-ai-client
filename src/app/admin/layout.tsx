import { AdminSidebar } from "@/modules/admin";
import AuthGuard from "@/components/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole="admin">
      <div className="flex min-h-screen bg-[#05051a]">
        <AdminSidebar />
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
