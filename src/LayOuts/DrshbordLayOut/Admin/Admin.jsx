import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../CustomHook/useAxiosSecure";
import AuthContextHook from "../../../CustomHook/AuthContextHook";
import Loader from "../../../Loader/Loader";

const Admin = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const axiosSecure = useAxiosSecure();
    const { user } = AuthContextHook();

    // ✅ Fetch all users
    const {
        data: users = [],
        refetch: refetchUsers,
        isLoading: loadingUsers,
    } = useQuery({
        queryKey: ["users", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get("/userdata");
            return res.data;
        },
    });

    // ✅ Fetch all riders
    const {
        data: riders = [],
        refetch: refetchRiders,
        isLoading: loadingRiders,
    } = useQuery({
        queryKey: ["riders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/userriders");
            return res.data;
        },
    });

    if (loadingUsers || loadingRiders) return <Loader />;

    // ✅ Merge both collections
    const combinedData = [...users, ...riders];

    // ✅ Only show results when searching
    let filteredData =
        searchTerm.trim() === ""
            ? [] // don't show anything when no search
            : combinedData.filter((person) =>
                person.email?.toLowerCase().includes(searchTerm.toLowerCase())
            );

    filteredData = filteredData.slice(0, 10);

    // ✅ Handle make/remove admin
    const handleToggleAdmin = async (person) => {
        const newRoll = person.roll === "admin" ? "user" : "admin";

        try {
            const res = await axiosSecure.patch(`/update-roll/${person._id}`, {
                roll: newRoll,
            });
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: `${person.name} is now ${newRoll}`,
                    timer: 1500,
                    showConfirmButton: false,
                });
                refetchUsers();
                refetchRiders();
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Failed to update roll",
                text: err.message,
            });
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-semibold mb-4">Admin Panel</h2>

            {/* 🔍 Search Input */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-400"
                />
            </div>

            {/* ✅ Only show table when search result exists */}
            {filteredData.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300 text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2 text-center">#</th>
                                <th className="border p-2 text-center">Name</th>
                                <th className="border p-2 text-center">Email</th>
                                <th className="border p-2 text-center">Roll</th>
                                <th className="border p-2 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((person, index) => (
                                <tr key={person._id} className="hover:bg-gray-50 text-center">
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">{person.name}</td>
                                    <td className="border p-2">{person.email}</td>
                                    <td
                                        className={`border p-2 capitalize ${person.roll === "rider"
                                                ? "text-red-500"
                                                : person.roll === "admin"
                                                    ? "text-green-600 font-semibold"
                                                    : "text-gray-600"
                                            }`}
                                    >
                                        {person.roll || "user"}
                                    </td>
                                    <td className="border p-2 text-center flex justify-center gap-3">
                                        {person.roll === "admin" ? (
                                            <>
                                                <button
                                                    onClick={() => handleToggleAdmin(person)}
                                                    className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                                                >
                                                    Cancel Admin
                                                </button>
                                                <span className="px-3 py-1 rounded bg-gray-200 text-sm font-medium capitalize">
                                                    {person.prevRoll || "user"}
                                                </span>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleToggleAdmin(person)}
                                                className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : searchTerm.trim() !== "" ? (
                <p className="text-center mt-4 text-gray-500">No user found.</p>
            ) : null}
        </div>
    );
};

export default Admin;
