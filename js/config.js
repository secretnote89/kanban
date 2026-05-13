// Supabase Configuration
const SUPABASE_URL = 'https://uuoujtaguxoaircmzjxu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1b3VqdGFndXhvYWlyY216anh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MzgyNzUsImV4cCI6MjA5NDIxNDI3NX0.8sm5-JOkTOc5No6zy9mTEd3_-W3tWw95RTuybcRysPs';

// Initialize Supabase client (will be set after library loads)
let supabaseClient = null;

// Initialize when DOM is ready
function initSupabase() {
    if (typeof window.supabase === 'undefined') {
        console.error('Supabase library not loaded');
        return false;
    }

    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase client initialized');
    return true;
}
