import { MessageSquare, Zap, BrainCircuit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RevealWrapper } from './ui/RevealWrapper';
import { AmbientLight } from './ui/AmbientLight';

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
  return (
    <div
      className="lg:col-span-2 service-card-beam"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1a0f2e 0%, #2A114B 60%, #1a0f2e 100%)',
        boxShadow: '0 0 60px rgba(42, 17, 75, 0.6), inset 0 1px 0 rgba(223, 172, 232, 0.1)',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
      }}
    >
      {/* Large radial glow blob behind mock UI */}
      <div style={{
        position: 'absolute',
        top: '-60px',
        right: '-60px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(223, 172, 232, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Inner row: text left, mock UI right */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2.5rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
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
        <motion.div
          whileHover={{
            y: -4,
            scale: 1.02,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{
            flex: '0 0 auto',
            minWidth: '240px',
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(223, 172, 232, 0.15)',
            position: 'relative',
            zIndex: 1,
            cursor: 'default',
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
        </motion.div>
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
      className="service-card-beam"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(160deg, #0d0d0d 0%, #150E1A 100%)',
        border: '1px solid rgba(223, 172, 232, 0.12)',
        boxShadow: '0 0 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(223, 172, 232, 0.07)',
        borderRadius: '1.5rem',
        padding: '2rem',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 300ms',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shared top edge glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '20%',
        right: '20%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(223,172,232,0.3), transparent)',
        filter: 'blur(2px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Faint top-left radial glow */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        left: '-30px',
        width: '160px',
        height: '160px',
        background: 'radial-gradient(circle, rgba(223, 172, 232, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Content Wrapper */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <MessageSquare size={28} color="#dface8" style={{ marginBottom: '1.25rem' }} />
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 500,
            color: 'rgba(223, 172, 232, 0.6)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Always On
        </div>
        <h3
          style={{
            fontSize: '1.15rem',
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: '0.25rem',
            letterSpacing: '-0.01em',
            position: 'relative',
            zIndex: 1,
          }}
        >
          AI Follow-Up
        </h3>
        <p style={{ color: '#AAAAAA', fontSize: '0.875rem', lineHeight: 1.7 }}>
          The moment a lead comes in, our AI sends a personalized message — via
          email or WhatsApp. No delays. No missed opportunities.
        </p>
        <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(223,172,232,0.07)' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#dface8', lineHeight: 1, letterSpacing: '-0.03em' }}>
            &lt;60s
          </div>
          <div style={{ fontSize: '0.78rem', color: 'rgba(223,172,232,0.5)', marginTop: '0.3rem', letterSpacing: '0.05em' }}>
            AVERAGE RESPONSE TIME
          </div>
        </div>
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
      className="service-card-beam"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(160deg, #0d0d0d 0%, #150E1A 100%)',
        border: '1px solid rgba(223, 172, 232, 0.12)',
        boxShadow: '0 0 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(223, 172, 232, 0.07)',
        borderRadius: '1.5rem',
        padding: '2rem',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 300ms',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shared top edge glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '20%',
        right: '20%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(223,172,232,0.3), transparent)',
        filter: 'blur(2px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Faint top-left radial glow */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        left: '-30px',
        width: '160px',
        height: '160px',
        background: 'radial-gradient(circle, rgba(223, 172, 232, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Thin vertical accent line */}
      <div style={{
        position: 'absolute',
        top: '15%',
        bottom: '15%',
        left: 0,
        width: '2px',
        background: 'linear-gradient(to bottom, transparent, rgba(223,172,232,0.3), transparent)',
        borderRadius: '999px',
        zIndex: 0,
      }} />

      {/* Content Wrapper */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Zap size={28} color="#dface8" style={{ marginBottom: '1.25rem' }} />
        <h3
          style={{
            fontSize: '1.15rem',
            fontWeight: 600,
            color: '#ffffff',
            marginBottom: '0.25rem',
            letterSpacing: '-0.01em',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Workflow Automation
        </h3>
        <p style={{ color: '#AAAAAA', fontSize: '0.875rem', lineHeight: 1.7 }}>
          Eliminate repetitive tasks. We automate internal operations so your team
          focuses on growth.
        </p>
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map((item, i) => (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              {/* Number */}
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 700,
                color: 'rgba(223, 172, 232, 0.4)',
                fontVariantNumeric: 'tabular-nums',
                letterSpacing: '0.05em',
                minWidth: '16px',
              }}>
                0{i + 1}
              </span>

              {/* Divider line */}
              <div style={{
                width: '20px',
                height: '1px',
                background: 'linear-gradient(to right, rgba(223,172,232,0.4), transparent)',
                flexShrink: 0,
              }} />

              {/* Text */}
              <span style={{
                fontSize: '0.85rem',
                color: 'rgba(255,255,255,0.75)',
                fontWeight: 400,
                letterSpacing: '0.01em',
              }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CTA link — clean agency-style pill button
───────────────────────────────────────── */
function TalkToUsLink() {
  return (
    <Link to="/book" style={{ textDecoration: 'none' }}>
      <motion.div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '0.6rem 1.25rem',
          border: '1px solid #dface8',
          borderRadius: '999px',
          color: '#dface8',
          fontSize: '0.95rem',
          fontWeight: 500,
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
        whileHover="hover"
        initial="rest"
        animate="rest"
      >
        {/* Background fill slides in from left on hover */}
        <motion.span
          variants={{
            rest: { scaleX: 0, originX: '0%' },
            hover: { scaleX: 1, originX: '0%' },
          }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: 'absolute',
            inset: 0,
            background: '#dface8',
            zIndex: 0,
            borderRadius: '999px',
            transformOrigin: 'left center',
          }}
        />

        {/* Text */}
        <motion.span
          variants={{
            rest: { color: '#dface8' },
            hover: { color: '#000000' },
          }}
          transition={{ duration: 0.2 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          Talk to us
        </motion.span>

        {/* Arrow */}
        <motion.svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          variants={{
            rest: { x: 0, color: '#dface8' },
            hover: { x: 3, color: '#000000' },
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <motion.path
            d="M0 5 H14 M9 1 L14 5 L9 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </Link>
  );
}

/* ─────────────────────────────────────────
   Card 4 — Custom AI Projects
───────────────────────────────────────── */
function CustomAICard() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="service-card-beam"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        background: 'linear-gradient(160deg, #0d0d0d 0%, #150E1A 100%)',
        border: '1px solid rgba(223, 172, 232, 0.12)',
        boxShadow: '0 0 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(223, 172, 232, 0.07)',
        borderRadius: '1.5rem',
        padding: '2rem',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 300ms',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Shared top edge glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '20%',
        right: '20%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(223,172,232,0.3), transparent)',
        filter: 'blur(2px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Faint top-left radial glow */}
      <div style={{
        position: 'absolute',
        top: '-30px',
        left: '-30px',
        width: '160px',
        height: '160px',
        background: 'radial-gradient(circle, rgba(223, 172, 232, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Content Wrapper */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          gap: '0',
        }}
      >
        <div>
          <BrainCircuit size={28} color="#dface8" style={{ marginBottom: '1.25rem' }} />
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'rgba(223, 172, 232, 0.6)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.5rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Bespoke
          </div>
          <h3
            style={{
              fontSize: '1.15rem',
              fontWeight: 600,
              color: '#ffffff',
              marginBottom: '0.25rem',
              letterSpacing: '-0.01em',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Custom AI Projects
          </h3>
          <p style={{ color: '#AAAAAA', fontSize: '0.875rem', lineHeight: 1.7 }}>
            Got a process that eats your team's time? <br /> We scope, design, and ship
            custom AI — from smart document handling to full workflow automation.
            If it's repetitive, we automate it.
          </p>
        </div>

        <div style={{
          position: 'relative',
          width: '100%',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          margin: '1.25rem 0',
          height: '200px',
        }}>
          <img
            src="/images/bespoke-ai.jpg"
            alt="Custom AI Workflow"
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              display: 'block',
              filter: 'brightness(0.95)',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </div>

        {/* ── Animated CTA ── */}
        <div style={{ marginTop: '0' }}>
          <TalkToUsLink />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Main Services export
───────────────────────────────────────── */
export default function Services() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      id="services"
      className="section-fade-bottom section-fade-top"
      style={{
        width: '100%',
        background: '#000000',
        padding: '7rem 1.5rem',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <AmbientLight color="rgb(223, 172, 232)" opacity={0.9} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ─── Header ─── */}
        <RevealWrapper variant="fade-left">
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
        </RevealWrapper>

        {/* ─── Bento grid ─── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gridTemplateRows: 'auto',
            gap: '1.25rem',
            alignItems: 'stretch',
          }}
        >
          <RevealWrapper
            variant="fade-up"
            delay={0.0}
            style={{
              gridColumn: isMobile ? 'auto' : 'span 2',
            }}
          >
            <LeadCaptureCard />
          </RevealWrapper>

          {/* Left Column Stack */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              gridColumn: isMobile ? 'auto' : '1',
            }}
          >
            <RevealWrapper
              variant="fade-up"
              delay={0.1}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <FollowUpCard />
            </RevealWrapper>
            <RevealWrapper
              variant="fade-up"
              delay={0.2}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <WorkflowCard />
            </RevealWrapper>
          </div>

          {/* Right Column Full Height */}
          <RevealWrapper
            variant="fade-up"
            delay={0.3}
            style={{
              gridColumn: isMobile ? 'auto' : '2',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CustomAICard />
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
