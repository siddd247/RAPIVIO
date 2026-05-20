import { lazy, Suspense, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const ShaderBackground = lazy(() =>
  import('shaders/react').then(({ Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain }) => ({
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
        <FilmGrain strength={0.05} />
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
      className="relative overflow-hidden min-h-screen"
      style={{ background: '#000000' }}
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
        className="relative flex flex-col items-center justify-center min-h-screen text-center px-6"
        style={{ zIndex: 20 }}
      >
        {/* Badge */}
        <span className="badge-pill">AI Automation Agency</span>

        {/* Headline */}
        <h1
          className="font-bold leading-[1.1] tracking-tight"
          style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)' }}
        >
          <span style={{ color: '#FFFFFF', display: 'block' }}>
            Capture More Leads.
          </span>
          <span style={{ color: '#522959', display: 'block' }}>
            Convert Them Automatically.
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="text-base mt-4 max-w-xl mx-auto leading-relaxed"
          style={{ color: 'rgba(255, 255, 255, 0.6)' }}
        >
          Rapivio uses AI to capture leads and follow up instantly — so you
          never miss a potential client.
        </p>

        {/* CTA buttons */}
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <Link to="/book" className="btn-primary">Book a Call</Link>
          <a href="#services" onClick={(e)=>{e.preventDefault();document.querySelector('#services')?.scrollIntoView({behavior:'smooth'})}} className="btn-outline">View Services</a>
        </div>
      </div>

      {/* ─── Scroll indicator ─── */}
      <div
        className="absolute bottom-8 left-1/2"
        style={{ transform: 'translateX(-50%)', zIndex: 20 }}
      >
        <ChevronDown
          size={28}
          color="#522959"
          style={{ animation: 'bounce 2s infinite' }}
        />
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
