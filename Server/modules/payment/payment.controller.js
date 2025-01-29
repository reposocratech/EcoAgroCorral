import Stripe from "stripe";
import "dotenv/config";
import createPrice from "../../utils/createPrice.js";
import paymentDal from "./payment.dal.js";

const YOUR_DOMAIN = process.env.URLFRONT;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

class PaymentController {
    createPaymentIntent = async (req, res) => {
        try {
            const { amount, currency } = req.body;
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency,
                payment_method_types: ["card"],
            });
            res.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            console.error("Error en pago:", error);
            res.status(500).json({ error: "Error al procesar el pago" });
        }
    };


    checkoutSession = async (req, res) => {
        const {reservation_experience_id, reservation_hike_id, reservation_adult, reservation_children, reservation_total_price} = req.body;
        try {
            let result = await paymentDal.getNames(reservation_experience_id, reservation_hike_id);
            const {experience_title, hike_title} = result[0];
            const priceId = await createPrice(experience_title, hike_title, reservation_total_price * 100, stripe);
            console.log("priceIDDDD", priceId);
            const session = await stripe.checkout.sessions.create({
              line_items: [
                {
                  // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                  price: priceId,
                  quantity: 1,
                },
              ],
              mode: 'payment',
              success_url: `${YOUR_DOMAIN}/reserva/confirmarReserva`,
              cancel_url: `${YOUR_DOMAIN}/user/reserva`,
          })
          
          res.status(200).json(session.url);
        } catch (error) {
            res.status(500).json(error)
        }
    } 
}   

export default new PaymentController();