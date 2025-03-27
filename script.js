
// JavaScript for Mobile Menu 

    function toggleMenu() {
        document.querySelector('.nav-links').classList.toggle('active');
    }





// Real-time Counter (Example - Needs backend integration)
let plasticCount = 0;
let rewardsCount = 0;

function updateCounter() {
    plasticCount += Math.floor(Math.random() * 10); // Simulate plastic collected
    rewardsCount += Math.floor(Math.random() * 5); // Simulate rewards issued

    document.getElementById('plastic-counter').textContent = plasticCount;
    document.getElementById('rewards-counter').textContent = rewardsCount;
}

setInterval(updateCounter, 3000); // Update every 3 seconds

// Example: Wallet Balance (Needs Web3 integration)
document.getElementById('token-balance').textContent = 150; // Example balance






let slideIndex = 0;

function moveSlide(n) {
    const slides = document.querySelectorAll('.testimonial');
    slideIndex += n;

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    document.querySelector('.testimonial-slider').style.transform = 
        `translateX(-${slideIndex * 100}%)`;
}

// Auto-slide every 5 seconds
setInterval(() => moveSlide(1), 5000);
