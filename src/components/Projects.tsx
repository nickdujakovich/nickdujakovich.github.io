import { content } from '../data/content'
import { GitHubIcon, CheckmarkIcon } from '../icons'

export function Projects() {
    return (
        <section>
            <div className="projects-hero">
                <h1>{content.projects.title}</h1>
                <p>Showcasing my latest work in full-stack development, AI integration, and scalable application architecture.</p>
            </div>

            <div className="projects-grid">
                {content.projects.items.map((project, index) => (
                    <div key={index} className={`project-card ${project.isPersonal ? 'personal' : 'professional'}`}>
                        <div className="project-type-header">
                            <span className={`project-type ${project.isPersonal ? 'personal' : 'professional'}`}>
                                {project.isPersonal ? 'Personal Project' : 'Professional Work'}
                            </span>
                        </div>
                        <div className="project-header">
                            <h3>{project.name}</h3>
                            <div className="project-links">
                                {project.links.github ? (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link github"
                                    >
                                        <GitHubIcon width={16} height={16} />
                                        Code
                                    </a>
                                ) : (
                                    <span className="project-link github private">
                                        <GitHubIcon width={16} height={16} />
                                        Private
                                    </span>
                                )}
                                {project.inDevelopment ? (
                                    <span className="project-link demo in-dev">
                                        <CheckmarkIcon width={16} height={16} />
                                        In Dev
                                    </span>
                                ) : project.links.demo ? (
                                    <a
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="project-link demo"
                                    >
                                        <CheckmarkIcon width={16} height={16} />
                                        Demo
                                    </a>
                                ) : (
                                    <span className="project-link demo private">
                                        <CheckmarkIcon width={16} height={16} />
                                        Private
                                    </span>
                                )}
                            </div>
                        </div>

                        <p className="project-description">{project.description}</p>

                        <div className="project-technologies">
                            {project.technologies.map((tech, techIndex) => (
                                <span key={techIndex} className="tech-tag">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
