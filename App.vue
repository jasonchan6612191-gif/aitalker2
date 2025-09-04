<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-blue-600 text-white p-4 text-center text-2xl font-bold">
      Chatbot 系統
    </header>
    <nav class="p-4 space-x-4">
      <button @click="current = 'chat'" :class="buttonClass(current === 'chat')">
        聊天界面
      </button>
      <button @click="current = 'admin'" :class="buttonClass(current === 'admin')">
        管理後台
      </button>
    </nav>
    <main class="p-4">
      <ChatInterface v-if="current === 'chat'" />
      <AdminDashboard v-if="current === 'admin'" />
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ChatInterface from "./components/ChatInterface.vue";
import AdminDashboard from "./components/AdminDashboard.vue";

const current = ref("chat");

const buttonClass = (active) =>
  active
    ? "bg-blue-600 text-white px-4 py-2 rounded"
    : "bg-gray-200 px-4 py-2 rounded";
</script>

<style>

</style>
