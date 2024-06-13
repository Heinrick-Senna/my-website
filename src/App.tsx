import React, { ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from 'Contexts/LanguageContext';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import Menu from 'Components/Menu/Menu';
import * as Pages from './Pages';
import Logo from 'Assets/Images/Logo.png';

interface MotionDivProps {
  children: ReactNode;
  firstLoad: boolean;
}

const BackgroundEffect = styled.div`
  width: calc(100% - 74px);
  height: calc(100vh - 94px);
  top: -3px;
  left: -3px;
  margin: 60px 40px 40px;
  position: absolute;
  border-radius: 8px;
  transform: translateZ(-1px) scaleY(0) scaleX(0);
  animation: grow 2s forwards ease-in-out, rgb 6s linear 2s infinite;;
  

  @media only screen and (max-width: 993px) {
    margin: 198px 40px 40px;
    height: calc(100vh - 222px);
    position: absolute;
  }

  @keyframes grow {
    0% {
      transform: translateZ(-1px) scaleY(0) scaleX(0);
    }
    50% {
      transform: translateZ(-1px) scaleY(1) scaleX(0);
    }
    to {
      transform: translateZ(-1px) scaleY(1) scaleX(1);
    }
  }
`

const MainView = styled.main`
  width: calc(100% - 80px);
  height: calc(100vh - 100px);
  margin: 60px 40px 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: var(--main);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: .1;
    background-image: url(${Logo});
    background-repeat: no-repeat;
    background-position: center;
  }

  @media only screen and (max-width: 993px) {
    margin: 198px 40px 40px;
    height: calc(100vh - 228px);
    position: absolute;
    top: 0;
  }
`

const StyledMotion = styled(motion.div)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: overlay;
  width: 100%;
  position: relative;

  & > div {
    width: 100%;
    max-width: 100%;
    height: calc(100% - 20px);
  }
  
  @media only screen and (min-width: 768px) {
    & > div {
      width: 720px;
      max-width: 720px;
    }
    & > div > * {
      flex-wrap: wrap;
    }
  }
  
  @media only screen and (min-width: 992px) {
    & > div {
      width: 960px;
      max-width: 960px;
      height: 100%;
    }
  }
  
  @media only screen and (min-width: 1200px) {
    & > div {
      width: 1140px;
      max-width: 1140px;
    }
  }

`;

const MotionDiv: React.FC<MotionDivProps> = ({ children, firstLoad }) => {
  return (
    <StyledMotion
      initial={{ top: '50%', opacity: 0 }}
      animate={{ top: '0%', opacity: 1 }}
      transition={{ delay: firstLoad ? 2 : 0 }}
      exit={{ top: '-50%', opacity: 0 }}
    >
      {children}
    </StyledMotion>
  );
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route
          path="*"
          element={
            <MotionDiv firstLoad={isFirstLoad} >
              <div>
                <Pages.About />
              </div>
            </MotionDiv>
          }
        />
        <Route
          path="/portfolio"
          element={
            <MotionDiv firstLoad={isFirstLoad} >
              <div
                style={{
                  position: 'absolute',
                  top: '0'
                }}
              >
                <Pages.Portfolio />
              </div>
            </MotionDiv>
          }
        />
        <Route
          path="/projects"
          element={
            <MotionDiv firstLoad={isFirstLoad} >
              <div
                style={{
                  position: 'absolute',
                  top: '0'
                }}
              >
                <Pages.Projects />
              </div>
            </MotionDiv>
          }
        />
      </Routes>
    </>
  );
}

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AnimatePresence mode='wait'>
            <Menu />
            <BackgroundEffect className='rgb-bg' />
            <MainView>
              <AnimatedRoutes />
            </MainView>
          </AnimatePresence>
        </LanguageProvider>
      </QueryClientProvider>
    </BrowserRouter >
  );
}

export default App;
