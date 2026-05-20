import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CTABanner() {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id="contact"
      style={{
        background: 'linear-gradient(to bottom, #111111, #000000)',
        padding: '7rem 1.5rem',
        width: '100%',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
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
          Let AI do the work so
          <br />
          you can <span style={{ color: '#522959' }}>scale faster.</span>
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
            display: 'inline-block',
            background: hovered ? '#2A114B' : '#522959',
            color: '#FFFFFF',
            padding: '1rem 2rem',
            borderRadius: '9999px',
            marginTop: '2rem',
            textDecoration: 'none',
          }}
        >
          Book a Free Call &rarr;
        </Link>
      </div>
    </section>
  );
}
