
import ReservationDal from "./reservation.dal.js";

class ReservationController {
  getDates = async (req, res)=>{
    try {
      const result = await ReservationDal.getDates();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las fechas" });
    }
  } 

  getOneReservation = async (req,res)=>{
    const {reservation_id} = req.params;
    console.log(reservation_id);
    try {
      const result = await ReservationDal.getOneReservation(reservation_id);
      res.status(200).json(result[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener la reserva" });
    }
    
  }

  deleteReservation = async (req, res)=>{
    const {reservation_id} = req.params;
    try {
      const result = await ReservationDal.deleteReservation(reservation_id);
      res.status(200).json({message: "Reserva eliminada correctamente"});
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la reserva" });
    }
    
  }

  modifyReservation = async (req, res) =>{
    const {newDate} = req.body;
    const {reservation_id} = req.params;
    try {
      const result = await ReservationDal.modifyReservation(newDate, reservation_id);
      res.status(200).json({message: "Reserva modificada correctamente"});
    } catch (error) {
      res.status(500).json({ message: "Error al modificar la reserva" });
    }
    
  }
}

export default new ReservationController();