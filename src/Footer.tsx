import { Link } from 'react-router-dom'
import {
  InstagramIcon,
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
} from '@/components/SocialIcons'

const socials = [
  { href: 'https://www.instagram.com/sjysqx/', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://www.facebook.com/profile.php?id=61584695366129', label: 'Facebook', Icon: FacebookIcon },
  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: LinkedinIcon },
  { href: 'https://github.com/SkreTyr', label: 'GitHub', Icon: GithubIcon },
]

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/certifications', label: 'Certifications' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className='site-footer relative z-10 w-full border-t border-[#ffffff38] mt-20'>
      <div className='mx-auto w-11/12 max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-3'>
        <div>
          <h2 className='font-bebas text-2xl text-[#f5f5f5]'>Shann Agang</h2>
          <p className='mt-2 text-sm text-gray-400 max-w-xs'>
            Software Engineer building reliable, thoughtful web experiences.
          </p>
          <div className='mt-5 flex items-center gap-4'>
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={label}
                className='text-gray-400 hover:text-blue-400 transition-colors'
              >
                <Icon className='w-5 h-5' />
              </a>
            ))}
          </div>
        </div>

        <div className='md:justify-self-center'>
          <h3 className='text-sm font-semibold text-[#f5f5f5] uppercase tracking-wide'>Navigate</h3>
          <ul className='mt-4 space-y-2 text-sm'>
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className='text-gray-400 hover:text-blue-400 transition-colors'>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='md:justify-self-end'>
          <h3 className='text-sm font-semibold text-[#f5f5f5] uppercase tracking-wide'>Get in touch</h3>
          <a
            href='mailto:shannmichaelagang@gmail.com'
            className='mt-4 inline-block text-sm text-gray-400 hover:text-blue-400 transition-colors break-all'
          >
            shannmichaelagang@gmail.com
          </a>
          <p className='mt-4 text-xs text-gray-500'>Open to opportunities &amp; collaborations.</p>
        </div>
      </div>

      <div className='border-t border-[#ffffff38]'>
        <div className='mx-auto w-11/12 max-w-6xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500'>
          <p>&copy; {year} Shann Agang. All rights reserved.</p>
          <button
            type='button'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='text-gray-400 hover:text-blue-400 transition-colors'
          >
            Back to top &uarr;
          </button>
        </div>
      </div>
    </footer>
  )
}

export default Footer