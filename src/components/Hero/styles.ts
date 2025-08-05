import styled from "styled-components";

export const Container = styled.section`
  padding-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0);
  
  .hero-content {
    text-align: center;
    max-width: 800px;
    
    h1 {
      font-size: 6rem;
      font-weight: 700;
      color: inherit; 
    }
    h3 {
      font-size: 3rem;
      font-weight: 500;
      padding-bottom: 2rem;
      color: inherit; 
    }
    p {
      font-size: 3rem;
      font-weight: 300;
      color: inherit; 
    }
  }

  .button{
    margin-top: 5rem;
    padding: 1.4rem 6rem;
  }

  .profile-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 3rem;
    flex-wrap: wrap;
  }

  .social-media{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    img,span{
      font-size: 3rem;
      width: 3.5rem;
    }
  }

  .hero-image{
   img{
     width: 120px;
     height: 120px;
     border-radius: 50%;
     object-fit: cover;
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
    margin-top: 15%;
    .hero-content{
      h1{
        font-size: 5rem;
      }
    }
  }

  @media(max-width: 768px){
    .profile-section {
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .hero-image img {
      width: 100px;
      height: 100px;
    }
  }

  @media(max-width: 600px){
    margin-top: 35%;
    
    .hero-content {
      h3 {
        font-size: 2.5rem;
      }
      p {
        font-size: 2.5rem;
      }
    }
  }
  
  @media(max-width: 480px){
    margin-top: 45%;
    
    .hero-content {
      h3 {
        font-size: 2rem;
      }
      p {
        font-size: 2rem;
      }
    }
    
    .hero-image img {
      width: 80px;
      height: 80px;
    }
  }
`
