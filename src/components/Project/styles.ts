import styled from "styled-components";

export const Container = styled.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 0 4rem 10rem;

  .section-heading {
    font-size: clamp(3.2rem, 5vw, 5rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    margin-bottom: 5rem;
    display: inline-block;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.6rem;
      left: 0;
      width: 0;
      height: 3px;
      background: var(--green);
      border-radius: 2px;
      transition: width 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s;
    }

    &.is-visible::after {
      width: 100%;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.6rem;
  }

  .card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 0.8rem;
    padding: 2.6rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    transition: border-color 0.25s,
                transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                box-shadow 0.3s ease;

    &:hover {
      border-color: rgba(35, 206, 107, 0.35);
      transform: translateY(-5px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.5),
                  0 0 0 1px rgba(35, 206, 107, 0.08);
    }
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.4rem;

    .links {
      display: flex;
      gap: 1rem;

      a {
        display: flex;
        align-items: center;
        opacity: 0.4;
        transition: opacity 0.2s;

        &:hover {
          opacity: 1;
        }

        img {
          width: 17px;
          filter: invert(1);
        }
      }
    }
  }

  h3 {
    font-size: 1.85rem;
    font-weight: 700;
    letter-spacing: -0.02em;
  }

  p {
    font-size: 1.45rem;
    color: var(--text-muted);
    line-height: 1.7;
    flex: 1;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: auto;
    padding-top: 0.4rem;

    li {
      font-size: 1.15rem;
      font-weight: 600;
      color: var(--green);
      border: 1px solid rgba(35, 206, 107, 0.22);
      border-radius: 0.3rem;
      padding: 0.25rem 0.8rem;
      letter-spacing: 0.02em;
    }
  }

  @media (max-width: 640px) {
    padding: 0 2.4rem 8rem;

    .grid {
      grid-template-columns: 1fr;
    }
  }
`;
