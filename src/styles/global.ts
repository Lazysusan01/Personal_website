import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #0d0d0d;
    --bg-card: #111111;
    --green: #23ce6b;
    --green-dim: rgba(35, 206, 107, 0.08);
    --green-glow: rgba(35, 206, 107, 0.18);
    --text: #f0f0f0;
    --text-muted: #666666;
    --border: rgba(255, 255, 255, 0.07);
    scroll-padding-top: 8rem;
  }

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    font-size: 1.6rem;
    font-family: 'Red Hat Display', sans-serif;
    font-weight: 400;
    background-color: var(--bg);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    background-image: radial-gradient(rgba(255, 255, 255, 0.022) 1px, transparent 1px);
    background-size: 28px 28px;
  }

  body, input, textarea, button {
    font-family: 'Red Hat Display', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  button, .button {
    border: none;
    cursor: pointer;
    background-color: var(--green);
    color: #000;
    border-radius: 0.4rem;
    font-weight: 700;
    font-size: 1.4rem;
    letter-spacing: 0.04em;
    padding: 1.1rem 2.6rem;
    transition: opacity 0.2s ease, transform 0.2s ease;

    &:hover {
      opacity: 0.85;
      transform: translateY(-2px);
    }
  }

  /* ── Scroll reveal ── */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .reveal.is-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
