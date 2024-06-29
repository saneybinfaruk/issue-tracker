import React from "react";

const ErrorMessage = ({ message }: { message: string }) => {
  if(!message) return null;
  return (
    <div className="bg-red-200 p-2 rounded-lg">
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
