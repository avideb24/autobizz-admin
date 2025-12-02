import { siteConfig } from "../../../config/siteConfig";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";


const Header = ({ setShowSidebar }) => {

    const navigate = useNavigate();


    // logout fn
    const handleLogOut = async () => {
        console.log("hitted logout!!!");
        navigate("/login")
    };

    return (
        <div className="bg-light px-3 border-b border-b-slate-300">
            <div className="flex justify-between items-center py-3">
                <div className="flex items-center gap-2">
                    <button onClick={() => setShowSidebar(true)} className="text-2xl">
                        <HiBars3CenterLeft />
                    </button>
                    <Link to={"/"}>
                        <img src={siteConfig?.logo} className="max-w-24 object-contain" alt="logo" />
                    </Link>
                </div>
                <button onClick={handleLogOut} className="text-2xl">
                    <CiLogout />
                </button>
            </div>
        </div>
    );
};

export default Header;