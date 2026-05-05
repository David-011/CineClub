import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wscznekjxqhqfxssiawu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzY3puZWtqeHFocWZ4c3NpYXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MDc0MTMsImV4cCI6MjA5Mjk4MzQxM30.V4H2Rnr4Ovim2271wDbdsAwM6usr2WWTH7cY7t2X6GQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)