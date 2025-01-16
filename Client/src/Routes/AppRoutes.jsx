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




export const AppRoutes = () => {
  return (

    <BrowserRouter>
      <header>
        <NavbarApp />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/register' element={<Register/>} />

          <Route path='/user/login' element={<Login />} />
          <Route path='/user/recoverPassword' element={<RecoverPassword />} />
          <Route path='/experiencias' element={<AllExperiences />} />

          <Route path='/login' element={<Login />} />
          <Route path='/experiencias' element={<AllExperiences />} />
          <Route path='/experiencias/:id' element={<OneExperience />} />
          <Route path="/paseo/:id" element={<OneHike/>}/>
          <Route path='/confirmarEmail/:token' element={<VerifyEmail/>}/>
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>

  )
}
