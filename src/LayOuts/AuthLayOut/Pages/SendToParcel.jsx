import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import AuthContextHook from "../../../CustomHook/AuthContextHook";
import useAxiosSecure from "../../../CustomHook/useAxiosSecure";



const SendToParcel = () => {

    const { user, } = AuthContextHook()
    const axiosSecure = useAxiosSecure()

    //this is my main data
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const districts = useLoaderData() || [];


    //parcel type
    const [parcelType, setParcelType] = useState("Document");


    //sender and reciver Region here || Devition
    const [senderRegion, setSenderRegion] = useState("");
    const [receiverRegion, setReceiverRegion] = useState("");


    //sender and reciver covered_area here || districts
    const [filteredSenderDistricts, setFilteredSenderDistricts] = useState([]);
    const [filteredReceiverDistricts, setFilteredReceiverDistricts] = useState([]);


    //  Get unique regions safely || Devition
    const uniqueRegions = Array.isArray(districts)
        ? [...new Set(districts.map((item) => item.region))]
        : [];




    // Sender Region → get its covered_area
    useEffect(() => {
        if (!Array.isArray(districts)) return;

        const selected = districts.find((r) => r.region === senderRegion);



        if (selected) {
            // combine district name + covered areas
            const serviceCenters = [
                selected.district,
                ...(Array.isArray(selected.covered_area) ? selected.covered_area : []),
            ];
            setFilteredSenderDistricts(serviceCenters); // || districts
        } else {
            setFilteredSenderDistricts([]);
        }
    }, [senderRegion, districts]);

    // Receiver Region → get its covered_area
    useEffect(() => {
        if (!Array.isArray(districts)) return;
        const selected = districts.find((r) => r.region === receiverRegion);
        if (selected) {
            const serviceCenters = [
                selected.district,
                ...(Array.isArray(selected.covered_area) ? selected.covered_area : []),
            ];
            setFilteredReceiverDistricts(serviceCenters);
        } else {
            setFilteredReceiverDistricts([]);
        }
    }, [receiverRegion, districts]);

    //  React Hook Form setup
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            parcelName: "",
            weight: "",
            senderRegion: "",
            receiverRegion: "",
            senderDistrict: "",
            receiverDistrict: "",
            senderName: "",
            receiverName: "",
            senderContact: "",
            receiverContact: "",
            senderAddress: "",
            receiverAddress: "",
            pickupNote: "",
            deliveryNote: "",
        },
    });

    // const weight = watch("weight");

    // Submit handler
    const onSubmit = (data) => {
        console.log(data)

        // --- Add created time and tracking ID ---
        const createdAt = new Date().toISOString(); // e.g., "2025-10-23T19:00:00Z"
        const trackingId = "TRK-" + Math.floor(100000 + Math.random() * 900000); // random 6-digit code
        const status = "Pending";


        const { weight, senderRegion, receiverRegion } = data;
        const withinCity = senderRegion === receiverRegion;

        let cost = 0;
        let reason = "";
        const w = parseFloat(weight || 0);

        if (parcelType === "Document") {
            cost = withinCity ? 60 : 80;
            reason = `This is a Document parcel. Delivery cost is ৳${cost} because it's ${withinCity ? "within" : "outside"
                } city.`;
        } else {
            if (w <= 3) {
                cost = withinCity ? 110 : 150;
                reason = `This Non-Document parcel (≤3kg) costs ৳${cost} for ${withinCity ? "within" : "outside"
                    } city delivery.`;
            } else {
                const extra = (w - 3) * 40;
                cost = withinCity ? 110 + extra : 150 + extra + 40;
                reason = `Your Non-Document parcel weighs ${w}kg. Base rate + ৳40/kg ${withinCity ? "" : "and ৳40 extra for outside city"
                    } applies.`;
            }
        }

        Swal.fire({
            title: "📦 Delivery Cost Summary",
            html: `
      <div style="text-align:left">
        <p><b>Parcel Type:</b> ${parcelType}</p>
        <p><b>Tracking ID:</b> ${trackingId}</p>
        <p><b>Weight:</b> ${w || 0} kg</p>
        <p><b>Delivery Zone:</b> ${withinCity ? "Within City" : "Outside City/District"}</p>
        <p><b>Created At:</b> ${new Date(createdAt).toLocaleString()}</p>
        <hr/>
        <p style="color: green; font-weight: 700;"><b>Total Cost:</b> ৳${cost}</p>
        <p style="margin-top:10px;">${reason}</p>
      </div>
    `,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "💳 Proceed to Pay Now",
            cancelButtonText: "Edit Again",
            reverseButtons: true,
        }).then( async (result) => {
            if (result.isConfirmed) {
                console.log("✅ Parcel confirmed and ready to save.");

                // setConfirm(true)

                const formData = {
                    ...data,
                    cost,
                    parcelType,
                    createdAt,
                    trackingId,
                    status,
                    user_email: user.email

                }

                try {
                    //Post Sendparcels data to mongodb 1st work with mongodb

                    // Use await here sent to data base 
                    const response = await axiosSecure.post("/parcels", formData);
                    console.log("✅ Server response:", response.data);

                    if (response.data.success) {
                        Swal.fire("✅ Parcel added successfully!");
                        // reset(); // reset form from react-hook-form
                    } else {
                        Swal.fire("❌ Failed to add parcel.");
                    }
                } catch (error) {
                    console.error("❌ Error posting data:", error);
                    Swal.fire("❌ Something went wrong while sending data.");
                }

                // reset(); // reset form after confirmation
            } else {
                console.log("🛑 User canceled editing.");
            }
        });
    };


    if (!Array.isArray(districts) || districts.length === 0) {
        return (
            <div className="text-center text-gray-500 mt-10">
                Loading regions...
            </div>
        );
    }

    //  UI
    return (
        <div className="bg-white p-6 md:p-10 rounded-lg shadow-md max-w-6xl mx-auto mt-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-teal-900 mb-4">
                Add Parcel
            </h2>
            <p className="text-gray-600 mb-6">Enter your parcel details</p>

            {/* Parcel Type */}
            <div className="flex items-center gap-6 mb-8">
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <input
                        type="radio"
                        name="parcelType"
                        value="Document"
                        checked={parcelType === "Document"}
                        onChange={(e) => setParcelType(e.target.value)}
                    />
                    Document
                </label>
                <label className="flex items-center gap-2 text-gray-700 font-medium">
                    <input
                        type="radio"
                        name="parcelType"
                        value="Non-Document"
                        checked={parcelType === "Non-Document"}
                        onChange={(e) => setParcelType(e.target.value)}
                    />
                    Non-Document
                </label>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Parcel Name */}
                    <div>
                        <input
                            type="text"
                            {...register("parcelName", { required: "Parcel name is required" })}
                            placeholder="Parcel Name"
                            className="input input-bordered w-full"
                        />
                        {errors.parcelName && (
                            <p className="text-red-500 text-sm">{errors.parcelName.message}</p>
                        )}
                    </div>

                    {/* Weight */}
                    <div>
                        <input
                            type="number"
                            step="0.1"
                            {...register("weight", {
                                min: { value: 0.1, message: "Weight must be at least 0.1kg" },
                            })}
                            placeholder="Parcel Weight (KG)"
                            className="input input-bordered w-full"
                        />
                        {errors.weight && (
                            <p className="text-red-500 text-sm">{errors.weight.message}</p>
                        )}
                    </div>
                </div>

                {/* Sender & Receiver */}
                <div className="grid md:grid-cols-2 gap-10 mt-8">
                    {/* Sender */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-4">Sender Details</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                {...register("senderName", { required: "Sender name required" })}
                                placeholder="Sender Name"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                {...register("senderContact", { required: "Sender contact required" })}
                                placeholder="Sender Contact No"
                                className="input input-bordered w-full"
                            />

                            <select
                                {...register("senderRegion", { required: "Select sender region" })}
                                onChange={(e) => setSenderRegion(e.target.value)}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select Region</option>
                                {uniqueRegions.map((region) => (
                                    <option key={region} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>

                            <select
                                {...register("senderDistrict", { required: "Select sender district" })}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select Service Center</option>
                                {filteredSenderDistricts.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="text"
                                {...register("senderAddress", { required: "Address required" })}
                                placeholder="Address"
                                className="input input-bordered w-full"
                            />

                            <textarea
                                {...register("pickupNote")}
                                placeholder="Pickup Instruction"
                                className="textarea textarea-bordered w-full"
                            />
                        </div>
                    </div>

                    {/* Receiver */}
                    <div>
                        <h3 className="font-semibold text-gray-800 mb-4">Receiver Details</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                {...register("receiverName", { required: "Receiver name required" })}
                                placeholder="Receiver Name"
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                {...register("receiverContact", { required: "Receiver contact required" })}
                                placeholder="Receiver Contact No"
                                className="input input-bordered w-full"
                            />

                            <select
                                {...register("receiverRegion", { required: "Select receiver region" })}
                                onChange={(e) => setReceiverRegion(e.target.value)}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select Region</option>
                                {uniqueRegions.map((region) => (
                                    <option key={region} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>

                            <select
                                {...register("receiverDistrict", { required: "Select receiver district" })}
                                className="select select-bordered w-full"
                            >
                                <option value="">Select Service Center</option>
                                {filteredReceiverDistricts.map((district) => (
                                    <option key={district} value={district}>
                                        {district}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="text"
                                {...register("receiverAddress", { required: "Address required" })}
                                placeholder="Address"
                                className="input input-bordered w-full"
                            />

                            <textarea
                                {...register("deliveryNote")}
                                placeholder="Delivery Instruction"
                                className="textarea textarea-bordered w-full"
                            />
                        </div>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mt-4">*Pickup Time 4pm–7pm Approx.</p>

                <div className="mt-6 ">
                    <button
                        type="submit"
                        className="bg-lime-400 hover:bg-lime-500 text-gray-800 font-semibold py-2 px-6 rounded-md mr-5"
                    >
                        Proceed to Confirm Booking
                    </button>
                    <button onClick={() => reset()}
                        type="submit"
                        className="bg-lime-400 hover:bg-lime-500 text-gray-800 font-semibold py-2 px-6 rounded-md"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SendToParcel;
