<template>
  <div>
    <!-- This content will be injected into default.vue -->
    <section class="flex flex-col items-center text-center px-6 py-20">
      <!-- Hero Text -->
      <h2 class="text-3xl md:text-4xl font-bold mb-6 font-playfair">
        Your brain has enough to remember
      </h2>
      <p class="max-w-2xl text-lg md:text-xl leading-relaxed mb-16 font-lora">
        Take control of your grocery trips. Our shopping list website helps you plan ahead,
        stay organized, and breeze through the store with a clear list, so you can spend less
        time shopping and more time living.
      </p>

      <!-- Buttons -->
      <div class="flex space-x-6">
        <NuxtLink
          to="/login"
          class="px-6 py-3 rounded-2xl bg-transparent border border-white text-white font-semibold hover:bg-white hover:text-black transition"
        >
          Login
        </NuxtLink>

        <NuxtLink
          to="/register"
          class="px-6 py-3 rounded-2xl bg-transparent border border-white text-white font-semibold hover:bg-white hover:text-black transition"
        >
          Register
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
// tell Nuxt to use the default layout
definePageMeta({
  layout: "default"
})
</script>
