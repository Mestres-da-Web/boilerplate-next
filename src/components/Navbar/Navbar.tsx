'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  return (
    <NavbarContainer>
      <LogoButton type="button" onClick={() => setExpanded(prev => !prev)}>
        <LogoImg src="/img/logo_icon.svg" alt="logo" />
        <LogoTextImg src="/img/logo_text.svg" alt="predial" open={expanded} />
      </LogoButton>

      <Nav open={expanded}>
        <NavLink href="/users">
          <NavLinkIcon selected={pathname.startsWith('/users')} />
          <NavLinkText>Usuários</NavLinkText>
        </NavLink>

        <NavLink href="/fields">
          <NavLinkIcon selected={pathname.startsWith('/fields')} />
          <NavLinkText>Campos cadastro</NavLinkText>
        </NavLink>

        <NavLink href="/plans">
          <NavLinkIcon selected={pathname.startsWith('/plans')} />
          <NavLinkText>Faturamento</NavLinkText>
        </NavLink>

        <NavLink href="/dashboard">
          <NavLinkIcon selected={pathname.startsWith('/dashboard')} />
          <NavLinkText>Dashboard</NavLinkText>
        </NavLink>

        <NavLink href="/terms">
          <NavLinkIcon selected={pathname.startsWith('/terms')} />
          <NavLinkText>Termos de uso</NavLinkText>
        </NavLink>

        <NavLink href="/config">
          <NavLinkIcon selected={pathname.startsWith('/config')} />
          <NavLinkText>Configurações</NavLinkText>
        </NavLink>
      </Nav>

      <LogoutButton type="button">{expanded && 'Sair'}</LogoutButton>
    </NavbarContainer>
  );
};

export default Navbar;
