import { motion } from 'framer-motion'
import { MessageSquare, Mail, Linkedin, Github } from 'lucide-react'

function Contact({ portfolioData }) {
    return (
        <section id="contact" className="contact">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                >
                    <MessageSquare className="section-icon" />
                    <h2>Get In Touch</h2>
                    <p>Let's connect and discuss opportunities</p>
                </motion.div>

                <motion.div
                    className="contact-content"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                >
                    <div className="contact-info">
                        <h3>Let's work together</h3>
                        <p>I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.</p>

                        <div className="contact-methods">
                            <a href={`mailto:${portfolioData.personal.email}`} className="contact-method">
                                <Mail className="contact-icon" />
                                <div>
                                    <h4>Email</h4>
                                    <span>{portfolioData.personal.email}</span>
                                </div>
                            </a>

                            <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="contact-method">
                                <Linkedin className="contact-icon" />
                                <div>
                                    <h4>LinkedIn</h4>
                                    <span>Connect with me</span>
                                </div>
                            </a>

                            <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="contact-method">
                                <Github className="contact-icon" />
                                <div>
                                    <h4>GitHub</h4>
                                    <span>Check out my code</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default Contact
