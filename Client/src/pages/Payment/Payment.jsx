import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "../../components/Payment/PaymentForm";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const Payment = ({ amount }) => {

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm amount={amount} />
        </Elements>
    );
};
