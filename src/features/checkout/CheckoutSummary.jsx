function CheckoutSummary({ items }) {
    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="border p-4 rounded h-fit">
            <h3 className="text-lg font-semibold mb-2">Tổng đơn hàng</h3>
            <p>Tạm tính: {total} đ</p>

            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded">
                Đặt hàng
            </button>
        </div>
    );
}

export default CheckoutSummary;
