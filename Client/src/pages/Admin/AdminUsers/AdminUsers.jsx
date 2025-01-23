import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { fetchData } from "../../../helpers/axiosHelper.js";
import "./AdminUsers.css";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const fetchUsers = async (page) => {
    try {
      const response = await fetchData(
        `api/admin/getAllUsers?page=${page}&limit=15`,
        "get"
      );
      setUsers(response.users);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const handleToggleUser = async (user_id, isDeleted) => {
    try {
      const endpoint = isDeleted ? "enableUser" : "disableUser";
      const updatedUsers = await fetchData(`api/admin/${endpoint}`, "put", {
        id: user_id,
      });
      fetchUsers(currentPage);
    } catch (error) {
      console.error("Error al actualizar el estado del usuario:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section className="AdminUsers">
      <Container fluid="xxl">
        <h2 className="pt-4 text-center mb-4">Gestión de Usuarios</h2>
        <div className="table-responsive">
          <Table bordered hover className="mb-5 tablaAncho">
            <thead>
              <tr className="text-center">
                <th className="headTable">NOMBRE COMPLETO</th>
                <th className="headTable">EMAIL</th>
                <th className="headTable">ESTADO</th>
                <th className="headTable">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.user_id} className="text-center align-middle">
                  <td>{user.user_name} {user.user_lastname}</td>
                  <td>{user.user_email}</td>
                  <td>{user.user_is_deleted ? "Deshabilitado" : "Habilitado"}</td>
                  <td>
                    <Button
                      variant={user.user_is_deleted ? "success" : "danger"}
                      onClick={() => handleToggleUser(user.user_id, user.user_is_deleted)}
                    >
                      {user.user_is_deleted ? "Habilitar" : "Deshabilitar"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <div className="mb-5 gap-4 d-flex justify-content-center align-items-center">
            {totalPages > 1 && (
              <>
                <Button
                  className="btnPage"
                  variant="outline-secondary"
                  disabled={currentPage === 1}
                  onClick={handlePreviousPage}
                >
                  Anterior
                </Button>
                <span className="text-black">
                  Página {currentPage} de {totalPages}
                </span>
                <Button
                  className="btnPage"
                  variant="outline-secondary"
                  disabled={currentPage === totalPages}
                  onClick={handleNextPage}
                >
                  Siguiente
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};
