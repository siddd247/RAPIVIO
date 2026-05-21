import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.75rem' }}>{title}</h2>
    <div style={{ color: '#AAAAAA', fontSize: '0.9rem', lineHeight: 1.8 }}>{children}</div>
  </div>
);

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div style={{ background: '#000000', minHeight: '100vh', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        <Link to="/" style={{ color: '#dface8', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-block', marginBottom: '3rem' }}>
          ← Back to Rapivio
        </Link>

        <p style={{ color: '#dface8', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Legal</p>
        <h1 style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.75rem' }}>Cookie Policy</h1>
        <p style={{ color: '#AAAAAA', fontSize: '0.85rem', marginBottom: '3.5rem' }}>Last updated: May 2025</p>

        <Section title="1. What Are Cookies">
          <p>Cookies are small text files stored on your device when you visit a website. They help sites remember information about your visit to improve your experience on return visits.</p>
        </Section>

        <Section title="2. Do We Use Cookies?">
          <p>Rapivio's website is a lightweight, client-side application. We do not currently deploy tracking cookies, advertising cookies, or third-party analytics cookies. We do not use Google Analytics, Meta Pixel, or similar tools.</p>
        </Section>

        <Section title="3. Essential Browser Behaviour">
          <p>Your browser may store minimal session data (such as scroll position or cached assets) as part of normal website operation. This is not data we collect or have access to — it is handled entirely by your browser.</p>
        </Section>

        <Section title="4. Third-Party Links">
          <p>Our site may contain links to external services. We are not responsible for the cookie practices of those third-party sites. We recommend reviewing their individual cookie policies.</p>
        </Section>

        <Section title="5. Your Choices">
          <p>You can control or delete cookies through your browser settings at any time. Disabling cookies will not affect your ability to use this website, as we do not rely on them for core functionality.</p>
        </Section>

        <Section title="6. Future Changes">
          <p>If we introduce analytics or tracking tools in the future, this policy will be updated and you will be informed via a cookie consent notice before any cookies are set.</p>
        </Section>

        <Section title="7. Contact">
          <p>Questions about cookies? Email us at <strong style={{ color: '#FFFFFF' }}>rapivio.ai@gmail.com</strong>.</p>
        </Section>

      </div>
    </div>
  );
}
