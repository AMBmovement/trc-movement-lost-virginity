import './style.css'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)

const cursor = document.querySelector('.cursor-dot')
window.addEventListener('mousemove', (e) => {
  gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power2.out' })
})

const nav = document.querySelector('[data-nav]')
lenis.on('scroll', ({ scroll }) => {
  nav.classList.toggle('is-visible', scroll > window.innerHeight * 0.6)
})

const heroLines = document.querySelectorAll('.hero__title .line')
gsap.set(heroLines, { yPercent: 110 })
gsap
  .timeline({ delay: 0.2 })
  .to(heroLines, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 })
  .from('.hero__eyebrow', { opacity: 0, y: 16, duration: 0.7 }, 0)
  .from('.hero__sub', { opacity: 0, y: 16, duration: 0.7 }, 0.5)
  .from('.scroll-cue', { opacity: 0, duration: 0.6 }, 0.8)

gsap.utils.toArray('.section:not(.hero) [data-reveal]').forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%' },
  })
})

gsap.utils.toArray('[data-split-lines]').forEach((el) => {
  gsap.fromTo(
    el,
    { opacity: 0.25 },
    {
      opacity: 1,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 45%', scrub: true },
    }
  )
})

const disciplinesSection = document.querySelector('[data-disciplines]')
const chapters = gsap.utils.toArray('[data-chapter]')

ScrollTrigger.create({
  trigger: disciplinesSection,
  start: 'top top',
  end: 'bottom bottom',
  scrub: true,
  onUpdate(self) {
    const progress = self.progress
    const segment = 1 / chapters.length
    const fade = segment * 0.25

    chapters.forEach((chapter, i) => {
      const segStart = i * segment
      const segEnd = segStart + segment
      const isLast = i === chapters.length - 1
      let opacity = 0

      if (progress >= segStart && progress <= segEnd) {
        if (progress < segStart + fade) {
          opacity = (progress - segStart) / fade
        } else if (!isLast && progress > segEnd - fade) {
          opacity = (segEnd - progress) / fade
        } else {
          opacity = 1
        }
      } else if (isLast && progress > segEnd) {
        opacity = 1
      }

      gsap.set(chapter, { opacity, y: (1 - opacity) * 30 })
    })
  },
})

gsap.utils.toArray('.stat__number').forEach((el) => {
  const target = Number(el.dataset.count)
  const counter = { val: 0 }

  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter() {
      gsap.to(counter, {
        val: target,
        duration: 1.6,
        ease: 'power1.out',
        onUpdate: () => {
          el.textContent = Math.floor(counter.val)
        },
      })
    },
  })
})

document.querySelector('[data-year]').textContent = new Date().getFullYear()

window.addEventListener('load', () => ScrollTrigger.refresh())
