import styled from "styled-components";

export const Container = styled.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 10rem 4rem;

  .section-heading {
    font-size: clamp(3.2rem, 5vw, 5rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    margin-bottom: 6rem;
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

  .timeline {
    position: relative;
    padding-left: 1.5rem;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 1rem;
      bottom: 1rem;
      width: 1px;
      background: var(--border);
    }
  }

  .timeline-item {
    display: grid;
    grid-template-columns: 15rem 1fr;
    gap: 3rem;
    padding: 2.8rem 0 2.8rem 3.2rem;
    position: relative;
    border-bottom: 1px solid var(--border);

    &:last-child {
      border-bottom: none;
    }

    /* Timeline dot */
    &::before {
      content: '';
      position: absolute;
      left: -0.4rem;
      top: 3.4rem;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--bg);
      border: 2px solid var(--text-muted);
      transition: border-color 0.25s, background-color 0.25s;
    }

    &:hover::before {
      border-color: var(--green);
      background: var(--green-dim);
    }
  }

  .period {
    font-size: 1.25rem;
    color: var(--text-muted);
    font-weight: 500;
    letter-spacing: 0.02em;
    padding-top: 0.5rem;
    white-space: nowrap;
  }

  .content {
    p {
      font-size: 1.5rem;
      color: var(--text-muted);
      line-height: 1.75;
      margin: 0.8rem 0 1.6rem;
    }
  }

  .role-line {
    display: flex;
    align-items: baseline;
    gap: 1.2rem;
    flex-wrap: wrap;

    h3 {
      font-size: 1.85rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .company {
      font-size: 1.4rem;
      color: var(--green);
      font-weight: 600;
    }
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;

    li {
      font-size: 1.15rem;
      font-weight: 500;
      color: var(--text-muted);
      border: 1px solid var(--border);
      border-radius: 0.3rem;
      padding: 0.3rem 0.9rem;
      letter-spacing: 0.02em;
      transition: border-color 0.2s, color 0.2s;
    }
  }

  .timeline-item:hover .tags li {
    border-color: rgba(35, 206, 107, 0.3);
    color: var(--text);
  }

  @media (max-width: 640px) {
    padding: 8rem 2.4rem;

    .timeline-item {
      grid-template-columns: 1fr;
      gap: 0.2rem;
      padding-left: 2.4rem;
    }

    .period {
      padding-top: 0;
    }
  }
`;
