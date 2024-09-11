import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const req = await request.json();
  const email = req.get("email");
  const password = req.get("password");
  const userFound = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (userFound) {
    const hashCheck = bcrypt.compareSync(password, userFound.password);
    if (hashCheck) {
      return userFound.id;
    }
    return Response.json({
      message: "Wrong password",
    });
  }
  return Response.json({
    message: "There is no account with this email",
  });
}
