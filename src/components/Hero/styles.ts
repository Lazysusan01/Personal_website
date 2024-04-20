import styled from "styled-components";

export const Container = styled.section`
  padding-top: 10%;
  display: flex;
  justify-content: space-between;
  gap: 8rem;
  background: rgba(0,0,0,0);
  .hero-text{
    & > p{
      font-size: 1.8rem;
    }
    h1{
      font-size: 7rem;
    }

    h3{
      color:var(--green);
      margin: 1rem 0;
    }

    
    p.small-resume {
      margin-bottom: 5rem;
    }
  }
// New added
  .social-media{
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-top:5rem;
    padding-left:1rem;

    img,span{
      font-size: 3rem;
      width: 3.5rem;
    }
  }

  .button{
    margin-top: 5rem;
    padding: 1.4rem 6rem;
  }

  .hero-image{
    text-align: right;
   img{
     margin-top: 2rem;
     width: 50%;
     border-radius: 50rem;
     transition: filter 0.5s;
     &:hover{
       filter: grayscale(0);
     }
   }
  }

  .animated-svg {
    .svg-icon path {
      stroke: #FFFFFF;
      stroke-width: 1;
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      animation: none;
    }
  
    &.animate {
      .svg-icon path {
        animation: draw 5s forwards;
      }
    }
  }
  
  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }

  @media(max-width: 1080px){
    display: block;
    margin-top: 15%;
    .hero-text{
      h1{
        font-size: 5rem;
      }
    }
    
    .hero-image{
      display: none;
    }
  }

  @media(max-width: 600px){
    margin-top: 35%;
  }
  @media(max-width: 480px){
    margin-top: 45%;
  }
`