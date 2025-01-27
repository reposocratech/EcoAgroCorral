import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap'
import { FeatureIconList } from '../FeatureIconList/FeatureIconList';
import { fetchData } from '../../helpers/axiosHelper';

const featureInitialValue = {
  feature_name: "",
  feature_description: "",
  feature_icon: ""
}

export const EditFeatureModal = ({show, handleClose, features, getExperience, experience_id}) => {
  const [feature, setFeature] = useState(featureInitialValue);
  const [newFile, setNewFile] = useState(0);
  const [msg, setMsg] = useState("");
  const [modifOrCreate, setModifOrCreate] = useState(0);
  
  const handleSelectChange = (e) => {    
    if(e.target.value != 0){
      setModifOrCreate(1);
      setNewFile(0);
      let featuretemp = features.find((elem) => elem.feature_id == e.target.value);
      setFeature(featuretemp);
    }
    else{
      setModifOrCreate(0);
      setFeature(featureInitialValue);
    }
  }

  const handleChangeFeature = (e) => {
    const {name, value} = e.target;
    setFeature({...feature, [name]: value});
  }

  const handleFeatureFile = (e) => {
    //setFeatureFile(e.target.files[0]);
    //console.log(e.target.files[0]);
    setFeature({...feature, feature_icon : e.target.files[0]});
    setNewFile(1);
  }

  const onSubmitFeature = async () => {
    if (!feature.feature_icon || !feature.feature_name || !feature.feature_description){
      setMsg("Todos los campos deben ser cumplimentados.")
    }
    else{
      let feature_data;
      const newFormData = new FormData();
      if(newFile === 1){
        feature_data = {...feature, feature_icon: feature.feature_icon.name};
        newFormData.append("file", feature.feature_icon);
      }
      else{
        feature_data = {...feature, feature_icon: feature.feature_icon};
      }
      newFormData.append("data", JSON.stringify(feature_data));

      console.log(modifOrCreate);
      if(modifOrCreate === 0){
        await fetchData(`api/experience/addFeature/${experience_id}`, "post", newFormData);
      }
      else{
        await fetchData(`api/experience/editFeature/${feature.feature_id}`, "put", newFormData);

      }
      getExperience();
      setFeature(featureInitialValue);
      handleClose();

    }
  }

  return (
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modifica o Crea caracteristicas</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              as="select"
              name='createOrModif'
              onChange={(e)=>handleSelectChange(e)}
            >
              <option value="0">Nueva Caracteristica</option>
              {features?.map((elem)=>{
                return(
                  <option key={elem?.feature_id} value={elem?.feature_id}>{elem?.feature_name}</option>
                )
              })}
            </Form.Control>
            <Form.Group className="mb-3">
                <Form.Label>Creacion de caracteristicas</Form.Label>
                <div className="">
                  <div>
                    {!feature?.feature_icon && <Form.Control
                      type="file"
                      onChange={handleFeatureFile}
                      single="true"
                      name="feature_icon"
                    />}
                  </div>
                  {feature.feature_icon && <FeatureIconList feature={feature} setFeature={setFeature} modifOrCreate={modifOrCreate} newFile={newFile} />}
                  <div>
                    <Form.Control
                      type="text"
                      placeholder="Nombre"
                      onChange={handleChangeFeature}
                      value={feature.feature_name}
                      name="feature_name"
                    />
                    <Form.Control
                      type="text"
                      placeholder="Descripcion"
                      onChange={handleChangeFeature}
                      value={feature.feature_description}
                      name="feature_description"
                    />
                  </div>
                </div>
              </Form.Group>
          </Form>
          <span>{msg}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={onSubmitFeature}>Guardar</Button>
        </Modal.Footer>
      </Modal>
  )
}
