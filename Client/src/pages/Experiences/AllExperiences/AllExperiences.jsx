import { useEffect, useState } from 'react';
import {Container, Row} from "react-bootstrap";
import { fetchData } from '../../../helpers/axiosHelper.js';
import { ExperiencePresentationCard } from '../../../components/ExperiencePresentationCard/ExperiencePresentationCard.jsx';

export const AllExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  

  useEffect(() => {
    const getExperiences = async () => {
      try {
        const res = await fetchData("api/experience/getAllExperiences", "get");
        console.log(res);
        setExperiences(res);
      } catch (error) {
        console.log(error);
      }
    } 
  
    getExperiences();
  }, []);
  
  return (
    <>
      <section className='mt-2'>
        <Container xxl className='pt-5'>
         { experiences.map((elem, index) => {
            return(
              <Row
                key={elem.experience_id}
                className='mt-2'
              >
                <ExperiencePresentationCard experience={elem} index={index}/>
              </Row>
            )
          }
          )}
        </Container>
      </section>
    </>
  )
}
