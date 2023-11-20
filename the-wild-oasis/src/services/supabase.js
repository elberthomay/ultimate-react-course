import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://zbpyhviitpcpfgfbezvg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicHlodmlpdHBjcGZnZmJlenZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk2MjMyNTQsImV4cCI6MjAxNTE5OTI1NH0.cnY1wA--xd61x_TEFeeuCYNyu2f0e_c75sFH9FD1QoU";
console.log(supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
