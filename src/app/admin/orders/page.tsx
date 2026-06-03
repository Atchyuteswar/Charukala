import { prisma } from "@/lib/prisma";
import UpdateOrderStatus from "@/components/admin/UpdateOrderStatus";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="p-8 bg-[#F8F3EA] min-h-screen">
      <div className="mb-8">
        <h1 className="font-brand text-4xl font-bold text-[#2A2A2A] tracking-tight">Orders</h1>
        <p className="text-[#6B6B6B] mt-2">Manage customer orders and fulfillment.</p>
      </div>

      <div className="bg-white border border-[#E8DCC4] rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-[#FAFAFA] border-b border-[#E8DCC4]">
                    <tr>
                        <th className="px-6 py-4 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                            Order ID
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                            Customer
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                            Date
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider text-right">
                            Status
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DCC4]">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-[#FAFAFA] transition">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A2A2A]">
                                {order.id.slice(-8).toUpperCase()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-[#2A2A2A]">{order.fullName}</div>
                                <div className="text-sm text-[#6B6B6B]">{order.city}, {order.state}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#6B6B6B]">
                                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2A2A2A]">
                                ₹{order.totalAmount.toLocaleString('en-IN')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <UpdateOrderStatus
                                    orderId={order.id}
                                    currentStatus={order.status}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {orders.length === 0 && (
            <div className="p-12 text-center text-[#6B6B6B]">
                No orders found.
            </div>
        )}
      </div>
    </div>
  );
}