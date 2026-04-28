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
// GSAP INIT (ONLY ONCE)
// ===============================
gsap.registerPlugin(ScrollTrigger);


// ===============================
// HERO BANNER ANIMATION (SAFE)
// ===============================
function initHeroAnimation() {

    if (!document.querySelector(".hero-banner-section")) return;

    const ctx = gsap.context(() => {

        // ✅ INITIAL SIZE FIX
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
// RESIZE FIX (IMPORTANT)
// ===============================
window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});

// ===============================
// FEATURE SECTION ANIMATION (SAFE)
// ===============================
function initFeatureAnimation() {

    if (!document.querySelector(".stats-feature-section")) return;

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

    if (!document.querySelector('.mainGallerySwiper')) return;

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

    // ===============================
    // TEXT ROTATION (YOUR REQUIREMENT)
    // ===============================
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


    // ===============================
    // SCROLL BUTTON + NAVBAR
    // ===============================
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


    // ===============================
    // IMPORTANT ORDER (FIX AOS ISSUE)
    // ===============================

    // 1️⃣ Modify DOM first
    applyNumberFont();

    // 2️⃣ Init AOS AFTER DOM ready
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1200,
            offset: 100,
            // once: true
        });
    }

    // 3️⃣ Refresh after everything
    setTimeout(() => {
        if (typeof AOS !== "undefined") {
            AOS.refreshHard();
        }
    }, 300);


    // ===============================
    // INIT ALL FEATURES
    // ===============================
    initHeroAnimation();
    initFeatureAnimation();
    initAllSwipers();
    initGallery();

    ScrollTrigger.refresh();


    // ===============================
    // ACCORDION FIX
    // ===============================
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