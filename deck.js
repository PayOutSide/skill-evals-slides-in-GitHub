(() => {
    const storageKey = 'payopoint-theme';

    function applyTheme(theme) {
        const root = document.documentElement;
        root.classList.toggle('light-mode', theme === 'light');
        localStorage.setItem(storageKey, theme);
        localStorage.setItem('theme', theme);
    }

    function loadTheme() {
        const saved = localStorage.getItem(storageKey) || localStorage.getItem('theme');
        if (saved === 'light') {
            document.documentElement.classList.add('light-mode');
        }
    }

    function wireThemeToggle() {
        const button = document.querySelector('[data-theme-toggle]');
        if (!button) {
            return;
        }

        button.addEventListener('click', () => {
            const nextTheme = document.documentElement.classList.contains('light-mode') ? 'dark' : 'light';
            applyTheme(nextTheme);
        });
    }

    function wireNavigation() {
        const { body } = document;
        const slide = document.querySelector('.slide');
        const next = body.dataset.next;
        const previous = body.dataset.prev;
        const nextLink = document.querySelector('[data-nav-next]');
        let previousLink = document.querySelector('[data-nav-prev]');

        if (!previousLink && slide) {
            previousLink = document.createElement('a');
            previousLink.className = 'nav-arrow nav-arrow-prev';
            previousLink.setAttribute('data-nav-prev', '');
            previousLink.setAttribute('aria-label', 'Previous slide');
            previousLink.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5L16 12L8 19"/></svg>';
            slide.appendChild(previousLink);
        }

        if (nextLink) {
            nextLink.classList.add('nav-arrow-next');
            if (next) {
                nextLink.href = next;
            } else {
                nextLink.hidden = true;
            }
        }

        if (previousLink) {
            if (previous) {
                previousLink.href = previous;
            } else {
                previousLink.hidden = true;
            }
        }

        document.addEventListener('keydown', (event) => {
            const activeTag = document.activeElement && document.activeElement.tagName;
            if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') {
                return;
            }

            if ((event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') && next) {
                event.preventDefault();
                window.location.href = next;
            }

            if ((event.key === 'ArrowLeft' || event.key === 'PageUp') && previous) {
                event.preventDefault();
                window.location.href = previous;
            }
        });
    }

    function wireExpandableCards() {
        const cards = Array.from(document.querySelectorAll('[data-expand-card]'));
        if (!cards.length) {
            return;
        }

        const slide = document.querySelector('.slide');

        function isPointerInsideCard(card, event) {
            const rect = card.getBoundingClientRect();
            return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
        }

        function clearOpenCardPosition(card) {
            const toggle = card.querySelector('[data-expand-toggle]');
            if (!toggle) {
                return;
            }

            toggle.style.left = '';
            toggle.style.top = '';
            toggle.style.width = '';
            toggle.style.height = '';
            toggle.style.minHeight = '';
        }

        function positionOpenCard(card) {
            const toggle = card.querySelector('[data-expand-toggle]');
            if (!toggle || !slide) {
                return;
            }

            const slideRect = slide.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const grid = card.closest('.checklist-grid');
            const gridRect = grid ? grid.getBoundingClientRect() : slideRect;
            const overlaySize = 500;
            const overlayWidth = overlaySize;
            const overlayHeight = overlaySize;
            const desiredLeft = gridRect.left + ((gridRect.width - overlayWidth) / 2);
            const desiredTop = gridRect.top + ((gridRect.height - overlayHeight) / 2);

            toggle.style.left = `${desiredLeft - cardRect.left}px`;
            toggle.style.top = `${desiredTop - cardRect.top}px`;
            toggle.style.width = `${overlayWidth}px`;
            toggle.style.height = `${overlayHeight}px`;
            toggle.style.minHeight = `${overlayHeight}px`;
        }

        function setOpenCard(nextCard) {
            cards.forEach((card) => {
                const isOpen = card === nextCard;
                card.classList.toggle('is-open', isOpen);
                const toggle = card.querySelector('[data-expand-toggle]');
                if (toggle) {
                    toggle.setAttribute('aria-expanded', String(isOpen));
                }

                if (isOpen) {
                    positionOpenCard(card);
                } else {
                    clearOpenCardPosition(card);
                }
            });
        }

        cards.forEach((card) => {
            const toggle = card.querySelector('[data-expand-toggle]');
            if (!toggle) {
                return;
            }

            toggle.addEventListener('click', (event) => {
                event.preventDefault();
                const shouldOpen = !card.classList.contains('is-open');
                setOpenCard(shouldOpen ? card : null);
            });

            card.addEventListener('mouseenter', () => {
                setOpenCard(card);
            });

            card.addEventListener('mousemove', (event) => {
                if (card.classList.contains('is-open') && !isPointerInsideCard(card, event)) {
                    setOpenCard(null);
                }
            });

            card.addEventListener('mouseleave', () => {
                setOpenCard(null);
            });

            toggle.addEventListener('focus', () => {
                setOpenCard(card);
            });

            toggle.addEventListener('blur', () => {
                queueMicrotask(() => {
                    if (!card.contains(document.activeElement)) {
                        setOpenCard(null);
                    }
                });
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                setOpenCard(null);
            }
        });
    }

    loadTheme();
    document.addEventListener('DOMContentLoaded', () => {
        wireThemeToggle();
        wireNavigation();
        wireExpandableCards();
    });
})();