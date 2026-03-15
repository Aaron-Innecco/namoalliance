const API = "https://api.namoalliance.org";

const baseHeaders = {
  "Content-Type": "application/json",
  "X-Internal-Auth": "c4f8e1a9b2d44e8c9f1d3e4f5a6b7c8d"
};


export async function fetchNews() {
  const res = await fetch(`${API}/api/news`, { cache: "no-store" });
  if (!res.ok) return { news: [] };
  return res.json();
}

export async function addNews(password, item) {
  const res = await fetch(`${API}/api/admin/add_news`, {
    method: "POST",
    headers: baseHeaders,
    credentials: "include",
    body: JSON.stringify({ password, ...item })
  });
  return res.json();
}

export async function deleteNews(password, index) {
  const res = await fetch(`${API}/api/admin/delete_news`, {
    method: "POST",
    headers: baseHeaders,
    credentials: "include",
    body: JSON.stringify({ password, index })
  });
  return res.json();
}

export async function editNews(password, index, item) {
  const res = await fetch(`${API}/api/admin/edit_news`, {
    method: "POST",
    headers: baseHeaders,
    credentials: "include",
    body: JSON.stringify({ password, index, ...item })
  });
  return res.json();
}
