import {useSelector} from "react-redux";
import {formatNumber} from "../../utils/formatNumber.js";
import {useState, useRef} from "react";
import {Pen} from "lucide-react";
import {updateProfile} from "../../services/apiAuth.js";
import toast from "react-hot-toast";
import {update} from "../../redux/authSlice.js";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {cloudinaryService} from "../../services/apiUploadImage.js";

export default function UserInfo() {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(user.avt);

    const [formData, setFormData] = useState({
        username: user.username,
        name: user.name,
        email: user.email,
        avt: user.avt
    });
    const [isEditing, setIsEditing] = useState({
        username: false,
        name: false,
        email: false,
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Ảnh quá lớn! Vui lòng chọn file dưới 5MB");
            return;
        }

        const temp = URL.createObjectURL(file); // tao ra url tam thoi tu file moi up tu may
        setPreview(temp);
        setSelectedFile(file);
    };

    const toggleEdit = (field) => {
        setIsEditing((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const handleSave = async () => {
        const savePromise = async () => {
            setUploading(true);
            let avtUrl = formData.avt;

            try {
                if (selectedFile) {
                    avtUrl = await cloudinaryService.uploadImage(selectedFile);
                }

                const data = { ...formData, avt: avtUrl };
                const updatedUser = await updateProfile(user.id, data);

                dispatch(update(updatedUser));
                setSelectedFile(null);

                setIsEditing({
                    username: false,
                    name: false,
                    email: false,
                });

                return updatedUser;
            } catch (error) {
                console.log(error)
            } finally {
                setUploading(false);
            }
        };

        await toast.promise(savePromise(), {
            loading: "Đang tải ảnh và lưu thay đổi...",
            success: "Cập nhật thành công!",
            error: (err) => `Lỗi: ${err.message || "Không thể lưu"}`,
        });
    };

    const inputBaseClass =
        "font-bold text-gray-800 border-b border-transparent focus:border-blue-500 focus:outline-none bg-transparent transition-all py-1";

    return (
        <div>
            <div className="mb-4">
                <span className="text-2xl font-bold">Tổng quan</span>
            </div>

            <div className="grid grid-cols-3 gap-y-8 gap-x-4 py-4 border-b-2 border-gray-500/50">
                <div className="flex flex-col gap-2 group">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">Tên đăng nhập</span>
                        <Pen
                            size={14}
                            className="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors"
                            onClick={() => toggleEdit("username")}
                        />
                    </div>

                    {isEditing.username ? (
                        <div className="flex items-center gap-2">
                            <input
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                autoFocus
                                className={`${inputBaseClass} border-blue-500 w-full`}
                            />
                        </div>
                    ) : (
                        <span className="font-bold text-gray-800 py-1">
              {user.username}
            </span>
                    )}
                </div>

                <div className="flex flex-col gap-2 group">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">Họ tên</span>
                        <Pen
                            size={14}
                            className="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors"
                            onClick={() => toggleEdit("name")}
                        />
                    </div>

                    {isEditing.name ? (
                        <div className="flex items-center gap-2">
                            <input
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                autoFocus
                                className={`${inputBaseClass} border-blue-500 w-full`}
                            />
                        </div>
                    ) : (
                        <span className="font-bold text-gray-800 py-1">{user.name}</span>
                    )}
                </div>

                <div className="flex flex-col gap-2 group">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500 text-sm">Email</span>
                        <Pen
                            size={14}
                            className="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors"
                            onClick={() => toggleEdit("email")}
                        />
                    </div>

                    {isEditing.email ? (
                        <div className="flex items-center gap-2">
                            <input
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                autoFocus
                                className={`${inputBaseClass} border-blue-500 w-full`}
                            />
                        </div>
                    ) : (
                        <span className="font-bold text-gray-800 py-1">{user.email}</span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <span className="text-gray-500 text-sm">Số dư</span>
                        <Link
                            to={"/topup"}
                            className="cursor-pointer text-gray-400 hover:text-blue-500 transition-colors">
                            <Pen size={14}/>
                        </Link>
                    </div>
                    <span className="font-bold text-gray-800">
                        {formatNumber(user.balance)}
                    </span>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-gray-500 text-sm">Đã sử dụng</span>
                    <span className="font-bold text-gray-800">
                        {formatNumber(user.used)}
                    </span>
                </div>
            </div>

            <div className={"py-4 flex items-center"}>
                <div className={
                        "w-[40%] flex gap-6 items-center border-r-2 border-gray-500/50 pr-6"}>
                    <img
                        className={"w-40 h-40 rounded-full border-2 border-gray-200"}
                        src={preview}
                        alt={"AVT USER"}
                    />
                    <div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                        <button
                            type="button"
                            disabled={uploading}
                            onClick={() => fileInputRef.current.click()}
                            className="bg-white text-blue-500 border border-blue-500 rounded-lg h-10 px-4
                            font-medium cursor-pointer shadow-md transition-all duration-300
                            hover:bg-blue-600 hover:text-white hover:shadow-blue-200">
                            {uploading ? "Đang tải..." : "Sửa ảnh đại diện"}
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
                onClick={handleSave}
                className="bg-blue-500 text-white rounded-lg h-10 w-30
                            font-medium cursor-pointer shadow-md transition-all duration-300
                            hover:bg-blue-600 hover:text-white hover:shadow-blue-200">
                Lưu thay đổi
            </button>
        </div>
    );
}
