import { createClient } from '@supabase/supabase-js';

const apiKey=process.env.REACT_APP_API_KEY;

const supabaseUrl = 'https://fjncrerhxdydpmglafok.supabase.co';

const supabaseKey = apiKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;