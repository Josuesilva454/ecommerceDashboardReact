import React from "react";

import { Link } from "react-router-dom";
import { Menu } from "primereact/menu";
import { useAuth } from "../auth/useAuth";

const Sidebar = () => {
    const { signout } = useAuth();
    const items = [
        {
            label: "Dashboard",
            icon: "pi pi-th-large",
            template: (item, options) => {
                return (
                    <Link to="/admin/dashboard" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Order",
            icon: "pi pi-shopping-cart",
            template: (item, options) => {
                return (
                    <Link to="/admin/order" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Category",
            icon: "pi pi-tags",
            template: (item, options) => {
                return (
                    <Link to="/admin/category" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Product",
            icon: "pi pi-box",
            template: (item, options) => {
                return (
                    <Link to="/admin/product" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "User",
            icon: "pi pi-fw pi-users",
            template: (item, options) => {
                return (
                    <Link to="/admin/user" className={options.className}>
                        <span className={options.iconClassName}></span>
                        <span className={options.labelClassName}>{item.label}</span>
                    </Link>
                )
            }
        },
        {
            label: "Sign Out",
            icon: "pi pi-sign-out",
            command: () => signout()
        }
    ]

    return (
        <div className="sidebar">
            <h3>Sidebar</h3>
            <Menu model={items} />
        </div>
    )
}

export default Sidebar;