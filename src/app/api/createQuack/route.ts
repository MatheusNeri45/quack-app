import { Duck, PrismaClient } from "@prisma/client";
import { connect } from "http2";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const res = await request.json();
  const contentLength = res.get("content");
  if (contentLength > 0 && contentLength <= 300) {
    const duckFound = await prisma.duck.findFirst({
      where: {
        id: res.get("id"),
      },
    });

    if (duckFound) {
      const quack = prisma.duck.update({
        where: {
          id: duckFound.id,
        },
        data: {
          quacks: {
            create: {
              content: res.get("content"),
              published: true,
            },
          },
        },
      });
      return Response.json({
        message: "Your quack was heard!",
        "Quack info": quack,
      });
    }
    return Response.json({
      message: "You need to be a part of the flock to quack here.",
    });
  } else if (contentLength == 0) {
    return Response.json({
      message: "You need some letters in there...",
    });
  }
  return Response.json({
    message: "Your quack needs to be shorter than 300 characters.",
  });
}
