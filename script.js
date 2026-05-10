/**
 * TRENCHLABS SYSTEM LOGIC & PRESTIGE COMPONENT INTERACTIONS
 * Master script handling core site state, theme transitions, custom animations, and modals.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CORE INITIALIZATION & STATE MANAGEMENT
       ========================================================================== */
    const elements = {
        html: document.documentElement,
        themeBtn: document.getElementById('theme-toggle-btn'),
        navbar: document.getElementById('main-navbar'),
        mobileMenuBtn: document.getElementById('mobile-menu-btn'),
        mobileDrawer: document.getElementById('mobile-menu-drawer'),
        mobileLinks: document.querySelectorAll('.mobile-link'),
        navLinks: document.querySelectorAll('.nav-link'),
        
        // Modals
        projectModal: document.getElementById('project-modal'),
        projectOpenBtns: [
            document.getElementById('nav-cta-btn'),
            document.getElementById('mobile-cta-btn'),
            document.getElementById('cta-project-btn')
        ],
        projectCloseBtn: document.getElementById('project-modal-close'),
        projectSuccessCloseBtn: document.getElementById('project-success-close-btn'),
        projectForm: document.getElementById('project-wizard-form'),
        projectSuccessScreen: document.getElementById('project-success-screen'),

        applyModal: document.getElementById('apply-modal'),
        applyCloseBtn: document.getElementById('apply-modal-close'),
        applySuccessCloseBtn: document.getElementById('careers-success-close-btn'),
        applyForm: document.getElementById('careers-apply-form'),
        applySuccessScreen: document.getElementById('careers-success-screen'),
        applyRolePlaceholder: document.getElementById('apply-role-placeholder'),
        applyRoleHiddenInput: document.getElementById('apply-target-role'),
        careerBtns: document.querySelectorAll('.apply-btn'),

        // Forms
        contactForm: document.getElementById('main-contact-form'),
        contactSuccessMsg: document.getElementById('contact-success-msg'),

        // Interactive timeline & numbers
        counters: document.querySelectorAll('.counter-number'),
        timelineSteps: document.querySelectorAll('.timeline-step'),
        progressBar: document.getElementById('process-progress-bar'),

        // Testimonial Slider
        sliderTrack: document.getElementById('testimonials-track'),
        sliderDotsContainer: document.getElementById('slider-dots-container'),
        sliderPrevBtn: document.getElementById('slider-prev-btn'),
        sliderNextBtn: document.getElementById('slider-next-btn')
    };

    /* ==========================================================================
       2. LIGHT/DARK THEME CONFIGURATION
       ========================================================================== */
    const themeManager = {
        init() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                elements.html.setAttribute('data-theme', savedTheme);
            } else {
                // Respect system settings if no overrides exist
                const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                elements.html.setAttribute('data-theme', userPrefersDark ? 'dark' : 'light');
            }
            this.bindEvents();
        },
        toggle() {
            const currentTheme = elements.html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Add momentary transition class to avoid layout flicker
            elements.html.classList.add('theme-transitioning');
            elements.html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            setTimeout(() => {
                elements.html.classList.remove('theme-transitioning');
            }, 300);
        },
        bindEvents() {
            if (elements.themeBtn) {
                elements.themeBtn.addEventListener('click', () => this.toggle());
            }
        }
    };
    themeManager.init();

    /* ==========================================================================
       3. NAVIGATION & MOBILE DRAWER INTERACTIONS
       ========================================================================== */
    const navigation = {
        init() {
            this.bindScroll();
            this.bindMobileDrawer();
        },
        bindScroll() {
            window.addEventListener('scroll', () => {
                // Shrink Navbar Slightly on scroll
                if (window.scrollY > 50) {
                    elements.navbar.classList.add('shrink');
                } else {
                    elements.navbar.classList.remove('shrink');
                }
                
                // Active link tracking depending on scroll position
                let currentSection = '';
                const sections = document.querySelectorAll('section, header');
                const scrollOffset = window.scrollY + 120;

                sections.forEach(sec => {
                    const secTop = sec.offsetTop;
                    const secHeight = sec.offsetHeight;
                    const secId = sec.getAttribute('id');
                    
                    if (scrollOffset >= secTop && scrollOffset < (secTop + secHeight)) {
                        currentSection = secId;
                    }
                });

                if (currentSection) {
                    elements.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentSection}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        },
        bindMobileDrawer() {
            if (elements.mobileMenuBtn && elements.mobileDrawer) {
                elements.mobileMenuBtn.addEventListener('click', () => {
                    elements.mobileMenuBtn.classList.toggle('active');
                    elements.mobileDrawer.classList.toggle('active');
                    // Block body scroll when drawer open
                    document.body.style.overflow = elements.mobileDrawer.classList.contains('active') ? 'hidden' : '';
                });

                // Close drawer on link clicks
                elements.mobileLinks.forEach(link => {
                    link.addEventListener('click', () => {
                        elements.mobileMenuBtn.classList.remove('active');
                        elements.mobileDrawer.classList.remove('active');
                        document.body.style.overflow = '';
                    });
                });
            }
        }
    };
    navigation.init();

    /* ==========================================================================
       4. INTERACTIVE MODAL SERVICES (Project & Careers Intake)
       ========================================================================== */
    const modalManager = {
        init() {
            this.bindProjectEvents();
            this.bindApplyEvents();
            this.bindEscKey();
        },
        openModal(modal) {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        },
        closeModal(modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        },
        bindProjectEvents() {
            // Open Triggers
            elements.projectOpenBtns.forEach(btn => {
                if (btn) {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.openModal(elements.projectModal);
                    });
                }
            });

            // Close Triggers
            if (elements.projectCloseBtn) {
                elements.projectCloseBtn.addEventListener('click', () => this.closeModal(elements.projectModal));
            }
            if (elements.projectSuccessCloseBtn) {
                elements.projectSuccessCloseBtn.addEventListener('click', () => {
                    this.closeModal(elements.projectModal);
                    this.resetForm(elements.projectForm, elements.projectSuccessScreen);
                });
            }

            // Click outside overlay to close
            if (elements.projectModal) {
                elements.projectModal.addEventListener('click', (e) => {
                    if (e.target === elements.projectModal) {
                        this.closeModal(elements.projectModal);
                        this.resetForm(elements.projectForm, elements.projectSuccessScreen);
                    }
                });
            }

            // Form Submit Interactivity
            if (elements.projectForm) {
                elements.projectForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.simulateSubmit(elements.projectForm, elements.projectSuccessScreen, 'wizard-submit-btn');
                });
            }
        },
        bindApplyEvents() {
            // Open Triggers for Careers positions
            elements.careerBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetRole = btn.getAttribute('data-role');
                    elements.applyRolePlaceholder.textContent = targetRole;
                    elements.applyRoleHiddenInput.value = targetRole;
                    this.openModal(elements.applyModal);
                });
            });

            // Close Triggers
            if (elements.applyCloseBtn) {
                elements.applyCloseBtn.addEventListener('click', () => this.closeModal(elements.applyModal));
            }
            if (elements.applySuccessCloseBtn) {
                elements.applySuccessCloseBtn.addEventListener('click', () => {
                    this.closeModal(elements.applyModal);
                    this.resetForm(elements.applyForm, elements.applySuccessScreen);
                });
            }

            // Click outside overlay to close
            if (elements.applyModal) {
                elements.applyModal.addEventListener('click', (e) => {
                    if (e.target === elements.applyModal) {
                        this.closeModal(elements.applyModal);
                        this.resetForm(elements.applyForm, elements.applySuccessScreen);
                    }
                });
            }

            // Form Submit Interactivity
            if (elements.applyForm) {
                elements.applyForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.simulateSubmit(elements.applyForm, elements.applySuccessScreen, 'careers-submit-btn');
                });
            }
        },
        bindEscKey() {
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    if (elements.projectModal.classList.contains('active')) {
                        this.closeModal(elements.projectModal);
                        this.resetForm(elements.projectForm, elements.projectSuccessScreen);
                    }
                    if (elements.applyModal.classList.contains('active')) {
                        this.closeModal(elements.applyModal);
                        this.resetForm(elements.applyForm, elements.applySuccessScreen);
                    }
                }
            });
        },
        simulateSubmit(form, successScreen, buttonId) {
            const submitBtn = document.getElementById(buttonId);
            const originalText = submitBtn.textContent;
            
            // Premium loading transition
            submitBtn.disabled = true;
            submitBtn.textContent = 'Encrypting & Transmitting...';

            setTimeout(() => {
                // Complete submission display
                form.style.display = 'none';
                successScreen.style.display = 'flex';
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1800);
        },
        resetForm(form, successScreen) {
            setTimeout(() => {
                form.reset();
                form.style.display = 'flex';
                successScreen.style.display = 'none';
            }, 400);
        }
    };
    modalManager.init();

    /* ==========================================================================
       5. CONTACT FORM SYSTEM (Quick Submission Controller)
       ========================================================================== */
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = document.getElementById('contact-submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Transmitting Message...';

            setTimeout(() => {
                elements.contactForm.style.display = 'none';
                elements.contactSuccessMsg.style.display = 'flex';
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
    }

    /* ==========================================================================
       6. INTERSECTION OBSERVERS (Scroll reveals, Timeline, Counters)
       ========================================================================== */
    
    // Core scroll observer for subtle slide reveals
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const itemsToReveal = document.querySelectorAll('.reveal-item, .reveal-card, .reveal-step');
    itemsToReveal.forEach(item => revealObserver.observe(item));

    // Dynamic numeric increments for statistical charts
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetNum = parseInt(target.getAttribute('data-target'), 10);
                const suffix = target.getAttribute('data-suffix') || '';
                let count = 0;
                const duration = 1500; // MS
                const stepTime = Math.max(Math.floor(duration / targetNum), 15);
                
                const timer = setInterval(() => {
                    count++;
                    target.textContent = count + suffix;
                    if (count >= targetNum) {
                        clearInterval(timer);
                        target.textContent = targetNum + suffix;
                    }
                }, stepTime);
                
                countObserver.unobserve(target); // Trigger count up only once
            }
        });
    }, { threshold: 0.5 });

    elements.counters.forEach(counter => countObserver.observe(counter));

    // Process Timeline track incremental visual status
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stepNum = parseInt(entry.target.getAttribute('data-step'), 10);
                entry.target.classList.add('active');
                
                // Map timeline bar completion level depending on step visible
                const percentageMap = { 1: 0, 2: 25, 3: 50, 4: 75, 5: 100 };
                if (elements.progressBar) {
                    elements.progressBar.style.height = `${percentageMap[stepNum]}%`;
                }
            }
        });
    }, {
        threshold: 0.8,
        rootMargin: '0px 0px -10% 0px'
    });

    elements.timelineSteps.forEach(step => timelineObserver.observe(step));

    /* ==========================================================================
       7. TESTIMONIAL SLIDER CAROUSEL SYSTEM
       ========================================================================== */
    const testimonialsSlider = {
        currentIndex: 0,
        slides: [],
        dots: [],
        autoPlayTimer: null,

        init() {
            if (!elements.sliderTrack) return;
            this.slides = Array.from(elements.sliderTrack.children);
            if (this.slides.length === 0) return;

            this.createDots();
            this.update();
            this.bindEvents();
            this.startAutoPlay();
        },
        createDots() {
            elements.sliderDotsContainer.innerHTML = '';
            this.slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (index === 0) dot.classList.add('active');
                dot.setAttribute('aria-label', `Go to testimonial slide ${index + 1}`);
                elements.sliderDotsContainer.appendChild(dot);
                this.dots.push(dot);
            });
        },
        update() {
            // Shift slides horizontally depending on index
            const percentageOffset = -this.currentIndex * 100;
            elements.sliderTrack.style.transform = `translateX(${percentageOffset}%)`;
            
            // Adjust dots selection
            this.dots.forEach((dot, idx) => {
                dot.classList.toggle('active', idx === this.currentIndex);
            });
        },
        next() {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
            this.update();
        },
        prev() {
            this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
            this.update();
        },
        bindEvents() {
            if (elements.sliderNextBtn) {
                elements.sliderNextBtn.addEventListener('click', () => {
                    this.stopAutoPlay();
                    this.next();
                });
            }
            if (elements.sliderPrevBtn) {
                elements.sliderPrevBtn.addEventListener('click', () => {
                    this.stopAutoPlay();
                    this.prev();
                });
            }
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.stopAutoPlay();
                    this.currentIndex = index;
                    this.update();
                });
            });
        },
        startAutoPlay() {
            this.autoPlayTimer = setInterval(() => this.next(), 6000);
        },
        stopAutoPlay() {
            if (this.autoPlayTimer) {
                clearInterval(this.autoPlayTimer);
            }
        }
    };
    testimonialsSlider.init();
});
