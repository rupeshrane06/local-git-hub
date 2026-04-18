// ===============================
// AUTO APPLY NUMBER FONT (SAFE VERSION)
// ===============================
// function applyNumberFont() {

//     const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li, span");

//     elements.forEach(el => {

//         el.childNodes.forEach(node => {

//             if (node.nodeType === 3) { // TEXT NODE

//                 const text = node.textContent;

//                 if (/\d/.test(text)) {

//                     const frag = document.createDocumentFragment();

//                     text.split(/(\d+)/).forEach(part => {

//                         if (/^\d+$/.test(part)) {
//                             const num = document.createElement("small"); // your requirement
//                             num.className = "num";
//                             num.textContent = part;
//                             frag.appendChild(num);
//                         } else {
//                             frag.appendChild(document.createTextNode(part));
//                         }

//                     });

//                     node.replaceWith(frag);
//                 }
//             }

//         });

//     });
// }


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
// MAIN INIT
// ===============================
document.addEventListener("DOMContentLoaded", function () {

    const scrollBtn = document.getElementById('scroll-action-btn');
    const scrollIcon = document.getElementById('scroll-icon');
    const navbar = document.querySelector('.navbar');

    if (scrollBtn) {
        scrollBtn.addEventListener('click', function () {

            if (window.scrollY > 300) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const nextSection = document.querySelector('.hero-banner-section')?.nextElementSibling;
                if (nextSection) {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }

    window.addEventListener('scroll', function () {

        if (scrollIcon) {
            scrollIcon.classList.toggle('rotate-180', window.scrollY > 300);
        }

        if (navbar) {
            navbar.classList.toggle('nav-scrolled', window.scrollY > 300);
        }

    });

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 2000,
            offset: 100,
            once: true
        });
    }

    initHeroAnimation();
    initFeatureAnimation();
    initAllSwipers();
    initGallery();

    ScrollTrigger.refresh();

    setTimeout(() => {
        if (typeof AOS !== "undefined") {
            AOS.refreshHard();
        }
    }, 500);

    // Apply number font AFTER everything loads
    setTimeout(() => {
        applyNumberFont();
    }, 300);

    // Accordion FIX (moved inside DOMContentLoaded)
    const accordionItems = document.querySelectorAll(".accordion-item");

    document.querySelectorAll(".accordion-collapse").forEach(collapse => {

        collapse.addEventListener("show.bs.collapse", function () {
            accordionItems.forEach(item => item.classList.remove("active"));
            this.closest(".accordion-item").classList.add("active");
        });

        collapse.addEventListener("hide.bs.collapse", function () {
            this.closest(".accordion-item").classList.remove("active");
        });

    });

});