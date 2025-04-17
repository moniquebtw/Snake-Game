const modal = document.getElementById('rulesModal');
const btn = document.getElementById('rules');
const closeBtn = document.getElementsByClassName('close')[0];

btn.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});
