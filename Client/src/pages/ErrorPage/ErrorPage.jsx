import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="d-flex flex-column justify-content-center align-items-center text-center paginaError">
        <h1 className="mb-2 ">404</h1>
        <p className="mb-4">Ups... parece que nos hemos desviado del sendero. Esta página no existe o se ha perdido entre los caminos. ¿Regresamos o descubrimos una nueva experiencia?</p>
        <div className="gap-2 d-flex">
          <button onClick={() => navigate("/")} className="text-white border rounded-2 error-btn">
            Volver al inicio
          </button>
          <button onClick={() => navigate("/experiencias")} className="text-white border rounded-2 error-btn">
            Ir a experiencias
          </button>
        </div>
      </div>
    </section>
  );
};
