// Дополнительные функции для создания вселенной

// Функция для проверки совместимости законов
function checkLawCompatibility(selectedLaws) {
    const incompatiblePairs = [
        ['magic-unlimited', 'magic-forbidden'],
        ['racial-equality', 'racial-isolation'],
        ['free-trade', 'separate-markets']
    ];

    for (const pair of incompatiblePairs) {
        if (selectedLaws.includes(pair[0]) && selectedLaws.includes(pair[1])) {
            return {
                compatible: false,
                conflict: pair
            };
        }
    }

    return { compatible: true };
}

// Функция для генерации описания вселенной на основе выбранных параметров
function generateUniverseDescription(data) {
    const {
        universeName,
        selectedPlanet,
        populationData,
        selectedLaws,
        governmentData
    } = data;

    let description = `Вселенная "${universeName}" расположена на планете ${selectedPlanet === 'aurora' ? 'Аврора' : 'Умбра'}. `;

    // Описание населения
    const totalPopulation = Object.values(populationData).reduce((sum, count) => sum + parseInt(count), 0);
    if (totalPopulation > 0) {
        description += `Население составляет примерно ${new Intl.NumberFormat('ru-RU').format(totalPopulation)} существ. `;

        // Основная раса
        const mainRace = Object.entries(populationData).reduce((max, [race, count]) =>
            parseInt(count) > parseInt(max.count) ? { race, count } : max, { race: '', count: 0 }
        );

        if (mainRace.count > 0) {
            description += `Преобладают ${mainRace.race}. `;
        }
    }

    // Описание законов
    if (selectedLaws.length > 0) {
        description += 'В мире установлены законы: ';
        description += selectedLaws.map(law => getLawName(law)).join(', ') + '. ';
    }

    // Описание правительства
    if (governmentData.type === 'anarchy') {
        description += 'В мире царит анархия без центрального правительства. ';
    } else {
        description += `Форма правления - ${getGovernmentType(governmentData.type)}. `;
    }

    return description;
}

// Функция для сохранения вселенной
function saveUniverse() {
    const universeData = {
        id: Date.now(),
        name: localStorage.getItem('universeName'),
        planet: localStorage.getItem('selectedPlanet'),
        population: JSON.parse(localStorage.getItem('populationData') || '{}'),
        laws: JSON.parse(localStorage.getItem('selectedLaws') || '[]'),
        government: JSON.parse(localStorage.getItem('governmentData') || '{}'),
        createdAt: new Date().toISOString(),
        description: generateUniverseDescription({
            universeName: localStorage.getItem('universeName'),
            selectedPlanet: localStorage.getItem('selectedPlanet'),
            populationData: JSON.parse(localStorage.getItem('populationData') || '{}'),
            selectedLaws: JSON.parse(localStorage.getItem('selectedLaws') || '[]'),
            governmentData: JSON.parse(localStorage.getItem('governmentData') || '{}')
        })
    };

    // Сохраняем в localStorage
    const savedUniverses = JSON.parse(localStorage.getItem('savedUniverses') || '[]');
    savedUniverses.push(universeData);
    localStorage.setItem('savedUniverses', JSON.stringify(savedUniverses));

    return universeData;
}

// Функция для загрузки списка вселенных
function loadUniverses() {
    return JSON.parse(localStorage.getItem('savedUniverses') || '[]');
}

// Функция для удаления вселенной
function deleteUniverse(universeId) {
    const savedUniverses = loadUniverses();
    const updatedUniverses = savedUniverses.filter(universe => universe.id !== universeId);
    localStorage.setItem('savedUniverses', JSON.stringify(updatedUniverses));
    return updatedUniverses;
}