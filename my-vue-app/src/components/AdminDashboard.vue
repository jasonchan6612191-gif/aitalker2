<template>
  <div class="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow space-y-3">
    <form @submit.prevent="addFaq" class="flex flex-col sm:flex-row gap-3 mb-6">
      <input v-model="newQuestion" placeholder="新增問題"
        class="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" />
      <input v-model="newAnswer" placeholder="新增答案"
        class="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" />
      <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition">新增
        FAQ</button>
    </form>
    <div v-for="faq in faqs" :key="faq.id"
      class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer flex justify-between items-start">
      <div>
        <p class="font-semibold text-lg">{{ faq.question }}</p>
        <p class="text-gray-700 mt-1">{{ faq.answer }}</p>
      </div>
      <button @click="deleteFaq(faq.id)"
        class="bg-red-600 text-white rounded px-3 py-1 hover:bg-red-700 transition ml-4">刪除</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const faqs = ref([]);
const newQuestion = ref("");
const newAnswer = ref("");

async function fetchFaqs() {
  try {
    const res = await axios.get("/api/faq");
    faqs.value = res.data;
  } catch { }
}

async function addFaq() {
  if (!newQuestion.value.trim() || !newAnswer.value.trim()) return;
  try {
    const res = await axios.post("/api/faq", { question: newQuestion.value.trim(), answer: newAnswer.value.trim() });
    faqs.value.push(res.data);
    newQuestion.value = "";
    newAnswer.value = "";
  } catch { }
}

async function deleteFaq(id) {
  try {
    await axios.delete(`/api/faq/${id}`);
    faqs.value = faqs.value.filter(f => f.id !== id);
  } catch { }
}

onMounted(() => {
  fetchFaqs();
});
</script>
