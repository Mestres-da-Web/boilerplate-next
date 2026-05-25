'use client';

import { useState } from 'react';
import { IoLogOutOutline } from 'react-icons/io5';

import { usePathname } from 'next/navigation';

import { useAuth } from '@/hooks/useAuth';
import ConfirmModal from '@/components/Modal/ConfirmModal';

import {
  LogoArea,
  LogoMark,
  LogoutButton,
  Nav,
  NavLink,
  NavInnerCard,
  NavbarContainer,
} from './styles';

const navItems = [
  { href: '/pacientes', label: 'Pacientes' },
  { href: '/autorizacoes', label: 'Autorizações' },
  { href: '/operacional', label: 'Operacional' },
  { href: '/planos-de-saude', label: 'Planos de saúde' },
  { href: '/financeiro', label: 'Financeiro' },
  { href: '/empresas', label: 'Empresas' },
  { href: '/configuracoes', label: 'Configurações' },
];

const Navbar = () => {
  const { logout } = useAuth();
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <NavbarContainer>
        <NavInnerCard>
          <LogoArea>
            <LogoMark>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/heart-logo.svg" alt="Estímulos" />
            </LogoMark>
          </LogoArea>

          <Nav>
            {navItems.map(item => (
              <NavLink
                key={item.href}
                href={item.href}
                $selected={pathname.startsWith(item.href)}
              >
                {item.label}
              </NavLink>
            ))}
          </Nav>

          <LogoutButton
            type="button"
            onClick={() => setShowLogoutModal(true)}
            title="Sair"
          >
            <IoLogOutOutline />
            <span>Sair</span>
          </LogoutButton>
        </NavInnerCard>
      </NavbarContainer>

      <ConfirmModal
        isOpen={showLogoutModal}
        title="Sair?"
        message="Caso saia, precisará fazer login novamente para acessar suas informações. Tem certeza que deseja sair?"
        confirmLabel="Sair"
        confirmVariant="danger"
        onConfirm={() => {
          setShowLogoutModal(false);
          logout();
        }}
        onCancel={() => setShowLogoutModal(false)}
      />
    </>
  );
};

export default Navbar;
