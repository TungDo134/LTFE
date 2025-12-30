import { Minus, Send, MessageCircle } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ChatBox({ isOpen, setIsOpen, history, message, setMessage, send }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [history, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">

            {/* Header */}
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-bold uppercase text-xs tracking-wider">Hỗ trợ trực tuyến</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded transition-colors">
                    <Minus size={18} />
                </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 flex flex-col">
                {history.length > 0 ? (
                    history.map((msg, index) => (
                        <div
                            key={index}
                            className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                                msg.isUser
                                    ? "bg-blue-600 text-white self-end rounded-br-none"
                                    : "bg-white text-gray-800 self-start rounded-bl-none border border-gray-100"
                            }`}
                        >
                            {msg.content}
                            <div className={`text-[10px] mt-1 opacity-70 ${msg.isUser ? "text-right" : "text-left"}`}>
                                {msg.timestamp}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-400 text-xs mt-10 italic">
                        Hãy bắt đầu cuộc trò chuyện...
                    </div>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={send} className="p-3 border-t bg-white flex gap-2 items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2.5 rounded-full hover:bg-blue-700 active:scale-90 transition-all shadow-md"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
}