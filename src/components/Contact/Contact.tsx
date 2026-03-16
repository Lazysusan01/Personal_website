import { useReveal } from '../../hooks/useReveal'
import { Container } from './styles'
import linkedin from '../../assets/linkedin.svg'
import githubIcon from '../../assets/github.svg'

export function Contact() {
  const ref = useReveal()

  return (
    <Container id="contact">
      <div ref={ref} className="inner reveal">
        <h2>Get in touch</h2>
        <p>
          Open to interesting projects, new roles, or just a conversation.
          Drop me a line.
        </p>
        <a href="mailto:nicomcgill@gmail.com" className="email-link">
          nicomcgill@gmail.com
        </a>
        <div className="socials">
          <a
            href="https://www.linkedin.com/in/nico-mcgill"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedin} alt="LinkedIn" />
            LinkedIn
          </a>
          <a
            href="https://github.com/Lazysusan01"
            target="_blank"
            rel="noreferrer"
          >
            <img src={githubIcon} alt="GitHub" />
            GitHub
          </a>
        </div>
      </div>
    </Container>
  )
}
