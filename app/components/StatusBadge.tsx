import { Status } from "@prisma/client";
import classNames from "classnames";
import React from "react";

const statusMap: Record<
  Status,
  { label: string; color: "bg-red-200" | "bg-yellow-200" | "bg-green-200" }
> = {
  OPEN: { label: "Open", color: "bg-red-200" },
  IN_PROGRESS: { label: "In Progress", color: "bg-yellow-200" },
  CLOSED: { label: "Closed", color: "bg-green-200" },
};
const StatusBadge = ({ status }: { status: Status }) => {
  const statusInfo = statusMap[status];
  const badgeClass = classNames(statusInfo.color, "badge badge-lg");

  return <div className={badgeClass}>{statusMap[status].label}</div>;
};

export default StatusBadge;
