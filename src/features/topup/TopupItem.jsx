const PaymentMethodItem = ({ item, isSelected, isDimmed, onSelect }) => {
  return (
    <div className="transition-all duration-200">
      <div
        onClick={() => onSelect(item.id)}
        className={`p-3 flex items-center gap-4 border-[#9ca3af40] border-2 border-b-0 cursor-pointer
          ${isDimmed ? "opacity-50 grayscale-[0.3]" : "opacity-100"} 
          ${isSelected ? "bg-gray-50" : ""}
        `}
      >
        <div>
          <img
            className="block h-10 w-10 align-middle"
            src={item.img}
            alt={item.name}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-md font-bold">{item.name}</p>
          <p className="text-sm text-gray-500">{item.desc}</p>
        </div>
      </div>

      {isSelected && (
        <div className="p-3 border-[#9ca3af40] border-2 border-t-0 bg-white flex flex-col items-start gap-4">
          <p className="text-sm text-gray-600">
            Vui lòng đăng nhập để tiếp tục thanh toán.
          </p>
          {/* Gán thẻ link tới login */}
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium">
            Đăng nhập để tiếp tục
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodItem;
