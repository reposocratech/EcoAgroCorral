import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchData } from '../../../helpers/axiosHelper.js'

export const VerifyEmail = () => {
  const [verEmail, setVerEmail] = useState(false);
  const [message, setMessage] = useState("");
  const { token } = useParams();

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const res = await fetchData(`api/user/verificar/${token}`, "get");
        setMessage(res.msg);
        setVerEmail(true);
        
      } catch (error) {
        setMessage(
          error.response?.data?.msg || "Error al verificar el correo electrónico"
        );
        setVerEmail(false);
      }
    };
    confirmEmail();
  }, [token]);

  return (
    <div style={{ marginTop: "100px" }}>
      {verEmail === true && <p style={{ color: "green" }}>{message}</p>}
      {verEmail === false && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
};
