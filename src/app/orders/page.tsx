import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";

import Link from "next/link";

import OrderTimeline from "@/components/orders/OrderTimeline";

export default async function OrdersPage() {
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

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#F8F3EA] pt-32 pb-24">
      <div className="container-charukala max-w-5xl">
        {/* HEADER */}
        <div className="mb-12 border-b border-[#E8DCC4] pb-8">
          <p className="section-tag mb-4">Luxury Orders</p>
          <h1 className="font-brand text-5xl text-[#2A2A2A]">My Orders</h1>
          <p className="text-[#6B6B6B] mt-4 max-w-2xl text-lg">
            Track your luxury fashion purchases, shipment updates, and premium delivery experience.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border border-[#E8DCC4] p-16 text-center">
            <h2 className="font-brand text-3xl text-[#2A2A2A]">No Orders Yet</h2>
            <p className="text-[#6B6B6B] mt-4">Your luxury fashion journey starts here.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-[#E8DCC4] overflow-hidden"
              >
                {/* TOP HEADER */}
                <div className="border-b border-[#E8DCC4] px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#FAFAFA]">
                  <div>
                    <p className="text-sm text-[#6B6B6B] uppercase tracking-wider mb-1">Order ID</p>
                    <h2 className="text-lg text-[#2A2A2A] font-medium break-all">{order.id}</h2>
                    <p className="text-[#6B6B6B] mt-2 text-sm">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-sm text-[#6B6B6B] uppercase tracking-wider mb-1">Total Amount</p>
                      <h3 className="font-brand text-2xl text-[#2A2A2A]">₹{order.totalAmount}</h3>
                    </div>
                    <div>
                      <span
                        className={`
                          px-4 py-1.5 rounded-sm text-xs font-medium uppercase tracking-wider
                          ${
                            order.status === "DELIVERED"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : order.status === "CANCELLED"
                              ? "bg-red-50 text-red-700 border border-red-200"
                              : "bg-[#F8F3EA] text-[#7A0019] border border-[#E8DCC4]"
                          }
                        `}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* TIMELINE */}
                <div className="px-8 py-8 border-b border-[#E8DCC4] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
                  <OrderTimeline status={order.status} />
                </div>

                {/* ITEMS */}
                <div className="p-8 space-y-8">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-6">
                      {/* IMAGE */}
                      <div className="relative w-full sm:w-32 h-40 shrink-0 border border-[#E8DCC4]">
                        <Image
                          src={item.product.images?.[0] || "/placeholder-saree.jpg"}
                          alt={item.product.name}
                          fill
                          sizes="(max-width:640px) 100vw, 128px"
                          className="object-cover"
                        />
                      </div>
                      {/* INFO */}
                      <div className="flex-1 flex flex-col justify-center">
                        <h3 className="font-brand text-2xl text-[#2A2A2A] mb-2">{item.product.name}</h3>
                        <p className="text-[#6B6B6B] text-sm line-clamp-2 max-w-xl mb-4">
                          {item.product.description}
                        </p>
                        <div className="flex items-center gap-6 text-sm">
                          <p className="text-[#6B6B6B]">
                            Qty: <span className="text-[#2A2A2A]">{item.quantity}</span>
                          </p>
                          <p className="text-[#6B6B6B]">
                            Price: <span className="text-[#2A2A2A]">₹{item.price}</span>
                          </p>
                        </div>
                      </div>
                      {/* TOTAL */}
                      <div className="flex items-center justify-end sm:justify-start">
                        <h4 className="font-brand text-3xl text-[#7A0019]">₹{item.price * item.quantity}</h4>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SHIPPING DETAILS */}
                <div className="bg-[#FAFAFA] border-t border-[#E8DCC4] p-8">
                  <p className="section-tag mb-6">Shipping Details</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <p className="text-lg text-[#2A2A2A] font-medium">{order.fullName}</p>
                      <p className="text-[#6B6B6B]">{order.street}</p>
                      <p className="text-[#6B6B6B]">{order.city}, {order.state} {order.pincode}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[#6B6B6B]">Contact Number</p>
                      <p className="text-lg text-[#2A2A2A] font-medium">{order.phone}</p>
                    </div>
                  </div>
                </div>

                {/* INVOICE LINK */}
                <div className="border-t border-[#E8DCC4] px-8 py-5 flex items-center justify-end gap-4 bg-white">
                  <Link
                    href={`/api/invoice/${order.id}`}
                    className="text-sm font-medium text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors"
                  >
                    Download PDF
                  </Link>
                  <Link
                    href={`/invoice/${order.id}`}
                    className="btn-primary text-sm py-2.5! px-5!"
                  >
                    View Invoice
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
