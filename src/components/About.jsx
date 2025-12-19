import { motion } from 'framer-motion'
import { User, GraduationCap, Code, BarChart3, Mail, Globe, Github, Linkedin, Brain, Users, Award, Smartphone, Database, Palette, Sparkles, Zap } from 'lucide-react'

// Import image with correct base path
const aboutImage = `${import.meta.env.BASE_URL}android-chrome-512x512.png`

function About({ portfolioData }) {
    return (
        <section id="about" className="about">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                >
                    <User className="section-icon" />
                    <h2>About Me</h2>
                    <p>Get to know more about my background, journey, and expertise in technology</p>
                </motion.div>

                <div className="about-main-content">
                    {/* Profile Overview Card */}
                    <motion.div
                        className="about-profile-card"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                    >
                        <div className="about-image-section">
                            <div className="about-profile-frame">
                                <img
                                    src={aboutImage}
                                    alt={`${portfolioData.personal.name} - Professional Photo`}
                                    className="about-profile-img"
                                    loading="eager"
                                    fetchPriority="high"
                                    onLoad={() => console.log('About image loaded successfully:', aboutImage)}
                                    onError={(e) => {
                                        console.error('About image failed to load:', e.target.src)
                                        console.log('Trying fallback to:', portfolioData.personal.profileImage)
                                        // Fallback ke placeholder jika file tidak ditemukan
                                        e.target.src = portfolioData.personal.profileImage
                                    }}
                                />
                                <div className="about-profile-overlay">
                                    <div className="about-status-indicator">
                                        <div className="status-dot"></div>
                                        <span>Available for opportunities</span>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Badges */}
                            <div className="about-floating-badges">
                                <div className="badge-item badge-1">
                                    <GraduationCap size={16} />
                                    <span>Student</span>
                                </div>
                                <div className="badge-item badge-2">
                                    <Code size={16} />
                                    <span>Developer</span>
                                </div>
                                <div className="badge-item badge-3">
                                    <BarChart3 size={16} />
                                    <span>Analyst</span>
                                </div>
                            </div>
                        </div>

                        <div className="about-personal-info">
                            <h3 className="about-name">{portfolioData.personal.name}</h3>
                            <p className="about-title">{portfolioData.personal.subtitle}</p>

                            <div className="about-quick-info">
                                <div className="info-item">
                                    <Mail size={16} />
                                    <span>{portfolioData.personal.email}</span>
                                </div>
                                <div className="info-item">
                                    <span>📍</span>
                                    <span>{portfolioData.personal.location}</span>
                                </div>
                                <div className="info-item">
                                    <GraduationCap size={16} />
                                    <span>{portfolioData.personal.title}</span>
                                </div>
                            </div>

                            <div className="about-social-links">
                                <a href={portfolioData.personal.github} target="_blank" rel="noopener noreferrer" className="social-btn">
                                    <Github size={18} />
                                </a>
                                <a href={portfolioData.personal.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn">
                                    <Linkedin size={18} />
                                </a>
                                <a href={portfolioData.personal.githubPages} target="_blank" rel="noopener noreferrer" className="social-btn">
                                    <Globe size={18} />
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* About Story & Mission */}
                    <motion.div
                        className="about-story-section"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                        viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                    >
                        <div className="story-content">
                            <div className="story-header">
                                <h3>My Story</h3>
                                <div className="story-divider"></div>
                            </div>

                            <div className="story-paragraphs">
                                <p className="story-intro">{portfolioData.profile.description}</p>

                                <div className="mission-box">
                                    <h4>
                                        <Brain size={20} />
                                        My Mission
                                    </h4>
                                    <p>{portfolioData.profile.mission}</p>
                                </div>
                            </div>

                            <div className="current-focus">
                                <h4>
                                    <Users size={20} />
                                    Current Focus Areas
                                </h4>
                                <div className="focus-grid">
                                    {portfolioData.profile.currentFocus.map((focus, index) => {
                                        const iconMap = {
                                            'Globe': <Globe size={16} />,
                                            'Zap': <Zap size={16} />,
                                            'BarChart3': <BarChart3 size={16} />,
                                            'Sparkles': <Sparkles size={16} />
                                        }
                                        return (
                                            <div key={index} className="focus-item">
                                                <div className="focus-icon">
                                                    {iconMap[focus.icon]}
                                                </div>
                                                <span>{focus.name}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Expertise Section */}
                <motion.div
                    className="about-expertise-section"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    viewport={{ once: true, margin: '0px 0px -100px 0px' }}
                >
                    <div className="expertise-header">
                        <h3>
                            <Award size={24} />
                            Areas of Expertise
                        </h3>
                        <p>Technologies and domains I'm passionate about</p>
                    </div>

                    <div className="expertise-showcase">
                        {portfolioData.expertise.map((skill, index) => {
                            const iconMap = {
                                'Code': <Code size={20} />,
                                'Smartphone': <Smartphone size={20} />,
                                'Brain': <Brain size={20} />,
                                'Database': <Database size={20} />,
                                'Palette': <Palette size={20} />
                            }
                            return (
                                <motion.div
                                    key={index}
                                    className="expertise-card"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
                                    viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                                >
                                    <div className="expertise-icon">
                                        {iconMap[skill.icon]}
                                    </div>
                                    <span>{skill.name}</span>
                                    <div className="expertise-level">
                                        <div className="level-bar">
                                            <div className="level-fill" style={{ width: `${85 + (index * 2)}%` }}></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default About
