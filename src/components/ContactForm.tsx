import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Props = {
  lang: 'de' | 'en'
  firstNameLabel: string
  firstNamePlaceholder: string
  lastNameLabel: string
  lastNamePlaceholder: string
  emailLabel: string
  emailPlaceholder: string
  messageLabel: string
  messagePlaceholder: string
  submitBtn: string
  formTitle: string
}

type State = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({
  lang, formTitle,
  firstNameLabel, firstNamePlaceholder,
  lastNameLabel, lastNamePlaceholder,
  emailLabel, emailPlaceholder,
  messageLabel, messagePlaceholder,
  submitBtn,
}: Props) {
  const [state, setState] = useState<State>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')
    const fd = new FormData(e.currentTarget)
    const { error } = await supabase.from('contact_submissions').insert({
      firstname: fd.get('firstname') as string,
      lastname: fd.get('lastname') as string,
      email: fd.get('email') as string,
      message: fd.get('message') as string,
      lang,
      browser_lang: navigator.language,
      screen: `${window.screen.width}x${window.screen.height}`,
      referrer: document.referrer || null,
    })
    setState(error ? 'error' : 'success')
    if (!error) (e.target as HTMLFormElement).reset()
  }

  const successMsg = lang === 'de'
    ? 'Vielen Dank! Wir melden uns bald bei Ihnen.'
    : 'Thank you! We will get back to you soon.'
  const errorMsg = lang === 'de'
    ? 'Fehler beim Senden. Bitte versuchen Sie es erneut.'
    : 'Error sending. Please try again.'

  return (
    <div className="glass-card-light p-8 md:p-12 rounded-3xl shadow-xl shadow-slate-200">
      <h3 className="text-2xl font-normal text-slate-900 mb-8">{formTitle}</h3>

      {state === 'success' ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
          </div>
          <p className="text-slate-700 font-medium">{successMsg}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{firstNameLabel}</label>
              <input name="firstname" required placeholder={firstNamePlaceholder}
                className="w-full h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{lastNameLabel}</label>
              <input name="lastname" required placeholder={lastNamePlaceholder}
                className="w-full h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">{emailLabel}</label>
            <input name="email" type="email" required placeholder={emailPlaceholder}
              className="w-full h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">{messageLabel}</label>
            <textarea name="message" rows={4} placeholder={messagePlaceholder}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none" />
          </div>
          {state === 'error' && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{errorMsg}</p>
          )}
          <button type="submit" disabled={state === 'submitting'}
            className="rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 bg-primary text-white shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] px-8 py-4 text-base w-full disabled:opacity-60 disabled:scale-100">
            {state === 'submitting'
              ? (lang === 'de' ? 'Wird gesendet…' : 'Sending…')
              : submitBtn}
            {state !== 'submitting' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
