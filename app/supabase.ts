import { createClient } from '@supabase/supabase-js';

// ⚠️ INCOLLA QUI LE CHIAVI DEL NUOVO PROGETTO (Forte-App-2)
const supabaseUrl = 'https://pkbmmpczbsxkufbzcmvk.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrYm1tcGN6YnN4a3VmYnpjbXZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NDc2MzksImV4cCI6MjA4NDMyMzYzOX0.PDrU4dbVaQF4x0QeIajRqie6T4wBXF_gfg1a-zHou8Y';

export const supabase = createClient(supabaseUrl, supabaseKey);
