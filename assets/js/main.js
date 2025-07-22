document.addEventListener('DOMContentLoaded', function() {
    // Page loader
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 500);
        }, 1000);
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Sticky header
    const header = document.getElementById('sticky-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('shrink');
            } else {
                header.classList.remove('shrink');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav && nav.classList.contains('active')) {
                    mobileMenuToggle.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });

    // Testimonials carousel
    const testimonialCarousel = document.querySelector('.testimonials-carousel');
    if (testimonialCarousel) {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelector('.carousel-dots');
        
        if (slides.length > 1) {
            // Create dots
            slides.forEach((slide, index) => {
                const dot = document.createElement('button');
                dot.addEventListener('click', () => goToSlide(index));
                dots.appendChild(dot);
            });
            
            // Set first slide as active
            let currentSlide = 0;
            slides[currentSlide].classList.add('active');
            dots.children[currentSlide].classList.add('active');
            
            // Auto rotate
            setInterval(() => {
                goToSlide((currentSlide + 1) % slides.length);
            }, 5000);
            
            function goToSlide(index) {
                slides[currentSlide].classList.remove('active');
                dots.children[currentSlide].classList.remove('active');
                
                currentSlide = index;
                
                slides[currentSlide].classList.add('active');
                dots.children[currentSlide].classList.add('active');
            }
        }
    }

    // FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentNode;
            item.classList.toggle('active');
            
            // Close other items
            faqQuestions.forEach(q => {
                if (q !== this) {
                    q.parentNode.classList.remove('active');
                }
            });
        });
    });

    // Floating CTA
    const floatingCTA = document.querySelector('.floating-cta');
    if (floatingCTA) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                floatingCTA.classList.add('visible');
            } else {
                floatingCTA.classList.remove('visible');
            }
        });
    }

    // Exit intent popup
    const exitPopup = document.getElementById('exit-popup');
    const closePopup = document.querySelector('.close-popup');
    
    if (exitPopup && closePopup) {
        // Show popup when mouse leaves top of window
        document.addEventListener('mouseout', function(e) {
            if (!e.relatedTarget && e.clientY < 50) {
                exitPopup.classList.add('active');
                document.body.classList.add('no-scroll');
            }
        });
        
        // Close popup
        closePopup.addEventListener('click', function() {
            exitPopup.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }

    // Page progress indicator
    const progressBar = document.getElementById('page-progress');
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollProgress + '%';
        });
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in, .slide-up');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

// Three.js Hero Canvas Animation
const heroCanvas = document.getElementById('hero-canvas');
if (heroCanvas) {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas: heroCanvas,
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0xffffff,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 3;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}