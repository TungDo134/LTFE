import {initializeApp} from "firebase/app";
import {getDatabase, ref, push, onValue, off} from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBHx8haw6gDq_h28VYotse5zH5poEWeLBw",
    authDomain: "ltfe-2c1e3.firebaseapp.com",
    databaseURL: "https://ltfe-2c1e3-default-rtdb.firebaseio.com",
    projectId: "ltfe-2c1e3",
    storageBucket: "ltfe-2c1e3.firebasestorage.app",
    messagingSenderId: "808735505812",
    appId: "1:808735505812:web:bbe2a46c9dfdd0cb582381",
    measurementId: "G-BZ3XBS07CR"
};

const app = initializeApp(firebaseConfig); // tao instance firebase tu config
const db = getDatabase(app); // ket noi toi db

export const firebaseService = {

    sendMessage: async (userId, content, isUser = true) => {
        if (!userId) return;

        const chatRef = ref(db, `chats/${userId}`); // ref la func dung de tham chieu toi phong chat
        const newMessage = {
            content: content,
            timestamp: new Date().toISOString(),
            isUser: isUser
        };

        try {
            return await push(chatRef, newMessage); // them du lieu vao phong chat theo ref
        } catch (error) {
            console.error("Firebase Send Error:", error);
            throw error;
        }
    },

    // callback dung de render lai thong qua useEff ben component
    subscribeToChat: (userId, callback) => {
        if (!userId) return;

        const chatRef = ref(db, `chats/${userId}`);

        // theo doi thay doi
        onValue(chatRef, (snapshot) => { // snapshot la data tai thoi diem do
            const data = snapshot.val();
            if (data) { // firebase tra ve obj nen phai dua data ve dang mang bang .values
                const history = Object.values(data);
                callback(history);
            } else {
                callback([]);
            }
        });

        return () => off(chatRef); // ngat ket noi theo doi thay doi
    }
};