import styled from "styled-components";

export const Container = styled.section`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  gap: 2rem;

  .hard-skills{
    margin-top: 1.6rem;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.8rem;
    justify-content: center;
  }
  
  .hability{
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
      width: 3.4rem;
    }
  }

  h2{
    display: inline-block;
    margin-bottom: 2rem;
    font-size: 3rem;
    margin-top: 0rem;
    color: var(--green);
  }

  h3{
    margin-top: 2rem;
    color: var(--green);
  }

  p{
    font-size: 1.8rem;
    letter-spacing: 0.1rem;
    font-weight: 500;
  }
  
  .about-text{
    font-size: 3rem;
    font-weight: 300;
  }

  .about-image{
    text-align: center;
    img{
      margin-top: 2rem;
      width: 70%;
      filter: grayscale(0);
      transition: filter 0.5s;
      &:hover{
        filter: grayscale(0);
      }
    }
  }

  @media (max-width: 768px){
    max-width: 90%;
    
    .about-image img{
      width: 80%;
    }
  }

  @media (max-width: 480px) {
    max-width: 95%;
    
    .about-image img{
      width: 90%;
    }
    
    h2{
      font-size: 2.5rem;
    }
    
    p{
      font-size: 1.6rem;
    }
  }

`
