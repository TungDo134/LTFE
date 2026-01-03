const BASE_URL = "http://localhost:8000";


export async function getUser(email, pwd) {
    const res = await fetch(`http://localhost:8000/users?email=${email}&pwd=${pwd}`);
    if (!res.ok) {
        throw new Error("Users not found");
    }
    return res.json();
}

export async function register(user) {
    const res = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    });

    if (!res.ok) {
        throw new Error("Can't register user");
    }
    return res.json();
}

export async function checkExisted(email) {
    const res = await fetch(`${BASE_URL}/users?email=${email}`);
    if (!res.ok) {
        throw new Error("Can't register user");
    }
    return res.json();
}

export async function updateProfile(userId, updateData) {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
    });

    if (!res.ok) throw new Error("Không thể cập nhật thông tin");
    return res.json();
}

export async function getPasswordByUserId(userId) {
    const res = await fetch(`${BASE_URL}/users/${userId}`);

    if (!res.ok) throw new Error("Không thể tìm thấy người dùng");

    const data = await res.json();

    return data.pwd;
}

export const getUserByEmail = async (email) => {
    const res = await fetch(`${BASE_URL}/users?email=${email}`);
    const users = await res.json();
    return users.length > 0 ? users[0] : null;
};

export const resetPassword = async (email, newPassword) => {
    const user = await getUserByEmail(email);
    if (!user) throw new Error("Không tìm thấy người dùng!");

    const res = await fetch(`${BASE_URL}/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pwd: newPassword })
    });

    if (!res.ok) throw new Error("Cập nhật mật khẩu thất bại!");
    return await res.json();
};