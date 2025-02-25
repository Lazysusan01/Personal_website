import { Container } from "./styles";
import { Hero } from "../Hero/Hero";
import { About } from "../About/About";
import { Contact } from "../Contact/Contact";
import { Project } from "../Project/Project";
import { Particles } from "./Particles";

export function Main() {
  return (
    <Container>
      <Particles />
      <Hero />
      <About />
      <Project />
      <Contact />
    </Container>
  );
}