import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxiosSecure from "../../../CustomHook/useAxiosSecure";
import AuthContextHook from "../../../CustomHook/AuthContextHook";
import Loader from "../../../Loader/Loader";
import Swal from "sweetalert2";

const PendingRiders = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = AuthContextHook();
    const [selectedRider, setSelectedRider] = useState(null); // for modal data

    const { data: pendingRiders = [], isLoading, refetch, } = useQuery({
        queryKey: ["pendingRiders", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/pendingriders`);
            return res.data;
        },
    });

    // handle accept / cancel with one function
    const handleStatusChange = async(id, status) => {

        Swal.fire({
            title: `Are you sure? ${status}`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Approved it!"
        }).then( async(result) => {
            if (result.isConfirmed) {

                //this is change to status that approved or cancel
                try {
                    const res = await axiosSecure.patch(`/riders/status/${id}`, { status });
                    console.log(res.data)

                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            icon: status === "approved" ? "success" : "error",
                            title:
                                status === "approved"
                                    ? "Rider Approved Successfully"
                                    : "Rider Rejected",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        refetch();
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire("Error!", "Failed to update status", "error");
                }
            }
        });


    };

    if (isLoading)
        return (
            <h2 className="text-center text-lg font-semibold py-4">
                <Loader />
            </h2>
        );

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Pending Riders</h2>

            <div className="overflow-x-auto">
                <table className="table w-full shadow-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>Covered Area</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pendingRiders.map((rider, index) => (
                            <tr key={rider._id}>
                                <td>{index + 1}</td>
                                <td>{rider.name}</td>
                                <td>{rider.contact}</td>
                                <td>{rider.email}</td>
                                <td>{rider.city}</td>
                                <td>
                                    {Array.isArray(rider.covered_area)
                                        ? rider.covered_area.join(", ")
                                        : rider.covered_area || "N/A"}
                                </td>

                                <td className="flex justify-center gap-2">
                                    {/* ✅ View button */}
                                    <button
                                        onClick={() => setSelectedRider(rider)}
                                        className="btn btn-xs bg-blue-600 text-white"
                                    >
                                        View
                                    </button>

                                    {/* ✅ Accept */}
                                    <button
                                        onClick={() => handleStatusChange(rider._id, "approved")}
                                        className="btn btn-xs bg-green-600 text-white"
                                    >
                                        Accept
                                    </button>

                                    {/* ✅ Cancel */}
                                    <button
                                        onClick={() => handleStatusChange(rider._id, "rejected")}
                                        className="btn btn-xs bg-red-600 text-white"
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {pendingRiders.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-4">
                                    No pending riders found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ Modal for view */}
            {selectedRider && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h3 className="text-xl font-semibold mb-3 text-center">
                            Rider Details
                        </h3>
                        <p><strong>Name:</strong> {selectedRider.name}</p>
                        <p><strong>Email:</strong> {selectedRider.email}</p>
                        <p><strong>Phone:</strong> {selectedRider.contact}</p>
                        <p><strong>District:</strong> {selectedRider.city}</p>
                        <p>
                            <strong>Covered Area:</strong>{" "}
                            {Array.isArray(selectedRider.covered_area)
                                ? selectedRider.covered_area.join(", ")
                                : selectedRider.covered_area}
                        </p>
                        <p><strong>Status:</strong> {selectedRider.status}</p>

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setSelectedRider(null)}
                                className="btn btn-sm bg-gray-500 text-white"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingRiders;
