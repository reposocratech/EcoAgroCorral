import AdminDal from "./admin.dal.js";

class AdminController {
  getAllUsers = async (req, res) =>{
    
    try {
      let result = await AdminDal.getAllUsers()
      res.status(200).json(result);
      
    } catch (error) {
      res.status(500).json(error);
      
    }
  }
  
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
      const reservations = await AdminDal.getAllReservations();
      res.status(200).json(reservations);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las reservas", error });
    }
  };

  cancelReservation = async (req, res) => {
    const { id } = req.body;
    try {
      await AdminDal.cancelReservation(id);
      const updatedReservations = await AdminDal.getAllReservations();
      res.status(200).json(updatedReservations);
    } catch (error) {
      res.status(500).json({ message: "Error al cancelar la reserva", error });
    }
  };
  
}

export default new AdminController();
