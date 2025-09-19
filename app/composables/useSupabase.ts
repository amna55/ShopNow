import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let supabase: SupabaseClient | null = null

export const useSupabase = (): SupabaseClient => {
  if (supabase) return supabase

  if (import.meta.client) { // <-- updated
    const config = useRuntimeConfig()
    supabase = createClient(
      config.public.SUPABASE_URL as string,
      config.public.SUPABASE_KEY as string
    )
    return supabase
  }

  throw new Error("Supabase client is only available on client-side")
}
