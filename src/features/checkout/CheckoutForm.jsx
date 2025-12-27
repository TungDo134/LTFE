function CheckoutForm() {
    return (
        <div className="border p-4 rounded">
            <h3 className="font-semibold mb-2">Thông tin giao hàng</h3>

            <input className="w-full border p-2 mb-2" placeholder="Họ tên" />
            <input className="w-full border p-2 mb-2" placeholder="Số điện thoại" />
            <input className="w-full border p-2" placeholder="Địa chỉ" />
        </div>
    );
}

export default CheckoutForm;
