import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, User, LogOut } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    redirect("/");
  }

  const orderCount = await prisma.order.count({
    where: { userId: user.id },
  });

  return (
    <div className="min-h-screen bg-[#F8F3EA] pt-32 pb-24">
      <div className="container-charukala max-w-4xl">
        {/* HEADER */}
        <div className="mb-12 border-b border-[#E8DCC4] pb-8 text-center">
          <p className="section-tag mb-4">My Account</p>
          <h1 className="font-brand text-5xl text-[#2A2A2A]">Welcome, {user.name || "Guest"}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* PROFILE CARD */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white border border-[#E8DCC4] p-8 text-center">
              <div className="w-20 h-20 bg-[#F8F3EA] rounded-full mx-auto flex items-center justify-center mb-4 border border-[#E8DCC4]">
                <User size={32} className="text-[#7A0019]" />
              </div>
              <h2 className="font-brand text-2xl text-[#2A2A2A] mb-1">{user.name}</h2>
              <p className="text-[#6B6B6B] text-sm break-all">{user.email}</p>
            </div>
            
            <div className="bg-white border border-[#E8DCC4] p-6 space-y-2">
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 bg-[#F8F3EA] text-[#7A0019] font-medium"
              >
                <User size={18} />
                Account Overview
              </Link>
              <Link
                href="/orders"
                className="flex items-center gap-3 px-4 py-3 text-[#6B6B6B] hover:bg-[#F8F3EA] hover:text-[#7A0019] transition"
              >
                <Package size={18} />
                Order History
              </Link>
              <Link
                href="/api/auth/signout"
                className="flex items-center gap-3 px-4 py-3 text-[#6B6B6B] hover:bg-[#F8F3EA] hover:text-[#7A0019] transition"
              >
                <LogOut size={18} />
                Sign Out
              </Link>
            </div>
          </div>

          {/* OVERVIEW CONTENT */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-white border border-[#E8DCC4] p-8">
              <h3 className="font-brand text-3xl text-[#2A2A2A] mb-6">Account Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-[#6B6B6B] text-sm uppercase tracking-wider mb-2">Full Name</p>
                  <p className="text-lg text-[#2A2A2A]">{user.name || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-[#6B6B6B] text-sm uppercase tracking-wider mb-2">Email Address</p>
                  <p className="text-lg text-[#2A2A2A]">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E8DCC4] p-8">
              <h3 className="font-brand text-3xl text-[#2A2A2A] mb-6">Order Activity</h3>
              <div className="flex items-center justify-between border-b border-[#E8DCC4] pb-6 mb-6">
                <div>
                  <p className="text-lg text-[#2A2A2A]">Total Orders Placed</p>
                </div>
                <div>
                  <p className="font-brand text-4xl text-[#7A0019]">{orderCount}</p>
                </div>
              </div>
              <div className="text-center">
                <Link
                  href="/orders"
                  className="btn-secondary w-full sm:w-auto px-8"
                >
                  View Order History
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
