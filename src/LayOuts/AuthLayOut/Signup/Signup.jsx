import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SocialLogin from "../SocialLogin/SocialLogin";
import AuthContextHook from "../../../CustomHook/AuthContextHook";
import { useState } from "react";
import axios from "axios";
import AxiosBaseUrl from "../../../CustomHook/AxiosBaseUrl";
import Swal from "sweetalert2";



const Signup = () => {

    const { singup, updateUserProfile } = AuthContextHook()
    const [photo, setPhoto] = useState('')
    const useAxiosBase = AxiosBaseUrl()

    const { register, handleSubmit, formState: { errors }, } = useForm()

    const onSubmit = async (data) => {
        // console.log(data)

        if (!photo) return alert("Please select a photo");
        



        //create a user 
        singup(data.email, data.password)
            .then(async (userCredential) => {
                // Signed up 
                const user = userCredential.user;

                //update user profile 
                updateUserProfile({
                    displayName: data.Name,
                    photoURL: photo,
                })
                    .then(() => {
                        console.log('profile upload succesfuly')
                    }).catch((error) => {
                        console.log(error)
                    });
                // console.log(user)

                const userData = {
                    name: data.Name,
                    email: data.email,
                    photo: photo,
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
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }


    const hendleImages = async (e) => {
        const image = e.target.files[0]

        const formData = new FormData();
        formData.append("image", image);

        //here usesing image bb api 
        const uploadRes = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_for_images_uploade}`,
            formData
        );
        const imageUrl = uploadRes.data.data.url;
        // console.log("Image URL:", imageUrl);
        setPhoto(imageUrl)
    }
    //VITE_for_images_uploade

    return (
        <div>
            <h2 className="text-5xl font-extrabold ">Create an Account</h2>
            <p className="mb-4 mt-2">Login with Profast</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset w-[350px]">
                    <label className="label">Name</label>
                    {/* name input  */}
                    <input {...register("Name", { required: true })} type="text" className="input " placeholder="Name" />


                    <div className="flex gap-5 justify-center items-center">
                        <div className="w-[100px] h-[80px] border rounded-xl">
                            <img className=" w-full h-full object-cover rounded-xl p-1" src={photo} alt="" />
                        </div>
                        <div>
                            <label className="label">Photo</label>
                            {/* photo */}
                            <input accept="image/*" onChange={hendleImages} required type="file" className="input w-full " placeholder="Your Photo" />
                        </div>

                    </div>

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