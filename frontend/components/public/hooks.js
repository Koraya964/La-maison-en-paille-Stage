import { useRef, useState, useEffect } from "react";

export function useParallax() {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const handler = () => {
            el.style.backgroundPositionY = `calc(50% + ${window.scrollY * 0.35}px)`;
        };
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);
    return ref;
}

export function useVisible(threshold = 0.12) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

export function useScrolled(offset = 60) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > offset);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, [offset]);
    return scrolled;
}