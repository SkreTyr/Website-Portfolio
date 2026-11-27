import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AutoReveal from '@/components/AutoReveal'

const milestones = [
  {
    title: 'College',
    role: 'BS Computer Engineering',
    period: '2024 - Present',
    school: 'University of Cebu',
    description:
      'Pursuing a Bachelor of Science in Computer Engineering at the University of Cebu, building a strong foundation in software development, networks, and problem-solving.',
  },
  {
    title: 'Senior High School',
    role: 'STEM',
    period: '2022 - 2024',
    school: 'University of the Philippines Foundation',
    description:
      'Completed the STEM track at the University of the Philippines Foundation, strengthening my analytical and technical skills.',
  },
  {
    title: 'Junior High School',
    role: 'Student',
    period: '2018 - 2022',
    school: 'Barrio Luz National High School',
    description:
      'Finished junior high school at Barrio Luz National High School, where I first discovered my interest in how technology works.',
  },
  {
    title: 'Elementary',
    role: 'Student',
    period: '2012 - 2018',
    school: 'Barrio Luz Elementary School',
    description:
      'Studied at Barrio Luz Elementary School, growing up curious about how things work and how they are built.',
  },
]

const Milestone = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);

  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;
    let raf = 0;
    const compute = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      targetRef.current = Math.min(1, Math.max(0, (vh * 0.5 - rect.top) / (rect.height || 1)));
    };
    const tick = () => {
      const diff = targetRef.current - currentRef.current;
      currentRef.current += diff * 0.12;
      if (Math.abs(diff) < 0.001) currentRef.current = targetRef.current;
      setProgress(currentRef.current);
      raf = Math.abs(targetRef.current - currentRef.current) >= 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const onScroll = () => {
      compute();
      if (!raf) raf = requestAnimationFrame(tick);
    };
    compute();
    currentRef.current = targetRef.current;
    setProgress(currentRef.current);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen w-full">
      <section className="h-auto w-full flex justify-center pt-32 pb-20">
        <div className="w-full p-5 flex flex-col items-center justify-center lg:w-3/4 2xl:w-2/4">
          <AutoReveal direction="left" className="w-full">
            <Link
              to="/#About"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </AutoReveal>

          <AutoReveal direction="left" className="w-full">
            <h1 className="text-[#f5f5f5] font-bebas text-left text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl mb-2">
              Milestone
            </h1>
            <p className="text-gray-400 text-sm md:text-base text-left mb-8 max-w-2xl">
              A timeline of the roles and moments that shaped my journey as a developer.
            </p>
            <hr className="border-t border-[#ffffff38] w-full max-w-2xl mb-8" />
          </AutoReveal>

          <AutoReveal className="w-full">
            <div className="border border-[#ffffff4d] bg-[#151515] p-6 rounded-md w-full max-w-2xl mx-auto">
              <div className="relative" ref={timelineRef}>
                <span className="absolute left-[7px] top-2 bottom-2 w-px bg-[#ffffff38]" />
                <span
                  className="keep-color absolute left-[7px] top-2 w-px bg-blue-500"
                  style={{ height: `calc((100% - 1rem) * ${progress})` }}
                />
                <div className="flex flex-col gap-16">
                  {milestones.map((m, i) => (
                    <div key={i} className="relative pl-8">
                      <span
                        className={`keep-color absolute left-0 top-1 w-4 h-4 rounded-full border-2 border-[#151515] ${
                          progress >= i / Math.max(1, milestones.length - 1)
                            ? 'bg-blue-500'
                            : 'bg-gray-600'
                        }`}
                      />
                      <div className="border border-[#ffffff38] bg-[#101010] p-4 rounded-md transition-colors duration-200 hover:border-[#ffffff80]">
                        <div className="flex justify-between items-start gap-2">
                          <h2 className="text-[#f3f3f3] text-base font-light">{m.title}</h2>
                          <span className="text-xs text-gray-500 whitespace-nowrap">{m.period}</span>
                        </div>
                        <p className="text-sm text-blue-400 font-light">{m.role}</p>
                        <p className="text-sm text-gray-400 mt-2">
                          {m.description.split(m.school).map((part, idx) => (
                            <span key={idx}>
                              {part}
                              {idx < m.description.split(m.school).length - 1 && (
                                <span className="text-blue-400">{m.school}</span>
                              )}
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AutoReveal>
        </div>
      </section>
    </div>
  )
}

export default Milestone