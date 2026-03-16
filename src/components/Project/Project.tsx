import { useReveal } from '../../hooks/useReveal'
import { Container } from './styles'
import externalLink from '../../assets/external-link.svg'
import githubIcon from '../../assets/github.svg'

const projects = [
  {
    name: 'GetRoasted.lol',
    description:
      'AI-powered webapp that roasts user-uploaded photos. React frontend, Python/Flask backend with LLM inference. Built and launched solo while travelling South-East Asia.',
    tags: ['React', 'Python', 'Flask', 'AI'],
    live: 'http://getroasted.lol',
    github: null,
  },
  {
    name: 'HazMat Visualisation Tool',
    description:
      '3D tool for visualising dangerous goods shipping containers with accurate hazard label placement. Built with Three.js and Blender for Chemwatch.',
    tags: ['Three.js', 'React', 'Blender', 'WebGL'],
    live: null,
    github: 'https://github.com/Lazysusan01/threeJS_Packaging_Module',
  },
  {
    name: 'Gmail Summariser',
    description:
      'Chrome extension using an LLM to summarise a Gmail inbox over any chosen time range — clean sidebar UI integrated natively into Gmail.',
    tags: ['React', 'TypeScript', 'LLM', 'Chrome Extension'],
    live: null,
    github: 'https://github.com/Lazysusan01/gmail-summarise-addon',
  },
  {
    name: 'LED Pricing Tickers',
    description:
      'Python data aggregation system pulling futures, commodities, and FX prices from multiple APIs to drive Wall Street-style scrolling LED tickers at Braemar Shipbroking.',
    tags: ['Python', 'SQL', 'APIs', 'Data'],
    live: null,
    github: 'https://github.com/Lazysusan01/Braemar-pricing-tickers',
  },
]

export function Project() {
  const headingRef = useReveal()

  return (
    <Container id="projects">
      <h2 ref={headingRef} className="section-heading reveal">
        Projects
      </h2>
      <div className="grid">
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>
    </Container>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const ref = useReveal()

  return (
    <div
      ref={ref}
      className="card reveal"
      style={{ transitionDelay: `${(index % 2) * 100}ms` }}
    >
      <div className="card-top">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--green)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
        <div className="links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <img src={githubIcon} alt="GitHub" />
            </a>
          )}
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer" aria-label="Live site">
              <img src={externalLink} alt="External link" />
            </a>
          )}
        </div>
      </div>

      <h3>{project.name}</h3>
      <p>{project.description}</p>

      <ul className="tags">
        {project.tags.map(tag => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  )
}
