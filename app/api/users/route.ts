import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });

  return NextResponse.json(users);
};
