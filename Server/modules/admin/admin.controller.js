import { sendMail } from "../../utils/nodemailer.js";
import AdminDal from "./admin.dal.js";

class AdminController {
  getAllUsers = async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 15;

      const data = await AdminDal.getAllUsers(page, limit);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuarios", error });
    }
  };

  enableUser = async (req, res) => {
    const { id } = req.body;
    try {
      const result = await AdminDal.enableUser(id);
      const allUsers = await AdminDal.getAllUsers();
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ msg: "Error al habilitar el usuario", error });
    }
  };

  disableUser = async (req, res) => {
    const { id } = req.body;
    try {
      const result = await AdminDal.disableUser(id);
      const allUsers = await AdminDal.getAllUsers();
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ msg: "Error al deshabilitar el usuario", error });
    }
  };

  getAllReservations = async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 15;
      const pastOnly = req.query.pastOnly === "true";

      const data = await AdminDal.getAllReservations(page, limit, pastOnly);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las reservas", error });
    }
  };

  cancelReservation = async (req, res) => {
    const { id } = req.body;
  
    try {
      const reservation = await AdminDal.getReservationById(id);
      console.log(reservation);
      
      if (!reservation) {
        return res.status(404).json({ message: "Reserva no encontrada" });
      }
      await AdminDal.cancelReservation(id);
      sendMail(
        reservation.user_email,
        "Reserva cancelada",
        `Hola ${reservation.user_name}, tu reserva "${reservation.hike_title}" prevista para el día ${reservation.reservation_date.slice(8,11)}/${reservation.reservation_date.slice(5,7)} ha sido cancelada. Si en el futuro deseas volver a reservar o necesitas asistencia, estaremos encantados de ayudarte. No dudes en contactarnos para cualquier consulta.`
      );
      res.status(200).json({ message: "Reserva cancelada correctamente" });
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      res.status(500).json({ message: "Error al cancelar la reserva", error });
    }
  };
}

export default new AdminController();
