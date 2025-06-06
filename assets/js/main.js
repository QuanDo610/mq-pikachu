document.addEventListener('DOMContentLoaded', function () {
    // Function to initialize dropdown hover
    function initDropdownHover() {
        const dropdowns = document.querySelectorAll('.nav-item.dropdown');

        if (dropdowns.length === 0) {
            console.warn('No dropdowns found. Ensure header.html is loaded correctly.');
            return;
        }

        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function () {
                if (window.innerWidth > 991) {
                    const dropdownMenu = this.querySelector('.dropdown-menu');
                    const dropdownToggle = this.querySelector('.dropdown-toggle');

                    if (dropdownMenu && dropdownToggle) {
                        dropdownMenu.classList.add('show');
                        dropdownToggle.classList.add('show');
                        dropdownToggle.setAttribute('aria-expanded', 'true');
                    }
                }
            });

            dropdown.addEventListener('mouseleave', function () {
                if (window.innerWidth > 991) {
                    const dropdownMenu = this.querySelector('.dropdown-menu');
                    const dropdownToggle = this.querySelector('.dropdown-toggle');

                    if (dropdownMenu && dropdownToggle) {
                        dropdownMenu.classList.remove('show');
                        dropdownToggle.classList.remove('show');
                        dropdownToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
    }

    // Wait for header to load
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        // Check if header is already loaded
        if (headerPlaceholder.innerHTML) {
            initDropdownHover();
        } else {
            // Wait for fetch to complete
            const observer = new MutationObserver(() => {
                if (headerPlaceholder.innerHTML) {
                    initDropdownHover();
                    observer.disconnect();
                }
            });
            observer.observe(headerPlaceholder, { childList: true });
        }
    } else {
        console.error('Header placeholder not found.');
    }

    
});