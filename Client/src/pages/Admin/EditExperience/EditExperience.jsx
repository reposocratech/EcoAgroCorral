import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import logoAgro from "/assets/images/LogoAgro.png";
import { fetchData } from "../../../helpers/axiosHelper";
import { EditFeatureModal } from "../../../components/EditFeatureModal/EditFeatureModal";
import { EditFeatureList } from "../../../components/EditFeatureList/EditFeatureList";
import { EditExperienceMainImgList } from "../../../components/EditExperienceMainImgList/EditExperienceMainImgList";
import { EditExperienceImgList } from "../../../components/EditExperienceImgList/EditExperienceImgList";
import { useNavigate, useParams } from "react-router-dom";

const initialValue = {
  experience_title: "",
  experience_description: "",
  experience_price_child: "",
  experience_price_adult: ""
}



export const EditExperience = () => {
  const [experienceInfo, setExperienceInfo] = useState(initialValue);
  const [files, setFiles] = useState([]);
  const [mainFile, setMainFile] = useState();
  const [features, setFeatures] = useState([]);
  const [msg, setMsg] = useState("");
  const [msgExpSaved, setMsgExpSaved] = useState("");
  const [msgFeature, setMsgFeature] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  console.log("iddd", id);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("files",files)

  const getExperience = async () => {
    try {
      const res = await fetchData(`api/experience/getOneExperience/${id}`, "get");
      setExperienceInfo(res.experience);
      setMainFile(res.experiencePictures.find((img) => img.is_main) || null);
      setFiles(res.experiencePictures.filter((img) => !img.is_main));
      setFeatures(res.features);
      
    } catch (error) {
      
    }
   }

  useEffect(() => {
     getExperience();
  }, [])
  


  const handleChange = (e) => {
    const {name, value} = e.target;
    setExperienceInfo({...experienceInfo, [name]: value});
  }
  

  const handleMainFile = async (e) => {
    let newImg = e.target.files[0];

    const newFormData = new FormData();
    newFormData.append("file", newImg);
    try {
      let response = await fetchData(`api/experience/addMainPicture/${id}`, "post", newFormData);
      console.log(response);
      setMainFile(response);
      getExperience();
    } catch (error) {
      
    }
  }
  

  const handleFiles = async (e) => {
    const uploads = e.target.files;

    const newFormData = new FormData();
    if (uploads && uploads.length){
      for (const elem of uploads){
        newFormData.append("file", elem);
      }
      try {
        let response = await fetchData(`api/experience/addImagesByExperiences/${id}`, "post", newFormData);
        setFiles(response);
        getExperience();
        console.log(response);
      } catch (error) {
        
      }
    }
  }

  const deletePicture = async (picture_id, is_main, index=null) => {
    try {
      if(is_main){
        const res = await fetchData(`api/experience/deletePicture/${picture_id}`, "delete");
        setMainFile();
      }
      else {
        const res = await fetchData(`api/experience/deletePicture/${picture_id}`, "delete");
        setFiles([...files].filter((e, i)=>{
          return i !== index;
        }));
      }
      getExperience();
    } catch (error) {
      
    }
  }

  const onSubmitExperienceInfo = async () => {
    try {
      if(!experienceInfo.experience_title || !experienceInfo.experience_description || !experienceInfo.experience_price_child || !experienceInfo.experience_price_adult){
        setMsg("No puede haber ningún campo vacío");
      }
      else{
        let data = {...experienceInfo}

        const res = await fetchData(`api/experience/editExperience/${id}`, "put", data);
        setMsgExpSaved("Cambios Guardados!");
      }
    } catch (error) {
      
    }
  }

  const onSubmit = async () => {
    try {
      if(!experienceInfo.experience_title || !experienceInfo.experience_description || !experienceInfo.experience_price_child || !experienceInfo.experience_price_adult){
        setMsg("No puede haber ningún campo vacío");
      }
      else if(!features.length){
        setMsgFeature("Tienes que crear al menos una característica");
      }
      else if(!mainFile){
        setMsgFeature("Añade una Imagen principal");
      }
      else if(!files.length){
        setMsgFeature("Añade Imagenes");
      }
      else{
        navigate("/experiencias");
      }
    } catch (error) {
      
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
            <img src={logoAgro} alt="LogoAgro" className="mx-auto" />
            <h2 className="text-center mt-2 fw-bold">EDITA LA  EXPERIENCIA</h2>
            <div className="separator"></div>
            <Form className="px-4 pt-4">
            <Form.Label>Title</Form.Label>
              <Form.Group className="mb-1">
                <div className="d-flex gap-3">
                  <Form.Control
                    type="text"
                    placeholder="title"
                    value={experienceInfo.experience_title}
                    onChange={handleChange}
                    name="experience_title"
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Descripcion</Form.Label>
                <div className="d-flex gap-2">
                <Form.Control
                    as="textarea"
                    rows={3}
                    type="text"
                    placeholder="descripcion"
                    value={experienceInfo.experience_description}
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
                    value={experienceInfo.experience_price_adult}
                    onChange={handleChange}
                    name="experience_price_adult"
                  />
                  <Form.Control
                    type="number"
                    placeholder="Precio para niños"
                    value={experienceInfo.experience_price_child}
                    onChange={handleChange}
                    name="experience_price_child"
                  />
                </div>
                <div className="p-2 d-flex flex-column align-items-center">
                <Button className="btn mb-3" onClick={onSubmitExperienceInfo}>
                  Guardar
                </Button>
                <span >{msgExpSaved}</span>
              </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="">
                  <div>
                    <Form.Label>Sube la imagen principal</Form.Label>
                    {!mainFile && <Form.Control
                      type="file"
                      onChange={handleMainFile}
                      single="true"
                      name="main_file"
                    />}
                    {mainFile && <EditExperienceMainImgList mainFile={mainFile} setMainFile={setMainFile} deletePicture={deletePicture}/>}
                  </div>
                  <div>
                    <Form.Label>Sube las imagen </Form.Label>
                    <Form.Control
                      type="file"
                      onChange={handleFiles}
                      multiple
                    />
                    {files && <EditExperienceImgList files={files} setFiles={setFiles} deletePicture={deletePicture}/>}
                  </div>
                </div>
              </Form.Group>
              <div>
                {features && <EditFeatureList features={features} setFeatures={setFeatures} />}
                <span>{msgFeature}</span>
                <Button onClick={handleShow}>Añadir caracteristica</Button>
              </div>
              <span>{msg}</span>
              <div className="p-2 d-flex justify-content-center">
                <Button className="btn mb-3" onClick={onSubmit}>
                  Terminar
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <EditFeatureModal  show={show} handleClose={handleClose} features={features} getExperience={getExperience} experience_id={id} />
    </section>
  )
}
