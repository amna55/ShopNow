    <template>
    <div class="flex items-center justify-center h-screen">
        <div class="bg-[#faa675] p-6 rounded-lg shadow-md w-full max-w-sm">
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
            <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full border rounded px-3 py-2"
            required
            />
            <button class="w-full bg-red-400 text-white px-3 py-2 rounded  hover:bg-red-800">
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

            <button
            @click="loginWithFacebook"
            class="w-full flex items-center justify-center gap-2 bg-[#ffffff] text-gray-700 px-3 py-2 rounded shadow hover:bg-gray-200"
            >
            <img src="/facebook.svg" alt="Facebook" class="h-5 w-5" />
            Continue with Facebook
            </button>

        </div>

        <!-- Register link -->
        <p class="text-sm mt-3 text-white-200">
            Don't have an account?
            <NuxtLink to="/register" class="text-brown-400 hover:underline">Register</NuxtLink>
        </p>
        </div>
    </div>
    </template>

    <script setup>
    import { ref } from "vue";

    const email = ref("");
    const password = ref("");

    // Default login
    const login = () => {
    alert(`Logging in with email: ${email.value}`);
    };

    // Social logins (later: connect to backend/Firebase/Auth0/etc.)
    const loginWithGoogle = () => {
    alert("Google login clicked!");
    };

    const loginWithFacebook = () => {
    alert("Facebook login clicked!");
    };

    const loginWithEmail = () => {
    alert("Email login clicked!");
    };
    </script>
