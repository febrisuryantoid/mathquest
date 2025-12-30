
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const supabaseUrl = 'https://khncsblrkszxmkuqkyyy.supabase.co';
const supabaseKey = 'sb_publishable_4IDTr0TTtN_McYg8Uf-LIw_5Rj7sxQ9';

export const supabase = createClient(supabaseUrl, supabaseKey);
