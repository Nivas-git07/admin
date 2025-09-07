import React from "react";
import complaints from "../data/complaints";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";
import { Pie, Line } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

export default function Analytics() {
  const statusCounts = {
    Open: complaints.filter((c) => c.status === "open").length,
    "In Progress": complaints.filter((c) => c.status === "inprogress").length,
    Resolved: complaints.filter((c) => c.status === "resolved").length,
  };

  const pieData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#DC2626", "#4338CA", "#16A34A"],
      },
    ],
  };

  return (
    <main className="max-w-7xl mx-auto w-full px-6 mt-6">
      <section className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Complaints by Status</h3>
            <Pie data={pieData} />
          </div>
          <div>
            <h3 className="font-semibold mb-4">Complaints by Month</h3>
            <Line
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr"],
                datasets: [
                  {
                    label: "Complaints",
                    data: [2, 4, 1, 3],
                    borderColor: "#2563EB",
                    backgroundColor: "rgba(37, 99, 235, 0.3)",
                    fill: true,
                  },
                ],
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
