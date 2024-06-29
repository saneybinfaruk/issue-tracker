import { issue, Status } from "@prisma/client";
import Link from "next/link";
import React from "react";
import StatusBadge from "../components/StatusBadge";
import { useSearchParams } from "next/navigation";
import { BsArrowUp } from "react-icons/bs";
import { TiArrowSortedUp } from "react-icons/ti";

interface Props {
  searchParams: { status: Status; orderBy: keyof issue };
  issues: issue[];
}
export const tHead: { label: string; orderBy: keyof issue }[] = [
  { label: "Issue", orderBy: "title" },
  { label: "Status", orderBy: "status" },
  { label: "Created", orderBy: "createdAt" },
];
const IssuesTable = ({ issues, searchParams }: Props) => {
  return (
    <div className="mt-4 rounded-lg border-2 overflow-hidden border-red-50">
      <table className="table">
        <thead className="bg-red-50 text-black text-sm">
          <tr>
            {tHead.map((t) => (
              <td>
                <Link
                  href={{ query: { ...searchParams, orderBy: t.orderBy } }}
                  className="link link-hover"
                >
                  {t.label}
                  {t.orderBy === searchParams.orderBy ? (
                    <TiArrowSortedUp size={18} className="inline ml-1" />
                  ) : (
                    ""
                  )}
                </Link>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id}>
              <td>
                <Link className="link link-hover" href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
              </td>
              <td>
                <StatusBadge status={issue.status} />
              </td>
              <td>{issue.createdAt.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssuesTable;
