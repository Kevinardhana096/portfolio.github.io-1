import { Github, Linkedin, Globe } from 'lucide-react'

function Footer({ portfolioData }) {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <p>&copy; 2025 {portfolioData.personal.name}. All rights reserved.</p>
                    <div className="footer-links">
                        <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer">
                            <Github size={20} />
                        </a>
                        <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer">
                            <Linkedin size={20} />
                        </a>
                        <a href={portfolioData.personal.githubPages} target="_blank" rel="noopener noreferrer">
                            <Globe size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
