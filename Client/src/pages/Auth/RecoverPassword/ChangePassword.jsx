import  { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchData } from '../../../helpers/axiosHelper';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { newPassSchema } from '../../../schemas/loginSchema';
import './recoverPas.css'

const initialValue = {
  user_password: "",
  user_repPassword: ""
}

export const ChangePassword = () => {
  const {token} = useParams();
  const [msg, setMsg] = useState("");
  const [verifToken, setVerifToken] = useState("");
  const [valErrors, setValErrors] = useState({});
  const [newPass, setNewPass] = useState(initialValue);
  const [userId, setUserId] = useState("");

   const validateField = (name, value) =>{
      try {
        newPassSchema.pick({[name]:true}).parse({[name]: value});
        setValErrors({...valErrors, [name]:""})
      } catch (error) {
        setValErrors({...valErrors, [name]:error.errors[0].message})
      }
  }

  useEffect(()=>{
    const verifToken = async ()=>{
      try {
        const res = await fetchData(`api/user/confirm/${token}`, "get");
        if(res[0]){
          setVerifToken("OK");
          setUserId(res[0].user_id);
        }
      } catch (error) {
       setMsg(error.response.data.message)
      }
    }
    verifToken()
  }, []);


  const handleChange = (e)=>{
    const {name, value} = e.target;
    setNewPass({...newPass, [name]: value})
     validateField(name, value);
  }

  const onSubmit = async ()=>{
    try {
      if(newPass.user_password != newPass.user_repPassword){
        setMsg("Las contraseñas no coinciden")
      }else{
        const res = await fetchData(`api/user/changePassword/${userId}`, "put", newPass);
        setVerifToken("password changed");
        console.log("REEEEEEEES", res);
      }
    } catch (error) {
      setMsg(error.response.data.message);
    }
  }

  return (
    <section>
      <Container fluid="xxl">
        <Row className='justify-content-center'>
          <Col lg={5} className='my-5'>
            {!verifToken && <p> {msg} . <Link to="/user/recoverPassword">Inténtalo de nuevo aquí</Link></p>}
            {verifToken == "OK" &&
            <article>
              <Form className="px-4 py-4 form shadow my-5">
             <Form.Group className="mb-3" controlId="formBasicPass">
               <Form.Label>Nueva contraseña </Form.Label>
               <Form.Control 
                type="password" 
                placeholder="Introduce tu nueva contraseña" 
                name='user_password'
                value={newPass.user_password}
                onChange={handleChange}
              />
               {valErrors.user_password && <span>{valErrors.user_password}</span>} 
             </Form.Group>
             <Form.Group className="mb-3" controlId="formBasicRepPass">
               <Form.Label>Repite la contraseña </Form.Label>
               <Form.Control 
                type="password" 
                placeholder="Repite tu nueva contraseña" 
                name='user_repPassword'
                value={newPass.user_repPassword}
                onChange={handleChange}
              />
             </Form.Group>
             <span>{msg}</span>
             <div className='mt-2 d-flex justify-content-center'>
               <Button
                  onClick={onSubmit}
                  className='btn'>
                   Restablecer contraseña
                </Button>
             </div>
               
            </Form>
            </article>}
            {verifToken == "password changed" &&
            <article>
              <p className='text-center fw-bold'>Tu contraseña fue restablecida correctamente, <Link className='link' to="/user/login"> Inicia sesión aquí</Link>.</p>
            </article>
            }
          </Col>
        </Row>
      </Container>
    </section>
  )
}
