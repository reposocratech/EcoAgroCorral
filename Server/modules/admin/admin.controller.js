import AdminDal from "./admin.dal.js";
import EmailService from "../../utils/email/sendEmails.js";

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
  
      await AdminDal.cancelReservation(id);

      await EmailService.sendReservationCancellationEmail(
        { user_name: reservation.user_name, user_email: reservation.user_email },
        { hike_title: reservation.hike_title, reservation_date: reservation.reservation_date }
      );
  
      res.status(200).json({ message: "Reserva cancelada correctamente" });
    } catch (error) {
      console.error("Error al cancelar la reserva:", error);
      res.status(500).json({ message: "Error al cancelar la reserva", error });
    }
  };
  
  getAllExperiences = async (req, res) => {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 15;

      const data = await AdminDal.getAllExperiences(page, limit);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener experiencias", error });
    }
  };

  enableExperience = async (req, res) => {
    const { id } = req.body;
    try {
      await AdminDal.enableExperience(id);
      res.status(200).json({ message: "Experiencia habilitada correctamente" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al habilitar la experiencia", error });
    }
  };

  disableExperience = async (req, res) => {
    const { id } = req.body;
    try {
      await AdminDal.disableExperience(id);
      res
        .status(200)
        .json({ message: "Experiencia deshabilitada correctamente" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al deshabilitar la experiencia", error });
    }
  };
}

export default new AdminController();
