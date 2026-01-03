import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Code, Database, Globe, Server, ExternalLink, Github, Linkedin } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'

function Hero({ scrollToSection, typedText, portfolioData, onLoad }) {
    // Construct proper image path with base URL
    const heroImage = portfolioData.personal.profileImage.startsWith('http')
        ? portfolioData.personal.profileImage
        : `${import.meta.env.BASE_URL}${portfolioData.personal.profileImage.replace(/^\//, '')}`

    // Deteksi device untuk optimasi performa dan responsive
    const [deviceConfig, setDeviceConfig] = useState({
        particleCount: 10,
        enableHeavyAnimations: true,
        isMobile: false,
        isTablet: false,
        isSmallMobile: false,
        iconSize: 20
    })
    const [showParticles, setShowParticles] = useState(false)

    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth
            const height = window.innerHeight
            const isMobile = width < 768
            const isTablet = width >= 768 && width < 1024
            const isSmallMobile = width < 480
            const isLowEnd = navigator.hardwareConcurrency <= 4 || isMobile
            const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

            setDeviceConfig({
                particleCount: isSmallMobile ? 2 : isMobile ? 4 : 8,
                enableHeavyAnimations: !isLowEnd && !isReducedMotion,
                isMobile,
                isTablet,
                isSmallMobile,
                iconSize: isSmallMobile ? 16 : isMobile ? 18 : 20
            })
        }

        checkDevice()
        const resizeObserver = new ResizeObserver(() => checkDevice())
        resizeObserver.observe(document.documentElement)

        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        mediaQuery.addEventListener('change', checkDevice)

        return () => {
            resizeObserver.disconnect()
            mediaQuery.removeEventListener('change', checkDevice)
        }
    }, [])

    // Defer particles untuk load lebih cepat
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowParticles(true)
            if (onLoad) onLoad()
        }, 800)
        return () => clearTimeout(timer)
    }, [])

    return (
        <section id="home" className="hero">
            <div className="hero-background">
                <div className="hero-grid"></div>
                {deviceConfig.enableHeavyAnimations && showParticles && (
                    <div className="hero-particles">
                        {[...Array(deviceConfig.particleCount)].map((_, i) => (
                            <div key={i} className={`particle particle-${i + 1}`}></div>
                        ))}
                    </div>
                )}
            </div>
            <div className="container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    {/* Profile Introduction Card */}
                    <motion.div
                        className="hero-profile-card"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
                    >
                        <div className="profile-image-hero">
                            <div className="profile-frame">
                                <img
                                    src={heroImage}
                                    alt={`${portfolioData.personal.name} - Profile Photo`}
                                    className="profile-img"
                                    loading="eager"
                                    fetchPriority="high"
                                    decoding="async"
                                    onError={(e) => {
                                        console.log('Image failed to load:', e.target.src)
                                        e.target.style.display = 'block'
                                    }}
                                />
                                <div className="profile-overlay">
                                    <div className="overlay-icon">
                                        <Code size={deviceConfig.isSmallMobile ? 20 : 24} />
                                    </div>
                                </div>
                            </div>
                            <AnimatePresence>
                                {deviceConfig.enableHeavyAnimations && (
                                    <div className="floating-tech-icons">
                                        <motion.div className="tech-icon tech-icon-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Code size={deviceConfig.isSmallMobile ? 14 : 18} /></motion.div>
                                        <motion.div className="tech-icon tech-icon-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Database size={deviceConfig.isSmallMobile ? 12 : 16} /></motion.div>
                                        <motion.div className="tech-icon tech-icon-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Globe size={deviceConfig.isSmallMobile ? 11 : 14} /></motion.div>
                                        <motion.div className="tech-icon tech-icon-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Server size={deviceConfig.isSmallMobile ? 16 : 20} /></motion.div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="profile-info">
                            <motion.div
                                className="profile-badge"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.15, ease: 'easeOut' }}
                            >
                                <span className="badge-icon">🎓</span>
                                <span>{portfolioData.personal.title}</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.2, ease: 'easeOut' }}
                            >
                                <span className="greeting">Halo, Saya</span>
                                <span className="name-highlight">{portfolioData.personal.name}</span>
                            </motion.h1>

                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.25, ease: 'easeOut' }}
                                className="subtitle"
                            >
                                <span className="typing-text">{typedText}</span>
                                <span className="cursor">|</span>
                            </motion.h2>

                            <motion.p
                                className="profile-intro"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.3, ease: 'easeOut' }}
                            >
                                {portfolioData.profile.greeting}
                            </motion.p>

                            <motion.div
                                className="profile-contact-info"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2, delay: 0.35, ease: 'easeOut' }}
                            >
                                <div className="contact-item">
                                    <Mail size={16} />
                                    <span>{portfolioData.personal.email}</span>
                                </div>
                                <div className="contact-item">
                                    <span>📍</span>
                                    <span>{portfolioData.personal.location}</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Call to Action Section */}
                    <motion.div
                        className="hero-cta-section"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4, ease: 'easeOut' }}
                    >
                        <div className="cta-content">
                            <h3>Mari Berkolaborasi!</h3>
                            <p>Saya terbuka untuk kesempatan magang, proyek kolaborasi, atau diskusi tentang teknologi dan inovasi.</p>

                            <div className="hero-buttons">
                                <button
                                    className="btn-primary"
                                    onClick={() => scrollToSection('contact')}
                                >
                                    <Mail size={deviceConfig.isSmallMobile ? 16 : 20} />
                                    <span>Hubungi Saya</span>
                                </button>
                                <button
                                    className="btn-secondary"
                                    onClick={() => scrollToSection('projects')}
                                >
                                    <ExternalLink size={deviceConfig.isSmallMobile ? 16 : 20} />
                                    <span>Lihat Portfolio</span>
                                </button>
                            </div>

                            <div className="hero-stats">
                                <div className="stat-card">
                                    <span className="stat-number">9</span>
                                    <span className="stat-label">Projects</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-number">6</span>
                                    <span className="stat-label">Experience</span>
                                </div>
                                <div className="stat-card">
                                    <span className="stat-number">3.90</span>
                                    <span className="stat-label">GPA</span>
                                </div>
                            </div>

                            <div className="social-connect">
                                <h4>Connect with me</h4>
                                <div className="social-links">
                                    <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                                        <Github size={deviceConfig.isSmallMobile ? 16 : 20} />
                                        <span>GitHub</span>
                                    </a>
                                    <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                                        <Linkedin size={deviceConfig.isSmallMobile ? 16 : 20} />
                                        <span>LinkedIn</span>
                                    </a>
                                    <a href={portfolioData.personal.githubPages} target="_blank" rel="noopener noreferrer" className="social-link" title="Blog">
                                        <Globe size={deviceConfig.isSmallMobile ? 16 : 20} />
                                        <span>Blog</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

export default Hero
