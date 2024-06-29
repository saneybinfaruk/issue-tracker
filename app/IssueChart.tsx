"use client";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  open: number;
  in_progress: number;
  closed: number;
}

const IssueChart = ({ open, in_progress, closed }: Props) => {
  const data = [
    { label: "Open", status: open },
    { label: "In Progress", status: in_progress },
    { label: "Closed", status: closed },
  ];
  return (
    <div>
      <ResponsiveContainer width={"97%"} height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="2 2" />
          <Tooltip />
          <XAxis dataKey={"label"}></XAxis>
          <YAxis dataKey={"status"} />
          <Bar
            dataKey="status"
            barSize={65}
            style={{ fill: "oklch(var(--s))" }}
          />
          <Legend />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IssueChart;
