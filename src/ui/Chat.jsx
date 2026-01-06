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
    const [unreadCount, setUnreadCount] = useState(0);
    
    useEffect(() => {
        let unsubscribe;

        if (user?.id) {
            unsubscribe = firebaseService.subscribeToChat(user.id, (newMessage) => {
                setHistory(newMessage);

                const lastMsg = newMessage[newMessage.length - 1];

                setIsOpen((currentOpen) => {
                    if (!currentOpen && lastMsg && !lastMsg.isUser) {
                        setUnreadCount(prev => prev + 1);
                    }
                    return currentOpen;
                });
            });
        }

        return () => unsubscribe?.();
    }, [user?.id]);

    useEffect(() => {
        if (isOpen) {
            setUnreadCount(0);
        }
    }, [isOpen]);

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
                } text-white`}>

                {!isOpen && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white animate-bounce">
                        {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                )}

                {isOpen ? <X/> : <MessageCircle/>}
                <span>{isOpen ? "Đóng" : "Chat"}</span>
            </button>
        </div>
    );
}