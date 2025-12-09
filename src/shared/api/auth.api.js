import { BASE_URL } from "@/shared/config/env";

export async function login(data) {
    const res = await fetch(`${BASE_URL}/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function registerUser(data) {
    const res = await fetch(`${BASE_URL}/register.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
}