"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBox,
  faBoxes,
  faShoppingBag,
  faChartBar,
  faUsers,
  faHistory,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  // 🔐 Future auth redirect
  /*
  useEffect(() => {
    const user = null; // replace with actual auth check
    if (!user) router.push('/admin/login');
  }, [router]);
  */

  const menuItems = [
    { href: "/admin/dashboard", icon: faTachometerAlt, label: "Dashboard" },
    { href: "/admin/products", icon: faBox, label: "Products" },
    { href: "/admin/inventory", icon: faBoxes, label: "Inventory" },
    { href: "/admin/orders", icon: faShoppingBag, label: "Orders" },
    { href: "/admin/reports", icon: faChartBar, label: "Reports" },
    { href: "/admin/employees", icon: faUsers, label: "Employees" },
    { href: "/admin/audit", icon: faHistory, label: "Audit Trail" },
  ];

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`bg-dark text-white ${sidebarOpen ? "col-2" : "col-1"}`}
        style={{ minHeight: "100vh", transition: "all 0.3s" }}
      >
        <div className="p-3">
          <button
            className="btn btn-outline-light mb-3"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>

          {sidebarOpen && <h5 className="text-center">Ni-Q Admin</h5>}

          <ul className="nav nav-pills flex-column">
            {menuItems.map((item) => (
              <li className="nav-item mb-2" key={item.href}>
                <Link
                  href={item.href}
                  className={`nav-link text-white ${router.pathname === item.href ? "active bg-primary" : ""}`}
                >
                  <FontAwesomeIcon icon={item.icon} className="me-2" />
                  {sidebarOpen && item.label}
                </Link>
              </li>
            ))}
            <li className="nav-item mt-4">
              <button
                className="nav-link text-white btn btn-link"
                onClick={() => {
                  /* logout */
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                {sidebarOpen && "Logout"}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Top Bar */}
        <nav className="navbar navbar-expand navbar-light bg-light border-bottom px-4">
          <div className="container-fluid">
            <span className="navbar-text">Welcome, Admin User</span>
            <div className="d-flex">
              <span className="badge bg-danger me-3">Critical Stock: 3</span>
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  Profile
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Change Password
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
