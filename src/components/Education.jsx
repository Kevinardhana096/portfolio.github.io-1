import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

function Education({ portfolioData }) {
    return (
        <section id="education" className="education">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                >
                    <GraduationCap className="section-icon" />
                    <h2>Education</h2>
                    <p>My academic background and achievements</p>
                </motion.div>

                <div className="education-timeline">
                    {portfolioData.education.map((edu, index) => (
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
                                <h3>{edu.degree}</h3>
                                <h4>{edu.school}</h4>
                                <span className="timeline-period">{edu.period}</span>
                                <div className="gpa">GPA: {edu.gpa}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Education
