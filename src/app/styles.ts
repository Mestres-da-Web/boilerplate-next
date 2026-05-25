import styled from 'styled-components';

export const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
`;

/* ── Left panel: light blue with brand logo ──────────────────────── */
export const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #b8dde7;
  min-height: 100vh;

  img {
    max-width: 320px;
    width: 80%;
    height: auto;
  }
`;

/* ── Right panel: white with login form ──────────────────────────── */
export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  min-height: 100vh;
`;
