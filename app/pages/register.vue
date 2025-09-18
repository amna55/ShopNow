    <template>
    <div class="flex items-center justify-center h-screen p-4">
        <div
        class="bg-white rounded-lg shadow-lg w-full max-w-4xl flex flex-col md:flex-row overflow-hidden"
        >
        <!-- Signup Details Container -->
        <div class="flex-1 p-8">
            <h1 class="text-2xl font-bold mb-6 text-gray-800 text-center md:text-left">
            Create an Account
            </h1>

            <form @submit.prevent="register" class="space-y-4">
            <!-- First Name -->
            <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">First Name</label>
                <input
                v-model="firstName"
                type="text"
                placeholder="John"
                class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
                />
            </div>

            <!-- Surname -->
            <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">Surname</label>
                <input
                v-model="surname"
                type="text"
                placeholder="Doe"
                class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
                />
            </div>

            <!-- Email -->
            <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">Email Address</label>
                <input
                v-model="email"
                type="email"
                placeholder="example@email.com"
                class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
                required
                />
            </div>

            <!-- Country -->
            <div>
                <label class="block text-sm font-medium mb-1 text-gray-700">Country</label>
                <select
                v-model="country"
                class="w-full border rounded px-3 py-2 focus:ring-2 text-gray-700 focus:ring-green-400 focus:outline-none"
                required
                >
                <option value="">Select Country</option>
                <option value="Germany">Germany</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="France">France</option>
                <option value="India">India</option>
                </select>
            </div>

            <!-- Password -->
            <div class="relative">
                <label class="block text-sm font-medium mb-1 text-gray-700">Password</label>
                <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                placeholder="********"
                class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none pr-10"
                required
                />
                <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                <span v-if="showPassword"></span>
                <span v-else></span>
                </button>
            </div>

            <!-- Confirm Password -->
            <div class="relative">
                <label class="block text-sm font-medium mb-1 text-gray-700">Confirm Password</label>
                <input
                :type="showConfirmPassword ? 'text' : 'password'"
                v-model="confirmPassword"
                placeholder="********"
                class="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none pr-10"
                required
                />
                <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                <span v-if="showConfirmPassword"></span>
                <span v-else></span>
                </button>
            </div>

            <button
                type="submit"
                class="w-full bg-red-400 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition"
            >
                Register
            </button>
            </form>

            <p class="text-sm mt-4 text-gray-600 text-center md:text-left">
            Already have an account?
            <NuxtLink to="/login" class="text-red-400 hover:underline">Login</NuxtLink>
            </p>
        </div>

        <!-- Social Signup Container -->
        <div class="flex-1 bg-gray-100 p-8 flex flex-col justify-center items-center">
            <h2 class="text-xl font-bold mb-6 text-gray-800 text-center">Or Sign Up With</h2>

            <button
            @click="registerWithGoogle"
            class="w-full flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-100 mb-4"
            >
            <img src="/google.svg" alt="Google" class="h-5 w-5" />
            Google
            </button>

            <button
            @click="registerWithFacebook"
            class="w-full flex items-center justify-center gap-2 bg-white text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-100"
            >
            <img src="/facebook.svg" alt="Facebook" class="h-5 w-5" />
            Facebook
            </button>
        </div>
        </div>
    </div>
    </template>

    <script setup>
    import { ref } from "vue";

    const firstName = ref("");
    const surname = ref("");
    const email = ref("");
    const country = ref("");
    const password = ref("");
    const confirmPassword = ref("");

    const showPassword = ref(false);
    const showConfirmPassword = ref(false);

    const register = () => {
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        return;
    }
    alert(
        `Registering ${firstName.value} ${surname.value}, Email: ${email.value}, Country: ${country.value}`
    );
    };

    const registerWithGoogle = () => {
    alert("Google registration clicked!");
    };

    const registerWithFacebook = () => {
    alert("Facebook registration clicked!");
    };
    </script>
