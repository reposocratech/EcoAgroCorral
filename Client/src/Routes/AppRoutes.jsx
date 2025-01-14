import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Home } from "../pages/Dashboard/Home/Home";
import { NavbarApp } from "../components/Navbar/NavbarApp";
import { Footer } from "../components/Footer/Footer";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <header>
        <NavbarApp />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  )
}
