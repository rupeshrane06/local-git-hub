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

        // Scale banner
        tl.to(".banner_sec", {
            scale: 6,
            ease: "none"
        }, 0);

        // Video slight zoom out
        tl.to(".banner_sec video", {
            scale: 1.1,
            ease: "none"
        }, 0);

        // (optional fade removed as per your code)

    });

    return () => ctx.revert();
}


// ===============================
// FEATURE SECTION ANIMATION
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
    }, 0.5);
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
            pagination: {
                el: el.querySelector(".swiper-pagination"),
                clickable: true
            },
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

    const activeTab = document.getElementById(tabId);
    if (activeTab) activeTab.classList.remove('d-none');

    if (event?.currentTarget) {
        event.currentTarget.classList.add('active');
    }

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
        observer: true,
        observeParents: true
    });
}


// ===============================
// MAIN INIT (ONLY ONE)
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    const scrollBtn = document.getElementById('scroll-action-btn');
    const scrollIcon = document.getElementById('scroll-icon');
    const navbar = document.querySelector('.navbar');


    // ===============================
    // SCROLL BUTTON
    // ===============================
    if (scrollBtn) {
        scrollBtn.addEventListener('click', function () {

            if (window.scrollY > 300) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const nextSection = document.querySelector('.hero-banner-section')?.nextElementSibling;

                if (nextSection) {
                    nextSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    }


    // ===============================
    // SCROLL EVENTS
    // ===============================
    window.addEventListener('scroll', function () {

        if (scrollIcon) {
            scrollIcon.classList.toggle('rotate-180', window.scrollY > 300);
        }

        if (navbar) {
            navbar.classList.toggle('nav-scrolled', window.scrollY > 500);
        }

    });


    // ===============================
    // AOS INIT (FIXED)
    // ===============================
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 2000,
            offset: 100,
            once: true
        });
    }


    // ===============================
    // INIT ALL FEATURES
    // ===============================
    initHeroAnimation();
    initFeatureAnimation();
    initAllSwipers();
    initGallery();

    // ===============================
    // REFRESH FIX (GSAP + AOS)
    // ===============================
    ScrollTrigger.refresh();

    setTimeout(() => {
        if (typeof AOS !== "undefined") {
            AOS.refreshHard(); // 🔥 critical fix
        }
    }, 500);

});