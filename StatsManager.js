class StatsManager {
    constructor(containerId, instanceNumber) {
        this.containerId = containerId;
        this.stats = [];
        this.loadStats();
      
        this.selectedStats = {};
        this.filteredStats = {};
        this.init();
    }

    async loadStats() {
        try {
            const response = await fetch('path/to/your/stats.json'); // 실제 경로로 대체하세요.
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            this.stats = await response.json();
            this.init();
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    init() {
        this.createUI();
        this.bindEvents();
    }

    createUI() {
        const container = document.createElement('div');
        container.className = 'stats-manager-container';
        container.innerHTML = `
            <h1>Stats Management</h1>
            <button class="toggleFullList">모든 옵션 보기</button>
            <div class="fullList container"></div>

            <h2>옵션 검색</h2>
            <input type="text" class="searchBox" placeholder="Search stats...">
            <div class="searchResults container"></div>

            <h2>확인할 아이템 정보 입력</h2>
            <textarea class="pasteBox" placeholder="Paste text here..."></textarea>

            <h2>선택된 옵션</h2>
            <div class="selectedStats"></div>
            <br />
            <h3>검색 결과</h3>
            <div class="highlightedText"></div>
        `;
        document.getElementById(this.containerId).appendChild(container);
    }

    bindEvents() {
        const container = document.querySelector(`#${this.containerId} .stats-manager-container`);
        const searchBox = container.querySelector('.searchBox');
        const pasteBox = container.querySelector('.pasteBox');
        const toggleButton = container.querySelector('.toggleFullList');

        searchBox.addEventListener('input', this.filterStats.bind(this));
        pasteBox.addEventListener('input', this.highlightText.bind(this));
        toggleButton.addEventListener('click', this.toggleFullList.bind(this));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const statsManagersContainer = 'statsManagers';
    for (let i = 0; i < 11; i++) {
        new StatsManager(statsManagersContainer, i);
    }
});
