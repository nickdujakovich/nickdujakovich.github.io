import { content } from '../data/content'
import parse from 'html-react-parser'
import { StarIcon } from '../icons'

export function About() {
    return (
        <section>
            <div className="about-hero">
                <h1>{content.about.title}</h1>
                <p className="about-summary">{content.about.description}</p>
                <p className="about-background">{content.about.background.description}</p>
            </div>

            <div className="about-timeline-section">
                <div className="experience-flow">
                    {content.about.experience.items.map((job, index) => (
                        <div key={index} className={`flow-node ${job.progression || ''}`} style={{ '--custom-border': job.hoverColor } as React.CSSProperties}>
                            <div className="node-content">
                                <div className="role-container">
                                    <div className="role-title">{job.role}</div>
                                    <div className="company-name" style={{ color: job.color }}>{job.company}</div>
                                    <div className="time-period">{job.period}</div>
                                </div>
                                <div className="image-container">
                                    <img src={job.image} alt={job.role} />
                                </div>
                            </div>
                            <div className="achievements">
                                {job.highlights.map((highlight, hIndex) => (
                                    <div key={hIndex} className="achievement-item" style={{ '--custom-highlight-hover': job.highlightHoverColor } as React.CSSProperties}>
                                        {parse(highlight)}
                                    </div>
                                ))}
                            </div>

                            {/* Nested sub-roles for Capital One */}
                            {job.subRoles && (
                                <div className="sub-roles">
                                    {job.subRoles.map((subRole, subIndex) => (
                                        <div key={subIndex} className="sub-role" style={{ '--custom-highlight-hover': subRole.highlightHoverColor } as React.CSSProperties}>
                                            <div className="sub-role-header">
                                                <span className="sub-role-title">{subRole.role}</span>
                                                <span className="sub-role-period">{subRole.period}</span>
                                            </div>
                                            <div className="sub-role-highlights">
                                                {subRole.highlights.map((highlight, hIndex) => (
                                                    <div key={hIndex} className="sub-role-highlight" style={{ '--custom-highlight-hover': subRole.highlightHoverColor } as React.CSSProperties}>
                                                        {parse(highlight)}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="about-additional-content">
                    <div className="about-card skills-section">
                        <h2>{content.about.skills.title}</h2>
                        <div className="skills-grid">
                            {content.about.skills.items.map((skill, index) => (
                                <div key={index} className="skill-category">
                                    <h4>{skill.category}</h4>
                                    <p>{skill.technologies}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="about-card education-card">
                        <h2>{content.about.education.title}</h2>
                        <div className="education-content">
                            <div className="education-main">
                                <div className="education-degree">
                                    <h3>{content.about.education.degree} in {content.about.education.major}</h3>
                                    <div className="education-school">{content.about.education.school}</div>
                                    <div className="education-period">{content.about.education.graduation}</div>
                                </div>
                            </div>

                            {content.about.education.extracurriculars && content.about.education.extracurriculars.length > 0 && (
                                <div className="education-extracurriculars">
                                    <h4>Leadership & Activities</h4>
                                    <div className="extracurricular-list">
                                        {content.about.education.extracurriculars.map((activity, index) => (
                                            <div key={index} className="extracurricular-item">
                                                <div className="activity-icon">
                                                    <StarIcon width={16} height={16} />
                                                </div>
                                                <span className="activity-text">{activity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="about-footer">
                    <h2>{content.about.whatIDo.title}</h2>
                    <p>{content.about.whatIDo.description}</p>
                </div>
            </div>
        </section>
    )
}
