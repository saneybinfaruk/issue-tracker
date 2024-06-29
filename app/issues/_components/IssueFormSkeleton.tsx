import React from "react";

const IssueFormSkeleton = () => {
  return (
    <div className="max-w-lg flex gap-5 flex-col">
      <div className="skeleton h-10 w-full"></div>
      <div className="skeleton h-32 w-full"></div>
    </div>
  );
};

export default IssueFormSkeleton;
