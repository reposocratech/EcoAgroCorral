import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap'

const featureInitialValue = {
  feature_name: "",
  feature_description: "",
  feature_icon: ""
}

export const CreateFeatureModal = ({show, handleClose, features, setFeatures}) => {
  const [feature, setFeature] = useState(featureInitialValue);

  const handleChangeFeature = (e) => {
    const {name, value} = e.target;
    setFeature({...feature, [name]: value});
  }

  const handleFeatureFile = (e) => {
    setFeature({...feature, feature_icon : e.target.files[0]});
  }

  const onSubmitFeature = () => {
    setFeatures ([...features, feature]);
    handleClose();
  }

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
