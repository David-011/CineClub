import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wdnetoobuzrecxdxyzsk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbmV0b29idXpyZWN4ZHh5enNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMzI4NTEsImV4cCI6MjA5MjkwODg1MX0.ACn7Xpd9D6GTwHJTHt-cc7l1wtkeAsiWiUtptzaPxSk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)