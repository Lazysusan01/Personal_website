import styled from "styled-components";

export const Container = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5rem;
  position: relative;
  overflow: hidden;

  /* Subtle green ambient glow */
  &::before {
    content: '';
    position: absolute;
    top: 40%;
    left: -10%;
    width: 55vw;
    height: 55vw;
    background: radial-gradient(circle, rgba(35, 206, 107, 0.05) 0%, transparent 65%);
    transform: translateY(-50%);
    pointer-events: none;
  }

  .hero-inner {
    max-width: 900px;
    position: relative;
    z-index: 1;
  }

  .greeting {
    font-size: 1.6rem;
    color: var(--green);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 1.4rem;
    animation: fadeUp 0.5s ease both;
  }

  h1 {
    font-size: clamp(5.5rem, 11vw, 11rem);
    font-weight: 800;
    line-height: 0.88;
    letter-spacing: -0.04em;
    margin-bottom: 2.8rem;

    .name-a {
      display: inline-block;
      animation: slideFromLeft 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
    }

    .name-b {
      display: inline-block;
      color: var(--green);
      animation: slideFromRight 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
    }

    .letter {
      display: inline-block;
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                  color 0.35s ease;

      &:hover {
        transform: translateY(-8px);
        color: var(--green);
      }
    }

    .name-b .letter:hover {
      color: var(--text);
    }
  }

  .title {
    font-size: clamp(1.7rem, 2.8vw, 2.4rem);
    font-weight: 400;
    color: var(--text-muted);
    letter-spacing: -0.01em;
    margin-bottom: 2rem;
    animation: fadeUp 0.6s ease 0.45s both;

    .amp {
      color: var(--green);
      margin: 0 0.6rem;
    }
  }

  .bio {
    font-size: 1.7rem;
    color: var(--text-muted);
    max-width: 46ch;
    line-height: 1.65;
    margin-bottom: 4.4rem;
    animation: fadeUp 0.6s ease 0.55s both;

    .highlight {
      color: var(--text);
      font-weight: 600;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 2.4rem;
    animation: fadeUp 0.6s ease 0.65s both;
  }

  .socials {
    display: flex;
    gap: 1.2rem;
    align-items: center;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3.8rem;
      height: 3.8rem;
      border: 1px solid var(--border);
      border-radius: 50%;
      color: var(--text-muted);
      transition: border-color 0.2s, color 0.2s, transform 0.2s;

      &:hover {
        border-color: var(--green);
        color: var(--green);
        transform: translateY(-2px);
      }

      img {
        width: 16px;
        filter: invert(0.6);
        transition: filter 0.2s;
      }

      &:hover img {
        filter: invert(1);
      }
    }
  }

  .scroll-hint {
    position: absolute;
    bottom: 4rem;
    left: 5rem;
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--text-muted);
    font-size: 1.1rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    animation: fadeUp 0.6s ease 1.1s both;

    .line {
      width: 36px;
      height: 1px;
      background: var(--text-muted);
      animation: expandLine 0.8s ease 1.3s both;
    }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideFromLeft {
    from { opacity: 0; transform: translateX(-50px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideFromRight {
    from { opacity: 0; transform: translateX(50px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes expandLine {
    from { width: 0; }
    to   { width: 36px; }
  }

  @media (max-width: 768px) {
    padding: 0 2.4rem;

    .scroll-hint {
      left: 2.4rem;
    }
  }
`;
