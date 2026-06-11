import "dotenv/config";

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Kanchipuram Silk Saree",
        slug: "kanchipuram-silk",
        description: "Premium Kanchipuram Silk Saree",
        price: 2999,
        stock: 50,
        featured: true,
        category: "Sarees",
        subCategory: "Silk Sarees",
        images: ["/placeholder-saree.jpg"],
      },

      {
        name: "Banarasi Wedding Saree",
        slug: "banarasi-wedding",
        description: "Traditional Banarasi Saree",
        price: 4499,
        stock: 20,
        featured: true,
        category: "Sarees",
        subCategory: "Banarasi Sarees",
        images: ["/placeholder-saree.jpg"],
      },

      {
        name: "Handloom Cotton Saree",
        slug: "handloom-cotton",
        description: "Comfortable Cotton Saree",
        price: 1999,
        stock: 35,
        featured: false,
        category: "Sarees",
        subCategory: "Cotton Sarees",
        images: ["/placeholder-saree.jpg"],
      },

      {
        name: "Designer Kalamkari Saree",
        slug: "designer-kalamkari",
        description: "Authentic Kalamkari Craft",
        price: 3499,
        stock: 15,
        featured: true,
        category: "Sarees",
        subCategory: "Kalamkari Sarees",
        images: ["/placeholder-saree.jpg"],
      },

      {
        name: "Premium Ready Made Dress",
        slug: "premium-ready-made-dress",
        description: "Elegant ready-made dress",
        price: 2499,
        stock: 40,
        featured: true,
        category: "Dresses",
        subCategory: "Ready-Made Dresses",
        images: ["/placeholder-saree.jpg"],
      },

      {
        name: "Designer Dress Material",
        slug: "designer-dress-material",
        description: "Unstitched premium material",
        price: 1799,
        stock: 60,
        featured: false,
        category: "Dresses",
        subCategory: "Unstitched Materials",
        images: ["/placeholder-saree.jpg"],
      },
    ],
  });

  console.log("Seed completed");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });