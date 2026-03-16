import { Container } from './styles'

export function Footer() {
  return (
    <Container className="footer">
      <p>© {new Date().getFullYear()} Nico McGill</p>
      <a href="mailto:nicomcgill@gmail.com">nicomcgill@gmail.com</a>
    </Container>
  )
}
