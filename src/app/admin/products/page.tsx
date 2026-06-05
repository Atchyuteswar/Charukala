import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/DeleteButton";
import { Plus } from "lucide-react";

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="p-8 bg-[#F8F3EA] min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="font-brand text-4xl font-bold text-[#2A2A2A] tracking-tight">Products</h1>
                    <p className="text-[#6B6B6B] mt-2">Manage your product catalog.</p>
                </div>
                <Link
                    href="/admin/products/create"
                    className="
                        flex items-center gap-2
                        bg-[#7A0019]
                        text-[#F8F3EA]
                        px-4
                        py-2.5
                        rounded-lg
                        font-medium
                        hover:opacity-90
                        transition
                    "
                >
                    <Plus size={18} />
                    Add Product
                </Link>
            </div>

            <div className="bg-white border border-[#E8DCC4] rounded-xl shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#FAFAFA] border-b border-[#E8DCC4]">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                                    Product
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                                    Stock
                                </th>
                                <th className="px-6 py-4 text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E8DCC4]">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-[#FAFAFA] transition">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <div className="relative h-12 w-12 rounded-md overflow-hidden bg-[#F8F3EA] flex-shrink-0 border border-[#E8DCC4]">
                                                <Image
                                                    src={product.images?.[0] || "/placeholder-saree.jpg"}
                                                    alt={product.name}
                                                    fill
                                                    sizes="48px"
                                                    className="object-cover"
                                                />
                                            </div>
                                            <span className="font-medium text-[#2A2A2A]">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-[#6B6B6B]">
                                        ₹{product.price.toLocaleString('en-IN')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-medium uppercase tracking-wider
                                                ${product.stock > 10 ? 'bg-green-50 text-green-700 border border-green-200' :
                                                  product.stock > 0 ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                                                  'bg-red-50 text-red-700 border border-red-200'
                                                }`}
                                        >
                                            {product.stock} in stock
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link
                                                href={`/admin/products/${product.id}`}
                                                className="text-[#7A0019] hover:bg-[#F8F3EA] border border-transparent hover:border-[#E8DCC4] px-3 py-1.5 rounded-md transition"
                                            >
                                                Edit
                                            </Link>
                                            <DeleteButton id={product.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {products.length === 0 && (
                    <div className="p-12 text-center text-[#6B6B6B]">
                        No products found. Click &quot;Add Product&quot; to create one.
                    </div>
                )}
            </div>
        </div>
    );
}
