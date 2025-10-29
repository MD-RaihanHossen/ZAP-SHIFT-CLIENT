import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaHistory,
  FaUserTie,
  FaInfoCircle,
  FaHeadset,
  FaClock,
  FaCheckCircle
} from "react-icons/fa";

const SidebarButtons = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg w-full transition ${
      isActive
        ? "bg-blue-600 text-white shadow-md"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="flex flex-col gap-3 p-4">
      {/* Major Buttons */}
      <NavLink to="/" className={linkClass}>
        <FaHome className="text-lg" /> Home
      </NavLink>

      <NavLink to="mypercels" className={linkClass}>
        <FaBoxOpen className="text-lg" /> My Parcel
      </NavLink>

      <NavLink to="paymenthistory" className={linkClass}>
        <FaHistory className="text-lg" /> Payment History
      </NavLink>

      {/* New Buttons */}

      <NavLink to="activeRiders" className={linkClass}>
        <FaCheckCircle className="text-lg" /> Active Riders
      </NavLink>


      <NavLink to="pendingRiders" className={linkClass}>
        <FaClock className="text-lg" /> Pending Riders
      </NavLink>

      

      {/* Divider */}
      <hr className="my-2 border-gray-300" />

      <NavLink to="/about" className={linkClass}>
        <FaInfoCircle className="text-lg" /> About Us
      </NavLink>

      <NavLink to="/rider" className={linkClass}>
        <FaUserTie className="text-lg" /> Be a Rider
      </NavLink>

      <NavLink to="/support" className={linkClass}>
        <FaHeadset className="text-lg" /> Support
      </NavLink>
    </div>
  );
};

export default SidebarButtons;
