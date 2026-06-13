import { useState } from "react";
import DashboardCard from "../components/DashboardCard";
import UpcomingInterviews from "../components/UpcomingInterviews";
import AddInterviewModal from "../components/AddInterviewModal";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSaveInterview = (newInterview: any) => {
    console.log("New Interview:", newInterview);

    setShowModal(false);
  };

  return (
    <>
      <div className="header">
        <div>
          <h1>Dashboard</h1>
          <p>Track your job hunt progress</p>
        </div>

        <button
          className="add-btn"
          onClick={() => setShowModal(true)}
        >
          + Add Interview
        </button>
      </div>

      <div className="stats-grid">
        <DashboardCard title="Total Applied" value={1} />
        <DashboardCard title="In Progress" value={1} />
        <DashboardCard title="Selected" value={0} />
        <DashboardCard title="Rejected" value={0} />
        <DashboardCard title="Offers" value={0} />
        <DashboardCard title="Upcoming" value={0} />
      </div>

      <UpcomingInterviews />

      <div className="status-card">
        <h3>Status Overview</h3>

        <div className="status-row">
          <span>Applied</span>
          <span>1</span>
        </div>
      </div>

      {showModal && (
        <AddInterviewModal
          onSave={handleSaveInterview}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Dashboard;