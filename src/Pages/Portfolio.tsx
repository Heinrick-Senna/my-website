import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from 'Api/fetchProjects';
import ProjectResume from 'Components/ProjectResume/ProjectResume';
import styled from 'styled-components'

const ProjectGrid = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 5%;
  row-gap: 40px;
  height: auto;
  padding: 20px 0;
  
  @media only screen and (max-width: 1201px) { 
    padding: 20px;
  }
`

const Portfolio = () => {
  const { data } = useQuery({ queryKey: ['portfolio'], queryFn: () => fetchProjects('portfolio'), refetchOnMount: false })

  return (
    <>
      <ProjectGrid>
        {
          data && data.map(project => <ProjectResume data={project} /> )
        }
      </ProjectGrid>
    </>
  )
}

export default Portfolio