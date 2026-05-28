import { prisma } from "@/lib/prisma";

export async function getFeaturedProducts() {
  return await prisma.product.findMany({
    where: {
      featured: true,
    },
  });
}

export async function getAllProducts() {
  return await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: {
      slug,
    },
  });
}