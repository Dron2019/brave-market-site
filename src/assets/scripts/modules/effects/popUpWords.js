import { splitElementByWords } from "./splitLinesAndFadeUp";

export function popUpWords(selector, triggerOptions = {}, timelineOptions = {}) {
    const $title = document.querySelector(selector);
    splitElementByWords($title);

    gsap.timeline({
        defaults: {
            ease: 'none'
        },
        scrollTrigger: {
            trigger: $title,
            scrub: true,
            end: '150% bottom',
            ...triggerOptions
        }
    })
    .from($title.children, {
        opacity: 0.5,
        stagger: 0.1,
        ...timelineOptions
    })
}