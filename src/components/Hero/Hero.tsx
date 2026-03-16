import { Container } from './styles'
import linkedin from '../../assets/linkedin.svg'
import githubIcon from '../../assets/github.svg'
import resume from '../../assets/Nico_mcgill_cv.pdf'

export function Hero() {
  return (
    <Container id="home">
      <div className="hero-inner">
        <p className="greeting">Hi, I'm</p>

        <h1>
          <span className="name-a">Nico</span>
          {' '}
          <span className="name-b">McGill</span>
        </h1>

        <h2 className="title">
          Software Engineer <span className="amp">&amp;</span> Risk Analyst
        </h2>

        <p className="bio">
          Building things at the intersection of technology, data, and automation.
          Currently at <span className="highlight">Petroineos</span>.
        </p>

        <div className="actions">
          <a href={resume} download className="button">
            Download CV
          </a>
          <div className="socials">
            <a
              href="https://www.linkedin.com/in/nico-mcgill"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <img src={linkedin} alt="LinkedIn" />
            </a>
            <a
              href="https://github.com/Lazysusan01"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <img src={githubIcon} alt="GitHub" />
            </a>
            <a href="mailto:nicomcgill@gmail.com" aria-label="Email">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <div className="line" />
        <span>scroll</span>
      </div>
    </Container>
  )
}
