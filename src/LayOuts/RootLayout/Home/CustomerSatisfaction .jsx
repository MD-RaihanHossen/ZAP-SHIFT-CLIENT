import location_img from '../../../assets/location-merchant.png'
// import merchant_bg_img from '../../assets/be-a-merchant-bg.png'

const CustomerSatisfaction = () => {
    return (
        <section className="bg-[#03373D]  bg-no-repeat bg-[url('assets/be-a-merchant-bg.png')] py-16 rounded-2xl my-10"
        >
            <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between text-white">

                {/* Left Content */}
                <div className="md:w-1/2 space-y-6 mt-10 md:mt-0">
                    <h2 className="text-3xl md:text-4xl font-bold leading-snug">
                        Merchant and Customer Satisfaction is Our First Priority
                    </h2>
                    <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                        We offer the lowest delivery charge with the highest value along with
                        100% safety of your product. Pathao courier delivers your parcels in
                        every corner of Bangladesh right on time.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4">
                        <button className="btn bg-primary border-none text-white hover:bg-primary/80">
                            Become a Merchant
                        </button>
                        <button className="btn btn-outline text-white border-white hover:bg-white hover:text-[#03373D]">
                            Earn with Profast Courier
                        </button>
                    </div>
                </div>

                {/* Right Image */}
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src={location_img} // 🟡 Main image from local storage
                        alt="Merchant and Customer"
                        className="w-[90%] md:w-[80%] rounded-2xl shadow-xl object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default CustomerSatisfaction;