import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar({ open, onToggle, user }) {
  const navigate = useNavigate();

  const goAccountOrLogin = () => {
    if (user) navigate("/account");
    else navigate("/login");
  };

  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <div className="sidebar-inner">
        <button className="sidebar-toggle" onClick={onToggle}>
          {open ? "<" : ">"}
        </button>

        {open && (
          <>
            <div className="sidebar-title">NAMO</div>

            <nav className="sidebar-nav">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  "sidebar-link" + (isActive ? " active" : "")
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/members"
                className={({ isActive }) =>
                  "sidebar-link" + (isActive ? " active" : "")
                }
              >
                Members
              </NavLink>

              <NavLink
                to="https://wiki.namoalliance.org/wiki/Main_Page"
                end
                className={({ isActive }) =>
                  "sidebar-link" + (isActive ? " active" : "")
                }
              >
                Wiki
              </NavLink>

              <NavLink
                to="/news"
                className={({ isActive }) =>
                  "sidebar-link" + (isActive ? " active" : "")
                }
              >
                News
              </NavLink>

              <NavLink
                to="/join"
                className={({ isActive }) =>
                  "sidebar-link" + (isActive ? " active" : "")
                }
              >
                Join Us
              </NavLink>

              <NavLink
                to="/contactus"
                end
                className={({ isActive }) =>
                  "sidebar-link" + (isActive ? " active" : "")
                }
              >
                Contact Us
              </NavLink>

              {user && user.is_admin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    "sidebar-link" + (isActive ? " active" : "")
                  }
                >
                  Admin
                </NavLink>
              )}
            </nav>

            <button className="sidebar-account" onClick={goAccountOrLogin}>
              {user ? user.username : "Login"}
            </button>
          </>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
