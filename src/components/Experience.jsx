import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

function Experience({ portfolioData }) {
    return (
        <section id="experience" className="experience">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                >
                    <Briefcase className="section-icon" />
                    <h2>Experience</h2>
                    <p>My professional journey and internships</p>
                </motion.div>

                <div className="experience-timeline">
                    {portfolioData.experience.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="timeline-item"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
                            viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                        >
                            <div className="timeline-marker"></div>
                            <div className="timeline-content">
                                {exp.image && (
                                    <div className="experience-image-wrapper">
                                        <img
                                            src={exp.image}
                                            alt={exp.company}
                                            className="experience-image"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                                <h3>{exp.title}</h3>
                                <h4>{exp.company}</h4>
                                <span className="timeline-period">{exp.period}</span>
                                <p>{exp.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Experience
