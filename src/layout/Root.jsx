import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/layout/sidebar";
import Header from "../components/layout/header";
import { useState } from "react";
import Copyright from "../components/reusable/copyright";


const Root = () => {

    const [showSidebar, setShowSidebar] = useState(false);
    const { pathname } = useLocation();

    const isLoginPath = pathname == "/login";


    return (
        <div className="">
            {
                !isLoginPath &&
                <>
                    <div className={`w-[220px] h-screen fixed z-50 top-0 lg:left-0 duration-300 ${showSidebar ? "left-0" : "-left-[500px]"} overflow-y-auto`}>
                        <Sidebar setShowSidebar={setShowSidebar} />
                    </div>
                    <div className="fixed z-10 top-0 left-0 w-full lg:hidden">
                        <Header setShowSidebar={setShowSidebar} />
                    </div>
                </>
            }
            <div className={`${isLoginPath ? "" : "bg-light w-full h-screen mt-14 lg:mt-0 px-3 pt-4 lg:p-5 lg:pb-0 lg:pl-[240px] flex flex-col justify-between gap-y-10"}`}>
                <Outlet />
            </div>
        </div>
    );
};

export default Root;