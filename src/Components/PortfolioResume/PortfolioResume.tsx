import IProjectResume from 'Components/Utils/Type';
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const ResumeContainer = styled.div`
  padding: 15px 10px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  position: relative;
  z-index: 2;
  position: absolute;
  bottom: 0;

  & > p {
    font-weight: bold;
    width: fit-content;
  }
`;

const TechnologyContainer = styled.div`
  display: flex;
  gap: 15px;
`;

const TechnologyTag = styled.span`
  padding: 5px;
  border-radius: 10px;
  font-size: .8rem;
  font-weight: bold;
  background: var(--main);
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
`;

const ProjectContainer = styled(Link)`
  width: 30%;
  aspect-ratio: 16/9;
  cursor: pointer;
  position: relative;
  color: inherit;

  & > img {
    width: auto;
    max-width: auto;
    max-height: 100%;
    box-shadow: 2px 2px 10px var(--shadow);
    transition: 250ms ease;
    z-index: 1;
  }
  
  &:hover {
    & > img {
      box-shadow: none;
    }
  }
`;

const PortfolioResume = ({ data }:{ data:IProjectResume }) => {
  const { title, tags } = data;
  const imageKey = title.replace(/[^a-zA-Z]/g, '');

  return (
    <>
      <ProjectContainer key={title} to={`/project/${title}`}>
        <img src={imageKey} alt="" />
        <ResumeContainer>
          <p>{title}</p>
          <TechnologyContainer>
            { tags.map(tag => <TechnologyTag>{tag}</TechnologyTag>) }
          </TechnologyContainer>
        </ResumeContainer>
      </ProjectContainer>
    </>
  )
}

export default PortfolioResume