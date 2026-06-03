import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, LogOut } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#F8F3EA] flex pt-20">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-[#E8DCC4] flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-[#E8DCC4]">
          <span className="font-brand font-bold text-2xl text-[#7A0019] tracking-tight">Admin Portal</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[#2A2A2A] hover:bg-[#F8F3EA] hover:text-[#7A0019] font-medium transition">
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[#2A2A2A] hover:bg-[#F8F3EA] hover:text-[#7A0019] font-medium transition">
            <Package size={18} />
            Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[#2A2A2A] hover:bg-[#F8F3EA] hover:text-[#7A0019] font-medium transition">
            <ShoppingBag size={18} />
            Orders
          </Link>
        </nav>
        <div className="p-4 border-t border-[#E8DCC4]">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[#6B6B6B] hover:bg-[#F8F3EA] hover:text-[#7A0019] font-medium transition">
            <LogOut size={18} />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-x-hidden pb-20 md:pb-0">
        {children}
      </main>

      {/* MOBILE BOTTOM NAV */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8DCC4] flex justify-around p-3 z-50">
          <Link href="/admin" className="flex flex-col items-center text-[#6B6B6B] hover:text-[#7A0019]">
            <LayoutDashboard size={22} />
            <span className="text-[10px] mt-1 font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/products" className="flex flex-col items-center text-[#6B6B6B] hover:text-[#7A0019]">
            <Package size={22} />
            <span className="text-[10px] mt-1 font-medium">Products</span>
          </Link>
          <Link href="/admin/orders" className="flex flex-col items-center text-[#6B6B6B] hover:text-[#7A0019]">
            <ShoppingBag size={22} />
            <span className="text-[10px] mt-1 font-medium">Orders</span>
          </Link>
          <Link href="/" className="flex flex-col items-center text-[#6B6B6B] hover:text-[#7A0019]">
            <LogOut size={22} />
            <span className="text-[10px] mt-1 font-medium">Exit</span>
          </Link>
      </nav>
    </div>
  );
}