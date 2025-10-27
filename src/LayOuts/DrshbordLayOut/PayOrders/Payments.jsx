import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentsForm from "./PaymentsForm";


const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payments = () => {

    return (
        <Elements stripe={stripePromise}>
            <PaymentsForm></PaymentsForm>
        </Elements>
    );
};

export default Payments;