import React, { useEffect } from 'react'
import styled from 'styled-components'
import projectMask from 'Assets/Images/ProjectMask.png'
import { IProjectResume } from 'Utils/Types'
import * as allImages from 'Utils/importImages'
import { stringNormalize } from 'Utils/Functions'
import imagePlaceholder from 'Assets/Images/Logo.png'
import { useLanguage } from 'Contexts/LanguageContext'

type ImageKey = keyof typeof allImages;

const DescriptionContainer = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: calc(100% - 15px);
  overflow: hidden;
  position: relative;
  font-size: small;
  &:empty {
    display: none;
  }
`

const ResumeContainer = styled.div`
  padding: 10px;
  position: absolute;
  bottom: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  gap: 5px;

  & > p {
    text-shadow: 2px 2px 1px black;
    font-weight: bold;
    font-size: large;
    width: fit-content;
    max-width: 100%;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  max-width: 100%;
  width: 100%;
  max-height: 200px;
  position: relative;

  &.slim {
    max-height: 100px;
  }

  @media only screen and (max-width: 769px) {
    justify-content: center;
    max-height: none;
    &.slim {
      max-height: none;
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-mask-image: url(${projectMask});
  mask-image: url(${projectMask});
  mask-position: 0%;
  mask-size: 115%, 100%;
  opacity: .3;
  user-select: none;
  max-height: 100%;


  @media only screen and (max-width: 769px) {
    & {
      align-items: center;
      justify-content: center;
      -webkit-mask-image: none;
      mask-image: none;
    }
  }
`

const TechContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: row;
  flex-wrap: wrap;

  & > span {
    font-size: smaller;
    background: var(--second);
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid var(--third);
    display: flex;
    align-items: center;
  }
`

const BackgroundEffect = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;

  &::before {
    content: '';
    background: var(--second);
    margin: 2px 0 0 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
  }
`

const ProjectContainer = styled.div`
  width: 100%;
  height: 200px;
  display: grid;
  grid-template-columns: 2fr 4fr;
  position: relative;
  color: inherit;
  overflow: hidden;

  &.slim {
    height: 100px;
  }

  @media only screen and (max-width: 769px) {
    height: auto;
    min-height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &.slim {
      height: auto;
    }
  }

  img {
    width: fit-content;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    z-index: 1;
  }
`;

const ProjectResume = ({ data, type = 'portfolio' }: { data: IProjectResume, type?: 'projects' | 'portfolio' }) => {
  const { title, tags } = data;
  const { texts } = useLanguage();

  const image: ImageKey = stringNormalize(title) as ImageKey;
  let description = '';

  console.log(image);

  const descKey = type == 'portfolio' ? 'portfolioResumes' : 'projectResumes';
  description = texts[descKey] && texts[descKey][title as keyof typeof texts.portfolioResumes] as string || ``;

  return (
    <ProjectContainer key={title} className={'rgb-bg ' + (description.split(' ').length < 20 ? "slim" : "")}>
      <BackgroundEffect className='rgb-bg' />
      <InfoContainer className={description.split(' ').length < 20 ? "slim" : ""}>
        <ImageContainer>
          <img src={allImages[image] || imagePlaceholder} alt={title} />
        </ImageContainer>
        <ResumeContainer>
          <p>{title}</p>
          <TechContainer>
            {
              tags && tags.map(tag => <span>{tag}</span>)
            }
          </TechContainer>
        </ResumeContainer>
      </InfoContainer>
      <DescriptionContainer>
        {description.split('\n').map((line, index) => line.trim() != '' ? <p key={index}>{line}</p> : null)}
      </DescriptionContainer>
    </ProjectContainer>
  )
}

export default ProjectResume