// =========================
// NAVBAR
// =========================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const navLinkEls = document.querySelectorAll('[data-nav]');

function updateNavbarBackground() {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}
updateNavbarBackground();
window.addEventListener('scroll', updateNavbarBackground);

hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinkEls.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

// Active nav indicator on scroll
const sections = document.querySelectorAll('main section[id]');
function setActiveNavLink() {
    let currentId = 'home';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop) {
            currentId = section.id;
        }
    });

    navLinkEls.forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        link.classList.toggle('active', href === currentId);
    });
}
window.addEventListener('scroll', setActiveNavLink);
setActiveNavLink();

// =========================
// SCROLL PROGRESS BAR
// =========================
const scrollProgress = document.getElementById('scrollProgress');
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = percent + '%';
}
window.addEventListener('scroll', updateScrollProgress);
updateScrollProgress();

// =========================
// CUSTOM CURSOR
// =========================
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

if (!isTouchDevice) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animateRing);
    }
    animateRing();

    const interactiveEls = 'a, button, input, select, textarea, [data-tilt]';
    document.addEventListener('mouseover', e => {
        if (e.target.closest(interactiveEls)) {
            cursorRing.classList.add('expand');
        }
    });
    document.addEventListener('mouseout', e => {
        if (e.target.closest(interactiveEls)) {
            cursorRing.classList.remove('expand');
        }
    });
}

// =========================
// SCROLL REVEAL
// =========================
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// =========================
// ANIMATED COUNTERS
// =========================
const counterEls = document.querySelectorAll('.stat-number[data-count]');

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const startTime = performance.now();

    function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(eased * target);
        el.textContent = value.toLocaleString('en-IN') + suffix;
        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = target.toLocaleString('en-IN') + suffix;
        }
    }
    requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));

// =========================
// COURSE CARD 3D TILT
// =========================
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 6;
        const rotateX = ((centerY - y) / centerY) * 6;

        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
});

// =========================
// CLASSES / YOUTUBE VIDEO GRID
// =========================
const videos = [
    {
        url: 'https://www.youtube.com/watch?v=fjq5yayqOB4',
        title: 'APJ Abdul Kalam ki inspiring journey!” #apexacademy #upsc',
        category: 'Motivation',
        desc: 'APJ Abdul Kalam’s inspiring life story, struggles, failures and journey to success.'
    },
    {
        url: 'https://www.youtube.com/watch?v=ykWLtCeoCO4',
        title: 'The Iliad & The Odyssey Explained | Homer’s Twin Epic ...',
        category: 'History / Literature',
        desc: 'An explainer on Homer’s two great epics, The Iliad and The Odyssey.'
    },
    {
        url: 'https://www.youtube.com/watch?v=kfWaf-W8jJc',
        title: 'YouTube Video',
        category: 'Apex Academy',
        desc: 'Watch this Apex Academy class directly on the website.'
    },
    {
        url: 'https://www.youtube.com/watch?v=Tl6LXCVqXuQ',
        title: 'Inspiring journey of two sisters to become PCS',
        category: 'Motivation',
        desc: 'An inspiring story of two sisters and their journey toward becoming PCS officers.'
    },
    {
        url: 'https://www.youtube.com/watch?v=-3zSI05CQ7E',
        title: 'वो आदतें जो आपको दूसरों से अलग और सफल बनाती हैं Life Changing Habits #LifeChangingHabits #upsc',
        category: 'Motivation',
        desc: 'Life-changing habits that can help you become more disciplined and successful.'
    },
    {
        url: 'https://www.youtube.com/watch?v=7tGeAa8RR-8',
        title: 'कानपुर का रामायण कनेक्शन | लव-कुश vs श्रीराम का युद्ध',
        category: 'History',
        desc: 'Explore the Ramayana connection with Kanpur, Lav-Kush and Shri Ram.'
    },
    {
        url: 'https://www.youtube.com/watch?v=KsJiFSl84OY',
        title: 'YouTube Video',
        category: 'Apex Academy',
        desc: 'Watch this Apex Academy class directly on the website.'
    }
];

function extractVideoId(url) {
    const match = url.match(/[?&]v=([^&]+)/);
    return match ? match[1] : '';
}

function getYouTubeEmbedUrl(videoId) {
    // youtube-nocookie keeps the embedded player on the site and avoids
    // navigating the visitor to a YouTube watch page.
    const origin = window.location.protocol === 'http:' || window.location.protocol === 'https:'
        ? window.location.origin
        : '';
    const params = new URLSearchParams({
        autoplay: '1',
        rel: '0',
        playsinline: '1',
        modestbranding: '1',
        iv_load_policy: '3',
        enablejsapi: '1'
    });
    if (origin) params.set('origin', origin);
    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params.toString()}`;
}

const videoGrid = document.getElementById('videoGrid');

videos.forEach((video, index) => {
    const videoId = extractVideoId(video.url);
    const card = document.createElement('article');
    card.className = 'video-card';
    card.setAttribute('data-video-id', videoId);
    card.setAttribute('data-video-index', index);
    card.innerHTML = `
        <div class="video-thumb" role="button" tabindex="0" aria-label="Play ${video.title}">
            <img src="https://img.youtube.com/vi/${videoId}/maxresdefault.jpg"
                 alt="${video.title}" loading="lazy"
                 onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'">
            <div class="video-play"><span>&#9658;</span></div>
        </div>
        <div class="video-info">
            <span class="video-category">${video.category}</span>
            <h3 class="video-title">${video.title}</h3>
            <p class="video-desc">${video.desc}</p>
        </div>
    `;
    videoGrid.appendChild(card);
});

// Fetch the current title from YouTube's public oEmbed endpoint.
// If a browser/network blocks that request, the stored title remains visible.
async function loadYouTubeTitles() {
    const titleRequests = videos.map(async (video, index) => {
        try {
            const response = await fetch(
                `https://www.youtube.com/oembed?url=${encodeURIComponent(video.url)}&format=json`,
                { mode: 'cors' }
            );
            if (!response.ok) return;
            const data = await response.json();
            if (!data.title) return;

            videos[index].title = data.title;
            const card = videoGrid.querySelector(`[data-video-index="${index}"]`);
            const titleEl = card?.querySelector('.video-title');
            const thumb = card?.querySelector('.video-thumb');
            if (titleEl) titleEl.textContent = data.title;
            if (thumb) thumb.setAttribute('aria-label', `Play ${data.title}`);
        } catch (error) {
            // Keep the local fallback title. Never redirect to YouTube.
        }
    });
    await Promise.allSettled(titleRequests);
}
loadYouTubeTitles();

function playVideoInline(card) {
    if (card.querySelector('.video-inline-player')) return;

    const videoId = card.getAttribute('data-video-id');
    const title = card.querySelector('.video-title')?.textContent || 'Apex Academy video';
    const player = document.createElement('div');
    player.className = 'video-inline-player';

    const iframe = document.createElement('iframe');
    iframe.src = getYouTubeEmbedUrl(videoId);
    iframe.title = title;
    iframe.loading = 'eager';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;

    player.appendChild(iframe);

    const thumb = card.querySelector('.video-thumb');
    if (thumb) thumb.replaceWith(player);

    card.classList.add('video-playing');
}

function activateCard(card) {
    playVideoInline(card);
}

videoGrid.addEventListener('click', e => {
    const card = e.target.closest('.video-card');
    if (card) activateCard(card);
});

videoGrid.addEventListener('keydown', e => {
    const thumb = e.target.closest('.video-thumb');
    if (thumb && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        activateCard(thumb.closest('.video-card'));
    }
});

// =========================
// VIDEO PLAYER COMPATIBILITY
// =========================
// YouTube's embedded player requires the page to be served over HTTP/HTTPS.
// When the project is opened directly as file://, browsers can omit a valid
// Referer and YouTube may show Error 153. The site never sends users to
// youtube.com; deploy it on a web server (Netlify, Vercel, GitHub Pages, etc.).

// =========================
// TESTIMONIAL SLIDER
// =========================
const slides = document.querySelectorAll('.testimonial-slide');
const sliderDotsContainer = document.getElementById('sliderDots');
const prevSlideBtn = document.getElementById('prevSlide');
const nextSlideBtn = document.getElementById('nextSlide');
let currentSlide = 0;
let sliderInterval;

slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot';
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    sliderDotsContainer.appendChild(dot);
});
const dots = sliderDotsContainer.querySelectorAll('.slider-dot');

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function startSliderAutoplay() {
    sliderInterval = setInterval(() => goToSlide(currentSlide + 1), 6000);
}
function resetSliderAutoplay() {
    clearInterval(sliderInterval);
    startSliderAutoplay();
}

prevSlideBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetSliderAutoplay(); });
nextSlideBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetSliderAutoplay(); });

goToSlide(0);
startSliderAutoplay();

// =========================
// ENQUIRY FORM VALIDATION
// =========================
const enquiryForm = document.getElementById('enquiryForm');
const successToast = document.getElementById('successToast');

function showFieldError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById('err-' + fieldId);
    input.classList.add('invalid');
    errorEl.textContent = message;
}

function clearFieldError(fieldId) {
    const input = document.getElementById(fieldId);
    const errorEl = document.getElementById('err-' + fieldId);
    input.classList.remove('invalid');
    errorEl.textContent = '';
}

function validateForm() {
    let isValid = true;
    ['fullName', 'phone', 'email', 'course'].forEach(clearFieldError);

    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const course = document.getElementById('course').value;

    if (!fullName) {
        showFieldError('fullName', 'Please enter your name.');
        isValid = false;
    }

    const phonePattern = /^[6-9]\d{9}$/;
    if (!phone) {
        showFieldError('phone', 'Please enter your phone number.');
        isValid = false;
    } else if (!phonePattern.test(phone.replace(/\D/g, '').slice(-10))) {
        showFieldError('phone', 'Please enter a valid 10-digit phone number.');
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        showFieldError('email', 'Please enter your email.');
        isValid = false;
    } else if (!emailPattern.test(email)) {
        showFieldError('email', 'Please enter a valid email address.');
        isValid = false;
    }

    if (!course) {
        showFieldError('course', 'Please select a course.');
        isValid = false;
    }

    return isValid;
}

enquiryForm.addEventListener('submit', e => {
    e.preventDefault();
    if (validateForm()) {
        successToast.classList.add('show');
        enquiryForm.reset();
        setTimeout(() => successToast.classList.remove('show'), 4200);
    }
});

['fullName', 'phone', 'email', 'course'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => clearFieldError(id));
    document.getElementById(id).addEventListener('change', () => clearFieldError(id));
});
