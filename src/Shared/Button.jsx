import { Link } from "react-router-dom";
import { FaCircleArrowUp } from "react-icons/fa6";
import AuthContextHook from "../CustomHook/AuthContextHook";


const Button = () => {

    //get uer for authProvider by authConrextHook
    const { user, logOut } = AuthContextHook()
    

    

    const hendleLogOut = () => {
        // console.log(hendleLogOut)

        //LogOut in here
        logOut()
            .then(() => {
                console.log('Sign-out successful')
                
            }).catch((error) => {
                // An error happened.
                console.log(error)
            });

    }

    return (
        <div>
            <div className="flex justify-center items-center gap-2">
                {
                    user && user.email ? <div><button onClick={() => hendleLogOut()} className="text-xl font-bold btn text-gray-500"> Log Out </button></div> : <div>
                        <Link to={'login'} className="text-xl font-bold btn text-gray-500">Sign In</Link>
                    </div>
                }
                <Link to={'login'} className="text-xl font-bold btn bg-[#CAEB66]">Be a rider</Link>
                <div className="text-3xl rotate-[40deg] ">
                    <FaCircleArrowUp className="text-[#CAEB66]" />
                </div>
            </div>
        </div>
    );
};

export default Button;