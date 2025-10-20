// Создание звездочек при нажатии на кнопку
document.addEventListener('DOMContentLoaded', function() {
    const createButton = document.getElementById('create-universe-btn');
    
    if (createButton) {
        createButton.addEventListener('click', function(e) {
            createStarParticles(e);
            
            // Переход на страницу регистрации через 1.5 секунды
            setTimeout(() => {
                window.location.href = 'register.html';
            }, 1500);
        });
    }
    
    function createStarParticles(e) {
        const buttonRect = createButton.getBoundingClientRect();
        const buttonX = buttonRect.left + buttonRect.width / 2;
        const buttonY = buttonRect.top + buttonRect.height / 2;
        
        for (let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Случайные начальные позиции вокруг кнопки
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 20;
            const startX = buttonX + Math.cos(angle) * distance;
            const startY = buttonY + Math.sin(angle) * distance;
            
            star.style.left = `${startX}px`;
            star.style.top = `${startY}px`;
            
            // Случайный размер
            const size = Math.random() * 4 + 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Случайная длительность анимации
            const duration = Math.random() * 1 + 0.5;
            star.style.animation = `starFloat ${duration}s ease-out forwards`;
            
            document.body.appendChild(star);
            
            // Удаление звездочки после анимации
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, duration * 1000);
        }
    }
});