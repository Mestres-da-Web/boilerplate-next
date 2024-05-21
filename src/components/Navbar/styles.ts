import Link from 'next/link';
import styled, { css } from 'styled-components';

export const NavbarContainer = styled.div`
  height: 100%;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 4px 16px 0px #00000029;

  padding-top: min(6vh, 4.25rem);
  padding-bottom: 2.375rem;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const LogoButton = styled.button`
  border: none;
  background: transparent;

  display: flex;
  align-items: center;
`;

export const LogoImg = styled.img`
  height: 38px;
  object-fit: cover;
  object-position: center;
`;

interface LogoTextImgProps {
  open: boolean;
}

export const LogoTextImg = styled.img<LogoTextImgProps>`
  max-width: ${({ open }) => (open ? '202px' : '0px')};
  visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
  padding-left: ${({ open }) => (open ? '0.5rem' : '0')};
  overflow: hidden;

  height: 26px;
  object-fit: cover;
  object-position: center;

  transition: all 0.2s;
`;

export const NavLink = styled(Link)`
  position: relative;

  padding: 0 1rem;
  height: 3.5rem;
  width: 100%;

  display: flex;
  align-items: center;

  border-radius: 0.5rem;
  background: transparent;

  text-decoration: none;

  svg {
    font-size: 1.75rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  transition: all 0.2s;
`;

interface NavLinkProps {
  selected: boolean;
}

export const NavLinkIcon = styled.div<NavLinkProps>`
  position: relative;

  height: 35px;
  width: 35px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.5rem;
  background: ${({ selected, theme }) =>
    selected ? theme.colors.primary : 'transparent'};

  text-decoration: none;

  svg {
    font-size: 1.75rem;
    color: ${({ selected, theme }) =>
      selected ? theme.colors.white : theme.colors.primary};
  }

  transition: all 0.2s;

  &:focus,
  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};

    svg {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const NavLinkText = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.default};
  overflow: hidden;
  white-space: nowrap;
  transition: all 0.2s;
`;

interface NavProps {
  open: boolean;
}

export const Nav = styled.nav<NavProps>`
  margin-top: min(6vh, 6.625rem);

  width: fit-content;

  padding-left: 1.2rem;
  padding-right: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 0.875rem;

  ${({ open }) =>
    open
      ? css`
          ${NavLinkText} {
            padding-left: 0.5rem;
            visibility: visible;
            max-width: 15.625rem;
          }
        `
      : css`
          ${NavLinkText} {
            max-width: 0px;
            padding: 0;

            visibility: hidden;
          }
        `}
`;

export const LogoutButton = styled.button`
  border: none;
  background: transparent;

  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};

  svg {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
