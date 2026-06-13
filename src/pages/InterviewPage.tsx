import { useEffect, useState } from "react";
import "../styles/interviewPage.css";
import AddInterviewModal from "../components/AddInterviewModal";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

interface Interview {
  id: string;
  companyName: string;
  role: string;
  location: string;
  applicationDate: string;
  interviewDate: string;
  interviewTime: string;
  status: string;
  notes?: string;
}

export const INTERVIEW_STATUSES = [
  "All",
  "Applied",
  "HR Round",
  "Technical Round 1",
  "Technical Round 2",
  "Manager Round",
  "Selected",
  "Rejected",
  "Offer Received",
  "Joined",
];

const InterviewPage = () => {

  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);

  const fetchInterviews = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "interviews")
      );

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Interview[];

      setInterviews(data);
    } catch (error) {
      console.error(
        "Error fetching interviews:",
        error
      );
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleEdit = (interview: any) => {
    setSelectedInterview(interview);
    setShowModal(true);
  };

  const handleSaveInterview = async () => {
    await fetchInterviews();

    setShowModal(false);
    setSelectedInterview(null);
  };

  const filteredInterviews = interviews.filter((item) => {
    const matchesStatus =
      selectedStatus === "All" ||
      item.status === selectedStatus;

    const matchesSearch = item.companyName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <div className="interview-page">
        <div className="page-header">
          <h1>All Interviews</h1>
           <button
              className="add-btn"
              onClick={() => {
                setSelectedInterview(null);
                setShowModal(true);
              }}
            >
              + Add Interview
           </button>
        </div>

        <div className="table-card">
          <div className="filter-container">
            <input
              type="text"
              placeholder="Search Company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              {INTERVIEW_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <table className="interview-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Role</th>
                <th>Application Date</th>
                <th>Interview Date</th>
                <th>Interview Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredInterviews.map((interview) => (
                <tr key={interview.id}>
                  <td>{interview.companyName}</td>
                  <td>{interview.role}</td>
                  <td>{interview.applicationDate}</td>
                  <td>{interview.interviewDate}</td>
                  <td>{interview.interviewTime}</td>
                  <td>{interview.status}</td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(interview)}
                      >
                        Edit
                      </button>

                      <button className="delete-btn">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    {showModal && (
      <AddInterviewModal
        interview={selectedInterview}
        onSave={handleSaveInterview}
        onClose={() => {
          setShowModal(false);
          setSelectedInterview(null);
        }}
      />
    )}
    </>
  );
};

export default InterviewPage;