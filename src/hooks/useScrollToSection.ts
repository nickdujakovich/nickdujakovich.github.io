import { useEffect } from 'react'
import type { MutableRefObject } from 'react'
import { useLocation } from 'react-router-dom'

export function useScrollToSection(isProgrammaticScroll: MutableRefObject<boolean>, headerOffset: number) {
    const location = useLocation()

    useEffect(() => {
        // Only scroll when it's a programmatic navigation (like clicking a nav link)
        // Don't auto-scroll when URL changes due to scroll spy
        if (!isProgrammaticScroll.current) return

        const path = location.pathname === '/' ? 'home' : location.pathname.replace('/', '')
        const target = document.getElementById(path)
        if (!target) return

        let scrollEndTimer: number | undefined
        let maxTimer: number | undefined

        const endProgrammatic = () => {
            isProgrammaticScroll.current = false
            if (scrollEndTimer) window.clearTimeout(scrollEndTimer)
            if (maxTimer) window.clearTimeout(maxTimer)
            window.removeEventListener('scroll', onScroll, { capture: false } as any)
        }

        const onScroll = () => {
            if (scrollEndTimer) window.clearTimeout(scrollEndTimer)
            scrollEndTimer = window.setTimeout(endProgrammatic, 250)
        }

        const targetTop = window.scrollY + target.getBoundingClientRect().top - headerOffset
        window.addEventListener('scroll', onScroll, { passive: true })
        window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
        maxTimer = window.setTimeout(endProgrammatic, 1500)

        return () => {
            if (scrollEndTimer) window.clearTimeout(scrollEndTimer)
            if (maxTimer) window.clearTimeout(maxTimer)
            window.removeEventListener('scroll', onScroll, { capture: false } as any)
            isProgrammaticScroll.current = false
        }
    }, [location, headerOffset, isProgrammaticScroll])
}


