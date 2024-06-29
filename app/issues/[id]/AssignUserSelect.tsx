"use client";
import { issue, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AssignUserSelect = ({ issue }: { issue: issue }) => {
  const { users, loading } = useGetUsers();
  const router = useRouter();

  const handleOnSelect = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const userId = event.currentTarget.value;

    const response = await fetch(`/api/issues/${issue.id}`, {
      method: "PATCH",
      body: JSON.stringify({ assignedToUserId: userId ? userId : null }),
    });

    if (!response.ok) {
      toast.error("Error Occured", {
        position: "bottom-right",
      });
    } else {
      toast.success("Changed!", {
        position: "bottom-right",
      });
    }

    router.refresh()
  };

  if (loading) return <div className="skeleton h-12 w-full rounded-md"></div>;
  return (
    <>
      <select
        className="select select-bordered"
        defaultValue={issue.assignedToUserId || ""}
        onChange={handleOnSelect}
      >
        <option value={""}>Unassigned</option>
        {users?.map((user) => (
          <option key={user.id} value={user.id!}>
            {user.name}
          </option>
        ))}
      </select>
      <Toaster />
    </>
  );
};

export default AssignUserSelect;

const useGetUsers = () => {
  const [users, setUsers] = useState<User[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const users: User[] = await response.json();

        setUsers(users);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading };
};
