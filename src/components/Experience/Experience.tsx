import { useReveal } from '../../hooks/useReveal'
import { Container } from './styles'

const experiences = [
  {
    period: '2025 — Present',
    role: 'Risk Analyst',
    company: 'Petroineos',
    description:
      'Risk analysis at one of Europe\'s largest oil refineries. Leveraging data and technology to support trading and risk management decisions.',
    tags: ['Risk', 'Data Analysis', 'Python', 'Trading'],
  },
  {
    period: '2024 — 2025',
    role: 'R&D Software Engineer',
    company: 'Chemwatch',
    description:
      'Built a Gmail LLM inbox summariser, a hazardous materials US regulations retrieval webapp, and implemented Redis caching + CDN across the company website — achieving a 2–3× performance improvement.',
    tags: ['React', 'Python', 'AWS', 'Redis', 'LLMs'],
  },
  {
    period: '2023 — Present',
    role: 'Founder & Developer',
    company: 'GetRoasted.lol',
    description:
      'Designed, built, and launched a full-stack webapp for AI-powered photo roasting. React frontend, Python/Flask backend. Developed while travelling South-East Asia and Australia.',
    tags: ['React', 'Flask', 'AI', 'Full-stack'],
  },
  {
    period: '2022 — 2023',
    role: 'Desktop Support Engineer',
    company: 'Braemar Shipbroking',
    description:
      'Built large-scale Python data aggregation tools displaying futures, commodities, and FX prices to shipbrokers. Led CRM and SharePoint migrations. Became team expert in Azure and Microsoft infrastructure.',
    tags: ['Python', 'Azure', 'SQL', 'Power BI'],
  },
  {
    period: '2020 — 2020',
    role: 'Data Analyst',
    company: 'Nightingale Hammerson',
    description:
      'Managed a large MSSQL database for fundraising campaigns. Built an automated reconciliation process in Excel — reducing processing time by ~3× across £3.2M+ in donations.',
    tags: ['SQL', 'Excel', 'Power BI', 'Automation'],
  },
]

export function Experience() {
  const headingRef = useReveal()

  return (
    <Container id="experience">
      <h2 ref={headingRef} className="section-heading reveal">
        Experience
      </h2>
      <div className="timeline">
        {experiences.map((exp, i) => (
          <ExperienceItem key={i} exp={exp} index={i} />
        ))}
      </div>
    </Container>
  )
}

function ExperienceItem({
  exp,
  index,
}: {
  exp: (typeof experiences)[0]
  index: number
}) {
  const ref = useReveal()

  return (
    <div
      ref={ref}
      className="timeline-item reveal"
      style={{ transitionDelay: `${index * 70}ms` }}
    >
      <div className="period">{exp.period}</div>
      <div className="content">
        <div className="role-line">
          <h3>{exp.role}</h3>
          <span className="company">{exp.company}</span>
        </div>
        <p>{exp.description}</p>
        <ul className="tags">
          {exp.tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
