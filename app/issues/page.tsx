import prisma from "@/prisma/PrismaClient";
import React from "react";
import IssueToolbar from "./IssueToolbar";
import { issue, Status } from "@prisma/client";
import IssuesTable, { tHead } from "./IssuesTable";
import Pagination from "../components/Pagination";
import { Metadata } from "next";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof issue;
    page: string;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statues = Object.values(Status);

  const status = statues.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = tHead.map((t) => t.orderBy).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },

    orderBy,

    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const itemCount = await prisma.issue.count({ where: { status } });

  return (
    <div className="flex flex-col gap-3">
      <IssueToolbar />
      <IssuesTable issues={issues} searchParams={searchParams} />
      <div className="my-3">
        <Pagination currentPage={page} pageSize={10} itemCount={itemCount} />
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "Showing all issues",
};
