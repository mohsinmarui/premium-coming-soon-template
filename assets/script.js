// script.js - Enhanced Functionality for Premium Coming Soon Page

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set the launch date (3 months from now)
    const launchDate = new Date();
    launchDate.setMonth(launchDate.getMonth() + 3);
    
    // Countdown Timer
    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = launchDate - now;
        
        // Calculate days, hours, minutes, seconds
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        
        // Update display with animation
        animateCounter('days', days);
        animateCounter('hours', hours);
        animateCounter('minutes', minutes);
        animateCounter('seconds', seconds);
        
        // If launch date has passed
        if (timeRemaining < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown-box').innerHTML = '<div class="text-2xl text-accent font-bold">Launched!</div>';
        }
    }
    
    // Animate counter numbers
    function animateCounter(elementId, newValue) {
        const element = document.getElementById(elementId);
        const currentValue = parseInt(element.textContent);
        
        if (currentValue !== newValue) {
            element.style.transform = 'scale(1.1)';
            element.style.color = '#FBBF24';
            
            setTimeout(() => {
                element.textContent = newValue.toString().padStart(2, '0');
                element.style.transform = 'scale(1)';
                
                setTimeout(() => {
                    element.style.color = '';
                }, 300);
            }, 150);
        }
    }
    
    // Initialize countdown
    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
    
    // Animate stats counter
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current).toLocaleString();
            }, 20);
        });
    }
    
    // Trigger stats animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.grid-cols-2');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Handle form submission
    document.getElementById('subscribe-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const successMessage = document.getElementById('success-message');
        const submitButton = this.querySelector('button[type="submit"]');
        
        // Simple email validation
        if (email && email.includes('@')) {
            // Show loading state
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // In a real application, you would send this to your backend
                console.log('Subscribed email:', email);
                
                // Update stats
                const signupsElement = document.querySelector('.stat-number[data-target="10000"]');
                let currentSignups = parseInt(signupsElement.textContent.replace(',', ''));
                signupsElement.textContent = (currentSignups + 1).toLocaleString();
                
                // Show success message
                successMessage.classList.remove('hidden');
                successMessage.classList.add('animate__animated', 'animate__fadeIn');
                
                // Add celebration effect
                document.querySelector('body').classList.add('celebrate');
                setTimeout(() => {
                    document.querySelector('body').classList.remove('celebrate');
                }, 2000);
                
                // Reset form
                document.getElementById('subscribe-form').reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Hide success message after 8 seconds
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                    successMessage.classList.remove('animate__fadeIn');
                }, 8000);
                
            }, 1500);
        } else {
            // Show error animation
            const emailInput = document.getElementById('email');
            emailInput.classList.add('error-shake');
            setTimeout(() => {
                emailInput.classList.remove('error-shake');
            }, 500);
            
            // Show error message
            alert('Please enter a valid professional email address.');
        }
    });
    
    // Add floating animations to elements on load
    const floatingElements = document.querySelectorAll('.countdown-box, .feature-card, .stat-card');
    floatingElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + (index * 100));
    });
    
    // Add hover effect to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add celebration CSS
    const style = document.createElement('style');
    style.textContent = `
        .celebrate {
            animation: celebrate 0.5s ease;
        }
        
        @keyframes celebrate {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
        
        .error-shake {
            animation: shake 0.5s ease-in-out;
            border-color: #EF4444 !important;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);
});