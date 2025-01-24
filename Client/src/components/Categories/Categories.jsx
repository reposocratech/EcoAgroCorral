import React, { useState } from 'react'
import { Container, Row } from "react-bootstrap";
import './categories.css'

export const Categories = ({categories, setActualPost, allPost}) => {
  const [select, setSelect] = useState(0);

  const changeCategory = (category_id) =>{
    if(category_id === 0){
      setActualPost(allPost);
    }else{
      setActualPost(allPost.filter((elem)=> elem.category_id == category_id));
    }
    setSelect(category_id);
  }

  return (
    <>
    <section className='py-3 card-category'>
      <Container fluid>
        <Row >
          <div className='d-flex flex-wrap justify-content-center cat-nav'>
                  <span className={`category-name ${select === 0? 'select-cat': ''}`} onClick={()=>changeCategory(0)}>TODOS</span>
            {categories.map((elem)=>{
              return(
                  <span onClick={()=>changeCategory(elem.category_id)} className={`category-name ${select === elem.category_id? 'select-cat': ''}`} key={elem.category_id}> {elem.category_name.toUpperCase()}  </span>
              )
            })}
          </div>
        </Row>
      </Container>
    </section>
    </>
  )
}
