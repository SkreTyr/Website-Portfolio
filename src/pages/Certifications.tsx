import { Link } from 'react-router-dom'
import { ArrowLeft, BadgeCheck, ArrowUpRight } from 'lucide-react'
import AutoReveal from '@/components/AutoReveal'
import { GlowingCards, GlowingCard } from '@/components/lightswind/glowing-cards'
import ciscoLogo from '@/assets/CiscoLogo.webp'
import ibmLogo from '@/assets/IBMLOGO.webp'
import codedexLogo from '@/assets/CodedexLogo.webp'
import codedexLightLogo from '@/assets/CodedexLightMode.webp'
import ThemeImage from '@/components/ThemeImage'

interface Certification {
  key: number
  title: string
  issuer: string
  date: string
  image: string
  credentialUrl?: string
  glowColor: string
}

const certifications: Certification[] = [
  {
    key: 1,
    title: 'Network Support and Security',
    issuer: 'NetAcad (Cisco)',
    date: '2024',
    image: ciscoLogo,
    credentialUrl: '#',
    glowColor: '#60a5fa',
  },
  {
    key: 2,
    title: 'Network Support and Security',
    issuer: 'NetAcad (IBM)',
    date: '2024',
    image: ibmLogo,
    credentialUrl: '#',
    glowColor: '#4ade80',
  },
  {
    key: 3,
    title: 'Network Support and Security',
    issuer: 'Codedex',
    date: '2024',
    image: codedexLogo,
    credentialUrl: '#',
    glowColor: '#facc15',
  },
]

const Certifications = () => {
  return (
    <div className=" min-h-screen w-full">
      <section className=" h-auto w-full flex justify-center pt-32 pb-20">
        <div className=" w-full p-5 flex flex-col items-center justify-center md:w-full lg:w-4/5 xl:w-3/5">
          <AutoReveal direction="left" className=" w-full md:pl-10 lg:pl-0">
            <Link
              to="/#Certifications"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </AutoReveal>

<AutoReveal direction="left" className="w-full md:pl-10 lg:pl-0">
            <h1 className="text-[#f5f5f5] font-bebas text-left mb-2 text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl">
              Certifications
            </h1>
            <p className="text-gray-400 text-sm md:text-base text-left mb-8 max-w-2xl">
              A collection of professional certifications and credentials earned across networking, security, and software development.
            </p>
            <hr className="border-t border-[#ffffff38] w-full max-w-2xl mb-8" />
          </AutoReveal>

<GlowingCards padding='' gap="1.5rem" className=" md:px-10 lg:px-0">
<AutoReveal className="w-full sm:w-[calc((100%-3rem)/3)] sm:flex-none min-w-0">
<GlowingCard glowColor="#60a5fa" className="border border-[#ffffff4d] bg-[#151515] p-2 rounded-md pb-4 w-full">
      
    
<div className="grid grid-cols-2 grid-rows-2 gap-4">
    <div  className=' flex space-x-2 items-center'>
      <BadgeCheck className="w-6 h-5 text-blue-500" />
      <h1 className=' text-lg'>NetAcad</h1>
    </div>
    <div className='ml-auto flex flex-col items-end'>
      <div className=' w-20 lg:w-24 h-14 border border-[#ffffff4d]  p-2  rounded-md' >
        <img src={ciscoLogo} alt='Logo' loading="lazy" decoding="async" className='w-full h-full object-cover'/>
      </div>
      <span className=' text-xs text-gray-500 mt-1'>2024</span>
    </div>
    <div className="col-span-2 text-lg text-[#d0d0d0]">Network Support and<br></br> Security</div>
</div>
    
    <hr className="border-t border-[#ffffff38] w-full mt-2 " />
              <div className="flex justify-center mt-3"><a href="#" className="group text-gray-300 hover:text-blue-600 flex items-center relative text-sm"><span className='relative inline-block after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[1px] after:w-1/2 after:bg-blue-200 after:transition-[width] after:duration-300 hover:after:w-full'>Learn More</span><ArrowUpRight className='text-gray-500 ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 hover:text-blue-500'/></a></div> 
  </GlowingCard>
</AutoReveal>


<AutoReveal className="w-full sm:w-[calc((100%-3rem)/3)] sm:flex-none min-w-0">
<GlowingCard glowColor="#4ade80" className="border border-[#ffffff4d] bg-[#151515] p-2 rounded-md pb-4 w-full">
      
    
<div className="grid grid-cols-2 grid-rows-2 gap-4">
    <div  className=' flex space-x-2 items-center'>
      <BadgeCheck className="w-6 h-5 text-blue-500" />
      <h1 className=' text-lg'>NetAcad</h1>
    </div>
    <div className='ml-auto flex flex-col items-end'>
      <div className=' w-20 lg:w-24 h-14 border border-[#ffffff4d]  p-2  rounded-md' >
        <img src={ibmLogo} alt='Logo' loading="lazy" decoding="async" className='w-full h-full object-cover'/>
      </div>
      <span className=' text-xs text-gray-500 mt-1'>2024</span>
    </div>
    <div className="col-span-2 text-lg text-[#d0d0d0]">Network Support and<br></br> Security</div>
</div>
    
    <hr className="border-t border-[#ffffff38] w-full mt-2 " />
              <div className="flex justify-center mt-3"><a href="#" className="group text-gray-300 hover:text-blue-600 flex items-center relative text-sm"><span className='relative inline-block after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[1px] after:w-1/2 after:bg-blue-200 after:transition-[width] after:duration-300 hover:after:w-full'>Learn More</span><ArrowUpRight className='text-gray-500 ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 hover:text-blue-500'/></a></div> 
  </GlowingCard>
</AutoReveal>


<AutoReveal className="w-full sm:w-[calc((100%-3rem)/3)] sm:flex-none min-w-0">
<GlowingCard glowColor="#facc15" className="border border-[#ffffff4d] bg-[#151515] p-2 rounded-md pb-4 w-full">
      
    
<div className="grid grid-cols-2 grid-rows-2 gap-4">
    <div  className=' flex space-x-2 items-center'>
      <BadgeCheck className="w-6 h-5 text-blue-500" />
      <h1 className=' text-lg'>Codedex</h1>
    </div>
    <div className='ml-auto flex flex-col items-end'>
      <div className=' w-20 lg:w-24 h-14 border border-[#ffffff4d]  p-1  rounded-md overflow-hidden' >
        <ThemeImage darkSrc={codedexLogo} lightSrc={codedexLightLogo} alt='Logo' loading="lazy" decoding="async" className='w-full h-full object-cover scale-110'/>
      </div>
      <span className=' text-xs text-gray-500 mt-1'>2024</span>
    </div>
    <div className="col-span-2 text-lg text-[#d0d0d0]">Network Support and<br></br> Security</div>
</div>
    
    <hr className="border-t border-[#ffffff38] w-full mt-2 " />
              <div className="flex justify-center mt-3"><a href="#" className="group text-gray-300 hover:text-blue-600 flex items-center relative text-sm"><span className='relative inline-block after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[1px] after:w-1/2 after:bg-blue-200 after:transition-[width] after:duration-300 hover:after:w-full'>Learn More</span><ArrowUpRight className='text-gray-500 ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 hover:text-blue-500'/></a></div> 
  </GlowingCard>
</AutoReveal>

<AutoReveal className="w-full sm:w-[calc((100%-3rem)/3)] sm:flex-none min-w-0">
<GlowingCard glowColor="#facc15" className="border border-[#ffffff4d] bg-[#151515] p-2 rounded-md pb-4 w-full">
      
    
<div className="grid grid-cols-2 grid-rows-2 gap-4">
    <div  className=' flex space-x-2 items-center'>
      <BadgeCheck className="w-6 h-5 text-blue-500" />
      <h1 className=' text-lg'>Codedex</h1>
    </div>
    <div className='ml-auto flex flex-col items-end'>
      <div className=' w-20 lg:w-24 h-14 border border-[#ffffff4d]  p-1  rounded-md overflow-hidden' >
        <ThemeImage darkSrc={codedexLogo} lightSrc={codedexLightLogo} alt='Logo' loading="lazy" decoding="async" className='w-full h-full object-cover scale-110'/>
      </div>
      <span className=' text-xs text-gray-500 mt-1'>2024</span>
    </div>
    <div className="col-span-2 text-lg text-[#d0d0d0]">Network Support and<br></br> Security</div>
</div>
    
    <hr className="border-t border-[#ffffff38] w-full mt-2 " />
              <div className="flex justify-center mt-3"><a href="#" className="group text-gray-300 hover:text-blue-600 flex items-center relative text-sm"><span className='relative inline-block after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[1px] after:w-1/2 after:bg-blue-200 after:transition-[width] after:duration-300 hover:after:w-full'>Learn More</span><ArrowUpRight className='text-gray-500 ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 hover:text-blue-500'/></a></div> 
  </GlowingCard>
</AutoReveal>

<AutoReveal className="w-full sm:w-[calc((100%-3rem)/3)] sm:flex-none min-w-0">
<GlowingCard glowColor="#facc15" className="border border-[#ffffff4d] bg-[#151515] p-2 rounded-md pb-4 w-full">
      
    
<div className="grid grid-cols-2 grid-rows-2 gap-4">
    <div  className=' flex space-x-2 items-center'>
      <BadgeCheck className="w-6 h-5 text-blue-500" />
      <h1 className=' text-lg'>Codedex</h1>
    </div>
    <div className='ml-auto flex flex-col items-end'>
      <div className=' w-20 lg:w-24 h-14 border border-[#ffffff4d]  p-1  rounded-md overflow-hidden' >
        <ThemeImage darkSrc={codedexLogo} lightSrc={codedexLightLogo} alt='Logo' loading="lazy" decoding="async" className='w-full h-full object-cover scale-110'/>
      </div>
      <span className=' text-xs text-gray-500 mt-1'>2024</span>
    </div>
    <div className="col-span-2 text-lg text-[#d0d0d0]">Network Support and<br></br> Security</div>
</div>
    
    <hr className="border-t border-[#ffffff38] w-full mt-2 " />
              <div className="flex justify-center mt-3"><a href="#" className="group text-gray-300 hover:text-blue-600 flex items-center relative text-sm"><span className='relative inline-block after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[1px] after:w-1/2 after:bg-blue-200 after:transition-[width] after:duration-300 hover:after:w-full'>Learn More</span><ArrowUpRight className='text-gray-500 ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 hover:text-blue-500'/></a></div> 
  </GlowingCard>
</AutoReveal>

<AutoReveal className="w-full sm:w-[calc((100%-3rem)/3)] sm:flex-none min-w-0">
<GlowingCard glowColor="#facc15" className="border border-[#ffffff4d] bg-[#151515] p-2 rounded-md pb-4 w-full">
      
    
<div className="grid grid-cols-2 grid-rows-2 gap-4">
    <div  className=' flex space-x-2 items-center'>
      <BadgeCheck className="w-6 h-5 text-blue-500" />
      <h1 className=' text-lg'>Codedex</h1>
    </div>
    <div className='ml-auto flex flex-col items-end'>
      <div className=' w-20 lg:w-24 h-14 border border-[#ffffff4d]  p-1  rounded-md overflow-hidden' >
        <ThemeImage darkSrc={codedexLogo} lightSrc={codedexLightLogo} alt='Logo' loading="lazy" decoding="async" className='w-full h-full object-cover scale-110'/>
      </div>
      <span className=' text-xs text-gray-500 mt-1'>2024</span>
    </div>
    <div className="col-span-2 text-lg text-[#d0d0d0]">Network Support and<br></br> Security</div>
</div>
    
    <hr className="border-t border-[#ffffff38] w-full mt-2 " />
              <div className="flex justify-center mt-3"><a href="#" className="group text-gray-300 hover:text-blue-600 flex items-center relative text-sm"><span className='relative inline-block after:content-[""] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[1px] after:w-1/2 after:bg-blue-200 after:transition-[width] after:duration-300 hover:after:w-full'>Learn More</span><ArrowUpRight className='text-gray-500 ml-2 w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1 hover:text-blue-500'/></a></div> 
  </GlowingCard>
</AutoReveal>
</GlowingCards>
        </div>
      </section>
    </div>
  )
}

export default Certifications