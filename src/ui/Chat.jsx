import {MessageCircle, X} from "lucide-react";
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import ChatBox from "../features/chat/ChatBox.jsx";
import {firebaseService} from "../services/apiChat.js";

export default function Chat() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [history, setHistory] = useState([]);
    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        let unsubscribe;

        if (isOpen && user?.id) {
            unsubscribe = firebaseService.subscribeToChat(1, (newMessage) => {
                setHistory(newMessage);
            });
        }

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [isOpen, user?.id]);

    const handleSend = async (e) => {
        e.preventDefault();

        if (!message.trim() || !user?.id) return;
        const currentMessage = message;
        setMessage("");

        try {
            await firebaseService.sendMessage(1, currentMessage, user.isUser)
        } catch (error) {
            console.error("Lỗi gửi tin nhắn Firebase:", error);
        }
    }

    return (
        <div className="fixed bottom-6 right-6 z-[500] flex flex-col items-end">
            <ChatBox
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                history={history}
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
                {isOpen ? <X/> : <MessageCircle/>}
                <span>{isOpen ? "Đóng" : "Chat"}</span>
            </button>
        </div>
    );
}