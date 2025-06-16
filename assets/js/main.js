document.addEventListener('DOMContentLoaded', function () {
    // Function to initialize dropdown hover with improved timing
    function initDropdownHover() {
        const dropdowns = document.querySelectorAll('.nav-item.dropdown');

        if (dropdowns.length === 0) {
            console.warn('No dropdowns found. Ensure header.html is loaded correctly.');
            return;
        }

        dropdowns.forEach(dropdown => {
            let hoverTimeout;
            let isHovering = false;

            // Mouse enter on dropdown
            dropdown.addEventListener('mouseenter', function () {
                if (window.innerWidth > 991) {
                    clearTimeout(hoverTimeout);
                    isHovering = true;
                    
                    const dropdownMenu = this.querySelector('.dropdown-menu');
                    const dropdownToggle = this.querySelector('.dropdown-toggle');

                    if (dropdownMenu && dropdownToggle) {
                        // Small delay to prevent accidental activation
                        setTimeout(() => {
                            if (isHovering) {
                                dropdownMenu.classList.add('show');
                                dropdownToggle.classList.add('show');
                                dropdownToggle.setAttribute('aria-expanded', 'true');
                            }
                        }, 100);
                    }
                }
            });

            // Mouse leave on dropdown
            dropdown.addEventListener('mouseleave', function () {
                if (window.innerWidth > 991) {
                    isHovering = false;
                    const dropdownMenu = this.querySelector('.dropdown-menu');
                    const dropdownToggle = this.querySelector('.dropdown-toggle');

                    // Add delay before hiding to allow user to move to dropdown
                    hoverTimeout = setTimeout(() => {
                        if (dropdownMenu && dropdownToggle && !isHovering) {
                            dropdownMenu.classList.remove('show');
                            dropdownToggle.classList.remove('show');
                            dropdownToggle.setAttribute('aria-expanded', 'false');
                        }
                    }, 300); // 300ms delay before hiding
                }
            });

            // Keep dropdown open when hovering over the dropdown menu itself
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            if (dropdownMenu) {
                dropdownMenu.addEventListener('mouseenter', function () {
                    clearTimeout(hoverTimeout);
                    isHovering = true;
                });

                dropdownMenu.addEventListener('mouseleave', function () {
                    isHovering = false;
                    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
                    
                    hoverTimeout = setTimeout(() => {
                        if (!isHovering) {
                            this.classList.remove('show');
                            if (dropdownToggle) {
                                dropdownToggle.classList.remove('show');
                                dropdownToggle.setAttribute('aria-expanded', 'false');
                            }
                        }
                    }, 200);
                });
            }
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