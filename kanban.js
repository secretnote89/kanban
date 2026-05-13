// Global State (Phase 2: 멀티유저 대비)
let currentUserId = null;           // 현재 사용자 ID
let currentBoardId = 'default';     // 현재 보드 ID
let cards = [];                     // 현재 사용자의 카드만
let draggedCard = null;
let currentColumn = null;

const modal = document.getElementById('cardModal');
const cardTitleInput = document.getElementById('cardTitle');
const addCardBtn = document.getElementById('addCardBtn');
const cancelBtn = document.getElementById('cancelBtn');
const addCardBtns = document.querySelectorAll('.add-card-btn');

addCardBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentColumn = btn.dataset.column;
        modal.classList.add('active');
        cardTitleInput.focus();
    });
});

cancelBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    cardTitleInput.value = '';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        cardTitleInput.value = '';
    }
});

cardTitleInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addCard();
    }
});

addCardBtn.addEventListener('click', addCard);

function addCard() {
    const title = cardTitleInput.value.trim();

    if (title === '') {
        alert('카드 제목을 입력해주세요!');
        return;
    }

    if (title.length > 200) {
        alert('카드 제목은 200자 이내로 입력해주세요!');
        return;
    }

    const card = {
        id: Date.now(),
        title: title,
        status: currentColumn,
        userId: currentUserId,      // 사용자 ID 추가
        boardId: currentBoardId,    // 보드 ID 추가
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    cards.push(card);
    renderCard(card);
    updateCounts();
    saveToStorage();  // 자동 저장

    modal.classList.remove('active');
    cardTitleInput.value = '';
}

function renderCard(card) {
    const container = document.getElementById(card.status);

    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.draggable = true;
    cardElement.dataset.id = card.id;

    const titleElement = document.createElement('div');
    titleElement.className = 'card-content';

    const titleSpan = document.createElement('span');
    titleSpan.className = 'card-title';
    titleSpan.textContent = card.title;  // XSS 방지: textContent 사용

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = '삭제';
    deleteButton.onclick = () => deleteCard(card.id);

    titleElement.appendChild(titleSpan);
    titleElement.appendChild(deleteButton);
    cardElement.appendChild(titleElement);

    cardElement.addEventListener('dragstart', handleDragStart);
    cardElement.addEventListener('dragend', handleDragEnd);

    container.appendChild(cardElement);
}

function deleteCard(id) {
    // 사용자 권한 확인
    const card = cards.find(c => c.id === id);
    if (!card || card.userId !== currentUserId) {
        alert('이 카드를 삭제할 권한이 없습니다.');
        return;
    }

    if (confirm('이 카드를 삭제하시겠습니까?')) {
        cards = cards.filter(card => card.id !== id);
        const cardElement = document.querySelector(`[data-id="${id}"]`);
        if (cardElement) {
            cardElement.remove();
        }
        updateCounts();
        saveToStorage();  // 자동 저장
    }
}

function handleDragStart(e) {
    draggedCard = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    this.classList.remove('dragging');

    document.querySelectorAll('.cards-container').forEach(container => {
        container.classList.remove('drag-over');
    });
}

document.querySelectorAll('.cards-container').forEach(container => {
    container.addEventListener('dragover', handleDragOver);
    container.addEventListener('drop', handleDrop);
    container.addEventListener('dragenter', handleDragEnter);
    container.addEventListener('dragleave', handleDragLeave);
});

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDragEnter(e) {
    if (e.target.classList.contains('cards-container')) {
        e.target.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    if (e.target.classList.contains('cards-container')) {
        e.target.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();

    const container = e.target.closest('.cards-container');
    if (!container) return;

    container.classList.remove('drag-over');

    const newStatus = container.id;
    const cardId = parseInt(draggedCard.dataset.id);

    const card = cards.find(c => c.id === cardId);
    if (card) {
        // 사용자 권한 확인
        if (card.userId !== currentUserId) {
            alert('이 카드를 이동할 권한이 없습니다.');
            return;
        }
        card.status = newStatus;
        card.updatedAt = Date.now();
    }

    container.appendChild(draggedCard);
    updateCounts();
    saveToStorage();  // 자동 저장
}

function updateCounts() {
    const todoCont = document.getElementById('todo');
    const inProgressCont = document.getElementById('in-progress');
    const doneCont = document.getElementById('done');

    document.querySelector('[data-status="todo"] .count').textContent =
        todoCont.children.length;
    document.querySelector('[data-status="in-progress"] .count').textContent =
        inProgressCont.children.length;
    document.querySelector('[data-status="done"] .count').textContent =
        doneCont.children.length;
}

// ===== 사용자 ID 관리 (Phase 2: 멀티유저 대비) =====

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function initializeUserId() {
    let userId = localStorage.getItem('kanban-current-user');

    if (!userId) {
        userId = 'anonymous-' + generateUUID();
        localStorage.setItem('kanban-current-user', userId);
        console.log('Created anonymous user:', userId);
    } else {
        console.log('Loaded existing user:', userId);
    }

    currentUserId = userId;
    return userId;
}

// ===== LocalStorage 저장/불러오기 (사용자별 격리) =====

function getStorageKey() {
    return `kanban-${currentUserId}-${currentBoardId}`;
}

function saveToStorage() {
    try {
        const storageKey = getStorageKey();
        const data = JSON.stringify(cards);
        localStorage.setItem(storageKey, data);

        // 메타데이터 업데이트
        const metadata = {
            version: '1.0.0',
            lastUpdated: Date.now(),
            totalCards: cards.length
        };
        localStorage.setItem(`${storageKey}-metadata`, JSON.stringify(metadata));

        console.log(`Saved ${cards.length} cards to storage`);
        return true;
    } catch (error) {
        console.error('Failed to save:', error);

        if (error.name === 'QuotaExceededError') {
            alert('저장 공간이 부족합니다. 오래된 카드를 삭제해주세요.');
        }

        return false;
    }
}

function loadFromStorage() {
    try {
        const storageKey = getStorageKey();
        const data = localStorage.getItem(storageKey);

        if (!data) {
            console.log('No data found. Loading sample cards.');
            return false;
        }

        const parsed = JSON.parse(data);

        if (validateCards(parsed)) {
            cards = parsed;
            console.log(`Loaded ${cards.length} cards from storage`);
            return true;
        } else {
            console.warn('Invalid data format. Loading sample cards.');
            return false;
        }
    } catch (error) {
        console.error('Failed to load:', error);

        if (error instanceof SyntaxError) {
            console.error('Corrupted data. Loading sample cards.');
        }

        return false;
    }
}

function validateCards(data) {
    if (!Array.isArray(data)) {
        return false;
    }

    return data.every(card => {
        const isValidBasic = (
            typeof card.id === 'number' &&
            card.id > 0 &&
            typeof card.title === 'string' &&
            card.title.length > 0 &&
            card.title.length <= 200 &&
            ['todo', 'in-progress', 'done'].includes(card.status)
        );

        // Phase 2: userId 검증 (선택적)
        const isValidUser = !card.userId || card.userId === currentUserId;

        return isValidBasic && isValidUser;
    });
}

function clearStorage() {
    if (confirm('모든 데이터를 삭제하시겠습니까? (복구 불가)')) {
        const storageKey = getStorageKey();
        localStorage.removeItem(storageKey);
        localStorage.removeItem(`${storageKey}-metadata`);

        cards = [];
        renderAllCards();
        updateCounts();

        alert('데이터가 초기화되었습니다.');
    }
}

function renderAllCards() {
    // 모든 컨테이너 비우기
    document.getElementById('todo').innerHTML = '';
    document.getElementById('in-progress').innerHTML = '';
    document.getElementById('done').innerHTML = '';

    // 카드 렌더링
    cards.forEach(card => renderCard(card));
}

// ===== 샘플 데이터 생성 =====

function loadSampleCards() {
    const now = Date.now();
    const sampleCards = [
        {
            id: now,
            title: '프로젝트 기획서 작성',
            status: 'todo',
            userId: currentUserId,
            boardId: currentBoardId,
            createdAt: now,
            updatedAt: now
        },
        {
            id: now + 1,
            title: 'UI 디자인 검토',
            status: 'todo',
            userId: currentUserId,
            boardId: currentBoardId,
            createdAt: now + 1,
            updatedAt: now + 1
        },
        {
            id: now + 2,
            title: 'API 개발',
            status: 'in-progress',
            userId: currentUserId,
            boardId: currentBoardId,
            createdAt: now + 2,
            updatedAt: now + 2
        },
        {
            id: now + 3,
            title: '데이터베이스 설계',
            status: 'done',
            userId: currentUserId,
            boardId: currentBoardId,
            createdAt: now + 3,
            updatedAt: now + 3
        }
    ];

    cards = sampleCards;
    saveToStorage();  // 샘플 카드도 저장
    return sampleCards;
}

// ===== 데이터 내보내기/가져오기 =====

function exportData() {
    const exportData = {
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        userId: currentUserId,
        boardId: currentBoardId,
        totalCards: cards.length,
        cards: cards
    };

    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `kanban-backup-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);

    console.log('Data exported successfully');
    alert('데이터를 내보냈습니다.');
}

function importData(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);

            if (!data.cards || !validateCards(data.cards)) {
                throw new Error('Invalid file format');
            }

            const shouldOverwrite = confirm(
                `${data.totalCards}개의 카드를 가져옵니다.\n` +
                '기존 데이터가 모두 삭제됩니다. 계속하시겠습니까?'
            );

            if (!shouldOverwrite) {
                return;
            }

            // 가져온 카드에 현재 사용자 ID 할당
            cards = data.cards.map(card => ({
                ...card,
                userId: currentUserId,
                boardId: currentBoardId
            }));

            saveToStorage();
            renderAllCards();
            updateCounts();

            alert('데이터를 성공적으로 가져왔습니다.');
        } catch (error) {
            console.error('Import failed:', error);
            alert('파일을 읽는 중 오류가 발생했습니다.');
        }
    };

    reader.onerror = () => {
        alert('파일을 읽을 수 없습니다.');
    };

    reader.readAsText(file);
}

function updateUserDisplay() {
    const userDisplay = document.getElementById('userIdDisplay');
    if (userDisplay) {
        const shortId = currentUserId.split('-').pop().substring(0, 8);
        userDisplay.textContent = `사용자: ${shortId}...`;
        userDisplay.title = currentUserId;  // 전체 ID는 툴팁으로
    }
}

// ===== 초기화 =====

window.addEventListener('DOMContentLoaded', () => {
    console.log('Kanban Board Initializing...');

    // 1. 사용자 ID 초기화
    initializeUserId();
    updateUserDisplay();

    // 2. LocalStorage에서 데이터 불러오기
    const loaded = loadFromStorage();

    if (!loaded) {
        // 3. 데이터가 없으면 샘플 카드 로드
        loadSampleCards();
    }

    // 4. UI 렌더링
    renderAllCards();
    updateCounts();

    // 5. 버튼 이벤트 리스너
    document.getElementById('exportBtn')?.addEventListener('click', exportData);

    document.getElementById('importBtn')?.addEventListener('click', () => {
        document.getElementById('importFile').click();
    });

    document.getElementById('importFile')?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            importData(file);
            e.target.value = ''; // 파일 입력 초기화
        }
    });

    document.getElementById('clearBtn')?.addEventListener('click', clearStorage);

    console.log('Kanban Board Initialized!');
    console.log(`User ID: ${currentUserId}`);
    console.log(`Board ID: ${currentBoardId}`);
    console.log(`Total Cards: ${cards.length}`);
});
