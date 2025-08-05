// import { BrowserRouter } from "react-router-dom"
import { Container } from "./styles"
import ScrollAnimation from "react-animate-on-scroll"
// import { NavHashLink } from "react-router-hash-link"
import linkedin from '../../assets/linkedin.svg'
import githubIcon from '../../assets/github.svg'
import whatsapp from '../../assets/whatsapp.svg'
import Hello from '../../assets/Hello.gif'
import nicomcgill from '../../assets/nicomcgill.jpg'
import resume from '../../assets/Nico_mcgill_cv.pdf'
import ThreeScene from "./ThreeScene"

export function Hero() {
  return (
    <Container id="home">
      <div className="hero-content">
        <ScrollAnimation animateIn="fadeInUp">
          <p>Hello <img src={Hello} alt="Hello" width="20px"/>, I'm</p>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" delay={0.2 * 1000}>
          <ThreeScene/>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" delay={0.4 * 1000}>
          <h3>Freelance Software Developer</h3>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" delay={0.8 * 1000}>
          <a href={resume} download className="button">
            Resume
          </a>
        </ScrollAnimation>
        <div className="profile-section">
          <ScrollAnimation animateIn="fadeInUp" delay={1 * 1000}>
            <div className="social-media">
              {[
                { href: "https://www.linkedin.com/in/nico-mcgill", img: linkedin, alt: "LinkedIn" },
                { href: "https://github.com/lazysusan01/", img: githubIcon, alt: "GitHub" },
                { href: "https://api.whatsapp.com/send/?phone=%2B919630576848&text=Hello+Nico", img: whatsapp, alt: "WhatsApp" }
              ].map((social, index) => (
                <a key={index} href={social.href} target="_blank" rel="noreferrer">
                  <img src={social.img} alt={social.alt} />
                </a>
              ))}
            </div>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInRight" delay={1.2 * 1000}>
            <div className="hero-image">
              <img src={nicomcgill} alt="Profile"/>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </Container>
  )
}
