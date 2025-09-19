    <script setup lang="ts">
    definePageMeta({
    layout: "app",
    middleware: 'auth'
    });

    import { ref, onMounted, computed } from "vue";
    import { useRouter } from 'vue-router'

    // Define interfaces for your data
    interface ShoppingItem {
    id: string
    name: string
    completed: boolean
    created_at?: string
    }

    interface UserItemHistory {
    name: string
    count: number
    }

    interface SupabaseShoppingItem {
    id: string
    user_id: string
    name: string
    completed: boolean
    count: number
    created_at: string
    updated_at: string
    }

    const supabase = useSupabaseClient()
    const router = useRouter()
    const user = ref<any>(null)
    const newItem = ref("")
    const items = ref<ShoppingItem[]>([])
    const userItemsHistory = ref<UserItemHistory[]>([])

    // Get current user
    const getUser = async () => {
    const { data: { user: userData } } = await supabase.auth.getUser()
    user.value = userData
    }

    // Load user's items from Supabase
    const loadUserItems = async () => {
    if (!user.value) return;

    const { data, error } = await supabase
        .from('shopping_items')
        .select('*')
        .eq('user_id', user.value.id)
        .order('created_at', { ascending: false })

    if (!error && data) {
        // Type assertion for Supabase data
        const typedData = data as unknown as SupabaseShoppingItem[]
        items.value = typedData.map(item => ({
        id: item.id,
        name: item.name,
        completed: item.completed,
        created_at: item.created_at
        }))
    }
    }

    // Load user's item history for suggestions
    const loadUserItemHistory = async () => {
    if (!user.value) return;

    const { data, error } = await supabase
        .from('shopping_items')
        .select('name, count')
        .eq('user_id', user.value.id)
        .order('count', { ascending: false })
        .limit(20)

    if (!error && data) {
        // Type assertion for Supabase data
        userItemsHistory.value = data as unknown as UserItemHistory[]
    }
    }

    // Add new item to Supabase
    const addItem = async () => {
    if (!newItem.value.trim() || !user.value) return;

    try {
        // Create the data object with proper typing
        const itemData = {
        user_id: user.value.id,
        name: newItem.value.trim(),
        completed: false
        }

        const { data, error } = await supabase
        .from('shopping_items')
        .insert([itemData] as never) // Use never to satisfy Supabase types
        .select()

        if (error) throw error

        if (data && data[0]) {
        // Type assertion for the returned data
        const newItemData = data[0] as unknown as SupabaseShoppingItem
        items.value.unshift({
            id: newItemData.id,
            name: newItemData.name,
            completed: newItemData.completed
        })
        }

        newItem.value = "";
        await loadUserItemHistory()

    } catch (error) {
        console.error('Error adding item:', error)
    }
    }

    // Update item completion status
    const updateItemCompletion = async (item: ShoppingItem) => {
    try {
        const updateData = { completed: item.completed }
        const { error } = await supabase
        .from('shopping_items')
        .update(updateData as never) // Use never to satisfy Supabase types
        .eq('id', item.id)

        if (error) throw error

    } catch (error) {
        console.error('Error updating item:', error)
        item.completed = !item.completed
    }
    }

    // Delete selected items
    const deleteSelected = async () => {
    const selectedItems = items.value.filter(item => item.completed);
    
    if (selectedItems.length === 0) return;

    try {
        const itemIds = selectedItems.map(item => item.id);
        
        const { error } = await supabase
        .from('shopping_items')
        .delete()
        .in('id', itemIds)

        if (error) throw error

        items.value = items.value.filter(item => !item.completed);

    } catch (error) {
        console.error('Error deleting items:', error)
    }
    }

    // Clear all items
    const clearAll = async () => {
    if (!confirm("Are you sure you want to clear the entire list?")) return;

    try {
        const { error } = await supabase
        .from('shopping_items')
        .delete()
        .eq('user_id', user.value.id)

        if (error) throw error

        items.value = [];

    } catch (error) {
        console.error('Error clearing items:', error)
    }
    }

    // Logout function
    const logout = async () => {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        
        // Clear local state
        items.value = []
        userItemsHistory.value = []
        user.value = null
        
        // Redirect to login
        await router.push('/login')
    } catch (error) {
        console.error('Logout error:', error)
    }
    }

    // Computed to check if something is selected
    const hasSelected = computed(() => items.value.some(item => item.completed));

    // Get suggestions based on user history
    const suggestions = computed(() => {
    return userItemsHistory.value
        .filter(item => item.name.toLowerCase().includes(newItem.value.toLowerCase()))
        .slice(0, 5)
    })

    // Initialize
    onMounted(async () => {
    await getUser()
    await loadUserItems()
    await loadUserItemHistory()
    })
    </script>

    <template>
    <div class="max-w-3xl mx-auto py-10 px-6">
        <!-- Header with logout -->
        <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-800">My Shopping List</h1>
        <button 
            @click="logout" 
            class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
            Logout
        </button>
        </div>

        <!-- Input Section with Suggestions -->
        <div class="mb-6">
        <div class="flex items-center gap-2 mb-2">
            <input
            v-model="newItem"
            @keyup.enter="addItem"
            type="text"
            placeholder="Add an item (e.g. Milk, Bread, Shampoo)"
            class="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none text-gray-700"
            />
            <button
            @click="addItem"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
            Add
            </button>
        </div>

        <!-- Suggestions -->
        <div v-if="newItem && suggestions.length > 0" class="bg-white border border-gray-200 rounded-lg shadow-lg mt-1">
            <div 
            v-for="suggestion in suggestions" 
            :key="suggestion.name"
            @click="newItem = suggestion.name; addItem()"
            class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700 border-b border-gray-100 last:border-b-0"
            >
            {{ suggestion.name }}
            </div>
        </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-between items-center mb-6">
        <button
            @click="deleteSelected"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!hasSelected"
        >
            Delete Selected
        </button>

        <button
            @click="clearAll"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="items.length === 0"
        >
            Clear All
        </button>
        </div>

        <!-- Shopping List -->
        <div v-if="items.length > 0" class="bg-white rounded-lg shadow p-4 space-y-2 text-gray-800 mb-6">
        <div
            v-for="item in items"
            :key="item.id"
            class="flex items-center justify-between border-b border-gray-100 last:border-b-0 py-2"
        >
            <label class="flex items-center gap-3 flex-1">
            <input
                type="checkbox"
                v-model="item.completed"
                @change="updateItemCompletion(item)"
                class="w-5 h-5 text-green-500 rounded focus:ring-green-400"
            />
            <span :class="{ 'line-through text-gray-500': item.completed }" class="text-gray-700">
                {{ item.name }}
            </span>
            </label>
        </div>
        </div>

        <!-- Empty State -->
        <div v-if="items.length === 0" class="text-center text-gray-500 mt-10 bg-white rounded-lg p-8">
        <p class="text-lg mb-4">Your shopping list is empty.</p>
        <p class="text-gray-600">Add some items to get started!</p>
        </div>

        <!-- Suggestions History -->
        <div v-if="userItemsHistory.length > 0" class="mt-8">
        <h2 class="text-xl font-semibold mb-3 text-gray-800">Your Frequently Added Items</h2>
        <div class="flex flex-wrap gap-2">
            <button
            v-for="historyItem in userItemsHistory.slice(0, 10)"
            :key="historyItem.name"
            @click="newItem = historyItem.name; addItem()"
            class="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-300 transition text-sm"
            >
            {{ historyItem.name }}
            </button>
        </div>
        </div>
    </div>
    </template>