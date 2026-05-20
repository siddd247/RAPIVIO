import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CTABanner() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="contact"
      className="section-fade-bottom"
      style={{
        background: '#000000',
        padding: '7rem 1.5rem',
        width: '100%',
        position: 'relative',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2
          className="font-extrabold md:text-6xl"
          style={{
            color: '#FFFFFF',
            fontSize: '2.5rem', // fallback for non-md (4xl)
            lineHeight: 1.15,
            maxWidth: '48rem',
          }}
        >
          Let AI do the work<br />so you can <span style={{ color: '#dface8' }}>scale faster.</span>
        </h2>

        <p
          className="text-base"
          style={{
            color: '#AAAAAA',
            marginTop: '1rem',
            maxWidth: '36rem',
            lineHeight: 1.6,
          }}
        >
          Book a free 30-minute strategy call. No pitch, no pressure — just
          clarity.
        </p>

        <Link
          to="/book"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="font-semibold text-base transition-all duration-300"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: hovered ? '#dface8' : '#824D69',
            color: '#FFFFFF',
            padding: '1rem 2rem',
            borderRadius: '9999px',
            marginTop: '2rem',
            textDecoration: 'none',
          }}
        >
          Book a Free Call
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>
        </Link>
      </div>
    </section>
  );
}
