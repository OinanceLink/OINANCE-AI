/* =========================
   OINANCE AI
   ADVANCED CHAT JAVASCRIPT
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

    if (!message) {
        return;
    }

    welcomeScreen.style.display = "none";

    addUserMessage(message);

    messageInput.value = "";

    messageInput.style.height = "auto";

    showThinking();

    setTimeout(() => {

        removeThinking();

        addAIMessage(
            getDemoResponse(message)
        );

    }, 1000);
}


/* =========================
   DEMO AI RESPONSES
========================= */

function getDemoResponse(message) {

    const text = message.toLowerCase();

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return "Hello! Welcome to OINANCE AI. I'm ready to help you explore ideas, learn, write and build.";

    }

    if (
        text.includes("who are you") ||
        text.includes("what are you")
    ) {

        return "I'm OINANCE AI, an AI assistant being developed by OINANCE Technology.";

    }

    if (
        text.includes("code") ||
        text.includes("coding") ||
        text.includes("javascript") ||
        text.includes("website")
    ) {

        return "I can help you build websites, understand programming concepts, debug code and learn technology step by step.";

    }

    if (
        text.includes("bitcoin") ||
        text.includes("crypto")
    ) {

        return "I can help explain Bitcoin and cryptocurrency concepts. When we connect the real AI engine, OINANCE AI will be able to provide much more detailed answers.";

    }

    if (
        text.includes("thank")
    ) {

        return "You're welcome. I'm here whenever you need help.";

    }

    return "That's an interesting question. The OINANCE AI engine is still being connected. Once the real AI engine is activated, I'll be able to give you much more detailed answers.";
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

            <button
                class="copy-btn"
                onclick="copyResponse(this)"
            >
                Copy
            </button>
        </div>
    `;

    chatMessages.appendChild(messageElement);

    scrollToBottom();
}


/* =========================
   THINKING ANIMATION
========================= */

function showThinking() {

    const thinking = document.createElement("div");

    thinking.className = "message ai";

    thinking.id = "thinkingMessage";

    thinking.innerHTML = `
        <div class="ai-avatar">
            ◎
        </div>

        <div class="message-content thinking">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    chatMessages.appendChild(thinking);

    scrollToBottom();
}


function removeThinking() {

    const thinking =
        document.getElementById("thinkingMessage");

    if (thinking) {
        thinking.remove();
    }
}


/* =========================
   COPY AI RESPONSE
========================= */

function copyResponse(button) {

    const content =
        button.parentElement;

    const text =
        content.innerText.replace("Copy", "").trim();

    navigator.clipboard.writeText(text);

    button.textContent = "Copied";

    setTimeout(() => {

        button.textContent = "Copy";

    }, 1500);
}


/* =========================
   QUICK ACTIONS
========================= */

suggestions.forEach(button => {

    button.addEventListener("click", () => {

        const title =
            button.querySelector("strong").textContent;

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

sendBtn.addEventListener(
    "click",
    sendMessage
);


/* =========================
   ENTER TO SEND
========================= */

messageInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();
        }

    }
);


/* =========================
   AUTO RESIZE
========================= */

messageInput.addEventListener(
    "input",
    autoResize
);


function autoResize() {

    messageInput.style.height = "auto";

    messageInput.style.height =
        messageInput.scrollHeight + "px";
}


/* =========================
   NEW CHAT
========================= */

newChatBtn.addEventListener(
    "click",
    () => {

        chatMessages.innerHTML = "";

        welcomeScreen.style.display =
            "block";

        messageInput.value = "";

        messageInput.style.height =
            "auto";

        messageInput.focus();

    }
);


/* =========================
   SCROLL
========================= */

function scrollToBottom() {

    setTimeout(() => {

        window.scrollTo({

            top:
                document.body.scrollHeight,

            behavior: "smooth"

        });

    }, 50);
}


/* =========================
   SECURITY
========================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
