// Authentication Module

let currentUser = null;
let isGuest = false;

// Check if user is already logged in
async function checkAuth() {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (session) {
        currentUser = session.user;
        console.log('User logged in:', currentUser.email);

        // Migrate anonymous data if exists
        await migrateAnonymousData();

        return true;
    }

    return false;
}

// Email/Password Sign Up
async function signUpWithEmail(email, password) {
    try {
        console.log('Attempting sign up with:', email);

        const { data, error } = await supabaseClient.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: window.location.origin + '/app.html'
            }
        });

        console.log('Sign up response:', { data, error });

        if (error) {
            console.error('Sign up error details:', error);
            throw error;
        }

        if (data.user) {
            // Check if email confirmation is required
            if (data.user.identities && data.user.identities.length === 0) {
                alert('✅ 회원가입 성공!\n\n해당 이메일은 이미 등록되어 있습니다.\n로그인 탭으로 이동해서 로그인해주세요.');
            } else {
                alert('✅ 회원가입 성공!\n\n이메일 인증이 필요없이 바로 로그인 가능합니다.\n로그인 탭으로 이동해주세요.');
            }
            return data.user;
        }
    } catch (error) {
        console.error('Sign up error:', error);

        let errorMessage = error.message;
        if (error.message.includes('User already registered')) {
            errorMessage = '이미 가입된 이메일입니다. 로그인을 시도해주세요.';
        } else if (error.message.includes('Password should be at least')) {
            errorMessage = '비밀번호는 최소 6자 이상이어야 합니다.';
        } else if (error.message.includes('Invalid email')) {
            errorMessage = '올바른 이메일 형식이 아닙니다.';
        }

        alert('❌ 회원가입 실패\n\n' + errorMessage);
        return null;
    }
}

// Email/Password Sign In
async function signInWithEmail(email, password) {
    try {
        console.log('Attempting sign in with:', email);

        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email: email,
            password: password
        });

        console.log('Sign in response:', { data, error });

        if (error) {
            console.error('Sign in error details:', error);
            throw error;
        }

        if (!data.user) {
            throw new Error('로그인 실패: 사용자 정보를 받지 못했습니다.');
        }

        currentUser = data.user;
        console.log('Sign in success:', currentUser.email);

        // Migrate anonymous data
        await migrateAnonymousData();

        return currentUser;
    } catch (error) {
        console.error('Sign in error:', error);

        // 한글 에러 메시지로 변환
        let errorMessage = error.message;
        if (error.message.includes('Invalid login credentials')) {
            errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
        } else if (error.message.includes('Email not confirmed')) {
            errorMessage = '이메일 인증이 필요합니다. 이메일을 확인해주세요.';
        } else if (error.message.includes('User not found')) {
            errorMessage = '존재하지 않는 계정입니다. 회원가입을 먼저 진행해주세요.';
        }

        alert('❌ 로그인 실패\n\n' + errorMessage);
        return null;
    }
}

// Google OAuth Sign In
async function signInWithGoogle() {
    try {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin + '/app.html'
            }
        });

        if (error) throw error;

        // OAuth will redirect, no further action needed
    } catch (error) {
        console.error('Google sign in error:', error);
        alert('Google 로그인 실패: ' + error.message);
    }
}

// GitHub OAuth Sign In
async function signInWithGithub() {
    try {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: window.location.origin + '/app.html'
            }
        });

        if (error) throw error;

        // OAuth will redirect, no further action needed
    } catch (error) {
        console.error('GitHub sign in error:', error);
        alert('GitHub 로그인 실패: ' + error.message);
    }
}

// Sign Out
async function signOut() {
    try {
        const { error } = await supabaseClient.auth.signOut();

        if (error) throw error;

        currentUser = null;
        console.log('Sign out success');

        // Redirect to login page
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Sign out error:', error);
        alert('로그아웃 실패: ' + error.message);
    }
}

// Migrate anonymous LocalStorage data to authenticated user
async function migrateAnonymousData() {
    if (!currentUser) return;

    const anonymousUserId = localStorage.getItem('kanban-current-user');

    if (!anonymousUserId || !anonymousUserId.startsWith('anonymous-')) {
        console.log('No anonymous data to migrate');
        return;
    }

    const storageKey = `kanban-${anonymousUserId}-default`;
    const localData = localStorage.getItem(storageKey);

    if (!localData) {
        console.log('No local cards to migrate');
        // Update current user ID
        localStorage.setItem('kanban-current-user', currentUser.id);
        return;
    }

    try {
        const localCards = JSON.parse(localData);

        if (localCards.length === 0) {
            console.log('No cards to migrate');
            localStorage.setItem('kanban-current-user', currentUser.id);
            return;
        }

        console.log(`Migrating ${localCards.length} cards from anonymous to authenticated...`);

        // Insert cards into Supabase
        const cardsToInsert = localCards.map(card => ({
            title: card.title,
            status: card.status,
            user_id: currentUser.id,
            board_id: 'default',
            created_at: new Date(card.createdAt).toISOString(),
            updated_at: new Date(card.updatedAt).toISOString()
        }));

        const { data, error } = await supabaseClient
            .from('cards')
            .insert(cardsToInsert);

        if (error) throw error;

        console.log('Migration successful!');

        // Clean up anonymous data
        localStorage.removeItem(storageKey);
        localStorage.removeItem(`${storageKey}-metadata`);
        localStorage.setItem('kanban-current-user', currentUser.id);

        alert(`${localCards.length}개의 카드를 계정으로 이전했습니다!`);
    } catch (error) {
        console.error('Migration failed:', error);
        alert('데이터 이전 실패: ' + error.message);
    }
}

// Auth state change listener
function setupAuthListener() {
    supabaseClient.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event);

        if (event === 'SIGNED_IN') {
            currentUser = session.user;
            console.log('User signed in:', currentUser.email);
        } else if (event === 'SIGNED_OUT') {
            currentUser = null;
            console.log('User signed out');
        }
    });
}
