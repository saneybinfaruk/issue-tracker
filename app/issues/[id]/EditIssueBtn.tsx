import Link from "next/link";
import React from "react";
import { LiaEditSolid } from "react-icons/lia";

const EditIssueBtn = ({ issueId }: { issueId: number }) => {
  return (
    <div>
      <Link
        href={`/issues/${issueId}/edit`}
        className="btn btn-secondary text-white w-full"
      >
        <LiaEditSolid size={25} />
        Edit Issue
      </Link>
    </div>
  );
};

export default EditIssueBtn;
