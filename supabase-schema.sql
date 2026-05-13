-- Kanban Board - Supabase Database Schema
-- Execute this in Supabase SQL Editor

-- 1. Cards table
CREATE TABLE IF NOT EXISTS public.cards (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('todo', 'in-progress', 'done')),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    board_id VARCHAR(50) NOT NULL DEFAULT 'default',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

-- 3. RLS Policies

-- Users can only see their own cards
CREATE POLICY "Users can view own cards"
ON public.cards
FOR SELECT
USING (auth.uid() = user_id);

-- Users can only insert their own cards
CREATE POLICY "Users can insert own cards"
ON public.cards
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can only update their own cards
CREATE POLICY "Users can update own cards"
ON public.cards
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own cards
CREATE POLICY "Users can delete own cards"
ON public.cards
FOR DELETE
USING (auth.uid() = user_id);

-- 4. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_cards_user_board ON public.cards(user_id, board_id);
CREATE INDEX IF NOT EXISTS idx_cards_status ON public.cards(status);
CREATE INDEX IF NOT EXISTS idx_cards_created_at ON public.cards(created_at DESC);

-- 5. Updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. Apply trigger to cards table
DROP TRIGGER IF EXISTS set_updated_at ON public.cards;
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.cards
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- 7. Grant permissions (if needed)
GRANT ALL ON public.cards TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.cards_id_seq TO authenticated;

-- Verification queries
SELECT 'Schema created successfully!' AS status;
SELECT * FROM public.cards LIMIT 0;  -- Check table structure
