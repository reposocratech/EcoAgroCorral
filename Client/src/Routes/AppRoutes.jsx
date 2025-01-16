import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Home } from "../pages/Dashboard/Home/Home";
import { NavbarApp } from "../components/Navbar/NavbarApp";
import { Footer } from "../components/Footer/Footer";
import { AboutUs } from "../pages/Dashboard/AboutUs/AboutUs";

import { Login } from "../pages/Auth/Login/Login";

import { AllExperiences } from "../pages/Experiences/AllExperiences/AllExperiences";
import { RecoverPassword } from "../pages/Auth/RecoverPassword/RecoverPassword";



export const AppRoutes = () => {
  return (

    <BrowserRouter>
      <header>
        <NavbarApp />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sobreNosotros' element={<AboutUs />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/recoverPassword' element={<RecoverPassword />} />
          <Route path='/experiencias' element={<AllExperiences />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>

  )
}
