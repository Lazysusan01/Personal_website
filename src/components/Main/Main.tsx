import { Container } from "./styles";
import { Hero } from "../Hero/Hero";
import { Experience } from "../Experience/Experience";
import { Project } from "../Project/Project";
import { Contact } from "../Contact/Contact";

export function Main() {
  return (
    <Container>
      <Hero />
      <Experience />
      <Project />
      <Contact />
    </Container>
  );
}
