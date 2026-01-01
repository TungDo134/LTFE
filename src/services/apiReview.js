export async function submitReview(review) {
    try {
        const response = await fetch('http://localhost:8000/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        });

        if (!response.ok) {
            throw new Error('Không thể kết nối tới JSON Server');
        }

        return await response.json();
    } catch (error) {
        console.error("Lỗi JSON Server:", error);
        throw error;
    }
}