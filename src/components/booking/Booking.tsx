import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { site } from '../../config/site';
import { eventTypeOptions, serviceOptions, type ServiceOption } from '../../data/content';
import { ease } from '../../lib/animations/easing';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { RevealHeading } from '../ui/RevealHeading';
import { SectionFx } from '../ui/SectionFx';
import { SectionLabel } from '../ui/SectionLabel';
import { useBooking } from './BookingContext';

/**
 * FRONTEND PROTOTYPE ONLY.
 * All values live in local React state. Nothing is transmitted, stored or
 * persisted. Connect to a real service only after privacy/terms are confirmed.
 */

type FormState = {
  eventType: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  guests: string;
  services: ServiceOption[];
  other: string;
  name: string;
  phone: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const empty: FormState = {
  eventType: '', date: '', startTime: '', endTime: '', location: '', guests: '',
  services: [], other: '', name: '', phone: '', email: '', message: '',
};

const steps = ['Event', 'Services', 'Contact', 'Review'] as const;

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function validate(step: number, f: FormState): Errors {
  const e: Errors = {};
  if (step === 0) {
    if (!f.eventType) e.eventType = 'Choose an event type.';
    if (!f.date) e.date = 'Choose your event date.';
    else if (f.date < todayISO()) e.date = 'Choose a date from today onwards.';
    if (f.startTime && f.endTime && f.endTime === f.startTime) e.endTime = 'End time should differ from start time.';
    if (!f.location.trim()) e.location = 'Tell us the venue or suburb.';
    if (f.guests && (!/^\d+$/.test(f.guests) || Number(f.guests) < 1)) e.guests = 'Enter a number, e.g. 80.';
  }
  if (step === 1) {
    if (f.services.length === 0 && !f.other.trim()) e.services = 'Pick at least one service, or describe what you need.';
  }
  if (step === 2) {
    if (!f.name.trim()) e.name = 'Enter your name.';
    const digits = f.phone.replace(/[^\d]/g, '');
    if (!digits) e.phone = 'Enter a phone number so we can reach you.';
    else if (digits.length < 8 || digits.length > 12) e.phone = 'Check the phone number.';
    if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Check the email address.';
  }
  return e;
}

function formatDate(iso: string) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
}

export function Booking() {
  const [form, setForm] = useState<FormState>(empty);
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const reduce = useReducedMotion();
  const { prefill } = useBooking();

  // Apply selections coming from "Request a quote" / "Enquire" buttons elsewhere on the page.
  useEffect(() => {
    if (!prefill) return;
    const wasDone = done;
    setDone(false);
    setErrors({});
    setForm((f) => {
      const base = wasDone ? empty : f;
      const { eventType, service } = prefill;
      return {
        ...base,
        eventType: eventType ?? base.eventType,
        services: service && !base.services.includes(service) ? [...base.services, service] : base.services,
      };
    });
    if (wasDone || prefill.eventType) setStep(0);
  }, [prefill?.nonce]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (s: ServiceOption) => {
    set('services', form.services.includes(s) ? form.services.filter((x) => x !== s) : [...form.services, s]);
    if (errors.services) setErrors((e) => ({ ...e, services: undefined }));
  };

  const focusPanel = () => requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>('input, select, textarea, button')?.focus({ preventScroll: true }));

  // After a step change, bring the top of the form back into view if the user had scrolled past it.
  const keepFormInView = () => {
    const form = formRef.current;
    if (!form) return;
    const top = form.getBoundingClientRect().top;
    if (top < 0 || top > window.innerHeight * 0.5) {
      const y = top + window.scrollY - (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0) - 16;
      window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
    }
  };

  const goTo = (target: number) => {
    setDir(target > step ? 1 : -1);
    setErrors({});
    setStep(target);
    keepFormInView();
    focusPanel();
  };

  const next = () => {
    const e = validate(step, form);
    setErrors(e);
    const firstBad = Object.keys(e)[0];
    if (firstBad) {
      requestAnimationFrame(() => document.getElementById(`f-${firstBad}`)?.focus());
      return;
    }
    goTo(step + 1);
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (step < steps.length - 1) return next();
    for (let s = 0; s < 3; s++) {
      if (Object.keys(validate(s, form)).length) {
        setErrors(validate(s, form));
        return goTo(s);
      }
    }
    setDone(true); // Demo only — nothing is sent.
    keepFormInView();
  };

  const reset = () => {
    setForm(empty);
    setStep(0);
    setErrors({});
    setDone(false);
  };

  const slide = typeof window !== 'undefined' && window.innerWidth < 600 ? 16 : 40;
  const variants = {
    enter: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * slide }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => (reduce ? { opacity: 0 } : { opacity: 0, x: d * -slide }),
  };

  return (
    <section className="booking section section--alt" id="plan" aria-labelledby="booking-title">
      <SectionFx
        dots
        particles
        glows={[{ color: 'amber', x: '-12%', y: '12%', size: 620 }, { color: 'blue', x: '64%', y: '48%', size: 700 }]}
      />
      <div className="container booking__grid">
        <div className="booking__intro">
          <Reveal><SectionLabel>Plan your event</SectionLabel></Reveal>
          <RevealHeading id="booking-title" className="h-display h-display--md" lines={['Tell us about', 'your celebration.']} />
          <Reveal delay={0.15}>
            <p className="booking__copy">
              Share a few details and ask about a package for your event, venue and budget. Prefer to talk? Call us directly.
            </p>
            <div className="booking__calls">
              {site.contacts.map((c) => (
                <a key={c.id} href={c.phoneHref} className="call-chip">
                  <span className="call-chip__who">{c.initials} · {c.role}</span>
                  <span className="call-chip__num">{c.phoneDisplay}</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="booking__card">
          {done ? (
            <Success form={form} onReset={reset} />
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="booking-proto-note">
              <ol className="stepper" aria-label="Enquiry progress">
                {steps.map((label, i) => (
                  <li key={label} className={i === step ? 'is-current' : i < step ? 'is-done' : ''} aria-current={i === step ? 'step' : undefined}>
                    <span className="stepper__num">{i + 1}</span>
                    <span className="stepper__label">{label}</span>
                  </li>
                ))}
              </ol>

              <div className="booking__panel" ref={panelRef}>
                <AnimatePresence mode="wait" custom={dir} initial={false}>
                  <motion.fieldset
                    key={step}
                    custom={dir}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: ease.out }}
                  >
                    <legend className="booking__legend">
                      <span>Step {step + 1} of {steps.length}</span>
                      {['Your event', 'Services you’re interested in', 'Your details', 'Review your enquiry'][step]}
                    </legend>

                    {step === 0 && (
                      <div className="fields">
                        <Field id="eventType" label="Event type" required error={errors.eventType} wide>
                          <select id="f-eventType" value={form.eventType} onChange={(e) => set('eventType', e.target.value)} {...aria('eventType', errors)}>
                            <option value="">Select an event type</option>
                            {eventTypeOptions.map((o) => <option key={o}>{o}</option>)}
                          </select>
                        </Field>
                        <Field id="date" label="Event date" required error={errors.date}>
                          <input id="f-date" type="date" min={todayISO()} value={form.date} onChange={(e) => set('date', e.target.value)} {...aria('date', errors)} />
                        </Field>
                        <Field id="guests" label="Approx. guests" error={errors.guests}>
                          <input id="f-guests" inputMode="numeric" placeholder="e.g. 80" value={form.guests} onChange={(e) => set('guests', e.target.value)} {...aria('guests', errors)} />
                        </Field>
                        <Field id="startTime" label="Start time" error={errors.startTime}>
                          <input id="f-startTime" type="time" value={form.startTime} onChange={(e) => set('startTime', e.target.value)} {...aria('startTime', errors)} />
                        </Field>
                        <Field id="endTime" label="End time" error={errors.endTime}>
                          <input id="f-endTime" type="time" value={form.endTime} onChange={(e) => set('endTime', e.target.value)} {...aria('endTime', errors)} />
                        </Field>
                        <Field id="location" label="Venue / location in Cairns" required error={errors.location} wide>
                          <input id="f-location" autoComplete="off" placeholder="Venue name or suburb" value={form.location} onChange={(e) => set('location', e.target.value)} {...aria('location', errors)} />
                        </Field>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="fields">
                        <div className="field field--wide">
                          <p className="field__label" id="services-label">Select all that apply <span className="field__req">Required</span></p>
                          <div className="chips" role="group" aria-labelledby="services-label" aria-describedby={errors.services ? 'err-services' : undefined}>
                            {serviceOptions.map((s, i) => (
                              <label key={s} className={`chip ${form.services.includes(s) ? 'is-on' : ''}`}>
                                <input
                                  id={i === 0 ? 'f-services' : undefined}
                                  type="checkbox"
                                  checked={form.services.includes(s)}
                                  onChange={() => toggleService(s)}
                                />
                                <span className="chip__box" aria-hidden="true" />
                                {s}
                              </label>
                            ))}
                          </div>
                          {form.services.length > 1 && <p className="field__hint">Multiple services selected — we’ll suggest a combined package.</p>}
                          {errors.services && <p className="field__error" id="err-services">{errors.services}</p>}
                        </div>
                        <Field id="other" label="Other requirements" wide>
                          <textarea id="f-other" rows={4} placeholder="Theme, colours, stage size, anything else on your mind" value={form.other} onChange={(e) => set('other', e.target.value)} />
                        </Field>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="fields">
                        <Field id="name" label="Your name" required error={errors.name}>
                          <input id="f-name" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} {...aria('name', errors)} />
                        </Field>
                        <Field id="phone" label="Phone" required error={errors.phone}>
                          <input id="f-phone" type="tel" autoComplete="tel" placeholder="04xx xxx xxx" value={form.phone} onChange={(e) => set('phone', e.target.value)} {...aria('phone', errors)} />
                        </Field>
                        <Field id="email" label="Email (optional)" error={errors.email} wide>
                          <input id="f-email" type="email" autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} {...aria('email', errors)} />
                        </Field>
                        <Field id="message" label="Message" wide>
                          <textarea id="f-message" rows={4} placeholder="Tell us about your celebration" value={form.message} onChange={(e) => set('message', e.target.value)} />
                        </Field>
                      </div>
                    )}

                    {step === 3 && <Review form={form} onEdit={goTo} />}
                  </motion.fieldset>
                </AnimatePresence>
              </div>

              <div className="booking__actions">
                {step > 0 ? (
                  <Button variant="ghost" onClick={() => goTo(step - 1)}>Back</Button>
                ) : <span />}
                {step < steps.length - 1 ? (
                  <Button arrow onClick={next}>Continue</Button>
                ) : (
                  <Button type="submit" arrow>Send enquiry</Button>
                )}
              </div>

              <p className="proto-note" id="booking-proto-note">
                Website prototype — this form does not send or store your details. To enquire now, please call GM or LJ.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function aria(key: keyof FormState, errors: Errors) {
  return {
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `err-${key}` : undefined,
  };
}

function Field({ id, label, required, error, wide, children }: { id: string; label: string; required?: boolean; error?: string; wide?: boolean; children: ReactNode }) {
  return (
    <div className={`field ${wide ? 'field--wide' : ''} ${error ? 'has-error' : ''}`}>
      <label htmlFor={`f-${id}`} className="field__label">
        {label} {required && <span className="field__req">Required</span>}
      </label>
      {children}
      {error && <p className="field__error" id={`err-${id}`}>{error}</p>}
    </div>
  );
}

function Review({ form, onEdit }: { form: FormState; onEdit: (step: number) => void }) {
  const time = [form.startTime, form.endTime].filter(Boolean).join(' – ');
  const groups: { title: string; step: number; rows: [string, string][] }[] = [
    {
      title: 'Event', step: 0,
      rows: [['Type', form.eventType], ['Date', formatDate(form.date)], ['Time', time], ['Location', form.location], ['Guests', form.guests]],
    },
    { title: 'Services', step: 1, rows: [['Services', form.services.join(', ')], ['Other', form.other]] },
    { title: 'Contact', step: 2, rows: [['Name', form.name], ['Phone', form.phone], ['Email', form.email], ['Message', form.message]] },
  ];

  return (
    <div className="review">
      {groups.map((g) => (
        <div className="review__group" key={g.title}>
          <div className="review__head">
            <h3>{g.title}</h3>
            <button type="button" className="review__edit" onClick={() => onEdit(g.step)} aria-label={`Edit ${g.title.toLowerCase()} details`}>Edit</button>
          </div>
          <dl>
            {g.rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v || <span className="review__empty">—</span>}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}

function Success({ form, onReset }: { form: FormState; onReset: () => void }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => ref.current?.focus(), []);

  return (
    <motion.div className="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: ease.out }} role="status">
      <span className="success__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="28" height="28"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      <h3 className="success__title" ref={ref} tabIndex={-1}>Thank you — let’s make it special.</h3>
      <p className="success__summary">
        {form.eventType}{form.date ? ` on ${formatDate(form.date)}` : ''}{form.location ? ` · ${form.location}` : ''}
      </p>
      <div className="success__notice">
        <strong>Prototype notice:</strong> this is a website prototype. Your enquiry has <em>not</em> been sent and no
        details were stored. To book or ask about a package, please call:
      </div>
      <div className="booking__calls">
        {site.contacts.map((c) => (
          <a key={c.id} href={c.phoneHref} className="call-chip">
            <span className="call-chip__who">{c.initials} · {c.role}</span>
            <span className="call-chip__num">{c.phoneDisplay}</span>
          </a>
        ))}
      </div>
      <Button variant="link" arrow onClick={onReset}>Start a new enquiry</Button>
    </motion.div>
  );
}
