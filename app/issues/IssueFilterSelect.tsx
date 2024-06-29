"use client";
import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const IssueFilterSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const issueStatuses = [
    { label: "All", value: "" },
    { label: "Open", value: Status.OPEN },
    { label: "In Progress", value: Status.IN_PROGRESS },
    { label: "Closed", value: Status.CLOSED },
  ];
  return (
    <select
      className="select select-bordered w-lg max-w-xs "
      defaultValue={searchParams.get('status')!}
      onChange={(event) => {
        const status = event.currentTarget.value;
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);


        const query = params.size ? '?' + params.toString() : ''
        router.push(`/issues/${query}`);
      }}
    >
      {issueStatuses.map((status) => (
        <option key={status.label} value={status.value}>
          {status.label}
        </option>
      ))}
    </select>
  );
};

export default IssueFilterSelect;
