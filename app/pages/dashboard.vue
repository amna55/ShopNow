    <script setup>
    definePageMeta({
    layout: "app", // Use layouts/app.vue instead of default.vue
    });

    import { ref, computed } from "vue";

    const newItem = ref("");
    const items = ref([]);

    // Categorization keywords
    const categories = {
    Groceries: ["milk", "bread", "eggs", "cheese", "apple", "banana", "rice"],
    Household: ["soap", "shampoo", "toothpaste", "detergent", "cleaner"],
    Electronics: ["phone", "charger", "battery", "headphones"],
    };

    const addItem = () => {
    if (!newItem.value.trim()) return;

    // Find category by keyword
    const lower = newItem.value.toLowerCase();
    let category = "Other";
    for (const [cat, keywords] of Object.entries(categories)) {
        if (keywords.some((k) => lower.includes(k))) {
        category = cat;
        break;
        }
    }

    items.value.push({
        id: Date.now(),
        name: newItem.value,
        completed: false,
        category,
    });

    newItem.value = "";
    };

    // Group items by category
    const categorizedItems = computed(() => {
    const groups = {};
    items.value.forEach((item) => {
        if (!groups[item.category]) groups[item.category] = [];
        groups[item.category].push(item);
    });
    return groups;
    });

    // Delete selected items
    const deleteSelected = () => {
    items.value = items.value.filter((item) => !item.completed);
    };

    // Clear all items
    const clearAll = () => {
    if (confirm("Are you sure you want to clear the entire list?")) {
        items.value = [];
    }
    };

    // Computed to check if something is selected
    const hasSelected = computed(() =>
    items.value.some((item) => item.completed)
    );
    </script>

    <template>
    <div class="max-w-3xl mx-auto py-10 px-6">
        <h1 class="text-3xl font-bold mb-6 text-center">My Shopping List</h1>

        <!-- Input Section -->
        <div class="flex items-center gap-2 mb-6">
        <input
            v-model="newItem"
            @keyup.enter="addItem"
            type="text"
            placeholder="Add an item (e.g. Milk, Bread, Shampoo)"
            class="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700"
        />
        <button
            @click="addItem"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
            Add
        </button>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-between items-center mb-6">
        <button
            @click="deleteSelected"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            :disabled="!hasSelected"
        >
            Delete Selected
        </button>

        <button
            @click="clearAll"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            :disabled="items.length === 0"
        >
            Clear All
        </button>
        </div>

        <!-- Categories -->
        <div v-for="(items, category) in categorizedItems" :key="category" class="mb-8">
        <h2 class="text-xl font-semibold mb-3">{{ category }}</h2>
        <div class="bg-white rounded-lg shadow p-4 space-y-2 text-gray-800">
            <div
            v-for="item in items"
            :key="item.id"
            class="flex items-center justify-between border-b last:border-b-0 py-2"
            >
            <label class="flex items-center gap-3">
                <input
                type="checkbox"
                v-model="item.completed"
                class="w-5 h-5 text-green-500 rounded focus:ring-green-400"
                />
                <span :class="{ 'line-through text-gray-500': item.completed }">
                {{ item.name }}
                </span>
            </label>
            </div>
        </div>
        </div>

        <!-- Empty State -->
        <div v-if="items.length === 0" class="text-center text-white mt-10">
        Your shopping list is empty. Add some items!
        </div>
    </div>
    </template>
