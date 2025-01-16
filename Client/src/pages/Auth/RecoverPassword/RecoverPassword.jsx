import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { recoverPassSchema } from '../../../../schemas/registerSchema';
import { useNavigate } from 'react-router-dom';

const initialValue = {
  user_email:"",
}

export const RecoverPassword = () => {
  const [recover, setRecover] = useState(initialValue);
  const [valErrors, setValErrors] = useState({});
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
  }

  const onSubmit = ()=>{

  }

  return (
    <>
    <section>
      <Container xxl="true">
        <Row>
          <Col>
          <Form className="px-4 pt-4">
             <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Email </Form.Label>
               <Form.Control 
                type="email" 
                placeholder="Introduce tu email" 
                name='user_email'
                value={recover.email}
                onChange={handleChange}
              />
               {valErrors.user_email && <span>{valErrors.user_email}</span>} 
              
             </Form.Group>
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
            </Form> 
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}
