import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://veufhqjsubxhymlpzpsa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZldWZocWpzdWJ4aHltbHB6cHNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5NzkyMDMsImV4cCI6MjA4ODU1NTIwM30.Yx-Vx-fYztx61d4SyTJ2vHZhhud4RiIN7sC9npZJXsA';

export const supabase = createClient(supabaseUrl, supabaseKey);
