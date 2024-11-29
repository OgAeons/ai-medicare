// components/ActivityGraph.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
} from "chart.js";

// Register necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip);

const ActivityGraph = () => {
    const data = {
        labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        datasets: [
            {
                data: [40, 60, 100, 50, 70, 90, 50], // Adjust data to match the image
                backgroundColor: [
                    "rgba(244, 114, 182, 0.3)", // Light red
                    "rgba(244, 114, 182, 0.4)",
                    "rgba(244, 114, 182, 0.9)", // Deep red
                    "rgba(244, 114, 182, 0.4)",
                    "rgba(244, 114, 182, 0.6)",
                    "rgba(244, 114, 182, 0.8)",
                    "rgba(244, 114, 182, 0.4)",
                ],
                borderRadius: 10, // Rounded edges
                barPercentage: 0.5, // Thinner bars
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: { enabled: false }, // Disable tooltips for minimalistic design
            legend: { display: false }, // Remove legend
        },
        scales: {
            x: {
                grid: { display: false }, // Hide gridlines
                ticks: {
                    color: "#6b7280", // Tailwind gray-500
                    font: { size: 12 },
                },
            },
            y: {
                grid: { display: false }, // Hide gridlines
                ticks: {
                    display: false, // Hide Y-axis ticks
                },
                max: 100, // Ensure Y-axis is capped at 100%
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md h-[15rem] ml-[3rem]">
            <h4 className="text-gray-600 font-medium mb-4">Your Activity</h4>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ActivityGraph;
