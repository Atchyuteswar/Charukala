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
    <div className="p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Commerce Dashboard</h1>
        <p className="text-gray-500 mt-2">Overview of your store&apos;s performance.</p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* REVENUE */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Revenue</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">₹{revenue.toLocaleString('en-IN')}</h2>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <IndianRupee className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Products</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">{productsCount}</h2>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        {/* ORDERS */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Orders</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">{ordersCount}</h2>
            </div>
            <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center">
              <ShoppingBag className="text-indigo-600" size={24} />
            </div>
          </div>
        </div>

        {/* USERS */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Users</p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">{usersCount}</h2>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center">
              <Users className="text-purple-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* CHARTS */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Revenue Analytics</h2>
          <DashboardCharts orders={orders} />
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {recentOrders.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <li key={order.id} className="p-6 hover:bg-gray-50 transition">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{order.fullName}</h3>
                      <span className="font-bold text-gray-900">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        {order.city}, {order.state}
                      </p>
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                          order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                          'bg-indigo-100 text-indigo-700'
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