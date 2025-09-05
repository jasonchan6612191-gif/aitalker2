<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-blue-600 text-white p-4 text-center text-3xl font-extrabold shadow-md">
      Chatbot 系統
    </header>
    <nav class="p-4 flex justify-center space-x-6 bg-white shadow-sm">
      <button @click="current = 'chat'" :class="[
        'px-5 py-2 rounded-md font-medium transition-colors duration-300',
        current === 'chat' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-200'
      ]">
        聊天界面
      </button>
      <button @click="current = 'admin'" :class="[
        'px-5 py-2 rounded-md font-medium transition-colors duration-300',
        current === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-200'
      ]">
        管理後台
      </button>
    </nav>
    <main class="flex-grow p-6 relative overflow-hidden">
      <transition name="fade-slide" mode="out-in">
        <component :is="currentComponent" :key="current" />
      </transition>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ChatInterface from "../my-vue-app/src/components/ChatInterface.vue";
import AdminDashboard from "../my-vue-app/src/components/AdminDashboard.vue";

const current = ref("chat");
const currentComponent = computed(() => (current.value === "chat" ? ChatInterface : AdminDashboard));
</script>

<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-enter-to {
  opacity: 1;
  transform: translateX(0);
}

.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
