import { motion } from 'framer-motion'
import { Code, Github, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

function Projects({ portfolioData }) {
    const [currentPage, setCurrentPage] = useState(1)
    const projectsPerPage = 6

    // Calculate pagination
    const totalPages = Math.ceil(portfolioData.projects.length / projectsPerPage)
    const indexOfLastProject = currentPage * projectsPerPage
    const indexOfFirstProject = indexOfLastProject - projectsPerPage
    const currentProjects = portfolioData.projects.slice(indexOfFirstProject, indexOfLastProject)

    // Detect device type
    const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth <= 1024
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
        // Scroll to projects section with offset for mobile
        setTimeout(() => {
            const element = document.getElementById('projects')
            if (element) {
                const offset = isMobile ? 80 : 100
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                })
            }
        }, 100)
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1)
        }
    }

    return (
        <section id="projects" className="projects">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                >
                    <Code className="section-icon" />
                    <h2>Projects</h2>
                    <p>Some of my recent work and personal projects</p>
                </motion.div>

                <div className="projects-grid">
                    {currentProjects.map((project, index) => (
                        <motion.div
                            key={`${currentPage}-${index}`}
                            className="project-card"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: isTablet ? 0.6 : isMobile ? 0.5 : 0.5,
                                delay: index * (isTablet ? 0.12 : isMobile ? 0.1 : 0.1),
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                        >
                            <div className="project-header">
                                <h3>{project.title}</h3>
                                <div className="project-links">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                                            <Github size={20} />
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>
                            <p>{project.description}</p>
                            <div className="project-tech">
                                {project.tech.map((tech, techIndex) => (
                                    <span key={techIndex} className="tech-tag">{tech}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <motion.div
                        className="pagination"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: isTablet ? 0.6 : 0.5,
                            delay: isTablet ? 0.5 : isMobile ? 0.3 : 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                    >
                        <button
                            className="pagination-btn pagination-prev"
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft size={20} />
                            <span>Previous</span>
                        </button>

                        <div className="pagination-numbers">
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            className="pagination-btn pagination-next"
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            <span>Next</span>
                            <ChevronRight size={20} />
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    )
}

export default Projects
