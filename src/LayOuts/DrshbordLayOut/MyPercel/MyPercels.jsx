import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Loader/Loader";
import useAxiosSecure from "../../../CustomHook/useAxiosSecure";
import AuthContextHook from "../../../CustomHook/AuthContextHook";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyPercels = () => {
  const { user } = AuthContextHook();
  const axiosSecure = useAxiosSecure()
  const navigation = useNavigate()

  console.log(user)

  //useQuery with Axios call the data what i have put in 1st time get kora holo 1st time  
  const { data: mypercels = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ["mypercels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/mypercels?email=${user.email}`); //aita je login korete tar email query hishe deya hoiche 

      return res.data.data; // access your backend response
    },
  });

  console.log(error)

  const hendlePay = (id) => {
    navigation(`/drshbord/payments/${id}`)

  }

  const hendleDelete = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      // Step 2: If confirmed, send DELETE request
      if (result.isConfirmed) {
        axiosSecure.delete(`perceldelete/${id}`)
          .then((res) => {
            if (res?.data?.deletedCount) {
              // Step 3: Show success message
              Swal.fire({
                title: "Deleted!",
                text: "Your parcel has been deleted.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              });
              refetch()
              //Step 4: Optionally refetch or update UI
              // Example: refetch();  (if you’re using React Query)
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong while deleting.",
              icon: "error",
            });
            console.error("Delete error:", error);
          });
      }
    });


  }

  // console.log(mypercels)

  if (isLoading) return <div className="text-center"><Loader></Loader></div>;
  if (isError) return <p className="text-center text-red-500">Failed to fetch mypercel.</p>;

  return (
    <div className="overflow-x-auto ">
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
                <td>{parcel.cost}৳</td>
                <td>
                  <span
                    className={`badge text-white px-5 py-3 uppercase ${parcel.status === "Delivered"
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
                  <button onClick={() => hendlePay(parcel?._id)} disabled={parcel.status === "paid"} className={`btn btn-xs btn-success text-white`}>
                    Pay
                  </button>
                  <button onClick={() => hendleDelete(parcel?._id)} className="btn btn-xs btn-error text-white">
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

