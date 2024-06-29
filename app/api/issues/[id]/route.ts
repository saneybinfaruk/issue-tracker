import { patchSchema, issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/PrismaClient";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "../../auth/[...nextauth]/AuthOptions";


export const PATCH = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const body = await request.json();

  const { title, description, status, assignedToUserId } = body;

  console.log("=============body=======================");
  console.log(body);
  console.log("====================================");

  const validate = patchSchema.safeParse(body);
  if (!validate.success)
    return NextResponse.json({ error: validate.error.errors }, { status: 400 });

  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user)
      return NextResponse.json({ message: "Invalid user" }, { status: 404 });
  }

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue)
    return NextResponse.json({ message: "Invalid Issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: {
      title,
      description,
      status,
      assignedToUserId,
    },
  });

  return NextResponse.json({ updatedIssue });
};
export const DELETE = async (
  request: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  const session = await getServerSession(authOption);
  if (!session)
    return NextResponse.json({ error: "Access Denied!" }, { status: 401 });

  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue)
    return NextResponse.json({ message: "Invalid Issue" }, { status: 404 });

  const deletedIssue = await prisma.issue.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ updatedIssue: deletedIssue });
};
