const generateBtn = document.getElementById('generate');
const numberElements = document.querySelectorAll('.number');
const themeToggle = document.getElementById('theme-toggle');

// 저장된 테마 불러오기
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ── Contact Form ──
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = '전송 중...';
    formStatus.textContent = '';
    formStatus.className = '';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { Accept: 'application/json' },
        });

        if (response.ok) {
            formStatus.textContent = '✅ 문의가 접수되었습니다. 감사합니다!';
            formStatus.className = 'success';
            contactForm.reset();
        } else {
            formStatus.textContent = '❌ 전송에 실패했습니다. 다시 시도해주세요.';
            formStatus.className = 'error';
        }
    } catch {
        formStatus.textContent = '❌ 네트워크 오류가 발생했습니다.';
        formStatus.className = 'error';
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = '문의 보내기';
    }
});

// ── Lotto Generator ──
generateBtn.addEventListener('click', () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    numberElements.forEach((element, index) => {
        element.textContent = sortedNumbers[index];
        element.classList.add('generated');
        setTimeout(() => {
            element.classList.remove('generated');
        }, 300);
    });
});
