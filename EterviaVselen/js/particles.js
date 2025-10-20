// �������� ��������� ��� ������� �� ������
document.addEventListener('DOMContentLoaded', function() {
    const createButton = document.getElementById('create-universe-btn');
    
    if (createButton) {
        createButton.addEventListener('click', function(e) {
            createStarParticles(e);
            
            // ������� �� �������� ����������� ����� 1.5 �������
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
            
            // ��������� ��������� ������� ������ ������
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 20;
            const startX = buttonX + Math.cos(angle) * distance;
            const startY = buttonY + Math.sin(angle) * distance;
            
            star.style.left = `${startX}px`;
            star.style.top = `${startY}px`;
            
            // ��������� ������
            const size = Math.random() * 4 + 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // ��������� ������������ ��������
            const duration = Math.random() * 1 + 0.5;
            star.style.animation = `starFloat ${duration}s ease-out forwards`;
            
            document.body.appendChild(star);
            
            // �������� ��������� ����� ��������
            setTimeout(() => {
                if (star.parentNode) {
                    star.parentNode.removeChild(star);
                }
            }, duration * 1000);
        }
    }
});