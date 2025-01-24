import { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { recoverPassSchema } from '../../../schemas/loginSchema';
import { useNavigate } from 'react-router-dom';
import { ZodError } from 'zod';
import { fetchData } from '../../../helpers/axiosHelper';
import './recoverPas.css'

const initialValue = {
  user_email:"",
}

export const RecoverPassword = () => {
  const [recover, setRecover] = useState(initialValue);
  const [valErrors, setValErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [valSendEmail, setValSendEmail] = useState(false);

  const navigate = useNavigate();

   const validateField = (name, value) =>{
      try {
        recoverPassSchema.pick({[name]:true}).parse({[name]: value});
        setValErrors({...valErrors, [name]:""})
      } catch (error) {
        setValErrors({...valErrors, [name]:error.errors[0].message})
      }
  } 

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setRecover({...recover, [name]: value})
     validateField(name, value);
     setValSendEmail(false) 
  }

  const onSubmit = async ()=>{
    try {
      setMsg("");
      setValSendEmail(false)
      recoverPassSchema.parse(recover)
       const res = await fetchData("api/user/recoverPassword", "post", recover);
        if(res.message === "Correo de recuperación enviado."){
          setValSendEmail(true)
        }
       
    } catch (error) {
      if (error instanceof ZodError) {
       const fieldErrors = {};
       error.errors.forEach((err) => {
         fieldErrors[err.path[0]] = err.message;
       });
       setValErrors(fieldErrors);
     } else {
       console.log("Error en el servidor:", error);
       setMsg(error.response?.data?.message || "Error al enviar el correo");
     }
    }
  }

  return (
    <>
    <section>
      <Container fluid="xxl">
        <Row className='justify-content-center'>
          <Col lg={4} className='my-5' >
          <Form className="px-4 pt-4 form shadow my-5 p-4">
             <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Control 
                type="email" 
                placeholder="Introduce tu email" 
                name='user_email'
                value={recover.user_email}
                onChange={handleChange}
              />
               {valErrors.user_email && <span>{valErrors.user_email}</span>} 
              
             </Form.Group>
             <span >{msg}</span>
             <div className='d-flex justify-content-center pt-2'>
               <Button
                  onClick={onSubmit}
                  className='btn'>
                   Enviar
                 </Button>
                 <Button
                   className="ms-3 btn"
                   onClick={()=>navigate("/login")}
                 >
                   Cancelar
                 </Button>
             </div>
             <div className='divisor mt-4'></div>
             {valSendEmail && 
              <p className='text-center p-4 mt-3 fw-bold'>Hemos enviado un enlace a {recover.user_email} para que puedas restablecer tu contraseña.</p>} 
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}
