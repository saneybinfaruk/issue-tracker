import Link from "next/link";
import React from "react";
import IssueFilterSelect from "./IssueFilterSelect";

const IssueToolbar = () => {
  return (
    <div className="flex justify-between">
      <IssueFilterSelect />
      <Link href={"/issues/new"} className="btn btn-secondary ">
        New Issue
      </Link>
    </div>
  );
};

export default IssueToolbar;
