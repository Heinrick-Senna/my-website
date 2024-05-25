import React, { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Menu from 'Components/Menu/Menu';
import * as Pages from './Pages';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from 'Contexts/LanguageContext';

interface MotionDivProps {
  children: ReactNode;
}

const MainView = styled.main`
  width: calc(100% - 80px);
  height: calc(100vh - 100px);
  padding: 20px;
  margin: 60px 40px 40px;
  border-radius: 5px;
  border: 1px solid var(--fourth);
  overflow: overlay;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`

const StyledMotion = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  transform: translate(-50%, 0);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (min-width: 576px) {
    & {
      width: auto;
      max-width: none;
    }
  }
  
  @media only screen and (min-width: 768px) {
    & {
      width: 720px;
      max-width: 720px;
    }
  }
  
  @media only screen and (min-width: 992px) {
    & {
      width: 960px;
      max-width: 960px;
    }
  }
  
  @media only screen and (min-width: 1200px) {
    & {
      width: 1140px;
      max-width: 1140px;
    }
  }

`;

const MotionDiv: React.FC<MotionDivProps> = ({ children }) => (
  <StyledMotion
    className='container'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </StyledMotion>
);

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <MotionDiv>
              <Pages.About />
            </MotionDiv>
          }
        />
        <Route
          path="/portfolio"
          element={
            <MotionDiv>
              <Pages.Portfolio />
            </MotionDiv>
          }
        />
        <Route
          path="/projects"
          element={
            <MotionDiv>
              <Pages.Projects />
            </MotionDiv>
          }
        />
        <Route
          path="/project/:title"
          element={
            <MotionDiv>
              <Pages.PortfolioView />
            </MotionDiv>
          }
        />
        <Route
          path="/contact"
          element={
            <MotionDiv>
              <Pages.Contact />
            </MotionDiv>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <Menu />
          <MainView>
            <AnimatedRoutes />
          </MainView>
        </LanguageProvider>
      </QueryClientProvider>
    </BrowserRouter >
  );
}

export default App;
