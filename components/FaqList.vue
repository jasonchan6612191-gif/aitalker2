<template>
    <div style="max-width: 600px; margin: 2rem auto; font-family: Arial, sans-serif;">
        <h1 style="text-align: center;">常見問題 (FAQ) 列表</h1>
        <ul style="list-style: none; padding: 0;">
            <li v-for="faq in faqs" :key="faq.id"
                style="padding: 1rem; margin-bottom: 0.5rem; border: 1px solid #ccc; border-radius: 5px;">
                <strong style="font-size: 1.1rem;">{{ faq.question }}</strong>
                <p style="margin-top: 0.5rem;">{{ faq.answer }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "FaqList",
    data() {
        return {
            faqs: []
        };
    },
    async created() {
        try {
            const response = await axios.get("/api/faq");
            this.faqs = response.data;
        } catch (error) {
            console.error("取得 FAQ 資料錯誤:", error);
        }
    }
};
</script>
