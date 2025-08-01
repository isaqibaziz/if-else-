document.addEventListener('DOMContentLoaded', function () {
    // Filter functionality
    const filterButtons = document.querySelectorAll('[data-filter-btn]');
    const filterSelectItems = document.querySelectorAll('[data-select-item]');
    const projectItems = document.querySelectorAll('[data-filter-item]');
    const selectValue = document.querySelector('[data-select-value]');
    const filterSelect = document.querySelector('[data-select]');
    const selectList = document.querySelector('.select-list');

    // Desktop filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-category');
            filterProjects(filterValue);
        });
    });

    // Mobile select items
    filterSelectItems.forEach(item => {
        item.addEventListener('click', () => {
            const filterValue = item.getAttribute('data-category');
            selectValue.textContent = item.textContent;
            filterSelect.classList.remove('active');
            selectList.style.opacity = '0';
            selectList.style.visibility = 'hidden';
            filterProjects(filterValue);
        });
    });

    // Toggle select dropdown
    filterSelect.addEventListener('click', () => {
        filterSelect.classList.toggle('active');
        selectList.style.opacity = filterSelect.classList.contains('active') ? '1' : '0';
        selectList.style.visibility = filterSelect.classList.contains('active') ? 'visible' : 'hidden';
    });

    // Filter projects function
    function filterProjects(filterValue) {
        projectItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (filterValue === 'all' || itemCategory === filterValue) {
                item.classList.add('active');
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Initialize with all projects visible
    filterProjects('all');

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!filterSelect.contains(e.target)) {
            filterSelect.classList.remove('active');
            selectList.style.opacity = '0';
            selectList.style.visibility = 'hidden';
        }
    });
});

// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('[data-form]');
    const formInputs = document.querySelectorAll('[data-form-input]');
    const formBtn = document.querySelector('[data-form-btn]');
    const formStatus = document.querySelector('[data-form-status]');

    // Enable/disable submit button based on form validity
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            formBtn.disabled = !form.checkValidity();
        });
    });

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Disable button during submission
        formBtn.disabled = true;
        formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = 'Your message has been sent successfully!';
                formStatus.classList.remove('error');
                formStatus.classList.add('success');
                form.reset();
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            formStatus.textContent = 'Failed to send message. Please try again later.';
            formStatus.classList.remove('success');
            formStatus.classList.add('error');
        } finally {
            formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
            formBtn.disabled = !form.checkValidity();

            // Hide status message after 5 seconds
            setTimeout(() => {
                formStatus.classList.remove('success', 'error');
                formStatus.textContent = '';
            }, 5000);
        }
    });
});

// Scroll Effect 

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('#home, #about, #skills, #portfolio, #contact');
    const navLinks = document.querySelectorAll('.navbar-link');
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scrolling for nav links (SPECIFIC FIX FOR HOME LINK)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#home') {
                // Special handling for Home link
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Normal handling for other links
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});