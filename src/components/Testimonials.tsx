import { useState } from 'react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "The AI follow-up system paid for itself in the first week. We captured three clients we would have lost.",
    name: "Sarah K.",
    role: "Director @ PhysioFlow",
  },
  {
    quote: "I was skeptical about AI. Now I can't imagine running the business without it.",
    name: "James T.",
    role: "Founder @ LegalEdge",
  },
  {
    quote: "Setup was fast, the team was responsive, and the results were immediate.",
    name: "Priya M.",
    role: "Owner @ FitCore Studios",
  },
  {
    quote: "Our booking rate jumped 60% and we didn't have to hire anyone new.",
    name: "Dr. Arjun S.",
    role: "Principal @ BrightSmile Dental",
  },
];

function TestimonialCard({ quote, name, role }: Testimonial) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#000000',
        border: `1px solid ${hovered ? '#522959' : '#2A114B'}`,
        borderRadius: '1rem',
        padding: '2rem',
        transition: 'border-color 300ms',
      }}
    >
      <div
        style={{
          color: '#522959',
          fontSize: '3rem',
          fontWeight: 700,
          lineHeight: 1,
          fontFamily: 'serif',
          marginBottom: '0.5rem',
        }}
      >
        "
      </div>
      <p
        style={{
          color: '#AAAAAA',
          fontSize: '0.875rem',
          lineHeight: 1.7,
        }}
      >
        {quote}
      </p>
      <div style={{ marginTop: '1.5rem' }}>
        <p
          style={{
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        >
          {name}
        </p>
        <p
          style={{
            color: '#AAAAAA',
            fontSize: '0.75rem',
            marginTop: '0.125rem',
          }}
        >
          {role}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section style={{ background: '#111111', padding: '7rem 1.5rem', width: '100%' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div>
          <p
            style={{
              color: '#522959',
              fontSize: '0.75rem',
              letterSpacing: '0.2em',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            TESTIMONIALS
          </p>
          <h2
            style={{
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              lineHeight: 1.15,
            }}
          >
            Trusted by founders
            <br />
            who move fast.
          </h2>
        </div>

        {/* Testimonials grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ marginTop: '4rem' }}
        >
          {TESTIMONIALS.map((testimonial, idx) => (
            <TestimonialCard key={idx} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
