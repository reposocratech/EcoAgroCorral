import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Dashboard/Home/Home";
import { NavbarApp } from "../components/Navbar/NavbarApp";
import { Footer } from "../components/Footer/Footer";
import { AboutUs } from "../pages/Dashboard/AboutUs/AboutUs";
import { Login } from "../pages/Auth/Login/Login";
import { AllExperiences } from "../pages/Experiences/AllExperiences/AllExperiences";
import { OneExperience } from "../pages/Experiences/OneExperience/OneExperience";
import { RecoverPassword } from "../pages/Auth/RecoverPassword/RecoverPassword";
import { Register } from "../pages/Auth/Register/Register";
import { VerifyEmail } from "../pages/Auth/VerifyEmail/VerifyEmail";
import { CreateExperience } from "../pages/Admin/CreateExperience/CreateExperience.jsx";
import { OneHike } from "../pages/Hikes/OneHike/OneHike.jsx";
import { CreateHike } from "../pages/Hikes/NewHike/NewHike";
import { EditHike } from "../pages/Hikes/EditHike/EditHike";
import { DeletedHikes } from "../pages/Hikes/RestoreHikes/DeletedHikes";
import { ChangePassword } from "../pages/Auth/RecoverPassword/ChangePassword.jsx";
import { Profile } from "../pages/User/Profile/Profile.jsx";
import { EditUser } from "../pages/User/EditUser/EditUser.jsx";
import { Reservation } from "../pages/User/Reservation/Reservation.jsx";
import { ContactUs } from "../pages/ContactUs/ContactUs.jsx";
import { ErrorPage } from "../pages/ErrorPage/ErrorPage.jsx";
import { AdminDashboard } from "../pages/Admin/AdminDashboard/AdminDashboard.jsx";
import { AdminUsers } from "../pages/Admin/AdminUsers/AdminUsers.jsx";
import { PendingReservations } from "../pages/Admin/AdminReservation/PendingReservations.jsx";
import { ReservationHistory } from "../pages/Admin/AdminReservation/ReservationHistory.jsx";
import { CancelReservation } from "../pages/User/CancelReservation/CancelReservation.jsx";
import { EditExperience } from "../pages/Admin/EditExperience/EditExperience.jsx";
import { ReservationsDays } from "../pages/Admin/AdminReservation/ReservationsDays.jsx";
import { Blog } from "../pages/Post/Blog/Blog.jsx";
import { OnePost } from "../pages/Post/OnePost/OnePost.jsx";
import { CreatePost } from "../pages/Post/CreatePost/CreatePost.jsx";
import { AdminExperience } from "../pages/Admin/CreateExperience/AdminExperience.jsx";
import { EditPost } from "../pages/Post/EditPost/EditPost.jsx";
import { AdminCategory } from "../pages/Admin/AdminCategory/AdminCategory.jsx";
import { useContext } from "react";
import { AgroContext } from "../context/ContextProvider.jsx";
import { Payment } from "../pages/Payment/Payment.jsx";
import { PaymentSuccess } from "../pages/Payment/PaymentSuccess/PaymentSuccess.jsx";


export const AppRoutes = () => {
  const { user } = useContext(AgroContext);

  if (user === undefined) {
    return <LoadingScreen />; 
  }

  return (
    <BrowserRouter>
      <header>
        <NavbarApp />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/register' element={<Register />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/recoverPassword' element={<RecoverPassword />} />
          <Route path='/user/restablecerPass/:token' element={<ChangePassword />} />
          <Route path='/sobreNosotros' element={<AboutUs />} />
          <Route path='/contacto' element={<ContactUs />} />
          <Route path='/experiencias' element={<AllExperiences />} />
          <Route path='/experiencias/:id' element={<OneExperience />} />
          <Route path="/paseo/unPaseo/:id" element={<OneHike />} />
          <Route path='/confirmarEmail/:token' element={<VerifyEmail />} />
          <Route path='/blog' element={<Blog />} />
          <Route path="/blog/unPost/:postId" element={<OnePost />} />
          <Route path="/payment" element={<Payment amount={50} />} />

          {user && user.user_type === 0 && (
            <>
              <Route path='/user/perfil' element={<Profile />} />
              <Route path='/user/perfil/editUser' element={<EditUser />} />
              <Route path='/reserva/cancelarReserva/:reservation_id' element={<CancelReservation />} />
              {localStorage.getItem("reservationData") && (
                <Route path='/reserva/confirmarReserva/:priceId' element={<PaymentSuccess />} />
              )}
            </>
          )}

          {user && <Route path='/user/reserva' element={<Reservation />} />}

          {user && user.user_type === 1 && (
            <>
              <Route path='/experiencias/createExperience' element={<CreateExperience />} />
              <Route path='/experiencias/editExperience/:id' element={<EditExperience />} />
              <Route path="/paseo/nuevoPaseo" element={<CreateHike />} />
              <Route path="/paseo/editar/:hikeId" element={<EditHike />} />
              <Route path="/paseo/borrados" element={<DeletedHikes />} />
              <Route path='/admin/perfil' element={<AdminDashboard />} />
              <Route path='/admin/usuarios' element={<AdminUsers />} />
              <Route path='/admin/experiencias' element={<AdminExperience />} />
              <Route path="/admin/reservas-pendientes" element={<PendingReservations />} />
              <Route path="/admin/historial-reservas" element={<ReservationHistory />} />
              <Route path="/admin/modificar-dias-disponibles" element={<ReservationsDays />} />
              <Route path="/blog/crearPost" element={<CreatePost />} />
              <Route path="/admin/blog/categorias" element={<AdminCategory />} />
              <Route path='/blog/editPost/:post_id' element={<EditPost />} />
            </>
          )}

          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  );
};

const LoadingScreen = () => (
  <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
    <div className="spinner-border text-danger" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
    <p className="mt-3 fw-semibold text-muted">Cargando...</p>
  </div>
);
