import Image from "next/image";
import LatestIssue from "./LatestIssue";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/PrismaClient";
import { Status } from "@prisma/client";
import IssueChart from "./IssueChart";
import { Metadata } from "next";

export default async function Home() {
  const openIssueCount = await prisma.issue.count({
    where: { status: Status.OPEN },
  });
  const inProggressIssueCount = await prisma.issue.count({
    where: { status: Status.IN_PROGRESS },
  });
  const closedIssueCount = await prisma.issue.count({
    where: { status: Status.CLOSED },
  });
  return (
    <main className="grid grid-cols-1 lg:grid-cols-10 gap-3">
      <section className="col-span-7">
        <IssueSummary
          open={openIssueCount}
          in_progress={inProggressIssueCount}
          closed={closedIssueCount}
        />
        <IssueChart
          open={openIssueCount}
          in_progress={inProggressIssueCount}
          closed={closedIssueCount}
        />
      </section>
      <section className="col-span-3">
        <LatestIssue />
      </section>
    </main>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "Dashboard description", 
};
