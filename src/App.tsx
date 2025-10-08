import './App.css'
import { BrowserRouter, NavLink } from 'react-router-dom'
import { useScrollSpy } from './hooks/useScrollSpy'
import { Home } from './components/Home'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Contact } from './components/Contact'

function Layout() {
  const headerOffset = 72

  // Scrollspy: update URL path based on section whose top is closest to header
  useScrollSpy(headerOffset)

  const handleNavClick = (targetId: string) => {
    const target = document.getElementById(targetId)
    if (target) {
      const targetTop = window.scrollY + target.getBoundingClientRect().top - headerOffset
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
    }
  }

  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : undefined} onClick={() => handleNavClick('home')}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : undefined} onClick={() => handleNavClick('about')}>About</NavLink>
          <NavLink to="/projects" className={({ isActive }) => isActive ? 'active' : undefined} onClick={() => handleNavClick('projects')}>Projects</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : undefined} onClick={() => handleNavClick('contact')}>Contact</NavLink>
        </nav>
      </header>
      <main className="main">
        <section id="home" className="section"><Home /></section>
        <section id="about" className="section"><About /></section>
        <section id="projects" className="section"><Projects /></section>
        <section id="contact" className="section"><Contact /></section>
      </main>
      <footer className="footer">© {new Date().getFullYear()} Nikolas Dujakovich</footer>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
