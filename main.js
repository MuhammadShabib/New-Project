
const images = [
    { id: 'image1', mobileSrc: './img/slide2.png', desktopSrc: './img/slide1.png' },
    { id: 'image2', mobileSrc: './imgpo/13 copy.jpg', desktopSrc: './imgpo/10 copy.jpg' },
    { id: 'image3', mobileSrc: './imgpo/14 copy.jpg', desktopSrc: './imgpo/11 copy.jpg' },
    { id: 'image4', mobileSrc: './imgpo/15 copy.jpg', desktopSrc: './imgpo/12 copy.jpg' }
];

let currentSlide = 0;

function checkWidth() {
    const isMobile = window.innerWidth <= 820;

    images.forEach(image => {
        const imgElement = document.getElementById(image.id);
        imgElement.src = isMobile ? image.mobileSrc : image.desktopSrc;
    });
}

function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    slides[currentSlide].classList.remove("active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
}

setInterval(() => {
    showSlide(currentSlide + 1);
}, 2000); // تغییر به هر 3 ثانیه

window.addEventListener('resize', checkWidth);
window.addEventListener('load', () => {
    checkWidth();
    showSlide(currentSlide);
});

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
        lightbox.style.fontSize = '20px'; // Show lightbox
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
