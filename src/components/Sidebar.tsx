import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>🎯 CareerFlow</h2>

      <div className="menu">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/interviews"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          📋 Interviews
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;