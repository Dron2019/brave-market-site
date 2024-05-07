export default function upArrow() {
    document.body.addEventListener('click',function(evt){
        const target = evt.target.closest('[data-up-arrow]');
        if (!target) return;
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    });
}