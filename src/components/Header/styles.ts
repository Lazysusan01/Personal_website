import styled from "styled-components";

export const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 7rem;
  padding: 0 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(13, 13, 13, 0.8);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);

  .logo {
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--text);

    span {
      color: var(--green);
    }
  }

  nav {
    display: flex;
    align-items: center;
    gap: 3.6rem;

    a {
      font-size: 1.4rem;
      font-weight: 500;
      color: var(--text-muted);
      letter-spacing: 0.02em;
      transition: color 0.2s;

      &:hover {
        color: var(--text);
      }
    }

    .cv-link {
      color: var(--green);
      font-weight: 700;

      &:hover {
        color: var(--text);
      }
    }
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;

    span {
      display: block;
      width: 22px;
      height: 2px;
      background: var(--text);
      border-radius: 2px;
      transition: transform 0.3s ease, opacity 0.3s ease;
    }

    &.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    &.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    &.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  }

  @media (max-width: 768px) {
    padding: 0 2.4rem;

    .hamburger {
      display: flex;
    }

    nav {
      position: fixed;
      top: 7rem;
      left: 0;
      right: 0;
      background: rgba(13, 13, 13, 0.97);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      flex-direction: column;
      padding: 3rem 2.4rem;
      gap: 2.4rem;
      transform: translateY(-110%);
      opacity: 0;
      pointer-events: none;
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                  opacity 0.3s ease;

      &.open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: all;
      }

      a {
        font-size: 1.8rem;
      }
    }
  }
`;
