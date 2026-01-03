import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { useEffect, useRef } from 'react'

function Experience({ portfolioData }) {
    const scrollContainerRef = useRef(null)

    useEffect(() => {
        if (scrollContainerRef.current) {
            const itemCount = portfolioData.experience.length
            const itemWidth = 350 // width of each card
            const gap = 48 // 3rem = 48px
            const totalWidth = (itemWidth * itemCount) + (gap * (itemCount - 1))
            scrollContainerRef.current.style.setProperty('--timeline-width', `${totalWidth}px`)
        }
    }, [portfolioData.experience.length])

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

                <div className="experience-timeline-horizontal">
                    <div className="timeline-scroll-container" ref={scrollContainerRef}>
                        {portfolioData.experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                className="timeline-item-horizontal"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
                                viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                            >
                                <div className="timeline-dot-wrapper">
                                    <div className="timeline-dot">
                                        <div className="timeline-dot-inner"></div>
                                    </div>
                                    <div className="timeline-stem"></div>
                                </div>
                                <div className="timeline-card">
                                    {exp.image && (
                                        <div className="experience-image-wrapper">
                                            <img
                                                src={exp.image.startsWith('http') ? exp.image : `${import.meta.env.BASE_URL}${exp.image.replace(/^\//, '')}`}
                                                alt={exp.company}
                                                className="experience-image"
                                                loading="lazy"
                                            />
                                        </div>
                                    )}
                                    <div className="timeline-card-content">
                                        <span className="timeline-period">{exp.period}</span>
                                        <h3>{exp.title}</h3>
                                        <h4>{exp.company}</h4>
                                        <p>{exp.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="scroll-hint">
                    <span>← Scroll →</span>
                </div>
            </div>
        </section>
    )
}

export default Experience
