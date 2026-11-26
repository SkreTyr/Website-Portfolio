import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import AutoReveal from '@/components/AutoReveal'

const inputClass =
  'w-full bg-[#101010] border border-[#ffffff4d] rounded-md p-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-400'

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      message: String(data.get('message') || '').trim(),
    }

    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json?.success) {
        throw new Error(json?.error || 'Something went wrong. Please try again.')
      }
      setStatus('sent')
      form.reset()
      window.setTimeout(() => setStatus('idle'), 2500)
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send message.')
    }
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
            <h1 className="text-[#f5f5f5] font-bebas text-left mb-2 text-5xl sm:text-4xl md:text-5xl 2xl:text-5xl">
              Get In Touch
            </h1>
              <p className="text-gray-400 text-sm md:text-base text-left mb-8 max-w-2xl">
                Have a project in mind, a role to fill, or just want to say hello? Send a message below and it&rsquo;ll land straight in my inbox.
              </p>
            <hr className="border-t border-[#ffffff38] w-full max-w-2xl mb-8" />

            <form
              onSubmit={onSubmit}
              className="border border-[#ffffff4d] bg-[#151515] p-4 rounded-md flex flex-col gap-4"
            >
              <input name="name" required placeholder="Name" className={inputClass} />
              <input name="email" type="email" required placeholder="Email" className={inputClass} />
              <textarea name="message" required placeholder="Message" rows={5} className={inputClass} />
              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="self-start inline-flex items-center justify-center rounded-md border border-white/30 bg-[#151515] px-5 py-3 text-sm font-normal text-white backdrop-blur-sm transition-colors duration-200 hover:bg-white/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative flex items-center justify-center min-w-[6.5rem]">
                  <span
                    className={`flex items-center gap-2 transition-all duration-300 ease-out ${
                      status === 'sent' ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
                    }`}
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </span>
                  <span
                    className={`absolute inset-0 flex items-center justify-center gap-1 text-green-300 transition-all duration-300 ease-out ${
                      status === 'sent' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    Sent
                  </span>
                </span>
              </button>
              {status === 'error' && (
                <p className="text-sm text-red-400">{errorMsg}</p>
              )}
            </form>
          </AutoReveal>
        </div>
      </section>
    </div>
  )
}

export default Contact