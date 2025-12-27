function CheckoutItem({ item }) {
    return (
        <div className="flex gap-4 border p-3 rounded">
            <img src={item.thumbnail} className="w-20 rounded" />

            <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p>Số lượng: {item.quantity}</p>
                <p>{item.price * item.quantity} đ</p>
            </div>
        </div>
    );
}

export default CheckoutItem;
