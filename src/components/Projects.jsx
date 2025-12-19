import { motion } from 'framer-motion'
import { Code, Github, ExternalLink } from 'lucide-react'

function Projects({ portfolioData }) {
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
                    {portfolioData.projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="project-card"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
                            viewport={{ once: true, margin: '0px 0px -50px 0px' }}
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
            </div>
        </section>
    )
}

export default Projects
