import { useQuery } from "@tanstack/react-query";
import AuthContextHook from "../../../CustomHook/AuthContextHook";
import useAxiosSecure from "../../../CustomHook/useAxiosSecure";
import Loader from "../../../Loader/Loader";
import {
  FaMoneyCheckAlt,
  FaCalendarAlt,
  FaHashtag,
  FaCreditCard,
} from "react-icons/fa";


const PaymentHistory = () => {

    const { user } = AuthContextHook()
    const axiosSecure = useAxiosSecure()

    //akhane 2 akta collactions banano hoichilo for after payment ar data rakhte shetai akhane call kora hoiche aitaw query madhome mane je email diye login kora hoiche shei user ar email diye 
    const { data: paymentHistory = [], isLoading } = useQuery({
        queryKey: ['peyment', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`payments?email=${user.email}`)
            return res.data;
        }
    })

    if (isLoading) {
        return <Loader></Loader>
    }


    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-base-100 rounded-2xl shadow-md">
            <h2 className="text-2xl font-semibold flex items-center gap-2 mb-5">
                <FaMoneyCheckAlt className="text-primary" /> Payment History
            </h2>

            {paymentHistory .length === 0 ? (
                <div className="text-center text-gray-500 py-6">
                    No payment history found.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-base-200 text-base font-medium">
                            <tr>
                                <th>#</th>
                                <th>Transaction ID</th>
                                <th>Amount</th>
                                <th>Method</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paymentHistory.map((p, index) => (
                                <tr key={p._id}>
                                    <td>{index + 1}</td>

                                    <td className="flex items-center gap-2">
                                        <FaHashtag className="text-primary" />
                                        {p.transactionId}
                                    </td>

                                    <td>
                                        <span className="badge badge-success badge-outline">
                                            ৳{p.amount}
                                        </span>
                                    </td>

                                    <td className="flex items-center gap-2">
                                        <FaCreditCard className="text-gray-500" />
                                        <span className="badge badge-info badge-outline">
                                            {Array.isArray(p.paymentMethod)
                                                ? p.paymentMethod.join(", ")
                                                : p.paymentMethod}
                                        </span>
                                    </td>

                                    <td className="flex items-center gap-2">
                                        <FaCalendarAlt className="text-gray-500" />
                                        {new Date(p.paymentDate).toLocaleString("en-BD", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentHistory;