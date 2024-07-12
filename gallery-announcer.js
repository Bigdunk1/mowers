<script type="module" src="gallery-announcer.js"></script>;
// gallery.js
const images = [
  {
    image: "images/cold-forest.jpg",
    thumbnail: "images/cold-forest.jpg",
    alt: "A cold, frozen forest",
  },
  {
    image: "images/cold-forest2.jpg",
    thumbnail: "images/cold-forest2.jpg",
    alt: "A cold, frozen forest... coooold.",
  },
  {
    image: "images/foggy-forest.jpg",
    thumbnail: "images/foggy-forest.jpg",
    alt: "A very foggy forest.",
  },
];

let currentImage = 0;
let isAnimating = false;

// Initialize the gallery
function initGallery() {
  createThumbnails();
  updateDisplayImage(images[currentImage]);
}

// Create thumbnail images and add them to the thumbnails div
function createThumbnails() {
  const thumbnailEl = document.getElementById("thumbnails");

  images.forEach((img, index) => {
    let thumb = new Image();
    thumb.src = img.thumbnail;
    thumb.onclick = () => updateDisplayImage(images[index]);
    thumbnailEl.appendChild(thumb);
  });
}

// Update the main display image with fade effect
function updateDisplayImage(image) {
  if (isAnimating) return;

  const displayEl = document.getElementById("displayImage");
  let mainImage = displayEl.firstChild; // Get the existing image

  if (!mainImage) {
    // If no image exists, create a new one and append
    mainImage = new Image();
    displayEl.appendChild(mainImage);
  }

  // Start fade-out
  mainImage.style.opacity = "0";

  // After fade-out, change the image source and fade in
  setTimeout(() => {
    mainImage.src = image.image;
    mainImage.style.opacity = "1";
    announceImage(image.alt); // Announce the alt text
  }, 500); // Match this duration with the CSS transition time

  isAnimating = true;
  setTimeout(() => (isAnimating = false), 1000); // Reset the animation lock
}

// Event listeners for next and previous buttons
document.getElementById("button-next").onclick = () => changeImage(1);
document.getElementById("button-previous").onclick = () => changeImage(-1);

// Change image based on direction (next or previous)
function changeImage(direction) {
  currentImage += direction;
  if (currentImage >= images.length) currentImage = 0;
  if (currentImage < 0) currentImage = images.length - 1;
  updateDisplayImage(images[currentImage]);
}

// Function to update the announcer text
function announceImage(altText) {
  const announcerEl = document.getElementById("announcer");
  announcerEl.textContent = altText;
}

// Initialize the gallery on page load
window.onload = initGallery;
