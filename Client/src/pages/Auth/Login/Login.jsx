import { useContext, useState } from 'react'
import {Col, Container, Row, Button, Form} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AgroContext } from '../../../context/ContextProvider'
import { fetchData } from '../../../helpers/axiosHelper'
import { ZodError } from 'zod'
import { loginSchema } from '../../../schemas/loginSchema.js'
import './login.css'



const initialValue = {
  user_email:"",
  user_password:""
}

export const Login = () => {
  const [login, setLogin] = useState(initialValue);
  const [msg, setMsg] = useState("");
  const [valErrors, setValErrors] = useState({});
  const {setUser, setToken} = useContext(AgroContext)
  const navigate = useNavigate()

  
  const handleChange = (e) =>{
    const {name, value} = e.target;
    setLogin({...login, [name]: value})
    setValErrors({})
    setMsg("")
  }


  const onSubmit = async()=>{
    try {
      loginSchema.parse(login)
      const result = await fetchData("api/user/login", "post", login)
      const token = result;
      localStorage.setItem("token", token);

      const userResult = await fetchData("api/user/findUserById", "get", null,{Authorization:`Bearer ${token}`});

      setUser(userResult);
      setToken(token);
      if (userResult.user_type === 1) {
        navigate("/admin/perfil");
      } 
      else {
        navigate("/user/perfil");
      }
    } catch (error) {
      const fieldErrors = {};
      if(error instanceof ZodError){
          error.errors.forEach((err)=>{
           fieldErrors[err.path[0]]=err.message
          })
          setValErrors(fieldErrors)      
      }else{
         setMsg(error.message)
      }
    }
  }

  return (
    <>
    <section className='mt-5'>
      <Container fluid="xxl">
        <Row className='justify-content-center p-2'>
          <Col lg={4} md={6} className='d-flex flex-column login shadow my-5'>
            <div className='divisor mt-4'></div>
          <Form className="px-4 pt-4">
             <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Email </Form.Label>
               <Form.Control 
                type="email" 
                placeholder="Introduce tu email" 
                name='user_email'
                value={login.email}
                onChange={handleChange}
              />
              
              
             </Form.Group>
   
             <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Contraseña</Form.Label>
               <Form.Control 
                type="password" 
                placeholder="Introduce tu contraseña" 
                name='user_password'
                value={login.password}
                onChange={handleChange}
                />
             </Form.Group>
              <div className='d-flex flex-column'>
                {valErrors.user_password && <span>{valErrors.user_password}</span>}
                {valErrors.user_email && <span>{valErrors.user_email}</span>}
                <span>{msg}</span>
              </div>
             <div className='p-2 d-flex justify-content-center'>
               <Button
                onClick={onSubmit}
                className='btn'>
                 Iniciar sesión
               </Button>
               <Button
                 className="ms-3 btn"
                 onClick={()=>navigate("/")}
               >
                 Cancelar
               </Button>
             </div>
              <p className='text-center pt-2'><Link to="/user/recoverPassword" className='link'>¿Olvidaste tu contraseña?</Link></p>
           </Form>
           <div className='divisor mb-4'></div>
             <p className='text-center'>¿No estás registrado?<Link to="/user/register" className='link ms-2'>Regístrate aquí</Link></p>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}
