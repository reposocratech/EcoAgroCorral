import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Home } from "../pages/Dashboard/Home/Home";
import { NavbarApp } from "../components/Navbar/NavbarApp";
import { Footer } from "../components/Footer/Footer";
import { AboutUs } from "../pages/Dashboard/AboutUs/AboutUs";
import { Login } from "../pages/Auth/Login/Login";
import { AllExperiences } from "../pages/Experiences/AllExperiences/AllExperiences";

import { RecoverPassword } from "../pages/Auth/RecoverPassword/RecoverPassword";

import { Register } from "../pages/Auth/Register/Register";
import { VerifyEmail } from "../pages/Auth/VerifyEmail/VerifyEmail";
import { OneHike } from "../pages/Hikes/OneHike/OneHike.jsx";
import { CreateHike } from "../pages/Hikes/NewHike/NewHike";
import { EditHike } from "../pages/Hikes/EditHike/EditHike";
import {DeletedHikes} from "../pages/Hikes/RestoreHikes/DeletedHikes";

export const AppRoutes = () => {
  return (

    <BrowserRouter>
      <header>
        <NavbarApp />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register/>} />

          <Route path='/user/login' element={<Login />} />
          <Route path='/user/recoverPassword' element={<RecoverPassword />} />
          <Route path='/experiencias' element={<AllExperiences />} />

          <Route path='/login' element={<Login />} />
          <Route path='/experiencias' element={<AllExperiences />} />
          <Route path="/paseo/:id" element={<OneHike/>}/>
          <Route path="/paseo/nuevoPaseo" element={<CreateHike />} />          
          <Route path="/paseo/editar/:hikeId" element={<EditHike />} />
          <Route path='/confirmarEmail/:token' element={<VerifyEmail/>}/>
          <Route path="/paseo/borrados" element={<DeletedHikes/>} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>

  )
}
