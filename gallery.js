window.addEventListener('load', () => {
    const gallery = document.querySelector('.gallery');
    const artworkDir = 'artwork';
    fetch(artworkDir)
      .then(response => response.text())
      .then(text => {
        const fileNames = text
          .split(/\s+/)
          .filter(fileName => /\.(jpe?g|png|gif)$/i.test(fileName));
        for (let i = 0; i < fileNames.length; i++) {
          const img = document.createElement('img');
          img.src = `${artworkDir}/${fileNames[i]}`;
          gallery.appendChild(img);
        }
      })
      .catch(error => console.error(error));
  });
  