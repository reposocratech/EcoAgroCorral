import React, { useEffect, useState } from 'react'
import { Row, Button, Col, Form, Container } from "react-bootstrap";
import { useNavigate, useParams } from 'react-router-dom';
import { fetchData } from '../../../helpers/axiosHelper';
import './editPost.css'

export const EditPost = () => {
  const navigate = useNavigate();
  const {post_id} = useParams();
  const [post, setPost] = useState({});
  const [fileMain, setFileMain] = useState();
  const [filesPic, setFilesPic] = useState();
  const [msg, setMsg] = useState("")

  const fetchPost = async ()=>{
    try {
      const result = await fetchData(`api/post/getDataPost/${post_id}`, 'get');
      setPost(result[0]);
    } catch (error) {
      console.log(error); 
    }
  }

  useEffect(()=>{
    fetchPost();
  }, []);
 
  const handleChange = (e)=>{
    const {name, value} = e.target;
    setPost({...post, [name]: value});
  }

  const handleFile = (e)=>{
    setFileMain(e.target.files[0]);
  }

  const deleteImg = async (id) =>{
    try {
      const result = await fetchData(`api/post/deleteImg/${id}`, 'delete');
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }

  const handleFileMult = (e)=>{
    setFilesPic(e.target.files);
  }

  const onSubmit = async ()=>{
    try {
      if(!post.post_title || !post.post_description || !post.post_category_id){
        setMsg("Debes cumplimentar todos los datos");
      }else{
        const formData = new FormData();
        formData.append("post", JSON.stringify(post));
        if (fileMain) {
          formData.append("file", fileMain);
        }
        const res = await fetchData('api/post/editPost', 'put', formData);
        if(filesPic){
          const formDataFiles = new FormData();
          Array.from(filesPic).forEach((file) => {
            formDataFiles.append("file", file);
          });
          const result = await fetchData(`api/post/addFiles/${post.post_id}`, 'post', formDataFiles);
        }
        navigate(`/blog/unPost/${post.post_id}`);
      }
    } catch (error) {
      console.log("errrrrr", error);
    }
  }

  

  return (
    <>
    <section className='edit-post py-5'>
      <Container >
        <Row>
          <Col xs={12}>

          <div className='form-edit-post'>

            <h2 className='text-center pt-4'>Editar Post</h2>
            <div className='divisor'></div>
            <Form className="px-4 pt-4">
               <Form.Group className="mb-3" controlId="formBasicEmail">
                 <Form.Label className='fw-bold'>Título </Form.Label>
                 <Form.Control
                  type="text"
                  name='post_title'
                  value={post?.post_title}
                  onChange={handleChange}
                />
            
              </Form.Group>
               <Form.Group className="mb-3">
                      <Form.Label className='fw-bold'>
                        Descripción
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={post?.post_description}
                        name="post_description"
                        onChange={handleChange}
                      />
                    </Form.Group>

                   <Form.Group className="mb-3">
                    <Form.Label className='fw-bold'>Tu categoría actual es "{post.category_name}". Selecciona una nueva categoría si deseas cambiarla.</Form.Label>

                    <Form.Select
                      value={post.post_category_id}
                      name="post_category_id"
                      onChange={handleChange}
                      id="formBasicCategory"
                    >
                      <option value="">Selecciona una categoría</option>
                      {post?.all_categories?.map((elem) => {
                        return (
                          <option key={elem.id} value={elem.id}>
                            {elem.name}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <div className='divisor mb-3'></div>

                  <div>
                    <p className='fw-bold'>Esta es tu foto principal del Post.</p>
                   
                    <img className='img-ppl-post' src={`http://localhost:4000/images/posts/${post?.main_post_file}`} alt="" /> 
                    
                    <Form.Group className="mb-3" controlId="formBasicAvatar">
              <Form.Label className="fw-bold">Si quieres modificarla, selecciona una nueva imagen.</Form.Label>
              <Form.Control type="file" onChange={handleFile} />
            </Form.Group>
                  </div>
                  <div className='divisor mb-3'></div>
                  
              <div>
                  <Form.Group >
                <Form.Label className='fw-bold'>Añadir imágenes al post.</Form.Label>
                <Form.Control
                  type="file"
                  multiple
                  onChange={handleFileMult}
                />
                    </Form.Group>
              </div>
              {post?.all_pictures &&
                  <p className='fw-bold mt-3'>Estas son tus imágenes del post, puedes eliminarlas o añadir nuevas.</p>}
                  <div className='d-flex flex-wrap justify-content-center gap-2'>
                    {post?.all_pictures?.map((elem)=>{
                      return(
                        <div key={elem.id} className='d-flex flex-column align-items-center'>
                          <img className='img-post-sec'  src={`http://localhost:4000/images/posts/${elem.file}`} alt="" />
                          <Button className='btn-edit-post btn-sec' onClick={()=>{deleteImg(elem.id)}}>Eliminar</Button>
                        </div>
                      )
                    })}

                  </div>

                  <span>{msg}</span>
            
               <div className='p-2 d-flex justify-content-center py-4 '>
                 <Button
                  onClick={onSubmit}
                  className='btn-edit-post'>
                   Editar
                 </Button>
                 <Button
                   className="ms-3 btn-edit-post"
                   onClick={()=>navigate("/blog")}
                 >
                   Cancelar
                 </Button>
               </div>
             </Form>
          </div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  )
}
