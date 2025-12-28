export async function getUser(email, pwd) {
    const res = await fetch(`http://localhost:8000/users?email=${email}&pwd=${pwd}`);
    if (!res.ok) {
        throw new Error("Users not found");
    }
    return res.json();
}

export async function register(user) {
    const res = await fetch(`http://localhost:8000/users`, {
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
    const res = await fetch(`http://localhost:8000/users?email=${email}`);
    if (!res.ok) {
        throw new Error("Can't register user");
    }
    return res.json();
}

export async function updateProfile(userId, updateData) {
    const res = await fetch(`http://localhost:8000/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
    });

    if (!res.ok) throw new Error("Không thể cập nhật thông tin");
    return res.json();
}