import React, { useEffect, useState } from "react";
import {
  fetchNews,
  addNews,
  deleteNews,
  editNews
} from "../api/news";
import {
  fetchMembers,
  addMember,
  deleteMember,
  editMember
} from "../api/members";
import {
  fetchSlides,
  addSlide,
  deleteSlide,
  editSlide
} from "../api/slides";
import {
  getAllUsers,
  deleteUser,
  banUser,
  unbanUser,
  toggleAdmin
} from "../api/auth";
import "./AdminPanel.css";

function AdminPanel() {
  const [password, setPassword] = useState("");
  const [news, setNews] = useState([]);
  const [members, setMembers] = useState({ members: [], observers: [], former: [] });
  const [slides, setSlides] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

async function loadAll() {
  setLoading(true);
  setErr(null);

  try {
    const [n, m, s, u] = await Promise.all([
      fetchNews(),
      fetchMembers(),
      fetchSlides(),
      getAllUsers()
    ]);

    setNews(n.news || []);
    setMembers({
      members: m.members || [],
      observers: m.observers || [],
      former: m.former || []
    });
    setSlides(s.slides || []);

    const usersArray = (u.users || []).map(user => ({
      ...user,
      id: user.id.trim(),
      username: user.username.trim()
    }));

    // ✅ This was missing
    setUsers(usersArray);

  } catch {
    setErr("Failed to load data");
  } finally {
    setLoading(false);
  }
}
  useEffect(() => {
    loadAll();
  }, []);

  function flash(message, isError = false) {
    if (isError) setErr(message);
    else setMsg(message);

    setTimeout(() => {
      setMsg(null);
      setErr(null);
    }, 3000);
  }

  return (
    <div className="admin-root">
      <div className="admin-box">
        <label className="admin-label">
          Council/Admin Password (for write actions)
        </label>

        <input
          type="password"
          className="admin-input"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {loading && <p className="admin-info">Loading…</p>}
        {msg && <p className="admin-success">{msg}</p>}
        {err && <p className="admin-error">{err}</p>}
      </div>

      {/* Slides */}
      <section className="admin-section">
        <h2 className="admin-section-title">Slides</h2>

        <div className="admin-list">
          {slides.map((s, i) => (
            <div key={i} className="admin-item">
              <div className="admin-item-main">
                <div className="admin-item-caption">{s.caption}</div>
                <div className="admin-item-url">{s.image}</div>
              </div>

              <div className="admin-item-actions">
                <button
                  className="admin-link"
                  onClick={async () => {
                    const image = prompt("New image URL:", s.image || "");
                    if (image == null) return;

                    const caption = prompt("New caption:", s.caption || "");
                    if (caption == null) return;

                    try {
                      await editSlide(password, i, { image, caption });
                      flash("Slide updated");
                      loadAll();
                    } catch {
                      flash("Failed to edit slide", true);
                    }
                  }}
                >
                  Edit
                </button>

                <button
                  className="admin-link-danger"
                  onClick={async () => {
                    try {
                      await deleteSlide(password, i);
                      flash("Slide deleted");
                      loadAll();
                    } catch {
                      flash("Failed to delete slide", true);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="admin-button"
          onClick={async () => {
            const image = prompt("Slide image URL:");
            if (!image) return;

            const caption = prompt("Slide caption:") || "";

            try {
              await addSlide(password, { image, caption });
              flash("Slide added");
              loadAll();
            } catch {
              flash("Failed to add slide", true);
            }
          }}
        >
          Add Slide
        </button>
      </section>

      {/* News */}
      <section className="admin-section">
        <h2 className="admin-section-title">News</h2>

        <div className="admin-list">
          {news.map((n, i) => (
            <div key={i} className="admin-item">
              <div className="admin-item-main">
                <div className="admin-item-caption">{n.title}</div>
                <div className="admin-item-sub">{n.date}</div>
                <div className="admin-item-url">{n.image}</div>
                <div className="admin-item-text">{n.text}</div>
              </div>

              <div className="admin-item-actions">
                <button
                  className="admin-link"
                  onClick={async () => {
                    const title = prompt("New title:", n.title || "");
                    if (title == null) return;

                    const date = prompt("New date:", n.date || "");
                    if (date == null) return;

                    const image = prompt("New image URL:", n.image || "");
                    if (image == null) return;

                    const text = prompt("New text:", n.text || "");
                    if (text == null) return;

                    try {
                      await editNews(password, i, { title, date, image, text });
                      flash("News updated");
                      loadAll();
                    } catch {
                      flash("Failed to edit news", true);
                    }
                  }}
                >
                  Edit
                </button>

                <button
                  className="admin-link-danger"
                  onClick={async () => {
                    if (!window.confirm("Delete this news item?")) return;

                    try {
                      await deleteNews(password, i);
                      flash("News deleted");
                      loadAll();
                    } catch {
                      flash("Failed to delete news", true);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="admin-button"
          onClick={async () => {
            const title = prompt("Title:");
            const date = prompt("Date (e.g. 2025-03-15):") || "";
            const image = prompt("Image URL (optional):") || "";
            const text = prompt("Text:") || "";

            if (!title && !text) return;

            try {
              await addNews(password, { title, date, image, text });
              flash("News added");
              loadAll();
            } catch {
              flash("Failed to add news", true);
            }
          }}
        >
          Add News
        </button>
      </section>

      {/* Members */}
      <section className="admin-section">
        <h2 className="admin-section-title">Members</h2>

        <div className="admin-list">
          {(members.members || []).map((m, i) => (
            <div key={i} className="admin-item">
              <div className="admin-item-main">
                <div className="admin-item-caption">{m.name}</div>
                <div className="admin-item-url">{m.flag_url}</div>
                <div className="admin-item-url">{m.wikipage}</div>
              </div>

              <div className="admin-item-actions">
                <button
                  className="admin-link"
                  onClick={async () => {
                    const name = prompt("New name:", m.name || "");
                    if (name == null) return;

                    const flag_url = prompt("New flag URL:", m.flag_url || "");
                    if (flag_url == null) return;

                    const wikipage = prompt("New wiki page URL:", m.wikipage || "");
                    if (wikipage == null) return;

                    try {
                      await editMember(password, i, "members", { name, flag_url, wikipage });
                      flash("Member updated");
                      loadAll();
                    } catch {
                      flash("Failed to edit member", true);
                    }
                  }}
                >
                  Edit
                </button>

                <button
                  className="admin-link-danger"
                  onClick={async () => {
                    if (!window.confirm("Delete this member?")) return;

                    try {
                      await deleteMember(password, i, "members");
                      flash("Member deleted");
                      loadAll();
                    } catch {
                      flash("Failed to delete member", true);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="admin-button"
          onClick={async () => {
            const name = prompt("Member name:");
            if (!name) return;

            const wikipage = prompt("Wiki page URL (optional):") || "";
            const flag_url = prompt("Flag image URL (optional):") || "";

            try {
              await addMember(password, {
                name,
                wikipage,
                flag_url,
                type: "member"
              });

              flash("Member added");
              loadAll();
            } catch {
              flash("Failed to add member", true);
            }
          }}
        >
          Add Member
        </button>
      </section>

      {/* Observers */}
      <section className="admin-section">
        <h2 className="admin-section-title">Observers</h2>

        <div className="admin-list">
          {(members.observers || []).map((m, i) => (
            <div key={i} className="admin-item">
              <div className="admin-item-main">
                <div className="admin-item-caption">{m.name}</div>
                <div className="admin-item-url">{m.flag_url}</div>
                <div className="admin-item-url">{m.wikipage}</div>
              </div>

              <div className="admin-item-actions">
                <button
                  className="admin-link"
                  onClick={async () => {
                    const name = prompt("New name:", m.name || "");
                    if (name == null) return;

                    const flag_url = prompt("New flag URL:", m.flag_url || "");
                    if (flag_url == null) return;

                    const wikipage = prompt("New wiki page URL:", m.wikipage || "");
                    if (wikipage == null) return;

                    try {
                      await editMember(password, i, "observers", { name, flag_url, wikipage });
                      flash("Observer updated");
                      loadAll();
                    } catch {
                      flash("Failed to edit observer", true);
                    }
                  }}
                >
                  Edit
                </button>

                <button
                  className="admin-link-danger"
                  onClick={async () => {
                    if (!window.confirm("Delete this observer?")) return;

                    try {
                      await deleteMember(password, i, "observers");
                      flash("Observer deleted");
                      loadAll();
                    } catch {
                      flash("Failed to delete observer", true);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="admin-button"
          onClick={async () => {
            const name = prompt("Observer name:");
            if (!name) return;

            const wikipage = prompt("Wiki page URL (optional):") || "";
            const flag_url = prompt("Flag image URL (optional):") || "";

            try {
              await addMember(password, {
                name,
                wikipage,
                flag_url,
                type: "observer"
              });

              flash("Observer added");
              loadAll();
            } catch {
              flash("Failed to add observer", true);
            }
          }}
        >
          Add Observer
        </button>
      </section>

      {/* Former Members */}
      <section className="admin-section">
        <h2 className="admin-section-title">Former Members</h2>

        <div className="admin-list">
          {(members.former || []).map((m, i) => (
            <div key={i} className="admin-item">
              <div className="admin-item-main">
                <div className="admin-item-caption">{m.name}</div>
                <div className="admin-item-url">{m.flag_url}</div>
                <div className="admin-item-url">{m.wikipage}</div>
              </div>

              <div className="admin-item-actions">
                <button
                  className="admin-link"
                  onClick={async () => {
                    const name = prompt("New name:", m.name || "");
                    if (name == null) return;

                    const flag_url = prompt("New flag URL:", m.flag_url || "");
                    if (flag_url == null) return;

                    const wikipage = prompt("New wiki page URL:", m.wikipage || "");
                    if (wikipage == null) return;

                    try {
                      await editMember(password, i, "former", { name, flag_url, wikipage });
                      flash("Former member updated");
                      loadAll();
                    } catch {
                      flash("Failed to edit former member", true);
                    }
                  }}
                >
                  Edit
                </button>

                <button
                  className="admin-link-danger"
                  onClick={async () => {
                    if (!window.confirm("Delete this former member?")) return;

                    try {
                      await deleteMember(password, i, "former");
                      flash("Former member deleted");
                      loadAll();
                    } catch {
                      flash("Failed to delete former member", true);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="admin-button"
          onClick={async () => {
            const name = prompt("Former member name:");
            if (!name) return;

            const wikipage = prompt("Wiki page URL (optional):") || "";
            const flag_url = prompt("Flag image URL (optional):") || "";

            try {
              await addMember(password, {
                name,
                wikipage,
                flag_url,
                type: "former"
              });

              flash("Former member added");
              loadAll();
            } catch {
              flash("Failed to add former member", true);
            }
          }}
        >
          Add Former Member
        </button>
      </section>

      {/* Users */}
      <section className="admin-section">
        <h2 className="admin-section-title">Users</h2>

        <div className="admin-list">
          {users.map((user) => (
            <div key={user.id} className="admin-item">
              <div className="admin-item-main">
                <div className="admin-item-caption">{user.username}</div>
                <div className="admin-item-sub">{user.email}</div>
                <div className="admin-item-url">
                  Status: {user.is_banned ? 'Banned' : 'Active'} | 
                  Admin: {user.is_admin ? 'Yes' : 'No'}
                </div>
              </div>

              <div className="admin-item-actions">
                <button
                  className={`admin-link ${user.is_banned ? 'admin-link-success' : 'admin-link-warning'}`}
                  onClick={async () => {
                    try {
                      const res = user.is_banned 
                        ? await unbanUser(password, user.id)
                        : await banUser(password, user.id);
                      
                      if (res.error) {
                        flash(res.error, true);
                        return;
                      }
                      
                      flash(user.is_banned ? "User unbanned" : "User banned");
                      loadAll();
                    } catch (error) {
                      flash("Failed to update user ban status", true);
                      console.error("Ban/unban error:", error);
                    }
                  }}
                >
                  {user.is_banned ? 'Unban' : 'Ban'}
                </button>

                <button
                  className={`admin-link ${user.is_admin ? 'admin-link-warning' : 'admin-link-info'}`}
                  onClick={async () => {
                    try {
                      const res = await toggleAdmin(password, user.id);
                      if (res.error) {
                        flash(res.error, true);
                        return;
                      }
                      flash(`Admin status ${user.is_admin ? 'removed' : 'granted'}`);
                      loadAll();
                    } catch (error) {
                      flash("Failed to update admin status", true);
                      console.error("Toggle admin error:", error);
                    }
                  }}
                >
                  {user.is_admin ? 'Remove Admin' : 'Make Admin'}
                </button>

                <button
                  className="admin-link-danger"
                  onClick={async () => {
                    if (!window.confirm(`Delete user "${user.username}"? This action cannot be undone.`)) return;

                    try {
                      const res = await deleteUser(password, user.id);
                      
                      if (res.error) {
                        flash(res.error, true);
                        return;
                      }
                      flash("User deleted");
                      loadAll();
                    } catch (error) {
                      flash("Failed to delete user", true);
                      console.error("Delete user error:", error);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminPanel;
