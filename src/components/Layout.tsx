import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="container">
      <Sidebar />

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;