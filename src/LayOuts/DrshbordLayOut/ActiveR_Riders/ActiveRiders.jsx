import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../../../Loader/Loader";
import useAxiosSecure from "../../../CustomHook/useAxiosSecure";

const ActiveRiders = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all approved riders
  const { data: activeRiders = [], isLoading, refetch,} = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/activeriders");
      return res.data;
    },
  });

  // Handle activate / deactivate
  const handleStatusChange = async (id, status) => {
    const actionText =
      status === "deactive" ? "deactivate this rider" : "activate this rider";
    const confirmButtonColor = status === "deactive" ? "#dc2626" : "#16a34a";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to ${actionText}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor,
      cancelButtonColor: "#6b7280",
      confirmButtonText:
        status === "deactive" ? "Yes, Deactivate" : "Yes, Activate",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axiosSecure.patch(`/riders/status/${id}`, { status });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title:
            status === "deactive"
              ? "Rider Deactivated Successfully"
              : "Rider Activated Successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to update status", "error");
    }
  };

  if (isLoading)
    return (
      <div className="text-center py-4">
        <Loader />
      </div>
    );

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Active Riders</h2>

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
            {activeRiders.map((rider, index) => (
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
                  <button
                    onClick={() => handleStatusChange(rider._id, "approved")}
                    className="btn btn-xs bg-green-600 text-white"
                  >
                    Active
                  </button>
                  <button
                    onClick={() => handleStatusChange(rider._id, "deactive")}
                    className="btn btn-xs bg-red-600 text-white"
                  >
                    Deactive
                  </button>
                </td>
              </tr>
            ))}
            {activeRiders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No active riders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
