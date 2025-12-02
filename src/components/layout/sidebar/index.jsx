import { siteConfig } from "../../../config/siteConfig";
import { NavData } from "../../../utils/nav-data";
import { Link } from "react-router-dom";
import { AiTwotoneCloseSquare } from "react-icons/ai";


const Sidebar = ({ setShowSidebar }) => {

    const navItems = NavData();

    return (
        <div className="h-screen bg-light px-4 border-r border-slate-300">

            {/* logo */}
            <div className="py-3 flex justify-between items-center">
                <Link to={"/"}>
                    <img src={siteConfig?.logo} className="max-w-24 lg:max-w-36 h-full object-contain" alt="logo" />
                </Link>
                <button onClick={() => setShowSidebar(false)} className="text-2xl lg:hidden">
                    <AiTwotoneCloseSquare />
                </button>
            </div>

            {/* nav items */}
            <div>
                {
                    navItems?.map((item, idx) =>
                        <Link to={item?.to} key={idx} onClick={() => setShowSidebar(false)} className="flex items-center p-2 bg-slate-200 rounded">
                            <item.icon className="text-xl" />
                            <span className="mx-4">{item?.label}</span>
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Sidebar;