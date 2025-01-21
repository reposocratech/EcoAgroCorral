import {BrowserRouter, Route, Routes} from "react-router-dom";
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
import { OneHike } from "../pages/Hikes/OneHike/OneHike.jsx";
import { CreateHike } from "../pages/Hikes/NewHike/NewHike";
import { EditHike } from "../pages/Hikes/EditHike/EditHike";
import {DeletedHikes} from "../pages/Hikes/RestoreHikes/DeletedHikes";
import { ChangePassword } from "../pages/Auth/RecoverPassword/ChangePassword.jsx";
import { Profile } from "../pages/User/Profile/Profile.jsx";
import { EditUser } from "../pages/User/EditUser/EditUser.jsx";
import { Reservation } from "../pages/User/Reservation/Reservation.jsx";
import { ContactUs } from "../pages/ContactUs/ContactUs.jsx";
import { CancelReservation } from "../pages/User/CancelReservation/CancelReservation.jsx";


export const AppRoutes = () => {
  return (

    <BrowserRouter>
      <header>
        <NavbarApp />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/perfil' element={<Profile />} />
          <Route path='/user/register' element={<Register/>} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/recoverPassword' element={<RecoverPassword />} />
          <Route path='/user/restablecerPass/:token' element={<ChangePassword />} />
          <Route path='/sobreNosotros' element={<AboutUs />} />
          <Route path='/contacto' element={<ContactUs/>} />
          <Route path='/experiencias' element={<AllExperiences />} />
          <Route path='/experiencias/:id' element={<OneExperience />} />
          <Route path="/paseo/:id" element={<OneHike/>}/>
          <Route path="/paseo/nuevoPaseo" element={<CreateHike />} />          
          <Route path="/paseo/editar/:hikeId" element={<EditHike />} />
          <Route path='/confirmarEmail/:token' element={<VerifyEmail/>}/>
          <Route path="/paseo/borrados" element={<DeletedHikes/>} />
          <Route path='/user/perfil/editUser' element={<EditUser/>}/>
          <Route path='/user/reserva' element={<Reservation/>}/>
          <Route path='/reserva/cancelarReserva/:reservation_id' element={<CancelReservation/>}/>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>

  )
}
