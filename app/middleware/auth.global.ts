export default defineNuxtRouteMiddleware(async (to) => {
    const supabase = useSupabaseClient()
    const { data } = await supabase.auth.getSession()

    // Redirect to login if not authenticated and trying to access protected routes
    if (!data.session && to.path !== '/login' && to.path !== '/register') {
        return navigateTo('/login')
    }

    // Redirect to dashboard if already authenticated and trying to access auth pages
    if (data.session && (to.path === '/login' || to.path === '/register')) {
        return navigateTo('/dashboard')
    }
})