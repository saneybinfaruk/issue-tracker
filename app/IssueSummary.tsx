import { Status } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  in_progress: number;
  closed: number;
}
const IssueSummary = ({ open, in_progress, closed }: Props) => {
  const containers = [
    { label: "Open Issues", count: open, status: Status.OPEN },
    {
      label: "In Progress Issues",
      count: in_progress,
      status: Status.IN_PROGRESS,
    },
    { label: "Closed Issues", count: closed, status: Status.CLOSED },
  ];

  return (
    <div className="flex items-center gap-5 my-5">
      {containers.map((container) => (
        <div className="card shadow-xs border-2 border-slate-100">
          <div className="card-body">
            <h1 className="text-lg font-bold">{container.count}</h1>
            <Link href={`/issues?status=${container.status}`} className="text-md link link-hover">{container.label}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssueSummary;
