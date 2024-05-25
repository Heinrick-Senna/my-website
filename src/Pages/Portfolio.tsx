import { useQuery } from '@tanstack/react-query';
import { fetchProjectsResumes } from 'Api/fetchProjects';
import PortfolioResume from 'Components/PortfolioResume/PortfolioResume'
import styled from 'styled-components'

const ProjectGrid = styled.div`
  display: flex;
  column-gap: 5%;
  row-gap: 20px;
  flex-wrap: wrap;
  margin-top: 100px;
  padding-bottom: 30px;
  position: relative;
  z-index: 1;
`

const Portfolio = () => {
  const { data } = useQuery({ queryKey: ['projects'], queryFn: fetchProjectsResumes, refetchOnMount: false })

  return (
    <>
      <ProjectGrid>
        {
          data && data.map(project => <PortfolioResume data={project}/> )
        }
      </ProjectGrid>
    </>
  )
}

export default Portfolio