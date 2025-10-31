import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Forbiden = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-100 to-indigo-200 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md w-full">
        <FaLock className="text-red-500 text-6xl mx-auto mb-4 animate-bounce" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Forbidden</h1>
        <p className="text-gray-600 mb-6">
          Sorry, you don’t have permission to access this page.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Forbiden;
