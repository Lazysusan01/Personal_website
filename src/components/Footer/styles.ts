import styled from "styled-components";

export const Container = styled.footer`
  padding: 2.8rem 5rem;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;

  p, a {
    font-size: 1.3rem;
    color: var(--text-muted);
  }

  a {
    transition: color 0.2s;

    &:hover {
      color: var(--text);
    }
  }

  @media (max-width: 640px) {
    padding: 2.4rem;
    flex-direction: column;
    gap: 0.8rem;
    text-align: center;
  }
`;
