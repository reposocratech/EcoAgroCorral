import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import logoAgro from "/assets/images/LogoAgro.png";
import { fetchData } from "../../../helpers/axiosHelper";
import { CreateFeatureModal } from "../../../components/CreateFeatureModal/CreateFeatureModal";
import { CreateFeatureList } from "../../../components/CreateFeatureList/CreateFeatureList";
import { CreateExperienceMainImgList } from "../../../components/CreateExperienceMainImgList/CreateExperienceMainImgList";
import { CreateExperienceImgList } from "../../../components/CreateExperienceImgList/CreateExperienceImgList";
import { useNavigate } from "react-router-dom";

import "./createExperience.css";

const initialValue = {
  experience_title: "",
  experience_description: "",
  experience_price_child: "",
  experience_price_adult: ""
}



export const CreateExperience = () => {
  const [newExperience, setNewExperience] = useState(initialValue);
  const [files, setFiles] = useState();
  const [mainFile, setMainFile] = useState();
  const [features, setFeatures] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgFeature, setMsgFeature] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  console.log(mainFile)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setNewExperience({...newExperience, [name]: value});
  }
  

  const handleMainFile = (e) => {
    setMainFile(e.target.files[0]);
    //setNewExperience({...newExperience, [e.target.name]: e.target.files[0].name});
  }
  

  const handleFiles = (e) => {
      //console.log(e.target.files);
      setFiles(e.target.files);
  }

  const onSubmit = async () => {
    try {
      if(!newExperience.experience_title || !newExperience.experience_description || !newExperience.experience_price_child || !newExperience.experience_price_adult){
        setMsg("No puede haber ningún campo vacío");
      }
      else if(!features.length){
        setMsgFeature("tienes que crear al menos una característica");
      }
      else{
        const newFormData = new FormData();
        let featureTemp = features.map(e=>({...e, feature_icon: e.feature_icon.name}));

        //console.log(featureTemp);
        let data = {...newExperience, features: featureTemp}
        newFormData.append("data", JSON.stringify(data));

        if(mainFile){
          newFormData.append("singleFile", mainFile);
        }
        if(files){
          for(const elem of files){
            newFormData.append("multipleFiles", elem);
          }
        }
        if (features.length){
          for(const elem of features){
            newFormData.append("feature_icon", elem.feature_icon);
          }
        }

        const res = await fetchData("api/experience/addExperience", "post", newFormData);
        navigate("/experiencias");
      }
    } catch (error) {
      console.log(error);
    }
  }

  //console.log("pictures:", mainFiles);
  //console.log("newExperience", newExperience);
  //console.log("feature", feature);
  //console.log("features", features);
  
  return (
    <section>
      <Container fluid="xxl">
        <Row className="d-flex justify-content-center">
          <Col
            lg={4}
            md={6}
            className="d-flex flex-column shadow my-5 create-experience"
          >
            <img src={logoAgro} alt="LogoAgro" className="mx-auto logo" />
            <h2 className="text-center mt-2 fw-bold">CREA UNA NUEVA EXPERIENCIA</h2>
            <div className="separator"></div>
            <Form className="px-4 pt-4">
            <Form.Label>Titulo</Form.Label>
              <Form.Group className="mb-1">
                <div className="d-flex gap-3">
                  <Form.Control
                    type="text"
                    placeholder="titulo"
                    value={newExperience.experience_title}
                    onChange={handleChange}
                    name="experience_title"
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descripcion</Form.Label>
                <div className="d-flex gap-2">
                <Form.Control
                    type="text"
                    placeholder="Descripcion"
                    value={newExperience.experience_description}
                    onChange={handleChange}
                    name="experience_description"
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPrices">
                <Form.Label>Precio</Form.Label>
                <div className="d-flex gap-3">
                  <Form.Control
                    type="number"
                    placeholder="Precio para adultos"
                    value={newExperience.experience_price_adult}
                    onChange={handleChange}
                    name="experience_price_adult"
                  />
                  <Form.Control
                    type="number"
                    placeholder="Precio para niños"
                    value={newExperience.experience_price_child}
                    onChange={handleChange}
                    name="experience_price_child"
                  />
                </div>
                <div className="d-flex justify-content-between">
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="">
                  <div>
                    <Form.Label>Sube la imagen principal</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleMainFile}
                      single="true"
                      name="main_file"
                    />
                    {mainFile && <CreateExperienceMainImgList mainFile={mainFile} setMainFile={setMainFile} />}
                  </div>
                  <div>
                    <Form.Label>Sube las imagen </Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleFiles}
                      multiple
                    />
                    {files && <CreateExperienceImgList files={files} setFiles={setFiles} />}
                  </div>
                </div>
              </Form.Group>
              <div>
                {features && <CreateFeatureList features={features} setFeatures={setFeatures} />}
                <span>{msgFeature}</span>
                <div className="d-flex justify-content-center"><Button onClick={handleShow}>Añadir caracteristica</Button></div>
              </div>
              <span>{msg}</span>
              <div className="p-2 d-flex justify-content-center">
                <Button className="btn mb-3" onClick={onSubmit}>
                  Guardar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <CreateFeatureModal  show={show} handleClose={handleClose} features={features} setFeatures={setFeatures} />
    </section>
  )
}
