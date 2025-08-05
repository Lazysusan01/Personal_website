import { Container } from "./styles";
import wordpress from "../../assets/wordpress.svg";
import jsIcon from "../../assets/js-icon.svg";
import nodeIcon from "../../assets/node-icon.svg";
import reactIcon from "../../assets/react-icon.svg";
import typescriptIcon from "../../assets/typescript-icon.svg";
import microsoft_azure from "../../assets/Microsoft_Azure.svg";
import aws from "../../assets/Amazon_Web_Services_Logo.svg";
import ScrollAnimation from "react-animate-on-scroll";
import illustration from "../../assets/illustration.svg";

export function About() {
  // Define skills array for cleaner rendering
  const skills = [
    { src: wordpress, alt: "WordPress", delay: 0.10 },
    { src: reactIcon, alt: "React", delay: 0.13 },
    { src: typescriptIcon, alt: "TypeScript", delay: 0.14 },
    { src: aws, alt: "AWS", delay: 0.15 },
    { src: microsoft_azure, alt: "Microsoft Azure", delay: 0.15 },
    { src: nodeIcon, alt: "Node.js", delay: 0.16 },
    { src: jsIcon, alt: "JavaScript", delay: 0.19 },
  ];

  return (
    <Container id="about">
      <div className="about-text">
        <ScrollAnimation animateIn="fadeInLeft">
          <h2>About me</h2>
        </ScrollAnimation>
        <ScrollAnimation 
          animateIn="fadeInLeft" 
          delay={0.2 * 1000} 
          style={{ marginTop: "2rem", marginBottom: "2rem" }}
        >
          <p>
            I build Webapps for fun, and sometimes for money. Please contact me if you'd like me to build something for you, for money.
          </p>
        </ScrollAnimation>
        <div className="hard-skills">
          {skills.map((skill, index) => (
            <div className="hability" key={index}>
              <ScrollAnimation animateIn="fadeInUp" delay={skill.delay * 1000}>
                <img src={skill.src} alt={skill.alt} />
              </ScrollAnimation>
            </div>
          ))}
        </div>
      </div>
      <div className="about-image">
        <ScrollAnimation animateIn="fadeInRight" delay={0.20 * 1000}>
          <img src={illustration} alt="Nico McGill"/>
        </ScrollAnimation>
      </div>
    </Container>
  )
}
