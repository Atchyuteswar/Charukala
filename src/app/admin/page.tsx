import { prisma } from "@/lib/prisma";
import { Package, ShoppingBag, IndianRupee, Users } from "lucide-react";
import DashboardCharts from "@/components/admin/DashboardCharts";

export default async function AdminDashboard() {
  const productsCount = await prisma.product.count();
  const ordersCount = await prisma.order.count();
  const usersCount = await prisma.user.count();
  const orders = await prisma.order.findMany();

  const revenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  const recentOrders = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8 bg-[#F8F3EA] min-h-screen">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="font-brand text-4xl font-bold text-[#2A2A2A] tracking-tight">Commerce Dashboard</h1>
        <p className="text-[#6B6B6B] mt-2">Overview of your store&apos;s performance.</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* REVENUE */}
        <div className="bg-white rounded-xl border border-[#E8DCC4] shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B6B6B] uppercase tracking-wider">Total Revenue</p>
              <h2 className="font-brand text-3xl font-bold text-[#2A2A2A] mt-2">₹{revenue.toLocaleString('en-IN')}</h2>
            </div>
            <div className="w-12 h-12 rounded-lg bg-[#F8F3EA] flex items-center justify-center">
              <IndianRupee className="text-[#7A0019]" size={24} />
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="bg-white rounded-xl border border-[#E8DCC4] shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B6B6B] uppercase tracking-wider">Total Products</p>
              <h2 className="font-brand text-3xl font-bold text-[#2A2A2A] mt-2">{productsCount}</h2>
            </div>
            <div className="w-12 h-12 rounded-lg bg-[#F8F3EA] flex items-center justify-center">
              <Package className="text-[#D4A857]" size={24} />
            </div>
          </div>
        </div>

        {/* ORDERS */}
        <div className="bg-white rounded-xl border border-[#E8DCC4] shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B6B6B] uppercase tracking-wider">Total Orders</p>
              <h2 className="font-brand text-3xl font-bold text-[#2A2A2A] mt-2">{ordersCount}</h2>
            </div>
            <div className="w-12 h-12 rounded-lg bg-[#F8F3EA] flex items-center justify-center">
              <ShoppingBag className="text-[#7A0019]" size={24} />
            </div>
          </div>
        </div>

        {/* USERS */}
        <div className="bg-white rounded-xl border border-[#E8DCC4] shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B6B6B] uppercase tracking-wider">Total Users</p>
              <h2 className="font-brand text-3xl font-bold text-[#2A2A2A] mt-2">{usersCount}</h2>
            </div>
            <div className="w-12 h-12 rounded-lg bg-[#F8F3EA] flex items-center justify-center">
              <Users className="text-[#D4A857]" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* CHARTS */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E8DCC4] shadow-sm p-6">
          <h2 className="font-brand text-2xl font-bold text-[#2A2A2A] mb-6">Revenue Analytics</h2>
          <DashboardCharts orders={orders} />
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white rounded-xl border border-[#E8DCC4] shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[#E8DCC4]">
            <h2 className="font-brand text-2xl font-bold text-[#2A2A2A]">Recent Orders</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {recentOrders.length > 0 ? (
              <ul className="divide-y divide-[#E8DCC4]">
                {recentOrders.map((order) => (
                  <li key={order.id} className="p-6 hover:bg-[#FAFAFA] transition">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-[#2A2A2A]">{order.fullName}</h3>
                      <span className="font-bold text-[#2A2A2A]">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-[#6B6B6B]">
                        {order.city}, {order.state}
                      </p>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-sm uppercase tracking-wider ${
                          order.status === 'DELIVERED' ? 'bg-green-50 text-green-700 border border-green-200' :
                          order.status === 'CANCELLED' ? 'bg-red-50 text-red-700 border border-red-200' :
                          'bg-[#F8F3EA] text-[#7A0019] border border-[#E8DCC4]'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center text-gray-500">No recent orders.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}