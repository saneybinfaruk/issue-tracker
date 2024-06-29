import prisma from "@/prisma/PrismaClient";
import React from "react";
import StatusBadge from "./components/StatusBadge";
import Link from "next/link";
import Image from "next/image";

const LatestIssue = async () => {
  const issues = await prisma.issue.findMany({
    take: 5,
    orderBy: { id: "desc" },
    include: {
      assignedToUser: true,
    },
  });

  return (
    <div className="card bg-base-100  shadow-md border-2 border-slate-100">
      <div className="card-body">
        <h1 className="card-title text-black text-xl mb-2">Latest Issue</h1>
        <table className="table">
          <tbody>
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/issues/${issue.id}`}
                      className="link link-hover"
                    >
                      {issue.title}
                    </Link>
                    <StatusBadge status={issue.status} />
                  </div>
                </td>
                <td>
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      {issue.assignedToUser?.image && (
                        <Image
                          src={issue.assignedToUser?.image!}
                          alt="User avater image"
                          width={20}
                          height={20}
                        />
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LatestIssue;
