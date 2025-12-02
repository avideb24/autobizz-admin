import { Link } from "react-router-dom";
import notFoundImg from "../../../assets/images/not-found.png";


const Error = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div className="max-w-4xl text-center">
                <img src={notFoundImg} className="w-full h-full object-contain" alt="Page Not Found" />
                <h3 className="text-lg lg:text-xl font-bold pb-4">Page Not Found!</h3>
                <Link to={"/"} className="button mx-auto flex">Go Home</Link>
            </div>
        </div>
    );
};

export default Error;