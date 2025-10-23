import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import AuthContextHook from "../../CustomHook/AuthContextHook";




const Login = () => {

    const { login } = AuthContextHook()

    const navigate = useNavigate()
    

    const { register, handleSubmit, formState: { errors }, } = useForm()

    const onSubmit = (data) => {
        console.log(data)

        

        //login is user 
        login(data.email, data.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    return (
        <div>
            <h2 className="text-5xl font-extrabold ">Welcome Back</h2>
            <p className="mb-4 mt-2">Login with Profast</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset w-[350px]">
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
                        errors?.password && <p className="text-red-500">write you password </p>
                    }
                    {
                        errors?.password?.type === 'minLength' && <p className="text-red-500">write you password more then 10 latter</p>
                    }


                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
            </form>
            <div className="leading-loose">
                <p>   Don’t have any account? <Link className="underline" to={'/signup'}> Register</Link> </p>
                <div className="my-2 flex justify-center items-center w-[350px] ">
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;