import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Loader/Loader";
import useAxiosSecure from "../../../CustomHook/useAxiosSecure";
import AuthContextHook from "../../../CustomHook/AuthContextHook";

const MyPercels = () => {
  const { user } = AuthContextHook();
  const axiosSecure = useAxiosSecure()

  //useQuery with Axios
  const { data: mypercels, isLoading, isError } = useQuery({
    queryKey: ["mypercel", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/mypercels?email=${user.email}`);
      return res.data.data; // access your backend response
    },
  });

  console.log(mypercels)

  if (isLoading) return <p className="text-center"><Loader></Loader></p>;
  if (isError) return <p className="text-center text-red-500">Failed to fetch mypercel.</p>;

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">📦 My Parcels</h2>

      {mypercels.length === 0 ? (
        <p className="text-center text-gray-500">No parcels found.</p>
      ) : (
        <table className="table w-full border border-gray-200 shadow-md">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Type</th>
              <th>Created At</th>
              <th>Cost (৳)</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mypercels.map((parcel) => (
              <tr key={parcel._id} className="hover">
                <td>{parcel.parcelType}</td>
                <td>{new Date(parcel.createdAt).toLocaleDateString()}</td>
                <td>{parcel.cost}</td>
                <td>
                  <span
                    className={`badge ${parcel.status === "Delivered"
                        ? "badge-success"
                        : parcel.status === "Pending"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td className="flex justify-center gap-2">
                  <button className="btn btn-xs btn-info text-white">
                    View
                  </button>
                  <button className="btn btn-xs btn-success text-white">
                    Pay
                  </button>
                  <button className="btn btn-xs btn-error text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyPercels;

