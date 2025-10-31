import { NavLink } from "react-router-dom";
import IconsProfast from "./IconsProfast";
import Button from "./Button"
import AuthContextHook from "../CustomHook/AuthContextHook";

const Navbar = () => {

    const { user, } = AuthContextHook()

    const button = <div className={"flex flex-col md:flex-row gap-4 md:gap-10 items-start md:items-center justify-center isActive"}>
        <NavLink to={'/'}>Home</NavLink>
       { user && <NavLink to={'/drshbord'}>Drshbord</NavLink>}
        <NavLink to={'/percel'}>Sent To Percel</NavLink>
        <NavLink to={'/coverage'}>Coverage</NavLink>
        <NavLink to={'/riders'}>Be a Rider</NavLink>
        <NavLink to={'/about'}>About Us</NavLink>
    </div>

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {/* custom-button here came form up site */}
                        {
                            button
                        }
                    </ul>
                </div>
                <div className="btn btn-ghost text-xl">
                    <IconsProfast></IconsProfast>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">

                    {/* custom-button here came form up site */}
                    {
                        button
                    }
                </ul>
            </div>
            <div className="navbar-end">
               <Button></Button>
            </div>
        </div>
    );
};

export default Navbar;