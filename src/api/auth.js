const API = "https://api.namoalliance.org";

const baseHeaders = {
  "Content-Type": "application/json",
  "X-Internal-Auth": "c4f8e1a9b2d44e8c9f1d3e4f5a6b7c8d"
};

export async function login(username, password) {
  const res = await fetch(`${API}/api/user/login`, {
    method: "POST",
    headers: baseHeaders,
    credentials: "include",
    body: JSON.stringify({ username, password })
  });
  return res.json();
}


export async function register(username, email, password) {
  const res = await fetch(`${API}/api/user/register`, {
    method: "POST",
    headers: baseHeaders,
    credentials: "include",
    body: JSON.stringify({ username, email, password })
  });
  return res.json();
}

export async function me() {
  try {
    const res = await fetch(`${API}/api/user/me`, {
      method: "GET",
      headers: baseHeaders,
      credentials: "include"
    });
    if (!res.ok) return { error: "Not logged in" };
    return res.json();
  } catch {
    return { error: "Failed" };
  }
}

export async function logout() {
  try {
    await fetch(`${API}/api/user/logout`, {
      method: "POST",
      headers: baseHeaders,
      credentials: "include"
    });
  } catch {}
}

export async function checkCouncilPassword(password) {
  const res = await fetch(`${API}/api/auth/check_council_password`, {
    method: "POST",
    headers: baseHeaders,
    credentials: "include",
    body: JSON.stringify({ password })
  });
  return res.json();
}

export async function getAllUsers() {
  const res = await fetch(`${API}/api/admin/users`, {
    method: "GET",
    headers: baseHeaders,
    credentials: "include"
  });
  return res.json();
}

export async function deleteUser(password, userId) {
  const res = await fetch(`${API}/api/admin/delete_user`, {
    method: "POST",
    headers: baseHeaders,
    credentials: "include",
    body: JSON.stringify({ password, user_id: userId })
  });
  return res.json();
}

export async function banUser(password, userId) {
  const res = await fetch(`${API}/api/admin/ban_user`, {
    method: "POST",
    headers: baseHeaders,
    credentials: "include",
    body: JSON.stringify({ password, user_id: userId })
  });
  return res.json();
}

export async function unbanUser(password, userId) {
  const res = await fetch(`${API}/api/admin/unban_user`, {
    method: "POST",
    headers: baseHeaders,
    credentials: "include",
    body: JSON.stringify({ password, user_id: userId })
  });
  return res.json();
}

export async function toggleAdmin(password, userId) {
  const res = await fetch(`${API}/api/admin/toggle_admin`, {
    method: "POST",
    headers: baseHeaders,
    credentials: "include",
    body: JSON.stringify({ password, user_id: userId })
  });
  return res.json();
}
