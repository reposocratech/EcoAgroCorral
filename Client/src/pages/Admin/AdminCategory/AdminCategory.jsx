import { useEffect, useState } from "react";
import { Container, Table, Button, Form, Modal } from "react-bootstrap";
import { fetchData } from "../../../helpers/axiosHelper.js";
import "./AdminCategory.css";

export const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetchData("api/post/categories", "get");
      setCategories(response);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      await fetchData("api/post/categories", "post", { category_name: newCategoryName });
      setNewCategoryName("");
      fetchCategories();
    } catch (error) {
      console.error("Error al crear la categoría:", error);
    }
  };

  const handleShowModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setShowModal(true);
  };

  const handleDeleteCategory = async () => {
    try {
      await fetchData(`api/post/categories/${selectedCategoryId}`, "delete");
      fetchCategories();
      setShowModal(false);
      setSelectedCategoryId(null);
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategoryId(null);
  };

  return (
    <section className="AdminCategory">
      <Container fluid = "xxl">
        <h2 className="pt-5 text-center mb-3">Gestión de Categorías</h2>

        <div className="d-flex justify-content-center align-content-center">
          <Form onSubmit={handleCreateCategory} className="mb-4">
            <div className="d-flex gap-2">
              <Form.Group controlId="newCategoryName">
                <Form.Control
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Escribe el nombre de la categoría"
                  required
                />
              </Form.Group>
              <Button type="submit" variant="outline-success">Crear Categoría</Button>
            </div>
          </Form>
        </div>

        <div className="table-responsive">
          <Table bordered hover className="mb-5 tablaAncho">
            <thead>
              <tr className="text-center">
              <th className="headTable">#</th>
              <th className="headTable">Nombre de la Categoría</th>
              <th className="headTable">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={category.category_id} className="text-center align-middle">
                    <td>{index + 1}</td>
                    <td>{category.category_name}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleShowModal(category.category_id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No hay categorías disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title className="tituloModal">Confirmar Eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-center">
              ¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.
            </p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
            <Button variant="danger" onClick={handleDeleteCategory}>
              Eliminar Categoría
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
};