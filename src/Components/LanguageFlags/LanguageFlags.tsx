import BR from 'Assets/Images/Flags/BR.webp';
import US from 'Assets/Images/Flags/US.webp';
import ES from 'Assets/Images/Flags/ES.webp';
import RU from 'Assets/Images/Flags/RU.webp';
import styled from 'styled-components';
import { useLanguage } from 'Contexts/LanguageContext';

const FlagsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    cursor: pointer;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    width: 35px;
    height: fit-content;
    transition: transform 250ms ease;

    &.active {
      transform: translateY(100%);
    }
  }

  img.active {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const LanguageFlags = () => {
  const { switchLanguage, language } = useLanguage();

  return (
    <FlagsContainer>
      <img src={BR} className={language == 'pt' ? 'active' : ''} alt="" onClick={() => {switchLanguage('pt')} } />
      <img src={US} className={language == 'en' ? 'active' : ''} alt="" onClick={() => {switchLanguage('en')} } />
      <img src={ES} className={language == 'es' ? 'active' : ''} alt="" onClick={() => {switchLanguage('es')} } />
    </FlagsContainer>
  )
}

export default LanguageFlags