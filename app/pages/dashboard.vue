    <script setup lang="ts">
    definePageMeta({
    layout: "app",
    middleware: "auth"
    });

    import { ref, onMounted, computed } from "vue";

    // Define interfaces
    interface ShoppingItem {
    id: string;
    name: string;
    completed: boolean;
    created_at?: string;
    }

    interface UserItemHistory {
    name: string;
    count: number;
    }

    interface SupabaseShoppingItem {
    id: string;
    user_id: string;
    name: string;
    completed: boolean;
    count: number;
    created_at: string;
    updated_at: string;
    }

    const supabase = useSupabaseClient();
    const user = ref<any>(null);
    const newItem = ref("");
    const items = ref<ShoppingItem[]>([]);
    const userItemsHistory = ref<UserItemHistory[]>([]);

    // Get current user
    const getUser = async () => {
    const {
        data: { user: userData }
    } = await supabase.auth.getUser();
    user.value = userData;
    };

    // Load user's items
    const loadUserItems = async () => {
    if (!user.value) return;
    const { data, error } = await supabase
        .from("shopping_items")
        .select("*")
        .eq("user_id", user.value.id)
        .order("created_at", { ascending: false });

    if (!error && data) {
        const typedData = data as unknown as SupabaseShoppingItem[];
        items.value = typedData.map((item) => ({
        id: item.id,
        name: item.name,
        completed: item.completed,
        created_at: item.created_at
        }));
    }
    };

    // Load item history
    const loadUserItemHistory = async () => {
    if (!user.value) return;
    const { data, error } = await supabase
        .from("shopping_items")
        .select("name, count")
        .eq("user_id", user.value.id)
        .order("count", { ascending: false })
        .limit(20);

    if (!error && data) {
        userItemsHistory.value = data as unknown as UserItemHistory[];
    }
    };

    // Add new item
    const addItem = async () => {
    if (!newItem.value.trim() || !user.value) return;
    try {
        const itemData = {
        user_id: user.value.id,
        name: newItem.value.trim(),
        completed: false
        };

        const { data, error } = await supabase
        .from("shopping_items")
        .insert([itemData] as never)
        .select();

        if (error) throw error;

        if (data && data[0]) {
        const newItemData = data[0] as unknown as SupabaseShoppingItem;
        items.value.unshift({
            id: newItemData.id,
            name: newItemData.name,
            completed: newItemData.completed
        });
        }

        newItem.value = "";
        await loadUserItemHistory();
    } catch (error) {
        console.error("Error adding item:", error);
    }
    };

    // Update completion
    const updateItemCompletion = async (item: ShoppingItem) => {
    try {
        const updateData = { completed: item.completed };
        const { error } = await supabase
        .from("shopping_items")
        .update(updateData as never)
        .eq("id", item.id);

        if (error) throw error;
    } catch (error) {
        console.error("Error updating item:", error);
        item.completed = !item.completed;
    }
    };

    // Delete selected
    const deleteSelected = async () => {
    const selectedItems = items.value.filter((item) => item.completed);
    if (selectedItems.length === 0) return;

    try {
        const itemIds = selectedItems.map((item) => item.id);
        const { error } = await supabase
        .from("shopping_items")
        .delete()
        .in("id", itemIds);

        if (error) throw error;

        items.value = items.value.filter((item) => !item.completed);
    } catch (error) {
        console.error("Error deleting items:", error);
    }
    };

    // Clear all
    const clearAll = async () => {
    if (items.value.length === 0) return;
    try {
        const { error } = await supabase
        .from("shopping_items")
        .delete()
        .eq("user_id", user.value.id);

        if (error) throw error;
        items.value = [];
    } catch (error) {
        console.error("Error clearing items:", error);
    }
    };

    // Computed
    const hasSelected = computed(() =>
    items.value.some((item) => item.completed)
    );

    const suggestions = computed(() => {
    return userItemsHistory.value
        .filter((item) =>
        item.name.toLowerCase().includes(newItem.value.toLowerCase())
        )
        .slice(0, 5);
    });

    // Init
    onMounted(async () => {
    await getUser();
    await loadUserItems();
    await loadUserItemHistory();
    });
    </script>

    <template>
    <div class="max-w-3xl mx-auto py-12 px-6">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
        <h1 class="text-4xl font-bold text-white tracking-tight">
            My Shopping List
        </h1>
        </div>

        <!-- Input Section -->
        <div
        class="mb-8 bg-white/70 backdrop-blur rounded-xl shadow-lg p-4 border border-gray-100"
        >
        <div class="flex items-center gap-2 mb-3">
            <input
            v-model="newItem"
            @keyup.enter="addItem"
            type="text"
            placeholder="Add an item (e.g. Milk, Bread, Shampoo)"
            class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none text-gray-700 shadow-sm"
            />
            <button
            @click="addItem"
            class="bg-green-800 text-white px-5 py-2.5 rounded-lg shadow hover:bg-green-600 hover:shadow-md transition flex items-center gap-1"
            >
            <span></span> Add
            </button>
        </div>

        <!-- Suggestions -->
        <div
            v-if="newItem && suggestions.length > 0"
            class="bg-white border border-gray-200 rounded-lg shadow-md mt-1 overflow-hidden"
        >
            <div
            v-for="suggestion in suggestions"
            :key="suggestion.name"
            @click="newItem = suggestion.name; addItem()"
            class="px-4 py-2 hover:bg-green-50 cursor-pointer text-gray-700 border-b border-gray-100 last:border-b-0"
            >
            {{ suggestion.name }}
            </div>
        </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-between items-center mb-8">
        <button
            @click="deleteSelected"
            class="bg-red-500 text-white px-5 py-2.5 rounded-lg shadow hover:bg-red-600 transition flex items-center gap-1"
            :disabled="!hasSelected"
            :aria-disabled="!hasSelected"
        >
            Delete Selected
        </button>

        <button
            @click="clearAll"
            class="bg-gray-700 text-white px-5 py-2.5 rounded-lg shadow hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            :disabled="items.length === 0"
            :aria-disabled="items.length === 0"
        >
            Clear All
        </button>
        </div>

        <!-- Shopping List -->
        <div
        v-if="items.length > 0"
        class="bg-white/80 backdrop-blur rounded-xl shadow-lg p-4 space-y-3 text-gray-800 mb-10 border border-gray-100"
        >
        <div
            v-for="item in items"
            :key="item.id"
            class="flex items-center justify-between border-b border-gray-100 last:border-b-0 py-3"
        >
            <label class="flex items-center gap-3 flex-1 cursor-pointer">
            <input
                type="checkbox"
                v-model="item.completed"
                @change="updateItemCompletion(item)"
                :aria-checked="item.completed"
                class="w-5 h-5 text-green-500 rounded focus:ring-green-400 transition"
            />
            <span
                :class="{
                'line-through text-gray-800': item.completed,
                'text-gray-800': !item.completed
                }"
                class="font-medium"
            >
                {{ item.name }}
            </span>
            </label>
        </div>
        </div>

        <!-- Empty State -->
        <div
        v-if="items.length === 0"
        class="text-center text-gray-600 mt-16 bg-white/70 backdrop-blur rounded-xl p-12 shadow-lg border border-gray-100"
        >
        <p class="text-xl font-semibold mb-2">Your shopping list is empty.</p>
        <p class="text-gray-500">Add some items above to get started!</p>
        </div>
    </div>
    </template>
