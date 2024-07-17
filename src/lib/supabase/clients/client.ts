import { createBrowserClient as createClient } from "@supabase/ssr";
import { Database } from "../schema/supabase.schema";

export const createBrowserClient = () =>
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
