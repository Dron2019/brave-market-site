export function entryAnimation(scroller, containerSelector) {
    const container = document.querySelector(containerSelector);
    const content = container.querySelector('.front-screen__content');

    let tl = gsap.timeline({
        paused: true,
    })
    .from(content.querySelector('.front-screen__subtitle'), {
        opacity: 0
    })
    .from(content.querySelector('.text-style-1920-h-1-font'), {
        opacity: 0
    })
    .from(content.querySelector('.text-style-1920-h-2-thin-font'), {
        opacity: 0
    })
    .from(content.querySelector('.delimiter'), {
        opacity: 0
    })
    
    // .kill();
    
    return tl;
}