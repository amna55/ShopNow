<template>
    <div class="min-h-screen flex items-center justify-center p-4 text-black">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-3xl flex flex-col md:flex-row overflow-hidden">

        <!-- Email Signup Form -->
        <div class="flex-1 p-6 md:p-8">
            <h1 class="text-2xl font-bold mb-6 text-gray-800 text-center md:text-left">
            Create an Account
            </h1>

            <form @submit.prevent="register" class="space-y-4">
            <input v-model="firstName" type="text" placeholder="First Name" required class="input"/>
            <input v-model="surname" type="text" placeholder="Surname" required class="input"/>
            <input v-model="email" type="email" placeholder="Email" required class="input"/>
            <select v-model="country" required class="input text-gray-700">
                <option value="">Select Country</option>
                <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
            </select>
            <div class="relative">
                <input 
                    :type="showPassword ? 'text' : 'password'" 
                    v-model="password" 
                    placeholder="Password" 
                    required 
                    class="input pr-10 w-full"
                />
                <button 
                    type="button" 
                    @click="showPassword = !showPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm focus:outline-none"
                >
                    {{ showPassword ? "Hide" : "Show" }}
                </button>
            </div>
            <div class="relative">
                <input 
                    :type="showConfirmPassword ? 'text' : 'password'" 
                    v-model="confirmPassword" 
                    placeholder="Confirm Password" 
                    required 
                    class="input pr-10 w-full"
                />
                <button 
                    type="button" 
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm focus:outline-none"
                >
                    {{ showConfirmPassword ? "Hide" : "Show" }}
                </button>
            </div>

            <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
            <p v-if="successMessage" class="text-green-500 text-sm">{{ successMessage }}</p>

            <button type="submit" class="btn w-full">Register</button>
            </form>

            <p class="mt-4 text-center md:text-left text-gray-700">
            Already have an account?
            <NuxtLink to="/login" class="text-red-400 font-semibold hover:underline ml-1">Login here</NuxtLink>
            </p>
        </div>

        <!-- Google OAuth -->
        <div class="bg-gray-100 p-6 flex flex-col justify-center items-center md:w-48">
            <h2 class="text-black font-bold mb-4 text-center">Or Sign Up With</h2>
            <button @click="registerWithGoogle" class="btn-google">
            <img src="/google.svg" alt="Google" class="h-5 w-5"/>
            Google
            </button>
            <p v-if="googleError" class="text-red-500 text-sm mt-2">{{ googleError }}</p>
        </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

const firstName = ref("")
const surname = ref("")
const email = ref("")
const country = ref("")
const password = ref("")
const confirmPassword = ref("")
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const errorMessage = ref("")
const successMessage = ref("")
const googleError = ref("")

const router = useRouter()

// Use the official Supabase client from the module
const supabase = useSupabaseClient()

// List of all countries
const countries = [
    "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria",
    "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia",
    "Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia",
    "Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo (Congo-Brazzaville)",
    "Costa Rica","Croatia","Cuba","Cyprus","Czechia","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt",
    "El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia",
    "Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras",
    "Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan",
    "Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania",
    "Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico",
    "Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands",
    "New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine",
    "Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis",
    "Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles",
    "Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka",
    "Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago",
    "Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
    "Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"
]

// Email/password signup
const register = async () => {
    errorMessage.value = ""
    successMessage.value = ""

    if (password.value !== confirmPassword.value) {
        errorMessage.value = "Passwords do not match!"
        return
    }

    try {
        const { error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
            options: {
                data: { 
                    firstName: firstName.value, 
                    surname: surname.value, 
                    country: country.value 
                }
            }
        })

        if (error) throw error

        successMessage.value = "Account created! Check your email to confirm."
        // Wait a moment before redirecting to show the success message
        setTimeout(() => {
            router.push("/login")
        }, 2000)
    } catch (err: any) {
        errorMessage.value = err.message || "An error occurred during registration"
    }
}

// Google OAuth
const registerWithGoogle = async () => {
    googleError.value = ""
    try {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin + "/dashboard"
            }
        })
        if (error) throw error
    } catch (err: any) {
        googleError.value = err.message || "An error occurred with Google sign-in"
    }
}
</script>

<style scoped>
.input {
    width: 100%;
    border: 1px solid #ccc;
    padding: 0.75rem;
    border-radius: 0.375rem;
    outline: none;
    transition: border 0.2s;
    font-size: 1rem;
    box-sizing: border-box;
}
.input:focus {
    border-color: #34d399;
    box-shadow: 0 0 0 2px rgba(52, 211, 153, 0.2);
}

.btn {
    width: 100%;
    background-color: #f87171;
    color: white;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    border: none;
    font-size: 1rem;
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
    padding: 0.75rem;
    border-radius: 0.5rem;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    cursor: pointer;
    transition: background-color 0.2s;
    border: 1px solid #e5e7eb;
    color: #374151;
    font-weight: 500;
}
.btn-google:hover {
    background-color: #f9fafb;
}
</style>