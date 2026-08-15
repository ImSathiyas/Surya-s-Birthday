document.addEventListener('DOMContentLoaded', function () {
    createParticles();
    initializeAnimations();
    setupScrollAnimations();
    setupButtonRipple();
    setupPhotoAnimations();
});


// ==========================================
// CREATE FLOATING PARTICLES
// ==========================================

function createParticles() {
    const particles = document.getElementById('particles');

    // Stop if particles container doesn't exist
    if (!particles) return;

    const particleEmojis = [
        '❤️',
        '💖',
        '💗',
        '💕',
        '💓',
        '✨',
        '🌹',
        '🎂',
        '🎉',
        '🎈'
    ];

    for (let i = 0; i < 15; i++) {

        const particle = document.createElement('div');

        particle.className = 'particle';

        particle.innerHTML =
            particleEmojis[
                Math.floor(Math.random() * particleEmojis.length)
            ];

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        // Random animation duration and delay
        particle.style.animationDuration =
            (Math.random() * 3 + 4) + 's';

        particle.style.animationDelay =
            Math.random() * 2 + 's';

        particles.appendChild(particle);
    }
}


// ==========================================
// INITIALIZE ANIMATIONS
// ==========================================

function initializeAnimations() {

    // Typewriter effect is handled by CSS

    // Add staggered animation delays to fade elements
    const fadeElements = document.querySelectorAll('.fade-in');

    fadeElements.forEach((element, index) => {

        element.style.animationDelay =
            (index * 0.2) + 's';

    });
}


// ==========================================
// SCROLL ANIMATIONS
// AOS - Animate On Scroll
// ==========================================

function setupScrollAnimations() {

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };


    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('aos-animate');


                    // Special handling for message card
                    if (
                        entry.target.classList.contains(
                            'message-card'
                        )
                    ) {
                        animateMessageText();
                    }

                }

            });

        },
        observerOptions
    );


    // Observe elements for scroll animations
    const elementsToObserve = document.querySelectorAll(
        '[data-aos], .section-title, .message-card'
    );


    elementsToObserve.forEach(element => {

        observer.observe(element);


        // Add delay based on data-delay attribute
        const delay = element.getAttribute('data-delay');

        if (delay) {
            element.style.transitionDelay =
                delay + 'ms';
        }

    });
}


// ==========================================
// ANIMATE MESSAGE TEXT
// ==========================================

function animateMessageText() {

    const messageTexts =
        document.querySelectorAll('.message-text');


    messageTexts.forEach((text, index) => {

        setTimeout(() => {

            text.classList.add('fade-in-animate');

        }, index * 500);

    });
}


// ==========================================
// SMOOTH SCROLL TO SECTIONS
// ==========================================

function scrollToSection(sectionId) {

    const section =
        document.getElementById(sectionId);


    if (section) {

        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    }
}


// ==========================================
// TOGGLE LIKE FUNCTIONALITY
// ==========================================

function toggleLike(button) {

    const heartIcon =
        button.querySelector('.heart-icon');


    if (!heartIcon) return;


    button.classList.toggle('liked');


    if (button.classList.contains('liked')) {

        heartIcon.textContent = '❤️';

        // Create floating heart effect
        createFloatingHeart(button);

    } else {

        heartIcon.textContent = '🤍';

    }
}


// ==========================================
// CREATE FLOATING HEART
// ==========================================

function createFloatingHeart(button) {

    const heart = document.createElement('div');

    heart.innerHTML = '❤️';

    heart.style.position = 'fixed';
    heart.style.fontSize = '1.5rem';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';


    // Get button position
    const rect =
        button.getBoundingClientRect();


    heart.style.left =
        rect.left + rect.width / 2 + 'px';

    heart.style.top =
        rect.top + 'px';


    document.body.appendChild(heart);


    // Animate the heart
    const animation = heart.animate(

        [
            {
                transform:
                    'translateY(0px) scale(1)',
                opacity: 1
            },

            {
                transform:
                    'translateY(-60px) scale(1.5)',
                opacity: 0
            }
        ],

        {
            duration: 1500,
            easing: 'ease-out'
        }

    );


    animation.onfinish = () => {

        heart.remove();

    };
}


// ==========================================
// PARALLAX EFFECT FOR HERO
// ==========================================

window.addEventListener('scroll', () => {

    const scrolled =
        window.pageYOffset;

    const hero =
        document.querySelector('.hero');


    const parallaxSpeed = 0.5;


    if (hero) {

        hero.style.transform =
            `translateY(${scrolled * parallaxSpeed}px)`;

    }


    // Update particle position based on scroll
    const particles =
        document.querySelectorAll('.particle');


    particles.forEach((particle, index) => {

        const speed =
            0.2 + (index % 3) * 0.1;


        particle.style.transform =
            `translateY(${scrolled * speed}px)`;

    });

});


// ==========================================
// MOUSE MOVEMENT EFFECT
// ==========================================

document.addEventListener('mousemove', (e) => {

    const hero =
        document.querySelector('.hero');


    if (!hero) return;


    const x =
        e.clientX / window.innerWidth;

    const y =
        e.clientY / window.innerHeight;


    // Subtle movement effect
    const moveX =
        (x - 0.5) * 20;

    const moveY =
        (y - 0.5) * 20;


    const floatingHearts =
        document.querySelector('.floating-hearts');


    if (floatingHearts) {

        floatingHearts.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

    }

});


// ==========================================
// BUTTON RIPPLE EFFECT
// ==========================================

function setupButtonRipple() {

    document
        .querySelectorAll('button')
        .forEach(button => {

            button.addEventListener(
                'click',
                function (e) {

                    const ripple =
                        document.createElement('span');


                    const rect =
                        this.getBoundingClientRect();


                    const size =
                        Math.max(
                            rect.width,
                            rect.height
                        );


                    const x =
                        e.clientX -
                        rect.left -
                        size / 2;


                    const y =
                        e.clientY -
                        rect.top -
                        size / 2;


                    ripple.style.cssText = `
                        position: absolute;
                        width: ${size}px;
                        height: ${size}px;
                        left: ${x}px;
                        top: ${y}px;
                        background: rgba(255, 255, 255, 0.5);
                        border-radius: 50%;
                        transform: scale(0);
                        animation: ripple 0.6s ease-out;
                        pointer-events: none;
                    `;


                    this.appendChild(ripple);


                    setTimeout(() => {

                        ripple.remove();

                    }, 600);

                }
            );

        });


    // Add ripple animation
    const style =
        document.createElement('style');


    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;


    document.head.appendChild(style);
}


// ==========================================
// PHOTO ENTER ANIMATION
// ==========================================

function setupPhotoAnimations() {

    // Create photo animation style
    const photoStyle =
        document.createElement('style');


    photoStyle.textContent = `
        @keyframes photoEnter {
            from {
                transform: scale(0.8) rotate(-5deg);
                opacity: 0;
            }

            to {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
        }
    `;


    document.head.appendChild(photoStyle);


    // Create observer
    const photoObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const img =
                            entry.target.querySelector('img');


                        if (img) {

                            img.style.animation =
                                'photoEnter 0.8s ease-out forwards';

                        }


                        // Stop observing after animation
                        photoObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.2
            }

        );


    // Observe all photo cards
    document
        .querySelectorAll('.photo-card')
        .forEach(card => {

            photoObserver.observe(card);

        });
}