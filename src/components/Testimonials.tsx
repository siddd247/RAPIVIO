import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RevealWrapper } from './ui/RevealWrapper';
import { AmbientLight } from './ui/AmbientLight';

function useWindowSize() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

function QuoteCard({ quote, tailPosition }: { quote: string; tailPosition: 'left' | 'right' }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      style={{ position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Curvy iOS SVG Tail */}
      {tailPosition === 'left' ? (
        <svg
          width="12"
          height="16"
          viewBox="0 0 12 16"
          style={{
            position: 'absolute',
            top: '24px',
            left: '-11px',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <path
            d="M 12,0 C 7,0 0,6 0,12 C 3,12 8,15 12,16 Z"
            fill="#000"
          />
          <path
            d="M 12,0 C 7,0 0,6 0,12 C 3,12 8,15 12,16"
            fill="none"
            stroke={hovered ? '#824D69' : '#2A114B'}
            strokeWidth="1"
            style={{ transition: 'stroke 300ms' }}
          />
        </svg>
      ) : (
        <svg
          width="12"
          height="16"
          viewBox="0 0 12 16"
          style={{
            position: 'absolute',
            top: '24px',
            right: '-11px',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <path
            d="M 0,0 C 5,0 12,6 12,12 C 9,12 4,15 0,16 Z"
            fill="#000"
          />
          <path
            d="M 0,0 C 5,0 12,6 12,12 C 9,12 4,15 0,16"
            fill="none"
            stroke={hovered ? '#824D69' : '#2A114B'}
            strokeWidth="1"
            style={{ transition: 'stroke 300ms' }}
          />
        </svg>
      )}

      <div style={{
        background: '#000',
        border: `1px solid ${hovered ? '#824D69' : '#2A114B'}`,
        borderRadius: '1rem',
        padding: '2rem',
        transition: 'border-color 300ms',
        position: 'relative',
        zIndex: 2,
      }}>
        <div style={{ color: '#dface8', fontSize: '2.5rem', fontFamily: 'serif', lineHeight: 1, marginBottom: '0.75rem' }}>"</div>
        <p style={{ color: '#AAAAAA', fontSize: '0.875rem', lineHeight: 1.7 }}>{quote}</p>
      </div>
    </motion.div>
  );
}

function VideoTestimonialCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleClick = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div style={{ maxWidth: '360px', width: '100%', margin: '0 auto' }}>
      <div
        onClick={handleClick}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '9/16',
          borderRadius: '1rem',
          overflow: 'hidden',
          border: '1px solid transparent',
          background: 'linear-gradient(#000, #000) padding-box, linear-gradient(135deg, #824D69, #2A114B) border-box',
          cursor: 'pointer',
        }}
      >
        <video
          ref={videoRef}
          src="/testimonials/testimonial.mp4"
          poster="/testimonials/testimonial-poster.jpg"
          loop
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        {!playing && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '2rem 1.5rem 1.5rem',
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}>
          <span style={{
            display: 'inline-block',
            color: '#dface8',
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            fontWeight: 600,
            textTransform: 'uppercase',
            border: '1px solid rgba(223,172,232,0.3)',
            borderRadius: '9999px',
            padding: '0.25rem 0.85rem',
            marginBottom: '0.6rem',
          }}>Watch Emily's Story</span>
          <p style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '0.9rem' }}>Emily</p>
          <p style={{ color: '#AAAAAA', fontSize: '0.75rem', marginTop: '0.15rem' }}>Real Estate Agency Owner</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const width = useWindowSize();
  const isMobile = width < 768;

  return (
    <section
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
        <RevealWrapper variant="scale-in">
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
        </RevealWrapper>

        {isMobile ? (
          <div style={{ marginTop: '4rem', maxWidth: '1280px', margin: '4rem auto 0' }}>
            <VideoTestimonialCard />
          </div>
        ) : (
          <div style={{ marginTop: '4rem', maxWidth: '1280px', margin: '4rem auto 0' }}>
            {/* Bento grid - desktop only, stacks on mobile */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'auto',
              gap: '1.25rem',
              alignItems: 'start',
            }}>
              {/* Left quote card - top */}
              <RevealWrapper variant="fade-left" delay={0.1}>
                <QuoteCard tailPosition="right" quote="Before Rapivio, I was manually following up with every lead. Now the system handles it — I just show up to the meetings." />
              </RevealWrapper>

              {/* Center — video */}
              <div style={{ gridRow: 'span 2' }}>
                <VideoTestimonialCard />
              </div>

              {/* Right quote card - top */}
              <RevealWrapper variant="fade-right" delay={0.1}>
                <QuoteCard tailPosition="left" quote="Within the first week I could see exactly which leads were being nurtured. The visibility alone was worth it." />
              </RevealWrapper>

              {/* Left quote card - bottom */}
              <RevealWrapper variant="fade-left" delay={0.25}>
                <QuoteCard tailPosition="right" quote="I used to lose deals just because I forgot to follow up. That doesn't happen anymore." />
              </RevealWrapper>

              {/* Right quote card - bottom */}
              <RevealWrapper variant="fade-right" delay={0.25}>
                <QuoteCard tailPosition="left" quote="It's not just automation — it actually feels personal to the client. That's the part that surprised me most." />
              </RevealWrapper>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}