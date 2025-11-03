// --- 1. Global Variables (The Tools) ---
const lightBox = document.querySelector("#light-box");
const ourRooms = document.getElementById("our-rooms");
const lightBoxImage = document.getElementById("light-box-image");
const closeButton = document.getElementById("close-btn");
const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");

// Dynamic Variables (The Map and GPS - key to scalability)
let currentGalleryImages = []; // Array of photos for the CURRENT room.
let currentIndex = -1;        // Position of the current photo in the array.


// --- 2. Navigation Functions ---

function showNextImage() {
    if (currentGalleryImages.length > 0) {
        // (current index + 1) % total length = the loop math
        currentIndex = (currentIndex + 1) % currentGalleryImages.length; 
        lightBoxImage.src = currentGalleryImages[currentIndex].src;
    }
}

function showPreviousImage() {
    if (currentGalleryImages.length > 0) {
        // Ensures index loops back from 0 to the last photo
        currentIndex = (currentIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        lightBoxImage.src = currentGalleryImages[currentIndex].src;
    }
}

// --- 3. Lightbox Opening Logic (The Scalability Engine) ---

// Listener 1: Opens the Lightbox and builds the current room's photo array
ourRooms.addEventListener('click', function(event) {
    const clickedPhoto = event.target.closest('.fotos');
    
    if (clickedPhoto) {
        // 1. Find the specific room container that holds ALL its photos
        // This works because every room now has <div class="room-gallery">
        const roomContainer = clickedPhoto.closest('.room-gallery');

        // 2. Build the dynamic array and set the starting index
        if (roomContainer) {
            // Get all <img> tags within ONLY that specific room's container
            currentGalleryImages = Array.from(roomContainer.querySelectorAll('img'));
            
            // Find the starting position of the clicked photo
            currentIndex = currentGalleryImages.findIndex(function(photo) {
                return photo.src === clickedPhoto.src;
            });
        }
        
        // Open the lightbox and set the image
        lightBoxImage.src = clickedPhoto.src;
        lightBox.style.display = "flex"; 
        
        // 3. Show/Hide navigation buttons based on the array size
        if (currentGalleryImages.length > 1) {
            previousButton.style.display = "block";
            nextButton.style.display = "block";
        } else {
            // For single-photo rooms, hide the buttons
            previousButton.style.display = "none";
            nextButton.style.display = "none";
        }
    }
});


// --- 4. Button Listeners (Interaction) ---

nextButton.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevents click from closing the lightbox
    showNextImage();
});

previousButton.addEventListener('click', function(event) {
    event.stopPropagation(); 
    showPreviousImage();
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' || event.keyCode === 39) {
       showNextImage();
    }
    else if (event.key === 'ArrowLeft' || event.keyCode === 37) {
       showPreviousImage();
    }
    
});

// Listener for closing the Lightbox
lightBox.addEventListener('click', function(event) {
    // Check if the click was directly on the lightbox background OR the close button
    if (event.target === lightBox || event.target === closeButton) {
        lightBox.style.display = "none";
        // Reset the array/index when closing
        currentGalleryImages = [];
        currentIndex = -1;
    }

});
