import React, {Component} from 'react'
import ChatbotStartup from "./ChatbotStartup";
import './Chatbot.css';


export const createChatLi = (message,className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);

    let chatContent = className === 'outgoing' ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

export const callBackend = (chatbox) => {
    const newChatLi = createChatLi("I am thinking...","incoming");
    chatbox.appendChild(newChatLi);
    chatbox.scrollTo(0,chatbox.scrollHeight)
    generateResponse(newChatLi,chatbox);

}

const generateResponse = (newChatLi,chatbox) => {
    const API_URL ="http://localhost:5000/api/chat/completion";
    const messageElement = newChatLi.querySelector("p");

    const requestOptions =  {
        method: "POST",
        headers:  {
            "Content-Type": "application/json"
        }
    }

    fetch(API_URL,requestOptions).then(res => res.json()).then(data =>  {
        console.log(data);
        messageElement.textContent = data.message;
    }).catch( (error) => {
        console.log(error);
        messageElement.textContent = "Oops! Something goes wrong!";
    }).finally(() => {
        chatbox.scrollTo(0,chatbox.scrollHeight)
    });
}
class Chatbot extends Component {

    handleChat = () => {
        const chatInput = document.querySelector(".chat-input textarea");
        const  chatbox = document.querySelector(".chatbox");

        let userMessage;
        userMessage = chatInput.value.trim();
        console.log(userMessage);

        if (!userMessage) return;

        chatInput.value = ""
        chatbox.appendChild(createChatLi(userMessage,"outgoing"));
        chatbox.scrollTo(0,chatbox.scrollHeight)

        setTimeout(() => {
            callBackend(chatbox);
        },600)
    }

    render() {
        return (
            <div>
                <button className="chatbot-toggler"  onClick={() => {document.body.classList.toggle("show-chatbot")}} >

                    <span className="material-symbols-outlined">mode_comment</span>
                    <span className="material-symbols-outlined">close</span>

                </button>
            <div className="chatbot">
                <header>
                    <h2>Chatbot</h2>
                    <span className="material-symbols-outlined">close</span>
                </header>

                <ul className="chatbox">
                    <ChatbotStartup />
                </ul>
                <div className="chat-input">
                    <textarea placeholder="Enter a message..." required></textarea>
                    <span id="send-btn" className="material-symbols-outlined" onClick={this.handleChat}>send</span>
                </div>
            </div>
            </div>
        )

    }
}

export default Chatbot