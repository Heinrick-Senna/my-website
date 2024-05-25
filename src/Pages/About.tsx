import Profile from 'Assets/Images/Profile.jpg'
import { useLanguage } from 'Contexts/LanguageContext';
import styled from 'styled-components'


const SkillsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px 7px;
  position: relative;
  border-bottom: 1px solid var(--fourth);
  padding-bottom: 10px;
  user-select: none;

  &::before {
    content: attr(data-role);
    background: var(--fourth);
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 5px 10px;
    border-radius: 5px;
    bottom: 100%;
  }

  span {
    background: var(--second);
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid black;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const AboutMeContainer = styled.div`
  display: flex;
  justify-content: ;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 15px;

  div {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  img {
    width: fit-content;
    height: fit-content;
    max-width: 100%;
    max-height: 350px;
    box-shadow: 2px 2px 10px var(--shadow);
  }
`;

const About = () => {
  const { texts } = useLanguage();

  return (
    <MainContainer>
      <AboutMeContainer className='container'>
        <img src={Profile} alt="" />
        <div>
          {
            texts['About Me']
            &&
            texts['About Me'].split('\n').map((line, index) => <p key={index}>{line}</p>)
          }
        </div>
      </AboutMeContainer>

      <SkillsContainer data-role="Back-end"> 
        <span>Node.js</span>
        <span>Puppeteer.js</span>
        <span>Express.js</span>
        <span>AWS</span>
        <span>Nest.js</span>
        <span>Microservices</span>
        <span>Serverless</span>
        <span>GraphQL</span>
        <span>API REST</span>
        <span>Strapi CMS</span>
        <span>GitHub</span>
        <span>Linux & WSL2</span>
        <span>NPM & YARN</span>
      </SkillsContainer>

      <SkillsContainer data-role="Front-end"> 
        <span>Electron.js</span>
        <span>React.js</span>
        <span>Redux</span>
        <span>Next.js</span>
        <span>SPA</span>
        <span>MicroFrontEnd</span>
        <span>HTML</span>
        <span>CSS</span>
        <span>JavaScript</span>
        <span>TypeScript</span>
        <span>SEO & Leads Conversion</span>
        <span>Fetch/Axios</span>
        <span>Jquery</span>
      </SkillsContainer>

      <SkillsContainer data-role="Database"> 
        <span>mySQL</span>
        <span>PostgreSQL</span>
        <span>Prisma</span>
        <span>Supabase</span>
        <span>TypeORM</span>
      </SkillsContainer>

      <SkillsContainer data-role="Design UI|UX">
        <span>Photoshop CS6</span>
        <span>Figma</span>
        <span>Miro</span>
      </SkillsContainer>

    </MainContainer>
  )
}

export default About