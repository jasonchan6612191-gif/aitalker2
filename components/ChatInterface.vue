<template>
    <div class="chat-interface"
        style="max-width:600px; margin:3rem auto; font-family: Arial, sans-serif; border:1px solid #ccc; border-radius:8px; padding:1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.1); background-color: white;">
        <h2 style="text-align:center; margin-bottom:1rem;">聊天界面</h2>
        <div class="messages"
            style="border:1px solid #ddd; border-radius:5px; min-height:300px; padding:1rem; overflow-y:auto; max-height:400px;">
            <div v-for="message in messages" :key="message.id" style="margin-bottom: 0.8rem;">
                <strong>{{ message.from }}</strong>: <span>{{ message.content }}</span>
            </div>
        </div>
        <form @submit.prevent="sendMessage" style="display:flex; margin-top:1rem;">
            <input v-model="newMessage" placeholder="輸入訊息"
                style="flex-grow: 1; padding: 0.6rem; border:1px solid #ccc; border-radius:5px;" />
            <button type="submit"
                style="margin-left:0.75rem; padding: 0.6rem 1.2rem; background-color:#3b82f6; color:white; border:none; border-radius:5px; cursor:pointer;">
                送出
            </button>
        </form>
    </div>
</template>

<script>
export default {
    name: "ChatInterface",
    data() {
        return {
            messages: [],
            newMessage: ""
        };
    },
    methods: {
        sendMessage() {
            if (this.newMessage.trim() === "") return;
            const msg = {
                id: Date.now().toString(),
                from: "User",
                content: this.newMessage.trim()
            };
            this.messages.push(msg);
            this.newMessage = "";
            // 這裡可串接後端API
        }
    }
};
</script>
