document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const heroThemeToggle = document.getElementById('heroThemeToggle');
    const body = document.body;
    
    // Check for saved theme preference or use default (light mode)
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark-mode') {
        body.classList.add('dark-mode');
    } else {
        // Ensure light mode is default
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', '');
    }
    
    // Function to toggle theme
    function toggleTheme() {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', '');
        } else {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        }
    }
    
    // Toggle theme when button is clicked
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Toggle theme when hero button is clicked
    if (heroThemeToggle) {
        heroThemeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Video Modal Functionality
    const videoBtn = document.getElementById('watchVideoBtn');
    const videoModal = document.getElementById('videoModal');
    const closeVideo = document.querySelector('.close-video');
    const videoFrame = document.getElementById('videoFrame');
    
    if (videoBtn && videoModal) {
        // Open video modal when button is clicked
        videoBtn.addEventListener('click', function() {
            // Set the video source - replace with your actual video URL
            // This could be a YouTube embed, Vimeo, or a direct video file
            videoFrame.innerHTML = `
                <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            `;
            
            // Show the modal
            videoModal.style.display = 'flex';
            videoModal.style.visibility = 'visible';
            setTimeout(() => {
                videoModal.style.opacity = '1';
            }, 10);
            
            // Prevent scrolling on the body
            document.body.style.overflow = 'hidden';
        });
        
        // Close video modal
        closeVideo.addEventListener('click', closeVideoModal);
        
        // Close modal when clicking outside the content
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.style.display === 'block') {
                closeVideoModal();
            }
        });
        
        function closeVideoModal() {
            videoModal.style.opacity = '0';
            setTimeout(() => {
                videoModal.style.display = 'none';
                videoModal.style.visibility = 'hidden';
                // Clear the video to stop playback
                videoFrame.innerHTML = '';
                // Re-enable scrolling
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for header height
                behavior: 'smooth'
            });
        });
    });
    
    // Scroll Reveal Animation
    window.addEventListener('scroll', revealElements);
    
    function revealElements() {
        const reveals = document.querySelectorAll('.reveal');
        
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    }
    
    // Add reveal class to elements for animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });
    
    // Initial call to reveal elements that are already visible
    revealElements();
    
    // Initialize EmailJS with your user ID
    (function(){
        emailjs.init("weUgBQcsqtexcG7GJ"); // Your EmailJS public API key
    })();
    
    // Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Prepare email parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'khanhuzaif348@gmail.com' // Your email address
            };
            
            // Send email using EmailJS
            emailjs.send('service_4ts5nuq', 'template_547apai', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    alert('Oops! Something went wrong. Please try again later.');
                });
        });
    }
    
    // Header Scroll Effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Create directory for resume if it doesn't exist
    // Note: This would typically be done server-side
    // For a static site, ensure the directory exists before deployment
    
    // Add active class to current section in navigation
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(li => {
            li.querySelector('a').classList.remove('active');
            if (li.querySelector(`a[href="#${current}"]`)) {
                li.querySelector(`a[href="#${current}"]`).classList.add('active');
            }
        });
    });
});