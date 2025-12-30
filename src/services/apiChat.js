export async function getChatByUserId(userId) {
    const res = await fetch(`http://localhost:8000/messages?sendId=${userId}`);
    if (!res.ok) throw new Error("Không thể tải dữ liệu chat");
    const data = await res.json();
    return data;
}

export async function updateChatHistory(chatId, updatedHistory) {
    const res = await fetch(`http://localhost:8000/messages/${chatId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({history: updatedHistory})
    });
    if (!res.ok) throw new Error("Không thể gửi tin nhắn");
    return res.json();
}