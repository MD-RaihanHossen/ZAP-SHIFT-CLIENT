import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import AuthContextHook from "../../CustomHook/AuthContextHook";


const Signup = () => {

    const { singup } = AuthContextHook()

    const { register, handleSubmit, formState: { errors }, } = useForm()

    const onSubmit = (data) => {
        console.log(data)

        //create a user 
        singup(data.email, data.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    return (
        <div>
            <h2 className="text-5xl font-extrabold ">Create an Account</h2>
            <p className="mb-4 mt-2">Login with Profast</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset w-[350px]">
                    <label className="label">Name</label>
                    {/* name input  */}
                    <input {...register("Name", { required: true })} type="text" className="input w-full" placeholder="Name" />

                    <label className="label">Email</label>
                    {/* email input  */}
                    <input {...register("email", { required: true })} type="email" className="input w-full" placeholder="Email" />
                    {
                        errors?.email && <p className="text-red-500">write your email adress</p>
                    }


                    <label className="label">Password</label>
                    {/* password  input*/}
                    <input {...register("password", { required: true, minLength: 6 })} type="password" className="input w-full" placeholder="Password" />
                    {
                        errors?.password && <p className="text-red-500">Somthing is wrong </p>
                    }



                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
            </form>
            <div className="">
                <p>Already have an account? <Link to={'/login'} className="underline">Login</Link></p>
                <div className="my-2 flex justify-center items-center w-[350px] ">
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Signup;