import React from "react";
import IssueToolbar from "./IssueToolbar";

const loading = () => {
  const issues = [, 2, 3, 4, 5, 6];

  return (
    <>
      <IssueToolbar />

      <div className="mt-4 rounded-lg border-2 overflow-hidden border-gray-200">
        <table className="table">
          <thead className="bg-red-50 text-black text-sm">
            <tr>
              <td>Issue</td>
              <td>Status</td>
              <td>Created</td>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue) => (
              <tr key={issue}>
                <td>
                  <div className="skeleton h-10 w-50 shrink-0 rounded-1"></div>
                </td>
                <td>
                  <div className="skeleton h-10 w-50 shrink-0 rounded-1"></div>
                </td>
                <td>
                  <div className="skeleton h-10 w-50 shrink-0 rounded-1"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default loading;
