import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import AutoReveal from '@/components/AutoReveal'

const CONTACT_EMAIL = 'shannmichaelagang@gmail.com'

const inputClass =
  'w-full bg-[#101010] border border-[#ffffff4d] rounded-md p-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400'

const Contact = () => {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') || '')
    const email = String(data.get('email') || '')
    const message = String(data.get('message') || '')
    const subject = encodeURIComponent(`Portfolio Contact: ${name}`)
    const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`)
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="min-h-screen w-full">
      <section className="h-auto w-full flex justify-center pt-32 pb-20">
        <div className="w-full p-5 flex flex-col items-center justify-center lg:w-3/4 2xl:w-2/4">
          <AutoReveal direction="left" className="w-full">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </AutoReveal>

          <AutoReveal className="w-full">
            <h1 className="text-[#f5f5f5] font-bebas text-center mb-6 text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl">
              Get In Touch
            </h1>

            <form
              onSubmit={onSubmit}
              className="border border-[#ffffff4d] bg-[#151515] p-4 rounded-md flex flex-col gap-4"
            >
              <input name="name" required placeholder="Name" className={inputClass} />
              <input name="email" type="email" required placeholder="Email" className={inputClass} />
              <textarea name="message" required placeholder="Message" rows={5} className={inputClass} />
              <button
                type="submit"
                className="self-start inline-flex items-center rounded-md border border-white/30 bg-[#151515] px-5 py-3 text-sm font-normal text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10 cursor-pointer"
              >
                Send Message
              </button>
              {sent && (
                <p className=" text-sm text-blue-300">
                  Your email client should open with the message pre-filled.
                </p>
              )}
            </form>
          </AutoReveal>
        </div>
      </section>
    </div>
  )
}

export default Contact