import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Zap, Clock, BarChart2, Settings, Shield, Handshake } from 'lucide-react';

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: Zap,
    title: 'Always-On Automation',
    description: 'AI agents that work 24/7, capturing and nurturing leads while you sleep.',
  },
  {
    icon: Clock,
    title: 'Instant Response',
    description: 'Respond to every inquiry in under 60 seconds, no human needed.',
  },
  {
    icon: BarChart2,
    title: 'Data-Driven Results',
    description: 'Every automation is tracked, measured, and optimized for maximum ROI.',
  },
  {
    icon: Settings,
    title: 'Built to Fit You',
    description: "We don't use templates. Every system is custom-built for your workflow.",
  },
  {
    icon: Shield,
    title: 'Enterprise-Grade Reliability',
    description: 'Uptime guarantees, secure data handling, and failover systems built in.',
  },
  {
    icon: Handshake,
    title: 'Ongoing Partnership',
    description: "We don't disappear after launch. We stay and scale with you.",
  },
];

function BenefitCard({ icon: Icon, title, description }: Benefit) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#000000',
        border: `1px solid ${hovered ? '#dface8' : '#2A114B'}`,
        borderRadius: '1rem',
        padding: '2rem',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'border-color 300ms, transform 300ms',
      }}
    >
      <div
        style={{
          background: '#111111',
          borderRadius: '0.75rem',
          padding: '0.75rem',
          width: 'fit-content',
        }}
      >
        <Icon size={28} color="#dface8" />
      </div>
      <h3
        style={{
          color: '#FFFFFF',
          fontWeight: 600,
          fontSize: '1.125rem',
          marginTop: '1.25rem',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: '#AAAAAA',
          fontSize: '0.875rem',
          lineHeight: 1.7,
          marginTop: '0.5rem',
        }}
      >
        {description}
      </p>
    </div>
  );
}

export default function Benefits() {
  return (
    <section
      id="about"
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
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
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
            WHY RAPIVIO
          </p>
          <h2
            style={{
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              lineHeight: 1.15,
            }}
          >
            Built for businesses<br />that can't slow down.
          </h2>
        </div>

        {/* Benefits grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ marginTop: '4rem' }}
        >
          {BENEFITS.map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}
