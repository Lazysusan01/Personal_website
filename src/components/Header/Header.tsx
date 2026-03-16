import { useState } from 'react'
import { Container } from './styles'
import resume from '../../assets/Nico_mcgill_cv.pdf'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <Container>
      <a href="#home" className="logo">
        nico<span>.</span>
      </a>

      <nav className={isOpen ? 'open' : ''}>
        {links.map(link => (
          <a key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href={resume} download className="cv-link">
          CV ↓
        </a>
      </nav>

      <button
        className={`hamburger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </Container>
  )
}
