import StatusBadge from "@/app/components/StatusBadge";
import prisma from "@/prisma/PrismaClient";
import React from "react";
import ReactMarkDown from "react-markdown";
import EditIssueBtn from "./EditIssueBtn";
import DeleteIssueBtn from "./DeleteIssueBtn";
import AssignUserSelect from "./AssignUserSelect";
import { getServerSession } from "next-auth";

const IssueDetails = async ({ params: { id } }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({ where: { id: parseInt(id) } });

  if (!issue) return null;

  const session = await getServerSession();

  return (
    <section className="grid grid-cols-1 md:grid-cols-8 gap-4">
      <div className="card shadow-base border-2 col-span-6">
        <div className="card-body">
          <h1 className="card-title">{issue.title}</h1>
          <div className="flex flex-row gap-3 py-3">
            <StatusBadge status={issue.status} />
            <h4>{issue.createdAt.toDateString()}</h4>
          </div>

          <ReactMarkDown
            className={
              "prose shadow-inner py-5 px-7 bg-slate-100 rounded-lg text-gray-500 font-medium "
            }
          >
            {issue.description}
          </ReactMarkDown>
        </div>
      </div>

      <div className="flex flex-col w-full gap-3 col-span-2 ">
        {session && <AssignUserSelect issue={issue} />}
        <EditIssueBtn issueId={issue.id} />
        {session && <DeleteIssueBtn issueId={issue.id} />}
      </div>
    </section>
  );
};

export default IssueDetails;
