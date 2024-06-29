import React from "react";

const loading = () => {
  return (
    <div className="max-w-lg">
      <h1 className="font-medium text-black text-xl pb-2">
        <div className="skeleton h-8 w-100" />
      </h1>
      <div className="flex items-center gap-4 pb-3 ">
        <div className="skeleton h-8 w-16" />
        <div className="skeleton h-8 w-full" />
      </div>
      <div className="card bg-slate-100 shadow-inner prose mt-2">
        <div className="card-body">
          <div className="skeleton h-32 w-full" />
        </div>
      </div>
    </div>
  );
};

export default loading;
