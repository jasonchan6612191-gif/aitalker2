<template>
    <div class="max-w-md mx-auto p-4 bg-gray-50 rounded-lg shadow">
        <div ref="messageContainer" class="mb-2 flex flex-col space-y-2 overflow-y-auto h-72">
            <div v-for="msg in messages" :key="msg.id"
                :class="msg.from === 'User' ? 'self-end bg-blue-600 text-white' : 'self-start bg-white text-gray-900'"
                class="p-3 rounded-lg shadow max-w-[80%] break-words">
                <span>{{ msg.content }}</span>
            </div>
        </div>
        <form @submit.prevent="sendMessage" class="flex space-x-2">
            <input v-model="newMessage"
                class="flex-grow rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="輸入訊息..." />
            <button type="submit"
                class="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition">送出</button>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";

const messages = ref([]);
const newMessage = ref("");
const messageContainer = ref(null);

async function fetchMessages() {
    try {
        const res = await axios.get("/api/message");
        messages.value = res.data;
        scrollToBottom();
    } catch {

    }
}

function scrollToBottom() {
    nextTick(() => {
        if (messageContainer.value) messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
    });
}

async function sendMessage() {
    if (!newMessage.value.trim()) return;
    try {
        const res = await axios.post("/api/message", { content: newMessage.value.trim() });
        messages.value.push(res.data);
        newMessage.value = "";
        scrollToBottom();
    } catch {

    }
}

onMounted(() => {
    fetchMessages();
});
</script>
