function PaymentMethod() {
    return (
        <div className="border p-4 rounded">
            <h3 className="font-semibold mb-2">Phương thức thanh toán</h3>

            <label className="block">
                <input type="radio" name="payment" defaultChecked /> COD
            </label>

            <label className="block">
                <input type="radio" name="payment" /> Chuyển khoản
            </label>
        </div>
    );
}

export default PaymentMethod;
