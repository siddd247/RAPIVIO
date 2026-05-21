import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.75rem' }}>{title}</h2>
    <div style={{ color: '#AAAAAA', fontSize: '0.9rem', lineHeight: 1.8 }}>{children}</div>
  </div>
);

export default function PrivacyPolicy() {
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
        <h1 style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.75rem' }}>Privacy Policy</h1>
        <p style={{ color: '#AAAAAA', fontSize: '0.85rem', marginBottom: '3.5rem' }}>Last updated: May 2025</p>

        <Section title="1. Who We Are">
          <p>Rapivio is an AI automation agency that helps service businesses capture and convert leads automatically. We operate at <strong style={{ color: '#FFFFFF' }}>rapivio.ai@gmail.com</strong>.</p>
        </Section>

        <Section title="2. What Information We Collect">
          <p>When you submit our booking form, we collect:</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>Your full name</li>
            <li>Email address</li>
            <li>Phone number (optional — you may skip this)</li>
            <li>Your message or enquiry</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>We do not collect this information passively. You provide it willingly by submitting the form to initiate contact with us.</p>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the information you submit solely to:</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>Respond to your enquiry or booking request</li>
            <li>Schedule and conduct a discovery call</li>
            <li>Send follow-up communications related to your enquiry</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>We do not use your data for advertising, profiling, or any automated decision-making.</p>
        </Section>

        <Section title="4. Data Sharing">
          <p>We do not sell, rent, or share your personal information with any third parties, except where strictly necessary to operate our services (e.g. email delivery). Any such tools are used solely to facilitate communication with you.</p>
        </Section>

        <Section title="5. Data Retention">
          <p>We retain your submitted information only as long as necessary to fulfil the purpose for which it was provided — typically the duration of our engagement. If you wish for your data to be deleted, contact us at <strong style={{ color: '#FFFFFF' }}>rapivio.ai@gmail.com</strong> and we will action it promptly.</p>
        </Section>

        <Section title="6. Your Rights">
          <p>You have the right to:</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent at any time</li>
          </ul>
          <p style={{ marginTop: '0.75rem' }}>To exercise any of these rights, email us at <strong style={{ color: '#FFFFFF' }}>rapivio.ai@gmail.com</strong>.</p>
        </Section>

        <Section title="7. Security">
          <p>We take reasonable precautions to protect your information. However, no method of transmission over the internet is 100% secure. We recommend you do not share sensitive personal information beyond what is necessary in your message.</p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>We may update this Privacy Policy occasionally. Changes will be posted on this page with an updated date. Continued use of our site after changes constitutes acceptance.</p>
        </Section>

        <Section title="9. Contact">
          <p>For any privacy-related questions, contact us at <strong style={{ color: '#FFFFFF' }}>rapivio.ai@gmail.com</strong>.</p>
        </Section>

      </div>
    </div>
  );
}
