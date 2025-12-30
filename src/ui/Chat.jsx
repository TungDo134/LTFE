import { MessageCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ChatBox from "../features/chat/ChatBox.jsx";
import { getChatByUserId, updateChatHistory } from "../services/apiChat";

export default function Chat() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chatData, setChatData] = useState(null);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        async function loadChat() {
            try {
                if (isOpen && user) {
                    const data = await getChatByUserId(user.id);

                    if (data.length > 0) {
                        setChatData(data[0]);
                    } else {
                        setChatData({ sendId: user.id, receiveId: "admin", history: [] });
                    }
                }
            } catch (err) {
                console.error(err.message);
            }
        }
        loadChat();
    }, [isOpen, user]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim() || !chatData) return;

        const newMessage = {
            content: message,
            timestamp: new Date().toISOString(),
            isUser: true
        };

        // Cập nhật UI ngay lập tức
        const updatedHistory = [...(chatData.history || []), newMessage];
        setChatData({ ...chatData, history: updatedHistory });
        setMessage("");

        try {
            await updateChatHistory(chatData.id, updatedHistory);
        } catch (error) {
            console.error("Lỗi gửi tin nhắn:", error);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[500] flex flex-col items-end">
            <ChatBox
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                history={chatData?.history || []}
                message={message}
                setMessage={setMessage}
                send={handleSend}
            />

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex gap-3 cursor-pointer p-3 rounded-full shadow-lg transition-all duration-300 ${
                    isOpen ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
            >
                {isOpen ? <X /> : <MessageCircle />}
                <span>{isOpen ? "Đóng" : "Chat"}</span>
            </button>
        </div>
    );
}