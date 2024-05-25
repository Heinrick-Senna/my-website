import { useQuery } from '@tanstack/react-query'
import { fetchProject } from 'Api/fetchProjects'
import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const ProjectTitle = styled.h1`
  width: 100%;
  font-size: 3rem;
  font-weight: bold;
  padding: 15px;
  border: solid 1px var(--fourth);
  border-top: none;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
`;

const IframeContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  
  iframe {
    width: 100%;
    aspect-ratio: 16/9;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  }
`;

const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;
  gap: 10px;

  img {
    max-width: 100%;
    height: auto;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
  }
`;

const DescriptionContainer = styled.div`
  display: flex;
  width: 100%;

  &.solo {
    justify-content: center;
  }

  p {
    padding: 15px;
  }
`;

const ProjectContainer = styled.div`
  display: flex;
  gap: 25px;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

const PortfolioView = () => {
  const { title } = useParams();
  const projectTitle = (title || '').replace(/[^a-zA-Z]/g, '');

  const { data } = useQuery({ queryKey: ['projects', projectTitle], queryFn: () => fetchProject(projectTitle), refetchOnMount: false })
  return (
    <ProjectContainer>
      <ProjectTitle>{title}</ProjectTitle>
      {
        data && 
        <DescriptionContainer className={!data['description'] ? 'solo' : ''}>
        {
          data['video'] 
          && 
          <IframeContainer >
              <iframe
                src={`https://www.youtube.com/embed/${data['video']}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
          </IframeContainer>
        }
        { data['description'] && <p> { data['description'] } </p> }
      </DescriptionContainer>
      }
      {
        data && data['images'] 
        &&
        <ImagesContainer>
          { data['images'].map((img:string) => <img src={img} alt="" /> ) }
        </ImagesContainer>
      }
     
    </ProjectContainer>
  )
}

export default PortfolioView