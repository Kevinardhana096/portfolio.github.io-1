import { Code } from 'lucide-react'
import { memo } from 'react'

const Navigation = memo(function Navigation({ activeSection, scrollToSection, mobileMenuOpen, setMobileMenuOpen, portfolioData }) {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <div className="logo-container">
                        <Code className="logo-icon" />
                        <div className="logo-text">
                            <span className="logo-name">{portfolioData.personal.name}</span>
                            <span className="logo-subtitle">Portfolio</span>
                        </div>
                    </div>
                </div>
                <ul className={`nav-menu ${mobileMenuOpen ? 'nav-menu-open' : ''}`}>
                    {['Home', 'About', 'Experience', 'Projects', 'Education', 'Skills', 'Contact'].map((item) => (
                        <li key={item}>
                            <a
                                href={`#${item.toLowerCase()}`}
                                className={activeSection === item.toLowerCase() ? 'active' : ''}
                                onClick={(e) => {
                                    e.preventDefault()
                                    scrollToSection(item.toLowerCase())
                                }}
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
                <div
                    className={`nav-mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    )
})

export default Navigation
