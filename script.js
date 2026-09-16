/* =========================
   OINANCE AI
   MAIN JAVASCRIPT
========================= */

const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("chatMessages");
const welcomeScreen = document.getElementById("welcomeScreen");
const newChatBtn = document.getElementById("newChatBtn");

const suggestions = document.querySelectorAll(".suggestion");


/* =========================
   SEND MESSAGE
========================= */

function sendMessage() {

    const message = messageInput.value.trim();

    if (message === "") {
        return;
    }

    // Hide welcome screen
    welcomeScreen.style.display = "none";

    // Add user message
    addUserMessage(message);

    // Clear input
    messageInput.value = "";

    // Reset textarea height
    messageInput.style.height = "auto";

    // Temporary AI response
    setTimeout(() => {

        addAIMessage(
            "Hello! I'm OINANCE AI. I'm currently being connected to my AI engine. Soon I'll be able to help you with questions, coding, writing, learning and much more."
        );

    }, 600);
}


/* =========================
   USER MESSAGE
========================= */

function addUserMessage(message) {

    const messageElement = document.createElement("div");

    messageElement.className = "message user";

    messageElement.innerHTML = `
        <div class="message-content">
            ${escapeHTML(message)}
        </div>
    `;

    chatMessages.appendChild(messageElement);

    scrollToBottom();
}


/* =========================
   AI MESSAGE
========================= */

function addAIMessage(message) {

    const messageElement = document.createElement("div");

    messageElement.className = "message ai";

    messageElement.innerHTML = `
        <div class="ai-avatar">
            ◎
        </div>

        <div class="message-content">
            ${escapeHTML(message)}
        </div>
    `;

    chatMessages.appendChild(messageElement);

    scrollToBottom();
}


/* =========================
   QUICK SUGGESTIONS
========================= */

suggestions.forEach(button => {

    button.addEventListener("click", () => {

        const title = button.querySelector("strong").textContent;

        const prompts = {

            "Explain something":
                "Explain something to me in a simple way.",

            "Write something":
                "Help me write something.",

            "Help with coding":
                "Help me with coding.",

            "Learn something":
                "Teach me something step by step."

        };

        messageInput.value =
            prompts[title] || title;

        messageInput.focus();

        autoResize();

    });

});


/* =========================
   SEND BUTTON
========================= */

sendBtn.addEventListener("click", sendMessage);


/* =========================
   ENTER TO SEND
========================= */

messageInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();

    }

});


/* =========================
   AUTO RESIZE TEXTAREA
========================= */

messageInput.addEventListener("input", autoResize);

function autoResize() {

    messageInput.style.height = "auto";

    messageInput.style.height =
        messageInput.scrollHeight + "px";

}


/* =========================
   NEW CHAT
========================= */

newChatBtn.addEventListener("click", () => {

    chatMessages.innerHTML = "";

    welcomeScreen.style.display = "block";

    messageInput.value = "";

    messageInput.style.height = "auto";

    messageInput.focus();

});


/* =========================
   SCROLL
========================= */

function scrollToBottom() {

    setTimeout(() => {

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });

    }, 50);

}


/* =========================
   SECURITY
========================= */

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}
