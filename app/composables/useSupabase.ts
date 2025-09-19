// composables/useSupabase.ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabase: SupabaseClient | null = null

export const useSupabase = (): SupabaseClient => {
    if (supabase) return supabase

    if (import.meta.client) {
        const config = useRuntimeConfig()
        if (!config.public.SUPABASE_URL || !config.public.SUPABASE_KEY)
            throw new Error('Supabase URL or Key is missing')

        supabase = createClient(
            config.public.SUPABASE_URL as string,
            config.public.SUPABASE_KEY as string
        )
        return supabase
    }

    throw new Error('Supabase client is only available on client-side')
}
