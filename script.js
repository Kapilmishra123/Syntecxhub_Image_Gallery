/* =========================
   SELECT ELEMENTS
========================= */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const galleryItems =
    document.querySelectorAll(".gallery-item");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const closeBtn =
    document.getElementById("closeBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");


/* =========================
   FILTER FUNCTIONALITY
========================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

        // Get selected category
        const filter =
            button.getAttribute("data-filter");


        // Show/Hide gallery items
        galleryItems.forEach(item => {

            const category =
                item.getAttribute("data-category");


            if (
                filter === "all" ||
                category === filter
            ) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});


/* =========================
   LIGHTBOX
========================= */

// Array of visible images
let currentImages = [];

let currentIndex = 0;


// Open Lightbox
galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        // Get currently visible gallery items
        currentImages =
            Array.from(galleryItems)
            .filter(item =>
                item.style.display !== "none"
            );


        // Find clicked image index
        currentIndex =
            currentImages.indexOf(item);


        // Show selected image
        showImage();


        // Open lightbox
        lightbox.classList.add("active");

    });

});


/* =========================
   SHOW IMAGE
========================= */

function showImage() {

    const image =
        currentImages[currentIndex]
        .querySelector("img");

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

}


/* =========================
   NEXT BUTTON
========================= */

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (
        currentIndex >=
        currentImages.length
    ) {

        currentIndex = 0;

    }

    showImage();

});


/* =========================
   PREVIOUS BUTTON
========================= */

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex =
            currentImages.length - 1;

    }

    showImage();

});


/* =========================
   CLOSE LIGHTBOX
========================= */

closeBtn.addEventListener("click", () => {

    lightbox.classList.remove("active");

});


/* =========================
   CLOSE ON BACKGROUND CLICK
========================= */

lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {

        lightbox.classList.remove("active");

    }

});


/* =========================
   KEYBOARD NAVIGATION
========================= */

document.addEventListener("keydown", (event) => {

    // Escape = Close
    if (event.key === "Escape") {

        lightbox.classList.remove("active");

    }


    // Right Arrow = Next
    if (
        event.key === "ArrowRight" &&
        lightbox.classList.contains("active")
    ) {

        nextBtn.click();

    }


    // Left Arrow = Previous
    if (
        event.key === "ArrowLeft" &&
        lightbox.classList.contains("active")
    ) {

        prevBtn.click();

    }

});
