function OrderTabs({ active, setActive }) {
    const tabs = [
        { key: "all", label: "Tất cả" },
        { key: "success", label: "Hoàn thành" },
        { key: "waiting", label: "Đang chờ" },
        { key: "canceled", label: "Đã hủy" },
    ];

    return (
        <div className="flex gap-6 border-b mb-6 text-sm">
            {tabs.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => setActive(tab.key)}
                    className={`pb-3 ${
                        active === tab.key
                            ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                            : "text-gray-500"
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

export default OrderTabs;
