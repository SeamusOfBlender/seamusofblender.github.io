const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');

let currentImageIndex;

// Add click event listener to modals

modalOverlay.addEventListener('click', event => {
  if (event.target === modalOverlay) {
    modalOverlay.style.display = 'none';
  }
});

modalPrev.addEventListener('click', () => {
  if (currentImageIndex > 0) {
    showImage(currentImageIndex - 1);
  }
});

modalNext.addEventListener('click', () => {
  if (currentImageIndex < images.length - 1) {
    showImage(currentImageIndex + 1);
  }
});





