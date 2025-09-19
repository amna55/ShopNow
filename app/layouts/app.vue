<template>
  <div
    class="min-h-screen flex flex-col bg-cover bg-center text-white"
    style="background-image: url('/shop1.png');"
  >
    <!-- Header -->
    <header class="flex justify-between items-center px-8 py-4">
      <!-- Logo -->
      <NuxtLink
        to="/"
        class="text-2xl cursor-pointer font-bold font-lora flex flex-col"
      >
        <span class="block leading-none">Shop</span>
        <span class="block -mt-2 ml-[2.2ch]">Now</span>
      </NuxtLink>

      <!-- Profile Dropdown -->
      <div class="relative">
        <button
          @click="toggleDropdown"
          class="flex items-center gap-2 p-2 rounded-full hover:bg-gray-600/50 transition"
        >
          <!-- Profile Icon -->
          <img
            src="/profile.svg"
            alt="Profile"
            class="w-8 h-8 rounded-full object-cover"
          />
          <!-- Dropdown arrow -->
          <svg
            class="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <!-- Dropdown menu -->
        <div
          v-if="dropdownOpen"
          class="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded-lg shadow-lg z-10"
        >
          <ul class="py-2">
            <li>
              <NuxtLink
                to="/profile"
                class="block px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </NuxtLink>
            </li>
            <li>
              <button
                @click="logout"
                class="w-full text-left block px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <main class="font-lora flex-1 px-8 py-6">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-[#490e24] bg-opacity-70 text-white py-6 px-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm">&copy; 2025 ShopNow. All rights reserved.</p>
        <div class="space-x-4 mt-2 md:mt-0">
          <NuxtLink to="" class="hover:underline text-sm">About</NuxtLink>
          <NuxtLink to="" class="hover:underline text-sm">Contact</NuxtLink>
          <NuxtLink to="" class="hover:underline text-sm">Privacy Policy</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const router = useRouter()
const dropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    // Redirect to login
    await router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
};
</script>