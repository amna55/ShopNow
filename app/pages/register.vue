<template>
  <div class="flex items-center justify-center min-h-screen p-4 bg-gray-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
      
      <!-- Email Signup Form -->
      <div class="flex-1 p-8">
        <h1 class="text-2xl font-bold mb-6 text-gray-800 text-center md:text-left">
          Create an Account
        </h1>

        <form @submit.prevent="register" class="space-y-4">
          <input v-model="firstName" type="text" placeholder="First Name" required class="input"/>
          <input v-model="surname" type="text" placeholder="Surname" required class="input"/>
          <input v-model="email" type="email" placeholder="Email" required class="input"/>
          <select v-model="country" required class="input">
            <option value="">Select Country</option>
            <option>Germany</option>
            <option>USA</option>
            <option>UK</option>
            <option>France</option>
            <option>India</option>
          </select>
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Password" required class="input"/>
          <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" placeholder="Confirm Password" required class="input"/>
          <button type="submit" class="btn">Register</button>
        </form>

        <p class="mt-4 text-center md:text-left">
          Already have an account?
          <NuxtLink to="/login" class="text-red-400 hover:underline">Login</NuxtLink>
        </p>
      </div>

      <!-- Google OAuth -->
      <div class="flex-1 bg-gray-100 p-8 flex flex-col justify-center items-center">
        <h2 class="text-xl font-bold mb-6 text-gray-800 text-center">Or Sign Up With</h2>
        <button @click="registerWithGoogle" class="btn-google">
          <img src="/google.svg" alt="Google" class="h-5 w-5"/>
          Google
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import type { SupabaseClient } from "@supabase/supabase-js"

const firstName = ref("")
const surname = ref("")
const email = ref("")
const country = ref("")
const password = ref("")
const confirmPassword = ref("")
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const router = useRouter()

let supabase: SupabaseClient

onMounted(() => {
  // Initialize Supabase only on client
  supabase = useSupabase()
})

// Email/password signup
const register = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!")
    return
  }

  try {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: { firstName: firstName.value, surname: surname.value, country: country.value }
      }
    })

    if (error) throw error

    alert("Account created! Check your email to confirm.")
    router.push("/login")
  } catch (err: any) {
    alert(`Error: ${err.message}`)
  }
}

// Google OAuth
const registerWithGoogle = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://shop-now-xi.vercel.app/dashboard" // replace with your Vercel URL
      }
    })
    if (error) throw error
  } catch (err: any) {
    alert(`Google OAuth Error: ${err.message}`)
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.375rem;
  outline: none;
  transition: border 0.2s;
}
.input:focus {
  border-color: #34d399;
}

.btn {
  width: 100%;
  background-color: #f87171;
  color: white;
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
}
.btn:hover {
  background-color: #ef4444;
}

.btn-google {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  cursor: pointer;
}
.btn-google:hover {
  background-color: #f3f4f6;
}
</style>
