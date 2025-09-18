    <template>
    <div class="max-w-2xl mx-auto py-10 px-6 text-gray-900 bg-white rounded-lg shadow">
        <h1 class="text-2xl font-bold mb-6 text-center">👤 My Profile</h1>

        <!-- Profile Info -->
        <div class="space-y-4">
        <div>
            <label class="block text-sm font-medium text-gray-700">Name</label>
            <input
            v-model="user.name"
            type="text"
            class="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
            />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Surname</label>
            <input
            v-model="user.surname"
            type="text"
            class="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
            />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Country</label>
            <input
            v-model="user.country"
            type="text"
            class="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
            />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input
            v-model="user.email"
            type="email"
            class="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
            />
        </div>

        <div>
            <label class="block text-sm font-medium text-gray-700">Password</label>
            <input
            type="password"
            value="********"
            disabled
            class="w-full border rounded-lg px-4 py-2 mt-1 bg-gray-100 text-gray-500"
            />
            <button
            @click="showPasswordForm = !showPasswordForm"
            class="text-sm text-green-600 mt-2 hover:underline"
            >
            Change Password
            </button>
        </div>
        </div>

        <!-- Change Password Section -->
        <div v-if="showPasswordForm" class="mt-6 border-t pt-6">
        <h2 class="text-lg font-semibold mb-4">Change Password</h2>
        <div class="space-y-4">
            <div>
            <label class="block text-sm font-medium text-gray-700">Old Password</label>
            <input
                v-model="passwordForm.oldPassword"
                type="password"
                class="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
            />
            </div>
            <div>
            <label class="block text-sm font-medium text-gray-700">New Password</label>
            <input
                v-model="passwordForm.newPassword"
                type="password"
                class="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
            />
            </div>
            <div>
            <label class="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
                v-model="passwordForm.confirmPassword"
                type="password"
                class="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
            />
            </div>
            <button
            @click="changePassword"
            class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
            Save New Password
            </button>
        </div>
        </div>
    </div>
    </template>

    <script setup>
    definePageMeta({
    layout: "app", // <-- This makes it use layouts/app.vue
    });

    import { ref } from "vue";

    // Dummy user data (replace with API later)
    const user = ref({
    name: "Amina",
    surname: "Usmani",
    country: "Germany",
    email: "amina@example.com",
    });

    const showPasswordForm = ref(false);

    const passwordForm = ref({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    });

    const changePassword = () => {
    if (!passwordForm.value.oldPassword || !passwordForm.value.newPassword) {
        alert("Please fill in all fields.");
        return;
    }
    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Replace with API call later
    alert("✅ Password changed successfully!");

    // Reset form
    passwordForm.value.oldPassword = "";
    passwordForm.value.newPassword = "";
    passwordForm.value.confirmPassword = "";
    showPasswordForm.value = false;
    };
    </script>
