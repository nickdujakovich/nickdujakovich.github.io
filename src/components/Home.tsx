import { content } from '../data/content'
import { StarIcon, TeamIcon, CheckmarkIcon, EmailIcon } from '../icons'
import mePhoto from '../assets/me.jpg'
import amerisaveLogo from '../assets/amerisave.png'
import capitaloneLogo from '../assets/capitalone.png'

export function Home() {
    return (
        <section>
            <div className="home-hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>{content.home.title}</h1>
                        <p className="hero-subtitle">Senior Software Engineer</p>
                        <p className="hero-description">
                            I build scalable applications, lead engineering teams, and drive technical excellence.
                            Experienced in crafting high-impact solutions at <strong>AmeriSave Mortgage</strong> and
                            <strong> Capital One</strong>.
                        </p>
                        <div className="company-highlights">
                            <div className="company-badge amerisave">
                                <div className="company-logo">
                                    <img src={amerisaveLogo} alt="AmeriSave Mortgage" />
                                </div>
                            </div>
                            <div className="company-badge capitalone">
                                <div className="company-logo">
                                    <img src={capitaloneLogo} alt="Capital One" />
                                </div>
                            </div>
                        </div>
                        <div className="hero-stats">
                            <div className="stat">
                                <span className="stat-number">5+</span>
                                <span className="stat-label">Years Experience</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">4+</span>
                                <span className="stat-label">Major Projects Led</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">∞</span>
                                <span className="stat-label">Cups of Coffee</span>
                            </div>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={mePhoto} alt="Nikolas Dujakovich" className="profile-photo" />
                    </div>
                </div>
            </div>

            <div className="home-highlights">
                <div className="highlight-card">
                    <div className="highlight-icon">
                        <StarIcon width={24} height={24} />
                    </div>
                    <div className="highlight-content">
                        <h3>Full-Stack Expertise</h3>
                        <p>React, Vue, SolidJS, Node.js, Spring Boot, AWS, and modern cloud architectures</p>
                    </div>
                </div>

                <div className="highlight-card">
                    <div className="highlight-icon">
                        <TeamIcon width={24} height={24} />
                    </div>
                    <div className="highlight-content">
                        <h3>Team Leadership</h3>
                        <p>Leading developers and mentoring junior engineers to success</p>
                    </div>
                </div>

                <div className="highlight-card">
                    <div className="highlight-icon">
                        <CheckmarkIcon width={24} height={24} />
                    </div>
                    <div className="highlight-content">
                        <h3>AI Integration</h3>
                        <p>Building AI-powered applications with OpenAI GPT-5 and machine learning</p>
                    </div>
                </div>
            </div>

            <div className="home-cta">
                <h2>Let's Build Something Amazing</h2>
                <p>Ready to discuss your next project, explore opportunities, or just chat about technology?</p>
                <div className="cta-buttons">
                    <a href="#about" className="cta-button primary" onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        <StarIcon width={16} height={16} />
                        View My Work
                    </a>
                    <a href="#contact" className="cta-button secondary" onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        <EmailIcon width={16} height={16} />
                        Get In Touch
                    </a>
                </div>
            </div>
        </section>
    )
}
