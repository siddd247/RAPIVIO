import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.75rem' }}>{title}</h2>
    <div style={{ color: '#AAAAAA', fontSize: '0.9rem', lineHeight: 1.8 }}>{children}</div>
  </div>
);

export default function TermsOfService() {
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
        <h1 style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.75rem' }}>Terms of Service</h1>
        <p style={{ color: '#AAAAAA', fontSize: '0.85rem', marginBottom: '3.5rem' }}>Last updated: May 2025</p>

        <Section title="1. Acceptance of Terms">
          <p>By accessing this website or submitting a booking request to Rapivio, you agree to be bound by these Terms of Service. If you do not agree, please do not use our site or services.</p>
        </Section>

        <Section title="2. Services">
          <p>Rapivio provides AI automation services including but not limited to lead capture systems, automated follow-up pipelines, workflow automation, and custom AI solutions for service businesses. The specific scope of work is agreed upon between Rapivio and the client prior to engagement.</p>
        </Section>

        <Section title="3. Booking & Enquiries">
          <p>Submitting the booking form on this site initiates a discovery process only. It does not constitute a binding contract or guarantee of service delivery. All engagements are formalised through a separate agreement.</p>
        </Section>

        <Section title="4. Client Responsibilities">
          <p>You agree to:</p>
          <ul style={{ paddingLeft: '1.25rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <li>Provide accurate and truthful information when contacting us</li>
            <li>Cooperate in providing access to tools, credentials, or information required to deliver the agreed service</li>
            <li>Not use our services for any unlawful purpose</li>
          </ul>
        </Section>

        <Section title="5. Intellectual Property">
          <p>All content on this website — including text, design, and code — is the property of Rapivio. Custom deliverables built for clients are transferred upon full payment as agreed in the service contract.</p>
        </Section>

        <Section title="6. Limitation of Liability">
          <p>Rapivio provides services on a best-effort basis. We are not liable for indirect, incidental, or consequential damages arising from the use of our services. Our total liability is limited to the amount paid for the specific service in question.</p>
        </Section>

        <Section title="7. Satisfaction Guarantee">
          <p>We stand behind our work. If agreed benchmarks are not met, we will continue working at no additional charge until they are — as detailed in the individual service agreement.</p>
        </Section>

        <Section title="8. Termination">
          <p>Either party may terminate an engagement with written notice as specified in the service agreement. Fees for work completed up to the termination date remain due.</p>
        </Section>

        <Section title="9. Governing Law">
          <p>These terms are governed by the laws of India. Any disputes shall be subject to the jurisdiction of courts in Jammu, Jammu & Kashmir, India.</p>
        </Section>

        <Section title="10. Changes to Terms">
          <p>We reserve the right to update these terms at any time. Continued use of our services after changes constitutes acceptance of the revised terms.</p>
        </Section>

        <Section title="11. Contact">
          <p>Questions about these terms? Reach us at <strong style={{ color: '#FFFFFF' }}>rapivio.ai@gmail.com</strong>.</p>
        </Section>

      </div>
    </div>
  );
}
