import { Mail } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const InstagramIcon = ({ color, style }: { color?: string; style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color || 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const TwitterIcon = ({ color, style }: { color?: string; style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={color || 'currentColor'} style={style}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const YoutubeIcon = ({ color, style }: { color?: string; style?: React.CSSProperties }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={color || 'currentColor'} style={style}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
);

function SocialButton({
  icon: Icon,
  href,
  hoverColor,
}: {
  icon: any;
  href: string;
  hoverColor: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-10 h-10 rounded-full border border-[#522959] flex items-center justify-center transition-all duration-300"
      style={{
        textDecoration: 'none',
      }}
    >
      <Icon
        size={18}
        color={hovered ? hoverColor : '#FFFFFF'}
        style={{ transition: 'color 300ms' }}
      />
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

function FooterLegalLink({ text, to }: { text: string; to: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
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
    </Link>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: '#000000',
        borderTop: '1px solid #2A114B',
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        width: '100%',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* Top section grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Col 1 — Brand */}
          <div className="md:col-span-2">
            <p style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.5rem', margin: 0 }}>
              Rapivio
            </p>
            <p style={{ color: '#AAAAAA', fontSize: '0.875rem', marginTop: '0.5rem', lineHeight: 1.7 }}>
              AI automation for service businesses that want to grow.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', alignItems: 'center' }}>
              <SocialButton icon={InstagramIcon} href="#" hoverColor="#E1306C" />
              <SocialButton icon={TwitterIcon} href="#" hoverColor="#1DA1F2" />
              <SocialButton icon={YoutubeIcon} href="#" hoverColor="#FF0000" />
              <SocialButton icon={Mail} href="#" hoverColor="#824D69" />
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>
              Services
            </h4>
            <FooterLink text="AI Lead Capture" href="#services" />
            <FooterLink text="AI Follow-Up" href="#services" />
            <FooterLink text="Workflow Automation" href="#services" />
            <FooterLink text="Custom AI Projects" href="#services" />
          </div>

          {/* Col 3 — Legal */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>
              Legal
            </h4>
            <FooterLegalLink text="Privacy Policy" to="/privacy" />
            <FooterLegalLink text="Terms of Service" to="/terms" />
            <FooterLegalLink text="Cookie Policy" to="/cookies" />
          </div>

          {/* Col 4 — Socials */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.875rem', marginBottom: '1rem' }}>
              Socials
            </h4>
            <FooterLink text="Instagram" href="#" />
            <FooterLink text="X (Twitter)" href="#" />
            <FooterLink text="YouTube" href="#" />
            <FooterLink text="Email" href="#" />
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: '1px solid #2A114B',
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
          className="md:flex-row md:justify-between md:items-center md:gap-2"
        >
          <p style={{ color: '#AAAAAA', fontSize: '0.75rem', margin: 0 }}>
            © 2026 Rapivio. All rights reserved.
          </p>
          <p style={{ color: '#AAAAAA', fontSize: '0.75rem', margin: 0 }}>
            rapivio.agency
          </p>
        </div>
      </div>
    </footer>
  );
}
