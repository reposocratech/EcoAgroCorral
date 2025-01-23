import React, { useEffect, useState } from "react";
import { fetchData } from "../../../helpers/axiosHelper";
import { Categories } from "../../../components/Categories/Categories";
import { Col, Container, Form, Row } from "react-bootstrap";
import "./blog.css";
import { PostCard } from "../../../components/PostCard/PostCard";

export const Blog = () => {
  const [categories, setCategories] = useState([]);
  const [allPost, setAllPost] = useState();
  const [actualPost, setActualPost] = useState();
  const [orderBy, setOrderBy] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const result = await fetchData("api/post/getAllPost", "get");

        if (categories.length === 0) {
          for (let elem of result) {
            if (
              !categories.find((cat) => cat.category_id === elem.category_id)
            ) {
              categories.push({
                category_id: elem.category_id,
                category_name: elem.category_name,
              });
            }
          }
        }
        setAllPost(result);
        setActualPost(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  const handleChange = (e)=>{
    const {value} = e.target;
    if(value === "1"){
      if(orderBy === "2"){
        setActualPost(actualPost.reverse());
      }
      setOrderBy("1");
    }else{
      setActualPost(actualPost.reverse());
      setOrderBy("2");
    }
  }


  return (
    <>
      <Categories
        categories={categories}
        setActualPost={setActualPost}
        allPost={allPost}
      />

      <section className="blog-section">
        <Container fluid="xxl">
          <Row>
            <Col>
              <h2 className="text-center title-blog py-3">Nuestro Blog</h2>
            </Col>
          </Row>
          <Row className="d-flex flex-wrap justify-content-center">
            <Col xs={12} className="d-flex justify-content-between align-items-center sect-title">
              <h3 className="fs-5 text-center">
                Descubre más sobre nuestro día a día.
              </h3>
              <div>
                <Form.Select 
                aria-label="Ordenar por"
                onChange={handleChange}
                value={orderBy}
                className="select-order" >
                  <option>Ordenar por</option>
                  <option className="option-sel" value="1">Mas recientes</option>
                  <option className="option-sel" value="2">Mas antiguos</option>
                </Form.Select>
              </div>
            </Col>
            {actualPost?.map((elem) => {
              return <PostCard post={elem} key={elem.post_id} />;
            })}
          </Row>
        </Container>
      </section>
    </>
  );
};
