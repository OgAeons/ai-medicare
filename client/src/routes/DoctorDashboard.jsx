import React from 'react'
import Sidebar from '../components/doctor-dashboard/Sidebar'
import Header from '../components/doctor-dashboard/Header'
import StatsCard from '../components/doctor-dashboard/StatsCard'
import VisitorsChart from '../components/doctor-dashboard/VisitorsChart'
import PatientsBarGraph from '../components/doctor-dashboard/PatientsBarGraph'
import RecentAppointments from '../components/doctor-dashboard/RecentAppointments'

function DoctorDashboard() {
  const styles = {
    app: {
      display: 'flex',
    },
    mainContent: {
      flex: 1,
      background: '#f8fafc',
      padding: '1rem',
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '1rem',
      marginBottom: '1rem',
    },
  };

  return (
    <div className='bg-black'>
      <Sidebar />
      <div className='bg-white p-[1rem] ml-[16rem] h-screen rounded-3xl'>
        <Header />
        <div style={styles.statsContainer}>
          <StatsCard title="Total Patients" value="2,420" percentageChange={47} />
          <StatsCard title="New Appointments" value="226" percentageChange={-10} />
          <StatsCard title="Pending Reports" value="193" percentageChange={25} />
        </div>
        <div className='flex space-x-4'>
          <VisitorsChart />
          <PatientsBarGraph />
        </div>
        <RecentAppointments />
      </div>
    </div>
  )
}

export default DoctorDashboard