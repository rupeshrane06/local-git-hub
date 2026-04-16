// ===============================
// HERO BANNER (KEEP AS IS)
// ===============================
const heroSection = document.querySelector(".hero-banner-section");
const banner = document.querySelector(".banner_sec");
const video = document.querySelector(".banner_sec video");

let heroCurrent = 0;
let heroTarget = 0;

function animateBanner() {

    if (!heroSection || !banner || !video) return;

    const rect = heroSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = (-rect.top) / (rect.height - windowHeight);
    progress = Math.max(0, Math.min(1, progress));

    heroTarget = progress;
    heroCurrent += (heroTarget - heroCurrent) * 0.08;

    let ease = heroCurrent * heroCurrent * (3 - 2 * heroCurrent);

    banner.style.transform = `translate(-50%, -50%) scale(${1 + ease * 5})`;
    video.style.transform = `scale(${1.3 - ease * 0.2})`;

    if (rect.top <= -300) {
        banner.style.opacity = "0";
    } else {
        banner.style.opacity = "1";
    }

    requestAnimationFrame(animateBanner);
}


// ===============================
// FEATURE SECTION (FIXED)
// ===============================
gsap.registerPlugin(ScrollTrigger);

function initFeatureAnimation() {

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".stats-feature-section",
            start: "top top",
            end: "+=200%", // enough scroll space
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    });

    // STEP 1: SKETCH GOES UP
    tl.to(".sketch-layer", {
        y: "-100%",
        ease: "none",
        duration: 1
    }, 0);

    // STEP 2: REAL IMAGE REVEAL (same time)
    tl.to(".real-layer", {
        clipPath: "inset(0% 0 0 0)",
        ease: "none",
        duration: 1
    }, 0);

    // STEP 3: TEXT APPEARS ONLY AFTER IMAGE COMPLETE
    tl.to(".feature-section-content", {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power1.out"
    }, 0.9); // 🔥 IMPORTANT DELAY
}


// ===============================
// SWIPER
// ===============================
const swiperInstances = [];

function initAllSwipers() {
    document.querySelectorAll('.projectSwiper').forEach((el) => {
        const s = new Swiper(el, {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: { el: ".swiper-pagination", clickable: true },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
        swiperInstances.push(s);
    });
}

function switchTab(event, tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('d-none');
    });

    document.querySelectorAll('.btn-tab').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(tabId).classList.remove('d-none');
    event.currentTarget.classList.add('active');

    swiperInstances.forEach(s => s.update());
}


// ===============================
// GALLERY
// ===============================
function initGallery() {
    new Swiper('.mainGallerySwiper', {
        loop: true,
        speed: 1000,
        effect: "fade",
        fadeEffect: { crossFade: true },
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    });
}


// ===============================
// INIT
// ===============================
document.addEventListener("DOMContentLoaded", function () {
    animateBanner();
    initFeatureAnimation(); // ✅ FIXED
    initAllSwipers();
    initGallery();
});