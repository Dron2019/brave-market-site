const questionList = document.querySelector('.about-screen5__list.about-list');

questionList.addEventListener('click', evt => {
  const button = evt.target.closest('[data-about-item-label]');

  if (!button) return;
  if (button.closest('.answer-active')) {
    button.classList.remove('answer-active');
    button.nextElementSibling.style.display = 'none';
  } else {
    button.classList.add('answer-active');
    button.nextElementSibling.style.display = 'block';
  }
});
