import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchData } from '../../../helpers/axiosHelper';

export const OneExperience = () => {
  const [experienceInfo, setExperienceInfo] = useState({});
  const {id} = useParams();

   useEffect(() => {
     const getExperience = async () => {
      try {
        const res = await fetchData(`api/experience/getOneExperience/${id}`, "get");
        console.log(res);
      } catch (error) {
        console.log(error);
      }
     }
   
     getExperience();
   }, [])
   
  return (
    <div>OneExperience</div>
  )
}
