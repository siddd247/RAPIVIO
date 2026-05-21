import { CardSpotlight } from './ui/card-spotlight';
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
  return (
    <CardSpotlight
      className="h-full"
      color="#1a0a2e"
      radius={300}
      style={{
        background: '#000000',
        border: `1px solid #2A114B`,
        borderRadius: '1rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Step number */}
      <span
        style={{
          color: '#dface8',
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
        <Icon size={20} color="#dface8" />
      </div>
    </CardSpotlight>
  );
}

export default function Process() {
  return (
    <section
      id="process"
      className="section-fade-bottom"
      style={{
        background: '#000000',
        padding: '7rem 1.5rem',
        width: '100%',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
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
            HOW IT WORKS
          </p>
          <h2
            style={{
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 'clamp(1.3rem, 6.2vw, 3.5rem)',
              lineHeight: 1.15,
            }}
          >
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>From idea to automation</span>
            <span style={{ display: 'block', whiteSpace: 'nowrap' }}>in four steps.</span>
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
