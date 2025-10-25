import { NavLink, Outlet } from "react-router-dom";
import IconsProfast from "../../Shared/IconsProfast";


const DrshbordLayOut = () => {

    const button = <div className={"flex flex-col md:flex-row gap-4 md:gap-10 items-start md:items-center justify-center isActive"}>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'mypercels'}>My Percel</NavLink>
        <NavLink to={'/coverage'}>Coverage</NavLink>
        <NavLink to={'/about'}>About Us</NavLink>
        <NavLink to={'/rider'}>Be a Rider</NavLink>
    </div>


    return (
        <div className="drawer">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar bg-base-300 w-full">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 px-2">
                        <IconsProfast></IconsProfast>
                    </div>
                    <div className="hidden  lg:flex justify-center w-full">
                        <ul className="flex justify-center items-center">
                            {/* Navbar menu content here  menu menu-horizontal*/}
                            {
                                button
                            }
                        </ul>
                    </div>
                </div>
                {/* Page content here */}
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    {
                        button
                    }
                </ul>
            </div>
        </div>
    );
};

export default DrshbordLayOut;