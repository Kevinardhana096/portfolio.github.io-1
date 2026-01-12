import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, X, ZoomIn } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

function Experience({ portfolioData }) {
    const scrollContainerRef = useRef(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedCompany, setSelectedCompany] = useState('')
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        const updateTimelineWidth = () => {
            if (scrollContainerRef.current) {
                const itemCount = portfolioData.experience.length
                const isMobile = window.innerWidth < 768
                const itemWidth = isMobile ? 280 : 350
                const gap = 48
                const totalWidth = (itemWidth * itemCount) + (gap * (itemCount - 1))
                scrollContainerRef.current.style.setProperty('--timeline-width', `${totalWidth}px`)
            }
        }

        updateTimelineWidth()
        window.addEventListener('resize', updateTimelineWidth)
        return () => window.removeEventListener('resize', updateTimelineWidth)
    }, [portfolioData.experience.length])

    // Handle ESC key to close modal
    useEffect(() => {
        if (!selectedImage) return

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeModal()
            }
        }

        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = 'unset'
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [selectedImage])

    const openModal = (image, company) => {
        setSelectedImage(image)
        setSelectedCompany(company)
        setImageLoaded(false)
    }

    const closeModal = () => {
        setSelectedImage(null)
        setSelectedCompany('')
        setImageLoaded(false)
    }

    const getImageSrc = (image) => {
        return image.startsWith('http')
            ? image
            : `${import.meta.env.BASE_URL}${image.replace(/^\//, '')}`
    }

    return (
        <>
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
                                            <div
                                                className="experience-image-wrapper"
                                                onClick={() => openModal(exp.image, exp.company)}
                                            >
                                                <img
                                                    src={getImageSrc(exp.image)}
                                                    alt={exp.company}
                                                    className="experience-image"
                                                    loading="lazy"
                                                />
                                                <div className="image-overlay">
                                                    <ZoomIn size={28} />
                                                    <span>Klik untuk memperbesar</span>
                                                </div>
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

            {/* Instagram-style Image Modal */}
            {createPortal(
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            className="ig-modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={closeModal}
                        >
                            {/* Image Container with Instagram-style ring */}
                            <motion.div
                                className="ig-modal-content"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{
                                    type: "spring",
                                    damping: 20,
                                    stiffness: 300
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Loading */}
                                {!imageLoaded && (
                                    <div className="ig-modal-loading">
                                        <div className="ig-spinner"></div>
                                    </div>
                                )}

                                {/* Image */}
                                <img
                                    src={getImageSrc(selectedImage)}
                                    alt={selectedCompany}
                                    className="ig-modal-image"
                                    style={{ opacity: imageLoaded ? 1 : 0 }}
                                    onLoad={() => setImageLoaded(true)}
                                />
                            </motion.div>

                            {/* Close X */}
                            <motion.button
                                className="ig-close-btn"
                                onClick={closeModal}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <X size={28} />
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    )
}

export default Experience
