import { MessageSquare, Zap, BrainCircuit, Check } from 'lucide-react';
import { useState } from 'react';

/* ─────────────────────────────────────────
   Pill tag helper
───────────────────────────────────────── */
function Tag({
  children,
  variant = 'outline',
}: {
  children: string;
  variant?: 'outline' | 'filled-mauve' | 'filled-violet' | 'filled-dark';
}) {
  const styles: Record<string, React.CSSProperties> = {
    outline: { border: '1px solid #dface8', color: '#AAAAAA', background: 'transparent' },
    'filled-mauve': { background: '#dface8', color: '#FFFFFF', border: 'none' },
    'filled-violet': { background: '#2A114B', color: '#AAAAAA', border: 'none' },
    'filled-dark': { background: '#111111', color: '#AAAAAA', border: 'none' },
  };
  return (
    <span
      style={{
        ...styles[variant],
        fontSize: '0.7rem',
        borderRadius: '9999px',
        padding: '0.2rem 0.75rem',
        display: 'inline-block',
        fontWeight: 500,
        letterSpacing: '0.03em',
      }}
    >
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────
   Card 1 — AI Lead Capture (full-width)
───────────────────────────────────────── */
function LeadCaptureCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="lg:col-span-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'linear-gradient(135deg, #150E1A 0%, #2A114B 100%)',
        border: `1px solid ${hovered ? '#AAAAAA' : '#dface8'}`,
        borderRadius: '1.5rem',
        padding: '2.5rem',
        transition: 'border-color 300ms',
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
      }}
    >
      {/* Inner row: text left, mock UI right */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2.5rem',
          alignItems: 'center',
        }}
      >
        {/* LEFT */}
        <div style={{ flex: '1 1 260px' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <Tag variant="filled-mauve">Core Service</Tag>
          </div>
          <h3
            style={{
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '1.875rem',
              marginBottom: '1rem',
              lineHeight: 1.15,
            }}
          >
            AI Lead Capture
          </h3>
          <p
            style={{
              color: '#AAAAAA',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              maxWidth: '24rem',
            }}
          >
            We build intelligent systems that capture leads from your website,
            ads, and social — automatically qualifying and storing them in real
            time.
          </p>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['Lead Forms', 'CRM Sync', 'Real-Time'].map((t) => (
              <Tag key={t} variant="outline">{t}</Tag>
            ))}
          </div>
        </div>

        {/* RIGHT — mock UI card */}
        <div
          style={{
            flex: '0 0 auto',
            minWidth: '240px',
            background: '#150E1A',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid #2A114B',
          }}
        >
          <p style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.85rem', marginBottom: '1rem' }}>
            New Lead
          </p>
          {[
            { label: 'Name', value: 'Alex Morgan' },
            { label: 'Email', value: 'alex@company.io' },
            { label: 'Source', value: 'Landing Page' },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.5rem 0',
                borderBottom: '1px solid #111111',
              }}
            >
              <span style={{ color: '#dface8', fontSize: '0.7rem', fontWeight: 500 }}>{label}</span>
              <span style={{ color: '#AAAAAA', fontSize: '0.7rem' }}>{value}</span>
            </div>
          ))}
          <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              className="live-dot"
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#dface8',
                display: 'inline-block',
                boxShadow: '0 0 6px #dface8',
              }}
            />
            <span style={{ color: '#dface8', fontSize: '0.7rem', fontWeight: 500 }}>
              Captured &amp; Synced
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Card 2 — AI Follow-Up
───────────────────────────────────────── */
function FollowUpCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#150E1A',
        border: `1px solid ${hovered ? '#dface8' : '#2A114B'}`,
        borderRadius: '1.5rem',
        padding: '2rem',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'border-color 300ms, transform 300ms',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <MessageSquare size={28} color="#dface8" style={{ marginBottom: '1.25rem' }} />
      <div style={{ marginBottom: '0.75rem' }}>
        <Tag variant="filled-violet">Always On</Tag>
      </div>
      <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.75rem' }}>
        AI Follow-Up
      </h3>
      <p style={{ color: '#AAAAAA', fontSize: '0.875rem', lineHeight: 1.7 }}>
        The moment a lead comes in, our AI sends a personalized message — via
        email or WhatsApp. No delays. No missed opportunities.
      </p>
      <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
        <p style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '2.5rem', lineHeight: 1 }}>
          &lt; 60s
        </p>
        <p style={{ color: '#dface8', fontSize: '0.7rem', letterSpacing: '0.08em', marginTop: '0.35rem', textTransform: 'uppercase' }}>
          average response time
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Card 3 — Workflow Automation
───────────────────────────────────────── */
function WorkflowCard() {
  const [hovered, setHovered] = useState(false);
  const items = ['Automated reporting', 'Smart scheduling', 'Task delegation bots'];
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#150E1A',
        border: '1px solid #2A114B',
        borderRadius: '1.5rem',
        padding: '2rem',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 300ms',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Zap size={28} color="#FFFFFF" style={{ marginBottom: '1.25rem' }} />
      <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.75rem' }}>
        Workflow Automation
      </h3>
      <p style={{ color: '#AAAAAA', fontSize: '0.875rem', lineHeight: 1.7 }}>
        Eliminate repetitive tasks. We automate internal operations so your team
        focuses on growth.
      </p>
      <div style={{ marginTop: '1.5rem' }}>
        {items.map((item, i) => (
          <div
            key={item}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.6rem 0',
              borderBottom: i < items.length - 1 ? '1px solid rgba(130,77,105,0.3)' : 'none',
            }}
          >
            <Check size={14} color="#FFFFFF" strokeWidth={2.5} />
            <span style={{ color: '#FFFFFF', fontSize: '0.875rem' }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Card 4 — Custom AI Projects
───────────────────────────────────────── */
function CustomAICard() {
  const [hovered, setHovered] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#150E1A',
        border: `1px solid ${hovered ? '#dface8' : '#2A114B'}`,
        borderRadius: '1.5rem',
        padding: '2rem',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'border-color 300ms, transform 300ms',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <BrainCircuit size={28} color="#dface8" style={{ marginBottom: '1.25rem' }} />
      <div style={{ marginBottom: '1rem' }}>
        <Tag variant="filled-dark">Bespoke</Tag>
      </div>
      <h3 style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.5rem', marginBottom: '0.75rem' }}>
        Custom AI Projects
      </h3>
      <p style={{ color: '#AAAAAA', fontSize: '0.875rem', lineHeight: 1.7 }}>
        Unique challenge? We consult and build AI systems tailored entirely to
        your business goals.
      </p>
      <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
        <button
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            color: ctaHovered ? '#AAAAAA' : '#dface8',
            fontSize: '0.875rem',
            fontWeight: 600,
            transition: 'color 200ms',
            fontFamily: 'inherit',
          }}
        >
          Talk to us →
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Services export
───────────────────────────────────────── */
export default function Services() {
  return (
    <section
      id="services"
      className="section-fade-bottom"
      style={{
        width: '100%',
        background: '#000000',
        padding: '7rem 1.5rem',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* ─── Header ─── */}
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto', marginBottom: '5rem' }}>
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
            WHAT WE DO
          </p>
          <h2
            style={{
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 'clamp(3rem, 6vw, 4.5rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            AI that works<br />while you sleep.
          </h2>
          <p
            style={{
              color: '#AAAAAA',
              fontSize: '1.1rem',
              maxWidth: '32rem',
              marginTop: '1.25rem',
              lineHeight: 1.7,
            }}
          >
            From first click to booked appointment — Rapivio automates your
            entire lead pipeline.
          </p>
        </div>

        {/* ─── Bento grid ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <LeadCaptureCard />
          <FollowUpCard />
          <WorkflowCard />
          <CustomAICard />
        </div>
      </div>
    </section>
  );
}
