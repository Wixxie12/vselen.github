// �������� ������� �����
document.addEventListener('DOMContentLoaded', function () {
    // �������� ��������� ���������
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });

    // ����������� ���������� � ������������
    displayUserInfo();

    // ������������� ��������� �� �������� ���������
    initSliders();

    // ������������� ������ �������
    initLawSelection();

    // ������������� ������ ����������
    initLeaderSelection();
});

// ������� ����������� ���������� � ������������
function displayUserInfo() {
    const user = getCurrentUser();
    const userInfoElement = document.getElementById('userInfo');

    if (userInfoElement && user) {
        userInfoElement.innerHTML = `
            <span style="color: #c77dff;">${user.username}</span>
            <button onclick="logout()" style="background: transparent; border: 1px solid #c77dff; color: #c77dff; padding: 0.3rem 0.8rem; border-radius: 5px; margin-left: 1rem; cursor: pointer;">
                �����
            </button>
        `;
    }
}

// ������� ��� ���������
function initSliders() {
    const sliders = document.querySelectorAll('.range-slider');

    sliders.forEach(slider => {
        const valueDisplay = slider.parentElement.querySelector('.race-value');

        slider.addEventListener('input', function () {
            valueDisplay.textContent = formatNumber(this.value);
        });
    });
}

function formatNumber(num) {
    return new Intl.NumberFormat('ru-RU').format(num);
}

// ������� ��� ������ �������
function initLawSelection() {
    const lawOptions = document.querySelectorAll('.law-option');

    lawOptions.forEach(option => {
        option.addEventListener('click', function () {
            this.classList.toggle('selected');
        });
    });
}

// ������� ��� ������ ����������
function initLeaderSelection() {
    const leaderOptions = document.querySelectorAll('.leader-option');

    leaderOptions.forEach(option => {
        option.addEventListener('click', function () {
            // ������� ��������� � ������ ��������� � ��� �� ������
            const parent = this.closest('.region-options');
            const siblings = parent.querySelectorAll('.leader-option');
            siblings.forEach(sib => sib.classList.remove('selected'));

            // �������� ������� �������
            this.classList.add('selected');
        });
    });
}

// ������� ��� ���������� ����� ����
function addNewRace() {
    const racesContainer = document.getElementById('races-container');
    const newRaceId = 'race-' + Date.now();

    const newRaceHTML = `
        <div class="slider-group" id="${newRaceId}">
            <div class="slider-label">
                <input type="text" class="race-name-input" placeholder="�������� ����" style="background: transparent; border: none; color: white; font-weight: 600; width: 70%;">
                <span class="race-value">0</span>
            </div>
            <input type="range" class="range-slider" min="0" max="10000000" value="0" step="100000">
            <button class="remove-race-btn" onclick="removeRace('${newRaceId}')" style="background: transparent; border: none; color: #ff6b6b; cursor: pointer; margin-top: 0.5rem;">�������</button>
        </div>
    `;

    racesContainer.insertAdjacentHTML('beforeend', newRaceHTML);

    // �������������� ����� ��������
    const newSlider = document.querySelector(`#${newRaceId} .range-slider`);
    const newValueDisplay = document.querySelector(`#${newRaceId} .race-value`);

    newSlider.addEventListener('input', function () {
        newValueDisplay.textContent = formatNumber(this.value);
    });
}

function removeRace(raceId) {
    const raceElement = document.getElementById(raceId);
    if (raceElement) {
        raceElement.remove();
    }
}