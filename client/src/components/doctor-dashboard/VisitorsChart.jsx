import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register all required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const VisitorsChart = () => {
    const data = {
        labels: ['1 JUL', '5', '9', '13', '17', '21', '25', '30'],
        datasets: [
            {
                label: 'Total Visitors',
                data: [20000, 22000, 25000, 30000, 35000, 40000, 42000, 45000],
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                tension: 0.4,
            },
            {
                label: 'Total Patients',
                data: [2000, 2100, 2300, 2400, 2450, 2500, 2600, 2700],
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allow the chart to resize within its container
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
        scales: {
            x: {
                type: 'category',
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="w-[25rem] h-[25rem] bg-white rounded-lg p-4 shadow-lg">
            {/* Set specific width (w-80) and height (h-64) */}
            <Line data={data} options={options} />
        </div>
    );
};

export default VisitorsChart;
