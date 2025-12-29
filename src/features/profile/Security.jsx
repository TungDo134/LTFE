import {useState} from "react";
import {Eye, EyeOff, Lock, ShieldCheck} from "lucide-react";
import toast from "react-hot-toast";
import {useSelector, useDispatch} from "react-redux";
import {getPasswordByUserId} from "../../services/apiAuth.js";
import {updateProfile} from "../../services/apiAuth.js";
import {update} from "../../redux/authSlice.js";
import {useNavigate} from "react-router-dom";

export default function Security() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        try {
            const password = await getPasswordByUserId(user.id);
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

            if (formData.currentPassword !== password) {
                return toast.error("Sai mật khẩu, vui lòng kiểm tra lại!");
            }
            if (formData.newPassword.length < 6) {
                return toast.error("Mật khẩu mới phải từ 6 ký tự trở lên!");
            }
            if (!passwordRegex.test(formData.newPassword)) {
                return toast.error("Mật khẩu phải bao gồm chữ hoa, chữ thường và số!");
            }
            if (formData.newPassword !== formData.confirmPassword) {
                return toast.error("Mật khẩu không khớp!");
            }

            const savePromise = async () => {
                const updatedUser = await updateProfile(user.id, {pwd: formData.newPassword});
                dispatch(update(updatedUser));
                return updatedUser;
            };

            await toast.promise(savePromise(), {
                loading: 'Đang lưu...',
                success: 'Đổi mật khẩu thành công!',
                error: 'Lỗi khi đổi mật khẩu',
            });

            navigate("/profile?tab=account")

        } catch (error) {
            toast.error("Lỗi hệ thống, vui lòng thử lại!");
            console.log(error)
        }
    };

    return (
        <div className="w-full">
            <div className="mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <ShieldCheck className="text-blue-500"/> Bảo mật tài khoản
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    Cập nhật mật khẩu thường xuyên để bảo vệ tài khoản của bạn.
                </p>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-6">
                <div className="flex flex-col gap-2">
                    <label className="text-gray-600 text-sm font-medium">Mật khẩu hiện tại</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">

                    {/* Mật khẩu mới */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-600 text-sm font-medium">Mật khẩu mới</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Tối thiểu 6 ký tự"
                                required
                            />
                        </div>
                    </div>

                    {/* Xác nhận mật khẩu mới */}
                    <div className="flex flex-col gap-2">
                        <label className="text-gray-600 text-sm font-medium">Xác nhận mật khẩu</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500"
                            >
                                {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
                    >
                        Cập nhật mật khẩu
                    </button>
                </div>
            </form>
            <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-100">
                <h4 className="text-amber-800 font-semibold text-sm">Lưu ý về mật khẩu:</h4>
                <ul className="text-amber-700 text-xs mt-2 list-disc ml-4 space-y-1">
                    <li>Mật khẩu phải có ít nhất 6 ký tự.</li>
                    <li>Nên bao gồm cả chữ hoa, chữ thường và số.</li>
                    <li>Không nên sử dụng lại mật khẩu cũ.</li>
                </ul>
            </div>
        </div>
    );
}