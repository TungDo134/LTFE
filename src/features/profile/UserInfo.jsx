import {useSelector} from "react-redux";
import {formatNumber} from "../../utils/formatNumber.js"

export default function UserInfo() {
    const {user} = useSelector((state) => state.auth);

    return (
        <div>
            <div className="mb-4">
                <span className="text-2xl font-bold">Tổng quan</span>
            </div>

            <div className="grid grid-cols-3 gap-y-8 gap-x-4 py-4 border-b-2 border-gray-500/50">
                <div className="flex flex-col gap-2">
                    <span className="text-gray-500 text-sm">Tên đăng nhập</span>
                    <span className="font-bold text-gray-800">{user.username}</span>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-gray-500 text-sm">Họ và tên</span>
                    <span className="font-bold text-gray-800">{user.name}</span>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-gray-500 text-sm">Email</span>
                    <span className="font-bold text-gray-800 truncate">
                        {user.email}
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-gray-500 text-sm">Số dư</span>
                    <span className="font-bold text-gray-800">{formatNumber(user.balance)}</span>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-gray-500 text-sm">Đã tích lũy</span>
                    <span className="font-bold text-gray-800">{formatNumber(user.used)}</span>
                </div>
            </div>

            <div className={"py-4 flex items-center"}>
                <div className={"w-[40%] flex gap-6 items-center border-r-2 border-gray-500/50 pr-6"}>
                    <img className={"w-40 h-40 rounded-full border-2 border-gray-200"} src={user.avt}/>
                    <div>
                        <button
                            className="bg-white text-blue-500 border border-blue-500 rounded-lg h-10 px-4
                            font-medium cursor-pointer shadow-md transition-all duration-300
                            hover:bg-blue-600 hover:text-white hover:shadow-blue-200">
                            Sửa ảnh đại diện
                        </button>
                    </div>
                </div>

                <div className="flex flex-col justify-center gap-3 pl-6">
                    <div className="text-gray-500 text-md">
                        Vui lòng chọn ảnh nhỏ hơn 5MB
                    </div>
                    <div className="text-gray-500 text-md">
                        Chọn hình ảnh phù hợp, không phản cảm
                    </div>
                </div>
            </div>

            <button
                className="bg-blue-500 text-white rounded-lg h-10 w-30
                            font-medium cursor-pointer shadow-md transition-all duration-300
                            hover:bg-blue-600 hover:text-white hover:shadow-blue-200">
                Lưu thay đổi
            </button>


        </div>
    );
}