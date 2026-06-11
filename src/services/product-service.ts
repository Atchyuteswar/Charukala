import { prisma } from "@/lib/prisma";

export async function getFeaturedProducts() {
  return await prisma.product.findMany({
    where: {
      featured: true,
    },

    orderBy: {
      createdAt: "desc",
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

export async function getProductsByCategory(
  category: string
) {
  return await prisma.product.findMany({
    where: {
      category,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductsBySubCategory(
  subCategory: string
) {
  return await prisma.product.findMany({
    where: {
      subCategory,
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getFilteredProducts({
  category,
  subCategory,
}: {
  category?: string;
  subCategory?: string;
}) {
  return await prisma.product.findMany({
    where: {
      ...(category && {
        category,
      }),

      ...(subCategory && {
        subCategory,
      }),
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductBySlug(
  slug: string
) {
  return await prisma.product.findUnique({
    where: {
      slug,
    },
  });
}