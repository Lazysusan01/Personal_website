import styled from "styled-components";

export const Container = styled.section`
  padding: 4rem 4rem 12rem;
  display: flex;
  justify-content: center;

  .inner {
    text-align: center;
    max-width: 54rem;
  }

  h2 {
    font-size: clamp(3.2rem, 5vw, 5rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    margin-bottom: 1.6rem;
  }

  p {
    font-size: 1.7rem;
    color: var(--text-muted);
    line-height: 1.65;
    margin-bottom: 3.6rem;
  }

  .email-link {
    display: inline-block;
    font-size: 2rem;
    font-weight: 700;
    color: var(--green);
    letter-spacing: -0.01em;
    margin-bottom: 4rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.3rem;
      left: 0;
      width: 0;
      height: 1px;
      background: var(--green);
      transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }

  .socials {
    display: flex;
    justify-content: center;
    gap: 2.4rem;

    a {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      font-size: 1.4rem;
      font-weight: 500;
      color: var(--text-muted);
      transition: color 0.2s;

      &:hover {
        color: var(--text);
      }

      img {
        width: 17px;
        filter: invert(0.5);
        transition: filter 0.2s;
      }

      &:hover img {
        filter: invert(1);
      }
    }
  }
`;
