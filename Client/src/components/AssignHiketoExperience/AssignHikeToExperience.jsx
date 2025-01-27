import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { fetchData } from '../../helpers/axiosHelper';

export const AssignHikeToExperience = ({expId, hikes, otherHikes, getExperience}) => {
  const [toAssign, setToAssign] = useState();
  const [toUnassign, setToUnassign] = useState();

  const handleAssignedChange = (e) => {
    setToUnassign(e.target.value);
  }

  const handleUnassignedChange = (e) => {
    setToAssign(e.target.value);
  }

  const handleAssignHike = async () => {
    if(toAssign){
      try {
        await fetchData(`api/experience/assignHike/${expId}`, "post", {hikeId :toAssign});
        getExperience();
      } catch (error) {
        console.log(error);
      }
    }

  }

  const handleRemoveHike = async () => {
    if(toUnassign){
      try {
        await fetchData(`api/experience/unassignHike/${expId}`, "delete", {hikeId :toUnassign});
        getExperience();
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="">
      <div className="mb-3 d-flex justify-content-around align-items-center">
        {/* Lado izquierdo: experiencias no asignadas */}
        <div className="d-flex flex-column justify-content-center align-items-center gap-2">
          <Form.Label>Paseos por asignar</Form.Label>
          <select
            id="unassignedHikes"
            size={5}
            onChange={handleUnassignedChange}
          >
            {otherHikes.length > 0 ? (
              otherHikes.map((hike) => (
                <option key={hike.hike_id} value={hike.hike_id}>
                  {hike.hike_title}
                </option>
              ))
            ) : (
              <option disabled>No hay paseos</option>
            )}
          </select>
          {toAssign ? <Button
              onClick={handleAssignHike}
              className="mx-2 button-primary"
            >
              Añadir
            </Button>
            :
            <p>Selecciona un paseo</p>
          }
        </div>

        {/* Lado derecho: experiencias asignadas */}
        <div className="d-flex flex-column jusfy-content-center align-items-center gap-2">
          <Form.Label>Paseos asignados</Form.Label>
          <select  
            id="assignedHikes" 
            size={5}
            onChange={handleAssignedChange}
          >
            {hikes.length > 0 ? (
              hikes.map((hike) => (
                <option key={hike.hike_id} value={hike.hike_id}>
                  {hike.title}
                </option>
              ))
            ) : (
              <option disabled>No hay paseos</option>
            )}
          </select>
          {toUnassign ?<Button
              onClick={handleRemoveHike}
              className="mx-2 delete"
            >
              Quitar
            </Button>
            : 
            <p>Selecciona un paseo</p>
          }         
        </div>
      </div>
    </div>
  )
}
