import React, { useEffect, useRef } from 'react'
import { Button, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './postCard.css'

export const PostCard = ({post}) => {
  const background = useRef();
  const navigate = useNavigate()
 
 useEffect(() => {
      background.current.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.35)), url(" + `http://localhost:4000/images/posts/${post.post_file}` + ")";
      
  }, []); 

  return (
    <>
    
     
        <Col xs={12} md={6} className='p-2'>
          <div  ref={background} className='text-center d-flex flex-column align-items-center justify-content-between py-3 card-post px-5'>
            <span className='cat-name fw-bold fs-5'>{post.category_name.toUpperCase()}</span>
            <h4 className='fs-3'>{post.post_title}</h4>
            <Button className='btn-post' onClick={()=> navigate(`/blog/unPost/${post.post_id}`)}>Saber más</Button>
          </div>
        </Col>
    
  
    </>
  )
}
