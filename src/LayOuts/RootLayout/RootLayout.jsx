import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar";
import Fotter from "../../Shared/Fotter";


const RootLayout = () => {
    return (
        <div className="max-w-11/12 mx-auto">
              <div>
                <Navbar></Navbar>
            </div>
            <Outlet></Outlet>
            <div>
                <Fotter></Fotter>
            </div>
        </div>
    );
};

export default RootLayout;