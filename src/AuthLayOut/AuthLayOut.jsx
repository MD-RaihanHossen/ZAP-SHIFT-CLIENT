import { Outlet } from "react-router-dom";
import authImage from '../assets/authImage.png'
import IconsProfast from "../Shared/IconsProfast";



const AuthLayOut = () => {

    return (
        <div className="max-w-11/12 mx-auto">
            <div className="p-2">
                <IconsProfast></IconsProfast>
            </div>
            <div className="flex flex-col md:flex-row-reverse justify-around items-center min-h-screen">
                <div className="">
                    <img
                        src={authImage}
                        className=" "
                    />
                </div>
                <div className="">
                    <Outlet></Outlet>
                </div>
            </div>

        </div>
    );
};

export default AuthLayOut;