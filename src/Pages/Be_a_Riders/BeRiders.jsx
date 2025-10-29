import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import riderPhoto from '../../assets/agent-pending.png'
import useAxiosSecure from "../../CustomHook/useAxiosSecure";
import Swal from "sweetalert2";
import AuthContextHook from "../../CustomHook/AuthContextHook";

export default function BeRiders() {
    const areas = useLoaderData();
    const axiosSecure = useAxiosSecure()
    const { user } = AuthContextHook()
    console.log(user)

    const { register, handleSubmit, reset } = useForm();
    const [selectedRegion, setSelectedRegion] = useState("");
    const [cities, setCities] = useState([]);
    const [coveredAreas, setCoveredAreas] = useState([]);

    // when region changes
    const handleRegionChange = (region) => {
        setSelectedRegion(region);

        const filtered = areas.filter(item => item.region === region);
        console.log(filtered)

        // unique cities
        const uniqueCities = [...new Set(filtered.map(item => item.city))];
        setCities(uniqueCities);

        // reset covered areas
        setCoveredAreas([]);
    };

    // when city changes
    const handleCityChange = (city) => {
        const found = areas.find(item => item.region === selectedRegion && item.city === city);

        console.log(found)

        setCoveredAreas(found ? found.covered_area : []);
    };

    const onSubmit = async (data) => {

        const ridersdata = {
            ...data,
            'createAt': new Date().toISOString()
        }
        console.log("after:", ridersdata);

        //riders data push to server
        try {
            const res = await axiosSecure.post("/riders", ridersdata);

            if (res.data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Rider Added!",
                    text: "Your rider registration was successful.",
                    timer: 2000,
                    showConfirmButton: false,
                });
                // reset();
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: `Failed!${error?.message}`,
                text: "Failed to add rider. Try again.",
            });
        }


        // reset();
    };

    return (
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8 items-center">

            <div>
                <h2 className="text-3xl font-bold text-green-700 mb-2">Be a Rider</h2>
                <p className="text-gray-600 mb-8">
                    Enjoy fast and reliable parcel delivery with zero hassle.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="border p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-lg mb-4">Tell us about yourself</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <input defaultValue={user.displayName || ''} {...register("name")} type="text" placeholder="Your Name" className="border p-2 rounded" />
                        <input {...register("age")} type="number" placeholder="Your age" className="border p-2 rounded" />

                        <input  defaultValue={user?.email || ''} {...register("email")} type="email" placeholder="Your Email" className="border p-2 rounded" />

                        {/* REGION */}
                        <select
                            className="border p-2 rounded"
                            {...register("region")}
                            onChange={(e) => handleRegionChange(e.target.value)}
                        >
                            <option value="">Select region</option>
                            {[...new Set(areas.map(item => item.region))].map((region, i) => (
                                <option key={i} value={region}>{region}</option>
                            ))}
                        </select>

                        <input {...register("nid")} type="text" placeholder="NID" className="border p-2 rounded" />
                        <input {...register("contact")} type="text" placeholder="Contact" className="border p-2 rounded" />
                    </div>

                    {/* CITY */}
                    <select
                        {...register("city")}
                        className="border p-2 rounded w-full mt-4"
                        onChange={(e) => handleCityChange(e.target.value)}
                    >
                        <option value="">Select City</option>
                        {cities.map((city, i) => (
                            <option key={i} value={city}>{city}</option>
                        ))}
                    </select>

                    {/* COVERED AREA */}
                    <select {...register("covered_area")} className="border p-2 rounded w-full mt-4">
                        <option value="">Select Covered Area</option>
                        {coveredAreas.map((area, i) => (
                            <option key={i} value={area}>{area}</option>
                        ))}
                    </select>

                    <button className="bg-lime-400 px-4 py-2 rounded w-full mt-4 font-semibold">
                        Submit
                    </button>
                </form>
            </div>

            <img src={riderPhoto} alt="rider" className="w-full" />
        </div>
    );
}
