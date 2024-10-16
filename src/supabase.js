
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://fjncrerhxdydpmglafok.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqbmNyZXJoeGR5ZHBtZ2xhZm9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwMTQ0OTgsImV4cCI6MjA0MjU5MDQ5OH0.hRsfBHa8JfzDtie415MtYSKzUBs0EtFx1geCK7CNIJ0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;