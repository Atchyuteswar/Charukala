import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // not logged in
  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  // find user in DB
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // not admin
  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div>
      {children}
    </div>
  );
}