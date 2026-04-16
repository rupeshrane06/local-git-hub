// ===============================
// HERO BANNER ANIMATION
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

    // Banner scale
    banner.style.transform = `translate(-50%, -50%) scale(${1 + ease * 5})`;

    // Video zoom
    video.style.transform = `scale(${1.3 - ease * 0.2})`;

    // Hide banner after scroll
    if (rect.top <= -300) {
        banner.style.opacity = "0";
        banner.style.pointerEvents = "none";
    } else {
        banner.style.opacity = "1";
        banner.style.pointerEvents = "auto";
    }

    requestAnimationFrame(animateBanner);
}


// ===============================
// FEATURE SECTION (JP STYLE FIX)
// ===============================
gsap.registerPlugin(ScrollTrigger);

function initFeatureAnimation() {

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".stats-feature-section",
            start: "top top",
            end: "+=180%", // adjust speed here
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    });

    // 🟡 SKETCH CUT FROM BOTTOM → TOP (NO MOVEMENT)
    tl.to(".sketch-layer", {
        clipPath: "inset(0% 0 100% 0)", // 🔥 correct direction
        ease: "none"
    }, 0);

    // 🟢 REAL IMAGE REVEAL FROM BOTTOM → TOP
    tl.to(".real-layer", {
        clipPath: "inset(0% 0 0% 0)",
        ease: "none"
    }, 0);

    // 🔵 TEXT APPEARS AFTER IMAGE COMPLETE
    tl.to(".feature-section-content", {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power1.out"
    }, 0.85);
}


// ===============================
// PROJECT SWIPER
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
// GALLERY SWIPER
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
        },
        observer: true,
        observeParents: true
    });
}


// ===============================
// INIT (ONLY ONE ENTRY POINT)
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    animateBanner();          // hero animation
    initFeatureAnimation();   // feature animation (fixed)
    initAllSwipers();         // project sliders
    initGallery();            // gallery slider

});