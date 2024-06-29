"use client";

import { getServerSession } from "next-auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const DeleteIssueBtn =  ({ issueId }: { issueId: number }) => {
  const route = useRouter();

  const [deleting, setDelete] = useState(false);

  const openModal = () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    modal?.showModal();
  };
  const closeModal = async () => {
    const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
    setDelete(true);
    modal?.close();

    try {
      await fetch(`/api/issues/${issueId}`, {
        method: "DELETE",
      });
    } catch (error) {
      setDelete(false);
    }

    route.push("/issues");
    route.refresh();
  };

  return (
    <>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <button className="btn">Cancel</button>
            </form>

            <button className="btn btn-error" onClick={closeModal}>
              Delete
            </button>
          </div>
        </div>
      </dialog>

      <button className="btn btn-error" onClick={openModal} disabled={deleting}>
        {deleting && <span className="loading loading-spinner loading-xs" />}
        Issue Delete
      </button>
    </>
  );
};

export default DeleteIssueBtn;
