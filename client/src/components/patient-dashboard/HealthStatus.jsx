// components/HealthStatus.js
import React from "react";

const CircularProgressBar = ({ percentage, color }) => {
    const strokeWidth = 8;
    const radius = 50 - strokeWidth / 2; // Radius of the circle
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <svg width="100" height="100" className="mx-auto">
            <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#e5e7eb" // Gray background
                strokeWidth={strokeWidth}
            />
            <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
            />
            <text
                x="50"
                y="55"
                textAnchor="middle"
                fontSize="18"
                fontWeight="bold"
                fill="#4b5563"
            >
                {percentage}%
            </text>
        </svg>
    );
};

const HealthStatus = () => {
    return (
        <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md w-[30rem] ml-[3rem] mt-[10px]">
            <div className="text-center">
                <h4 className="text-gray-600 font-medium mb-2">General Health</h4>
                <CircularProgressBar percentage={75} color="#ef4444" /> {/* Red */}
            </div>
            <div className="text-center">
                <h4 className="text-gray-600 font-medium mb-2">Water Balance</h4>
                <CircularProgressBar percentage={83} color="#3b82f6" /> {/* Blue */}
            </div>
        </div>
    );
};

export default HealthStatus;
