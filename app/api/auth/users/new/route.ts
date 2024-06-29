import { SignUpSchema } from "@/app/validationSchema";
import prisma from "@/prisma/PrismaClient";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  const validate = SignUpSchema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(
      { error: validate.error.errors[0].message },
      { status: 400 }
    );

  const user = await prisma.user.findUnique({ where: { email: body.email } });

  if (user)
    return NextResponse.json(
      { error: "User already exists!" },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(body.password, 12);

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
      image: body.image,
    },
  });

  return NextResponse.json(newUser);
};
