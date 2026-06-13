import {useState} from 'react';
import "../styles/addInterviewModal.css";
import {
  addDoc,
  updateDoc,
  doc,
  collection
} from "firebase/firestore";
import { db } from "../firebase/firebase";

interface Props {
  onClose: () => void;
  onSave: (updatedInterview: any) => void;
  interview?: any;
}

const AddInterviewModal = ({onClose, onSave, interview}: Props) => {
 const [form, setForm] = useState({
  companyName: interview?.companyName || "",
  role: interview?.role || "",
  location: interview?.location || "",
  applicationDate: interview?.applicationDate || "",
  interviewDate: interview?.interviewDate || "",
  interviewTime: interview?.interviewTime || "",
  status: interview?.status || "Applied",
  notes: interview?.notes || "",
});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
        ...form,
         [e.target.name]: e.target.value,
        });
  };

  const handleSubmit = async () => {
    try {
      if (interview?.id) {
        await updateDoc(
          doc(db, "interviews", interview.id),
          form
        );
      } else {
        await addDoc(
          collection(db, "interviews"),
          form
        );
      }

      onSave(form);
    } catch (error) {
      console.error(error);
    }
  };

    return (
       <div className="modal-overlay">
        <div className="modal">
          <h2>
            {interview ? "Edit Interview" : "Add Interview"}
          </h2>
          <div className="form-group">
            <label htmlFor="companyName">
              Company Name
            </label>
            <input
              id="companyName"
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={form.companyName}
              onChange={handleChange}
            />
            <label htmlFor="role">
              Job Role
            </label>
            <input
                name="role"
                placeholder="Job Role"
                value={form.role}
                onChange={handleChange}
              />
            <label htmlFor="location">
              Location
            </label>
            <input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
            />

            <label htmlFor="applicationDate">
              Application Date
            </label>
            <input
              type="date"
              name="applicationDate"
              value={form.applicationDate}
              onChange={handleChange}
            />
        
            <label htmlFor="interviewDate">
              Interview Date
            </label>
            <input
              type="date"
              name="interviewDate"
              value={form.interviewDate}
              onChange={handleChange}
            />

            <label htmlFor="interviewTime">
              Interview Time
            </label>
            <input
              type="time"
              name="interviewTime"
              value={form.interviewTime}
              onChange={handleChange}
            />

            <label htmlFor="status">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>Applied</option>
              <option>HR Round</option>
              <option>Technical Round 1</option>
              <option>Technical Round 2</option>
              <option>Manager Round</option>
              <option>Selected</option>
              <option>Rejected</option>
              <option>Offer Received</option>
            </select>

              <label htmlFor="notes">
                Notes
              </label>
            <textarea
              name="notes"
              placeholder="Notes"
              rows={4}
              onChange={handleChange}
            />
        </div>
        <div className="modal-buttons">
          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSubmit}
          >
            {interview ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddInterviewModal;