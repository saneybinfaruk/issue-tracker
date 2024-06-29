"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  MdArrowCircleLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}
const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const route = useRouter();

  const totalPage = Math.ceil(itemCount / pageSize);

  if (totalPage <= 1) return null;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    route.push("?" + params.toString());
  };

  return (
    <div className="flex items-center gap-2 justify-center">
      <button
        className="btn btn-sm"
        onClick={() => handlePageChange(1)}
        disabled={currentPage <= 1}
      >
        <MdKeyboardDoubleArrowLeft size={24} />
      </button>
      <button
        className="btn btn-sm"
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <MdKeyboardArrowLeft size={24} />
      </button>
      <p className="mx-1">
        Page {currentPage} of {totalPage}
      </p>
      <button
        className="btn btn-sm"
        disabled={currentPage === totalPage}
        onClick={() => handlePageChange((currentPage += 1))}
      >
        <MdKeyboardArrowRight size={24} />
      </button>
      <button
        className="btn btn-sm"
        disabled={currentPage === totalPage}
        onClick={() => handlePageChange((currentPage = totalPage))}
      >
        <MdKeyboardDoubleArrowRight size={24} />
      </button>
    </div>
  );
};

export default Pagination;
