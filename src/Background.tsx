import React, { useMemo } from 'react';

interface ParticleLayerProps {
  count: number;
  afterCount: number;
  duration: string;
  size: number;
  afterSize: number;
}

const SPACING = 2560;
const COLOR_PARTICLE = '#fff';

const generateParticles = (max: number): string => {
  if (max <= 0) return 'none';
  let val = `0px 0px ${COLOR_PARTICLE}`;
  for (let i = 1; i <= max; i++) {
    const x = Math.floor(Math.random() * SPACING);
    const y = Math.floor(Math.random() * SPACING);
    val += `, ${x}px ${y}px ${COLOR_PARTICLE}`;
  }
  return val;
};

const ParticleLayer: React.FC<ParticleLayerProps> = ({
  count,
  duration,
  size,
}) => {
  // SEAMLESS FIX: Generate ONE master shadow blueprint per layer. 
  // By reusing `shadows` on both the element and its `::after` duplicate, 
  // we build a perfectly matching texture tile that loops infinitely without a visible seam.
  const shadows = useMemo(() => generateParticles(count), [count]);

  return (
    <>
      <style>{`
        .particle-layer-${count} {
          position: absolute;
          background: transparent;
          animation: animParticle ${duration} linear infinite;
          box-shadow: ${shadows};
          border-radius: 50%;
          height: ${size}px;
          width: ${size}px;
        }
        .particle-layer-${count}::after {
          content: "";
          position: absolute;
          /* Offsets the twin duplicate precisely to build a tile link */
          top: ${SPACING}px; 
          left: 0;
          background: transparent;
          box-shadow: ${shadows}; 
          border-radius: 50%;
          height: ${size}px;
          width: ${size}px;
        }
      `}</style>
      <div className={`particle-layer-${count}`} />
    </>
  );
};

export const ParticleBackground: React.FC = () => {
  return (
    <>
      <style>{`
        /* The Base Layer: Holds the solid dark canvas at the absolute bottom */
        .page-solid-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #101010;
          z-index: -2; /* Set to -2 so it sits cleanly beneath the particle container */
          pointer-events: none;
        }

        /* The Particle Layer: Floats right above the solid dark background */
        .page-particle-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          z-index: -2; 
          pointer-events: none;
          opacity: 0.8;
        }

        .animation-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        /* Flawless wrap-around scrolling sequence */
        @keyframes animParticle {
          from { transform: translateY(0px); }
          to { transform: translateY(-${SPACING}px); }
        }
      `}</style>

      <div className="page-solid-bg" />
      <div className="page-particle-container">
        <div className="animation-wrapper">
          <ParticleLayer count={500} afterCount={200} duration="300s" size={2} afterSize={1} />
          <ParticleLayer count={100} afterCount={50} duration="200s" size={3} afterSize={4} />
          <ParticleLayer count={50} afterCount={50} duration="500s" size={1} afterSize={1} />
        </div>
      </div>
    </>
  );
};

export default ParticleBackground;
