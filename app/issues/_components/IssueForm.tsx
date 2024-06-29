"use client";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { issueFormField, issueSchema } from "@/app/validationSchema";
import "easymde/dist/easymde.min.css";
import { issue, Status } from "@prisma/client";
import SimpleMdeReact from "react-simplemde-editor";

const IssueForm = ({ issue }: { issue?: issue }) => {
  const router = useRouter();
  const [selectedStats, setSelectedStatus] = useState(
    issue?.status || Status.OPEN
  );

  const statusSelect = [
    { label: "Open", status: Status.OPEN },
    { label: "In Progress", status: Status.IN_PROGRESS },
    { label: "Closed", status: Status.CLOSED },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<issueFormField>({
    resolver: zodResolver(issueSchema),
  });

  const submitIssue: SubmitHandler<issueFormField> = async (data) => {
    const body = { ...data, status: selectedStats };
    try {
      if (issue) {
        await fetch(`/api/issues/${issue.id}`, {
          method: "PATCH",
          body: JSON.stringify(body),
        });
      } else {
        await fetch("/api/issues", {
          method: "POST",
          body: JSON.stringify(data),
        });
      }

      router.push("/issues");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitIssue)}
      className="flex flex-col gap-3 max-w-xl mx-auto"
    >
      <input
        {...register("title")}
        type="text"
        placeholder="Title..."
        defaultValue={issue?.title}
        className="input input-bordered w-full "
      />
      {errors.title && (
        <span className="text-red-500 ml-1">{errors.title.message}</span>
      )}

      {issue && (
        <select
          className="select select-bordered w-full max-w-full"
          onChange={(event) => {
            setSelectedStatus(event.target.value as Status);
          }}
          defaultValue={issue?.status}
        >
          {statusSelect.map((status) => (
            <option key={status.label} value={status.status}>
              {status.label}
            </option>
          ))}
        </select>
      )}

      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
        render={({ field }) => (
          <SimpleMdeReact placeholder="Description...." {...field} ref={null} />
        )}
      />

      {errors.description && (
        <span className="text-red-500 ml-1">{errors.description.message}</span>
      )}
      <button type="submit" className="btn btn-primary">
        {isSubmitting && <span className="loading loading-spinner"></span>}
        {issue ? "Update Issue" : "Submit New Issue"}
      </button>
    </form>
  );
};

export default IssueForm;
