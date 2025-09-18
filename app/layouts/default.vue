<template>
  <div
    class="min-h-screen flex flex-col bg-cover bg-center text-white"
    style="background-image: url('/shop.png');"
  >
    <!-- Navbar -->
    <header class="flex justify-between items-center px-8 py-4">
      <NuxtLink
        to="/"
        class="text-2xl cursor-pointer font-bold font-lora flex flex-col"
      >
        <span class="block leading-none">Shop</span>
        <span class="block -mt-2 ml-[2.2ch]">Now</span>
      </NuxtLink>

      <nav class="space-x-6 font-inter">
        <NuxtLink to="/login" class="hover:underline">Login</NuxtLink>
        <NuxtLink to="/register" class="hover:underline">Register</NuxtLink>
      </nav>
    </header>

    <!-- Page Content -->
    <main class="font-lora flex-1 px-8 py-6">
      <NuxtPage />
    </main>

    <!-- Footer (part of page flow) -->
    <footer class="bg-[#490e24] bg-opacity-70 text-white py-6 px-8">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <p class="text-sm">&copy; 2025 ShopNow. All rights reserved.</p>
        <div class="space-x-4 mt-2 md:mt-0">
          <NuxtLink to="/about" class="hover:underline text-sm">About</NuxtLink>
          <NuxtLink to="/contact" class="hover:underline text-sm">Contact</NuxtLink>
          <NuxtLink to="/privacy" class="hover:underline text-sm">Privacy Policy</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>
