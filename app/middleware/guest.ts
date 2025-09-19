export default defineNuxtRouteMiddleware(async (to) => {
    const supabase = useSupabaseClient()
    const { data } = await supabase.auth.getSession()

    if (data.session) {
        return navigateTo('/dashboard')  // Redirect to dashboard if ALREADY logged in
    }
})