import { motion } from 'framer-motion'
import { Award, Code, BarChart3, Server, Brain } from 'lucide-react'

function Skills({ portfolioData }) {
    return (
        <section id="skills" className="skills">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                >
                    <Award className="section-icon" />
                    <h2>Skills & Technologies</h2>
                    <p>My technical and soft skills across different areas</p>
                </motion.div>

                <div className="skills-grid">
                    <motion.div
                        className="skill-category"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.05, ease: 'easeOut' }}
                        viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                    >
                        <div className="skill-header">
                            <Code className="skill-icon" />
                            <h3>Programming Languages</h3>
                        </div>
                        <div className="skill-tags">
                            {portfolioData.skills.programming.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="skill-category"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
                        viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                    >
                        <div className="skill-header">
                            <BarChart3 className="skill-icon" />
                            <h3>Data Visualization</h3>
                        </div>
                        <div className="skill-tags">
                            {portfolioData.skills.dataVisualization.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="skill-category"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.15, ease: 'easeOut' }}
                        viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                    >
                        <div className="skill-header">
                            <Server className="skill-icon" />
                            <h3>Software & Tools</h3>
                        </div>
                        <div className="skill-tags">
                            {portfolioData.skills.software.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="skill-category"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
                        viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                    >
                        <div className="skill-header">
                            <Brain className="skill-icon" />
                            <h3>Soft Skills</h3>
                        </div>
                        <div className="skill-tags">
                            {portfolioData.skills.softSkills.map((skill, index) => (
                                <span key={index} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default Skills
