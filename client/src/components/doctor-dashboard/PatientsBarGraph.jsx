import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PatientsBarGraph = () => {
    const data = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], // X-axis labels
        datasets: [
            {
                label: 'Total Patients Visited',
                data: [500, 700, 800, 1200], // Example data
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allows the chart to fit the container
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Total Patients Visited',
                font: {
                    size: 16,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false, // Hide grid lines on x-axis
                },
            },
            y: {
                beginAtZero: true, // Ensure y-axis starts from zero
            },
        },
    };

    return (
        <div className="w-[25rem] h-[25rem] bg-white rounded-lg p-4 shadow-lg">
            {/* Reduced size using Tailwind width and height classes */}
            <Bar data={data} options={options} />
        </div>
    );
};

export default PatientsBarGraph;
