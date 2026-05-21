import { lazy, Suspense, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { FlipWords } from './ui/flip-words';
import { Link } from 'react-router-dom';

const ShaderBackground = lazy(() =>
  import('shaders/react').then(({ Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain: _FilmGrain }) => ({
    default: () => (
      <Shader style={{ width: '100%', height: '100%' }} disableTelemetry>
        <Swirl
          colorA="#111111"
          colorB="#000000"
          detail={1.7}
        />
        <ChromaFlow
          baseColor="#111111"
          downColor="#522959"
          leftColor="#2A114B"
          rightColor="#522959"
          upColor="#2A114B"
          momentum={13}
          radius={3.5}
        />
        <FlutedGlass
          aberration={0.61}
          angle={31}
          frequency={8}
          highlight={0.12}
          highlightSoftness={0}
          lightAngle={-90}
          refraction={4}
          shape="rounded"
          softness={1}
          speed={0.15}
        />
      </Shader>
    )
  }))
);

export default function Hero() {
  useEffect(() => {
    // ─── 1. Override document.hidden to always return false ───────────────
    try {
      Object.defineProperty(document, 'hidden', {
        get: () => false,
        configurable: true,
      });
    } catch {
      // Already non-configurable — ignore
    }

    // ─── 2. Intercept window blur: immediately refocus the window ─────────
    const handleBlur = () => {
      // Re-dispatch focus so the shader's IntersectionObserver doesn't flip isVisible
      window.dispatchEvent(new Event('focus'));
      // Also focus the shader canvas after 200ms delay
      setTimeout(() => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
          canvas.dispatchEvent(new Event('focus', { bubbles: true }));
          canvas.focus?.();
        }
      }, 200);
    };
    window.addEventListener('blur', handleBlur);

    // ─── 3. After mailto click: force canvas focus to resume render loop ──
    const handleMailtoClick = () => {
      setTimeout(() => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
          canvas.dispatchEvent(new Event('focus', { bubbles: true }));
          canvas.focus?.();
        }
        window.dispatchEvent(new Event('focus'));
      }, 200);
    };

    const links = document.querySelectorAll('a[href^="mailto"]');
    links.forEach((btn) => btn.addEventListener('click', handleMailtoClick));

    return () => {
      window.removeEventListener('blur', handleBlur);
      links.forEach((btn) => btn.removeEventListener('click', handleMailtoClick));
    };
  }, []);

  return (
    <section
      id="hero"
      className="section-fade-bottom relative overflow-hidden min-h-screen"
      style={{
        background: '#000000',
        position: 'relative',
      }}
    >
      {/* ─── Shader background layer ─── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <Suspense fallback={null}>
          <ShaderBackground />
        </Suspense>
      </div>

      {/* ─── Content layer ─── */}
      <div
        className="relative flex flex-col items-center text-center px-6 w-full"
        style={{ zIndex: 20, minHeight: '100vh', paddingTop: '160px', paddingBottom: '80px' }}
      >
        <span className="badge-pill">AI Automation Agency</span>

        <h1
          className="font-bold leading-[1.1] tracking-tight"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', marginTop: '72px' }}
        >
          <span style={{ color: '#FFFFFF', display: 'block' }}>
            <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
              Capture More <span style={{ marginLeft: '0.25em', display: 'inline-grid', minWidth: '5ch', lineHeight: 'inherit', fontSize: 'inherit', verticalAlign: 'middle' }}><FlipWords words={['Leads.', 'Clients.', 'Deals.']} duration={2500} className="text-[#dface8]" /></span>
            </span>
          </span>
          <span style={{ color: '#FFFFFF', display: 'block' }}>Convert Them <span style={{ color: '#dface8' }}>Automatically.</span></span>
        </h1>

        <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)', marginTop: '28px' }}>
          Rapivio uses AI to capture leads and follow up instantly — so you never miss a potential client.
        </p>

        <div style={{ marginTop: '56px' }} className="flex gap-4 justify-center flex-wrap">
          <Link to="/book" className="btn-primary" style={{ fontSize: '1.05rem' }}>
            <span className="btn-text">
              <span className="btn-label">Book a Call</span>
              <span className="btn-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                </svg>
              </span>
            </span>
          </Link>
          <a href="#services" onClick={(e)=>{e.preventDefault();document.querySelector('#services')?.scrollIntoView({behavior:'smooth'})}} className="btn-outline" style={{ fontSize: '1.05rem', padding: '12px 24px' }}>View Services</a>
        </div>
      </div>

      {/* ─── Scroll indicator ─── */}
      <div
        className="absolute bottom-8 left-1/2"
        style={{ transform: 'translateX(-50%)', zIndex: 20 }}
      >
        <button
          onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Scroll to services"
        >
          <ChevronDown
            size={28}
            color="#dface8"
            style={{ animation: 'bounce 2s infinite' }}
          />
        </button>
      </div>

      {/* Bounce keyframes injected inline */}
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(10px); }
        }
      `}</style>
    </section>
  );
}
