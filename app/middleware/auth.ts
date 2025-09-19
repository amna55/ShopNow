    export default defineNuxtRouteMiddleware(async (to) => {
    const supabase = useSupabaseClient()
    const { data } = await supabase.auth.getSession()
    
    if (!data.session) {
        return navigateTo('/login')  // Redirect to login if NOT logged in
    }
    })