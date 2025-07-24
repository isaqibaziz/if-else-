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
const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');
const formStatus = document.querySelector('[data-form-status]');

// Enable/disable submit button based on form validity
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if (form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else {
            formBtn.setAttribute('disabled', '');
        }
    });
}

// Form submission handler
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Disable button during submission
    formBtn.setAttribute('disabled', '');
    formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';

    // Simulate form submission (replace with actual AJAX call)
    setTimeout(() => {
        // This is where you would normally make your fetch/AJAX call
        // For demo purposes, we're simulating a successful submission
        const isSuccess = Math.random() > 0.2; // 80% chance of success

        if (isSuccess) {
            formStatus.textContent = 'Your message has been sent successfully!';
            formStatus.classList.remove('error');
            formStatus.classList.add('success');
            form.reset();
        } else {
            formStatus.textContent = 'Failed to send message. Please try again later.';
            formStatus.classList.remove('success');
            formStatus.classList.add('error');
        }

        formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';

        if (form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        }

        // Hide status message after 5 seconds
        setTimeout(() => {
            formStatus.classList.remove('success', 'error');
            formStatus.textContent = '';
        }, 5000);
    }, 1500);
});

// Page Navigation (if needed)
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

if (navigationLinks.length > 0 && pages.length > 0) {
    for (let i = 0; i < navigationLinks.length; i++) {
        navigationLinks[i].addEventListener('click', function () {
            for (let j = 0; j < pages.length; j++) {
                if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
                    pages[j].classList.add('active');
                    navigationLinks[j].classList.add('active');
                    window.scrollTo(0, 0);
                } else {
                    pages[j].classList.remove('active');
                    navigationLinks[j].classList.remove('active');
                }
            }
        });
    }
}