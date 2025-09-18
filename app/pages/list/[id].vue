    <template>
    <div class="flex flex-col h-screen bg-gray-100">
        <header class="bg-white shadow px-4 py-3 flex items-center justify-between">
        <NuxtLink to="/" class="text-gray-500 hover:text-gray-700">← Back</NuxtLink>
        <h1 class="text-lg font-bold">Shopping List {{ listId }}</h1>
        </header>

        <main class="flex-1 p-4 overflow-y-auto">
        <p class="text-gray-500">This page will show list items fetched from API for list {{ listId }}</p>
        </main>
    </div>
    </template>

    <script setup>
    import { useRoute } from 'vue-router'

    const route = useRoute()
    const listId = route.params.id
    </script>
