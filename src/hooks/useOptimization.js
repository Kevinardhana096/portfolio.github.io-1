import { useEffect, useState } from 'react'

// Hook untuk deteksi device
export const useDeviceDetection = () => {
    const [device, setDevice] = useState({
        isMobile: false,
        isTablet: false,
        isDesktop: true
    })

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            setDevice({
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                isDesktop: width >= 1024
            })
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return device
}

// Hook untuk reduce motion preference
export const useReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)

        const handler = (event) => setPrefersReducedMotion(event.matches)
        mediaQuery.addEventListener('change', handler)
        return () => mediaQuery.removeEventListener('change', handler)
    }, [])

    return prefersReducedMotion
}

// Hook untuk intersection observer (lazy rendering)
export const useInView = (options = {}) => {
    const [ref, setRef] = useState(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        if (!ref) return

        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting)
        }, {
            threshold: 0.1,
            rootMargin: '50px',
            ...options
        })

        observer.observe(ref)
        return () => observer.disconnect()
    }, [ref, options])

    return [setRef, isInView]
}
