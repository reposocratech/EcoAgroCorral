import  { useState, useEffect } from "react";
import { Table, Button, Form, Container } from "react-bootstrap";

export const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Obtener todas las categorías
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/post/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.error("Error fetching categories:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Crear una nueva categoría
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/post/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category_name: newCategoryName }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Category created:", result);
        setNewCategoryName(""); // Limpiar el input
        fetchCategories(); // Actualizar la lista de categorías
      } else {
        const errorResult = await response.json();
        console.error("Error creating category:", errorResult);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  // Eliminar una categoría
  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}api/post/categories/${categoryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Category deleted successfully");
        fetchCategories(); // Actualizar la lista de categorías
      } else {
        const errorResult = await response.json();
        console.error("Error deleting category:", errorResult);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  useEffect(() => {
    fetchCategories(); // Cargar las categorías al inicio
  }, []);

  return (
    <Container>
      <h2 className="my-4">Administrar Categorías</h2>
      {/* Formulario para crear categorías */}
      <Form onSubmit={handleCreateCategory} className="mb-4">
        <div className="d-flex gap-1">
          <Form.Group className="mb-3" controlId="newCategoryName">
            
            <Form.Control
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Escribe el nombre de la categoría"
              required
            />
          </Form.Group>
          <div><Button type="submit">Crear Categoría</Button></div>
        </div>
      </Form>

      {/* Tabla de categorías */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre de la Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr key={category.category_id}>
                <td>{index + 1}</td>
                <td>{category.category_name}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteCategory(category.category_id)}
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
    </Container>
  );
};
