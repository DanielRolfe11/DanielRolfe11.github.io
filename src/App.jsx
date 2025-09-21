import React, { useEffect, useState } from 'react'

export default function Portfolio() {
  const { hash, navigate } = useHashRoute()
  const route = parseHash(hash)
  return (
    <div className="min-h-screen w-full bg-black text-zinc-200 selection:bg-fuchsia-500/30">
      <Nav navigate={navigate} />
      <main className="relative z-10">
        {route.page === 'project' ? (
          <ProjectPage slug={route.slug} navigate={navigate} />
        ) : (
          <Home navigate={navigate} hash={hash} />
        )}
      </main>
    </div>
  )
}

const PROJECTS = [
  { slug: 'patentscout', name: 'PatentScout — Prior Art Discovery', stack: ['Python', 'Transformers', 'NLP'], blurb: 'Domain‑specific BERT embeddings over 100M+ patents; landscape expansion via citations + CPC; cosine ranking; automated PPT reporting (python‑pptx).' },
  { slug: 'free-throw-rnn', name: 'Biomechanics Free‑Throw RNN', stack: ['PyTorch', 'NumPy'], blurb: 'RNN trained on motion‑capture to predict make/miss (~80% accuracy) and surface form cues for athlete feedback.' },
  { slug: 'regional-geolocation-vit', name: 'Regional Geolocation — ViT', stack: ['Python', 'PyTorch', 'Vision'], blurb: 'Vision Transformer classifying North American regions from street‑view; preprocessing + augmentation boosted robustness (‑15% overfitting).' }
]

function useHashRoute() {
  const [hash, setHash] = useState(typeof window !== 'undefined' ? window.location.hash || '#/' : '#/')
  useEffect(() => {
    const onChange = () => setHash(window.location.hash || '#/')
    if (typeof window !== 'undefined') window.addEventListener('hashchange', onChange)
    return () => { if (typeof window !== 'undefined') window.removeEventListener('hashchange', onChange) }
  }, [])
  const navigate = to => {
    const target = to.startsWith('#') ? to : '#/' + to.replace(/^#?\/?/, '')
    if (typeof window !== 'undefined') window.location.hash = target
    setHash(target)
  }
  return { hash, navigate }
}

function parseHash(hash) {
  const parts = (hash || '#/').replace(/^#\/?/, '').split('/')
  if (parts[0] === 'project') return { page: 'project', slug: parts[1] || '' }
  return { page: 'home' }
}

function Home({ navigate, hash }) {
  useEffect(() => {
    const m = typeof window !== 'undefined' ? window.location.hash : ''
    const id = m && !m.startsWith('#/') ? m.replace('#', '') : ''
    if (id) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash])
  return (
    <>
      <Hero />
      <Section id="skills" title="Skills">
        <BadgeGrid
          groups={{
            Programming: ['Python', 'C/C++', 'Java', 'JavaScript', 'Bash/Shell'],
            'AI/ML': ['PyTorch', 'TensorFlow', 'Transformers', 'NumPy', 'Pandas', 'SpaCy'],
            'Web & DB': ['React', 'Flask', 'MongoDB'],
            Spoken: ['English', 'French']
          }}
        />
      </Section>
      <Section id="experience" title="Experience">
        <Timeline
          items={[
            { role: 'AI/Automation Engineering Intern — Product Development', org: 'Canadian Tire Corporation', time: 'May 2025 – Aug 2025 · Toronto, ON', bullets: ['Built AI automations for patent landscape expansion, prior‑art notebooks, and semantic analysis of customer reviews.', 'Shipped scraping + analytics tools to surface top products, auto‑generate spec tables, and drive an LLM chatbot interface.', 'Automated weekly review‑intel decks with AI insights; streamlined workflows ~1700 hours/yr (≈$250K OPEX).'] },
            { role: 'Machine Learning Drylab Researcher', org: 'iGEM Toronto', time: 'Feb 2025 – Present · Toronto, ON', bullets: ['Implemented an ESM‑3 guided generation loop to propose protein sequences toward desired binding properties.', 'Integrated Boltz‑2 energy scoring to filter for stable, likely‑to‑bind candidates prior to synthesis.', 'Accelerated in‑silico design cycles for targeted phage therapies.'] },
            { role: 'Graphics Director', org: 'IEEE UofT Student Branch', time: 'Oct 2023 – Present · Toronto, ON', bullets: ['Led brand system and visuals across events and outreach; established consistent design language.'] }
          ]}
        />
      </Section>
      <Section id="projects" title="Projects">
        <ProjectGrid projects={PROJECTS} onOpen={slug => navigate('#/project/' + slug)} />
      </Section>
      <Section id="education" title="Education">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-white">University of Toronto — BASc, Computer Engineering</h3>
          <p className="text-sm text-zinc-300">Minors: AI Engineering & Engineering Business · Sep 2023 – Apr 2027 (+PEY)</p>
        </div>
      </Section>
      <Section id="contact" title="Contact">
        <div className="grid gap-4 sm:grid-cols-2">
          <ContactCard href="mailto:daniel.rolfe@mail.utoronto.ca" label="daniel.rolfe@mail.utoronto.ca" icon={<MailIcon />} />
          <ContactCard href="tel:+14372371203" label="437‑237‑1203" icon={<PhoneIcon />} />
          <ContactCard href="https://linkedin.com/in/d-rolfe" label="linkedin.com/in/d-rolfe" icon={<LinkedInIcon />} />
          <ContactCard href="https://github.com/DanielRolfe11" label="github.com/DanielRolfe11" icon={<GitHubIcon />} />
        </div>
      </Section>
      <Footer />
    </>
  )
}

function ProjectPage({ slug, navigate }) {
  const project = PROJECTS.find(p => p.slug === slug)
  return (
    <section className="relative mx-auto max-w-4xl px-6 py-14">
      <button onClick={() => navigate('#/')} className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-fuchsia-400/40 bg-white/5 px-4 py-2 text-sm text-zinc-100 hover:bg-white/10">
        <span aria-hidden>←</span> Back
      </button>
      <h1 className="text-3xl font-bold text-white">{project?.name || 'Project'}</h1>
      <p className="mt-2 text-sm text-zinc-400">Tech stack: {(project?.stack || []).join(' • ')}</p>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <PlaceholderCard title="Overview" />
          <PlaceholderCard title="Problem & Goals" />
          <PlaceholderCard title="Approach" />
          <PlaceholderCard title="Results & Impact" />
        </div>
        <div className="space-y-4">
          <PlaceholderCard title="Links & Repo" />
          <PlaceholderCard title="Technologies Used" />
        </div>
      </div>
    </section>
  )
}

function Nav({ navigate }) {
  const goTo = id => {
    if (typeof window !== 'undefined') {
      window.location.hash = '#/'
      requestAnimationFrame(() => {
        window.location.hash = '#' + id
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-black/30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div className="flex items-center gap-3">
          <BrainMark />
          <a href="#/" onClick={e => { e.preventDefault(); navigate('#/') }} className="text-sm font-semibold tracking-wide text-zinc-300">Daniel Rolfe</a>
        </div>
        <nav className="hidden gap-2 text-sm md:flex">
          {[
            ['Skills', 'skills'],
            ['Experience', 'experience'],
            ['Projects', 'projects'],
            ['Education', 'education'],
            ['Contact', 'contact']
          ].map(([label, id]) => (
            <button key={label} onClick={() => goTo(id)} className="rounded-2xl border border-fuchsia-400/30 bg-white/5 px-3 py-2 font-medium text-zinc-100 hover:bg-gradient-to-r hover:from-sky-500/20 hover:via-violet-500/20 hover:to-fuchsia-500/20">
              {label}
            </button>
          ))}
        </nav>
        <button onClick={() => goTo('projects')} className="rounded-2xl border border-fuchsia-400/30 bg-gradient-to-r from-sky-500/10 via-violet-500/10 to-fuchsia-500/10 px-4 py-2 text-xs font-semibold text-zinc-100 shadow-[0_0_24px_-8px] shadow-fuchsia-500/30 hover:from-sky-500/20 hover:via-violet-500/20 hover:to-fuchsia-500/20">View Projects</button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 pb-10 pt-16 md:pt-20">
      <div className="inline-flex items-center gap-3 rounded-full border border-fuchsia-400/30 bg-white/5 px-3 py-1 text-xs text-zinc-200">
        <WaveIcon />
        Seeking 16‑Month PEY 2026
      </div>
      <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-white md:text-6xl">Daniel Rolfe</h1>
      <p className="max-w-3xl text-lg text-zinc-300">Computer Engineering Student @ UofT · <span className="bg-gradient-to-r from-sky-400 via-violet-500 to-fuchsia-500 bg-clip-text font-semibold text-transparent">Focused on AI/ML & Software Development</span></p>
    </section>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-6 py-12">
      <h2 className="mb-6 text-3xl font-bold text-white"><span className="mr-2 inline-block h-6 w-1 rounded bg-gradient-to-b from-sky-400 via-violet-500 to-fuchsia-500 align-middle" />{title}</h2>
      {children}
    </section>
  )
}

function BadgeGrid({ groups }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Object.entries(groups).map(([group, items]) => (
        <div key={group} className="rounded-2xl border border-zinc-800 bg-white/5 p-5 shadow-inner shadow-black/40">
          <h3 className="mb-3 text-sm font-semibold text-zinc-300">{group}</h3>
          <div className="flex flex-wrap gap-2">
            {items.map(i => (
              <span key={i} className="rounded-full border border-fuchsia-400/30 bg-gradient-to-r from-sky-500/10 via-violet-500/10 to-fuchsia-500/10 px-3 py-1 text-xs text-zinc-100">{i}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function Timeline({ items }) {
  return (
    <ol className="relative border-l border-zinc-800 pl-6">
      {items.map((it, idx) => (
        <li key={idx} className="mb-10 ml-4">
          <span className="absolute -left-[9px] mt-1 h-4 w-4 rounded-full bg-gradient-to-r from-sky-400 to-fuchsia-500 shadow-[0_0_24px_-6px] shadow-fuchsia-500/60" />
          <h3 className="text-xl font-semibold text-white">{it.role}</h3>
          <p className="text-sm text-zinc-400">{it.org} · {it.time}</p>
          <ul className="mt-3 space-y-2 text-zinc-300">
            {it.bullets.map((b, i) => (
              <li key={i} className="leading-relaxed">• {b}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}

function ProjectGrid({ projects, onOpen }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map(p => (
        <button key={p.slug} onClick={() => onOpen(p.slug)} className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-white/5 p-5 text-left transition hover:border-fuchsia-400/40">
          <div className="absolute inset-0 -z-10 opacity-0 blur-2xl transition group-hover:opacity-100" style={{ background: 'radial-gradient(600px 200px at 20% 0%, rgba(14,165,233,0.12), transparent), radial-gradient(600px 200px at 80% 100%, rgba(217,70,239,0.12), transparent)' }} />
          <h3 className="mb-2 text-lg font-semibold text-white">{p.name}</h3>
          <p className="mb-3 text-sm text-zinc-300 leading-relaxed">{p.blurb}</p>
          <div className="flex flex-wrap gap-2">
            {p.stack.map(s => (
              <span key={s} className="rounded-md border border-fuchsia-400/30 px-2 py-0.5 text-[10px] text-zinc-200">{s}</span>
            ))}
          </div>
        </button>
      ))}
    </div>
  )
}

function ContactCard({ href, label, icon }) {
  return (
    <a href={href} className="group flex items-center gap-3 rounded-2xl border border-zinc-800 bg-white/5 p-4 hover:border-fuchsia-400/40">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/15 via-violet-500/15 to-fuchsia-500/15">{icon}</span>
      <span className="truncate text-sm text-zinc-200 group-hover:text-white">{label}</span>
    </a>
  )
}

function PlaceholderCard({ title }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-white/5 p-5">
      <h3 className="mb-2 text-sm font-semibold text-zinc-300">{title}</h3>
      <p className="text-sm text-zinc-400">Placeholder — add your content here later.</p>
    </div>
  )
}

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-16 text-sm text-zinc-400">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Daniel Rolfe</p>
      </div>
    </footer>
  )
}

function BrainMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
      <path d="M8 4a3 3 0 1 1 6 0v1a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3v2a3 3 0 1 1-6 0V7a3 3 0 0 1 3-3V4z" stroke="url(#grad)" strokeWidth="1.5" />
      <circle cx="7" cy="7" r="1" fill="currentColor" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
      <defs>
        <linearGradient id="grad" x1="0" x2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function WaveIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" stroke="url(#g2)" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="g2" x1="0" x2="1">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16v12H4z" stroke="currentColor" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M6 3h4l1 4-2 1a12 12 0 0 0 6 6l1-2 4 1v4a2 2 0 0 1-2 2A16 16 0 0 1 4 7a2 2 0 0 1 2-2z" stroke="currentColor" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.26-.02-2.88-1.76-2.88-1.77 0-2.04 1.38-2.04 2.8V21h-4z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.93c.58.1.79-.26.79-.57l-.01-2.02c-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.3-1.68-1.3-1.68-1.06-.73.08-.72.08-.72 1.18.08 1.8 1.22 1.8 1.22 1.04 1.79 2.74 1.27 3.41.97.1-.76.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.2-3.12-.12-.29-.52-1.47.11-3.06 0 0 .98-.31 3.2 1.19a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.19 3.2-1.19.63 1.59.23 2.77.11 3.06.75.82 1.2 1.86 1.2 3.12 0 4.43-2.69 5.41-5.25 5.69.42.36.79 1.08.79 2.18l-.01 3.24c0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" />
    </svg>
  )
}
