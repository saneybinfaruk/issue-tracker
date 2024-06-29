import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchema";
import prisma from "@/prisma/PrismaClient";
import { getServerSession } from "next-auth";
import { authOption } from "../auth/[...nextauth]/AuthOptions";


export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOption);
  if (!session)
    return NextResponse.json({ error: "Access Denied!" }, { status: 401 });

  const body = await request.json();
  const validate = issueSchema.safeParse(body);

  if (!validate.success)
    return NextResponse.json(
      { error: validate.error?.errors },
      { status: 400 }
    );

  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(issue, { status: 201 });
};
