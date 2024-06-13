import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LanguageFlags from 'Components/LanguageFlags/LanguageFlags';
import { Link } from 'react-router-dom';
import ContactList from 'Components/ContactList/ContactList';
import menuObject from 'Utils/Menu.json'

const MenuContainer = styled.div`
  justify-content: flex-start;
  gap: 20px;
  width: 100%;
  position: absolute;
  top: 20px;
  padding: 0 50px;
  z-index: 2;
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  width: 100%;

  @media only screen and (max-width: 993px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 0 20px;
  }
`

const CustomMenu = styled.ul`
  position: relative;
  display: flex;
  width: fit-content;
  gap: 10px;
  padding: 0;
`;

const CustomMenuItem = styled.li`
  position: relative;
  cursor: pointer;
  transition: transform 300ms ease;
  user-select: none;
  display: flex;
  border-radius: 5px;
  background: var(--main);

  &:hover {
    transform: translateY(10%);
  }

  &.Active {
    cursor: default;

    @media only screen and (min-width: 992px) {
      transform: translateY(calc(100% + 5px));
    }

    & > a {
      cursor: default;
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
      &::after {
        opacity: 0;
        transition: opacity 400ms ease-in;
      }
    }
  }

  & > a {
    padding: 5px 10px;
    border-radius: 5px;
    text-decoration: none;
    color: inherit;
    font-size: 1.2rem;
    font-weight: 900;
    transition: color 300ms ease;
  }

  & > a::after {
    padding: 5px 10px;
    border-radius: 5px;
    content: attr(data-text);
    background: var(--main);
    position: absolute;
    left: -1px;
    top: -1px;
  }
`

const MenuComponent = () => {
  const [activeMenu, setActiveMenu] = useState<string>('');

  useEffect(() => {
    Object.entries(menuObject).map(([key, value]) => {
      if (window.location.pathname === value) setActiveMenu(value);
    });
  }, []);

  return (
    <MenuContainer>
      <CustomMenu role='Menu'>
        {
          Object.entries(menuObject).map(([key, value]) => (
            <CustomMenuItem
              key={value}
              className={`Menu_Item ${activeMenu === value ? 'Active' : ''}`}
            >
              <Link
                to={value} 
                className='rgb-bg'
                onClick={() => setActiveMenu(value)}
                data-text={key}
              >{key}</Link>
            </CustomMenuItem>
          ))
        }
      </CustomMenu>
      <ContactList />
      <LanguageFlags />
    </MenuContainer>
  )
}

export default MenuComponent