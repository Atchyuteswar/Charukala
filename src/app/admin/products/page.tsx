import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import DeleteButton from "@/components/DeleteButton";

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">
                    Products
                </h1>

                <Link
                    href="/admin/products/create"
                    className="
          bg-[#9c1d4f]
          text-white
          px-5
          py-3
          rounded-xl
          hover:opacity-90
          "
                >
                    Add Product
                </Link>

            </div>

            <div className="overflow-hidden rounded-2xl border">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">
                                Image
                            </th>

                            <th className="p-4 text-left">
                                Product
                            </th>

                            <th className="p-4 text-left">
                                Price
                            </th>

                            <th className="p-4 text-left">
                                Stock
                            </th>

                            <th className="p-4 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {products.map((product) => (

                            <tr
                                key={product.id}
                                className="border-t"
                            >

                                <td className="p-4">

                                    <div className="relative h-20 w-20 rounded-lg overflow-hidden">

                                        <Image
                                            src={
                                                product.images?.[0] ||
                                                "https://picsum.photos/200"
                                            }
                                            alt={product.name}
                                            fill
                                            sizes="80px"
                                            className="object-cover"
                                        />

                                    </div>

                                </td>

                                <td className="p-4 font-medium">

                                    {product.name}

                                </td>

                                <td className="p-4">

                                    ₹{product.price}

                                </td>

                                <td className="p-4">

                                    {product.stock}

                                </td>

                                <td className="p-4">

                                    <div className="flex gap-3">

                                        <Link
                                            href={`/admin/products/${product.id}`}
                                            className="
      px-4
      py-2
      rounded-lg
      bg-blue-500
      text-white
      "
                                        >
                                            Edit
                                        </Link>

                                        <DeleteButton id={product.id}/>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}