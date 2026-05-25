import Link from 'next/link';
import styled from 'styled-components';

/* ── Outer wrapper: polka-dot background image ─────────────────────── */
export const NavbarContainer = styled.header`
  width: 100%;
  flex-shrink: 0;
  padding: 0.75rem 1.5rem;

  background: url('/navbar-bg.png') center / cover no-repeat;
`;

/* ── Inner white card with rounded borders ─────────────────────────── */
export const NavInnerCard = styled.div`
  width: 100%;
  height: 48px;

  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  gap: 1.75rem;

  background: #fff;
  border-radius: 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
`;

/* ── Logo ──────────────────────────────────────────────────────────── */
export const LogoArea = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

export const LogoMark = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

/* ── Nav links row ─────────────────────────────────────────────────── */
export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
`;

interface SelectedProps {
  $selected?: boolean;
}

export const NavLink = styled(Link)<SelectedProps>`
  padding: 0.45rem 0.75rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.8125rem;
  font-weight: ${({ $selected }) => ($selected ? 600 : 500)};
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary : '#777'};
  white-space: nowrap;
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

/* Not used in horizontal layout but kept for TS compat */
export const NavLinkIcon = styled.div<SelectedProps>`
  display: none;
`;

export const NavLinkText = styled.span<SelectedProps>``;

/* ── Logout button ─────────────────────────────────────────────────── */
export const LogoutButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  margin-left: auto;

  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.75rem;
  border-radius: 6px;

  font-size: 0.8125rem;
  font-weight: 500;
  color: #777;
  white-space: nowrap;

  transition: color 0.15s;

  &:hover {
    color: #333;
  }

  svg {
    font-size: 1rem;
  }
`;

/* Legacy exports */
export const LogoButton = LogoArea;
export const LogoImg = styled.img``;
export const LogoTextImg = styled.img``;
export const LogoText = styled.span``;
