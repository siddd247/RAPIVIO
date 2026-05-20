import { useRef, useState, useEffect } from 'react';

interface Stat {
  value: string;
  label: string;
}

interface CaseStudy {
  company: string;
  industry: string;
  quote: string;
  stats: [Stat, Stat, Stat, Stat];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    company: 'PhysioFlow',
    industry: 'Healthcare',
    quote: 'Rapivio cut our lead response time from 2 days to under a minute.',
    stats: [
      { value: '3×', label: 'Leads Captured' },
      { value: '94%', label: 'Follow-Up Rate' },
      { value: '<60s', label: 'Response Time' },
      { value: '2 Mo.', label: 'ROI' },
    ],
  },
  {
    company: 'LegalEdge',
    industry: 'Law Firm',
    quote: 'We used to lose clients to faster firms. Not anymore.',
    stats: [
      { value: '5×', label: 'More Consultations' },
      { value: '80%', label: 'Less Manual Work' },
      { value: '40%', label: 'Close Rate' },
      { value: '6 Wks', label: 'ROI' },
    ],
  },
  {
    company: 'FitCore Studios',
    industry: 'Fitness',
    quote: 'Our DMs are handled automatically. We just show up and coach.',
    stats: [
      { value: '200+', label: 'Leads/Month' },
      { value: '70%', label: 'Conversion Lift' },
      { value: '0', label: 'Missed Follow-Ups' },
      { value: '3 Mo.', label: 'ROI' },
    ],
  },
  {
    company: 'BrightSmile Dental',
    industry: 'Healthcare',
    quote: 'Appointment bookings went up 60% in the first month.',
    stats: [
      { value: '60%', label: 'More Bookings' },
      { value: '88%', label: 'Show Rate' },
      { value: '24/7', label: 'Lead Capture' },
      { value: '45d', label: 'ROI' },
    ],
  },
];

function Card({ company, industry, quote, stats }: CaseStudy) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: '320px',
        background: '#150E1A',
        border: `1px solid ${hovered ? '#dface8' : '#2A114B'}`,
        borderRadius: '1rem',
        padding: '2rem',
        transition: 'border-color 300ms',
        userSelect: 'none',
        flexShrink: 0,
      }}
    >
      {/* Company + industry tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.125rem' }}>
          {company}
        </span>
        <span
          style={{
            background: '#2A114B',
            color: '#AAAAAA',
            fontSize: '0.7rem',
            borderRadius: '9999px',
            padding: '0.2rem 0.75rem',
            fontWeight: 500,
          }}
        >
          {industry}
        </span>
      </div>

      {/* Quote */}
      <p
        style={{
          color: '#AAAAAA',
          fontSize: '0.875rem',
          fontStyle: 'italic',
          lineHeight: 1.7,
          marginTop: '1rem',
        }}
      >
        "{quote}"
      </p>

      {/* Stats grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
          marginTop: '1.5rem',
        }}
      >
        {stats.map(({ value, label }) => (
          <div
            key={label}
            style={{
              background: '#000000',
              borderRadius: '0.75rem',
              padding: '0.75rem',
            }}
          >
            <p style={{ color: '#dface8', fontWeight: 700, fontSize: '1.25rem', lineHeight: 1 }}>
              {value}
            </p>
            <p style={{ color: '#AAAAAA', fontSize: '0.7rem', marginTop: '0.25rem' }}>
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const speed = useRef(0.5);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    const totalWidth = track.scrollWidth / 2;

    const tick = () => {
      pos += speed.current;
      if (pos >= totalWidth) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const CARDS = [...CASE_STUDIES, ...CASE_STUDIES];

  return (
    <section
      id="case-studies"
      className="section-fade-bottom"
      style={{
        background: '#000000',
        padding: '7rem 0',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Header — constrained width */}
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', padding: '0 1.5rem', marginBottom: '3rem' }}>
        <p
          style={{
            color: '#dface8',
            fontSize: '1.13rem',
            letterSpacing: '0.2em',
            fontWeight: 600,
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          CASE STUDIES
        </p>
        <h2
          style={{
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            lineHeight: 1.15,
          }}
        >
          Real results,<br />real businesses.
        </h2>
      </div>

      {/* Auto-scrolling carousel */}
      <div
        style={{
          overflow: 'hidden',
          cursor: 'default',
          paddingLeft: 'max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))',
          paddingRight: '1.5rem',
          paddingBottom: '0.5rem',
        }}
      >
        <div
          ref={trackRef}
          onMouseEnter={() => { speed.current = 0.1; }}
          onMouseLeave={() => { speed.current = 0.5; }}
          style={{
            display: 'flex',
            gap: '1.5rem',
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {CARDS.map((cs, i) => (
            <Card key={`${cs.company}-${i}`} {...cs} />
          ))}
        </div>
      </div>
    </section>
  );
}
