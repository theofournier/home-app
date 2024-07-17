import { createServerClient as createClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { Database } from "../supabase.schema";

export const createServerClient = () => {
  const cookieStore = cookies();

  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch (e) {}
        },
      },
    },
  );
};
