/* ===== portfolio.js — 카테고리 필터 ===== */

document.addEventListener('DOMContentLoaded', function () {

    const filterBtns = document.querySelectorAll('.pf-filter-btn');
    const pfCards    = document.querySelectorAll('.pf-card');
    const pfCount    = document.getElementById('pfCount');
    const total      = pfCards.length;

    function pad(n) { return String(n).padStart(2, '0'); }

    function applyFilter(filter) {
        let visible = 0;

        pfCards.forEach(function (card) {
            const matches = (filter === 'all' || card.dataset.category === filter);
            if (matches) {
                card.classList.remove('hide');
                card.style.opacity   = '0';
                card.style.transform = 'translateY(12px)';
                visible++;
                requestAnimationFrame(function () {
                    card.style.transition = 'opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out)';
                    card.style.opacity    = '1';
                    card.style.transform  = 'translateY(0)';
                });
            } else {
                card.classList.add('hide');
            }
        });

        if (pfCount) {
            pfCount.textContent = 'Showing ' + pad(visible) + ' / ' + pad(total) + ' projects';
        }
    }

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            applyFilter(btn.dataset.filter);
        });
    });

    /* ---- Apply filter from URL hash (e.g. portfolio.html#hotel) ---- */
    function applyFromHash() {
        const key = (window.location.hash || '').replace('#', '');
        if (!key) return;
        const target = Array.prototype.find.call(filterBtns, function (b) {
            return b.dataset.filter === key;
        });
        if (target) {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            target.classList.add('active');
            applyFilter(target.dataset.filter);
            const grid = document.getElementById('pfGrid');
            if (grid) {
                requestAnimationFrame(function () {
                    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
            }
        }
    }
    applyFromHash();
    window.addEventListener('hashchange', applyFromHash);

});
