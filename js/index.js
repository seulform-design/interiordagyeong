/* ===== index.js — index page interactions ===== */

document.addEventListener('DOMContentLoaded', function () {

    /* ---- Portfolio category filter ---- */
    const tabs = document.querySelectorAll('.pf-tab');
    const cards = document.querySelectorAll('.pf-card');

    if (tabs.length && cards.length) {
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                const filter = tab.getAttribute('data-filter');

                tabs.forEach(function (t) { t.classList.remove('active'); });
                tab.classList.add('active');

                cards.forEach(function (card) {
                    const cat = card.getAttribute('data-category');
                    const show = (filter === 'all' || cat === filter);
                    card.classList.toggle('is-hidden', !show);
                });
            });
        });
    }

    /* ---- Project card touch hover ---- */
    cards.forEach(function (card) {
        card.addEventListener('touchstart', function () {
            this.classList.toggle('hover');
        }, { passive: true });
    });

    /* ---- Human Base: interactive grid / glow parallax ---- */
    const hb = document.querySelector('.humanbase');
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (hb && hasFinePointer) {
        const grid = hb.querySelector('.hb-grid');
        const glow = hb.querySelector('.hb-glow');
        hb.addEventListener('pointermove', function (e) {
            const r = hb.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            if (grid) grid.style.transform = 'translate(' + (x * 20) + 'px,' + (y * 20) + 'px)';
            if (glow) glow.style.transform = 'translate(' + (x * 64) + 'px,' + (y * 64) + 'px)';
        });
        hb.addEventListener('pointerleave', function () {
            if (grid) grid.style.transform = '';
            if (glow) glow.style.transform = '';
        });
    }

});
