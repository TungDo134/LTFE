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

export async function getReviewByProductId(productId) {
    try {
        const response = await fetch(`http://localhost:8000/reviews?productId=${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Không thể kết nối tới JSON Server');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Lỗi lấy review:", error);
        throw error;
    }
}