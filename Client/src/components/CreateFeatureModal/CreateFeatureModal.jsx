import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap'

const featureInitialValue = {
  feature_name: "",
  feature_description: "",
  feature_icon: ""
}

export const CreateFeatureModal = ({show, handleClose, features, setFeatures}) => {
  const [feature, setFeature] = useState(featureInitialValue);
  const [featureFile, setFeatureFile] = useState();
  


  const handleChangeFeature = (e) => {
    const {name, value} = e.target;
    setFeature({...feature, [name]: value});
  }

  const handleFeatureFile = (e) => {
    //setFeatureFile(e.target.files[0]);
    //console.log(e.target.files[0]);
    setFeature({...feature, feature_icon : e.target.files[0]});
  }
  console.log("featuresss", features);
  console.log("featuresss File", featureFile);
  console.log("feature", feature);

  const onSubmitFeature = () => {
    setFeatures ([...features, feature]);
    //setFeature(featureInitialValue);
    //setFeatureFile();
    handleClose();
  }
  //console.log("featureFiles: ", featureFiles);

  return (
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
                <Form.Label>Creacion de caracteristicas</Form.Label>
                <div className="">
                  <div>
                    <Form.Control
                      type="file"
                      onChange={handleFeatureFile}
                      single="true"
                      name="feature_icon"
                    />
                  </div>
                  <div>
                    <Form.Control
                      type="text"
                      placeholder="Nombre"
                      onChange={handleChangeFeature}
                      name="feature_name"
                    />
                    <Form.Control
                      type="text"
                      placeholder="Descripcion"
                      onChange={handleChangeFeature}
                      name="feature_description"
                    />
                  </div>
                </div>
              </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmitFeature}>Submit</Button>
        </Modal.Footer>
      </Modal>
  )
}
