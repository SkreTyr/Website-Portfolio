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
            <div className="relative w-full max-w-2xl mx-auto" ref={timelineRef}>
                <span className="keep-color absolute left-4 md:left-1/2 top-2 bottom-2 w-px bg-[#ffffff38] md:-translate-x-1/2" />
                <span
                  className="keep-color absolute left-4 md:left-1/2 top-2 w-px bg-blue-500 md:-translate-x-1/2"
                  style={{ height: `calc((100% - 1rem) * ${progress})` }}
                />
                <div className="flex flex-col gap-10 md:gap-6">
                  {milestones.map((m, i) => {
                    const reached = progress >= i / Math.max(1, milestones.length - 1)
                    const isLeft = i % 2 === 0
                    return (
                      <div
                        key={i}
                        className={`relative pl-10 md:pl-0 md:flex md:w-full ${
                          isLeft ? 'md:justify-start' : 'md:justify-end'
                        }`}
                      >
                        <span
                          className={`keep-color absolute left-4 md:left-1/2 top-4 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#151515] transition-colors duration-300 ${
                            reached ? 'bg-blue-500' : 'bg-gray-600'
                          }`}
                        />
                        <div className="group relative border border-[#ffffff4d] bg-[#151515] p-5 rounded-lg transition-all duration-300 hover:border-[#ffffff80] hover:-translate-y-0.5 md:w-[46%]">
                          <div className="flex justify-between items-start gap-4">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span
                                  className={`keep-color h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                                    reached ? 'bg-blue-500' : 'bg-gray-600'
                                  }`}
                                />
                                <h2 className="font-['Inter'] text-lg font-normal text-[#f3f3f3] leading-tight">
                                  {m.title}
                                </h2>
                              </div>
                              <p className="text-sm text-blue-400 font-light mt-1 whitespace-nowrap">{m.role}</p>
                            </div>
                            <span className="shrink-0 ml-4 text-[10px] uppercase tracking-wide text-gray-400 whitespace-nowrap px-2 py-0.5 rounded border border-[#ffffff33] bg-black/30">
                              {m.period}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400 font-light mt-3 leading-relaxed">
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
                    )
                  })}
                </div>
            </div>
          </AutoReveal>
        </div>
      </section>
    </div>
  )
}

export default Milestone