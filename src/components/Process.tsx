import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Search, Cpu, Plug, TrendingUp } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Analyze',
    description:
      'We audit your current workflow and identify the highest-impact automation opportunities.',
    icon: Search,
  },
  {
    number: '02',
    title: 'Build',
    description:
      'Our team builds custom AI pipelines tailored to your business and goals.',
    icon: Cpu,
  },
  {
    number: '03',
    title: 'Integrate',
    description:
      'We connect everything to your existing tools — CRM, calendar, inbox, whatever you use.',
    icon: Plug,
  },
  {
    number: '04',
    title: 'Optimize',
    description:
      'We monitor performance and keep improving so your results compound over time.',
    icon: TrendingUp,
  },
];

function StepCard({ number, title, description, icon: Icon }: Step) {
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
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'border-color 300ms, transform 300ms',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Step number */}
      <span
        style={{
          color: '#522959',
          fontWeight: 700,
          fontSize: '3rem',
          lineHeight: 1,
        }}
      >
        {number}
      </span>

      {/* Title */}
      <h3
        style={{
          color: '#FFFFFF',
          fontWeight: 600,
          fontSize: '1.25rem',
          marginTop: '1rem',
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          color: '#AAAAAA',
          fontSize: '0.875rem',
          lineHeight: 1.7,
          marginTop: '0.5rem',
          flex: 1,
        }}
      >
        {description}
      </p>

      {/* Decorative icon */}
      <div style={{ marginTop: '1.5rem' }}>
        <Icon size={20} color="#522959" />
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <section
      id="process"
      style={{ background: '#111111', padding: '7rem 1.5rem', width: '100%' }}
    >
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
            HOW IT WORKS
          </p>
          <h2
            style={{
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              lineHeight: 1.15,
            }}
          >
            From idea to automation
            <br />
            in four steps.
          </h2>
        </div>

        {/* Steps grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ marginTop: '4rem' }}
        >
          {STEPS.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </div>
    </section>
  );
}
