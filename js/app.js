// Global State (Phase 3: Supabase 연동)
let currentUserId = null;
let currentBoardId = 'default';
let cards = [];
let draggedCard = null;
let currentColumn = null;

const modal = document.getElementById('cardModal');
const cardTitleInput = document.getElementById('cardTitle');
const addCardBtn = document.getElementById('addCardBtn');
const cancelBtn = document.getElementById('cancelBtn');
const addCardBtns = document.querySelectorAll('.add-card-btn');

// Modal event listeners
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

// ===== Supabase DB Functions =====

async function addCard() {
    const title = cardTitleInput.value.trim();

    if (title === '') {
        alert('카드 제목을 입력해주세요!');
        return;
    }

    if (title.length > 200) {
        alert('카드 제목은 200자 이내로 입력해주세요!');
        return;
    }

    try {
        const { data, error } = await supabase
            .from('cards')
            .insert([{
                title: title,
                status: currentColumn,
                user_id: currentUserId,
                board_id: currentBoardId
            }])
            .select()
            .single();

        if (error) throw error;

        const card = {
            id: data.id,
            title: data.title,
            status: data.status,
            userId: data.user_id,
            boardId: data.board_id,
            createdAt: new Date(data.created_at).getTime(),
            updatedAt: new Date(data.updated_at).getTime()
        };

        cards.push(card);
        renderCard(card);
        updateCounts();

        modal.classList.remove('active');
        cardTitleInput.value = '';
    } catch (error) {
        console.error('Failed to add card:', error);
        alert('카드 추가 실패: ' + error.message);
    }
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
    titleSpan.textContent = card.title;

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

async function deleteCard(id) {
    if (!confirm('이 카드를 삭제하시겠습니까?')) {
        return;
    }

    try {
        const { error } = await supabase
            .from('cards')
            .delete()
            .eq('id', id);

        if (error) throw error;

        cards = cards.filter(card => card.id !== id);
        const cardElement = document.querySelector(`[data-id="${id}"]`);
        if (cardElement) {
            cardElement.remove();
        }
        updateCounts();
    } catch (error) {
        console.error('Failed to delete card:', error);
        alert('카드 삭제 실패: ' + error.message);
    }
}

// ===== Drag and Drop =====

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

async function handleDrop(e) {
    e.preventDefault();

    const container = e.target.closest('.cards-container');
    if (!container) return;

    container.classList.remove('drag-over');

    const newStatus = container.id;
    const cardId = parseInt(draggedCard.dataset.id);

    const card = cards.find(c => c.id === cardId);
    if (!card) return;

    try {
        const { error } = await supabase
            .from('cards')
            .update({ status: newStatus, updated_at: new Date().toISOString() })
            .eq('id', cardId);

        if (error) throw error;

        card.status = newStatus;
        card.updatedAt = Date.now();

        container.appendChild(draggedCard);
        updateCounts();
    } catch (error) {
        console.error('Failed to update card:', error);
        alert('카드 이동 실패: ' + error.message);
    }
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

// ===== Load Cards from Supabase =====

async function loadCards() {
    try {
        const { data, error } = await supabase
            .from('cards')
            .select('*')
            .eq('user_id', currentUserId)
            .eq('board_id', currentBoardId)
            .order('created_at', { ascending: true });

        if (error) throw error;

        cards = data.map(card => ({
            id: card.id,
            title: card.title,
            status: card.status,
            userId: card.user_id,
            boardId: card.board_id,
            createdAt: new Date(card.created_at).getTime(),
            updatedAt: new Date(card.updated_at).getTime()
        }));

        renderAllCards();
        updateCounts();

        console.log(`Loaded ${cards.length} cards from Supabase`);
    } catch (error) {
        console.error('Failed to load cards:', error);
        alert('카드 불러오기 실패: ' + error.message);
    }
}

function renderAllCards() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('in-progress').innerHTML = '';
    document.getElementById('done').innerHTML = '';

    cards.forEach(card => renderCard(card));
}

// ===== User Display =====

function updateUserDisplay() {
    const userDisplay = document.getElementById('userIdDisplay');
    const logoutBtn = document.getElementById('logoutBtn');

    if (userDisplay && currentUser) {
        userDisplay.textContent = currentUser.email || '익명 사용자';
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', signOut);
    }
}

// ===== Initialization =====

window.addEventListener('DOMContentLoaded', async () => {
    console.log('Kanban App Initializing...');

    // 1. Initialize Supabase
    if (!initSupabase()) {
        alert('Supabase 초기화 실패');
        return;
    }

    // 2. Check authentication
    const isAuthenticated = await checkAuth();

    if (!isAuthenticated) {
        // Redirect to login page
        window.location.href = 'index.html';
        return;
    }

    currentUserId = currentUser.id;

    // 3. Setup auth listener
    setupAuthListener();

    // 4. Load cards from Supabase
    await loadCards();

    // 5. Update UI
    updateUserDisplay();

    console.log('Kanban App Initialized!');
    console.log(`User ID: ${currentUserId}`);
    console.log(`User Email: ${currentUser.email}`);
    console.log(`Total Cards: ${cards.length}`);
});
