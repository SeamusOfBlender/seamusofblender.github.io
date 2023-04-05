const gallery = document.querySelector('.gallery');
const modalOverlay = document.querySelector('.modal-overlay');
const modalImage = document.querySelector('.modal-image');
const modalPrev = document.querySelector('.modal-prev');
const modalNext = document.querySelector('.modal-next');
const modalClose = document.querySelector('.modal-close');

let currentImageIndex;
let images;

// Fetch images from server artwork folder, and create gallery
fetch('artwork/')
  .then(response => response.text())
  .then(html => {

    //Parse the files found as html, for reading the information
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    //Get all of the images from the folder that match .png .jpeg .jpg, etc file formats
    images = Array.from(doc.querySelectorAll('a'))
      .map(img => img.getAttribute('href'))
      .filter(src => /\.(jpe?g|png|gif)$/i.test(src));
    let index = 0;

    //For each image, add a wrapper. This wrapper will be used for interaction with the gallery
    images.forEach(src => {
      const imgWrapper = document.createElement('a');
      imgWrapper.href = '#';
      const img = document.createElement('img');
      img.src = src;
      imgWrapper.appendChild(img);
      gallery.appendChild(imgWrapper);

      //Index the images for easy navigation
      img.dataset.index = index;
      index++;

      // Add click event listener to open modal with full-size image
      imgWrapper.addEventListener('click', event => {
        event.preventDefault();
        modalOverlay.style.display = 'block';
        currentImageIndex = event.target.getAttribute("data-index");
        showImage(currentImageIndex)
      });
    });
  });

/* 
EventListeners for adding events
*/
modalOverlay.addEventListener('click', event => { //Modal Overlay that includes all of the modal
  if (event.target === modalOverlay) {
    modalOverlay.style.display = 'none';
  }
});

modalNext.addEventListener('click', () => {       //Previous button to display the previous image
  if (currentImageIndex + 1 > images.length - 1)
    currentImageIndex = 0 //Loop the gallery
  else
    currentImageIndex++;
  showImage(currentImageIndex)
});

modalPrev.addEventListener('click', () => {       //Previous button to display the previous image
  if (currentImageIndex - 1 < 0)
    currentImageIndex = images.length - 1 //Loop the gallery
  else
    currentImageIndex--;
  showImage(currentImageIndex)
});

modalClose.addEventListener('click', () => {       //Next button to display the next image
  hideImage();
});

/* 
Functions for clicking on stuff
*/
function showImage(index) {
  console.log(modalImage);
  modalImage.setAttribute("src", images[index]);
}

function hideImage() {
  modalImage.setAttribute("src", "");
  modalOverlay.style.display = 'none';
}