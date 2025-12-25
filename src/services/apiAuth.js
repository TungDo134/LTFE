export async function getUser(email, pwd) {
    const res = await fetch(`http://localhost:8000/users?email=${email}&pwd=${pwd}`);
    if (!res.ok) {
        throw new Error("Users not found");
    }
    return res.json();
}