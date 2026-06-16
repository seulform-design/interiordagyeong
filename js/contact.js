/* ===== contact.js — inquiry form ===== */

document.addEventListener('DOMContentLoaded', function () {

    const form    = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = form.querySelector('.btn-submit');
        const orig = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        // 실제 서버 연동 시 fetch/axios 코드 삽입
        setTimeout(function () {
            form.style.display = 'none';
            if (success) {
                success.hidden = false;
                success.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            btn.textContent = orig;
            btn.disabled = false;
        }, 700);
    });

    /* Auto hyphen for phone */
    const phone = document.getElementById('phone');
    if (phone) {
        phone.addEventListener('input', function () {
            let v = this.value.replace(/\D/g, '');
            if (v.length <= 3)       this.value = v;
            else if (v.length <= 7)  this.value = v.slice(0, 3) + '-' + v.slice(3);
            else                     this.value = v.slice(0, 3) + '-' + v.slice(3, 7) + '-' + v.slice(7, 11);
        });
    }

});
