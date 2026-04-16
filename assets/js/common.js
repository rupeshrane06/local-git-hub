// ===============================
// GSAP INIT (ONLY ONCE)
// ===============================
gsap.registerPlugin(ScrollTrigger);


// ===============================
// HERO BANNER ANIMATION
// ===============================
function initHeroAnimation() {

    const ctx = gsap.context(() => {

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero-banner-section",
                start: "top top",
                end: "+=120%",
                scrub: true,
                pin: true,
                anticipatePin: 1
            }
        });

        tl.to(".banner_sec", {
            scale: 6,
            ease: "none"
        }, 0);

        tl.to(".banner_sec video", {
            scale: 1.1,
            ease: "none"
        }, 0);

        // tl.to(".banner_sec", {
        //     opacity: 0,
        //     zIndex: -1,
        //     ease: "none"
        // }, 0.8);

    });

    return () => ctx.revert();
}


// ===============================
// FEATURE SECTION
// ===============================
function initFeatureAnimation() {

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".stats-feature-section",
            start: "top top",
            end: "+=180%",
            scrub: true,
            pin: true,
            anticipatePin: 1
        }
    });

    tl.to(".sketch-layer", {
        clipPath: "inset(0% 0 100% 0)",
        ease: "none"
    }, 0);

    tl.to(".real-layer", {
        clipPath: "inset(0% 0 0% 0)",
        ease: "none"
    }, 0);

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
// SINGLE INIT (FINAL CLEAN)
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    initHeroAnimation();      // ✅ correct
    initFeatureAnimation();  // ✅
    initAllSwipers();        // ✅
    initGallery();           // ✅

});