import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../CustomHook/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Loader/Loader";
import AuthContextHook from "../../../CustomHook/AuthContextHook";
import Swal from "sweetalert2";



const PaymentsForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const axiosSecure = useAxiosSecure()
    const { percelId } = useParams() // aita ashche first mypercel then Router 'payments/:percelId' theke ait akta query jekhane id ache
    const { user } = AuthContextHook()
    const navigate = useNavigate()

    const email = user.email

    // console.log(user, email)

    //pay te click korar por query madghome shei id ta niye shei data call kora hoiche akhane 
    const { data: parcelPayment = [], isPending } = useQuery({
        queryKey: ['parcelPayment', percelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`parcelPayment/${percelId}`);
            return res.data;
        }
    })

    const amount = parcelPayment.cost;
    const amountIncent = amount * 100;

    if (isPending) {
        return <Loader></Loader>;
    }

    // console.log(parcelPayment)

    const handleSubmit = async (e) => {
        e.preventDefault();

        //part 1.........payment akta card banano &  niche -> return full.............

        if (!stripe || !elements) return;
        // each type of element.
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
        } else {
            setError('')
            console.log('[PaymentMethod]', paymentMethod);
        }



        //part 2.........card banano por server a call kore akta key banate hobe tar jonno ai api ke call korte onbe.............

        //create payment intent server theke call kora hoiche 
        const res = await axiosSecure.post('create-payment-intent', {
            amount: amountIncent,
            percelId,
        })
        const clientSecret = res.data?.clientSecret


        //part 3.........server theke secret key asle seta akhane bosate hobe anc secceed korete hobe .............

        //server theke response ashar por shei response ar bitore secret key eache ta akhane ja server theke ashche = clientSecret aita
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    //nicher email ta user ar je login korche ja ashche context ar madhome
                    name: user?.displayName,
                    email,
                }
            }
        })
        if (result.error) {
            console.log(result.error.message)
        }
        else {
            if (result.paymentIntent.status === "succeeded") {
                // console.log('succeeded', result)
                const { amount, id, payment_method_types
                } = result.paymentIntent


                
                //then its 4 step that peyment data and when that peyment had happend that push to anather collactions 

                // kichu data lagbe ja store kore rakhte hobe payment system ar jonno jemon kiche data hoiche niche as well as ager mypercel ar kichu data just update korte hobe 
                const paymentData = {
                    paymentMethod: payment_method_types,
                    parcelId: percelId,
                    transactionId: id,
                    amount,
                    email
                }
                // console.log(paymentData)

                //payment hoyar por jei new data push korte hobe sheta jonno ai api diye post kora hobe server a and akhane percelId id ache ja diye ager collactions ar update kora jabe 
                const response = await axiosSecure.post('save-payment', paymentData);
                if (response.data?.inserted) {

                    Swal.fire({
                        icon: "success",
                        title: "Payment Successful 🎉",
                        html: `
          <p>Your payment has been confirmed!</p>
          <p><strong>Transaction ID:</strong> <code>${id}</code></p>
        `,
                        confirmButtonText: "Go to My Parcels",
                        confirmButtonColor: "#3085d6",
                    }).then(() => {
                        //Redirect to MyPercel page
                        navigate("/drshbord/mypercels");
                    });
                }
            }
        }

    };

    return (
        <div className="w-[500px] mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">💳 Stripe Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">Amount (USD)</label>
                    <input
                        type="number"
                        defaultValue={amount}
                        placeholder="Enter amount"
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <div className="p-3 border rounded-md">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#424770",
                                    "::placeholder": { color: "#aab7c4" },
                                },
                                invalid: { color: "#9e2146" },
                            },
                        }}
                    />

                </div>

                <button
                    type="submit"
                    disabled={!stripe}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Pay Now
                </button>
                {
                    error && <p className="text-red-600">{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentsForm;
