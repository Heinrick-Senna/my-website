import Instagram from 'Assets/Images/Social/Instagram.png'
import Linkedin from 'Assets/Images/Social/Linkedin.png'
import Github from 'Assets/Images/Social/Github.png'
import Webstore from 'Assets/Images/Social/Webstore.png'
import Outlook from 'Assets/Images/Social/Outlook.png'
import Whatsapp from 'Assets/Images/Social/Whatsapp.png'
import LeetCode from 'Assets/Images/Social/LeetCode.png'
import Gmail from 'Assets/Images/Social/Gmail.png'
import styled from 'styled-components'

const List = styled.div`
  display: flex;
  align-items: center;
  list-style: none;
  gap: 20px;

  @media only screen and (min-width: 992px) {
    &:hover a:not(:hover) {
      filter: blur(4px);
    }
  }

  li {
    display: flex;
  }

  li a {
    display: flex;
    cursor:pointer;
    transition: 250ms ease;
  }

  li a img {
    max-height: 28px;
    transform: scale(1.15);
  }
`;

const ContactList = () => {
  return (
    <List role='Contact List'>

      <li>
        <a target='__blank' href='mailto:marcelohz198@gmail.com'>
          <img alt={"Gmail Icon"} src={Gmail} />
        </a>
      </li>

      <li>
        <a target='__blank' href='mailto:marcelohz198@hotmail.com'>
          <img alt={"Outlook Icon"} src={Outlook} />
        </a>
      </li>

      <li>
        <a target='__blank' href='https://wa.me/5511967240380'>
          <img alt={"Whatsapp Icon"} src={Whatsapp} />
        </a>
      </li>

      <li>
        <a target='__blank' href='https://github.com/Heinrick-Senna'>
          <img alt={"Github Icon"} src={Github} />
        </a>
      </li>

      <li>
        <a target='__blank' href='https://www.linkedin.com/in/marcelo-heinrick/'>
          <img alt={"Linkedin Icon"} src={Linkedin} />
        </a>
      </li>
      
      <li>
        <a target='__blank' href='https://leetcode.com/u/Heinrick-Senna/'>
          <img alt={"LeetCode Icon"} src={LeetCode} />
        </a>
      </li>

      <li>
        <a target='__blank' href='https://webstore.com.br/'>
          <img alt={"Webstore Icon"} src={Webstore} />
        </a>
      </li>





    </List>
  )
}

export default ContactList