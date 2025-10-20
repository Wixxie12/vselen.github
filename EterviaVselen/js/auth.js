// js/auth.js - ������������ ������
document.addEventListener('DOMContentLoaded', function () {
    console.log('Auth system loaded');

    // ������������� ���������
    initializeStorage();

    // ��������� ����
    setupRegisterForm();
    setupLoginForm();

    // �������� �����������
    checkAuthStatus();
});

// ������������� ���������
function initializeStorage() {
    if (!localStorage.getItem('eterviaUsers')) {
        localStorage.setItem('eterviaUsers', JSON.stringify([]));
        console.log('Initialized users storage');
    }
}

// ��������� ����� �����������
function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    console.log('Setting up register form');

    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('Register form submitted');

        const email = document.getElementById('email').value.trim().toLowerCase();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        // ���������
        if (!validateRegistration(email, username, password, confirmPassword)) {
            return;
        }

        // ����������� ������������
        if (registerUser(email, username, password)) {
            // �������������� ���� � �������
            loginAndRedirect(email, password);
        }
    });
}

// ��������� ����� �����
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;

    console.log('Setting up login form');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log('Login form submitted');

        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;

        if (loginUser(email, password)) {
            // ��������� �������� ������������
            loadUserProgress();
            redirectToUniverse();
        } else {
            alert('�������� Gmail ��� ������');
        }
    });
}

// ��������� �����������
function validateRegistration(email, username, password, confirmPassword) {
    // �������� Gmail
    if (!email.endsWith('@gmail.com')) {
        alert('����������, ����������� Gmail ����� (example@gmail.com)');
        return false;
    }

    // �������� ������
    if (password.length < 7) {
        alert('������ ������ ��������� �� ����� 7 ��������');
        return false;
    }

    if (password !== confirmPassword) {
        alert('������ �� ���������');
        return false;
    }

    // �������� ����� ������������
    if (username.length < 3) {
        alert('��� ������������ ������ ��������� �� ����� 3 ��������');
        return false;
    }

    // �������� ������������� ������������
    const users = getUsers();
    if (users.find(user => user.email === email)) {
        alert('������������ � ����� Gmail ��� ���������������');
        return false;
    }

    if (users.find(user => user.username === username)) {
        alert('��� ��� ������������ ��� ������');
        return false;
    }

    return true;
}

// ����������� ������������
function registerUser(email, username, password) {
    const users = getUsers();

    const newUser = {
        id: Date.now(),
        email: email,
        username: username,
        password: password,
        createdAt: new Date().toISOString(),
        isActive: true,
        progress: {}
    };

    users.push(newUser);
    localStorage.setItem('eterviaUsers', JSON.stringify(users));

    console.log('User registered:', newUser);
    return true;
}

// ���� ������������
function loginUser(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log('User logged in:', user);
        return true;
    }

    return false;
}

// �������������� ���� � ������� ����� �����������
function loginAndRedirect(email, password) {
    if (loginUser(email, password)) {
        redirectToUniverse();
    }
}

// ������� �� �������� �������� ���������
function redirectToUniverse() {
    const pageTransition = document.getElementById('pageTransition');

    if (pageTransition) {
        pageTransition.classList.add('active');
        console.log('Starting page transition');

        setTimeout(() => {
            console.log('Redirecting to universe-name.html');
            window.location.href = 'universe-name.html';
        }, 1500);
    } else {
        console.log('No transition element, direct redirect');
        window.location.href = 'universe-name.html';
    }
}

// ��������� ������ �������������
function getUsers() {
    return JSON.parse(localStorage.getItem('eterviaUsers') || '[]');
}

// ��������� �������� ������������
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// ���������� ���������
function saveProgress(step, data) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        console.log('No current user, cannot save progress');
        return;
    }

    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === currentUser.id);

    if (userIndex !== -1) {
        if (!users[userIndex].progress) {
            users[userIndex].progress = {};
        }

        users[userIndex].progress[step] = {
            ...data,
            savedAt: new Date().toISOString()
        };

        // ��������� �������� ������������
        localStorage.setItem('eterviaUsers', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));

        console.log('Progress saved for step:', step, data);
    }
}

// �������� ��������� ������������
function loadUserProgress() {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.progress) {
        console.log('No progress to load');
        return;
    }

    console.log('Loading user progress:', currentUser.progress);

    // ��������������� ������ �� ���������
    Object.keys(currentUser.progress).forEach(step => {
        const stepData = currentUser.progress[step];

        switch (step) {
            case 'universe-name':
                if (stepData.universeName) {
                    localStorage.setItem('universeName', stepData.universeName);
                    console.log('Loaded universe name:', stepData.universeName);
                }
                break;
            case 'planet':
                if (stepData.selectedPlanet) {
                    localStorage.setItem('selectedPlanet', stepData.selectedPlanet);
                    console.log('Loaded planet:', stepData.selectedPlanet);
                }
                break;
            case 'population':
                if (stepData.populationData) {
                    localStorage.setItem('populationData', JSON.stringify(stepData.populationData));
                    console.log('Loaded population data');
                }
                break;
            case 'laws':
                if (stepData.selectedLaws) {
                    localStorage.setItem('selectedLaws', JSON.stringify(stepData.selectedLaws));
                    console.log('Loaded laws data');
                }
                break;
        }
    });
}

// �������� �����������
function checkAuthStatus() {
    const currentUser = getCurrentUser();
    const protectedPages = [
        'universe-name.html',
        'planet-selection.html',
        'population.html',
        'laws.html',
        'government.html',
        'success.html'
    ];

    const currentPage = window.location.pathname.split('/').pop();

    if (protectedPages.includes(currentPage)) {
        if (!currentUser) {
            console.log('Not authenticated, redirecting to login');
            window.location.href = 'login.html';
        } else {
            console.log('User authenticated:', currentUser.username);
            displayUserInfo();
        }
    }
}

// ����������� ���������� � ������������
function displayUserInfo() {
    const userInfoElement = document.getElementById('userInfo');
    const currentUser = getCurrentUser();

    if (userInfoElement && currentUser) {
        userInfoElement.innerHTML = `
            <span style="color: #c77dff; margin-right: 1rem;">${currentUser.username}</span>
            <button onclick="logout()" class="logout-btn">�����</button>
        `;
    }
}

// ����� �� �������
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}