// ===============================
// AUTO APPLY NUMBER FONT (SAFE)
// ===============================
function applyNumberFont() {

    const elements = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li, span");

    elements.forEach(el => {

        el.childNodes.forEach(node => {

            if (node.nodeType === 3) {

                const text = node.textContent;

                if (/\d/.test(text)) {

                    const frag = document.createDocumentFragment();

                    text.split(/(\d+)/).forEach(part => {

                        if (/^\d+$/.test(part)) {
                            const num = document.createElement("small");
                            num.className = "num";
                            num.textContent = part;
                            frag.appendChild(num);
                        } else {
                            frag.appendChild(document.createTextNode(part));
                        }

                    });

                    node.replaceWith(frag);
                }
            }

        });

    });
}


// ===============================
// GSAP INIT
// ===============================
if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}


// ===============================
// HERO BANNER ANIMATION
// ===============================
function initHeroAnimation() {

    if (!document.querySelector(".hero-banner-section") || typeof gsap === "undefined") return;

    const ctx = gsap.context(() => {

        // INITIAL SIZE
        gsap.set(".banner_sec", {
            height: () => {
                const h = window.innerHeight;

                if (window.innerWidth < 576) return h * 0.5;
                if (window.innerWidth < 768) return h * 0.5;
                if (window.innerWidth < 1024) return h * 0.45;
                
                return "26vw";
            }
        });

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
            width: () => {
                if (window.innerWidth < 576) return "140vw";
                if (window.innerWidth < 768) return "130vw";
                if (window.innerWidth < 1024) return "120vw";
                return "120vw";
            },
            ease: "none"
        }, 0);

        tl.to(".banner_sec", {
            top: () => {
                if (window.innerWidth < 576) return "50%";
                if (window.innerWidth < 768) return "52%";
                return "55%";
            },
            height: () => {
                const h = window.innerHeight;

                if (window.innerWidth < 576) return h * 1.6;
                if (window.innerWidth < 768) return h * 1.4;
                if (window.innerWidth < 1024) return h * 1.25;
                
                return h * 1.2;
            },
            ease: "none"
        }, 0);

        tl.to(".banner-border", {
            opacity: 0,
            ease: "none"
        }, 0.3);

        tl.to(".banner_sec video", {
            scale: 1.1,
            ease: "none"
        }, 0);

    });

    return () => ctx.revert();
}


// ===============================
// RESIZE (THROTTLED)
// ===============================
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (typeof ScrollTrigger !== "undefined") {
            ScrollTrigger.refresh();
        }
    }, 200);
});


// ===============================
// FEATURE SECTION
// ===============================
function initFeatureAnimation() {

    if (!document.querySelector(".stats-feature-section") || typeof gsap === "undefined") return;

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
//==================================
//about page feature section start
function initAboutFeatureAnimation() {

    if (!document.querySelector(".about-feature-section") || typeof gsap === "undefined") return;

    const ctx = gsap.context(() => {

        // ===============================
        // INITIAL STATES
        // ===============================
        gsap.set(".one-layer", {
            clipPath: "inset(0 0 0 0)"
        });

        gsap.set(".two-layer", {
            clipPath: "inset(100% 0 0 0)"
        });

        gsap.set(".three-layer", {
            clipPath: "inset(100% 0 0 0)"
        });

        gsap.set(".about-floating-info", {
            opacity: 0,
            y: 30
        });

        // ===============================
        // TIMELINE
        // ===============================
        let isMobile = window.innerWidth <= 991;

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-feature-section",
                start: isMobile ? "top +=30%" : "top top",
                end: "+=180%",
                scrub: true,
                pin: true,
                anticipatePin: 1
            }
        });

        // ===============================
        // STEP 1 → TEXT 1 IN
        // ===============================
        tl.to(".left-top-info", {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power1.out"
        }, "+=0.4"); // 🔥 delay start

        // ===============================
        // STEP 2 → IMAGE 2 IN, IMAGE 1 OUT
        // ===============================
        tl.to(".two-layer", {
            clipPath: "inset(0 0 0 0)",
            duration: 0.6,
            ease: "none"
        });

        tl.to(".one-layer", {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.6,
            ease: "none"
        }, ">-0"); // slight overlap AFTER reveal starts

        tl.to(".left-top-info", {
            opacity: 0,
            y: -20,
            duration: 0.2,
            ease: "power1.out"
        }, "<");

        tl.to(".right-center-info", {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power1.out"
        });

        // ===============================
        // STEP 3 → IMAGE 3 IN, IMAGE 2 OUT
        // ===============================
        tl.to(".three-layer", {
            clipPath: "inset(0 0 0 0)",
            duration: 0.6,
            ease: "none"
        });

        tl.to(".two-layer", {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.6,
            ease: "none"
        }, ">-0");

        tl.to(".right-center-info", {
            opacity: 0,
            y: -20,
            duration: 0.2,
            ease: "power1.out"
        }, "<");

        tl.to(".left-btm-info", {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power1.out"
        });

    });

    return () => ctx.revert();
}


// ===============================
// PROJECT SWIPER
// ===============================
const swiperInstances = [];

function initAllSwipers() {

    if (typeof Swiper === "undefined") return;

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

    if (!document.querySelector('.mainGallerySwiper') || typeof Swiper === "undefined") return;

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

    // TEXT ROTATION
    const items = document.querySelectorAll(".home-banner-text span");

    if (items.length >= 3) {

        items[0].classList.add("pos-1");
        items[1].classList.add("pos-2");
        items[2].classList.add("pos-3");

        setTimeout(() => {

            setInterval(() => {

                items.forEach(item => {

                    if (item.classList.contains("pos-1")) {
                        item.classList.replace("pos-1", "pos-3");
                    } else if (item.classList.contains("pos-2")) {
                        item.classList.replace("pos-2", "pos-1");
                    } else if (item.classList.contains("pos-3")) {
                        item.classList.replace("pos-3", "pos-2");
                    }

                });

            }, 3000);

        }, 500);
    }

    // SCROLL + NAVBAR
    const scrollBtn = document.getElementById('scroll-action-btn');
    const scrollIcon = document.getElementById('scroll-icon');
    const navbar = document.querySelector('.navbar');
    const bannersec = document.querySelector('.banner_sec');

    if (scrollBtn) {
        scrollBtn.addEventListener('click', function () {

            if (window.scrollY > 300) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                const nextSection = document.querySelector('.hero-banner-section')?.nextElementSibling;
                if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
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

        if (bannersec) {
            bannersec.classList.toggle('banner-scrolled', window.scrollY > 300);
        }
    });

    // APPLY FONT FIX FIRST
    applyNumberFont();

    // AOS INIT
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1200,
            offset: 100
        });

        setTimeout(() => {
            AOS.refreshHard();
        }, 300);
    }

    // INIT FEATURES
    initHeroAnimation();
    initFeatureAnimation();
    initAboutFeatureAnimation();
    initAllSwipers();
    initGallery();

    if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
    }

    // ACCORDION
    document.querySelectorAll(".accordion-collapse").forEach(collapse => {

        collapse.addEventListener("show.bs.collapse", function () {
            document.querySelectorAll(".accordion-item").forEach(i => i.classList.remove("active"));
            this.closest(".accordion-item").classList.add("active");
        });

        collapse.addEventListener("hide.bs.collapse", function () {
            this.closest(".accordion-item").classList.remove("active");
        });

    });

    // FANCYBOX SAFE INIT
    if (typeof Fancybox !== "undefined") {
        Fancybox.bind("[data-fancybox='media']", {
            Toolbar: {
                display: ["close"]
            },
            width: "90%",
            height: "90%",
        });
    }

});