import React from 'react'
import LandingWindow from '../../components/portfolioComponents/PageSections/LandingWindow';
import About from '../../components/portfolioComponents/PageSections/About';
import Projects from '../../components/portfolioComponents/PageSections/Projects';
import Skills from '../../components/portfolioComponents/PageSections/Skills';
import Navbar from '../../components/portfolioComponents/Navbar';

const PortfolioPage = () => {
  return (
    <div>

      <Navbar />

      <section id='landingWindow'>
        <LandingWindow />
      </section>
      
      <section id='about'>
        <About />
      </section>
      
      <section id='projects'>
        <Projects />
      </section>

      <section id='skills'>
        <Skills />
      </section>
    </div>
  )
}

export default PortfolioPage;