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
import { OneHike } from "../pages/Hikes/OneHike.jsx";
import { ChangePassword } from "../pages/Auth/RecoverPassword/ChangePassword.jsx";
import { Profile } from "../pages/User/Profile/Profile.jsx";
import { EditUser } from "../pages/User/EditUser/EditUser.jsx";
import { Reservation } from "../pages/User/Reservation/Reservation.jsx";
import { ContactUs } from "../pages/ContactUs/ContactUs.jsx";


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
          <Route path='/confirmarEmail/:token' element={<VerifyEmail/>}/>
          <Route path='/user/perfil/editUser' element={<EditUser/>}/>
          <Route path='/user/reserva' element={<Reservation/>}/>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>

  )
}
