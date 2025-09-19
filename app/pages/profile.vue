<template>
    <div class="max-w-2xl mx-auto py-10 px-6 text-gray-900 bg-white rounded-lg shadow">
        <!-- Back Button -->
        <div class="mb-6">
            <button
                @click="goBackToDashboard"
                class="flex items-center text-green-600 hover:text-green-700 transition"
            >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to your list
            </button>
        </div>

        <h1 class="text-2xl font-bold mb-6 text-center">👤 My Profile</h1>

        <!-- Success/Error Messages -->
        <div v-if="successMessage" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {{ errorMessage }}
        </div>

        <!-- Profile Info -->
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <input
                    v-model="userData.firstName"
                    type="text"
                    class="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
                    disabled
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700">Surname</label>
                <input
                    v-model="userData.surname"
                    type="text"
                    class="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
                    disabled
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700">Country</label>
                <input
                    v-model="userData.country"
                    type="text"
                    class="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
                    disabled
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input
                    v-model="userData.email"
                    type="email"
                    class="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
                    disabled
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
                    <label class="block text-sm font-medium text-gray-700">Current Password</label>
                    <input
                        v-model="passwordForm.currentPassword"
                        type="password"
                        placeholder="Enter your current password"
                        class="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        v-model="passwordForm.newPassword"
                        type="password"
                        placeholder="Enter your new password"
                        class="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
                    />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                        v-model="passwordForm.confirmPassword"
                        type="password"
                        placeholder="Confirm your new password"
                        class="w-full border rounded-lg px-4 py-2 mt-1 focus:ring-2 focus:ring-green-400"
                    />
                </div>
                <div class="flex gap-2">
                    <button
                        @click="changePassword"
                        :disabled="isChangingPassword"
                        class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span v-if="isChangingPassword">Updating...</span>
                        <span v-else>Update Password</span>
                    </button>
                    <button
                        @click="showPasswordForm = false"
                        class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "app",
    middleware: 'auth'
});

import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const router = useRouter()
const successMessage = ref("")
const errorMessage = ref("")
const showPasswordForm = ref(false)
const isChangingPassword = ref(false)

// User data from Supabase
const userData = ref({
    firstName: "",
    surname: "",
    country: "",
    email: ""
})

const passwordForm = ref({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
})

// Go back to dashboard
const goBackToDashboard = () => {
    router.push('/dashboard')
}

// Load user data
const loadUserData = async () => {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
            // Get user metadata (first name, surname, country from signup)
            const { data: userMetadata } = await supabase.auth.getUser()
            
            userData.value = {
                firstName: userMetadata.user?.user_metadata?.firstName || "",
                surname: userMetadata.user?.user_metadata?.surname || "",
                country: userMetadata.user?.user_metadata?.country || "",
                email: user.email || ""
            }
        }
    } catch (error) {
        console.error('Error loading user data:', error)
        errorMessage.value = "Failed to load user data"
    }
}

// Change password with Supabase
const changePassword = async () => {
    errorMessage.value = ""
    successMessage.value = ""
    isChangingPassword.value = true

    try {
        // Validate form
        if (!passwordForm.value.currentPassword || !passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
            throw new Error("Please fill in all fields")
        }

        if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
            throw new Error("New passwords do not match")
        }

        if (passwordForm.value.newPassword.length < 6) {
            throw new Error("New password must be at least 6 characters long")
        }

        // Update password using Supabase
        const { error } = await supabase.auth.updateUser({
            password: passwordForm.value.newPassword
        })

        if (error) {
            // Handle specific error cases
            if (error.message.includes('JWT')) {
                throw new Error("Session expired. Please log in again.")
            }
            throw error
        }

        successMessage.value = "✅ Password updated successfully!"
        
        // Reset form
        passwordForm.value = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        }
        showPasswordForm.value = false

    } catch (error: any) {
        console.error('Password change error:', error)
        errorMessage.value = error.message || "Failed to update password. Please try again."
    } finally {
        isChangingPassword.value = false
    }
}

// Initialize
onMounted(async () => {
    await loadUserData()
})
</script>