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
        description: "Premium Silk Saree",
        price: 2999,
        stock: 50,
        featured: true,
        category: "Sarees",
        images: ["/saree1.jpg"],
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });