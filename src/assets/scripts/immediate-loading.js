import 'current-device';

function calculateViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// window.addEventListener('resize', calculateViewportHeight);
// window.addEventListener('load', calculateViewportHeight);
window.addEventListener('DOMContentLoaded', calculateViewportHeight);
if (document.documentElement.classList.contains('desktop')) {
    window.addEventListener('resize', calculateViewportHeight);
}
calculateViewportHeight()