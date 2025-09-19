<template>
    <div class="flex items-center justify-center min-h-screen p-4 text-black">
        <div class="mb-8 bg-white/70 backdrop-blur rounded-xl shadow-lg p-4 border border-gray-100">
        <h1 class="text-xl font-bold mb-4 text-white">Enter your details</h1>

        <!-- Form -->
        <form @submit.prevent="login" class="space-y-4">
            <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="w-full border rounded px-3 py-2"
            required
            />
            <div class="relative">
                <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="Password"
                class="w-full border rounded px-3 py-2 pr-10"
                required
                />
                <button 
                    type="button" 
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
                >
                    {{ showPassword ? "Hide" : "Show" }}
                </button>
            </div>
            
            <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
            <p v-if="successMessage" class="text-green-500 text-sm">{{ successMessage }}</p>

            <button type="submit" class="w-full bg-red-400 text-white px-3 py-2 rounded hover:bg-red-800">
            Login
            </button>
        </form>

        <!-- Divider -->
        <div class="flex items-center my-4">
            <hr class="flex-grow border-gray-400" />
            <span class="px-2 text-sm text-gray-300">or</span>
            <hr class="flex-grow border-gray-400" />
        </div>

        <!-- Social buttons -->
        <div class="space-y-2">
            <button
            @click="loginWithGoogle"
            class="w-full flex items-center justify-center gap-2 bg-white text-gray-700 px-3 py-2 rounded shadow hover:bg-gray-200"
            >
            <img src="/google.svg" alt="Google" class="h-5 w-5" />
            Continue with Google
            </button>
        </div>

        <!-- Register link -->
        <p class="text-sm mt-3 text-white">
            Don't have an account?
            <NuxtLink to="/register" class="text-white hover:underline font-semibold">Register</NuxtLink>
        </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const showPassword = ref(false)
const errorMessage = ref("")
const successMessage = ref("")

const router = useRouter()
const supabase = useSupabaseClient()

// Email/password login
const login = async () => {
    errorMessage.value = ""
    successMessage.value = ""

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })

        if (error) throw error

        successMessage.value = "Login successful!"
        
        // Redirect to dashboard after successful login
        setTimeout(() => {
            router.push("/dashboard")
        }, 1000)
        
    } catch (err: any) {
        errorMessage.value = err.message || "Invalid email or password"
    }
}

// Google OAuth
// In your login function, use this redirect URL:
    const loginWithGoogle = async () => {
    try {
        const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: window.location.origin // This might work for basic testing
        }
        })
        if (error) throw error
    } catch (err: any) {
        console.error('Google login error:', err)
    }
    }


</script>

<style scoped>
input {
    outline: none;
    transition: border-color 0.2s;
}

input:focus {
    border-color: #34d399;
    box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.2);
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>