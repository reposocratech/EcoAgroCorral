import { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { fetchData } from "../../../helpers/axiosHelper.js";
import "./AdminUsers.css"

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchData("api/admin/getAllUsers", "get");
        const filteredUsers = response.filter(user => user.user_type === 0);

        setUsers(filteredUsers);
      } 
      catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleToggleUser = async (user_id, isDeleted) => {
    try {
      const endpoint = isDeleted ? "enableUser" : "disableUser";
      const updatedUsers = await fetchData(`api/admin/${endpoint}`, "put", { id: user_id });
      const filteredUsers = updatedUsers.filter(user => user.user_type === 0);

      setUsers(filteredUsers);
    } 
    catch (error) {
      console.error("Error al actualizar el estado del usuario:", error);
    }
  };

  return (
    <section className="AdminUsers">
      <Container>
          <h2 className="pt-4 text-center mb-4">Gestión de Usuarios</h2>
        <Table bordered hover>
          <thead>
            <tr className="text-center">
              <th className="headTable">NOMBRE</th>
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
      </Container>
    </section>
  );
};
