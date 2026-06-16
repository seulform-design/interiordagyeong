/* ===== common.js — header / nav / reveal ===== */

document.addEventListener('DOMContentLoaded', function () {

    /* ---- Header scroll state ---- */
    const header = document.getElementById('header');
    function updateHeader() {
        if (window.scrollY > 60) header.classList.add('scrolled');
        else                     header.classList.remove('scrolled');
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();

    /* ---- Sub page: keep header solid ---- */
    const isSubPage = !document.querySelector('.hero');
    if (isSubPage) header.classList.add('scrolled');

    /* ---- Hamburger menu ---- */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function () {
            const open = hamburger.classList.toggle('active');
            mobileNav.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        mobileNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---- Mobile nav accordion ---- */
    document.querySelectorAll('.m-acc-head').forEach(function (head) {
        const panel = head.nextElementSibling;
        head.addEventListener('click', function () {
            const isOpen = head.getAttribute('aria-expanded') === 'true';

            /* close siblings for a clean single-open accordion */
            document.querySelectorAll('.m-acc-head').forEach(function (other) {
                if (other !== head) {
                    other.setAttribute('aria-expanded', 'false');
                    if (other.nextElementSibling) other.nextElementSibling.style.maxHeight = '';
                }
            });

            if (isOpen) {
                head.setAttribute('aria-expanded', 'false');
                if (panel) panel.style.maxHeight = '';
            } else {
                head.setAttribute('aria-expanded', 'true');
                if (panel) panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        });
    });

    /* ---- Active nav highlight ---- */
    const path = window.location.pathname.replace(/\/$/, '');
    document.querySelectorAll('.gnb a, .mobile-nav a').forEach(function (link) {
        const href = link.getAttribute('href').replace(/\.\//, '');
        const file = href.replace('.html', '');
        const isHome = (file === '' || file === 'index');
        const onHome = (path === '' || path.endsWith('/') || path.endsWith('index.html'));
        if (isHome && onHome) link.classList.add('active');
        else if (!isHome && path.endsWith(href)) link.classList.add('active');
    });

    /* ---- Reveal on scroll ---- */
    const reveal = document.querySelectorAll(
        '.about-head, .value, .cv-item, .pp-text, .pp-visual, ' +
        '.hb-text, .hb-visual, .org-lead, .org-dept, ' +
        '.proc-item, .proc-slogan, .pf-card, .lic-card, .client-block, ' +
        '.philo-lead, .philo-body, .srv-row, .pj-card, ' +
        '.stat, .info-dl, .srv-block, .plan-row, .hist-item, .rv-card, ' +
        '.ct-info, .ct-form-box, .visit-info, .visit-map'
    );
    reveal.forEach(function (el) { el.classList.add('fade-in'); });

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveal.forEach(function (el) { io.observe(el); });
    } else {
        reveal.forEach(function (el) { el.classList.add('visible'); });
    }

    /* ---- Smooth anchor scroll ---- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id.length <= 1) return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---- Global floating inquiry CTA ---- */
    (function () {
        const onContact = /contact\.html$/.test(window.location.pathname);
        if (onContact || document.querySelector('.float-cta')) return;

        const cta = document.createElement('a');
        cta.href = './contact.html';
        cta.className = 'float-cta';
        cta.setAttribute('aria-label', '프로젝트 문의하기');
        cta.innerHTML =
            '<span class="float-cta-dot" aria-hidden="true"></span>' +
            '<span class="float-cta-label">프로젝트 문의</span>';
        document.body.appendChild(cta);

        function toggleCta() {
            if (window.scrollY > 320) cta.classList.add('show');
            else cta.classList.remove('show');
        }
        window.addEventListener('scroll', toggleCta, { passive: true });
        toggleCta();
    })();

});
