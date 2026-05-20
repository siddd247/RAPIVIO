import { Camera, MessageCircle, Briefcase, Video } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';

function SocialIcon({ icon: Icon, href }: { icon: LucideIcon; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? '#FFFFFF' : '#AAAAAA',
        transition: 'color 300ms',
      }}
    >
      <Icon size={18} />
    </a>
  );
}

function FooterLink({ text, href }: { text: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onClick={(e) => {
        if (href.startsWith('#')) {
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? '#FFFFFF' : '#AAAAAA',
        fontSize: '0.875rem',
        display: 'block',
        marginBottom: '0.5rem',
        transition: 'color 300ms',
        textDecoration: 'none',
      }}
    >
      {text}
    </a>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: '#000000',
        borderTop: '1px solid #2A114B',
        paddingTop: '5rem',
        paddingBottom: '2.5rem',
        width: '100%',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Top section grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1 */}
          <div>
            <p
              style={{
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '1.5rem',
                margin: 0,
              }}
            >
              Rapivio
            </p>
            <p
              style={{
                color: '#AAAAAA',
                fontSize: '0.875rem',
                marginTop: '0.5rem',
                lineHeight: 1.7,
              }}
            >
              AI automation for service businesses that want to grow.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <SocialIcon icon={Camera} href="#" />
              <SocialIcon icon={MessageCircle} href="#" />
              <SocialIcon icon={Briefcase} href="#" />
              <SocialIcon icon={Video} href="#" />
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.875rem',
                marginBottom: '1rem',
              }}
            >
              Services
            </h4>
            <FooterLink text="AI Lead Capture" href="#services" />
            <FooterLink text="AI Follow-Up" href="#services" />
            <FooterLink text="Workflow Automation" href="#services" />
            <FooterLink text="Custom AI Projects" href="#services" />
          </div>

          {/* Col 3 */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.875rem',
                marginBottom: '1rem',
              }}
            >
              Company
            </h4>
            <FooterLink text="Home" href="#hero" />
            <FooterLink text="About" href="#about" />
            <FooterLink text="Process" href="#process" />
            <FooterLink text="Case Studies" href="#case-studies" />
            <FooterLink text="Contact" href="#contact" />
          </div>

          {/* Col 4 */}
          <div>
            <h4
              style={{
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '0.875rem',
                marginBottom: '1rem',
              }}
            >
              Stay Updated
            </h4>
            <p
              style={{
                color: '#AAAAAA',
                fontSize: '0.875rem',
                marginBottom: '0.75rem',
              }}
            >
              Get automation tips and case studies.
            </p>
            <input
              type="email"
              placeholder="Your email address"
              style={{
                background: '#111111',
                border: '1px solid #2A114B',
                color: '#FFFFFF',
                borderRadius: '9999px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                width: '100%',
                outline: 'none',
                transition: 'border-color 200ms',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#522959')}
              onBlur={(e) => (e.target.style.borderColor = '#2A114B')}
            />
            <button
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = '#2A114B')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = '#522959')
              }
              style={{
                background: '#522959',
                color: '#FFFFFF',
                borderRadius: '9999px',
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                width: '100%',
                marginTop: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 300ms',
              }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: '1px solid #2A114B',
            marginTop: '4rem',
            paddingTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
          className="md:flex-row md:justify-between md:items-center md:gap-2"
        >
          <p style={{ color: '#AAAAAA', fontSize: '0.75rem', margin: 0 }}>
            © 2025 Rapivio. All rights reserved.
          </p>
          <p style={{ color: '#AAAAAA', fontSize: '0.75rem', margin: 0 }}>
            rapivio.agency
          </p>
        </div>
      </div>
    </footer>
  );
}
