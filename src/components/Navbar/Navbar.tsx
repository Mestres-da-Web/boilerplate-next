import {
  IoConstructSharp,
  IoFlashSharp,
  IoLockClosed,
  IoLogOut,
  IoVideocam,
} from 'react-icons/io5';
import { useState } from 'react';
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
        <LogoImg src="/img/logo_icon.svg" alt="logo" />
        <LogoTextImg src="/img/logo_text.svg" alt="predial" open={expanded} />
      </LogoButton>

      <Nav open={expanded}>
        <NavLink href="/home">
          <NavLinkIcon selected={pathname.startsWith('/home')}>
            <IoFlashSharp />
          </NavLinkIcon>
          <NavLinkText selected={pathname.startsWith('/home')}>
            Eventos do dia
          </NavLinkText>
        </NavLink>

        <NavLink href="/live">
          <NavLinkIcon selected={pathname.startsWith('/live')}>
            <IoVideocam />
          </NavLinkIcon>
          <NavLinkText selected={pathname.startsWith('/live')}>
            Ao vivo
          </NavLinkText>
        </NavLink>

        <NavLink href="/terms">
          <NavLinkIcon selected={pathname.startsWith('/terms')}>
            <IoLockClosed />
          </NavLinkIcon>
          <NavLinkText selected={pathname.startsWith('/terms')}>
            Termos de uso
          </NavLinkText>
        </NavLink>

        <NavLink href="/config">
          <NavLinkIcon selected={pathname.startsWith('/config')}>
            <IoConstructSharp />
          </NavLinkIcon>
          <NavLinkText selected={pathname.startsWith('/config')}>
            Configurações
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
