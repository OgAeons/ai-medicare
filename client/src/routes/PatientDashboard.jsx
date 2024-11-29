import React from "react"
import Sidebar from '../components/patient-dashboard/Sidebar'
import UserProfile from '../components/patient-dashboard/UserProfile'
import HealthStatus from '../components/patient-dashboard/HealthStatus'
import Appointments from '../components/patient-dashboard/Appointments'
import ActivityGraph from '../components/patient-dashboard/ActivityGraph'
import MyCalendar from '../components/patient-dashboard/MyCalender'

function PatientDashboard() {
    return (
        <div className="flex w-screen min-h-screen bg-slate-800">
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex-1 p-6 space-y-8 overflow-auto">
                {/* UserProfile next to Sidebar */}
                <div className="flex items-start space-x-6">
                    <UserProfile />
                    <div className="flex flex-col space-y-8">
                        <HealthStatus />
                        <ActivityGraph />
                    </div>
                </div>

                {/* Below content */}
                <div className="flex">
                    <Appointments />
                    <MyCalendar />
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard
