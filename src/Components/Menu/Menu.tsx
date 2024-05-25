import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LanguageFlags from 'Components/LanguageFlags/LanguageFlags';
import { Link } from 'react-router-dom';

const MenuContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: absolute;
  top: 20px;
  padding: 0 50px;
  z-index: 2;
`

const CustomMenu = styled.ul`
  position: relative;
  display: flex;
  width: fit-content;
  gap: 10px;
  padding: 0;
`;

const CustomMenuItem = styled.li`
  padding: 5px 10px;
  background: var(--fourth);
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  transition: transform 300ms ease;
  user-select: none;

  &:hover {
    transform: translateY(10%);

    & > a {
      color: var(--main);
    }
  }

  &.Active {
    cursor: default;
    transform: translateY(75%);

    & > a {
      color: var(--main);
    }
  }

  & > a {
    text-decoration: none;
    color: inherit;
  }
`

const MenuComponent = () => {
  const menuObj = {
    'About': '/',
    'Portfolio': '/portfolio',
    'Projects': '/projects',
    'Contact': '/contact'
  };

  const [activeMenu, setActiveMenu] = useState<string>('');

  useEffect(() => {
    Object.entries(menuObj).map(([key, value]) => {
      if (window.location.pathname === value) setActiveMenu(value);
    });
  }, []);

  return (
    <MenuContainer>
      <CustomMenu role='Menu'>
        {
          Object.entries(menuObj).map(([key, value]) => (
            <CustomMenuItem
              key={value}
              className={`Menu_Item ${activeMenu === value ? 'Active' : ''}`}
            >
              <Link 
                to={value} 
                onClick={() => setActiveMenu(value)}
              >{key}</Link>
            </CustomMenuItem>
          ))
        }
      </CustomMenu>
      <LanguageFlags />
    </MenuContainer>
  )
}

export default MenuComponent