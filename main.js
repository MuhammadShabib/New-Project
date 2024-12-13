let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides[currentSlide].classList.remove("active");
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
}

setInterval(() => {
  showSlide(currentSlide + 1);
}, 2000);
///////////////////////////////////////


const images = document.querySelectorAll(".imgslide");

const mobileQuery = window.matchMedia("(max-width: 768px)");

function updateImageSources(e) {
    images.forEach((image, index) => {
        if (e.matches) {
            // For mobile screens
            image.src = './img/slide2.png'; // Mobile-specific 
        } else {
            // For larger screens
            image.src = './img/slide1.png'; // Desktop-specific 
           
        }
    });
}

// Listen for changes in screen size
mobileQuery.addEventListener("change", updateImageSources);

// Initial check
updateImageSources(mobileQuery);





////////////////////////////////////////////// 
//////////////////// بخش محصولات
let currentPage = 1;
const totalPages = 6; // Total number of product pages
function showPage(page) {
    document.querySelectorAll('.product-container').forEach(container => {
        container.classList.remove('active');
    });
    const currentContainer = document.getElementById(`page${page}`);
    currentContainer.classList.add('active');

    // Reset animation
    const productImages = currentContainer.querySelectorAll('.product_img col-xl-4 col-md-6 col-sm-5 col-12');
    productImages.forEach((img, index) => {
        img.style.animationDelay = `${index * 0.1}s`; // Stagger effect
        img.style.opacity = '0';
        img.style.transform = 'translateY(20px)';
        void img.offsetWidth; // Trigger reflow to restart animation
        img.style.opacity = '1';
        img.style.transform = 'translateY(0)';
    });


}

document.getElementById('loadMore').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    } else {
        // Reset to the first page if reached the last page
        currentPage = 1;
        showPage(currentPage);
    }
});
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
});
document.querySelectorAll('.open-lightbox').forEach(button => {
    button.addEventListener('click', (event) => {
        const productImage = event.target.parentElement.querySelector('img');
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxDetails = document.getElementById('lightboxDetails');
        // Set image source and details
        lightboxImage.src = productImage.src;
        lightboxDetails.textContent = productImage.getAttribute('alt'); // Display the "alt" text as details
        lightbox.style.display = 'flex'; // Show lightbox
        lightbox.style.flexDirection = 'column'; // Show lightbox
    });
});
// Close lightbox on clicking the close button
document.getElementById('lightboxClose').addEventListener('click', () => {
    document.getElementById('lightbox').style.display = 'none';
});
// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
        document.getElementById('lightbox').style.display = 'none';
    }
});
// Show first page initially
showPage(currentPage);



// download images


const imageUrls = [
    './imgpo/4.jpg',
    './imgpo/1.jpg',
    './imgpo/3.jpg',
    './imgpo/2.jpg',
    './imgpo/5.jpg',
    './imgpo/6.jpg',
    './imgpo/7.jpg',
    './imgpo/8.jpg',
    './imgpo/9.jpg',
];

function downloadImages() {
    imageUrls.forEach((url, index) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `image${index + 1}.jpg`; // Suggested filename
        document.body.appendChild(link); // Append the link to the document
        link.click(); // Simulate a click on the link
        document.body.removeChild(link); // Remove the link from the document
    });
}

document.getElementById('downloadImagesBtn').addEventListener('click', downloadImages);
