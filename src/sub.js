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

gsap.utils.toArray('[data-reveal]').forEach((el) => {
  gsap.from(el, {
    opacity: 0,
    y: 40,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 85%' },
  })
})

const ctaForm = document.querySelector('.cta__form')
if (ctaForm) {
  ctaForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const phone = ctaForm.dataset.whatsapp
    const nombre = ctaForm.nombre.value.trim()
    const contacto = ctaForm.contacto.value.trim()
    const mensaje = ctaForm.mensaje.value.trim()

    const texto = [
      `Hola, soy ${nombre}.`,
      `Contacto: ${contacto}.`,
      mensaje ? `Quiero entrenar: ${mensaje}` : 'Quiero probar una clase.',
    ].join(' ')

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(texto)}`, '_blank')
  })
}

const yearEl = document.querySelector('[data-year]')
if (yearEl) yearEl.textContent = new Date().getFullYear()

window.addEventListener('load', () => ScrollTrigger.refresh())
