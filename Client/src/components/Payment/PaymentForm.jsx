import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { fetchData } from "../../helpers/axiosHelper.js";
import { Button, Form, Container, Alert } from "react-bootstrap";

export const PaymentForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    console.log(elements);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        if (!stripe || !elements) {
            setLoading(false);
            return;
        }
        try {
            const { clientSecret } = await fetchData("api/payment/create-payment-intent", "post", {
                amount: amount * 100,
                currency: "eur",
            });
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });
            if (result.error) {
                setError(result.error.message);
            } else {
                setSuccess(true);
            }
        } catch (error) {
            console.error("Error en el pago:", error);
            setError("Error al procesar el pago");
        }
        setLoading(false);
    };

    return (
        <Container className="mt-4">
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Introduce los datos de tu tarjeta</Form.Label>
                    <CardElement className="p-3 border rounded" />
                </Form.Group>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                {success && <Alert variant="success" className="mt-3">Pago realizado con éxito</Alert>}
                <Button className="mt-3" type="submit" disabled={loading || !stripe}>
                    {loading ? "Procesando..." : "Pagar"}
                </Button>
            </Form>
        </Container>
    );
};