import { content } from '../data/content'
import { EmailIcon, PhoneIcon, LocationIcon, LinkedInIcon } from '../icons'

export function Contact() {
    return (
        <section>
            <div className="contact-hero">
                <h1>{content.contact.title}</h1>
                <p>Let's connect and discuss opportunities, collaborations, or just have a chat about technology and innovation.</p>
            </div>

            <div className="contact-info">
                <div className="contact-item">
                    <div className="contact-label">
                        <EmailIcon width={20} height={20} />
                        Email
                    </div>
                    <a href={`mailto:${content.contact.email}`} className="contact-value">
                        {content.contact.email}
                    </a>
                </div>

                <div className="contact-item">
                    <div className="contact-label">
                        <PhoneIcon width={20} height={20} />
                        Phone
                    </div>
                    <a href={`tel:${content.contact.phone}`} className="contact-value">
                        {content.contact.phone}
                    </a>
                </div>

                <div className="contact-item">
                    <div className="contact-label">
                        <LocationIcon width={20} height={20} />
                        Location
                    </div>
                    <span className="contact-value">
                        {content.contact.location}
                    </span>
                </div>

                <div className="contact-item">
                    <div className="contact-label">
                        <LinkedInIcon width={20} height={20} />
                        LinkedIn
                    </div>
                    <a href={`https://${content.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-value">
                        {content.contact.linkedin}
                    </a>
                </div>
            </div>

            <div className="contact-cta">
                <h2>Ready to work together?</h2>
                <p>I'm always interested in new opportunities, whether it's a full-time role, freelance project, or just a conversation about technology.</p>
                <div className="contact-cta-buttons">
                    <a href={`mailto:${content.contact.email}`} className="cta-button primary">
                        <EmailIcon width={16} height={16} />
                        Send Email
                    </a>
                    <a href={`https://${content.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="cta-button secondary">
                        <LinkedInIcon width={16} height={16} />
                        Connect on LinkedIn
                    </a>
                </div>
            </div>
        </section>
    )
}