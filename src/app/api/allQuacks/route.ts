import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const res = await request.json();
  const allQuacks = await prisma.quack.findMany({
    where: {
      authorId: res.get("id"),
    },
  });
  return allQuacks;
}
