import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export function useScrollSpy(headerOffset: number) {
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        let ticking = false

        const computeAndNavigate = () => {
            ticking = false

            const sections = Array.from(document.querySelectorAll<HTMLElement>('.section'))
            if (sections.length === 0) return
            let bestId = 'home'
            let bestDist = Infinity

            for (const el of sections) {
                const rect = el.getBoundingClientRect()
                const dist = Math.abs(rect.top - headerOffset)

                if (dist < bestDist) {
                    bestDist = dist
                    bestId = el.id
                }
            }
            const nextPath = bestId === 'home' ? '/' : `/${bestId}`
            if (location.pathname !== nextPath) {
                navigate(nextPath, { replace: true })
            }
        }

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(computeAndNavigate)
                ticking = true
            }
        }

        const onResize = () => {
            computeAndNavigate()
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onResize)
        computeAndNavigate()
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
        }
    }, [navigate, location.pathname, headerOffset])
}


