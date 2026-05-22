import React, { useRef, Suspense, lazy } from 'react';
import { motion, useInView } from 'framer-motion';
const CardSpotlight = lazy(() =>
  import('./ui/card-spotlight').then((m) => ({ default: m.CardSpotlight }))
);
import type { LucideIcon } from 'lucide-react';
import { Search, Cpu, Plug, TrendingUp } from 'lucide-react';
import { RevealWrapper } from './ui/RevealWrapper';
import { AmbientLight } from './ui/AmbientLight';

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

function StepArrow({ index }: { index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <RevealWrapper
      variant="fade-right"
      delay={index * 0.2}
      className="hidden md:flex items-center justify-center"
      style={{ width: '50px', height: '100%' }}
    >
      <div ref={ref}>
        <motion.svg
          width="50"
          height="20"
          viewBox="0 0 50 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L0,6 L6,3 Z" fill="#dface8" />
            </marker>
          </defs>
          <motion.path
            d="M 2 10 Q 25 4, 44 10"
            stroke="#dface8"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.svg>
      </div>
    </RevealWrapper>
  );
}

interface StepCardProps extends Step {
  index: number;
}

function StepCard({ number, title, description, icon: Icon, index }: StepCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <RevealWrapper variant="scale-in" delay={index * 0.12} className="h-full">
      <motion.div
        whileHover={{ scale: 1.02, y: -8 }}
        whileTap={{ scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 1.1 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="h-full"
      >
        <Suspense
          fallback={
            <div
              style={{
                background: '#000000',
                border: '1px solid #2A114B',
                borderRadius: '1rem',
                padding: '2rem',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            />
          }
        >
          <CardSpotlight
            className="h-full"
            color="#dface8"
            radius={300}
            style={{
              background: '#000000',
              border: `1px solid ${isHovered ? '#dface8' : '#2A114B'}`,
              borderRadius: '1rem',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              transition: 'border-color 400ms ease',
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
        </Suspense>
      </motion.div>
    </RevealWrapper>
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
        overflow: 'visible',
      }}
    >
      <AmbientLight color="rgb(223, 172, 232)" opacity={0.9} />
      <div style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <RevealWrapper variant="fade-up" delay={0}>
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
        </RevealWrapper>

        {/* Steps grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-6 items-center"
          style={{ marginTop: '4rem' }}
        >
          {STEPS.map((step, index) => (
            <React.Fragment key={step.number}>
              <StepCard {...step} index={index} />
              {index < STEPS.length - 1 && <StepArrow index={index} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
