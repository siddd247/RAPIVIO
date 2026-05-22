import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RevealWrapper } from './ui/RevealWrapper';
import { AmbientLight } from './ui/AmbientLight';
import { useOutsideClick } from '@/hooks/use-outside-click';
import type { LucideIcon } from 'lucide-react';
import { Zap, Clock, BarChart2, Settings, Shield, Handshake } from 'lucide-react';

interface Benefit {
  id: number;
  icon: LucideIcon;
  image: string;
  imageFit: 'cover' | 'contain';
  title: string;
  description: string;
  content: string;
}

const BENEFITS: Benefit[] = [
  {
    id: 1,
    icon: Zap,
    image: '/images/benefits/1.jpeg',
    imageFit: 'cover',
    title: 'Always-On Automation',
    description: 'AI agents that work 24/7, capturing and nurturing leads while you sleep.',
    content: 'Our AI agents never clock out. From the moment a lead lands on your site to the follow-up three days later, every touchpoint is handled automatically — no delays, no dropped balls, no human bottleneck.',
  },
  {
    id: 2,
    icon: Clock,
    image: '/images/benefits/2.jpeg',
    imageFit: 'cover',
    title: 'Instant Response',
    description: 'Respond to every inquiry in under 60 seconds, no human needed.',
    content: 'Speed is the single biggest driver of conversion. Responding within 60 seconds increases close rates dramatically. Our systems guarantee that window, every time, around the clock.',
  },
  {
    id: 3,
    icon: BarChart2,
    image: '/images/benefits/3.jpeg',
    imageFit: 'contain',
    title: 'Data-Driven Results',
    description: 'Every automation is tracked, measured, and optimized for maximum ROI.',
    content: 'We don\'t set and forget. Every flow is instrumented — open rates, reply rates, booking rates. We use that data to continuously refine until your pipeline performs at its ceiling.',
  },
  {
    id: 4,
    icon: Settings,
    image: '/images/benefits/4.jpeg',
    imageFit: 'contain',
    title: 'Built to Fit You',
    description: "We don't use templates. Every system is custom-built for your workflow.",
    content: 'Your clinic isn\'t generic. Neither is our build. We map your exact patient journey, identify the drop-off points, and engineer automation around how you actually operate — not a preset playbook.',
  },
  {
    id: 5,
    icon: Shield,
    image: '/images/benefits/5.jpeg',
    imageFit: 'cover',
    title: 'Enterprise-Grade Reliability',
    description: 'Uptime guarantees, secure data handling, and failover systems built in.',
    content: 'Your lead pipeline can\'t afford downtime. We build with redundancy at every layer — failover logic, secure encrypted data handling, and uptime monitoring — so the system keeps running even when things go wrong upstream.',
  },
  {
    id: 6,
    icon: Handshake,
    image: '/images/benefits/6.jpeg',
    imageFit: 'contain',
    title: 'Ongoing Partnership',
    description: "We don't disappear after launch. We stay and scale with you.",
    content: 'Most agencies hand you a login and vanish. We stay in the loop — iterating on performance, adding new automations as you grow, and treating your results as our ongoing responsibility.',
  },
];

const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
    className="h-4 w-4 text-[#FAE5D8]"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);

function BenefitRow({
  benefit,
  onClick,
  id,
}: {
  benefit: Benefit;
  onClick: () => void;
  id: string;
}) {
  const Icon = benefit.icon;

  return (
    <motion.div
      layoutId={`card-${benefit.id}-${id}`}
      key={`card-${benefit.id}-${id}`}
      onClick={onClick}
      className="flex flex-row justify-between items-center cursor-pointer"
      style={{
        background: '#000000',
        border: '1px solid #2A114B',
        borderRadius: '1rem',
        padding: '1.25rem 1.5rem',
        willChange: 'transform',
      }}
      whileHover={{ scale: 1.025 }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], scale: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
    >
      <div className="flex items-center" style={{ gap: '1.25rem' }}>
        <motion.div
          layoutId={`image-${benefit.id}-${id}`}
          style={{
            background: '#111111',
            borderRadius: '0.75rem',
            padding: '0.65rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={22} color="#dface8" />
        </motion.div>

        <div>
          <motion.h3
            layoutId={`title-${benefit.id}-${id}`}
            style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1rem' }}
          >
            {benefit.title}
          </motion.h3>
          <motion.p
            layoutId={`description-${benefit.id}-${id}`}
            style={{ color: '#AAAAAA', fontSize: '0.8rem', marginTop: '0.2rem' }}
          >
            {benefit.description}
          </motion.p>
        </div>
      </div>

      <motion.button
        layoutId={`button-${benefit.id}-${id}`}
        className="shrink-0"
        style={{
          marginLeft: '1rem',
          padding: '0.55rem 1.5rem',
          borderRadius: '9999px',
          fontSize: '0.82rem',
          fontWeight: 500,
          letterSpacing: '0.06em',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(223,172,232,0.25)',
          color: 'rgba(223,172,232,0.8)',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
        whileHover={{
          background: 'rgba(255,255,255,0.1)',
          borderColor: 'rgba(223,172,232,0.5)',
          color: '#FAE5D8',
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        View
      </motion.button>
    </motion.div>
  );
}

export default function Benefits() {
  const [active, setActive] = useState<Benefit | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.body.style.overflow = active ? 'hidden' : 'auto';
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <section
      id="about"
      className="section-fade-bottom"
      style={{
        background: '#000000',
        padding: '7rem 1.5rem',
        width: '100%',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <AmbientLight color="rgb(223, 172, 232)" opacity={0.9} />

      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header — untouched from original */}
        <RevealWrapper variant="fade-right">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <p style={{
              color: '#dface8',
              fontSize: '1.13rem',
              letterSpacing: '0.2em',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              WHY RAPIVIO
            </p>
            <h2 style={{
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              lineHeight: 1.15,
            }}>
              Built for businesses<br />that can't slow down.
            </h2>
          </div>
        </RevealWrapper>

        {/* Backdrop */}
        <AnimatePresence>
          {active && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-0 z-40"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            />
          )}
        </AnimatePresence>

        {/* Expanded modal */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key="modal-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="fixed inset-0 grid place-items-center z-50 px-4"
            >

              {/* Mobile close */}
              <motion.button
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                className="absolute top-4 right-4 flex lg:hidden items-center justify-center rounded-full h-8 w-8"
                style={{ background: '#2A114B' }}
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>

              <motion.div
                ref={ref}
                className="w-full max-w-[500px] flex flex-col overflow-hidden"
                style={{
                  background: '#000000',
                  border: '1px solid #dface8',
                  borderRadius: '1rem',
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {/* Placeholder image area */}
                <motion.div layoutId={`image-${active.id}-${id}`}>
                  <img
                    src={active.image}
                    alt={active.title}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '220px',
                      objectFit: active.imageFit,
                      objectPosition: 'center',
                      display: 'block',
                      background: '#000000',
                      borderBottom: '1px solid #2A114B',
                    }}
                  />
                </motion.div>

                <div style={{ padding: '1.5rem' }}>
                  <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
                    <div>
                      <motion.h3
                        layoutId={`title-${active.id}-${id}`}
                        style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.125rem' }}
                      >
                        {active.title}
                      </motion.h3>
                      <motion.p
                        layoutId={`description-${active.id}-${id}`}
                        style={{ color: '#AAAAAA', fontSize: '0.875rem', marginTop: '0.25rem' }}
                      >
                        {active.description}
                      </motion.p>
                    </div>

                    {/* Desktop close */}
                    <button
                      onClick={() => setActive(null)}
                      className="hidden lg:flex items-center justify-center rounded-full h-8 w-8 shrink-0"
                      style={{ background: '#2A114B', marginLeft: '1rem' }}
                    >
                      <CloseIcon />
                    </button>
                  </div>

                  <motion.p
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      color: '#AAAAAA',
                      fontSize: '0.9rem',
                      lineHeight: 1.75,
                    }}
                  >
                    {active.content}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card list */}
        <ul className="w-full flex flex-col" style={{ marginTop: '4rem', gap: '0.75rem' }}>
          {BENEFITS.map((benefit) => (
            <BenefitRow
              key={benefit.id}
              benefit={benefit}
              onClick={() => setActive(benefit)}
              id={id}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
