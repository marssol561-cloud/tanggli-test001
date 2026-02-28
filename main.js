const generateBtn = document.getElementById('generate');
const numberElements = document.querySelectorAll('.number');

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
