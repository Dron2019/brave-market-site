function checkModal(evt) {
    const target = evt.target.closest('[data-modal-call]');
    if (!target) return;
    const modal = document.querySelector('[data-modal]');
    modal.classList.add('active');
  }
  function checkModalClose(evt) {
    const target = evt.target.closest('[data-modal-close]');
    if (!target) return;
    const modal = document.querySelector('[data-modal]');
    modal.classList.remove('active');
  }


export function modalHandler() {
    document.body.addEventListener('click',function(evt){
        checkModal(evt);
        checkModalClose(evt);
    });
}