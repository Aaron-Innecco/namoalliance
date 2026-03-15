const API = "https://api.namoalliance.org";

const baseHeaders = {
  "Content-Type": "application/json",
  "X-Internal-Auth": "c4f8e1a9b2d44e8c9f1d3e4f5a6b7c8d"
};

export async function fetchMembers() {
  const res = await fetch(`${API}/api/members`, { cache: "no-store" });

  if (!res.ok) {
    return { members: [], observers: [], former: [] };
  }

  return res.json();
}

export async function addMember(password, member) {
  const res = await fetch(`${API}/api/admin/add_member`, {
    method: "POST",
    headers: baseHeaders,
    credentials: "include",
    body: JSON.stringify({ password, ...member })
  });

  return res.json();
}

export async function deleteMember(password, index, type) {
  const res = await fetch(`${API}/api/admin/delete_member`, {
    method: "POST",
    headers: baseHeaders,
    credentials: "include",
    body: JSON.stringify({ password, index, type })
  });

  return res.json();
}

export async function editMember(password, index, type, member) {
  const res = await fetch(`${API}/api/admin/edit_member`, {
    method: "POST",
    headers: baseHeaders,
    credentials: "include",
    body: JSON.stringify({ password, index, type, ...member })
  });

  return res.json();
}