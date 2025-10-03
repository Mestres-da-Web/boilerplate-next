import { useState } from 'react';
import { IoConstructSharp, IoFlashSharp, IoLogOut } from 'react-icons/io5';
import { usePathname } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';

import {
  LogoButton,
  LogoImg,
  LogoTextImg,
  LogoutButton,
  Nav,
  NavLink,
  NavLinkIcon,
  NavLinkText,
  NavbarContainer,
} from './styles';

const Navbar = () => {
  const { logout } = useAuth();

  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  return (
    <NavbarContainer>
      <LogoButton type="button" onClick={() => setExpanded(prev => !prev)}>
        imagem aqui
      </LogoButton>

      <Nav open={expanded}>
        <NavLink href="/home">
          <NavLinkIcon selected={pathname.startsWith('/home')}>
            <IoFlashSharp />
          </NavLinkIcon>
          <NavLinkText selected={pathname.startsWith('/home')}>
            Home
          </NavLinkText>
        </NavLink>

        <NavLink href="/live">
          <NavLinkIcon selected={pathname.startsWith('/live')}>
            <IoConstructSharp />
          </NavLinkIcon>
          <NavLinkText selected={pathname.startsWith('/live')}>
            Tela 2
          </NavLinkText>
        </NavLink>
      </Nav>

      <LogoutButton type="button" onClick={logout}>
        <IoLogOut />
        {expanded && 'Sair'}
      </LogoutButton>
    </NavbarContainer>
  );
};

export default Navbar;
