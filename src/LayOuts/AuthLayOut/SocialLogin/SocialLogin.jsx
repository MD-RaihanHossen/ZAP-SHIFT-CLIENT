import Swal from "sweetalert2";
import AuthContextHook from "../../../CustomHook/AuthContextHook";
import AxiosBaseUrl from "../../../CustomHook/AxiosBaseUrl";


const SocialLogin = () => {

    const { createUserWithSocial } = AuthContextHook()
    const useAxiosBase = AxiosBaseUrl()

    const hendleUsers = () => {

        createUserWithSocial()
            .then( async(result) => {
                const user = result.user;
                // console.log(user)

                const userData = {
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL,
                    "createdAt": new Date().toISOString(), "current_login_time": new Date().toISOString()
                };
                // console.log(userData)
                //post to user new collections
                try {
                    const res = await useAxiosBase.post("/usersdata", userData);
                    // console.log("Response:", res.data);
                    if (res.data?.user?.insertedId) {

                        Swal.fire({
                            title: "Success!",
                            text: res.data.message || "User data saved successfully!",
                            icon: "success",
                            confirmButtonText: "OK",
                            confirmButtonColor: "#3085d6",
                        });
                    }
                } catch (err) {
                    console.error("Error sending user data:", err);
                }
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage)
            })
    }

    return (
        <div className="" onClick={hendleUsers}>
            <h1 className="text-center my-1"> Or </h1>
            <button className=" flex justify-center items-center gap-4 bg-white text-black border-2  border-[#e5e5e5] w-[350px] p-1">
                <svg aria-label="Google logo" width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;