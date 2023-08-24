import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {privateRoutes as routes} from "../routes/privateRoutes"
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import AdminSidebar from "../components/SideBar/AdminSideBar";

/**
 * Renders the admin layout component.
 *
 * @param {Object} props - The props for the component.
 * @return {JSX.Element} The rendered admin layout.
 */

export default function AdminLayout(props) {

    const location = useLocation();
    const [open, setOpen] = useState(true);
    const [currentRoute, setCurrentRoute] = useState("Main Dashboard");

    useEffect(() => {
        window.addEventListener("resize", () =>
            window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
        );
    }, []);
    useEffect(() => {
        getActiveRoute(routes);
    }, [location.pathname]);

    const getActiveRoute = (routes) => {
        let activeRoute = "Main Dashboard";
        for (let i = 0; i < routes.length; i++) {
            if (
                window.location.href.indexOf(
                    routes[i].path
                ) !== -1
            ) {
                setCurrentRoute(routes[i].title);
            }
        }
        return activeRoute;
    };
    const getActiveNavbar = (routes) => {
        let activeNavbar = false;
        for (let i = 0; i < routes.length; i++) {
            if (
                window.location.href.indexOf(routes[i].path) !== -1
            ) {
                return routes[i].secondary;
            }
        }
        return activeNavbar;
    };



    return (
        <div className="flex h-full w-full">
            <AdminSidebar open={open} onClose={() => setOpen(false)} />
            {/* Navbar & Main Content */}
            <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
                {/* Main Content */}
                <main
                    className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
                >
                    {/* Routes */}
                    <div className="h-full">
                        <Navbar
                            onOpenSidenav={() => setOpen(true)}
                            logoText={"Admin Dashboard"}
                            brandText={currentRoute}
                            secondary={getActiveNavbar(routes)}
                            {...props}
                        />
                        <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
                            {props.children}
                        </div>
                        <div className="p-3">
                            <Footer />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}