const API = "https://api.namoalliance.org";

const baseHeaders = {
  "Content-Type": "application/json",
  "X-Internal-Auth": "c4f8e1a9b2d44e8c9f1d3e4f5a6b7c8d"
};

export async function fetchSlides() {
  const res = await fetch(`${API}/api/slides`, { cache: "no-store" });

  if (!res.ok) return { slides: [] };

  return res.json();
}

export async function addSlide(password, slide) {
  const res = await fetch(`${API}/api/admin/add_slide`, {
    method: "POST",
    headers: baseHeaders,
    credentials: "include",
    body: JSON.stringify({ password, ...slide })
  });
  return res.json();
}

export async function deleteSlide(password, index) {
  const res = await fetch(`${API}/api/admin/delete_slide`, {
    method: "POST",
    headers: baseHeaders,
    credentials: "include",
    body: JSON.stringify({ password, index })
  });
  return res.json();
}

export async function editSlide(password, index, slide) {
  const res = await fetch(`${API}/api/admin/edit_slide`, {
    method: "POST",
    headers: baseHeaders,
    credentials: "include",
    body: JSON.stringify({ password, index, ...slide })
  });
  return res.json();
}